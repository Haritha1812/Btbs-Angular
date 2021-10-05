import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Bus } from 'src/app/models/bus';
import { Route } from 'src/app/models/route';
import { BusService } from 'src/app/services/bus.service';
import { RouteService } from 'src/app/services/route.service';
import { DatePipe } from '@angular/common';
import { SeatService } from 'src/app/services/seat.service';
import { Seat } from 'src/app/models/seat';
import { PassengerService } from 'src/app/services/passenger.service';
import { Passenger } from 'src/app/models/passenger';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer';
import { BookTicket } from 'src/app/models/book-ticket';
import { BookTicketService } from 'src/app/services/book-ticket.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search-bus',
  templateUrl: './search-bus.component.html',
  styleUrls: ['./search-bus.component.css']
})
export class SearchBusComponent implements OnInit {
arr_seat =[]; 
total : any[]=[]
submitted:boolean[]=[]
id:number
seatNumber:number
totalfare:number
routes:Observable<Route[]>|any
buses:Observable<Bus[]>|any
sName:string
seats:Observable<Seat[]>|any
passenger:Passenger
s: Array<any>
from:string
to:string
date:Date
searchbus:boolean
buslist:boolean
showseat:boolean
selectpassenger:boolean
dateformat:string
route:Route
minDate = new Date();
BusForm = new FormGroup({});
PassengerForm = new FormGroup({});
form = new FormGroup({});
pipe = new DatePipe('en-US');
cusId?:number
customer: Observable<Customer>|any
successMessage:string
actions:FormGroup
isdisabled:boolean;
booktickets?:BookTicket
no="No"
  constructor(public formBuilder:FormBuilder,public router: Router,public activatedRoute: ActivatedRoute, public busService:BusService,public routeService:RouteService,public seatService:SeatService,public passengerService:PassengerService,public customerService:CustomerService,public bookService:BookTicketService) { }
  ngOnInit(): void {

    console.log(this.minDate);
    this.cusId=this.activatedRoute.snapshot.params['cusId'];
    console.log(this.cusId)
    //search form
    this.BusForm = this.formBuilder.group({
    fromLocation : ['', [Validators.required]],
    toLocation : ['', [Validators.required]],
    date : ['', [Validators.required]],
     
    })

    //seat form
    this.form = this.formBuilder.group({
      checkArray: this.formBuilder.array([], [Validators.required])
    })
  
  
    this.PassengerForm = this.formBuilder.group({
      name : ['', [Validators.required,Validators.minLength(5)]],
      age : ['', [Validators.required]],
      gender : ['', [Validators.required]],
      seatNumber : ['', [Validators.required]],
    })
    //to load the routes
    this.routeService.getAllRoutes()
    .subscribe(res=>{
      console.log(res);
      this.routes=res;
      this.routes=this.routes.data
      this.searchbus = true
    })

    this.customerService.getCustomerById(this.cusId)
    .subscribe(res=>{
      console.log(res);
      this.customer=res
      this.customer=this.customer.data
    })
  }

