import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from '../controller/user.service';
import { AccountService } from '../controller/account.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/user';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  constructor(private route: ActivatedRoute, private userService: UserService, private accountService: AccountService, private formBuilder : FormBuilder, private toastr: ToastrService, private router : Router, private changeDetection: ChangeDetectorRef) { }
  files: File[] = [];
  selectedGender: String = "";
  allGenders: String[] = ["Male", "Female"];
  allTypes: String[] = ["Regular", "Anorexic", "Underweight", "Overweight", "Obese", "High-Protein", "Low-Fat", "Low-Carbohydrate", "Low-Calorie", "Vegan", "Vegetarian", "Pescetarian", "Plant-Based", "Liquid-Based", "Detoxifying", "HCG", "Gastrits and Ulcers"];
  loggedUser: User | undefined

  public updateUserForm!: FormGroup

  ngOnInit(): void {
    var loggedUserId = localStorage.getItem("loggedUserId")
    this.userService.getUserById(Number(loggedUserId)).subscribe(res => {
      this.loggedUser = res
      this.updateUserForm = this.formBuilder.group({
        id: [`${loggedUserId}`], 
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
    })
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

  updateUser(){
    var loggedUserId = localStorage.getItem("loggedUserId")
      if(this.updateUserForm.value.firstName.length < 1){
        this.updateUserForm = this.formBuilder.group({
          id: [`${loggedUserId}`], 
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
        this.toastr.error('Your first name can not be empty!');
        return
      }

      if(this.updateUserForm.value.lastName.length < 1){
        this.updateUserForm = this.formBuilder.group({
          id: [`${loggedUserId}`], 
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
        this.toastr.error('Your second name can not be empty!');
        return
      }

      if(this.selectedGender != "Male" && this.selectedGender != "Female" ){
        this.updateUserForm = this.formBuilder.group({
          id: [`${loggedUserId}`], 
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
        this.toastr.error('Please select a gender!');
        return
      }

      if(this.updateUserForm.value.age < 1 || this.updateUserForm.value.age > 200){
        this.updateUserForm = this.formBuilder.group({
          id: [`${loggedUserId}`], 
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
        this.toastr.error('Please input a valid age!');
        return
      }

      if(this.updateUserForm.value.height < 1 || this.updateUserForm.value.height > 400){
        this.updateUserForm = this.formBuilder.group({
          id: [`${loggedUserId}`], 
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
        this.toastr.error('Please input a valid height!');
        return
      }

      if(this.updateUserForm.value.weight < 1 || this.updateUserForm.value.weight > 1000){
        this.updateUserForm = this.formBuilder.group({
          id: [`${loggedUserId}`], 
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
        this.toastr.error('Please input a valid weight!');
        return
      }
      
      const maxSizeInBytes = 1024 * 1024; // 1MB
      if (this.files[0].size > maxSizeInBytes) {
        this.toastr.error('The image size is too large!');
        return
      }

      if (this.loggedUser){
        var updatedUser : User = {
          id: Number(loggedUserId), 
          firstName: this.updateUserForm.value.firstName, 
          middleName: this.updateUserForm.value.middleName,
          lastName: this.updateUserForm.value.lastName, 
          age: this.updateUserForm.value.age,  
          gender: this.selectedGender.toString(), 
          weight: this.updateUserForm.value.weight,
          height: this.updateUserForm.value.height, 
          glutenFree: this.updateUserForm.value.glutenFree,  
          lactoseIntolerant: this.updateUserForm.value.lactoseIntolerant,
          diabetes: this.updateUserForm.value.diabetes,  
          insulinIntake: this.updateUserForm.value.insulinIntake,
          account: this.loggedUser?.account,
          favouriteDailyPlanIds: [],
          imageName: null,
          imageContentType: null,
          imageData: null
        };

        this.userService.updateUserWithImage(updatedUser, this.files[0]).subscribe(
          res => {
            this.toastr.success('User Updated!')
            this.router.navigate(['userHome'])
          }
        );
      }
  }

  navigateBack(): void {
    window.history.back()
  }
}
