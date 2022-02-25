import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Units } from 'src/app/shared/models/units.enum';
import { DailyWeather, Weather } from 'src/app/shared/models/weather.model';
import { unitToSymbol } from 'src/app/shared/utils/units.utils';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-detalhes-weather',
  templateUrl: './detalhes-weather.component.html',
  styleUrls: ['./detalhes-weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetalhesWeatherComponent {
  @Input() dailyWeather: DailyWeather;
  @Input() unit: Units;

  get weather(): Weather {
    return this.dailyWeather.weather;
  }

  get date(): string {
    return moment.unix(this.dailyWeather.date).format('DD MMM - dddd');
  }

  get icon(): string {
    return `http://openweathermap.org/img/wn/${this.weather.icon}@2x.png`;
  }

  get unitSymbol() {
    return unitToSymbol(this.unit);
  }
/*
  unixToHourMinute(value: number): string {
    return moment.unix(value).tz(this.timeZone).format('HH:mm');
  } */

}
