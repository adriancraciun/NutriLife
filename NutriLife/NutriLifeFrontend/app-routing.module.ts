import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AddformComponent } from './addform/addform.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserProgramsComponent } from './user-programs/user-programs.component';
import { UserProgramsPageComponent } from './user-programs-page/user-programs-page.component';
import { PlanPageComponent } from './plan-page/plan-page.component';
import { PlanPageUserComponent } from './plan-page-user/plan-page-user.component';
import { ProfileRegularUserComponent } from './profile-regular-user/profile-regular-user.component';
import { UserFavouriteProgramsPageComponent } from './user-favourite-programs-page/user-favourite-programs-page.component';
import { UpdateformComponent } from './updateform/updateform.component';
import { UpdateUserComponent } from './update-user/update-user.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'addProgram', component: AddformComponent},
  {path: 'updateProgram/:planId', component: UpdateformComponent},
  {path: 'userHome', component: UserHomeComponent},
  {path: 'createUser', component: CreateUserComponent},
  {path: 'userPrograms', component: UserProgramsPageComponent},
  {path: 'userFavouritePrograms', component: UserFavouriteProgramsPageComponent},
  {path: 'planPage/:planId', component: PlanPageComponent},
  {path: 'planPageUser/:planId', component: PlanPageUserComponent},
  {path: 'profileRegularUser', component: ProfileRegularUserComponent},
  {path: 'updateProfile', component: UpdateUserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}