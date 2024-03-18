import {combineReducers, createStore} from 'redux'
import {taskReducer} from "./task-reducer";
import {todolistsReducer} from "./todolists-reducer";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: taskReducer,
});

export const store  = createStore(rootReducer);

export type AppRootState = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;
