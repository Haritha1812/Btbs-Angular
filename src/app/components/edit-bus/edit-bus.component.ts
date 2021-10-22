import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Bus } from 'src/app/models/bus';
import { Route } from 'src/app/models/route';
import { BusService } from 'src/app/services/bus.service';
import { RouteService } from 'src/app/services/route.service';
import { ToasterService } from 'src/app/services/toaster.service';
import { ViewBusComponent } from '../view-bus/view-bus.component';
@Component({
  selector: 'app-edit-bus',
  templateUrl: './edit-bus.component.html',
  styleUrls: ['./edit-bus.component.css']
})
export class EditBusComponent implements OnInit {

  busId: number
  editTime: boolean
  errorMessage: string;
  addroute: boolean;
  successMessage: string;
  routeName: string;
  busType: string;
  buses: Observable<Bus[]> | any
  rName: string
  routes: Route[]
  route: Route
  BusForm = new FormGroup({});

  minDate = new Date();
  constructor(public formBuilder: FormBuilder, public matdialogref: MatDialogRef<ViewBusComponent>, public router: Router, public activatedRoute: ActivatedRoute, public busService: BusService, public routeService: RouteService, public toaster: ToasterService) { }


  ngOnInit(): void {


    this.getRoutes();
    this.buses = new Bus();
    this.buses = JSON.parse(localStorage.getItem('bus'));
    this.route = this.buses.route
    console.log(this.buses)


  }

  getRoutes() {
    this.routeService.getAllRoutes()
      .subscribe(res => {
        console.log(res);
        this.routes = res.data
        console.log(this.routes)
      })

  }
  editBus() {




    console.log(this.buses)
    console.log(this.buses.route.routeName)

    this.busService.updatebustimings(this.buses)
      .subscribe(
        res => {
          console.log(res);
          this.buses = res;
          this.toaster.success('Updated Successfully!!');
          this.toaster.info('Mail sent to the booked customers');
          this.reloadComponent();
          this.matdialogref.close();
        },
        error => {



        }
      );



  }

  reloadComponent() {



    this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.router.onSameUrlNavigation = 'reload';

    this.router.navigate(['viewbus']);

  }
  back() {
    this.matdialogref.close();

  }

}