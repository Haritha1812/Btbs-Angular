import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {


  constructor(public formBuilder:FormBuilder,public router: Router,public activatedRoute: ActivatedRoute, ) { }

 

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
   logout(){
     
    this.router.navigate(['home'])
   }
}
