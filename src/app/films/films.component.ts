import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
	currentFilm: any;
	films: any[] = null;
	defaultFilter: any[] = [];
	ships: any[] = [];
	species: any[] = [];
	planets: any[] = [];
	vehicles: any[] = [];
	characters: any[] = [];
	currentFilter: string;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
		this.fetchFilms();

		fromEvent(document.getElementById('search-film'), 'keyup').pipe(
			debounceTime(500),
			map(data => data.target)
		).subscribe(val => {
			this.films = null;

			this.apiService.searchFilm((val as any).value).subscribe(data => {
				this.films = data.results;
				this.defaultFilter = data.results;
				this.filter();
			})
		});
	}

	fetchFilms() {
		this.apiService.fetchFilms().subscribe((data)=>{
			this.films = data.results;
			this.defaultFilter = data.results;
		})
	}

	fetchExactShip(link: string) {
		this.apiService.fetchExactShip(link).subscribe((data) => {
			this.ships.push(data);
		})
	}

	fetchExactPlanet(link: string) {
		this.apiService.fetchExactPlanet(link).subscribe((data) => {
			this.planets.push(data);
		})
	}

	fetchExactSpecies(link: string) {
		this.apiService.fetchExactSpecies(link).subscribe((data) => {
			this.species.push(data);
		})
	}

	fetchExactVehicle(link: string) {
		this.apiService.fetchExactVehicle(link).subscribe((data) => {
			this.vehicles.push(data);
		})
	}

	fetchExactCharacter(link: string) {
		this.apiService.fetchExactCharacter(link).subscribe((data) => {
			this.characters.push(data);
		})
	}

	showModal(film: any) {
		this.currentFilm = film;
		this.ships = [];
		this.characters = [];
		this.planets = [];
		this.vehicles = [];
		this.species = [];
		
		this.currentFilm.starships.forEach((ship: string) => {
			this.fetchExactShip(ship);
		});

		this.currentFilm.species.forEach((race: string) => {
			this.fetchExactSpecies(race);
		});

		this.currentFilm.planets.forEach((planet: string) => {
			this.fetchExactPlanet(planet);
		});

		this.currentFilm.vehicles.forEach((vehicle: string) => {
			this.fetchExactVehicle(vehicle);
		});

		this.currentFilm.characters.forEach((character: string) => {
			this.fetchExactCharacter(character);
		});
	}

	closeModal() {
		this.currentFilm = null;
		this.ships = [];
		this.characters = [];
		this.planets = [];
		this.vehicles = [];
		this.species = [];
	}

	filter(event: any = null): void {
		if (event !== null) {
			this.currentFilter = event.target.value;
		};
		
		switch(this.currentFilter) {
			case "default":
				this.films = this.defaultFilter;
				break;
			case "old":
				this.films = this.defaultFilter;
				this.films = this.films.filter((film) => {
					return parseInt(film.release_date.substr(0, 4)) < 2000;
				});
				break;
			case "new":
				this.films = this.defaultFilter;
				this.films = this.films.filter((film) => {
					return parseInt(film.release_date.substr(0, 4)) >= 2000;
				});
				break;
		}
	}
}
