import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Route } from 'src/app/models/route';
import { RouteService } from 'src/app/services/route.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-route',
  templateUrl: './view-route.component.html',
  styleUrls: ['./view-route.component.css']
})
export class ViewRouteComponent implements OnInit {

show:boolean
config:any
successMessage:string
routes:Route[]
search:any
  constructor(public formBuilder:FormBuilder,public router: Router,public activatedRoute: ActivatedRoute, public routeService:RouteService) { }

  ngOnInit(): void {
this.viewAllroutes()
    

  }
  addroute(){
    this.router.navigate(['routeadd'])
  }home(){
  
    this.router.navigate(['admin'])
  }
  back(){
    this.router.navigate(['admin'])
      }
  viewAllroutes(){
    this.routeService.getAllRoutes()
    .subscribe(
      res=>{
        console.log(res);
        this.routes=res.data;
        this.show=true;
        this.config = {​
          itemsPerPage:3,
          currentPage:1,
          totalItems:this.routes.length
                }​;
      },error=>{
        console.log(error);
        
        
      }
   
    )
  }
  edit(routeId:number){
    this.router.navigate(['editroute',routeId])
  }

 
  delete(routeId : number){
    this.routeService.deleteRoute(routeId)
    .subscribe(response => {
      console.log(response);
      console.log("#######deleted successfully ");
     
      this.refresh();
      this.viewAllroutes();
    
      
    
    },
    error => {
      
      console.log(error);
    });
  }
  refresh(){
    this.routeService.getAllRoutes().subscribe(
      (res:any[])=>{
        this.show=true
        
        console.log(res);
      }
    )
}
pageChanged(event: any) {​
  this.config.currentPage = event;
    }​
  

alertConfirmation(routeId : number){
  Swal.fire({
    title: 'Are you sure want to delete?',
    text: 'Your Action cannot be rollback.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, go ahead.',
    cancelButtonText: 'No, let me think again'
  }).then((result) => {
    if (result.value) {
      this.delete(routeId)
      Swal.fire(
        'Done!',
        'Action performed successfully.',
        'success'
      )
      this.refresh();
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelled',
        'Record not deleted.)',
        'error'
      )
    }
  })
}  

}
