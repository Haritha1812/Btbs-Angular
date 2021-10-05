import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {
  constructor(public router: Router,public activatedRoute: ActivatedRoute,) { }


  ngOnInit(): void {
  }
  add(){
    this.router.navigate(['view'])
   }
  addbus(){
    this.router.navigate(['viewbus'])
   }
   addcus(){
     
    this.router.navigate(['viewbook'])
   }
   home(){
    
    this.router.navigate(['admin'])
  }
  cus(){
    
    this.router.navigate(['viewcus'])
  }
}
