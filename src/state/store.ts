import {combineReducers, createStore} from "redux";
import {settingsReducer} from "./settingsReducer";
import {counterReducer} from "./counterReducer";
import {loadState, saveState} from "../utils/localStorageUtils";

const rootReducer = combineReducers(
    {
    counterState: counterReducer,
    settings: settingsReducer,
    }
)


export const store = createStore(rootReducer, loadState())

store.subscribe(() => {
     saveState({
         counterState: store.getState().counterState,
         settings: store.getState().settings,
     });
 });


// @ts-ignore
window.store = store
export type RootStateType = ReturnType<typeof rootReducer>


// {
//     "counterState": {
//     "counterValue": 2,
//         "currentMax": 6,
//         "currentMin": 2,
//         "error": ""
// },
//     "settings": {
//     "visible": false,
//         "maxToSet": 6,
//         "minToSet": 2
// }
// }