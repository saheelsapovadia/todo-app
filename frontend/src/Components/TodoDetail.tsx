import React, { useEffect } from 'react'
import { Todo, Value } from '../Utilities/types';
import '../assets/styles/TodoDetail.scss'
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';


interface TodoDetailProps {
    selectedTodo: Todo|null;
    onClose: ()=>void;
    addNewTodo: (newTask: Todo)=>void;
    deleteTodo: (id:String)=>void;
    updateTodo: (todo:Todo)=>void;
    editMode: boolean;

}



const TodoDetail = ({selectedTodo,addNewTodo, updateTodo, deleteTodo, onClose,editMode}:TodoDetailProps) => {
    const [task, setTask] = React.useState('')
    const [scheduledAt, setScheduledAt] = React.useState<Value>(new Date())

    const addNew = () => {
        console.log('add new task')
        if(task === '') {
            alert('Task title cannot be empty')
            return
        }
        if(scheduledAt === null) {
            alert('Scheduled date cannot be empty')
            return
        }
        let t:Todo = {
            title: task,
            status: 'todo',
            createdAt: new Date(),
            scheduledAt: scheduledAt
        };
        console.log(t)
        addNewTodo(t)
    }

    const handleUpdateTask = () => {
        let updatedSelectedTask:Todo|null = selectedTodo
        updatedSelectedTask!.title = task
        updatedSelectedTask!.scheduledAt = scheduledAt
        if(updatedSelectedTask) updateTodo(updatedSelectedTask)
    }

    useEffect(() => {
        if (selectedTodo != null) {
            console.log('selected task', selectedTodo)
            setTask(selectedTodo.title)
            setScheduledAt(selectedTodo.scheduledAt)
        }
    },[])
  
    if (!editMode) {
        return (
            <div className='task-detail-wrapper task-detail'>
                <div className='task-detail-container'>
                    <p className='task-title'>Add new task</p>
                    <form className='task-form'>
                        <textarea placeholder="Enter title" value={task} onChange={(e) => setTask(e.target.value)}></textarea>
                        <DateTimePicker onChange={setScheduledAt} value={scheduledAt} />
                    </form>
                    <div className="collapse" onClick={() => onClose()}>
                        <img className="icon" src='/images/collapse.svg' alt="Avatar 1" />
                    </div>
                    <div className='action-btns'>
                        {/* <button onClick={addNew}>delete</button> */}
                        <button onClick={addNew}>save</button>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className='task-detail-wrapper task-detail'>
            <div className='task-detail-container'>
                <p className='task-title'>Add new task</p>
                <form className='task-form'>
                    <textarea placeholder="Enter title" value={task} onChange={(e) => setTask(e.target.value)}></textarea>
                    {/* <input type="datetime-local" value={scheduledAt.toString()} onChange={(e) => setScheduledAt(new Date(e.target.value))} /> */}
                    <DateTimePicker onChange={setScheduledAt} value={scheduledAt} />
                </form>
                <div className="collapse" onClick={() => onClose()}>
                    <img className="icon" src='/images/collapse.svg' alt="Avatar 1" />
                </div>
                <div className='action-btns'>
                    <button className='add-task-btn shadow' onClick={()=>{if(selectedTodo && selectedTodo.uid) deleteTodo(selectedTodo.uid)}}>delete</button>
                    <button className='add-task-btn shadow' onClick={handleUpdateTask}>save</button>
                </div>
            </div>
        </div>
    )
}

export default TodoDetail