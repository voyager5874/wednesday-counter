export type CounterStateType = {
    counterValue: number
    maxValue: number
    minValue: number
    error: string
    settingsVisible: boolean
    maxToBeSet: number
    minToBeSet: number
}

const iniState: CounterStateType = {
    counterValue: 0,
    maxValue: 1,
    minValue: 0,
    error: '',
    settingsVisible: false,
    maxToBeSet: 0,
    minToBeSet: 0,
}

export const counterActionsReducer = (state: CounterStateType = iniState, action: CounterActionsType): CounterStateType => {
    switch (action.type) {
        case "INCREMENT":
            return {...state, counterValue: state.counterValue + 1}
        case "RESET":
            return {...state, counterValue: state.minValue}
        case "SET-ERROR":
            return {...state, error: action.payload.error}
        case "APPLY-SETTINGS":
            return {...state, maxValue: state.maxToBeSet, minValue: state.minToBeSet}
        case "SHOW-SETTINGS":
            return {...state, settingsVisible: true}
        case "HIDE-SETTINGS":
            return {...state, settingsVisible: false}
        case "GET-MAX-FROM-USER":
            return {
                ...state, maxToBeSet: action.payload.max
            }
        case "GET-MIN-FROM-USER":
            return {
                ...state, minToBeSet: action.payload.min
            }
        case "GET-STATE-FROM-STORAGE": {
            // debugger
            return {
                ...state,
                maxValue: action.payload.maxValue,
                minValue: action.payload.minValue,
                counterValue: action.payload.counterValue,
                maxToBeSet: action.payload.maxValue,
                minToBeSet: action.payload.minValue
            }
        }
        default:
            return state
    }
};

type CounterActionsType =
    IncrementCounterActionType
    | ResetCounterActionType
    | SetErrorActionType
    | ApplySettingsActionType
    | ShowSettingsActionType
    | HideSettingsActionType
    | GetStateFromStorageActionType
    | GetMaxFromUserActionType
    | GetMinFromUserActionType

type IncrementCounterActionType = ReturnType<typeof incrementCounterAC>

export const incrementCounterAC = () => {
    return {
        type: "INCREMENT"
    } as const
}

type ResetCounterActionType = ReturnType<typeof resetCounterAC>

export const resetCounterAC = () => {
    return {
        type: "RESET"
    } as const
}

type SetErrorActionType = ReturnType<typeof setErrorAC>

export const setErrorAC = (error: string) => {
    return {
        type: "SET-ERROR",
        payload: {
            error
        }
    } as const
}


type ApplySettingsActionType = ReturnType<typeof applySettingsAC>

export const applySettingsAC = () => {
    return {
        type: "APPLY-SETTINGS"
    } as const
}

type ShowSettingsActionType = ReturnType<typeof showSettingsAC>

export const showSettingsAC = () => {
    return {
        type: "SHOW-SETTINGS"
    } as const
}

type HideSettingsActionType = ReturnType<typeof hideSettingsAC>

export const hideSettingsAC = () => {
    return {
        type: "HIDE-SETTINGS"
    } as const
}

type GetMaxFromUserActionType = ReturnType<typeof getMaxFromUserAC>

export const getMaxFromUserAC = (max: number) => {
    return {
        type: "GET-MAX-FROM-USER",
        payload: {
            max
        }
    } as const
}

type GetMinFromUserActionType = ReturnType<typeof getMinFromUserAC>

export const getMinFromUserAC = (min: number) => {
    return {
        type: "GET-MIN-FROM-USER",
        payload: {
            min
        }
    } as const
}


type GetStateFromStorageActionType = ReturnType<typeof getStateFromStorageAC>

export const getStateFromStorageAC = () => {
    debugger

    let stringMax = localStorage.getItem('maxValue')
    let stringMin = localStorage.getItem('minValue')
    let stringCounter = localStorage.getItem('counterValue')
    if (stringMax && stringMin && stringCounter) {
        let storageMax = Number(stringMax)
        let storageMin = Number(stringMin)
        let storageCounterValue = Number(stringCounter)
        return {
            type: "GET-STATE-FROM-STORAGE",
            payload: {
                maxValue: storageMax,
                minValue: storageMin,
                counterValue: storageCounterValue
            }
        } as const
    }
    return {
        type: "ERROR-READING-LOCAL-STORAGE"
    } as const


}



