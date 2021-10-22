import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-viewall',
  templateUrl: './viewall.component.html',
  styleUrls: ['./viewall.component.css']
})
export class ViewallComponent implements OnInit {


  constructor(public formBuilder: FormBuilder, public router: Router, public toaster: ToasterService, public activatedRoute: ActivatedRoute, public busService: BusService, public routeService: RouteService, public seatService: SeatService, public passengerService: PassengerService, public customerService: CustomerService, public bookService: BookTicketService) { }
  bookTickets: BookTicket[]
  cusId: number
  booking: any[] = []
  bookings: BookTicket
  passengers: Passenger[]
  viewid: boolean
  view: boolean
  search: any
  config: any
  showpassenger: boolean
  ngOnInit(): void {
    this.cusId = this.activatedRoute.snapshot.params['cusId'];
    console.log(this.cusId)
    this.bookService.getByCusId(this.cusId)
      .subscribe(res => {
        console.log(res)
        this.booking = res.data
        this.view = true

        this.config = {
          itemsPerPage: 3,
          currentPage: 1,

        };

        console.log(this.booking[0].bus.id)
        console.log(this.cusId)
        this.passengerService.getByBusidandcusid(this.booking[0].bus.id, this.cusId)
          .subscribe(res => {
            console.log(res);
            this.passengers = res.data
          })
      }, error => {
        this.toaster.error("No booking's found")
        this.router.navigate(['viewcus'])
      }

      )
  }

  pageChanged(event: any) {
    this.config.currentPage = event;
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

    this.router.navigate(['viewcus'])
  }
  back() {
    this.view = true
    this.viewid = false
    this.router.navigate(['viewbook'])
  }


  viewcus() {


    this.router.navigate(['viewcus'])
  }
  viewPass() {
    this.showpassenger = true;
  }


}
