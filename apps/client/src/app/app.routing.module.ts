import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ChatComponent } from './component/screen/chat/chat.component';

const routes: Routes = [
  { path: '', loadChildren: () =>
  import('./component/screen/top/top.module').then((m) => m.TopModule), },
  { path: 'test', loadChildren: () =>
      import('./component/screen/chat/chat.module').then((m) => m.ChatModule), },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
