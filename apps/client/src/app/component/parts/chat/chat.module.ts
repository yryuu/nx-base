import { NgModule } from '@angular/core';
import { PartChatComponent } from './chat.component';


@NgModule({
  declarations: [PartChatComponent],
  exports:[PartChatComponent]
})
export class PartChatModule {}