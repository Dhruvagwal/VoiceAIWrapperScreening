import { gql } from '@apollo/client'

export const CREATE_PROJECT = gql`
  mutation CreateProject($data: ProjectInput!) {
    createProject(data: $data) { ok project { id name status description dueDate taskCount completedTasks } }
  }
`

export const UPDATE_PROJECT = gql`
  mutation UpdateProject(
    $projectId: ID!
    $name: String
    $description: String
    $dueDate: Date
    $status: String
  ) {
    updateProject(
      projectId: $projectId
      name: $name
      description: $description
      dueDate: $dueDate
      status: $status
    ) {
      ok
      project {
        id
        name
        description
        dueDate
        status
      }
    }
  }
`;


export const DELETE_PROJECT = gql`
  mutation DeleteProject($projectId: ID!) {
    deleteProject(projectId: $projectId) {
      ok
    }
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask($data: TaskInput!) {
    createTask(data: $data) {
      ok
      task {
        id
        title
        status
        assigneeEmail
        description
        dueDate
      }
    }
  }
`
export const UPDATE_TASK = gql`
  mutation UpdateTask(
    $taskId: ID!
    $title: String
    $description: String
    $status: String
    $assigneeEmail: String
    $dueDate: Date
  ) {
    updateTask(
      taskId: $taskId
      title: $title
      description: $description
      status: $status
      assigneeEmail: $assigneeEmail
      dueDate: $dueDate
    ) {
      ok
      task {
        id
        title
        description
        status
        assigneeEmail
        dueDate
      }
    }
  }
`;

export const DELETE_TASK = gql`
mutation DeleteTask($taskId: ID!) {
  deleteTask(taskId: $taskId) { ok }
}
`;

export const ADD_COMMENT = gql`
  mutation AddComment($taskId: ID!, $content: String!, $authorEmail: String!) {
    addTaskComment(taskId: $taskId, content: $content, authorEmail: $authorEmail) {
      ok
      comment {
        id
        content
        authorEmail
        timestamp
      }
    }
  }
`;
export const DELETE_COMMENT = gql`
mutation DeleteComment($commentId: ID!) {
  deleteTaskComment(commentId: $commentId) {
    ok
  }
}
`;
