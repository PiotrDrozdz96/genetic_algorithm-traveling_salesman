export class City {
    public value: boolean;

    constructor(public y: number, public x: number) {
        this.value = false;
    }

    public distanceTo(city: City): number {
        const xDistance: number = Math.abs(this.x - city.x);
        const yDistance: number = Math.abs(this.y - city.y);
        const distance: number = Math.sqrt((xDistance * xDistance) + (yDistance * yDistance));
        return distance;
    }

    public toString(): string {
        return this.y + ', ' + this.x;
    }
}
