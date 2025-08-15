import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { UPDATE_TASK, DELETE_TASK } from "@/graphql/mutations";
import { GET_TASK, GET_TASKS } from "@/graphql/queries";

interface TaskEditFormProps {
  task: any;
  id: string;
  onClose?: () => void;
  projectId: string | null;
}

export default function TaskEditForm({
  task,
  id,
  onClose = () => {},
  projectId,
}: TaskEditFormProps) {
  const [updateTask] = useMutation(UPDATE_TASK, {
    refetchQueries: [{ query: GET_TASK, variables: { id } }],
    onCompleted: () => {
      onClose(); // Close the form after deletion
    },
  });
  const [deleteTask] = useMutation(DELETE_TASK, {
    refetchQueries: [{ query: GET_TASKS, variables: { projectId } }],
    onCompleted: () => {
      onClose(); // Close the form after deletion
    },
  });

  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      title: task.title,
      description: task.description || "",
      status: task.status,
      dueDate: task.dueDate ? new Date(task.dueDate) : null,
    },
  });

  const onSubmit = (values: any) => {
    updateTask({
      variables: {
        taskId: id,
        title: values.title,
        description: values.description,
        status: values.status,
        dueDate: values.dueDate
          ? values.dueDate.toISOString().split("T")[0]
          : null,
      },
    });
  };

  const handleDelete = () => {
    if (confirm("Delete this task?")) {
      deleteTask({ variables: { taskId: id } });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 ">
      <div className="space-y-2">
        <Label htmlFor="title">Task Title</Label>
        <Input
          {...register("title", { required: true })}
          id="title"
          placeholder="Enter task title"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          {...register("description")}
          id="description"
          placeholder="Add task details..."
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label>Status</Label>
        <Select
          onValueChange={(val) => setValue("status", val)}
          defaultValue={task.status}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="TODO">To Do</SelectItem>
            <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
            <SelectItem value="DONE">Done</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Due Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {watch("dueDate") !== null ? (
                format(watch("dueDate") as Date, "PPP")
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0" align="start">
            <Calendar
              mode="single"
              selected={watch("dueDate") || undefined}
              onSelect={(date) => setValue("dueDate", date || null)}
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <Button variant="destructive" type="button" onClick={handleDelete}>
          Delete
        </Button>
        <Button type="submit" className="px-5">
          Save
        </Button>
      </div>
    </form>
  );
}
