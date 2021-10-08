import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bus } from 'src/app/models/bus';
import { Route } from 'src/app/models/route';
import { Seat } from 'src/app/models/seat';
import { BusService } from 'src/app/services/bus.service';
import { RouteService } from 'src/app/services/route.service';
import { SeatService } from 'src/app/services/seat.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-add-bus',
  templateUrl: './add-bus.component.html',
  styleUrls: ['./add-bus.component.css']
})
export class AddBusComponent implements OnInit {

  errorMessage: string;
  addroute: boolean;
  successMessage: string;
  add: boolean
  buses: Bus
  rId: number
  numberOfSeats: number
  routes: Route[]
  seats: Seat
  rName: string;
  minDate = new Date();
  BusForm = new FormGroup({});
  config: any
  constructor(public formBuilder: FormBuilder, public router: Router, public activatedRoute: ActivatedRoute, public busService: BusService, public routeService: RouteService, public seatService: SeatService, public toaster: ToasterService) { }

  ngOnInit(): void {
    console.log(this.minDate);
    this.BusForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      busType: ['', [Validators.required, Validators.minLength(5)]],
      route: ['', [Validators.required, Validators.minLength(5)]],
      numberOfSeats: ['', [Validators.required]],
      date: ['', [Validators.required]],
      departureTime: ['', [Validators.required]],
      arrivalTime: ['', [Validators.required]],
      fare: ['', [Validators.required]],
    })

    this.routeService.getAllRoutes()
      .subscribe(res => {
        console.log(res);
        this.routes = res.data;

        console.log(this.routes)
      })


  }


  addBus() {
    console.log(this.BusForm.value)

    this.buses = this.BusForm.value

    this.busService.addBus(this.BusForm.value)
      .subscribe(
        res => {
          console.log(res);

          this.numberOfSeats = this.buses.numberOfSeats
          this.busService.getBusByName(this.buses.name)
            .subscribe(res => {
              console.log(res);
              this.buses = new Bus()
              this.buses = res.data;
              //  this.buses = this.buses.data
              for (var i = 0; i < this.numberOfSeats; i++) {

                this.seats = new Seat();
                this.seats.seatStatus = "Available"
                this.seats.seatNumber = i;
                this.seats.bus = this.buses
                console.log(this.buses)
                console.log(this.seats)
                this.seatService.addSeat(this.seats)
                  .subscribe(
                    res => {

                      console.log(res);
                      console.log("add seat called");
                    })
              }




            })

          this.toaster.success("Sucess", "Bus Added")
          this.router.navigate(['viewbus'])

        })



  }
  view() {
    this.router.navigate(['viewbus'])
  }
  back() {

    this.router.navigate(['admin'])
  }



}


