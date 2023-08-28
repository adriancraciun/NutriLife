import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from '../model/user';

import { UserService } from '../controller/user.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { DailyPlan } from '../model/dailyplan';
import { DailyPlanService } from '../controller/dailyplan.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent, ConfirmationDialogData } from '../confirmation-dialog/confirmation-dialog.component';
import { AccountService } from '../controller/account.service';


@Component({
  selector: 'app-profile-regular-user',
  templateUrl: './profile-regular-user.component.html',
  styleUrls: ['./profile-regular-user.component.css']
})
export class ProfileRegularUserComponent implements OnInit {
  loggedUser: User | undefined;
  profileImageUrl: SafeUrl | undefined;
  bmi = 0
  bmiStatus: string = "";
  recommendedDiet1: DailyPlan | undefined
  recommendedDiet2: DailyPlan | undefined
  recommendedDiet3: DailyPlan | undefined
  constructor(public dialog: MatDialog, private router: Router, private toastr: ToastrService, private userService: UserService, private accountService: AccountService, private sanitizer: DomSanitizer, private dailyPlanService: DailyPlanService, private changeDetection: ChangeDetectorRef) { }

  ngOnInit(): void {
    const uId = Number(localStorage.getItem("loggedUserId"))
    this.userService.getUserById(uId).subscribe(user => {
      this.loggedUser = user
      if (this.loggedUser)
      {
        this.computeBMI()
        this.computeBMIStatus(this.bmi)
        this.computeRecommendedDiets()
      }

      this.userService.getImageData(uId).subscribe(
        (imageData: Blob) => {
          const objectUrl = URL.createObjectURL(imageData);
          this.profileImageUrl = this.sanitizer.bypassSecurityTrustUrl(objectUrl);
        },
        (error) => {
          console.log('Error retrieving user image:', error);
        }
      );
    })
  }

  computeBMI(){
    const top = Number(this.loggedUser?.weight)
    const bottom = ( Number(this.loggedUser?.height) * Number(this.loggedUser?.height) / 10000)
    this.bmi = parseFloat((top/bottom).toFixed(2))
  }

  computeBMIStatus(bmi: number){
    if (this.loggedUser?.gender === 'male') {
      if (bmi < 18.5) {
        this.bmiStatus = 'Underweight';
      } 
      else if (bmi >= 18.5 && bmi < 25) {
        this.bmiStatus = 'Normal weight';
      } 
      else if (bmi >= 25 && bmi < 30) {
        this.bmiStatus = 'Overweight';
      } 
      else {
        this.bmiStatus = 'Obese';
      }
    } 
    else if (this.loggedUser?.gender === 'female') {
      if (bmi < 17.5) {
        this.bmiStatus = 'Underweight';
      } 
      else if (bmi >= 17.5 && bmi < 24) {
        this.bmiStatus = 'Normal weight';
      } 
      else if (bmi >= 24 && bmi < 30) {
        this.bmiStatus = 'Overweight';
      } 
      else {
        this.bmiStatus = 'Obese';
      }
    }
    else {
      if (bmi < 18.5) {
        this.bmiStatus = 'Underweight';
      } 
      else if (bmi >= 18.5 && bmi < 25) {
        this.bmiStatus = 'Regular';
      } 
      else if (bmi >= 25 && bmi < 30) {
        this.bmiStatus = 'Overweight';
      } 
      else {
        this.bmiStatus = 'Obese';
      }
    }
  }

  shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  computeRecommendedDiets(){
    if (this.loggedUser)
      this.dailyPlanService.getDailyPlansFullyFiltered("any", this.loggedUser?.glutenFree, this.loggedUser?.lactoseIntolerant, this.loggedUser?.diabetes).subscribe(filteredDailyPlans => {
        var filteredTypePlans = filteredDailyPlans.filter(plan => plan.type === this.bmiStatus);
        if (filteredTypePlans.length >= 3)
        {
          filteredTypePlans = this.shuffleArray(filteredTypePlans)
          this.recommendedDiet1 = filteredTypePlans[0]
          this.recommendedDiet2 = filteredTypePlans[1]
          this.recommendedDiet3 = filteredTypePlans[2]
          this.changeDetection.detectChanges()
          return;
        }
        if (filteredTypePlans.length === 2)
        {
          filteredTypePlans = this.shuffleArray(filteredTypePlans)
          this.recommendedDiet1 = filteredTypePlans[0]
          this.recommendedDiet2 = filteredTypePlans[1]
          this.changeDetection.detectChanges()
          return;
        }
        if (filteredTypePlans.length === 1)
        {
          filteredTypePlans = this.shuffleArray(filteredTypePlans)
          this.recommendedDiet1 = filteredTypePlans[0]
          this.changeDetection.detectChanges()
          return;
        }
        if (filteredDailyPlans.length >= 3){
          filteredDailyPlans = this.shuffleArray(filteredDailyPlans)
          this.recommendedDiet1 = filteredTypePlans[0]
          this.recommendedDiet2 = filteredTypePlans[1]
          this.recommendedDiet3 = filteredTypePlans[2]
          this.changeDetection.detectChanges()
          return;
        }
        if (filteredDailyPlans.length === 2){
          filteredDailyPlans = this.shuffleArray(filteredDailyPlans)
          this.recommendedDiet1 = filteredTypePlans[0]
          this.recommendedDiet2 = filteredTypePlans[1]
          this.changeDetection.detectChanges()
          return;
        }
        if (filteredDailyPlans.length === 1){
          filteredDailyPlans = this.shuffleArray(filteredDailyPlans)
          this.recommendedDiet1 = filteredTypePlans[0];
          this.changeDetection.detectChanges()
          return;
        }
      })
  }

  navigateProgramPage(planId: number | undefined) {
    this.router.navigate([`planPage/${planId}`])
  }

  deleteProfileDialogue() {
    const dialogRef = this.dialog.open<ConfirmationDialogComponent, ConfirmationDialogData>(
      ConfirmationDialogComponent,
      {
        width: '400px',
        data: {
          title: 'Delete Confirmation',
          message: 'Are you sure that you want to delete your account?'
        }
      }
    );
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        if (this.loggedUser)
        this.dailyPlanService.deleteDailyPlansFromUser(this.loggedUser.id).subscribe(r0 => {
          if (this.loggedUser)
          this.userService.deleteUser(this.loggedUser.id).subscribe(r1 => {
            if (this.loggedUser?.account)
              this.accountService.deleteAccount(this.loggedUser?.account.id).subscribe(r2 => {
                localStorage.clear()
                this.router.navigate(['home'])
              })
          })
        })
        
      } else {
        return;
      }
    });
  }

  updateProfileForm() {
    this.router.navigate([`updateProfile`]);
  }
}
