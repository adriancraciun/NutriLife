import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarmainComponent } from './navbarmain/navbarmain.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AccountService } from './controller/account.service';

import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DailyNutritionProgramsComponent } from './daily-nutrition-programs/daily-nutrition-programs.component';

import { MatSelectModule} from '@angular/material/select'; 
import { MatFormFieldModule } from '@angular/material/form-field'; 

import { MatToolbarModule} from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { AddformComponent } from './addform/addform.component';

import { NgxDropzoneModule } from 'ngx-dropzone';
import { UserHomeComponent } from './user-home/user-home.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { NavbaruserComponent } from './navbaruser/navbaruser.component';
import { UserProgramsComponent } from './user-programs/user-programs.component';
import { UserProgramsPageComponent } from './user-programs-page/user-programs-page.component';
import { DailyNutritionProgramsUserComponent } from './daily-nutrition-programs-user/daily-nutrition-programs-user.component';
import { NavbaraccountComponent } from './navbaraccount/navbaraccount.component';
import { PlanPageComponent } from './plan-page/plan-page.component';
import { PlanPageUserComponent } from './plan-page-user/plan-page-user.component';
import { ProfileRegularUserComponent } from './profile-regular-user/profile-regular-user.component';
import { UserFavouriteProgramsComponent } from './user-favourite-programs/user-favourite-programs.component';
import { UserFavouriteProgramsPageComponent } from './user-favourite-programs-page/user-favourite-programs-page.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { UpdateformComponent } from './updateform/updateform.component';
import { UpdateUserComponent } from './update-user/update-user.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarmainComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    DailyNutritionProgramsComponent,
    AddformComponent,
    UserHomeComponent,
    CreateUserComponent,
    NavbaruserComponent,
    UserProgramsComponent,
    UserProgramsPageComponent,
    DailyNutritionProgramsUserComponent,
    NavbaraccountComponent,
    PlanPageComponent,
    PlanPageUserComponent,
    ProfileRegularUserComponent,
    UserFavouriteProgramsComponent,
    UserFavouriteProgramsPageComponent,
    UpdateformComponent,
    UpdateUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ positionClass: 'toast-top-right' }),
    MatSelectModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatInputModule,
    NgxDropzoneModule,
    MatDialogModule
  ],
  providers: [AccountService],
  bootstrap: [AppComponent]
})
export class AppModule { }
