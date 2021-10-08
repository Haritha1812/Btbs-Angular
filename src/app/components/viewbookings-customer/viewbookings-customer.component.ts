import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { BusService } from 'src/app/services/bus.service';
import { RouteService } from 'src/app/services/route.service';

import { SeatService } from 'src/app/services/seat.service';

import { PassengerService } from 'src/app/services/passenger.service';

import { CustomerService } from 'src/app/services/customer.service';

import { BookTicket } from 'src/app/models/book-ticket';
import { BookTicketService } from 'src/app/services/book-ticket.service';
import { Observable } from 'rxjs';
import { Passenger } from 'src/app/models/passenger';
import Swal from 'sweetalert2';
import { Time } from '@angular/common';
import { ToasterService } from 'src/app/services/toaster.service';
@Component({
  selector: 'app-viewbookings-customer',
  templateUrl: './viewbookings-customer.component.html',
  styleUrls: ['./viewbookings-customer.component.css']
})
export class ViewbookingsCustomerComponent implements OnInit {

  constructor(public formBuilder: FormBuilder,public toaster:ToasterService, public router: Router, public activatedRoute: ActivatedRoute, public busService: BusService, public routeService: RouteService, public seatService: SeatService, public passengerService: PassengerService, public customerService: CustomerService, public bookService: BookTicketService) { }
  bookTickets: BookTicket
  booking: any[] = []
  bookings: BookTicket[]
  
  passengers: Observable<Passenger>[] | any
  showpassenger: boolean
  view: boolean
  viewid: boolean
  cusId?: number
  config: any
  busName: string
  bustype: string
  journeyDate: Date
  arrivalStation: string
  departureStation: string
  arrivalTime: Time
  departureTime: Time
  numberOfTickets: number
  totalAmount: number
  invoice: boolean
  name: string
  search: any
  ngOnInit(): void {
    this.view = true
    this.cusId = this.activatedRoute.snapshot.params['cusId'];
    console.log(this.cusId)
    this.bookService.getByCusId(this.cusId)
      .subscribe(res => {
        console.log(res)
        this.bookings = res.data

        this.config = {
          itemsPerPage: 3,
          currentPage: 1,
          totalItems: this.bookings.length
        };

        console.log(this.bookings[0].bus.id)
        console.log(this.cusId)
        this.passengerService.getByBusidandcusid(this.bookings[0].bus.id, this.cusId)
          .subscribe(res => {
            console.log(res);
            this.passengers = res
            this.passengers = this.passengers.data
          })
      },error=>{
             this.toaster.error("No data's found")
      }
      
      )
  }
  pageChanged(event: any) {
    this.config.currentPage = event;
  }
  @ViewChild('htmlData') htmlData: ElementRef;
  USERS = [
    {
      "Bus Name": "Haritha",
      "Bus type": "xxxx",
      "Journey Date": "xxxxx",
      "Arrival Station": "xxxx",
      "Departure Station": "xxxx",
      "Arrival Time": "xxx",
      " Departure Time ": "xxx",
      "Number Of Tickets ": 0,
      "Total Amount": 0


    }

  ];
  viewDetails(busid: number, cusId: number) {
    this.passengerService.getByBusidandcusid(busid, cusId)
      .subscribe(res => {
        console.log(res);
        this.passengers = res
        this.passengers = this.passengers.data
        this.showpassenger = true
      })
  }
  viewDetail(b: BookTicket) {
    
        this.bookTickets = b
        console.log(this.bookTickets)
        this.viewid = true
        this.view = false
        this.passengerService.getByBusidandcusid(this.bookTickets.bus.id, this.bookTickets.customer.id)
          .subscribe(res => {
            console.log(res);
            this.passengers = res
            this.passengers = this.passengers.data

          })
    
  }
  viewPass() {
    this.showpassenger = true
  }
  back() {

    this.router.navigate(['cusop', this.cusId])
  }
  backtocus() {

    this.router.navigate(['cusop', this.cusId])
  }
  download(b:BookTicket) {
    this.invoice = true
    this.bookTickets=b
        this.passengerService.getByBusidandcusid(this.bookTickets.bus.id, this.bookTickets.customer.id)
          .subscribe(res => {
            console.log(res);
            this.passengers = res

            this.passengers = this.passengers.data
            this.numberOfTickets = this.passengers.length
          })
        this.busName = this.bookTickets.bus.name;
        this.bustype = this.bookTickets.bus.busType;
        this.journeyDate = this.bookTickets.bookingDate;
        this.arrivalStation = this.bookTickets.bus.route.fromLocation;
        this.departureStation = this.bookTickets.bus.route.toLocation;
        this.arrivalTime = this.bookTickets.bus.arrivalTime;
        this.departureTime = this.bookTickets.bus.departureTime;
        this.totalAmount = this.bookTickets.billAmount;
        this.name =  b.customer.name;


``
  }
  public openPDF(): void {
    let DATA = document.getElementById('htmlData');

    html2canvas(DATA).then(canvas => {

      let fileWidth = 208;
      let fileHeight = canvas.height * fileWidth / canvas.width;

      const FILEURI = canvas.toDataURL('image/png')
      var PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

      PDF.save('Invoice.pdf');
    });
  }
  searcht() {
    this.router.navigate(['search', this.cusId])
  }
  viewt() {

    this.router.navigate(['viewcusbook', this.cusId])
  }
  home() {

    this.router.navigate(['cusop', this.cusId])
  }

}
