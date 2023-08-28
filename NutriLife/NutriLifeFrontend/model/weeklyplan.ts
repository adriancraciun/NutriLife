import { DailyPlan } from "./dailyplan";
import { User } from "./user";

export interface WeeklyPlan {
    id: number;
    name: string;
    mondayPlan: DailyPlan;
    tuesdayPlan: DailyPlan;
    wednesdayPlan: DailyPlan;
    thursdayPlan: DailyPlan;
    fridayPlan: DailyPlan;
    saturdayPlan: DailyPlan;
    sundayPlan: DailyPlan;
    totalCalories: string;
    hearts: string;
    user: User;
  }