import { ComponentsModule } from './../shared/components/components.module';
import { RouterModule } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './containers/home/home.component';
import { CityWeatherComponent } from './components/city-weather/city-weather.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { homeEffects } from './state/home.effects';
import { homeReducer } from './state/home.reducer';
import { DetalhesWeatherComponent } from './components/detalhes-weather/detalhes-weather.component';

@NgModule({
  declarations: [HomeComponent, CityWeatherComponent, DetalhesWeatherComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    StoreModule.forFeature('home', homeReducer),
    EffectsModule.forFeature([homeEffects]),
    ComponentsModule,
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeModule {}
