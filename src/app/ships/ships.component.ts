import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { fromEvent } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.css']
})
export class ShipsComponent implements OnInit {
	ships: any = [];
	currentShip;
	defaultFilter = [];
	currentFilter: string;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
		this.fetchShips();

		fromEvent(document.getElementById('search-ship'), 'keyup').pipe(
			debounceTime(500),
			map(data => data.target)
		).subscribe(val => {
			this.ships = [];
			
			this.apiService.searchShip((val as any).value).subscribe(data => {
				this.ships = data;
				this.defaultFilter = data.results;
				this.filter();
			})
		});
	}

	fetchShips() {
		this.apiService.fetchShips().subscribe((data)=>{
			this.ships = data;
			this.defaultFilter = data.results;
			this.filter();
		});
	}

	fetchPreviousShips(previousLink) {
		this.ships = [];
		this.apiService.fetchPreviousShips(previousLink).subscribe((data) => {
			this.ships = data;
			this.defaultFilter = data.results;
			this.filter();
		})
	}

	fetchNextShips(nextLink) {
		this.ships = [];
		this.apiService.fetchNextShips(nextLink).subscribe((data) => {
			this.ships = data;
			this.defaultFilter = data.results;
			this.filter();
		})
	}

	showModal(ship) {
		this.currentShip = ship;
	}

	closeModal() {
		this.currentShip = null;
	}

	filter(event: any = null): void {
		if (event !== null) {
			this.currentFilter = event.target.value;
		};
		
		switch(this.currentFilter) {
			case "default":
				this.ships.results = this.defaultFilter;
				break;
			case "lessten":
				this.ships.results = [];
				this.ships.results = this.defaultFilter.filter((ship) => {
					return parseInt(ship.crew) < 10;
				});
				break;
			case "moreten":
				this.ships.results = [];
				this.ships.results = this.defaultFilter.filter((ship) => {
					return parseInt(ship.crew) >= 10;
				});
				break;
		}
	}
}
