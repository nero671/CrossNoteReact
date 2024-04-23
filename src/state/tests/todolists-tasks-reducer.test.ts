import {TaskStateType, TodolistType} from "../../App";
import {addTodolistAC, removeTodolistAC, todolistsReducer} from "../todolists-reducer";
import {taskReducer} from "../task-reducer";
import {v1} from "uuid";

test('ids should be equal', () => {
    const startTaskState = {};
    const startTodolistsState: Array<TodolistType> = [];

    const action = addTodolistAC('new todolist');

    const endTaskState = taskReducer(startTaskState, action);
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTaskState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolistId)
    expect(idFromTodolists).toEqual(action.todolistId)
});

test('properties with todolist id should be deleted', () => {
    const startState: TaskStateType = {
        'todollistId1': [
            {id: '1', title: 'task1', isDone: true},
            {id: '2', title: 'task2', isDone: true},
            {id: '3', title: 'task3', isDone: false},
        ],
        'todollistId2': [
            {id: '1', title: 'task1-1', isDone: true},
            {id: '2', title: 'task2-2', isDone: true},
            {id: '3', title: 'task3-3', isDone: false},
        ],
    }

    const action = removeTodolistAC('todollistId2');

    const endState = taskReducer(startState, action);

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1)
    expect(endState['todollistId2']).not.toBeDefined();
})
