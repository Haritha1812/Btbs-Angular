import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import { ToasterService } from 'src/app/services/toaster.service';


declare var toastr: any
@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent implements OnInit {


  CustomerForm = new FormGroup({});
  constructor(public formBuilder: FormBuilder, public router: Router, public activatedRoute: ActivatedRoute, public customerService: CustomerService, public toaster: ToasterService) { }
  password: String = "";
  confirm_password: String = "";
  phnno: string
  cusemail: string
  errorMessage: boolean;
  errmessage: string
  errphnMessage: boolean
  successMessage: string;
  customers: Customer
  add: boolean
  show: boolean

  ngOnInit(): void {

    this.CustomerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5),]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobileNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],

    })


  }
  addcus() {
    this.add = true;
  }
  viewcus() {
    this.router.navigate(['viewcus']);
  }

  search() {
    this.router.navigate(['search'])
  }
  addCustomers() {
    this.customerService.addCustomer(this.CustomerForm.value)
      .subscribe(
        response => {
          console.log(response);

          this.toaster.success('Customer Added!!!');
          this.router.navigate(['home'])
          console.log("#######Customer added successfully ");
        },
        error => {
          console.log(error);
          this.toaster.error("Email already exists")
        });
  }
  back() {

    this.router.navigate(['home'])
  }
  login() {

    this.router.navigate(['home'])
  }
  passwordMatch(password: String, confirm_password: String) {
    if (password === confirm_password) {
      return false;
    }
    return true;


  }

}
