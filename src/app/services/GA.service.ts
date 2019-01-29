import { Injectable } from '@angular/core';
import { Population } from '../models/Population';
import { TourManagerService } from './TourManager.service';
import { Tour } from '../models/Tour';
import { City } from '../models/City';

@Injectable()
export class GAService {
    private mutationRate = 0.015;
    private tournamentSize = 5;
    private elitism = true;

    constructor(private TourManager: TourManagerService) { }

    public evolvePopulation(pop: Population): Population {
        const newPopulation = new Population(this.TourManager, pop.populationSize(), false);
        let elitismOffset = 0;
        if (this.elitism) {
            newPopulation.saveTour(0, pop.getFittest());
            elitismOffset = 1;
        }

        for (let i = elitismOffset; i < newPopulation.populationSize(); i++) {
            const parent1: Tour = this.tournamentSelection(pop);
            const parent2: Tour = this.tournamentSelection(pop);
            const child: Tour = this.crossover(parent1, parent2);
            newPopulation.saveTour(i, child);
        }

        for (let i = elitismOffset; i < newPopulation.populationSize(); i++) {
            this.mutate(newPopulation.getTour(i));
        }

        return newPopulation;
    }

    public crossover(parent1: Tour, parent2: Tour): Tour {
        const child: Tour = new Tour(this.TourManager);

        const startPos = Math.floor((Math.random() * parent1.tourSize()));
        const endPos = Math.floor((Math.random() * parent1.tourSize()));

        for (let i = 0; i < child.tourSize(); i++) {
            if (startPos < endPos && i > startPos && i < endPos) {
                child.setCity(i, parent1.getCity(i));
            } else if (startPos > endPos) {
                if (!(i < startPos && i > endPos)) {
                    child.setCity(i, parent1.getCity(i));
                }
            }
        }

        for (let i = 0; i < parent2.tourSize(); i++) {
            if (!child.containsCity(parent2.getCity(i))) {
                for (let j = 0; j < child.tourSize(); j++) {
                    if (child.getCity(j) == null) {
                        child.setCity(j, parent2.getCity(i));
                        break;
                    }
                }
            }
        }
        return child;
    }

    private mutate(tour: Tour): void {
        for (let tourPos1 = 0; tourPos1 < tour.tourSize(); tourPos1++) {
            if (Math.random() < this.mutationRate) {
                const tourPos2 = Math.floor(tour.tourSize() * Math.random());

                const city1: City = tour.getCity(tourPos1);
                const city2: City = tour.getCity(tourPos2);

                tour.setCity(tourPos2, city1);
                tour.setCity(tourPos1, city2);
            }
        }
    }

    private tournamentSelection(pop: Population): Tour {
        const tournament: Population = new Population(this.TourManager, this.tournamentSize, false);

        for (let i = 0; i < this.tournamentSize; i++) {
            const randomId = Math.floor(Math.random() * pop.populationSize());
            tournament.saveTour(i, pop.getTour(randomId));
        }

        return tournament.getFittest();
    }

}
