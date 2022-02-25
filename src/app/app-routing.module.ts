import { HomeComponent } from './home/containers/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsGuard } from './shared/services/details.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
