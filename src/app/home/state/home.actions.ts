
import { createAction, props } from '@ngrx/store';

export const loadCurrentWeather = createAction(
  '[Home] Load Current Weather',
  props<{ query: string }>()
);

export const loadCurrentWeatherById = createAction(
  '[Home] Load Current Weather By Id',
  props<{ id: string }>()
);


export const loadCurrentWeatherSucess = createAction(
  '[Weather API] Load current weather sucess',
  props<{ entity: any }>()
);

export const loadCurrentWeatherFailed = createAction(
  '[Weather API] Load current weather Failed'
);



export const clearHomeState = createAction('[Home] Clear Home State');
