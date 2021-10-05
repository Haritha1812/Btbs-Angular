import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  admin:boolean
  front:boolean
  adminlogin:boolean
  adminForm:FormGroup
  

 
customerLoginForm! : FormGroup;
ForgetForm:FormGroup
errorMessage?:String;
adminId?:number;
customers:Observable<Customer[]>|any
email:string
cusId?:number
forgetPass:boolean
login:boolean
password:string
constructor(public formBuilder:FormBuilder, public router:Router,public customerService:CustomerService) { 
}

ngOnInit(): void {
  this.login=true
  this.customerLoginForm = this.formBuilder.group({
    email : ['', Validators.required],
    password : ['', Validators.required]
  })
  this.ForgetForm = this.formBuilder.group({
    email : ['', Validators.required],
    
  })
 console.log("hhhhhhhhhhhhhhhhhh")
}
customerLogin(){
  
  console.log(this.customerLoginForm.value)
  this.email=this.customerLoginForm.value.email
  this.password=this.customerLoginForm.value.password
  this.customerService.getCustomerByEmailAndPassword(this.customerLoginForm.get('email').value,this.customerLoginForm.get('password').value)
  .subscribe(res=>{
    this.customers=res
    this.customers=this.customers.data
    if(this.email== "Admin" && this.password =="Admin@123")
    {
      //this.successMessage = "Login Successful";
      console.log("Login Successful");
      this.router.navigate(['admin'])
    }
    else if(this.customers){
    console.log("Login Successfully!!");

    this.customerService.getCustomerByEmail(this.email)
    .subscribe(res=>{
      console.log(res);
        this.customers=res
        this.customers=this.customers.data
        console.log(this.customers.id)
        this.cusId=this.customers.id;
       
        this.successAlertNotification(this.cusId);
        
    })
    }
    
 
else{
  this.wrongLogin();
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
      this.customers=res
      this.customers=this.customers.data
      if(this.customers!=null){
        this.sucess();
      }
      else{
        this.wrong()
      }

    }
  )
 
}
wrongLogin(){
  Swal.fire('Wrong!', 'Your Login details are not matched!', 'error')
}
wrong(){
  Swal.fire('Wrong!', 'Your have no account registered with this email', 'error')
  
}
successAlertNotification(cusId:number){
  Swal.fire('Success', 'Login successfull', 'success')
  console.log(this.cusId)
  this.router.navigate(['cusop',cusId])
}
sucess(){
  Swal.fire('Done', 'Password has been sent to your mail', 'success')
  this.login=true
  this.forgetPass=false
}

   search(){
    this.router.navigate(['search'])
   }
  
   home(){
    console.log("home component called")
   this.adminlogin=true;
   this.front=false;
   this.admin=false;
  }
  customer(){
    this.router.navigate(['login'])
  }
  
  WrongLoginNotification(){
    Swal.fire('WRONG', 'Check UserName and Password', 'error')
    this.adminlogin=true
  }

}
