import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
cusId:number
successMessage:string
password:string
  CustomerForm = new FormGroup({});
  constructor(public formBuilder:FormBuilder,public router: Router,public activatedRoute: ActivatedRoute, public customerService:CustomerService) { }

  customers:Observable<Customer[]>|any
  ngOnInit(): void {
    this.customers = new Customer();
    this.cusId=this.activatedRoute.snapshot.params['id'];
if(this.cusId !=-1){
  console.log("getRouteById called")
  this.customerService.getCustomerById(this.cusId)
  .subscribe(res =>{
    console.log(res);
    this.customers =res;
    this.customers=this.customers.data
 
    this.CustomerForm = this.formBuilder.group({
      name : [this.customers.name, [Validators.required,Validators.minLength(5)]],
      id:[this.customers.id, [Validators.required]],
      password : [this.customers.password,[Validators.required ]],
      confirm_password : [this.customers.password,[Validators.required]],
      email : [this.customers.email,[Validators.required,Validators.email]],
     
      mobileNumber : [this.customers.mobileNumber, Validators.required],
      
  })

  })}}
  add(){
    this.router.navigate(['view'])
   }
  addbus(){
    this.router.navigate(['viewbus'])
   }
   addcus(){
     
    this.router.navigate(['viewbook'])
   }
  edit(){
    
  console.log("updateroutes called")
    console.log(this.CustomerForm.value);
this.customerService.updateCustomer(this.CustomerForm.value)
.subscribe(res=>{
  console.log(res)
  console.log("update route called");
  this.successAlertNotification();
  console.log("#######Customer updated successfully ");
},
error => {
      
  console.log(error);
  
}
);

  }
  back(){

    
  }
    
successAlertNotification(){
  Swal.fire('Success', 'Customer Details Updated Successfully', 'success')
  this.router.navigate(['receptionist'])
}home(){
  
  this.router.navigate(['admin'])
}
  }


