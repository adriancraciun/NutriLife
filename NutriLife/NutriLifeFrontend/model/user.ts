import { Account } from "./account";
import { DailyPlan } from "./dailyplan";

export interface User {
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    age: string;
    gender: string;
    weight: string;
    height: string;
    glutenFree: boolean;
    lactoseIntolerant: boolean;
    diabetes: boolean;
    insulinIntake: string;
    account: Account;
    favouriteDailyPlanIds: Number[]
    imageName: string | null;
    imageContentType: string | null;
    imageData: string | null;
  }