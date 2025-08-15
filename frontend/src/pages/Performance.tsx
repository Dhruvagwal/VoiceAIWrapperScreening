import { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_TASKS } from "@/graphql/queries";
import { useParams } from "react-router-dom";

export default function TaskListWithPerf() {
  const { projectId } = useParams();
  const startTime = performance.now();
  const { data, loading, error } = useQuery(GET_TASKS, {
    variables: { projectId },
  });

  useEffect(() => {
    if (!loading) {
      const endTime = performance.now();
      console.log(
        `[Perf] GET_TASKS took ${(endTime - startTime).toFixed(2)}ms`
      );
    }
  }, [loading]);

  if (loading) return <p>Loading…</p>;
  if (error) return <p className="text-red-500">{error.message}</p>;

  return <div>{JSON.stringify(data)}</div>;
}
