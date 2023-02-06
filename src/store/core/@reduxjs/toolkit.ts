import { RootStateKeyType } from './../types/injector-typings';
import {
    CreateSliceOptions,
    SliceCaseReducers,
    createSlice as createSliceOriginal,
} from '@reduxjs/toolkit'

export const createSlice = <State, CaseReducers extends SliceCaseReducers<State>,
    Name extends RootStateKeyType>(
        options: CreateSliceOptions<State, CaseReducers, Name>
    ) => {
    return createSliceOriginal(options)
}