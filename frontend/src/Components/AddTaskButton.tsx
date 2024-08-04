import { Todo } from '../Utilities/types';
import { useAuth } from '../context/AuthProvider';

interface AddTaskButtonProps {
    onAddTask:(newTask: Todo)=>void;
    openModal:()=>void;
}

const AddTaskButton = ({openModal}:AddTaskButtonProps) => {
  const { logout } = useAuth();
  return (
    <>
    <div className='navigation-bar'>

    <button className='add-task-btn shadow' onClick={openModal}>Add Task</button>
    <button className='add-task-btn logout-btn shadow' onClick={logout}>Logout</button>
    </div>
    </>
  )
}

export default AddTaskButton