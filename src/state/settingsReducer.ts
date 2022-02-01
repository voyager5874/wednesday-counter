
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
    type: "KEEP-MAX-FROM-USER"
    payload: {
        newMax: number
    }
}

type GetMinFromUserType = {
    type: "KEEP-MIN-FROM-USER"
    payload: {
        newMin: number
    }
}

type ToggleSettingsVisibilityActionType = {
    type: "TOGGLE-SETTINGS"
    visibility: boolean
}

export type ApplySettingsActionType = {
    type: "APPLY-SETTINGS"
    maxToSet: number
    minToSet: number
}



type SettingsActionsType = GetMaxFromUserType | GetMinFromUserType | ToggleSettingsVisibilityActionType

export const settingsReducer = (state: SettingsStateType = iniState, action: SettingsActionsType): SettingsStateType => {
    switch (action.type) {
        case "KEEP-MAX-FROM-USER":
            return {...state, maxToSet: action.payload.newMax}
        case "KEEP-MIN-FROM-USER":
            return {...state, minToSet: action.payload.newMin}
        case "TOGGLE-SETTINGS":
            return {...state, visible: action.visibility}
        default:
            return state
    }
}


export const keepMaxToSetAC = (newMax: number): GetMaxFromUserType=> {
    return {
        type: "KEEP-MAX-FROM-USER",
        payload: {
            newMax,
        }
    } as const
}

export const keepMinToSetAC = (newMin: number): GetMinFromUserType=> {
    return {
        type: "KEEP-MIN-FROM-USER",
        payload: {
            newMin,
        }
    } as const
}

export const toggleSettingsVisibilityAC = (visibility: boolean) : ToggleSettingsVisibilityActionType => {
    return {
        type:"TOGGLE-SETTINGS",
        visibility,
    }
}

//поместил этот AC сюда, хотя использую в counterReducer - думал, что здесь есть возможность прочитать
// значение настроек из state и не передавать их в качестве параметров
export const applySettingsAC = (maxToSet: number, minToSet: number) : ApplySettingsActionType => {
    return {
        type: "APPLY-SETTINGS",
        maxToSet,
        minToSet,
    } as const
}
