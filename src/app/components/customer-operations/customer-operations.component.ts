import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BusService } from 'src/app/services/bus.service';
import { RouteService } from 'src/app/services/route.service';
import { SeatService } from 'src/app/services/seat.service';

@Component({
  selector: 'app-customer-operations',
  templateUrl: './customer-operations.component.html',
  styleUrls: ['./customer-operations.component.css']
})
export class CustomerOperationsComponent implements OnInit {

  constructor(public formBuilder: FormBuilder, public router: Router, public activatedRoute: ActivatedRoute, public busService: BusService, public routeService: RouteService, public seatService: SeatService) { }

  cusId: number
  ngOnInit(): void {

    this.cusId = this.activatedRoute.snapshot.params['cusId'];
    console.log(this.cusId)
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