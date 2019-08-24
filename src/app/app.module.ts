import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FilmsComponent } from './films/films.component';
import { ActorsComponent } from './actors/actors.component';
import { ShipsComponent } from './ships/ships.component';

import { ApiService } from './api.service';

@NgModule({
  declarations: [
    AppComponent,
    FilmsComponent,
    ActorsComponent,
    ShipsComponent
  ],
  imports: [
		BrowserModule,
		HttpClientModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
