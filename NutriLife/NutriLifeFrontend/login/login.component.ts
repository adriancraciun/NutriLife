import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/controller/account.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Account } from '../model/account';
import { UserService } from '../controller/user.service';
import { User } from '../model/user';

@Component({ 
    selector: 'app-root',
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
    public logInForm!: FormGroup
    constructor(private accountService: AccountService, private userService: UserService, private formBuilder : FormBuilder, private http : HttpClient, private router : Router, private toastr: ToastrService) {}

    ngOnInit(): void {
        this.logInForm = this.formBuilder.group({
            username:[''],
            password:['']
        });
    }

    login(){
        let account : Account = {
            id: Number(1), username: this.logInForm.value.username, password: this.logInForm.value.password,
            email: '', type: 'regular'
        };
        this.accountService.findAccountByUsernameAndPassword(account).
        subscribe(res=>{
            const account = res
            if(account){
                localStorage.setItem("loggedAccountId", account.id.toString());
                var user : User | undefined

                this.userService.getUsers().subscribe(res => {
                    user = res.find((u) => u.account.id === account.id);
                    if (user == null)
                    {
                        this.toastr.success('You logged in into your account!', 'Success!');
                        this.router.navigate(['createUser']);
                    }
                else{
                    localStorage.setItem("loggedUserId", user.id.toString());
                    if(account.type === "regular")
                        {
                            this.toastr.success('Success! ', 'Welcome back!');
                            this.router.navigate(['userHome']);
                        }
                    else if(account.type === "nutritionist")
                        {
                            this.toastr.success('Success! ', 'Welcome back!');
                            this.router.navigate(['nutritionistHomePage']);
                        }
                    else if(account.type === "admin")
                        {
                            this.toastr.success('Success! ', 'Welcome back!');
                            this.router.navigate(['adminHomePage']);
                        }
                }
                })
            }
            else{
                this.logInForm = this.formBuilder.group({
                    username:[''],
                    password:['']
                });
                this.toastr.error('User not found!', 'Error!');
            }
        },err=>{
            this.logInForm = this.formBuilder.group({
                username:[''],
                password:['']
            });
            this.toastr.error('User not found!', 'Error!');
        })
    }

    navigateSignUp(){
        this.router.navigate(['signup']);
    }
}