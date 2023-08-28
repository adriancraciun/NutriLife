import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/controller/account.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {Account} from 'src/app/model/account'
import { User } from '../model/user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signUpForm!: FormGroup
  constructor(private accountService: AccountService, private formBuilder : FormBuilder, private http : HttpClient, private router : Router, private toastr: ToastrService) {}

  ngOnInit(): void {
      this.signUpForm = this.formBuilder.group({
          username:[''],
          password:[''],
          email:[''],
          repeat_password:['']
      });
  }

  signup(){
    if(this.signUpForm.value.username.length < 5){
      this.signUpForm = this.formBuilder.group({
        username:[''],
        password:[''],
        email:[''],
        repeat_password:['']
      });
      this.toastr.error('Your username is way too short. It should have at least 6 characters.', 'Sign up error!');
      return
    }
    if(this.signUpForm.value.username.length > 31){
      this.signUpForm = this.formBuilder.group({
        username:[''],
        password:[''],
        email:[''],
        repeat_password:['']
      });
      this.toastr.error('Your username is way too long. It should have at most 30 characters.', 'Sign up error!');
      return
    }
    if(this.signUpForm.value.password.length < 7){
      this.toastr.error('Your password is way too short. It should have at least 7 characters.', 'Sign up error!');
      return
    }
    if(this.signUpForm.value.password.length > 100){
      this.signUpForm = this.formBuilder.group({
        username:[''],
        password:[''],
        email:[''], 
        repeat_password:['']
      });
      this.toastr.error('Your password is way too long. It should be at most 100 characters.', 'Sign up error!');
      return
    }

      this.accountService.getAccounts().
      subscribe(res=>{
          const emailAccount = res.find((a:any)=>{
              return a.email === this.signUpForm.value.email
          });
          const usernameAccount = res.find((a:any)=>{
            return a.username === this.signUpForm.value.username
          });
          if(emailAccount){
            this.signUpForm = this.formBuilder.group({
              username:[''],
              password:[''],
              email:[''], 
              repeat_password:['']
            });
              this.toastr.error('You already have an account with that email! Try logging in or press Forgot Password', 'Sign up error!');
          }
          else if (usernameAccount){
            this.signUpForm = this.formBuilder.group({
              username:[''],
              password:[''],
              email:[''], 
              repeat_password:['']
            });
              this.toastr.error('Sorry! There is already an account with that username! Please try another one.', 'Sign up error!');
          }
          else{
            let newAccount : Account = {
              id: Number(1), 
              username: this.signUpForm.value.username, password: this.signUpForm.value.password,
              email: this.signUpForm.value.email, type: 'regular'
            };
            this.accountService.addAccount(newAccount).subscribe();
            this.toastr.success('Successfully signed up!', 'Sign Up Success!')
            
            this.accountService.findAccountByUsernameAndPassword(newAccount).subscribe(res => localStorage.setItem("loggedAccountId", res.id.toString()))
            this.router.navigate(['home']);
          }
      },err=>{
          this.toastr.error('Error!', 'User not found!');
      })
  }
}
