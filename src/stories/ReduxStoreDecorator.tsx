import {Provider} from "react-redux";
import {AppRootState, store} from "../state/store";
import {createStore} from "redux";
import {TaskStateType} from "../App";
import {v1} from "uuid";
import {todollistId1, todollistId2} from "../state/task-reducer";

// const initialGlobalState: TaskStateType = {
//     todolists: [
//         {id: todollistId1, title: 'What to learn', filter: 'all'},
//         {id: todollistId2, title: 'What to learn2', filter: 'active'}
//     ],
//     tasks: {
//         [todollistId1]: [
//             {id: v1(), title: 'task1', isDone: true},
//             {id: v1(), title: 'task2', isDone: true},
//             {id: v1(), title: 'task3', isDone: false},
//         ],
//         [todollistId2]: [
//             {id: v1(), title: 'task1-1', isDone: true},
//             {id: v1(), title: 'task2-2', isDone: false},
//         ],
//     }
// }
//
// export const storyBookStore = createStore(rootReducer, initialGlobalState as AppRootStateType )

export const ReduxStoreDecorator = (story: any) => {
    return <Provider store={store}>{story()}</Provider>
}
