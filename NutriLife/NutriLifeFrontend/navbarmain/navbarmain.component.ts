import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbarmain',
  templateUrl: './navbarmain.component.html',
  styleUrls: ['./navbarmain.component.css']
})
export class NavbarmainComponent implements OnInit {
navigateContact() {
throw new Error('Method not implemented.');
}
navigateAboutUs() {
throw new Error('Method not implemented.');
}

  constructor(private router : Router) 
  {}

  ngOnInit(): void {
  }

  navigateHome(){
    this.router.navigate(['/home']);
  }

  navigateLogin(){
    this.router.navigate(['/login']);
  }

  navigateSignup(){
    this.router.navigate(['/signup']);
  }
}
