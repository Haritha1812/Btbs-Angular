import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Route } from 'src/app/models/route';
import { RouteService } from 'src/app/services/route.service';
import { ToasterService } from 'src/app/services/toaster.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-route',
  templateUrl: './edit-route.component.html',
  styleUrls: ['./edit-route.component.css']
})
export class EditRouteComponent implements OnInit {
  routeId: number
  errorMessage: string;
  addroute: boolean;
  successMessage: string;
  fromLocation: String;
  toLocation: String;

  routes: Observable<Route[]> | any
  RouteForm = new FormGroup({});
  constructor(public formBuilder: FormBuilder, public router: Router, public activatedRoute: ActivatedRoute, public routeService: RouteService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.routes = new Route();
    this.routeId = this.activatedRoute.snapshot.params['routeId'];
    if (this.routeId != -1) {
      console.log("getRouteById called")
      this.routeService.getRouteById(this.routeId)
        .subscribe(res => {
          console.log(res);
          this.routes = res; this.routes = this.routes.data

          this.RouteForm = this.formBuilder.group({
            routeId: [this.routes.routeId, [Validators.required]],
            fromLocation: [this.routes.fromLocation, [Validators.required, Validators.minLength(5)]],
            toLocation: [this.routes.toLocation, [Validators.required, Validators.minLength(5)]],


            routeName: [this.routes.routeName, [Validators.required, Validators.minLength(5)]],
            distance: [this.routes.distance, [Validators.required]],
          })

          console.log(this.routes.routeName);
        })
    }
  }

  editRoutes() {

    console.log("updateroutes called")
    console.log(this.RouteForm.value);
    this.routeService.updateroute(this.RouteForm.value)
      .subscribe(res => {
        console.log(res)
        this.toaster.success('Updated Successfully!!!')
        this.router.navigate(['view'])
        this.successMessage = "Route Updated successfully";
        console.log("#######Route updated successfully ");
      },
        error => {


        }
      );

  }
  back() {
    this.router.navigate(['view'])
  }

  successAlertNotification() {
    Swal.fire('Success', 'Route details updated successfully', 'success')
    this.router.navigate(['view'])
  }

}

