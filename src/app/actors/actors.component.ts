import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css']
})
export class ActorsComponent implements OnInit {
	actors;
	currentActor;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
		this.fetchActors();
	}

	fetchActors() {
		this.apiService.fetchActors().subscribe((data)=>{
			this.actors = data;
		});
	}

	fetchPreviousActors(previousLink) {
		this.actors = null;
		this.apiService.fetchPreviousActors(previousLink).subscribe((data) => {
			this.actors = data;
		})
	}

	fetchNextActors(nextLink) {
		this.actors = null;
		this.apiService.fetchNextActors(nextLink).subscribe((data) => {
			this.actors = data;
		})
	}

	showModal(actor) {
		this.currentActor = actor;
	}

	closeModal() {
		this.currentActor = null;
	}

}
