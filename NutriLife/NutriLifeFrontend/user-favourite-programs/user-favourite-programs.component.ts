import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DailyPlan } from '../model/dailyplan';
import { DailyPlanService } from '../controller/dailyplan.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-favourite-programs',
  templateUrl: './user-favourite-programs.component.html',
  styleUrls: ['./user-favourite-programs.component.css']
})
export class UserFavouriteProgramsComponent implements OnInit {
  loggedUserId: Number = 0;
  allTypes: Array<string> = [];
  pageOfItems: Array<DailyPlan> = [];
  dailyPlans: Array<DailyPlan> | undefined;
  filter = { glutenFree: false, lactoseFree: false, diabetesFriendly: false};
  currentPage = 1;
  itemsPerPage = 12;

  constructor(private service: DailyPlanService, private toastr: ToastrService, private router : Router,  private changeDetection: ChangeDetectorRef) { 
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
    var luID = localStorage.getItem("loggedUserId")
    if (luID!= null){
      this.loggedUserId = parseInt(luID);
      this.filterChange("");
    }
  }

  filterChange(name: string): void {
    if (name == "")
      name = "any"
    this.service.getDailyPlansFavouriteByUserFullyFiltered(this.loggedUserId, name, this.filter.glutenFree, this.filter.lactoseFree, this.filter.diabetesFriendly).subscribe(dailyPlans => {
      this.dailyPlans = dailyPlans
      this.changeDetection.detectChanges()
    })
  }

  filterTypeChange(name: string, type: string): void {
    if (name == "")
      name = "any"
    this.service.getDailyPlansFavouriteByUserFullyFilteredByType(this.loggedUserId, name, this.filter.glutenFree, this.filter.lactoseFree, this.filter.diabetesFriendly, type).subscribe(dailyPlans => {
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

  navigateProgramPageUser(planId: number) {
    this.router.navigate([`planPageUser/${planId}`])
  }
}
