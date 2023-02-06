import {
  InjectReducerParams,
  InjectSagaParams,
  RootStateKeyType,
} from "../types/injector-typings";
import {
  useInjectReducer as useReducer,
  useInjectSaga as useSaga,
} from "redux-injectors";

export function useInjectReducer<Key extends RootStateKeyType>(
  params: InjectReducerParams<Key>
) {
  return useReducer(params);
}

export function useInjectSage(params: InjectSagaParams) {
  return useSaga(params);
}
