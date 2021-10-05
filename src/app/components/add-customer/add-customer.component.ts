import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {


  CustomerForm = new FormGroup({});
  constructor(public formBuilder:FormBuilder,public router: Router,public activatedRoute: ActivatedRoute,public customerService:CustomerService) { }
  password :String = "";
  confirm_password :String = "";
  phnno:string
  cusemail:string
  errorMessage?: boolean;
  errmessage:string
  errphnMessage?:boolean
  successMessage?: string;
  customers:Observable<Customer[]>|any
  add:boolean
  show:boolean
  ngOnInit(): void {

    this.CustomerForm = this.formBuilder.group({
      name : ['', [Validators.required,Validators.minLength(5)]],
     
      password : ['',[Validators.required ]],
      confirm_password : ['',[Validators.required]],
      email : ['',[Validators.required,Validators.email]],
     
      mobileNumber : ['', Validators.required],
      
  })


  }
  addcus(){
    this.add =true;
   }
   viewcus(){
     this.router.navigate(['viewcus']);
   }
  check(){
    this.customers = this.CustomerForm.value;
    console.log("####" +this.customers)
   this.cusemail=this.customers.email
    
    this.customerService.getCustomerByEmail(this.cusemail)
    .subscribe(
      response => {
        console.log(response);
        this.customers = response;
      this.customers=this.customers.data
        if(this.customers == null){
          console.log("Check phn no claled..........")
          this.checkPhnNumber();
          this.errorMessage=false;
        }
        else{
          
          this.errorMessage=true;
        }
   
      },
      error => {
          
        console.log();
        this.successMessage = "Customer Added successfully";
        console.log("#######Customer added successfully ");
      });
     
  }
  checkPhnNumber(){
    console.log("Check phn no claled..........")
    this.customers = this.CustomerForm.value;
    console.log("####" +this.customers)
    this.phnno= this.customers.mobileNumber;
    console.log("####" +this.phnno)
    this.customerService.getCustomerByPhoneNumber(this.phnno)
    .subscribe(
      response => {
        console.log(response);
        this.customers = response;
        this.customers=this.customers.data
        if(this.customers == null){
          console.log("Check phn no claled..........")
          this.errphnMessage=false;
          this.addCustomers();
        }
        else{
          
          this.errphnMessage =true
        }
      });
  }
  search(){
    this.router.navigate(['search'])
   }
   addCustomers(){
    this.customerService.addCustomer(this.CustomerForm.value)
        .subscribe(
          response => {
            console.log(response);
            
            this.successAlertNotification();
            this.successMessage = "Customer Added successfully";
            console.log("#######Customer added successfully ");
          },
          error => {
            console.log(error);
          });
  }
  back(){
    
    this.router.navigate(['home'])
    }
    login(){
    
      this.router.navigate(['home'])
      }
passwordMatch(password:String, confirm_password:String) {
  if(password===confirm_password){
    return false;
  }
  return true;


}
successAlertNotification(){
  Swal.fire('Success', 'SignUp successfull', 'success')
  this.router.navigate(['home'])
}
}
