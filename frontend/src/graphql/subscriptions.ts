import { gql } from "@apollo/client";

export const TASKS_SUBSCRIPTION = gql`
  subscription OnTaskUpdated($projectId: ID!) {
    taskUpdated(projectId: $projectId) {
      id
      title
      description
      status
    }
  }
`;
