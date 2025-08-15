import graphene
from graphene_django import DjangoObjectType
from django.db.models import Count, Q
from .models import Organization, Project, Task, TaskComment


# -----------------------------
# GraphQL Types
# -----------------------------
class TaskCommentType(DjangoObjectType):
    class Meta:
        model = TaskComment
        fields = ("id", "content", "author_email", "timestamp")


class TaskType(DjangoObjectType):
    class Meta:
        model = Task
        fields = ("id", "title", "description", "status",
                  "assignee_email", "due_date", "created_at", "comments")


class ProjectStatusCountType(graphene.ObjectType):
    status = graphene.String(required=True)
    count = graphene.Int(required=True)

    
class TaskStatusCountType(graphene.ObjectType):
    status = graphene.String(required=True)
    count = graphene.Int(required=True)

class ProjectStatisticsType(graphene.ObjectType):
    total_projects = graphene.Int(required=True)
    projects_by_status = graphene.List(ProjectStatusCountType, required=True)
    total_tasks = graphene.Int(required=True)
    tasks_by_status = graphene.List(TaskStatusCountType, required=True)
    completion_rate = graphene.Float(required=True)



class ProjectType(DjangoObjectType):
    task_count = graphene.Int()
    completed_tasks = graphene.Int()

    class Meta:
        model = Project
        fields = ("id", "name", "description", "status",
                  "due_date", "created_at", "tasks")

    def resolve_task_count(self, info):
        return self.tasks.count()

    def resolve_completed_tasks(self, info):
        return self.tasks.filter(status="DONE").count()


# -----------------------------
# Input Types
# -----------------------------
class ProjectInput(graphene.InputObjectType):
    name = graphene.String(required=True)
    description = graphene.String()
    status = graphene.String()
    due_date = graphene.types.datetime.Date()


class TaskInput(graphene.InputObjectType):
    project_id = graphene.ID(required=True)
    title = graphene.String(required=True)
    description = graphene.String()
    status = graphene.String()
    assignee_email = graphene.String()
    due_date = graphene.types.datetime.DateTime()


# -----------------------------
# Helper
# -----------------------------
def get_org_from_context(info) -> Organization:
    request = info.context
    slug = request.META.get("HTTP_X_ORG") or request.META.get(
        "HTTP_X_ORG_SLUG") or request.META.get("HTTP_X_ORGANIZATION")
    if not slug:
        raise Exception("Missing organization header: X-Org or X-Org-Slug")
    try:
        return Organization.objects.get(slug=slug)
    except Organization.DoesNotExist:
        raise Exception("Organization not found")


# -----------------------------
# Mutations
# -----------------------------
class DeleteTaskComment(graphene.Mutation):
    class Arguments:
        comment_id = graphene.ID(required=True)
    ok = graphene.Boolean()

    def mutate(self, info, comment_id):
        org = get_org_from_context(info)
        comment = TaskComment.objects.get(
            pk=comment_id, task__project__organization=org)
        comment.delete()
        return DeleteTaskComment(ok=True)


class DeleteProject(graphene.Mutation):
    class Arguments:
        project_id = graphene.ID(required=True)
    ok = graphene.Boolean()

    def mutate(self, info, project_id):
        org = get_org_from_context(info)
        try:
            project = Project.objects.get(pk=project_id, organization=org)
        except Project.DoesNotExist:
            raise Exception("Project not found")
        project.delete()
        return DeleteProject(ok=True)


class UpdateProject(graphene.Mutation):
    class Arguments:
        project_id = graphene.ID(required=True)
        name = graphene.String()
        description = graphene.String()
        due_date = graphene.types.datetime.Date()
        status = graphene.String()

    ok = graphene.Boolean()
    project = graphene.Field(ProjectType)

    def mutate(self, info, project_id, name=None, description=None, due_date=None, status=None):
        org = get_org_from_context(info)
        try:
            project = Project.objects.get(pk=project_id, organization=org)
        except Project.DoesNotExist:
            raise Exception("Project not found")

        if name is not None:
            project.name = name
        if description is not None:
            project.description = description
        if due_date is not None:
            project.due_date = due_date
        if status is not None:
            project.status = status

        project.save()
        return UpdateProject(ok=True, project=project)


class CreateProject(graphene.Mutation):
    class Arguments:
        data = ProjectInput(required=True)
    ok = graphene.Boolean()
    project = graphene.Field(ProjectType)

    def mutate(self, info, data):
        org = get_org_from_context(info)
        project = Project.objects.create(organization=org, **data)
        return CreateProject(ok=True, project=project)


class CreateTask(graphene.Mutation):
    class Arguments:
        data = TaskInput(required=True)
    ok = graphene.Boolean()
    task = graphene.Field(TaskType)

    def mutate(self, info, data):
        org = get_org_from_context(info)
        project = Project.objects.get(pk=data["project_id"], organization=org)
        payload = {k: v for k, v in data.items() if k != "project_id"}
        task = Task.objects.create(project=project, **payload)
        return CreateTask(ok=True, task=task)


