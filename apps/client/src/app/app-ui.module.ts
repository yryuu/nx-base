import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { HeaderComponent } from './component/parts/header/header.component';
import { FooterComponent } from './component/parts/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { PartChatComponent } from './component/parts/chat/chat.component';
const uiModules = [
  MatSidenavModule,
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  HttpClientModule,
];
@NgModule({
  declarations:[  
    HeaderComponent,
    FooterComponent
  ],
  imports: uiModules,
  exports: [...uiModules,HeaderComponent,FooterComponent]
})
export class AppUiModule {}
