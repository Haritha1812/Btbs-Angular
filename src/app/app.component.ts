import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // title = 'bus-ticket-booking';
  constructor(public router: Router) { }
  ngOnInit(): void {
  }
   
home(){
  console.log("home component called")
  this.router.navigate(['home'])
}
customer(){
  this.router.navigate(['login'])
}
}