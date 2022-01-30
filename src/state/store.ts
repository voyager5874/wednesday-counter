import {combineReducers, createStore} from "redux";
import {counterActionsReducer} from "./counterActionsReducer";

const rootReducer = combineReducers({
    counterState: counterActionsReducer
})

export const store = createStore(rootReducer)

export type RootStateType = ReturnType<typeof rootReducer>