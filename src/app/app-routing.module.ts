import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBusComponent } from './components/add-bus/add-bus.component';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { AddRouteComponent } from './components/add-route/add-route.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { CustomerLoginComponent } from './components/customer-login/customer-login.component';
import { CustomerOperationsComponent } from './components/customer-operations/customer-operations.component';
import { EditBusComponent } from './components/edit-bus/edit-bus.component';
import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';
import { EditRouteComponent } from './components/edit-route/edit-route.component';
import { HomeComponent } from './components/home/home.component';
import { SearchBusComponent } from './components/search-bus/search-bus.component';
import { ViewBookingComponent } from './components/view-booking/view-booking.component';
import { ViewBusComponent } from './components/view-bus/view-bus.component';
import { ViewCustomerComponent } from './components/view-customer/view-customer.component';
import { ViewRouteComponent } from './components/view-route/view-route.component';
import { ViewbookingsCustomerComponent } from './components/viewbookings-customer/viewbookings-customer.component';

const routes: Routes = [
  
  {path: 'home', component:HomeComponent},
  {path:'routeadd', component:AddRouteComponent },
  {path:'view', component:ViewRouteComponent },
  {path:'editroute/:routeId' , component:EditRouteComponent },
  
  {path:'editbus/:busId' , component:EditBusComponent },
  {path:'viewbus' , component:ViewBusComponent },
  {path:'addbus' , component:AddBusComponent },
  {path:'search/:cusId' , component:SearchBusComponent },
  {path:'addcus' , component:AddCustomerComponent },
  {path:'editcus/:id' , component:EditCustomerComponent },
  {path:'viewcus' , component:ViewCustomerComponent },
  {path:'login' , component:CustomerLoginComponent },
  {path:'cusop/:cusId' , component:CustomerOperationsComponent },
  {path:'viewbook' , component:ViewBookingComponent },
  {path:'viewcusbook/:cusId' , component:ViewbookingsCustomerComponent },
  
  {path:'admin' , component:AdminDashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
