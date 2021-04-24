import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppUiModule } from './app-ui.module';
import { HeaderComponent } from './component/parts/header/header.component';
import { FooterComponent } from './component/parts/footer/footer.component';
import { ChatComponent } from './component/parts/chat/chat.component';

import { ChatComponent as ScreenChatComponent } from './component/screen/chat/chat.component';
import { AboutModalComponent } from './about-modal/about-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ChatComponent,
    ScreenChatComponent,
    AboutModalComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppUiModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
