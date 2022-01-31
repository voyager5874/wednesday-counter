import {combineReducers, createStore} from "redux";
import {settingsReducer} from "./settingsReducer";
import {counterReducer} from "./counterReducer";

const rootReducer = combineReducers(
    {
    counterState: counterReducer,
    settings: settingsReducer,
    }
)

export const store = createStore(rootReducer)

export type RootStateType = ReturnType<typeof rootReducer>