import { CUSTOM_ELEMENTS_SCHEMA, NgModule, Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatComponent } from './chat.component';
import { Routes, RouterModule } from '@angular/router';
import { AppUiModule } from '../../../app-ui.module';
import { PartChatModule } from '../../parts/chat/chat.module';


const routes: Routes = [
  {
    path: '',
    component: ChatComponent,
  },
];

@NgModule({
  declarations: [ChatComponent],
  imports: [CommonModule,RouterModule.forChild(routes),AppUiModule,PartChatModule],
  exports: [RouterModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class ChatModule {}