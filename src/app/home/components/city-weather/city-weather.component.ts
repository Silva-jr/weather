import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Units } from 'src/app/shared/models/units.enum';
import {
  CityDailyWeather,
  CityWeather,
  Weather,
} from 'src/app/shared/models/weather.model';
import { AppState } from 'src/app/shared/state/app.reducer';
import { unitToSymbol } from 'src/app/shared/utils/units.utils';
import * as fromConfigSelectors from '../../../shared/state/config/config.selectors';
import * as fromConfigActions from '../../../shared/state/config/config.actions';
import * as fromDetailsActions from '../../state/details.actions';
import * as fromDetailsSelectors from '../../state/details.selectors';

@Component({
  selector: 'app-city-weather',
  templateUrl: './city-weather.component.html',
  styleUrls: ['./city-weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityWeatherComponent implements OnInit {
  @Input() cityWeather: CityWeather;
  @Input() unit: Units;
  @Input() weather: Weather;

  details$: Observable<CityDailyWeather>;
  unit$: Observable<Units>;
  unitsEnum = Units;
  selected: boolean = false;

  constructor(private store: Store<AppState>, private router: Router) {}

  ngOnInit() {
    this.store.dispatch(fromDetailsActions.loadWeatherDetails());

    this.details$ = this.store.pipe(
      select(fromDetailsSelectors.selectDetailsEntity)
    );
    this.unit$ = this.store.pipe(select(fromConfigSelectors.selectUnitConfig));
  }

  updateUnit(unit: Units) {
    this.store.dispatch(fromConfigActions.updateUnit({ unit }));
  }

  get cityName(): string {
    this.router.navigate(['/'], {
      queryParams: {
        lat: this.cityWeather?.city?.coord?.lat,
        lon: this.cityWeather?.city?.coord?.lon,
      },
    });
    //console.log(this.router);
    return `${this.cityWeather?.city?.name} ${this.cityWeather?.city?.country}`;
  }

  get weatherIcon(): string {
    if (!this.selected) {
      this.updateUnit(this.unitsEnum.Metric);
    } else {
      this.updateUnit(this.unitsEnum.Imperial);
    }
    return `http://openweathermap.org/img/wn/${this.cityWeather?.weather.icon}@2x.png`;
  }

  get unitSymbol(): string {
    return unitToSymbol(this.unit);
  }
}
