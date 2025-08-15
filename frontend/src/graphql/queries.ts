import { gql } from "@apollo/client";

export const PROJECTS = gql`
  query Projects($search: String) {
    projects(search: $search) {
      id
      name
      status
      dueDate
      taskCount
      completedTasks
    }
  }
`;

export const GET_PROJECT = gql`
  query GetProject($id: ID!) {
    project(id: $id) {
      id
      name
      description
      dueDate
      status
      taskCount
      completedTasks
    }
  }
`;

export const GET_STATS = gql`
  query GetStats {
    projectStatistics {
      totalProjects
      projectsByStatus {
        status
        count
      }
      totalTasks
      tasksByStatus {
        status
        count
      }
      completionRate
    }
  }
`

export const GET_TASKS = gql`
  query GetTasks($projectId: ID!) {
    tasks(projectId: $projectId) {
      id
      title
      description
      status
      assigneeEmail
    }
  }
`;

// GraphQL Queries/Mutations
export const GET_TASK = gql`
  query GetTask($id: ID!) {
    task(id: $id) {
      id
      title
      description
      status
      comments {
        id
        content
        authorEmail
        timestamp
      }
    }
  }
`;

export const STATS = gql`
  query {
    stats
  }
`;
