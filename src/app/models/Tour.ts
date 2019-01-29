import { City } from './City';
import { TourManagerService } from '../services/TourManager.service';

export class Tour {
    private tour: Array<City> = [];
    private fitness = 0;
    private distance = 0;

    constructor(private TourManager: TourManagerService, tour?: Array<City>) {
        if (tour) {
            this.tour = tour;
        } else {
            for (let i = 0; i < TourManager.numberOfCities(); i++) {
                this.tour.push(null);
            }
        }
    }

    public generateIndividual() {
        for (let cityIndex = 0; cityIndex < this.TourManager.numberOfCities(); cityIndex++) {
            this.setCity(cityIndex, this.TourManager.getCity(cityIndex));
          }
          this.shuffle();
    }

    public getCity(tourPosition: number): City {
        return this.tour[tourPosition];
    }

    public setCity(tourPosition: number, city: City) {
        this.tour[tourPosition] = city;
        this.fitness = 0;
        this.distance = 0;
    }

    public getFitness(): number {
        if (this.fitness === 0) {
            this.fitness = 1 / this.getDistance();
        }
        return this.fitness;
    }

    public getDistance(): number {
        if (this.distance === 0) {
            let tourDistance = 0;
            for (let cityIndex = 0; cityIndex < this.tour.length; cityIndex++) {
                const fromCity: City = this.getCity(cityIndex);
                let destinationCity: City;
                if (cityIndex + 1 < this.tour.length) {
                    destinationCity = this.getCity(cityIndex + 1);
                } else {
                    destinationCity = this.getCity(0);
                }
                tourDistance += fromCity.distanceTo(destinationCity);
            }
            this.distance = tourDistance;
        }
        return this.distance;
    }

    public tourSize(): number {
        return this.tour.length;
    }

    public toString(): string {
        return this.tour.map(city => city.toString()).join('|');
    }

    public containsCity(city: City) {
        return this.tour.some(t => t === city);
    }

    public getCities(): Array<City> {
        return this.tour;
    }

    private shuffle(): void {
        for (let i = this.tour.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.tour[i], this.tour[j]] = [this.tour[j], this.tour[i]];
        }
    }

}
