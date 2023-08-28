import { User } from "./user";

export interface DailyPlan {
    id: number;
    name: string;
    breakfast: string;
    lunch: string;
    dinner: string;
    snack: string;
    calories: string;
    type: string;
    glutenFree: boolean;
    lactoseIntolerant: boolean;
    diabetesFriendly: boolean;
    hearts: number;
    user: User;
    imageName: string | null;
    imageContentType: string | null;
    imageData: string | null;
    comments: string;
  }