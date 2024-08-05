import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { Column as ColumnType, Todo as TodoType } from "../Utilities/types";
import { arrayMove } from "@dnd-kit/sortable";
import AddTaskButton from "../Components/AddTaskButton";
import Column from "../Components/Column";
import Todo from "../Components/Todo";
import TodoDetail from "../Components/TodoDetail";
import { useAuth } from "../context/AuthProvider";
import axiosInstance from "../Utilities/AxiosInterceptor";
import { BACKEND_URL } from "../Utilities/generate";

const columnsData: ColumnType[] = [
  { id: "todo", title: "Todo", type: "todo" },
  { id: "inProgress", title: "In Progress", type: "inProgress" },
  { id: "completed", title: "Completed", type: "completed" },
];

const TodoPage = () => {
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 10 } }),
    useSensor(TouchSensor)
  );

  const [tasks, setTasks] = useState<TodoType[]>([]);
  const [activeTask, setActiveTask] = useState<TodoType | null>(null);
  const [columns, _setColumns] = useState(columnsData);
  const [taskEditMode, setTaskEditMode] = useState(false);
  const [showDetail, setShowDetail] = useState(false);

  const { userInfo } = useAuth();

  useEffect(() => {
    console.log("user info", userInfo);
    if (userInfo) {
      let user = JSON.parse(userInfo);
      getTodos(user.uid);
    }
  }, [userInfo]);

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Todo") {
      setActiveTask(event.active.data.current.todo);
      return;
    }
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    console.log(active);
    console.log(over);
    if (!over) {
      return;
    }
    const activeId = active.id;
    const overId = over.data.current?.id;
    const overType = over.data.current?.column?.type;

    if (activeId === overId) {
      return;
    }

    const isActiveATask = active.data.current?.type === "Todo";

    // dropping task over other task
    if (over.data.current?.type === "Todo") {
      const overTask: TodoType = over.data.current.todo;
      const overTaskIndex = tasks.findIndex(
        (task) => task.uid === overTask.uid
      );
      const activeTaskIndex = tasks.findIndex(
        (task) => task.uid === activeTask?.uid
      );

      tasks[activeTaskIndex].status = tasks[overTaskIndex].status;

      const newTasks = [...tasks];
      setTasks(arrayMove(newTasks, activeTaskIndex, overTaskIndex));
      return;
    }

    const isOverAColumn = over.data.current?.type === "Column";

    if (isActiveATask && isOverAColumn) {
      const activeTaskIndex = tasks.findIndex(
        (task) => task.uid === activeTask?.uid
      );

      tasks[activeTaskIndex].status = overType;

      const newTasks = [...tasks];
      setTasks(arrayMove(newTasks, activeTaskIndex, activeTaskIndex));
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    console.log("drag end", event);
    const { active } = event;

    updateTodo(active.data.current?.todo);
  };

  const collapse = () => {
    setShowDetail(false);
  };
  const expand = (task: TodoType) => {
    setActiveTask(task);
    setTaskEditMode(true);
    setShowDetail(true);
  };

  const openAddNewTask = () => {
    setTaskEditMode(false);
    setShowDetail(true);
    setActiveTask(null);
  };

  const handleAddTask = (newTask: TodoType) => {
    let newTodo = {
      userId: JSON.parse(userInfo).uid,
      ...newTask,
    };
    console.log(newTodo);
    axiosInstance.post(`${BACKEND_URL}api/todo`, newTodo).then((response) => {
      if (response.status === 200) {
        console.log("new todo", response.data);
        setTasks([...tasks, newTask]);
        setShowDetail(false);
      }
    });
    getTodos(JSON.parse(userInfo).uid);
  };

  const handleUpdateTask = (updatedTask: TodoType) => {
    const taskIndex = tasks.findIndex((task) => task.uid === updatedTask.uid);
    updateTodo(updatedTask).then((response) => {
      if (response) {
        const newTasks = [...tasks];
        newTasks[taskIndex] = updatedTask;
        setTasks(newTasks);
        console.log("updated task", updatedTask);
        setShowDetail(false);
      }
    });
  };

  const updateTodo = async (todo: TodoType): Promise<boolean> => {
    try {
      let res = await axiosInstance.put(
        `${BACKEND_URL}api/todo/${todo.uid}`,
        todo
      );
      return res.status === 200;
    } catch (error) {
      console.error("Error updating task", error);
      return false;
    }
  };

  const getTodos = (userId: String) => {
    console.log(BACKEND_URL);
    axiosInstance
      .get(`${BACKEND_URL}api/getAllTodos/${userId}`)
      .then((response) => {
        console.log("user data", response.data);
        setTasks(response.data);
      });
  };

  const deleteTask = (id: String) => {
    axiosInstance.delete(`${BACKEND_URL}api/todo/${id}`).then((response) => {
      if (response.status == 204) {
        console.log("deleted task", response.data);
        setTasks(tasks.filter((task) => task.uid !== id));
        setShowDetail(false);
      }
    });
  };

  return (
    <>
      <AddTaskButton onAddTask={handleAddTask} openModal={openAddNewTask} />
      <DndContext
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragEnd={onDragEnd}
        sensors={sensors}
      >
        <div className="app-container flex ">
          {columns.map((column) => {
            return (
              <Column
                column={column}
                todos={tasks.filter((task) => task.status === column.id)}
                expand={expand}
              />
            );
          })}
        </div>
        <DragOverlay>
          {activeTask && <Todo todo={activeTask} expand={expand} />}
        </DragOverlay>
      </DndContext>
      {showDetail && (
        <TodoDetail
          selectedTodo={activeTask}
          onClose={collapse}
          editMode={taskEditMode}
          addNewTodo={handleAddTask}
          updateTodo={handleUpdateTask}
          deleteTodo={deleteTask}
        />
      )}
    </>
  );
};

export default TodoPage;
