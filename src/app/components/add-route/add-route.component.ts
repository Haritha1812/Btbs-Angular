import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from 'src/app/models/route';
import { RouteService } from 'src/app/services/route.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-route',
  templateUrl: './add-route.component.html',
  styleUrls: ['./add-route.component.css']
})
export class AddRouteComponent implements OnInit {

  errorMessage?: string;
  addroute?:boolean;
  successMessage?: string;
fromLocation?:String;
toLocation?:String;
  routes?:Route
  
  RouteForm = new FormGroup({});
  constructor(public formBuilder:FormBuilder,public router: Router,public activatedRoute: ActivatedRoute, public routeService:RouteService) { }

  ngOnInit(): void {
console.log("Add route component called")
this.addroute=true
    this.RouteForm = this.formBuilder.group({
      fromLocation : ['', [Validators.required,Validators.minLength(5)]],
      toLocation : ['', [Validators.required,Validators.minLength(5)]],
      routeName : ['', [Validators.required,Validators.minLength(5)]],
     distance : ['', [Validators.required]],
    })
  }
check(){


    this.routes = this.RouteForm.value;
    this.fromLocation = this.routes.fromLocation;
    console.log(this.routes);
    this.toLocation = this.routes.toLocation;
    this.routeService.getRouteByLocation(this.fromLocation,this.toLocation)
    .subscribe(
      res=>{
        console.log(res[0]);
       
        this.routes= res[0]
        if(this.routes==null){
            this.addRoute();
            
        }
        else{
          console.log("Route already exists");
          this.errorMessage="Route with this from and to location already exists"
        }
      }
    )
}

addRoute(){
  
  console.log("add route called");
   this.routeService.addRoute(this.RouteForm.value)

.subscribe(
  res =>{
    console.log(res);
    this.routes=res;
    
    this.successAlertNotification()
    console.log("#######Route added successfully ");
  },
  error => {
    console.log(error)    
    
  }
);
}
back(){
  this.router.navigate(['admin']);
}


successAlertNotification(){
  Swal.fire('Success', 'Route Added Successfully', 'success')
  this.router.navigate(['view'])
}
}
