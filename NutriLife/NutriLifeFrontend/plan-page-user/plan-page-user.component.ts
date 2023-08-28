import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DailyPlan } from '../model/dailyplan';
import { DailyPlanService } from '../controller/dailyplan.service';
import { UserService } from '../controller/user.service';
import { User } from '../model/user';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent, ConfirmationDialogData } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-plan-page-user',
  templateUrl: './plan-page-user.component.html',
  styleUrls: ['./plan-page-user.component.css']
})
export class PlanPageUserComponent implements OnInit {
  loggedUser: User | undefined;
  plan: DailyPlan | undefined;
  isHearted: boolean | undefined;
  flagUsersProgram: boolean | undefined;
  constructor(public dialog: MatDialog, private toastr: ToastrService, private route: ActivatedRoute, private dailyPlanService: DailyPlanService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    const pId = this.route.snapshot.paramMap.get('planId') 
    const uId = Number(localStorage.getItem("loggedUserId"))
    if (pId)
      {
        this.dailyPlanService.getDailyPlansById(pId).subscribe(res =>{
          this.plan = res
          this.userService.getUserById(uId).subscribe(user => {
            this.loggedUser = user
            if (this.loggedUser.id === res.user.id)
              {
                this.flagUsersProgram = true
              }
            else
              {
                this.flagUsersProgram = false
              }

            for (let i = 0; i < user.favouriteDailyPlanIds.length; ++i)
            {
              if (user.favouriteDailyPlanIds[i] === Number(pId))
                {
                  this.isHearted = true
                  return;
                }
            }
            this.isHearted = false
          })
        })
      }
  }

  getDailyPlanImage(dailyPlanId: number | undefined){
    if (dailyPlanId)
      return this.dailyPlanService.getImageData(dailyPlanId)
    return;
  }

  addHeart() {
    if (this.plan)
      {
        this.plan.hearts = +this.plan.hearts;
        this.plan.hearts += 1
        this.dailyPlanService.updateDailyPlan(this.plan).subscribe()

        if (this.loggedUser)
        {
          this.loggedUser.favouriteDailyPlanIds.push(this.plan.id)
          this.userService.updateUser(this.loggedUser).subscribe()
        }
      }
  }

  removeHeart() {
    if (this.plan)
    {
      this.plan.hearts = +this.plan.hearts;
      this.plan.hearts -= 1
      this.dailyPlanService.updateDailyPlan(this.plan).subscribe()

      if (this.loggedUser)
      {
        this.loggedUser.favouriteDailyPlanIds = this.loggedUser.favouriteDailyPlanIds.filter(item => item !== this.plan?.id);
        this.userService.updateUser(this.loggedUser).subscribe()
      }
    }
  }

  toggleHeart() {
    if (this.isHearted) {
      this.removeHeart();
    } else {
      this.addHeart();
    }
    this.isHearted = !this.isHearted;
  }

  deleteDialogue() {
    const dialogRef = this.dialog.open<ConfirmationDialogComponent, ConfirmationDialogData>(
      ConfirmationDialogComponent,
      {
        width: '400px',
        data: {
          title: 'Delete Confirmation',
          message: 'Are you sure that you want to delete this program?'
        }
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        if (this.plan)
          this.dailyPlanService.deleteDailyPlan(this.plan?.id).subscribe(res => {
            this.router.navigate(['userHome'])
          })
      } else {
        return;
      }
    });
  }

  updateForm() {
    this.router.navigate([`updateProgram/${this.plan?.id}`]);
  }
}
