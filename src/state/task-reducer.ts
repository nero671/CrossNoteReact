import {FilterValueType, TaskStateType, TodolistType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    taskId: string,
    todolistId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    todolistId: string,
    title: string
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    todolistId: string,
    taskId: string,
    isDone: boolean
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string,
    taskId: string,
    title: string
}


export type ActionType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusActionType | ChangeTaskTitleActionType
    | AddTodolistActionType | RemoveTodolistActionType;

 export let todollistId1 = v1();
export let todollistId2 = v1();

const initialState: TaskStateType = {
    [todollistId1]: [
        {id: v1(), title: 'task1', isDone: true},
        {id: v1(), title: 'task2', isDone: true},
        {id: v1(), title: 'task3', isDone: false},
    ],
    [todollistId2]: [
        {id: v1(), title: 'task1-1', isDone: true},
        {id: v1(), title: 'task2-2', isDone: false},
    ],
}

export const taskReducer = (state: TaskStateType = initialState, action: ActionType): TaskStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state};
            const tasks = state[action.todolistId];
            const filteredTask = tasks.filter(item => item.id !== action.taskId);
            stateCopy[action.todolistId] = filteredTask;
            return stateCopy;
        }

        case 'ADD-TASK': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];
            const newTask = {id: v1(), title: action.title, isDone: false};
            const newTasks = [newTask, ...tasks]
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }

        case 'CHANGE-TASK-STATUS': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];
            stateCopy[action.todolistId] = tasks.map(t =>
                t.id === action.taskId ?
                    {...t, isDone: action.isDone } : t );

            return stateCopy;
        }

        case 'CHANGE-TASK-TITLE': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];
            stateCopy[action.todolistId] = tasks.map(t =>
                t.id === action.taskId ?
                    {...t, title: action.title } : t );

            return stateCopy;
        }

        case 'ADD-TODOLIST': {
            const stateCopy = {...state};
            stateCopy[action.todolistId] = [];
            return stateCopy;
        }

        case 'REMOVE-TODOLIST': {
            const stateCopy = {...state};
            delete stateCopy[action.id]
            return stateCopy
        }

        default:
            return state
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return  { type: 'REMOVE-TASK', taskId, todolistId }
}

export const addTaskAC = (title: string, todolistId: string): AddTaskActionType => {
    return  { type: 'ADD-TASK', title, todolistId }
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeTaskStatusActionType => {
    return  { type: 'CHANGE-TASK-STATUS', taskId, isDone, todolistId }
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return  { type: 'CHANGE-TASK-TITLE', taskId, title, todolistId }
}


