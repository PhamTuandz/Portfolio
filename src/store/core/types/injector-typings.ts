import { AnyAction, Reducer } from "@reduxjs/toolkit";
import { RootState } from "./RootState";
import { Saga } from "redux-saga";
import { SagaInjectionModes } from "redux-injectors";

type RequiredRootState = Required<RootState>

export type RootStateKeyType = keyof RootState

export type InjectedReducersType = {
    [P in RootStateKeyType]?: Reducer<RequiredRootState[P], AnyAction>
}

export interface InjectReducerParams<Key extends RootStateKeyType> {
    key: Key;
    reducer: Reducer<any, AnyAction>
}

export interface InjectSagaParams {
    key: RootStateKeyType | string;
    saga: Saga;
    mode?: SagaInjectionModes
}