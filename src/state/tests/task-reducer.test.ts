import {TaskStateType, TodolistType} from "../../App";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, taskReducer} from "../task-reducer";
import {addTodolistAC} from "../todolists-reducer";

test('correct task should be removed', () => {
    const startState: TaskStateType = {
        'todollistId1': [
            {id: '1', title: 'task1', isDone: true},
            {id: '2', title: 'task2', isDone: true},
            {id: '3', title: 'task3', isDone: false},
        ],
        'todollistId2': [
            {id: '1', title: 'task1-1', isDone: true},
            {id: '2', title: 'task2-2', isDone: false},
            {id: '3', title: 'task3-3', isDone: false},
        ],
    }

    const action = removeTaskAC('2', 'todollistId2')

    const endState = taskReducer(startState, action);

    expect(endState['todollistId1'].length).toBe(3)
    expect(endState['todollistId2'].length).toBe(2)
    expect(endState['todollistId2']
        .every((item) => item.id != '2')).toBeTruthy();
});

test('correct task should be added', () => {
    const startState: TaskStateType = {
        'todollistId1': [
            {id: '1', title: 'task1', isDone: true},
            {id: '2', title: 'task2', isDone: true},
            {id: '3', title: 'task3', isDone: false},
        ],
        'todollistId2': [
            {id: '1', title: 'task1-1', isDone: true},
            {id: '2', title: 'task2-2', isDone: false},
            {id: '3', title: 'task3-3', isDone: false},
        ],
    }

    const action = addTaskAC('task4-4', 'todollistId2')

    const endState = taskReducer(startState, action);

    expect(endState['todollistId1'].length).toBe(3)
    expect(endState['todollistId2'].length).toBe(4)
    expect(endState['todollistId2'][0].id).toBeDefined()
    expect(endState['todollistId2'][0].title).toBe('task4-4')
    expect(endState['todollistId2'][0].isDone).toBe(false)

});

test('status of specified should be changed', () => {
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

    const action = changeTaskStatusAC('2', false, 'todollistId2')

    const endState = taskReducer(startState, action);

    expect(endState['todollistId2'][1].isDone).toBeFalsy()
    expect(endState['todollistId1'][1].isDone).toBeTruthy()
});

test('title of specified should be changed', () => {
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

    const action = changeTaskTitleAC('2', 'task3-3-3', 'todollistId2')

    const endState = taskReducer(startState, action);

    expect(endState['todollistId2'][1].title).toBe('task3-3-3')
    expect(endState['todollistId1'][1].title).toBe('task2')
});


test('new properties should be added when new todolist is added', () => {
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

    const action = addTodolistAC('new todolist');

    const endState = taskReducer(startState, action);

    const keys = Object.keys(endState);
    const newKey = keys.find(item => item != 'todollistId1' &&
                        item != 'todollistId2');

    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
});

