import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

const uiModules = [
  MatSidenavModule,
  MatIconModule,
  MatButtonModule,
  MatInputModule,
];
@NgModule({
  imports: uiModules,
  exports: uiModules,
})
export class AppUiModule {}
