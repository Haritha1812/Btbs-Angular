import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from 'src/app/models/route';
import { RouteService } from 'src/app/services/route.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-add-route',
  templateUrl: './add-route.component.html',
  styleUrls: ['./add-route.component.css']
})
export class AddRouteComponent implements OnInit {

  errorMessage: string;
  addroute: boolean;
  successMessage: string;
  fromLocation: string;
  toLocation: string;
  routes: Route

  RouteForm = new FormGroup({});
  constructor(public formBuilder: FormBuilder, public router: Router, public activatedRoute: ActivatedRoute, public routeService: RouteService, public toaster: ToasterService) { }

  ngOnInit(): void {
    this.addroute = true
    this.RouteForm = this.formBuilder.group({
      fromLocation: ['', [Validators.required, Validators.minLength(5)]],
      toLocation: ['', [Validators.required, Validators.minLength(5)]],
      routeName: ['', [Validators.required, Validators.minLength(5)]],
      distance: ['', [Validators.required]],
    })
  }
  check() {


    this.routes = this.RouteForm.value;
    this.fromLocation = this.routes.fromLocation;
    console.log(this.routes);
    this.toLocation = this.routes.toLocation;
    this.routeService.getRouteByLocation(this.fromLocation, this.toLocation)
      .subscribe(
        res => {
          console.log(res[0]);

          this.routes = res[0]
          if (this.routes == null) {
            this.addRoute();

          }
          else {
            console.log("Route already exists");
            this.errorMessage = "Route with this from and to location already exists"
          }
        },error=>{
          this.toaster.error("Route with route name already exists")
        }
      )
  }

  addRoute() {

    console.log("add route called");
    this.routeService.addRoute(this.RouteForm.value)

      .subscribe(
        res => {
          console.log(res);
          this.routes = res;

          this.toaster.success("Route Added Successfully");
          this.router.navigate(['view'])
          console.log("#######Route added successfully ");
        },
        error => {
          console.log(error);

          this.toaster.error("Route with route name already exists")

        }
      );
  }
  back() {
    this.router.navigate(['admin']);
  }


}
