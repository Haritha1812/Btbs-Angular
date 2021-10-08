import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BookTicket } from 'src/app/models/book-ticket';
import { Passenger } from 'src/app/models/passenger';
import { BookTicketService } from 'src/app/services/book-ticket.service';
import { BusService } from 'src/app/services/bus.service';
import { CustomerService } from 'src/app/services/customer.service';
import { PassengerService } from 'src/app/services/passenger.service';
import { RouteService } from 'src/app/services/route.service';
import { SeatService } from 'src/app/services/seat.service';
import { ToasterService } from 'src/app/services/toaster.service';





@Component({
  selector: 'app-view-booking',
  templateUrl: './view-booking.component.html',
  styleUrls: ['./view-booking.component.css']
})
export class ViewBookingComponent implements OnInit {


  constructor(public formBuilder: FormBuilder, public router: Router, public toaster: ToasterService, public activatedRoute: ActivatedRoute, public busService: BusService, public routeService: RouteService, public seatService: SeatService, public passengerService: PassengerService, public customerService: CustomerService, public bookService: BookTicketService) { }
  bookTickets: BookTicket[]

  booking: any[] = []
  bookings: BookTicket
  passengers: Passenger[]
  viewid: boolean
  view: boolean
  search: any
  config: any
  showpassenger: boolean
  ngOnInit(): void {
    this.refresh()


  }
  refresh() {
    this.bookService.getAllBookings()
      .subscribe(res => {
        console.log(res)
        this.bookTickets = res.data
        this.config = {
          itemsPerPage: 3,
          currentPage: 1,
          totalItems: this.bookTickets.length
        };
        this.view = true
        var j = 0;
        for (var i = 0; i < this.bookTickets.length; i++) {
          if (this.bookTickets[i].bookingStatus == "Pending") {

            this.booking[j++] = this.bookTickets[i]
            console.log(this.booking)
          }


        }
      }, error => {
        this.toaster.error("No data's found")
      }
      )
  }
  pageChanged(event: any) {
    this.config.currentPage = event;
  }

  viewPassenger() {

  }
  viewDetails(b: BookTicket) {
    this.viewid = true
    this.view = false
    this.bookings = b
    this.viewid = true
    this.view = false
    this.passengerService.getByBusidandcusid(this.bookings.bus.id, this.bookings.customer.id)
      .subscribe(res => {
        console.log(res);
        this.passengers = res.data
      }

      )

  }


  backadmin() {

    this.router.navigate(['admin'])
  }
  back() {
    this.view = true
    this.viewid = false
    this.router.navigate(['viewbook'])
  }
  updateStatus(id: number, bid: number, cid: number) {
    console.log(id)
    console.log(bid)
    console.log(cid)
    this.bookService.updateStatus(id, bid, cid)
      .subscribe(res => {
        console.log(res)
        console.log("#######Booking updated successfully ");
        this.refresh();
        this.toaster.success('Customer Booking approved!!!');
        this.router.navigate(['admin'])
        this.view = true
      },
        error => {

          console.log(error)

        }
      )
  }


  viewcus() {


    this.router.navigate(['viewcus'])
  }
  viewPass() {
    this.showpassenger = true;
  }


}
