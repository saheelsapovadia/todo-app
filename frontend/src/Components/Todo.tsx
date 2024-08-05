import { Todo as TodoType } from '../Utilities/types';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { UniqueIdentifier } from '@dnd-kit/core';
import { getReadableDateTime } from '../Utilities/generate';

interface TodoProps {
    todo: TodoType;
    expand:(todo:TodoType)=>void;
}

const Todo = ({todo, expand}:TodoProps) => {

    
    const {
        setNodeRef,
        isDragging,
        transform,
        transition,
        listeners,
        attributes,
    } = useSortable({
        id: todo.uid as UniqueIdentifier,
        data: {
            type: 'Todo',
            todo
        }
    });


    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className='component-overlay'
            >

            </div>
        )
    }
  return (
    <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="component"
            
            >
            <div className="top-bar">
                <span className="star">★</span>
                <span className="today">Today</span>
            </div>
            <div className="main-content">
                <h2 className="title">{todo.title}</h2>
                <p className="time">{getReadableDateTime(todo.scheduledAt)}</p>
            </div>
            <div className="delete" onClick={() => expand(todo)}>
                <img className="icon" src='/images/expand.svg' alt="Avatar 1" />
            </div>
            <div></div>
        </div>
  )
}

export default Todo