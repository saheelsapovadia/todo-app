import { Todo } from "../Utilities/types";
import { useAuth } from "../context/AuthProvider";

interface AddTaskButtonProps {
  onAddTask: (newTask: Todo) => void;
  openModal: () => void;
  loading: boolean;
}

const AddTaskButton = ({ openModal, loading }: AddTaskButtonProps) => {
  const { logout } = useAuth();
  return (
    <>
      <div className="navigation-bar">
        <button className="add-task-btn shadow" onClick={openModal}>
          Add Task
        </button>
        {!loading ? <></> : <div className="spinner spinner-nav"></div>}
        <button className="add-task-btn logout-btn shadow" onClick={logout}>
          Logout
        </button>
      </div>
    </>
  );
};

export default AddTaskButton;
