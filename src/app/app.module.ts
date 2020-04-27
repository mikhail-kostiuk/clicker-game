import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './pages/game/game.component';
import { HomeComponent } from './pages/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ResultComponent } from './pages/result/result.component';
import { FormatTimePipe } from './shared/pipes/format-time.pipe';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    HomeComponent,
    ResultComponent,
    FormatTimePipe,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
