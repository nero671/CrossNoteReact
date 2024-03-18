import {FilterValueType, TodolistType} from "../App";
import {v1} from "uuid";
import {todollistId1, todollistId2} from "./task-reducer";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}

export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    title: string,
    todolistId: string,
}

export type ChangeTitleTodolistActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}

export type ChangeFilterTodolistActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValueType
}

export type ActionType = RemoveTodolistActionType | AddTodolistActionType | ChangeTitleTodolistActionType | ChangeFilterTodolistActionType;

const initialState: Array<TodolistType> = [
    {id: todollistId1, title: 'What to learn', filter: 'all'},
    {id: todollistId2, title: 'What to learn2', filter: 'active'}
]
export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(item => item.id !== action.id)
        case 'ADD-TODOLIST':
            return [{
                id: action.todolistId,
                title: action.title,
                filter: 'all'
            }, ...state]
        case 'CHANGE-TODOLIST-TITLE': {
            let todolists = state.find(item => item.id === action.id);
            if(todolists) {
                todolists.title = action.title;
            }

            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            let todolists = state.find(item => item.id === action.id);

            if(todolists) {
                todolists.filter = action.filter;
            }

            return [...state]
        }
        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId }
}

export const addTodolistAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title: title, todolistId: v1() }
}

export const changeTodolistTitleAC = (id: string, title: string): ChangeTitleTodolistActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', id: id, title: title }
}

export const changeTodolistFilterAC = (id: string, filter: FilterValueType): ChangeFilterTodolistActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter }
}
