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

    type ResetActionType = {
    type: "RESET"
    }

    type SetErrorActionType = {
    type: "SET-ERROR"
    }

    type ApplySettingActionType = {
    type: "APPLY-SETTINGS"
    }

    type CounterActionsType = IncrementActionType | ResetActionType | SetErrorActionType | ApplySettingActionType

const counterReducer = (state:CounterStateType = iniState, action: CounterActionsType): CounterStateType=> {
    switch(action.type){
        case "INCREMENT":
            return {...state}
        default:
            return state

    }
}