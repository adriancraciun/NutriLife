import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DailyPlan } from 'src/app/model/dailyplan'
import { DailyPlanService } from '../controller/dailyplan.service';
import { ToastrService } from 'ngx-toastr';
import { truncate } from 'fs';
import { Router } from '@angular/router';
import { type } from 'os';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-daily-nutrition-programs',
  templateUrl: './daily-nutrition-programs.component.html',
  styleUrls: ['./daily-nutrition-programs.component.css']
})
export class DailyNutritionProgramsComponent implements OnInit {
  allTypes: Array<string> = [];
  pageOfItems: Array<DailyPlan> = [];
  dailyPlans: Array<DailyPlan> | undefined;
  filter = { glutenFree: false, lactoseFree: false, diabetesFriendly: false};

  currentPage = 1;
  itemsPerPage = 12;

  constructor(private service: DailyPlanService, private toastr: ToastrService, private router : Router,  private changeDetection: ChangeDetectorRef, private sanitizer: DomSanitizer) { 
    this.service.getDailyPlans().subscribe(allDailyPlans => {
      for (let i = 0; i < allDailyPlans.length; i++) {
        if (!this.allTypes.includes(allDailyPlans[i].type))
          this.allTypes.push(allDailyPlans[i].type)
      }
      this.allTypes.sort((a,b) =>{
        a = a.toUpperCase();
        b = b.toUpperCase();
        return (a < b) ? -1 : (a > b) ? 1 : 0;
      })
    })
  }

  ngOnInit(): void {
    this.filterChange("");
  }
  
  filterChange(name: string): void {
    if (name == "")
      name = "any"
    this.service.getDailyPlansFullyFiltered(name, this.filter.glutenFree, this.filter.lactoseFree, this.filter.diabetesFriendly).subscribe(dailyPlans => {
      this.dailyPlans = dailyPlans
      this.changeDetection.detectChanges()
    })
  }

  filterTypeChange(name: string, type: string): void {
    if (name == "")
      name = "any"
    this.service.getDailyPlansFullyFilteredByType(name, this.filter.glutenFree, this.filter.lactoseFree, this.filter.diabetesFriendly, type).subscribe(dailyPlans => {
      this.dailyPlans = dailyPlans
      this.changeDetection.detectChanges()
    })
  }

  getDailyPlanImage(dailyPlanId: number){
    return this.service.getImageData(dailyPlanId)
  }

  // Function to change the current page
  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

   // Function to get the paginated slice of data for the current page
  getPaginatedDailyPlans(){
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    if (this.dailyPlans)
      return this.dailyPlans.slice(startIndex, endIndex);
    return null;
  }

  getPaginationArray(): number[] {
    var pageCount = 0
    if (this.dailyPlans)
      pageCount = Math.ceil(this.dailyPlans.length / this.itemsPerPage);
    return Array(pageCount).fill(0).map((_, index) => index + 1);
  }

  navigateProgramPage(planId: number) {
    this.router.navigate([`planPage/${planId}`])
  }
}
