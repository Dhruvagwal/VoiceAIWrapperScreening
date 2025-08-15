from django_filters import FilterSet, CharFilter
from .models import Project, Task

class ProjectFilter(FilterSet):
    search = CharFilter(method='filter_search')
    def filter_search(self, qs, name, value):
        return qs.filter(name__icontains=value) | qs.filter(description__icontains=value)
    class Meta: model = Project; fields = ['status']

class TaskFilter(FilterSet):
    class Meta: model = Task; fields = ['status','assignee_email']
