import ProjectInfo from "@/components/ProjectInfo";
import Tasks from "@/components/Tasks";
import { GET_PROJECT } from "@/graphql/queries";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";

function Todo() {
  const { projectId } = useParams();
  const { data, loading, error } = useQuery(GET_PROJECT, {
    variables: { id: projectId ?? "" },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;
  return (
    <div>
      <ProjectInfo project={data.project} />
      <Tasks projectId={projectId ?? ""} />
    </div>
  );
}

export default Todo;
