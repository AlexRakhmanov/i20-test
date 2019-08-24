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
			this.ships = (data as any).results;
		});
	}

	showModal(ship) {
		this.currentShip = ship;
	}

	closeModal() {
		this.currentShip = null;
	}
}
