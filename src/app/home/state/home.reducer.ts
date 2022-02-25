import { Action, createReducer, on } from '@ngrx/store';

import * as fromHomeActions from './home.actions';

export interface HomeState {
  entity: any;
  loading: boolean;
  error: boolean;
}

export const homeInitialState: HomeState = {
  entity: undefined,
  loading: false,
  error: false,
};

const reducer = createReducer(
  homeInitialState,
  on(fromHomeActions.clearHomeState, ()=> homeInitialState),
  on(
    fromHomeActions.loadCurrentWeather,
    fromHomeActions.loadCurrentWeatherById,
    (state) => ({
      ...state,
      loading: true,
      error: false,
    })
  ),
  on(fromHomeActions.loadCurrentWeatherSucess, (state, { entity }) => ({
    ...state,
    loading: false,
    entity,
  })),
  on(fromHomeActions.loadCurrentWeatherFailed, (state) => ({
    ...state,
    loading: false,
    error: true,
  }))
);

export function homeReducer(
  state: HomeState | undefined,
  action: Action
): HomeState {
  return reducer(state, action);
}
