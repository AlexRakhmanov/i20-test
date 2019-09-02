import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
	films;
	currentFilm;
	ships = [];


  constructor(private apiService: ApiService) { }

  ngOnInit() {
		this.fetchFilms();
	}

	fetchFilms() {
		this.apiService.fetchFilms().subscribe((data)=>{
			this.films = (data as any).results;
		});
	}

	fetchExactShip(link) {

	}

	showModal(film) {
		this.currentFilm = film;
		this.ships = [];
		
		this.currentFilm.starships.forEach((ship) => {
			this.apiService.fetchExactShip(ship).subscribe((data) => {
				this.ships.push(data);
			})
		});
	}

	closeModal() {
		this.currentFilm = null;
	}
}
