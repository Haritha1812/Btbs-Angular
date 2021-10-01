import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Bus } from 'src/app/models/bus';
import { BusService } from 'src/app/services/bus.service';
import { RouteService } from 'src/app/services/route.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-bus',
  templateUrl: './view-bus.component.html',
  styleUrls: ['./view-bus.component.css']
})
export class ViewBusComponent implements OnInit {

  constructor(public router: Router,public activatedRoute: ActivatedRoute, public busService:BusService) { }
term:any
  buses:Observable<Bus[]>|any
  ngOnInit(): void {
    this.viewAllbuses();
  }
  edit(busId:number){
    this.router.navigate(['editbus',busId])
  }
  add(){
    this.router.navigate(['view'])
   }
  addbuse(){
    this.router.navigate(['viewbus'])
   }
   addcus(){
     
    this.router.navigate(['viewbook'])
   }


  viewAllbuses(){
    this.busService.getAllBuses()
    .subscribe(
      res=>{
        console.log(res);
        this.buses=res;
      
      }
   
    )
  }
  back(){
    
    this.router.navigate(['admin'])
    }

   
    
  delete(busId : number){
    this.busService.deletebus(busId)
    .subscribe(response => {
      console.log(response);
      console.log("#######deleted successfully ");
     
      this.viewAllbuses();
    
      
    
    },
    error => {
      this.refresh();
      this.viewAllbuses();
     
      console.log(error);
    });
  }
  refresh(){
    this.busService.getAllBuses().subscribe(
      (res:any[])=>{
       
        
        console.log(res);
      }
    )
}
alertConfirmation(busid : number){
  Swal.fire({
    title: 'Are you sure want to delete?',
    text: 'Your Action cannot be rollback.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, go ahead.',
    cancelButtonText: 'No, let me think again'
  }).then((result) => {
    if (result.value) {
      this.delete(busid)
      Swal.fire(
        'Done!',
        'Bus details deleted successfully.',
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
addbus(){
  this.router.navigate(['addbus'])
}
}
