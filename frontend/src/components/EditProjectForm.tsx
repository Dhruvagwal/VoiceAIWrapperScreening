import { useMutation } from "@apollo/client";
import { UPDATE_PROJECT } from "@/graphql/mutations";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type EditProjectFormProps = {
  project: {
    id: string;
    name: string;
    description?: string;
    status: string;
    dueDate?: string | null;
  } | null;
  onClose?: () => void;
  onUpdated?: () => void;
};

export default function EditProjectForm({
  project,
  onUpdated,
  onClose = () => {},
}: EditProjectFormProps) {
  if (!project) return null;
  const form = useForm({
    defaultValues: {
      name: project.name,
      description: project.description || "",
      status: project.status,
      dueDate: project.dueDate ? project.dueDate.slice(0, 10) : "",
    },
  });

  const [updateProject, { loading, error }] = useMutation(UPDATE_PROJECT, {
    onCompleted: () => {
      onUpdated?.();
    },
  });

  const onSubmit = async (values: any) => {
    await updateProject({
      variables: {
        projectId: project.id,
        name: values.name,
        description: values.description,
        dueDate: values.dueDate || null,
        status: values.status,
      },
    });
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Project</DialogTitle>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <Input
            placeholder="Project Name"
            {...form.register("name", { required: true })}
          />
          <Textarea
            placeholder="Description"
            {...form.register("description")}
          />
          <Select
            value={form.watch("status")}
            onValueChange={(val) => form.setValue("status", val)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
              <SelectItem value="ON_HOLD">On Hold</SelectItem>
            </SelectContent>
          </Select>
          <Input type="date" {...form.register("dueDate")} />
          <Button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Project"}
          </Button>
          {error && <p className="text-sm text-red-500">{error.message}</p>}
        </form>
      </DialogContent>
    </Dialog>
  );
}
