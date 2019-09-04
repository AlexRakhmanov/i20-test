import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

	constructor(private http: HttpClient) { }
	
	fetchFilms(): Observable<any> {
		return this.http.get("https://swapi.co/api/films/");
	}

	fetchCharacters(): Observable<any> {
		return this.http.get("https://swapi.co/api/people/");
	}

	fetchShips(): Observable<any> {
		return this.http.get("https://swapi.co/api/starships/");
	}

	fetchPreviousCharacters(previousLink: string): Observable<any> {
		return this.http.get(previousLink);
	}

	fetchNextCharacters(nextLink: string): Observable<any> {
		return this.http.get(nextLink);
	}

	fetchPreviousShips(previousLink: string): Observable<any> {
		return this.http.get(previousLink);
	}

	fetchNextShips(nextLink: string): Observable<any> {
		return this.http.get(nextLink);
	}

	fetchExactShip(ship: string): Observable<any> {
		return this.http.get(ship);
	}

	fetchExactSpecies(species: string): Observable<any> {
		return this.http.get(species);
	}

	fetchExactVehicle(vehicle: string): Observable<any> {
		return this.http.get(vehicle);
	}

	fetchExactPlanet(planet: string): Observable<any> {
		return this.http.get(planet);
	}

	fetchExactCharacter(character: string): Observable<any> {
		return this.http.get(character);
	}

	fetchExactFilm(film: string): Observable<any> {
		return this.http.get(film);
	}

	searchCharacter(query: string): Observable<any> {
		return this.http.get(`https://swapi.co/api/people/?search=${query}`)
	}

	searchFilm(query: string): Observable<any> {
		return this.http.get(`https://swapi.co/api/films/?search=${query}`)
	}

	searchShip(query: string): Observable<any> {
		return this.http.get(`https://swapi.co/api/starships/?search=${query}`)
	}
}
