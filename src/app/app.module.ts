import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FilmsComponent } from './films/films.component';
import { CharactersComponent } from './characters/characters.component';
import { ShipsComponent } from './ships/ships.component';

import { ApiService } from './api.service';

@NgModule({
  declarations: [
    AppComponent,
    FilmsComponent,
    CharactersComponent,
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
