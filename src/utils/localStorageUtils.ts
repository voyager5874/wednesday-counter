import {RootStateType} from "../state/store";

export const saveState = (state: RootStateType) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('counter-app-state', serializedState);
    } catch {
        // ignore write errors
    }
};

export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('counter-app-state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};