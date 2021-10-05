import { Component, OnInit } from '@angular/core';

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
@Component({
  selector: 'app-customer-operations',
  templateUrl: './customer-operations.component.html',
  styleUrls: ['./customer-operations.component.css']
})
export class CustomerOperationsComponent implements OnInit {

  constructor(public formBuilder:FormBuilder,public router: Router,public activatedRoute: ActivatedRoute, public busService:BusService,public routeService:RouteService,public seatService:SeatService) { }
 
cusId:number
  ngOnInit(): void {

    this.cusId=this.activatedRoute.snapshot.params['cusId'];
    console.log(this.cusId)
  }
  search(){
    this.router.navigate(['search',this.cusId])
   }
   view(){
     
    this.router.navigate(['viewcusbook',this.cusId])
   }
   logout(){
     
    this.router.navigate(['home'])
   }
}
