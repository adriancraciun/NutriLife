import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-programs-page',
  templateUrl: './user-programs-page.component.html',
  styleUrls: ['./user-programs-page.component.css']
})
export class UserProgramsPageComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateAddNutrition() {
    this.router.navigate(["addProgram"]);
  }

}