  showSeats(id:number){
    console.log(id)
    this.seatService.getseats(id)
    .subscribe(res=>{
      console.log(res)
      this.seats=res
      this.seats =this.seats.data
      this.showseat=true
      this.s=this.seats
      console.log(this.s)
      if(this.seats.seatStatus=='No'){
        this.isdisabled=true;
        console.log(this.isdisabled);
      }
    })
    this.buslist=false
  }
  check(seatName:string){
   console.log(this.PassengerForm.value)
    console.log(seatName)
    this.submitted[seatName]=true;
    console.log(this.s[0])
    this.sName=seatName
    console.log(this.s[0].bus.id)
    this.PassengerForm.value.seatNumber = this.sName
    this.passenger=this.PassengerForm.value
    this.passenger.customer=this.customer
    this.passenger.bus=this.s[0].bus
    console.log(this.passenger)
      console.log(this.PassengerForm.value)

      this.seatService.updateStatus(this.sName,this.s[0].bus.id)
      .subscribe(res=>{
        console.log(res)
      })
      this.passengerService.addPassenger(this.PassengerForm.value)
      .subscribe(res=>{
        console.log(res)
           
        console.log();
        this.successMessage = "Passenger Added successfully"+this.passenger.name;
        console.log("#######Passenger added successfully ");
    
      },
      
          error => {
           
          });
      
    }
  search(){
  this.buslist = true
  console.log(this.BusForm.value)
  this.from =this.BusForm.value.fromLocation
  this.to =this.BusForm.value.toLocation
  this.date =this.BusForm.value.date
    // to convert the date format
  this.dateformat = this.pipe.transform(this.date, 'yyyy-MM-dd');

  //load the buses based on routes
   this.busService.getRouteByLocation(this.from,this.to,this.dateformat)
   .subscribe(res=>{
     console.log(res)
     this.buses=res
     this.buses=this.buses.data
     this.from=this.buses[0].route.fromLocation
     this.to=this.buses[0].route.toLocation
     console.log(this.buses[0].route.fromLocation)
   })
    

  }
  //to show the tickets form
  book(){
    this.showseat=true;
    this.buslist=false
  }
  bookTicket(){
    this.customerService.getCustomerById(this.cusId)
    .subscribe(res=>{
      console.log(res)
      this.customer=res;
      this.customer=this.customer.data
     console.log(this.s[0].bus.id);
     this.buses =this.s[0].bus
     console.log(this.buses)
     this.booktickets=new BookTicket()
     this.booktickets.bookingStatus="Pending"
      this.booktickets.bookingDate=this.minDate
      this.booktickets.billAmount=this.totalfare
      this.booktickets.bus=this.buses
      this.booktickets.customer=this.customer
      this.booktickets.numberOfTickets=this.total.length
      this.bookService.addTicket(this.booktickets)
      .subscribe(res=>{
        console.log(res);
        console.log();
            this.successMessage = "Booking Added successfully"+this.passenger.name;
            console.log("#######Booking added successfully ");
            this.successAlertNotification();
            this.router.navigate(['viewcusbook',this.cusId])
      },
      
      
          error => {
              
            
          });
      
    })
    
  }

  successAlertNotification(){
    Swal.fire('Done', 'You have booked Successfully.Check your mail for Further Details', 'success')
    this.router.navigate(['viewcusbook',this.cusId])
  }
//to show the seats based on seat number of bus
 generateseatNumber(seats:number){
  this.arr_seat  = new Array(seats);
  for (var i = 0; i < this.arr_seat.length; i++) {
    this.arr_seat[i] = i+1 ;
  }
  console.log("seat calles.......")
  this.showseat=true
}


submit(){
console.log(this.form.value)
this.seats = new Seat()
this.total=this.form.value.checkArray

console.log(this.total)
console.log(this.total.length)
console.log(this.s[0].bus.fare)
this.totalfare = this.total.length * this.s[0].bus.fare
console.log(this.totalfare)
this.selectpassenger=true
this.showseat = false
this.searchbus=false;
this.buslist=false;
}

//to get the value of selected seats in the checkbox
// onCheckboxChange(e) {
//   const seat: FormArray = this.form.get('seat') as FormArray;
//  console.log(seat)
//   if (e.target.checked) {
//     seat.push(new FormControl(e.target.value));
//   } else {
//      const index = seat.controls.findIndex(x => x.value === e.target.value);
//      seat.removeAt(index);
//   }
//   console.log(seat)
// }
onCheckboxChange(e) {
  const checkArray: FormArray = this.form.get('checkArray') as FormArray;

  if (e.target.checked) {
    checkArray.push(new FormControl(e.target.value));
  } else {
    let i: number = 0;const index = checkArray.controls.findIndex(x => x.value === e.target.value);
        checkArray.removeAt(i);
        return;
      
      i++;
    };
  
}
checkCheckBoxvalue(event){
  console.log(event.target.checked)
}
back(){
  this.router.navigate(['cusop',this.cusId])
}
searcht(){
  this.router.navigate(['search',this.cusId])
 }
 view(){
   
  this.router.navigate(['viewcusbook',this.cusId])
 }
 home(){
   
  this.router.navigate(['cusop',this.cusId])
 }
}

