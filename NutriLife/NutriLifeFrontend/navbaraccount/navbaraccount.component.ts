import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbaraccount',
  templateUrl: './navbaraccount.component.html',
  styleUrls: ['./navbaraccount.component.css']
})
export class NavbaraccountComponent implements OnInit {
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

    navigateLogout() {
      localStorage.clear()
      this.router.navigate(['/home']);
    }
}
