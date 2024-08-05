import { useMemo } from "react";
import { Column as ColumnType, Todo as TodoType } from "../Utilities/types";
import { UniqueIdentifier, useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import Todo from "./Todo";

interface ColumnProps {
  column: ColumnType;
  todos: TodoType[];
  expand: (todo: TodoType) => void;
}

const Column = ({ column, todos, expand }: ColumnProps) => {
  const taskIds: UniqueIdentifier[] = useMemo(
    () => todos.map((task) => task.uid as UniqueIdentifier),
    [todos]
  );
  const { setNodeRef } = useDroppable({
    id: column.id as UniqueIdentifier,
    data: { type: "Column", column },
  });

  return (
    <div ref={setNodeRef} className="column">
      <h2 className="column-heading">{column.title}</h2>
      <div className="tasks">
        <SortableContext items={taskIds}>
          {todos.map((todo) => (
            <Todo todo={todo} expand={expand} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
};

export default Column;
