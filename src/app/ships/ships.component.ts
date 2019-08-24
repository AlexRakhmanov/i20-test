import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.css']
})
export class ShipsComponent implements OnInit {
	ships;
	currentShip;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
		this.fetchShips();
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
