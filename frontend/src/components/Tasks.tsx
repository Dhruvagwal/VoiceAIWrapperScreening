import { useQuery } from "@apollo/client";
import { GET_TASKS } from "@/graphql/queries";
import TaskList from "@/components/TaskList";

export default function Tasks({ projectId }: { projectId: string }) {
  const { data, loading, error } = useQuery(GET_TASKS, {
    variables: { projectId },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  return <TaskList projectId={projectId} tasks={data?.tasks ?? []} />;
}
