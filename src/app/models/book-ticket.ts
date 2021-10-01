import { Bus } from "./bus";
import { Customer } from "./customer";

export class BookTicket {
    id:number;
    billAmount:number
    bookingStatus:string
    bookingDate:Date
    customer:Customer
    bus:Bus
    numberOfTickets:number
}
