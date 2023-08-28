import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../controller/user.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../model/user';
import { AccountService } from '../controller/account.service';
import { Account } from '../model/account';
import { DailyPlan } from '../model/dailyplan';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  constructor(private userService: UserService, private accountService: AccountService, private formBuilder : FormBuilder, private toastr: ToastrService, private router : Router, private changeDetection: ChangeDetectorRef) { }
  files: File[] = [];
  selectedGender: String = "";
  allGenders: String[] = ["Male", "Female"];
  allTypes: String[] = ["Regular", "Anorexic", "Underweight", "Overweight", "Obese", "High-Protein", "Low-Fat", "Low-Carbohydrate", "Low-Calorie", "Vegan", "Vegetarian", "Pescetarian", "Plant-Based", "Liquid-Based", "Detoxifying", "HCG", "Gastrits and Ulcers"];

  public createUserForm!: FormGroup

  ngOnInit(): void {
    this.createUserForm = this.formBuilder.group({
      id: [''], 
      firstName: [''], 
      middleName: [''],
      lastName: [''], 
      age: [''],  
      gender: [''], 
      weight: [''],
      height: [''], 
      glutenFree: [''],  
      lactoseIntolerant: [''],
      diabetes: [''],  
      insulinIntake: [''],
      account: [''],
      favouriteDailyPlans: ['']
    });
  }

  onSelect(event : any) {
    console.log(event);
    if(this.files && this.files.length >=1) {
      this.onRemove(this.files[0]);
    }
    this.files.push(...event.addedFiles);
  }

  onRemove(event : any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  genderChanged(gender: String) {
    this.selectedGender = gender
    this.changeDetection.detectChanges()
  }

  createUser(){
    var loggedAccountId = localStorage.getItem("loggedAccountId")
    var loggedAccountIdNumber = Number(loggedAccountId)


    this.accountService.getAccounts().subscribe(allAccounts => {
      const myAccount = allAccounts.find((a:Account)=>{
        return a.id === loggedAccountIdNumber
      });
      if (myAccount == null)
        return;

      if(this.createUserForm.value.firstName.length < 1){
        this.createUserForm = this.formBuilder.group({
          id: [''], 
          firstName: [''], 
          middleName: [''],
          lastName: [''], 
          age: [''],  
          gender: [''], 
          weight: [''],
          height: [''], 
          glutenFree: [''],  
          lactoseIntolerant: [''],
          diabetes: [''],  
          insulinIntake: [''],
          account: [''],
          favouriteDailyPlans: ['']
        });
        this.toastr.error('Your first name can not be empty.', 'Sign up error!');
        return
      }

      if(this.createUserForm.value.lastName.length < 1){
        this.createUserForm = this.formBuilder.group({
          id: [''], 
          firstName: [''], 
          secondName: [''], 
          middleName: [''],
          lastName: [''], 
          age: [''],  
          gender: [''], 
          weight: [''],
          height: [''], 
          glutenFree: [''],  
          lactoseIntolerant: [''],
          diabetes: [''],  
          insulinIntake: [''],
          account: [''],
          favouriteDailyPlans: ['']
        });
        this.toastr.error('Your second name can not be empty.', 'Sign up error!');
        return
      }

      if(this.selectedGender != "Male" && this.selectedGender != "Female" ){
        this.createUserForm = this.formBuilder.group({
          id: [''], 
          firstName: [''], 
          secondName: [''], 
          middleName: [''],
          lastName: [''], 
          age: [''],  
          gender: [''], 
          weight: [''],
          height: [''], 
          glutenFree: [''],  
          lactoseIntolerant: [''],
          diabetes: [''],  
          insulinIntake: [''],
          account: [''],
          favouriteDailyPlans: ['']
        });
        this.toastr.error('Please select a gender.', 'Sign up error!');
        return
      }

      if(this.createUserForm.value.age < 1 || this.createUserForm.value.age > 200){
        this.createUserForm = this.formBuilder.group({
          id: [''], 
          firstName: [''], 
          secondName: [''], 
          middleName: [''],
          lastName: [''], 
          age: [''],  
          gender: [''], 
          weight: [''],
          height: [''], 
          glutenFree: [''],  
          lactoseIntolerant: [''],
          diabetes: [''],  
          insulinIntake: [''],
          account: [''],
          favouriteDailyPlans: ['']
        });
        this.toastr.error('Please input a valid age', 'Sign up error!');
        return
      }

      if(this.createUserForm.value.height < 1 || this.createUserForm.value.height > 400){
        this.createUserForm = this.formBuilder.group({
          id: [''], 
          firstName: [''], 
          secondName: [''], 
          middleName: [''],
          lastName: [''], 
          age: [''],  
          gender: [''], 
          weight: [''],
          height: [''], 
          glutenFree: [''],  
          lactoseIntolerant: [''],
          diabetes: [''],  
          insulinIntake: [''],
          account: [''],
          favouriteDailyPlans: ['']
        });
        this.toastr.error('Please input a correct height', 'Sign up error!');
        return
      }

      if(this.createUserForm.value.weight < 1 || this.createUserForm.value.weight > 1000){
        this.createUserForm = this.formBuilder.group({
          id: [''], 
          firstName: [''], 
          secondName: [''], 
          middleName: [''],
          lastName: [''], 
          age: [''],  
          gender: [''], 
          weight: [''],
          height: [''], 
          glutenFree: [''],  
          lactoseIntolerant: [''],
          diabetes: [''],  
          insulinIntake: [''],
          account: [''],
          favouriteDailyPlans: ['']
        });
        this.toastr.error('Please input a valid weight', 'Sign up error!');
        return
      }
      
      const maxSizeInBytes = 1024 * 1024; // 1MB
      if (this.files[0].size > maxSizeInBytes) {
        this.toastr.error('The image size is too large!', 'Sign up error!');
        return
      }

      let newUser : User = {
        id: Number(1), 
        firstName: this.createUserForm.value.firstName, 
        middleName: this.createUserForm.value.middleName,
        lastName: this.createUserForm.value.lastName, 
        age: this.createUserForm.value.age,  
        gender: this.selectedGender.toString(), 
        weight: this.createUserForm.value.weight,
        height: this.createUserForm.value.height, 
        glutenFree: this.createUserForm.value.glutenFree,  
        lactoseIntolerant: this.createUserForm.value.lactoseIntolerant,
        diabetes: this.createUserForm.value.diabetes,  
        insulinIntake: this.createUserForm.value.insulinIntake,
        account: myAccount,
        favouriteDailyPlanIds: [],
        imageName: null,
        imageContentType: null,
        imageData: null
      };
      this.userService.addUser(newUser, this.files[0]).subscribe();
      this.userService.getUsers().subscribe(allUsers => {
        const myUser = allUsers.find ((u:User)=> {
          return u.account.id === loggedAccountIdNumber
        })
        if (myUser == null)
          return;
        localStorage.setItem("loggedUserId", myUser.id.toString())
        this.toastr.success("Successfully creatde an account!", "You can now start your journey!")
        this.router.navigate(['userHome']);
      })
    })

    
  }
}
