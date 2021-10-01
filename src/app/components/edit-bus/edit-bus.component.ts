import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Bus } from 'src/app/models/bus';
import { Route } from 'src/app/models/route';
import { BusService } from 'src/app/services/bus.service';
import { RouteService } from 'src/app/services/route.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-edit-bus',
  templateUrl: './edit-bus.component.html',
  styleUrls: ['./edit-bus.component.css']
})
export class EditBusComponent implements OnInit {

  busId?:number
  errorMessage?: string;
  addroute?:boolean;
  successMessage?: string;
 routeName?:String;
 busType?:String;
  buses:Bus
 rName:string
routes:Observable<Route[]>|any
  BusForm = new FormGroup({});
  
  minDate = new Date();
  constructor(public formBuilder:FormBuilder,public router: Router,public activatedRoute: ActivatedRoute, public busService:BusService , public routeService:RouteService) { }


  ngOnInit(): void {

    
    this.buses = new Bus();
    this.busId=this.activatedRoute.snapshot.params['busId'];
if(this.busId !=-1){
  console.log("getRouteById called")
  this.busService.getBusById(this.busId)
  .subscribe(res =>{
    console.log(res);
    this.buses =res;
    console.log(this.buses.routeName);
    this.routeName=this.buses.routeName;
    this.busType=this.buses.busType
    this.BusForm = this.formBuilder.group({
      id:[this.buses.id, [Validators.required]],
      name : [this.buses.name, [Validators.required,Validators.minLength(5)]],
      busType : [this.buses.busType, [Validators.required,Validators.minLength(5)]],
      routeName : [this.buses.routeName, [Validators.required,Validators.minLength(5)]],
      numberOfSeats : [this.buses.numberOfSeats, [Validators.required]],
      date : [this.buses.date, [Validators.required]],
      departureTime : [this.buses.departureTime, [Validators.required,Validators.minLength(5)]],
      arrivalTime : [this.buses.arrivalTime, [Validators.required]],
      fare : [this.buses.fare, [Validators.required]],
      
    })
    this.routeService.getAllRoutes()
    .subscribe(res=>{
      console.log(res);
      this.routes=res;
    })




  })

}
  }
  editBus(){
    
    console.log("updatebuses called")
    this.buses=this.BusForm.value
    this.rName = this.buses.routeName;
    console.log(this.buses)
    console.log(this.rName)
    this.routeService.getRouteByName(this.rName)
    .subscribe(
      data=>{
        console.log(data);
        console.log(data.routeId)
        
        this.buses.route=data
        console.log(this.buses)
        this.busService.updatebus(this.buses)
        .subscribe(
        res =>{
          console.log(res);
          this.buses=res;
          
        console.log("add route called");
          this.successMessage = "Bus Updated successfully";
          console.log("#######Bus Updated successfully ");
        },
        error => {
              
          console.log();
          
          this.successMessage = "Bus Updated successfully";
          console.log("#######Bus Updated successfully ");
    
         this.successAlertNotification()
  }
  );
  
})
  }

    successAlertNotification(){
      Swal.fire('Success', 'Bus details updated successfully', 'success')
      this.router.navigate(['viewbus'])
    }
    back(){
    
      this.router.navigate(['viewbus'])
      }
      add(){
        this.router.navigate(['view'])
       }
      addbus(){
        this.router.navigate(['viewbus'])
       }
       addcus(){
         
        this.router.navigate(['viewbook'])
       }
    
}