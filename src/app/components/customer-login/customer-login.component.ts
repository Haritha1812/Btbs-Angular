import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Toast } from 'ngx-toastr';
import { Bus } from 'src/app/models/bus';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { ToasterService } from 'src/app/services/toaster.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.css']
})
export class CustomerLoginComponent implements OnInit {

 
customerLoginForm! : FormGroup;
ForgetForm:FormGroup
errorMessage?:String;
adminId?:number;
customer?:Customer
email:string
cusId?:number
forgetPass:boolean
login:boolean
constructor(public formBuilder:FormBuilder, public router:Router,public customerService:CustomerService,public toaster:ToasterService) { 
}

ngOnInit(): void {
  this.customerLoginForm = this.formBuilder.group({
    email : ['', Validators.required],
    password : ['', Validators.required]
  })
  this.ForgetForm = this.formBuilder.group({
    email : ['', Validators.required],
    
  })
  this.login=true
}
customerLogin(){
  
  console.log(this.customerLoginForm.value)
  this.email=this.customerLoginForm.value.email
  this.customerService.getCustomerByEmailAndPassword(this.customerLoginForm.get('email').value,this.customerLoginForm.get('password').value)
  .subscribe(res=>{
    if(res){
    console.log("Login Successfully!!");

    this.customerService.getCustomerByEmail(this.email)
    .subscribe(res=>{
      console.log(res);
        this.customer=res
        console.log(this.customer.id)
        this.cusId=this.customer.id;
        this.toaster.success("Success","Login Successful")
        this.router.navigate(['cusop',this.cusId])
    })
    }
   
  
 
else{
  this.toaster.error('Wrong!', 'Your Login details are not matched!');
}
    
}

  ,error=>{
   
    this.errorMessage = "You Entered Incorrect Credentials"
    console.log(error, "!!!!!!!!!!!!!!!")
  },
  )
  
}
back(){
this.login=true
this.forgetPass=false
}

sign_up()
{this.router.navigate(['addcus'])
  
}

forget(){
this.forgetPass=true;
this.login=false
}
forgetPassword(){
  this.login=false
  console.log(this.ForgetForm.value)
  var email = this.ForgetForm.value.email
  this.customerService.forgetPassword(email)
  .subscribe(
    res=>{

    }
  )
}
}
