import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_TASK } from "@/graphql/mutations";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
interface TaskFormProps {
  projectId: string;
  onCreated?: () => void;
}

export default function TaskForm({
  projectId,
  onCreated = () => {},
}: TaskFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<{ title: string }>({
    defaultValues: { title: "" },
  });

  const [createTask, { loading, error }] = useMutation(CREATE_TASK, {
    onCompleted: () => {
      onCreated();
    },
  });

  const onSubmit = async (values: { title: string }) => {
    if (!values.title.trim()) return;

    await createTask({
      variables: {
        data: {
          projectId,
          title: values.title,
          status: "TODO",
        },
      },
    });
    form.reset();
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <Button variant="ghost" size="sm" onClick={() => setIsOpen(true)}>
        + Add Task
      </Button>
    );
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col gap-2 rounded-xl"
    >
      <Textarea
        placeholder="New task title…"
        {...form.register("title", { required: true })}
      />
      <div className="flex gap-2 justify-end">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            form.reset();
            setIsOpen(false);
          }}
        >
          Cancel
        </Button>
        <Button type="submit" size="sm" disabled={loading}>
          {loading ? "Adding..." : "Add Task"}
        </Button>
      </div>
      {error && <span className="text-xs text-red-600">{error.message}</span>}
    </form>
  );
}
