import { Bus } from "./bus"
import { Customer } from "./customer"

export class Passenger {
	name: string
	id: number
	gender: string
	age: number
	seatNumber: number
	customer: Customer
	bus: Bus
}
