import {Button} from "./Button.tsx";
import {ChangeEvent, KeyboardEvent, useState} from "react";


type CreateItemFormTypes = {
    createItem: (newItemTitle:string) => void
};

export const CreateItemForm = ({createItem}: CreateItemFormTypes) => {
    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState(false)
    const maxTaskTitleLength = 15
    const addTaskCondition = Boolean(taskTitle && taskTitle.length <= maxTaskTitleLength)

    const onChangeTaskTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        error && setError(false)
        setTaskTitle(e.currentTarget.value)
    }

    const createTaskHandler = () => {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle) {
            createItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTaskTitle('')
    }

    const onKeyDownCreateTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && addTaskCondition) {
            createTaskHandler()
        }
    }



    return (
        <div>
            <input value={taskTitle}
                   placeholder={`Max ${maxTaskTitleLength} characters`}
                   onChange={onChangeTaskTitleHandler}
                   onKeyDown={onKeyDownCreateTaskHandler}
                   className={error ? 'error' : ''}
            />
            <Button title='+'
                    onClickHandler={createTaskHandler}
                    disabled={!addTaskCondition}/>
            {taskTitle && taskTitle.length <= maxTaskTitleLength &&
                <div>Rest {maxTaskTitleLength - taskTitle.length} characters</div>}
            {taskTitle.length > maxTaskTitleLength && <div style={{color: 'red'}}>Title is too long</div>}
            {error && <div className='error-message'>Title is required</div>}
        </div>
    );
};