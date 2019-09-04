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

  constructor(private apiService: ApiService) { }

  ngOnInit() {
		this.fetchShips();

		fromEvent(document.getElementById('search-ship'), 'keyup').pipe(
			debounceTime(1000),
			map(data => data.target)
		).subscribe(val => {
			this.ships = [];
			
			this.apiService.searchShip((val as any).value).subscribe(data => {
				this.ships = data;
			})
		});
	}

	fetchShips() {
		this.apiService.fetchShips().subscribe((data)=>{
			this.ships = data;
		});
	}

	fetchPreviousShips(previousLink) {
		this.ships = null;
		this.apiService.fetchPreviousShips(previousLink).subscribe((data) => {
			this.ships = data;
		})
	}

	fetchNextShips(nextLink) {
		this.ships = null;
		this.apiService.fetchNextShips(nextLink).subscribe((data) => {
			this.ships = data;
		})
	}

	showModal(ship) {
		this.currentShip = ship;
	}

	closeModal() {
		this.currentShip = null;
	}
}
