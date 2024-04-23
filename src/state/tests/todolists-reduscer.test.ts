import {
    addTodolistAC,
    ChangeFilterTodolistActionType, changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "../todolists-reducer";
import {v1} from "uuid";
import {FilterValueType, TodolistType} from "../../App";

test('correct todolist should be removed', () => {
    let todollistId1 = v1();
    let todollistId2 = v1();

    const startState: Array<TodolistType> = [
        {id: todollistId1, title: 'What to learn', filter: 'all'},
        {id: todollistId2, title: 'What to learn2', filter: 'active'}
    ]

    const endState = todolistsReducer(startState, removeTodolistAC(todollistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todollistId2)
})

test('correct todolist should be added', () => {
    let todollistId1 = v1();
    let todollistId2 = v1();

    let newTodolistTitle = 'New Todolist'

    const startState: Array<TodolistType> = [
        {id: todollistId1, title: 'What to learn', filter: 'all'},
        {id: todollistId2, title: 'What to learn2', filter: 'active'}
    ]

    const endState = todolistsReducer(startState, addTodolistAC(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
    expect(endState[0].filter).toBe('all')
})

test('correct todolist change its name', () => {
    let todollistId1 = v1();
    let todollistId2 = v1();

    let newTodolistTitle = 'New Todolist'

    const startState: Array<TodolistType> = [
        {id: todollistId1, title: 'What to learn', filter: 'all'},
        {id: todollistId2, title: 'What to learn2', filter: 'active'}
    ]

    const action =  {
        type: 'CHANGE-TODOLIST-TITLE' as const,
        id: todollistId2,
        title: newTodolistTitle
    }

    const endState = todolistsReducer(startState, changeTodolistTitleAC(todollistId2, newTodolistTitle));

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle);
})

test('correct filter of todolist should be changed', () => {
    let todollistId1 = v1();
    let todollistId2 = v1();

    let newFilter: FilterValueType = 'completed'

    const startState: Array<TodolistType> = [
        {id: todollistId1, title: 'What to learn', filter: 'all'},
        {id: todollistId2, title: 'What to learn2', filter: 'active'}
    ]

    const action: ChangeFilterTodolistActionType =  {
        type: 'CHANGE-TODOLIST-FILTER',
        id: todollistId2,
        filter: newFilter
    }

    const endState = todolistsReducer(startState, changeTodolistFilterAC(todollistId2, newFilter));

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter);
})
