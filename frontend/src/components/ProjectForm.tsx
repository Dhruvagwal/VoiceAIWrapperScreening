import { useMutation } from "@apollo/client";
import { CREATE_PROJECT } from "@/graphql/mutations";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Plus, PlusIcon } from "lucide-react";
import { SidebarMenuButton } from "./ui/sidebar";

type FormValues = {
  name: string;
  description?: string;
  status: string;
  dueDate?: string;
};

export default function ProjectFormModal({
  onCreated,
}: {
  onCreated?: () => void;
}) {
  const [open, setOpen] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      description: "",
      status: "ACTIVE",
      dueDate: "",
    },
  });

  const [createProject, { loading, error }] = useMutation(CREATE_PROJECT, {
    onCompleted: () => {
      onCreated?.();
      form.reset();
      setOpen(false);
    },
    update(cache, { data }) {
      const newProj = data?.createProject?.project;
      if (!newProj) return;
      cache.modify({
        fields: {
          projects(existing = []) {
            return [newProj, ...existing];
          },
        },
      });
    },
  });

  const onSubmit = (values: FormValues) => {
    if (!values.name.trim()) return;
    createProject({
      variables: {
        data: {
          ...values,
          dueDate: values.dueDate || null,
        },
      },
      optimisticResponse: {
        createProject: {
          __typename: "CreateProject",
          ok: true,
          project: {
            __typename: "ProjectType",
            id: String(Math.random()),
            ...values,
            dueDate: values.dueDate || null,
            taskCount: 0,
            completedTasks: 0,
          },
        },
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="w-full flex justify-end">
        <DialogTrigger asChild>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <Plus className="text-sidebar-foreground/70" />
            <span>Add New Project</span>
          </SidebarMenuButton>
        </DialogTrigger>
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Project</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Project name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Project description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ACTIVE">Active</SelectItem>
                        <SelectItem value="COMPLETED">Completed</SelectItem>
                        <SelectItem value="ON_HOLD">On Hold</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {error && (
              <div className="text-sm text-red-600">{error.message}</div>
            )}
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Creating..." : "Create"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
