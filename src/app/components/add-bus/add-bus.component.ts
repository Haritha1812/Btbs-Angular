import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Bus } from 'src/app/models/bus';
import { Route } from 'src/app/models/route';
import { Seat } from 'src/app/models/seat';
import { BusService } from 'src/app/services/bus.service';
import { RouteService } from 'src/app/services/route.service';
import { SeatService } from 'src/app/services/seat.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-bus',
  templateUrl: './add-bus.component.html',
  styleUrls: ['./add-bus.component.css']
})
export class AddBusComponent implements OnInit {
  errorMessage?: string;
  addroute?: boolean;
  successMessage?: string;
  add?: boolean
  buses: Observable<Bus[]> | any
  rId?: number
  numberOfSeats: number
  routes: Observable<Route[]> | any
  seats?: Seat
  rName?: string;
  minDate = new Date();
  BusForm = new FormGroup({});
  config:any
  constructor(public formBuilder: FormBuilder, public router: Router, public activatedRoute: ActivatedRoute, public busService: BusService, public routeService: RouteService, public seatService: SeatService) { }

  ngOnInit(): void {
    console.log(this.minDate);
    this.BusForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      busType: ['', [Validators.required, Validators.minLength(5)]],
      routeName: ['', [Validators.required, Validators.minLength(5)]],
      numberOfSeats: ['', [Validators.required]],
      date: ['', [Validators.required]],
      departureTime: ['', [Validators.required, Validators.minLength(5)]],
      arrivalTime: ['', [Validators.required]],
      fare: ['', [Validators.required]],
    })

    this.routeService.getAllRoutes()
      .subscribe(res => {
        console.log(res);
        this.routes = res;
        this.routes = this.routes.data
      })


  }
   

  addBus() {
    console.log(this.BusForm.value)
    this.buses = this.BusForm.value
    this.rName = this.buses.routeName;
    this.routeService.getRouteByName(this.rName)
      .subscribe(
        data => {
          console.log(data);
          console.log(data.routeId)
          this.routes = data
          this.routes = this.routes.data
          this.rId = this.routes.routeId
          this.buses.route = this.routes
          console.log(this.buses)
          this.busService.addBus(this.buses)
            .subscribe(
              res => {
                console.log(res);

                this.numberOfSeats = this.buses.numberOfSeats
                this.busService.getBusByName(this.buses.name)
                  .subscribe(res => {
                    console.log(res);
                    this.buses = res;
                    this.buses = this.buses.data
                    for (var i = 0; i < this.numberOfSeats; i++) {

                      this.seats = new Seat();
                      this.seats.seatStatus = "Available"
                      this.seats.seatName = "Seat" + i;
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
                this.successAlertNotification();

              })


        })
  }
  view() {
    this.router.navigate(['viewbus'])
  }
  back() {

    this.router.navigate(['admin'])
  }

  successAlertNotification() {
    Swal.fire('Success', 'Bus Details Added Successfully', 'success')
    this.router.navigate(['viewbus'])
  }

}


