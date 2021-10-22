import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { BusService } from 'src/app/services/bus.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RouteService } from 'src/app/services/route.service';
import { SeatService } from 'src/app/services/seat.service';

@Component({
  selector: 'app-customer-operations',
  templateUrl: './customer-operations.component.html',
  styleUrls: ['./customer-operations.component.css']
})
export class CustomerOperationsComponent implements OnInit {

  constructor(public formBuilder: FormBuilder, public router: Router, public activatedRoute: ActivatedRoute, public busService: BusService, public routeService: RouteService, public seatService: SeatService, public customerService: CustomerService) { }

  cusId: number
  customer: Customer
  name: string
  ngOnInit(): void {

    this.cusId = this.activatedRoute.snapshot.params['cusId'];
    console.log(this.cusId);
    this.customerService.getCustomerById(this.cusId).subscribe(
      res => {
        this.customer = res.data
        this.name = this.customer.name

      }


    )
  }


  search() {
    this.router.navigate(['search', this.cusId])
  }
  view() {

    this.router.navigate(['viewcusbook', this.cusId])
  }
  logout() {

    this.router.navigate(['home'])
  }
  edit() {

    this.router.navigate(['editcus', this.cusId])
  }
}