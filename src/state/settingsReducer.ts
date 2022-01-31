export type SettingsStateType = {
    visible: boolean
    maxToSet: number
    minToSet: number
}

const iniState: SettingsStateType = {
    visible: false,
    maxToSet: 0,
    minToSet: 0,
}

type GetMaxFromUserType = {
    type: "GET-MAX-FROM-USER"
    payload: {
        newMax: number
    }
}

type GetMinFromUserType = {
    type: "GET-MIN-FROM-USER"
    payload: {
        newMin: number
    }
}

type ToggleSettingsVisibilityActionType = {
    type: "TOGGLE-SETTINGS"
    visibility: boolean
}



type SettingsActionsType = GetMaxFromUserType | GetMinFromUserType | ToggleSettingsVisibilityActionType

export const settingsReducer = (state: SettingsStateType, action: SettingsActionsType): SettingsStateType => {
    switch (action.type) {
        case "GET-MAX-FROM-USER":
            return {...state, maxToSet: action.payload.newMax}
        case "GET-MIN-FROM-USER":
            return {...state, minToSet: action.payload.newMin}
        case "TOGGLE-SETTINGS":
            return {...state, visible: action.visibility}
        default:
            return state
    }
}


export const getMaxFromUserAC = (newMax: number): GetMaxFromUserType=> {
    return {
        type: "GET-MAX-FROM-USER",
        payload: {
            newMax,
        }
    } as const
}

export const getMinFromUserAC = (newMin: number): GetMinFromUserType=> {
    return {
        type: "GET-MIN-FROM-USER",
        payload: {
            newMin,
        }
    } as const
}

export const toggleSettingsVisibilityAC = (visibility: boolean) : ToggleSettingsVisibilityActionType => {
    return {
        type:"TOGGLE-SETTINGS",
        visibility
    }
}