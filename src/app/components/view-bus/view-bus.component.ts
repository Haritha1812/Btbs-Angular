import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BookTicket } from 'src/app/models/book-ticket';
import { Bus } from 'src/app/models/bus';
import { BookTicketService } from 'src/app/services/book-ticket.service';
import { BusService } from 'src/app/services/bus.service';
import { ToasterService } from 'src/app/services/toaster.service';
import Swal from 'sweetalert2';
import { EditBusComponent } from '../edit-bus/edit-bus.component';
import { EditallBusComponent } from '../editall-bus/editall-bus.component';

@Component({
  selector: 'app-view-bus',
  templateUrl: './view-bus.component.html',
  styleUrls: ['./view-bus.component.css']
})
export class ViewBusComponent implements OnInit {


  constructor(public router: Router, public bookService: BookTicketService, public dialog: MatDialog, public activatedRoute: ActivatedRoute, public busService: BusService, public toaster: ToasterService) { }
  search: any
  config: any

  buses: Bus[]
  busId: number
  bookTicket: BookTicket[]
  ngOnInit(): void {
    this.viewAllbuses();

  }
  edit(bus: Bus) {

    this.busId = bus.id
    console.log(this.busId)
    this.bookService.getBybusId(bus.id).subscribe(
      res => {
        console.log(res)
        this.bookTicket = res.data
        if (this.bookTicket.length != 0) {
          this.toaster.info("This bus has customer bookings.Could edit only timings");

          localStorage.setItem('bus', JSON.stringify(bus))
          const dialogConfig = new MatDialogConfig();

          dialogConfig.disableClose = false;

          dialogConfig.autoFocus = true;

          this.dialog.open(EditBusComponent, {

          });
        }
      }
      , error => {
        console.log(this.busId)
        /*  const dialogConfig = new MatDialogConfig();
      
          dialogConfig.disableClose = false;
      
          dialogConfig.autoFocus = true;
      
          this.dialog.open(EditallBusComponent, {
      
          }); */
        this.router.navigate(['editall', this.busId])
      }

    )

    //this.router.navigate(['editbus', busId])
  }



  viewAllbuses() {
    this.busService.getAllBuses()
      .subscribe(
        res => {
          console.log(res);
          this.buses = res.data;
          //this.buses=this.buses.data
          this.config = {
            itemsPerPage: 3,
            currentPage: 1,
            //    totalItems:this.buses.count
          };
        }

      )
  }
  back() {

    this.router.navigate(['admin'])
  }



  delete(busId: number) {
    this.busService.deletebus(busId)
      .subscribe(response => {
        console.log(response);
        console.log("#######deleted successfully ");
        this.toaster.success("Bus has been deleted", "Success")
        this.viewAllbuses();



      },
        error => {
          this.toaster.error("This bus has customer bookings.Couldn't perform operation");
          this.refresh();
          this.viewAllbuses();

          console.log(error);
        });
  }
  refresh() {
    this.busService.getAllBuses().subscribe(
      (res: any[]) => {


        console.log(res);
      }
    )
  }
  alertConfirmation(busid: number) {
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
  addbus() {
    this.router.navigate(['addbus'])
  }
  pageChanged(event: any) {
    this.config.currentPage = event;
  }

}
