import { AppState } from 'src/app/shared/state/app.reducer';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CityDailyWeather } from 'src/app/shared/models/weather.model';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromDetailsActions from '../../state/details.actions';
import * as fromDetailsSelectors from '../../state/details.selectors';
import * as fromConfigSelectors from '../../../shared/state/config/config.selectors';
import { Units } from 'src/app/shared/models/units.enum';

@Component({
  selector: 'app-detalhes-weather',
  templateUrl: './detalhes-weather.component.html',
  styleUrls: ['./detalhes-weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetalhesWeatherComponent implements OnInit {
  details$: Observable<CityDailyWeather>;
  loading$: Observable<boolean>;
  error$: Observable<boolean>;
  unit$: Observable<Units>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(fromDetailsActions.loadWeatherDetails());
    this.details$ = this.store.pipe(
      select(fromDetailsSelectors.selectDetailsEntity)
    );
    this.loading$ = this.store.pipe(
      select(fromDetailsSelectors.selectDetailsLoading)
    );
    this.error$ = this.store.pipe(
      select(fromDetailsSelectors.selectDetailsError)
    );

    this.unit$ = this.store.pipe(select(fromConfigSelectors.selectUnitConfig));
    console.log(this.details$)
  }
}
