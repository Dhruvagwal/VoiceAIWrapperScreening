import { useMemo, useState, useCallback } from "react";
import type { Task } from "@/lib/types";
import TodoView from "@/components/EditTask";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Circle, CircleAlert, CircleCheck, Pencil } from "lucide-react";
import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_TASK } from "@/graphql/mutations";
import { cn } from "@/lib/utils";
import TaskForm from "./TaskForm";
import { GET_PROJECT, GET_TASKS } from "@/graphql/queries";
import { Separator } from "./ui/separator";
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd";

const STATUSES: Task["status"][] = ["TODO", "IN_PROGRESS", "DONE"];

export default function TaskList({
  tasks,
  projectId,
}: {
  tasks: Task[];
  projectId: string | null;
}) {
  const [updateTask] = useMutation(UPDATE_TASK);
  const { refetch: refetchTasks } = useQuery(GET_TASKS, { variables: { projectId } });
  const { refetch: refetchProject } = useQuery(GET_PROJECT, {
    variables: { id: projectId ?? "" },
  });

  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const taskColumns = useMemo(
    () =>
      STATUSES.map((status) => ({
        status,
        tasks: tasks.filter((t) => t.status === status),
      })),
    [tasks]
  );

  const refreshData = useCallback(() => {
    refetchTasks();
    refetchProject();
  }, [refetchTasks, refetchProject]);

  const handleStatusToggle = async (taskId: string, currentStatus: string) => {
    const nextStatus =
      currentStatus === "DONE"
        ? "TODO"
        : currentStatus === "TODO"
        ? "IN_PROGRESS"
        : "DONE";

    await updateTask({ variables: { taskId, status: nextStatus } });
    refreshData();
  };

  const onDragEnd = useCallback(
    async (result: DropResult) => {
      const { source, destination } = result;
      if (!destination) return;

      const sourceIndex = STATUSES.indexOf(source.droppableId as Task["status"]);
      const destIndex = STATUSES.indexOf(destination.droppableId as Task["status"]);

      if (sourceIndex === -1 || destIndex === -1) return;

      if (source.droppableId !== destination.droppableId) {
        const movedTask = taskColumns[sourceIndex].tasks[source.index];
        await updateTask({
          variables: { taskId: movedTask.id, status: STATUSES[destIndex] },
        });
        refreshData();
      }
    },
    [taskColumns, updateTask, refreshData]
  );

  const StatusIcon = ({ status }: { status: Task["status"] }) =>
    status === "DONE" ? (
      <CircleCheck />
    ) : status === "TODO" ? (
      <Circle />
    ) : (
      <CircleAlert />
    );

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-3 max-md:grid-cols-1 gap-4">
          {taskColumns.map(({ status, tasks }) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  className="flex border p-4 flex-col flex-1"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h2 className="font-medium text-sm mb-2">
                    {status.replace("_", " ")}
                  </h2>
                  <Separator />
                  <ul className="flex flex-col divide-y divide-gray-200">
                    {tasks.map((t, index) => (
                      <Draggable key={t.id} draggableId={t.id} index={index}>
                        {(provided) => (
                          <li
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="p-2 rounded group hover:bg-muted transition flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2">
                              <Button
                                onClick={() => handleStatusToggle(t.id, t.status)}
                                className="group-hover:block text-muted-foreground hidden !p-0"
                                variant="link"
                              >
                                <StatusIcon status={t.status} />
                              </Button>
                              <div
                                className={cn(
                                  t.status === "DONE" && "line-through text-muted-foreground",
                                  t.status === "IN_PROGRESS" && "text-blue-600"
                                )}
                              >
                                {t.title}
                              </div>
                            </div>
                            <Button
                              className="group-hover:opacity-100 opacity-0 transition-opacity"
                              size="icon"
                              variant="ghost"
                              onClick={() => setSelectedTaskId(t.id)}
                            >
                              <Pencil />
                            </Button>
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>

                  {status === "TODO" && (
                    <TaskForm
                      onCreated={refreshData}
                      projectId={projectId ?? ""}
                    />
                  )}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      <Dialog
        open={!!selectedTaskId}
        onOpenChange={() => setSelectedTaskId(null)}
      >
        <DialogContent className="min-w-fit">
          {selectedTaskId && (
            <TodoView
              projectId={projectId}
              onClose={() => setSelectedTaskId(null)}
              id={selectedTaskId}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
