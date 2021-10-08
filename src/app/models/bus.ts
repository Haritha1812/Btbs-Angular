import { Time } from "@angular/common"
import { Route } from 'src/app/models/route';

export class Bus {
	id: number

	name: string

	busType: string

	numberOfSeats: number


	route = new Route();

	date: Date


	departureTime: Time

	arrivalTime: Time
	fare: number
}
