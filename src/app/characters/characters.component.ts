import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
	characters: any = [];
	currentCharacter: any;
	ships = [];
	films = [];
	defaultFilter = [];
	vehicles = [];
	race: any;
	currentFilter: string;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
		this.fetchCharacters();

		fromEvent(document.getElementById('search-char'), 'keyup').pipe(
			debounceTime(500),
			map(data => data.target)
		).subscribe(val => {
			this.characters = [];
			this.apiService.searchCharacter((val as any).value).subscribe(data => {
				this.characters = data;
				this.defaultFilter = data.results;
				this.filter();
			})
		});
	}

	fetchCharacters() {
		this.apiService.fetchCharacters().subscribe((data)=>{
			this.characters = data;
			this.defaultFilter = data.results;
		});
	}

	fetchPreviousCharacters(previousLink) {
		this.characters = [];
		this.apiService.fetchPreviousCharacters(previousLink).subscribe((data) => {
			this.characters = data;
			this.defaultFilter = data.results;
			this.filter();
		})
	}

	fetchNextCharacters(nextLink) {
		this.characters = [];
		this.apiService.fetchNextCharacters(nextLink).subscribe((data) => {
			this.characters = data;
			this.defaultFilter = data.results;
			this.filter();
		})
	}

	fetchExactShip(link: string) {
		this.apiService.fetchExactShip(link).subscribe((data) => {
			this.ships.push(data);
		})
	}

	fetchExactFilm(link: string) {
		this.apiService.fetchExactFilm(link).subscribe((data) => {
			this.films.push(data);
		})
	}

	fetchExactSpecies(link: string) {
		this.apiService.fetchExactSpecies(link).subscribe((data) => {
			this.race = data.name;
		})
	}

	fetchExactVehicle(link: string) {
		this.apiService.fetchExactVehicle(link).subscribe((data) => {
			this.vehicles.push(data);
		})
	}


	showModal(actor) {
		this.currentCharacter = actor;
		this.ships = [];
		this.films = [];
		this.vehicles = [];
		this.race = 'n/a';

		this.currentCharacter.starships.forEach((ship: string) => {
			this.fetchExactShip(ship);
		});

		this.currentCharacter.species.forEach((race: string) => {
			this.fetchExactSpecies(race);
		});

		this.currentCharacter.films.forEach((film: string) => {
			this.fetchExactFilm(film);
		});

		this.currentCharacter.vehicles.forEach((vehicle: string) => {
			this.fetchExactVehicle(vehicle);
		});
	}

	closeModal() {
		this.currentCharacter = null;
	}

	filter(event: any = null): void {
		if (event !== null) {
			this.currentFilter = event.target.value;
		}
		
		switch(this.currentFilter) {
			case "default":
				this.characters.results = this.defaultFilter;
				break;
			case "male":
				this.characters.results = [];
				this.characters.results = this.defaultFilter.filter((character) => {
					return character.gender === "male";
				});
				break;
			case "female":
				this.characters.results = [];
				this.characters.results = this.defaultFilter.filter((character) => {
					return character.gender === "female";
				});
				break;
		}
	}
}
