import { combineReducers } from "@reduxjs/toolkit";
import { InjectedReducersType } from "./core/types/injector-typings";

export function lastAction(state = null, action: any) {
    return action;
}

export function createReducer(injectedReducers: InjectedReducersType = {}) {
    if (Object.keys(injectedReducers).length === 0) {
        return (state: any) => state
    } else {
        return combineReducers({
            ...injectedReducers,
            lastAction
        })
    }
}