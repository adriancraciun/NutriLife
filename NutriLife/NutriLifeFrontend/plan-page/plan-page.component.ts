import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DailyPlan } from '../model/dailyplan';
import { DailyPlanService } from '../controller/dailyplan.service';
import { UserService } from '../controller/user.service';
import { User } from '../model/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-plan-page',
  templateUrl: './plan-page.component.html',
  styleUrls: ['./plan-page.component.css']
})
export class PlanPageComponent implements OnInit {
  // loggedUser: User | undefined;
  plan: DailyPlan | undefined;
  // isHearted: boolean | undefined;

  constructor(private toastr: ToastrService, private route: ActivatedRoute, private dailyPlanService: DailyPlanService, private userService: UserService) { }

  ngOnInit() {
    const pId = this.route.snapshot.paramMap.get('planId') 
    // const uId = Number(localStorage.getItem("loggedUserId"))
    if (pId)
      {
        this.dailyPlanService.getDailyPlansById(pId).subscribe(res =>{
          this.plan = res

          // this.userService.getUserById(uId).subscribe(user => {
          //   this.loggedUser = user
          //   for (let i = 0; i < user.favouriteDailyPlans.length; ++i)
          //   {
          //     if (user.favouriteDailyPlans[i] === res)
          //       {
          //         this.isHearted = true
          //         return;
          //       }
          //   }
          //   this.isHearted = false
          // })
        })
      }
  }

  getDailyPlanImage(dailyPlanId: number | undefined){
    if (dailyPlanId)
      return this.dailyPlanService.getImageData(dailyPlanId)
    return;
  }

  // addHeart() {
  //   this.isHearted = true
  //   if (this.plan)
  //     {
  //       this.plan.hearts += 1
  //       this.dailyPlanService.updateDailyPlan(this.plan).subscribe()

  //       if (this.loggedUser)
  //       {
  //         this.loggedUser.favouriteDailyPlans.push(this.plan)
  //         this.userService.updateUser(this.loggedUser).subscribe()
  //       }
  //     }
  // }

  // removeHeart() {
  //   this.isHearted = false
  //   if (this.plan)
  //   {
  //     this.plan.hearts -= 1
  //     this.dailyPlanService.updateDailyPlan(this.plan).subscribe()

  //     if (this.loggedUser)
  //     {
  //       this.loggedUser.favouriteDailyPlans.push(this.plan)
  //       this.userService.updateUser(this.loggedUser).subscribe()
  //     }
  //   }
  // }

  toggleHeartNoAccount() {
    this.toastr.error("You need an account to do that!")
  }
}
