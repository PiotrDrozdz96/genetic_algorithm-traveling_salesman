import { Injectable } from '@angular/core';
import { City } from '../models/City';

@Injectable()
export class TourManagerService {
    private destinationCities = new Array<City>();

    public addCity(city: City): void {
        this.destinationCities.push(city);
    }

    public getCity(index: number): City {
        return this.destinationCities[index];
    }

    public numberOfCities(): number {
        return this.destinationCities.length;
    }

    public reset(): void {
        this.destinationCities = new Array<City>();
    }
}
