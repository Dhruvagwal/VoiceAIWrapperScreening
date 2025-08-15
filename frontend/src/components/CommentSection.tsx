import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { ADD_COMMENT, DELETE_COMMENT } from "@/graphql/mutations";
import { GET_TASK } from "@/graphql/queries";

interface CommentSectionProps {
  comments: any[];
  taskId: string;
}

export default function CommentSection({ comments, taskId }: CommentSectionProps) {
  const [addComment] = useMutation(ADD_COMMENT, {
    refetchQueries: [{ query: GET_TASK, variables: { id: taskId } }],
  });

  const [deleteComment] = useMutation(DELETE_COMMENT, {
    refetchQueries: [{ query: GET_TASK, variables: { id: taskId } }],
  });

  const { register, handleSubmit, reset } = useForm<{ content: string }>();

  const onSubmit = async (values: { content: string }) => {
    await addComment({
      variables: {
        taskId: taskId,
        content: values.content,
        authorEmail: "admin@example.com",
      },
    });
    reset();
  };

  return (
    <div className="p-4 pr-0 flex flex-col h-full">
      <p className="font-medium">Comments</p>
      <Separator className="my-4" />
      <div className="flex-1 overflow-y-auto space-y-3">
        {comments.length === 0 && (
          <p className="text-gray-500">No comments yet</p>
        )}
        {comments.map((c) => (
          <div
            key={c.id}
            className="flex group justify-between items-center border-b pb-2"
          >
            <div>
              <p>{c.content}</p>
              <p className="text-xs text-gray-400">
                {c.authorEmail} • {formatDate(c.timestamp)}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="group-hover:opacity-100 opacity-0 transition-opacity"
              onClick={() => deleteComment({ variables: { commentId: c.id } })}
            >
              <X />
            </Button>
          </div>
        ))}
      </div>

      {/* Add Comment Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex gap-2 items-center mt-2"
      >
        <Input
          placeholder="Write a comment..."
          {...register("content", { required: true })}
        />
        <Button type="submit">Add</Button>
      </form>
    </div>
  );
}
