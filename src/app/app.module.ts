import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddBusComponent } from './components/add-bus/add-bus.component';
import { AddRouteComponent } from './components/add-route/add-route.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ViewRouteComponent } from './components/view-route/view-route.component';
import { EditRouteComponent } from './components/edit-route/edit-route.component';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox'
import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule
} from '@angular-material-components/datetime-picker';
import { ViewBusComponent } from './components/view-bus/view-bus.component';
import { SearchBusComponent } from './components/search-bus/search-bus.component';
import { ViewCustomerComponent } from './components/view-customer/view-customer.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CustomerLoginComponent } from './components/customer-login/customer-login.component';
import { EditBusComponent } from './components/edit-bus/edit-bus.component';
import { CustomerOperationsComponent } from './components/customer-operations/customer-operations.component';
import { ViewBookingComponent } from './components/view-booking/view-booking.component';
import { ViewbookingsCustomerComponent } from './components/viewbookings-customer/viewbookings-customer.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { CustomerNavbarComponent } from './components/customer-navbar/customer-navbar.component';
import { ToasterService } from './services/toaster.service';

@NgModule({
  declarations: [
    AppComponent,
    AddBusComponent,
    AddRouteComponent,
    HomeComponent,
    ViewRouteComponent,
    EditRouteComponent,
    AddCustomerComponent,
    EditCustomerComponent,
    ViewBusComponent,
    SearchBusComponent,
    ViewCustomerComponent,
    CustomerLoginComponent,
    EditBusComponent,
    CustomerOperationsComponent,
    ViewBookingComponent,
    ViewbookingsCustomerComponent,
    AdminDashboardComponent,
    AdminNavbarComponent,
    CustomerNavbarComponent
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,ReactiveFormsModule,HttpClientModule,MatDatepickerModule,MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule ,BrowserAnimationsModule,NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,MatCheckboxModule,Ng2SearchPipeModule,FormsModule,NgxPaginationModule,ToastrModule.forRoot({
      timeOut: 3500,
      positionClass: 'toast-bottom-center',
      preventDuplicates: true,
    })
  ],
  providers: [ToasterService],
  bootstrap: [AppComponent],
})
export class AppModule { }
