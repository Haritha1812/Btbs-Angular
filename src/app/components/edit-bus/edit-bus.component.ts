import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Bus } from 'src/app/models/bus';
import { Route } from 'src/app/models/route';
import { BusService } from 'src/app/services/bus.service';
import { RouteService } from 'src/app/services/route.service';
import { ToasterService } from 'src/app/services/toaster.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-bus',
  templateUrl: './edit-bus.component.html',
  styleUrls: ['./edit-bus.component.css']
})
export class EditBusComponent implements OnInit {

  busId: number
  errorMessage: string;
  addroute: boolean;
  successMessage: string;
  routeName: string;
  busType: string;
  buses: Observable<Bus[]> | any
  rName: string
  routes: any
  BusForm = new FormGroup({});

  minDate = new Date();
  constructor(public formBuilder: FormBuilder, public router: Router, public activatedRoute: ActivatedRoute, public busService: BusService, public routeService: RouteService, public toaster: ToasterService) { }


  ngOnInit(): void {


    this.buses = new Bus();
    this.busId = this.activatedRoute.snapshot.params['busId'];
    if (this.busId != -1) {
      console.log("getRouteById called")
      this.busService.getBusById(this.busId)
        .subscribe(res => {
          console.log(res);
          this.buses = res;
          this.buses = this.buses.data
          console.log(this.buses.routeName);
          this.routeName = this.buses.routeName;
          this.busType = this.buses.busType
          this.BusForm = this.formBuilder.group({
            id: [this.buses.id, [Validators.required]],
            name: [this.buses.name, [Validators.required, Validators.minLength(5)]],
            busType: [this.buses.busType, [Validators.required, Validators.minLength(5)]],
            routeName: [this.buses.routeName, [Validators.required, Validators.minLength(5)]],
            numberOfSeats: [this.buses.numberOfSeats, [Validators.required]],
            date: [this.buses.date, [Validators.required]],
            departureTime: [this.buses.departureTime, [Validators.required, Validators.minLength(5)]],
            arrivalTime: [this.buses.arrivalTime, [Validators.required]],
            fare: [this.buses.fare, [Validators.required]],

          })
          this.routeService.getAllRoutes()
            .subscribe(res => {
              console.log(res);
              this.routes = res
              this.routes = this.routes.data
            })




        })

    }
  }
  editBus() {

    console.log("updatebuses called")
    this.buses = this.BusForm.value
    this.rName = this.buses.routeName;
    console.log(this.buses)
    console.log(this.rName)
    this.routeService.getRouteByName(this.rName)
      .subscribe(
        data => {
          console.log(data);
          this.routes = data
          this.routes = this.routes.data
          this.buses.route = this.routes



          console.log(this.buses)
          this.busService.updatebus(this.buses)
            .subscribe(
              res => {
                console.log(res);
                this.buses = res;
                this.toaster.success('Updated Successfully!!')
                this.router.navigate(['viewbus'])
              },
              error => {



              }
            );

        })


  }
  back() {

    this.router.navigate(['viewbus'])
  }

}