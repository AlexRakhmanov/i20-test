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

  constructor(private apiService: ApiService) { }

  ngOnInit() {
		this.fetchFilms();
	}

	fetchFilms() {
		this.apiService.fetchFilms().subscribe((data)=>{
			this.films = data;
		});
	}

	showModal(film) {
		this.currentFilm = film;
	}

	closeModal() {
		this.currentFilm = null;
	}
}
