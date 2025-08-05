
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {IconButton} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';


type CreateItemFormTypes = {
    createItem: (newItemTitle:string) => void
    maxItemTitleLength: number
};

export const CreateItemForm = ({createItem, maxItemTitleLength}: CreateItemFormTypes) => {
    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState(false)
    const addTaskCondition = Boolean(taskTitle && taskTitle.length <= maxItemTitleLength)

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
                   placeholder={`Max ${maxItemTitleLength} characters`}
                   onChange={onChangeTaskTitleHandler}
                   onKeyDown={onKeyDownCreateTaskHandler}
                   className={error ? 'error' : ''}
            />
            <IconButton onClick={createTaskHandler}
                        disabled={!addTaskCondition}>
                <AddBoxIcon/>
            </IconButton>
            {taskTitle && taskTitle.length <= maxItemTitleLength &&
                <div>Rest {maxItemTitleLength - taskTitle.length} characters</div>}
            {taskTitle.length > maxItemTitleLength && <div style={{color: 'red'}}>Title is too long</div>}
            {error && <div className='error-message'>Title is required</div>}
        </div>
    );
};