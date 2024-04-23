import {AddItemForm} from "../AddItemForm";
import {Task} from "../Task";
import React from "react";
import { fn } from '@storybook/test';
import { action } from '@storybook/addon-actions';

export default {
    title: "Task Component",
    component: Task,
}

const changeTaskTitleCallback = action('Status changed');
const removeTaskCallback = action('remove Task');
const changeTaskStatusCallback = action('change Task Status');


export const TaskBaseExample = () => {
    return <>
        <Task
            task={ { id: '1', isDone: true, title: 'css' } }
            changeTaskTitle={changeTaskTitleCallback}
            removeTask={removeTaskCallback}
            changeTaskStatus={changeTaskStatusCallback}
            todolistId={'todolistId1'}
        />

        <Task
            task={ { id: '2', isDone: false, title: 'css' } }
            changeTaskTitle={changeTaskTitleCallback}
            removeTask={removeTaskCallback}
            changeTaskStatus={changeTaskStatusCallback}
            todolistId={'todolistId1'}
        />
    </>
}
