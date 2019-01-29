import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { TourManagerService } from './services/TourManager.service';
import { GAService } from './services/GA.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [TourManagerService, GAService],
  bootstrap: [AppComponent]
})
export class AppModule { }
