import type { Project } from "@/lib/types";
import { Progress } from "@/components/ui/progress";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { DELETE_PROJECT } from "@/graphql/mutations";
import { PROJECTS } from "@/graphql/queries";
import { useMutation } from "@apollo/client";
import EditProjectForm from "./EditProjectForm";
import { useState } from "react";
import { Link } from "react-router-dom";
import { formatDate, formatDateWithTime } from "@/lib/utils";
import { Badge } from "./ui/badge";

type Props = { project: Project };
export default function ProjectInfo({ project }: Props) {
  const [deleteProject] = useMutation(DELETE_PROJECT, {
    refetchQueries: [{ query: PROJECTS }],
  });

  const [activeEdit, setActiveEdit] = useState<boolean>(false);
  const handleCloseEdit = () => {
    setActiveEdit(false);
  };
  const handleDeleteProject = async (projectId: string) => {
    await deleteProject({ variables: { projectId: projectId } });
  };
  return (
    <>
      <EditProjectForm
        onClose={handleCloseEdit}
        project={activeEdit ? project : null}
      />

      <Progress value={(project.completedTasks * 100) / project.taskCount} />
      <div className="py-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium items-center mb-2 flex gap-4">
              <span className="text-3xl"> {project.name} </span>
              <Badge variant="secondary">
                {formatDateWithTime(project.dueDate ?? "")}
              </Badge>
            </div>
            <div className="text-sm text-gray-500">{project.description}</div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost" size="icon">
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={() => setActiveEdit(true)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDeleteProject(project.id)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
}
