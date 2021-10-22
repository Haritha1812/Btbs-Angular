import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Bus } from 'src/app/models/bus';
import { BusService } from 'src/app/services/bus.service';
import { RouteService } from 'src/app/services/route.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { ViewBusComponent } from '../view-bus/view-bus.component';
@Component({
  selector: 'app-editall-bus',
  templateUrl: './editall-bus.component.html',
  styleUrls: ['./editall-bus.component.css']
})
export class EditallBusComponent implements OnInit {


  busId: number
  errorMessage: string;
  addroute: boolean;
  successMessage: string;
  routeName: string;
  busType: string;
  buses: Bus
  rName: string
  routes: any
  BusForm = new FormGroup({});

  minDate = new Date();
  constructor(public formBuilder: FormBuilder, public router: Router, public activatedRoute: ActivatedRoute, public busService: BusService, public routeService: RouteService, public toaster: ToasterService) { }


  ngOnInit(): void {


    this.buses = new Bus();
    this.busId = this.activatedRoute.snapshot.params['busId']
    console.log(this.busId)
    if (this.busId != -1) {
      console.log("getRouteById called")
      this.busService.getBusById(this.busId)
        .subscribe(res => {
          console.log(res);
          this.buses = res.data
          console.log(this.buses.route.routeName);
          this.routeName = this.buses.route.routeName;
          this.busType = this.buses.busType
          this.BusForm = this.formBuilder.group({
            id: [this.buses.id, [Validators.required]],
            name: [this.buses.name, [Validators.required, Validators.minLength(5)]],
            busType: [this.buses.busType, [Validators.required, Validators.minLength(5)]],
            route: ['', [Validators.required]],
            numberOfSeats: [this.buses.numberOfSeats, [Validators.required]],
            date: [this.buses.date, [Validators.required]],
            departureTime: [this.buses.departureTime, [Validators.required]],
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
    this.rName = this.buses.route.routeName;
    console.log(this.buses)
    console.log(this.rName)

    this.busService.updatebus(this.BusForm.value)
      .subscribe(
        res => {
          console.log(res);
          this.buses = res;
          this.toaster.success('Updated Successfully!!')
          this.reloadComponent();
          //  this.matdialogref.close();
        },
        error => {



        }
      );



  }

  back() {
    this.reloadComponent();

  }

  reloadComponent() {



    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.router.onSameUrlNavigation = 'reload';

    this.router.navigate(['viewbus']);

  }
}