class UpdateTask(graphene.Mutation):
    class Arguments:
        task_id = graphene.ID(required=True)
        title = graphene.String()
        description = graphene.String()
        status = graphene.String()
        assignee_email = graphene.String()
        due_date = graphene.types.datetime.Date()

    ok = graphene.Boolean()
    task = graphene.Field(TaskType)

    def mutate(self, info, task_id, **kwargs):
        org = get_org_from_context(info)
        try:
            task = Task.objects.get(pk=task_id, project__organization=org)
        except Task.DoesNotExist:
            raise Exception("Task not found")

        for field, value in kwargs.items():
            if value is not None:
                setattr(task, field, value)

        task.save()
        return UpdateTask(ok=True, task=task)


class DeleteTask(graphene.Mutation):
    class Arguments:
        task_id = graphene.ID(required=True)
    ok = graphene.Boolean()

    def mutate(self, info, task_id):
        org = get_org_from_context(info)
        try:
            task = Task.objects.get(pk=task_id, project__organization=org)
        except Task.DoesNotExist:
            raise Exception("Task not found")
        task.delete()
        return DeleteTask(ok=True)


class AddTaskComment(graphene.Mutation):
    class Arguments:
        task_id = graphene.ID(required=True)
        content = graphene.String(required=True)
        author_email = graphene.String(required=True)
    ok = graphene.Boolean()
    comment = graphene.Field(TaskCommentType)

    def mutate(self, info, task_id, content, author_email):
        org = get_org_from_context(info)
        task = Task.objects.select_related("project").get(
            pk=task_id, project__organization=org)
        comment = TaskComment.objects.create(
            task=task, content=content, author_email=author_email)
        return AddTaskComment(ok=True, comment=comment)


# -----------------------------
# Query
# -----------------------------
class Query(graphene.ObjectType):
    projects = graphene.List(ProjectType, search=graphene.String())
    project = graphene.Field(ProjectType, id=graphene.ID(required=True))
    task = graphene.Field(TaskType, id=graphene.ID(required=True))
    tasks = graphene.List(TaskType, project_id=graphene.ID(required=True))
    project_statistics = graphene.Field(ProjectStatisticsType)

    def resolve_projects(self, info, search=None):
        org = get_org_from_context(info)
        qs = Project.objects.filter(organization=org).order_by("-created_at")
        if search:
            qs = qs.filter(Q(name__icontains=search) |
                           Q(description__icontains=search))
        return qs

    def resolve_project(self, info, id):
        org = get_org_from_context(info)
        return Project.objects.get(pk=id, organization=org)

    def resolve_task(self, info, id):
        org = get_org_from_context(info)
        return Task.objects.select_related("project").get(pk=id, project__organization=org)

    def resolve_tasks(self, info, project_id):
        org = get_org_from_context(info)
        return Task.objects.filter(
            project_id=project_id,
            project__organization=org
        ).order_by("-created_at")

    def resolve_project_statistics(self, info):
        slug = info.context.META.get("HTTP_X_ORG_SLUG")
        if not slug:
            raise Exception("Missing X-Org-Slug header")

        org = Organization.objects.get(slug=slug)

        total_projects = Project.objects.filter(organization=org).count()

        # ✅ Group projects by status
        projects_by_status_qs = (
            Project.objects.filter(organization=org)
            .values("status")
            .annotate(count=Count("id"))
        )
        projects_by_status_list = [
            ProjectStatusCountType(status=p["status"] or "UNKNOWN", count=p["count"])
            for p in projects_by_status_qs
        ]

        total_tasks = Task.objects.filter(project__organization=org).count()

        # ✅ Group tasks by status
        tasks_by_status_qs = (
            Task.objects.filter(project__organization=org)
            .values("status")
            .annotate(count=Count("id"))
        )
        tasks_by_status_list = [
            TaskStatusCountType(status=t["status"] or "UNKNOWN", count=t["count"])
            for t in tasks_by_status_qs
        ]

        done = Task.objects.filter(project__organization=org, status="DONE").count()
        rate = round((done / total_tasks) * 100, 2) if total_tasks else 0.0

        return ProjectStatisticsType(
            total_projects=total_projects,
            projects_by_status=projects_by_status_list,
            total_tasks=total_tasks,
            tasks_by_status=tasks_by_status_list,
            completion_rate=rate,
        )

# -----------------------------
# Schema
# -----------------------------
class Mutation(graphene.ObjectType):
    create_project = CreateProject.Field()
    update_project = UpdateProject.Field()
    delete_project = DeleteProject.Field()

    create_task = CreateTask.Field()
    update_task = UpdateTask.Field()
    delete_task = DeleteTask.Field()

    add_task_comment = AddTaskComment.Field()
    delete_task_comment = DeleteTaskComment.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)