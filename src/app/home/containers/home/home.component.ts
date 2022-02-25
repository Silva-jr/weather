import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CityWeather } from 'src/app/shared/models/weather.model';
import * as fromHomeSelectors from '../../state/home.selectors';
import * as fromHomeActions from '../../state/home.actions';
import * as fromConfigSelectors from '../../../shared/state/config/config.selectors';
import { Units } from 'src/app/shared/models/units.enum';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  cityWeather$: Observable<CityWeather>;
  cityWeather: CityWeather;
  loading$: Observable<boolean>;
  error$: Observable<boolean>;
  unit$: Observable<Units>;

  searchControl: FormControl;
  searchControlAutoComplete: FormControl;

  text: string;
  private componentDestroyed$ = new Subject();

  constructor(private store: Store) {}

  ngOnInit() {
    this.searchControl = new FormControl('luanda', Validators.required);

    this.cityWeather$ = this.store.pipe(
      select(fromHomeSelectors.selectCurrentWeather)
    );
    this.cityWeather$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe((value) => (this.cityWeather = value));
    this.loading$ = this.store.pipe(
      select(fromHomeSelectors.selectCurrentWeatherLoading)
    );
    this.error$ = this.store.pipe(
      select(fromHomeSelectors.selectCurrentWeatherError)
    );

    this.unit$ = this.store.pipe(select(fromConfigSelectors.selectUnitConfig));
    this.doSearch();
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.unsubscribe();
  }

  doSearch() {
    const query = this.searchControl.value;

    this.store.dispatch(fromHomeActions.loadCurrentWeather({ query }));
  }
  unixToHourMinute(value: number): string {
    return moment
      .unix(value).format('HH:mm');
  }
}
