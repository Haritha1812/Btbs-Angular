import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
@Component({
  selector: 'app-view-booking',
  templateUrl: './view-booking.component.html',
  styleUrls: ['./view-booking.component.css']
})
export class ViewBookingComponent implements OnInit {

  
  constructor(public formBuilder:FormBuilder,public router: Router,public activatedRoute: ActivatedRoute, public busService:BusService,public routeService:RouteService,public seatService:SeatService,public passengerService:PassengerService,public customerService:CustomerService,public bookService:BookTicketService) { }
 bookTickets:Observable<BookTicket[]>|any
booking:any[]=[]
bookings:Observable<BookTicket[]>|any
passengers:Observable<Passenger>[]|any
viewid:boolean
view:boolean
showpassenger:boolean
  ngOnInit(): void {
this.refresh()

   
  }
  refresh(){
    this.bookService.getAllBookings()
    .subscribe(res=>{
      console.log(res)
      this.bookTickets=res
      this.view=true
      var j=0;
      for(var i=0;i<this.bookTickets.length;i++){
             if(this.bookTickets[i].bookingStatus=="Pending"){
               
               this.booking[j++]=this.bookTickets[i]
               console.log(this.booking)
             }
             

      }
    })
  }
  viewPassenger(){
  
  }
  viewDetails(id:number){
    console.log(id)
    this.bookService.getById(id)
    .subscribe(res=>{
      console.log(res)
      this.bookings=res
      this.viewid=true
      this.view=false
      this.passengerService.getByBusidandcusid(this.bookings.bus.id,this.bookings.customer.id)
      .subscribe(res=>{
        console.log(res);
        this.passengers=res
      })
    })
  }
  add(){
    this.router.navigate(['view'])
   }
  addbus(){
    this.router.navigate(['viewbus'])
   }
   addcus(){
     
    this.router.navigate(['viewbook'])
   }

  backadmin(){
    
    this.router.navigate(['admin'])
  }
  back(){
    this.view=true
    this.viewid=false
    this.router.navigate(['viewbook'])
  }
  updateStatus(id:number,bid:number,cid:number){
       console.log(id)
       console.log(bid)
       console.log(cid)
       this.bookService.updateStatus(id,bid,cid)
       .subscribe(res=>{
         console.log(res)
       },
       error => {
              
        
        console.log("#######Booking updated successfully ");
          this.refresh();
          this.successAlertNotification();
          this.view=true
      }
       )
  }


  viewcus(){
  
     
    this.router.navigate(['viewcus'])
  }
  viewPass(){
    this.showpassenger=true;
  }
  
successAlertNotification(){
  Swal.fire('Success', 'Customer Request approved Successfully', 'success')
  this.router.navigate(['admin'])
}
}
