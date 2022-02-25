import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesWeatherComponent } from './detalhes-weather.component';

describe('DetalhesWeatherComponent', () => {
  let component: DetalhesWeatherComponent;
  let fixture: ComponentFixture<DetalhesWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalhesWeatherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalhesWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
