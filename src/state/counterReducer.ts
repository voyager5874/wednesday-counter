import {ApplySettingsActionType} from "./settingsReducer";

export type CounterStateType = {
    counterValue: number
    currentMax: number
    currentMin: number
    error: string
}

const iniState: CounterStateType = {
    counterValue: 0,
    currentMax: 1,
    currentMin: 0,
    error: '',
}

type IncrementActionType = {
    type: "INCREMENT"
}

type SetValueActionType = {
    type: "SET-VALUE"
    counter: number
}

type ResetActionType = {
    type: "RESET"
}

type SetErrorActionType = {
    type: "SET-ERROR"
    error: string
}


type CounterActionsType =
    IncrementActionType
    | ResetActionType
    | SetErrorActionType
    | ApplySettingsActionType
    | SetValueActionType

export const counterReducer = (state: CounterStateType = iniState, action: CounterActionsType): CounterStateType => {
    switch (action.type) {
        case "SET-VALUE":
            return {...state, counterValue: action.counter}
        case "RESET":
            return {...state, counterValue: state.currentMin}
        case "SET-ERROR":
            return {...state, error: action.error}
        case "APPLY-SETTINGS":
            return {...state, currentMin: action.minToSet, currentMax: action.maxToSet}
        default:
            return state

    }
}

export const setValueAC = (counterValue: number): SetValueActionType => {
    return {
        type: "SET-VALUE",
        counter: counterValue,
    } as const
}

export const resetAC = (): ResetActionType => {
    return {
        type: "RESET"
    } as const
}

export const setErrorAC = (errorText: string): SetErrorActionType => {
    return {
        type: "SET-ERROR",
        error: errorText,
    } as const
}