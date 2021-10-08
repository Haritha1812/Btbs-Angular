import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {
  search: any
  CustomerForm = new FormGroup({});
  show: boolean
  successMessage: string
  customers: Customer[]
  constructor(public formBuilder: FormBuilder, public router: Router, public activatedRoute: ActivatedRoute, public customerService: CustomerService) { }

  ngOnInit(): void {


    this.CustomerForm = this.formBuilder.group({

      id: ['', [Validators.required]],
    })
    this.viewCustomers();
  }
  viewCustomers() {

    this.customerService.getAllCustomers().subscribe(
      res => {
        this.show = true

        console.log(res);
        this.customers = res.data

      }
    )
  }
  home() {

    this.router.navigate(['admin'])
  }
  edit(id: number) {
    this.router.navigate(['editcus', id])
  }
  delete(id: number) {
    this.customerService.deleteCustomerId(id).subscribe(response => {
      console.log(response);
      console.log("#######deleted successfully ");

      this.viewCustomers();



    },
      error => {


        console.log(error);
      });
  }
  refresh() {
    this.customerService.getAllCustomers().subscribe(
      (res: any[]) => {
        this.show = true
        this.customers = res

        console.log(res);
      }
    )
  }
  alertConfirmation(receptionistId: number) {
    Swal.fire({
      title: 'Are you sure want to delete?',
      text: 'Your Action cannot be rollback.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, go ahead.',
      cancelButtonText: 'No, let me think again'
    }).then((result) => {
      if (result.value) {
        this.delete(receptionistId)
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
  back() {

    this.router.navigate(['admin'])
  }

}
