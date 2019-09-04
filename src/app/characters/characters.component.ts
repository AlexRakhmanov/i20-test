import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
	characters: any;
	currentCharacter: any;
	ships = [];
	films = [];
	vehicles = [];
	race: any;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
		this.fetchCharacters();
	}

	fetchCharacters() {
		this.apiService.fetchCharacters().subscribe((data)=>{
			this.characters = data;
		});
	}

	fetchPreviousCharacters(previousLink) {
		this.characters = null;
		this.apiService.fetchPreviousCharacters(previousLink).subscribe((data) => {
			this.characters = data;
		})
	}

	fetchNextCharacters(nextLink) {
		this.characters = null;
		this.apiService.fetchNextCharacters(nextLink).subscribe((data) => {
			this.characters = data;
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
		this.race = null;

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

}
