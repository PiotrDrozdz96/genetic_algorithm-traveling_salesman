import { Tour } from './Tour';
import { TourManagerService } from '../services/TourManager.service';

export class Population {
    tours: Array<Tour>;

    constructor(
        private TourManager: TourManagerService,
        populationSize: number, initialise: boolean) {
        this.tours = new Array(populationSize);
        if (initialise) {
            for (let i = 0; i < this.tours.length; i++) {
                const newTour: Tour = new Tour(this.TourManager);
                newTour.generateIndividual();
                this.saveTour(i, newTour);
            }
        }
    }

    public saveTour(index: number, tour: Tour): void {
        this.tours[index] = tour;
    }

    public getTour(index: number): Tour {
        return this.tours[index];
    }

    public getFittest(): Tour {
        let fittest: Tour = this.tours[0];
        for (let i = 1; i < this.tours.length; i++) {
            if (fittest.getFitness() <= this.getTour(i).getFitness()) {
                fittest = this.getTour(i);
            }
        }
        return fittest;
    }

    public populationSize(): number {
        return this.tours.length;
    }
}
