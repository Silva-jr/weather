import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap } from 'rxjs/operators';
import * as fromHomeActions from './home.actions';
import { WeatherService } from 'src/app/shared/services/weather.service';
import { CityWeather } from 'src/app/shared/models/weather.model';

@Injectable()
export class homeEffects {
  loadCurrentWeather$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromHomeActions.loadCurrentWeather),
      mergeMap(({ query }) => this.weatherService.getCityWeatherByQuery(query)),
      catchError((err, caughts$) => {
        this.store.dispatch(fromHomeActions.loadCurrentWeatherFailed());
        return caughts$;
      }),
      map((entity: any) => fromHomeActions.loadCurrentWeatherSucess({ entity }))
    )
  );

  loadCurrentWeatherById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromHomeActions.loadCurrentWeatherById),
      mergeMap(({ id }: { id: string }) =>
        this.weatherService.getCityWeatherById(id)
      ),
      catchError((err, caught$) => {
        this.store.dispatch(fromHomeActions.loadCurrentWeatherFailed());
        return caught$;
      }),
      map((entity: CityWeather) =>
        fromHomeActions.loadCurrentWeatherSucess({ entity })
      )
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store,
    private weatherService: WeatherService
  ) {}
}
