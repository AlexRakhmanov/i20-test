import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

	constructor(private http: HttpClient) { }
	
	fetchFilms(): Observable<Object> {
		return this.http.get("https://swapi.co/api/films/");
	}

	fetchActors(): Observable<Object> {
		return this.http.get("https://swapi.co/api/people/");
	}

	fetchPreviousActors(previousLink): Observable<Object> {
		return this.http.get(previousLink);
	}

	fetchNextActors(nextLink): Observable<Object> {
		return this.http.get(nextLink);
	}

	fetchShips(): Observable<Object> {
		return this.http.get("https://swapi.co/api/starships/");
	}

	fetchPreviousShips(previousLink): Observable<Object> {
		return this.http.get(previousLink);
	}

	fetchNextShips(nextLink): Observable<Object> {
		return this.http.get(nextLink);
	}
}
