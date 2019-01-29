import { Component } from '@angular/core';

import { TourManagerService } from './services/TourManager.service';
import { GAService } from './services/GA.service';

import { Tour } from './models/Tour';
import { Population } from './models/Population';
import { City } from './models/City';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  fields = [0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200];
  populationSize = 50;
  evolutionNumber = 100;
  cities: Array<Array<City>>;
  pop: Population;

  initialDistance: number;
  finalDistance: number;
  solution: string;
  solutionOnBoard = [];

  constructor(private TourManager: TourManagerService, private GA: GAService) {
    this.cities = new Array(this.fields.length - 1);
    for (let y = 0; y < this.fields.length; y++) {
      this.cities[y] = new Array(this.fields.length - 1);
      for (let x = 0; x < this.fields.length; x++) {
        this.cities[y][x] = new City(this.fields[this.fields.length - 1 - y], this.fields[x]);
      }
    }
  }

  public letsGo() {
    this.evolutionNumber = 100;
    this.addCitiesToTourManager();
    this.makePopulation();
    this.evolvePopulationInterval();
  }

  private addCitiesToTourManager() {
    this.TourManager.reset();
    this.cities.forEach(row => {
      row.forEach((city: City) => {
        if (city.value === true) { this.TourManager.addCity(city); }
      });
    });
  }

  private makePopulation() {
    this.pop = new Population(this.TourManager, this.populationSize, true);
    this.initialDistance = this.pop.getFittest().getDistance();
  }

  private evolvePopulationInterval() {
    const evolve = setInterval(() => {
      this.pop = this.GA.evolvePopulation(this.pop);
      this.finalDistance = this.pop.getFittest().getDistance();
      this.solution = this.pop.getFittest().toString();
      this.convertCitiesToPixels(this.pop.getFittest());
      this.evolutionNumber--;
      if (this.evolutionNumber <= 0) { clearInterval(evolve); }
    }, 500);
  }

  public convertCitiesToPixels(tour: Tour) {
    this.solutionOnBoard = tour.getCities().map((city, i, arr) => {
      return {
        y1: (this.fields.length - this.fields.findIndex(field => field === city.y)) * 43,
        x1: this.fields.findIndex(field => field === city.x) * 43,
        y2: (this.fields.length - this.fields.findIndex(field => field === (arr[i + 1] || arr[0]).y)) * 43,
        x2: this.fields.findIndex(field => field === (arr[i + 1] || arr[0]).x) * 43,
      };
    });
  }
}
