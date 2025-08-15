import { useQuery } from "@apollo/client";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { GET_TASK } from "@/graphql/queries";
import TaskEditForm from "./TaskEditForm";
import CommentSection from "./CommentSection";

export default function TodoView({
  id,
  onClose = () => {},
  projectId,
}: {
  id: string;
  onClose?: () => void;
  projectId: string | null;
}) {
  const { data, loading, error } = useQuery(GET_TASK, { variables: { id } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  const task = data?.task;
  if (!task) return <p>Task not found</p>;

  return (
    <div>
      <DialogHeader>
        <DialogTitle>{task.title}</DialogTitle>
      </DialogHeader>
      <div className="divide-x w-[70vw] grid grid-cols-3 h-[60vh]">
        <div className="col-span-2 p-4 pl-0">
          <TaskEditForm
            projectId={projectId}
            onClose={onClose}
            task={task}
            id={id}
          />
        </div>
        <div className="col-span-1">
          <CommentSection comments={task.comments} taskId={String(task.id)} />
        </div>
      </div>
    </div>
  );
}
