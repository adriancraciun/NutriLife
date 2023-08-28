import { User } from "./user";

export interface Account {
    id: number;
    username: string;
    password: string;
    email: string;
    type: string;
  }