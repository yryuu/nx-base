import { CUSTOM_ELEMENTS_SCHEMA, NgModule, Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopComponent } from './top.component';
import { Routes, RouterModule } from '@angular/router';
import { AppUiModule } from '../../../app-ui.module';


const routes: Routes = [
  {
    path: '',
    component: TopComponent,
  },
];

@NgModule({
  declarations: [TopComponent],
  imports: [CommonModule,RouterModule.forChild(routes),AppUiModule],
  exports: [RouterModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class TopModule {}