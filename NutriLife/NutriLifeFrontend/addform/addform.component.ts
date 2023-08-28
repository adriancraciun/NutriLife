import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DailyPlanService } from '../controller/dailyplan.service';
import { DailyPlan } from '../model/dailyplan';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../controller/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addform',
  templateUrl: './addform.component.html',
  styleUrls: ['./addform.component.css']
})
export class AddformComponent implements OnInit {
  constructor(private router: Router, private programService: DailyPlanService, private userService: UserService, private formBuilder : FormBuilder, private toastr: ToastrService, private changeDetection: ChangeDetectorRef) { }
  selectedType: string = "";
  public addProgramForm!: FormGroup
  files: File[] = [];
  inputComments: String = "";
  maxCharacterLimit: number = 1000;
  allTypes: String[] = ["Regular", "Anorexic", "Underweight", "Overweight", "Obese", "High-Protein", "Low-Fat", "Low-Carbohydrate", "Low-Calorie", "Vegan", "Vegetarian", "Pescetarian", "Plant-Based", "Liquid-Based", "Detoxifying", "HCG", "Gastrits and Ulcers"];


  ngOnInit(): void {
    this.addProgramForm = this.formBuilder.group({
      id: [''], 
      name: [''], 
      breakfast: [''],
      lunch: [''], 
      dinner: [''],  
      snack: [''], 
      calories: [''],
      type: [''],
      glutenFree: [''],  
      lactoseIntolerant: [''],
      diabetesFriendly: [''],  
      user: [''],
      comments: ['']
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

  addProgram() {
    var loggedUserId = localStorage.getItem("loggedUserId")
    var loggedUserIdNumber = Number(loggedUserId)
    this.userService.getUserById(loggedUserIdNumber).subscribe(loggedUser => {

      if(this.addProgramForm.value.name.length < 1){
        this.addProgramForm = this.formBuilder.group({
          id: [''], 
          name: [''], 
          breakfast: [''],
          lunch: [''], 
          dinner: [''],  
          snack: [''], 
          calories: [''],
          type: [''],
          glutenFree: [''],  
          lactoseIntolerant: [''],
          diabetesFriendly: [''],  
          user: [''],
          comments: ['']
        });
        this.toastr.error('The name of the program can not be empty.', 'Error!');
        return
      }

      if(this.addProgramForm.value.breakfast.length < 1){
        this.addProgramForm = this.formBuilder.group({
          id: [''], 
          name: [''], 
          breakfast: [''],
          lunch: [''], 
          dinner: [''],  
          snack: [''], 
          calories: [''],
          type: [''],
          glutenFree: [''],  
          lactoseIntolerant: [''],
          diabetesFriendly: [''],  
          user: [''],
          comments: ['']
        });
        this.toastr.error('The breakfast can not be empty.', 'Error!');
        return
      }

      if(this.addProgramForm.value.lunch.length < 1){
        this.addProgramForm = this.formBuilder.group({
          id: [''], 
          name: [''], 
          breakfast: [''],
          lunch: [''], 
          dinner: [''],  
          snack: [''], 
          calories: [''],
          type: [''],
          glutenFree: [''],  
          lactoseIntolerant: [''],
          diabetesFriendly: [''],  
          user: [''],
          comments: ['']
        });
        this.toastr.error('The lunch can not be empty.', 'Error!');
        return
      }

      if(this.addProgramForm.value.dinner.length < 1){
        this.addProgramForm = this.formBuilder.group({
          id: [''], 
          name: [''], 
          breakfast: [''],
          lunch: [''], 
          dinner: [''],  
          snack: [''], 
          calories: [''],
          type: [''],
          glutenFree: [''],  
          lactoseIntolerant: [''],
          diabetesFriendly: [''],  
          user: [''],
          comments: ['']
        });
        this.toastr.error('The dinner can not be empty.', 'Error!');
        return
      }

      if(this.addProgramForm.value.snack.length < 1){
        this.addProgramForm = this.formBuilder.group({
          id: [''], 
          name: [''], 
          breakfast: [''],
          lunch: [''], 
          dinner: [''],  
          snack: [''], 
          calories: [''],
          type: [''],
          glutenFree: [''],  
          lactoseIntolerant: [''],
          diabetesFriendly: [''],  
          user: [''],
          comments: ['']
        });
        this.toastr.error('The snack can not be empty.', 'Error!');
        return
      }

      if(this.addProgramForm.value.calories.length < 1){
        this.addProgramForm = this.formBuilder.group({
          id: [''], 
          name: [''], 
          breakfast: [''],
          lunch: [''], 
          dinner: [''],  
          snack: [''], 
          calories: [''],
          type: [''],
          glutenFree: [''],  
          lactoseIntolerant: [''],
          diabetesFriendly: [''],  
          user: [''],
          comments: ['']
        });
        this.toastr.error('The calories number can not be empty.', 'Error!');
        return
      }

      if(this.selectedType.length < 1){
        this.addProgramForm = this.formBuilder.group({
          id: [''], 
          name: [''], 
          breakfast: [''],
          lunch: [''], 
          dinner: [''],  
          snack: [''], 
          calories: [''],
          type: [''],
          glutenFree: [''],  
          lactoseIntolerant: [''],
          diabetesFriendly: [''],  
          user: [''],
          comments: ['']
        });
        this.toastr.error('The type can not be empty.', 'Error!');
        return
      }

      if(this.addProgramForm.value.comments.length < 1){
        this.addProgramForm = this.formBuilder.group({
          id: [''], 
          name: [''], 
          breakfast: [''],
          lunch: [''], 
          dinner: [''],  
          snack: [''], 
          calories: [''],
          type: [''],
          glutenFree: [''],  
          lactoseIntolerant: [''],
          diabetesFriendly: [''],  
          user: [''],
          comments: ['']
        });
        this.toastr.error('Please add some comments to your program!', 'Error!');
        return
      }
      let newProgram : DailyPlan = {
        id: Number(1), name: this.addProgramForm.value.name, breakfast: this.addProgramForm.value.breakfast,
        lunch: this.addProgramForm.value.lunch, 
        dinner: this.addProgramForm.value.dinner,
        snack: this.addProgramForm.value.snack, calories: this.addProgramForm.value.calories,
        type: this.selectedType, glutenFree: this.addProgramForm.value.glutenFree,
        lactoseIntolerant: this.addProgramForm.value.dairyFree, diabetesFriendly: this.addProgramForm.value.diabetesFriendly,
        user: loggedUser, 
        hearts: 0,
        imageName: null,
        imageContentType: null,
        imageData: null,
        comments: this.addProgramForm.value.comments
      };
      this.programService.addDailyPlan(newProgram, this.files[0]).subscribe(
        res => {
          this.toastr.success('Program Added!')
          this.router.navigate(['userHome'])
        }
      );
    })
  }

  getRemainingCommentCharacters() {
    const usedCharacters: number = this.inputComments.length;
    const remainingCharacters: number = this.maxCharacterLimit - usedCharacters; 
    return remainingCharacters;
  }

  typeChanged(type: String) {
    this.selectedType = type.toString()
    this.changeDetection.detectChanges()
  }
}

  // onSelect(event : any) {
  //   console.log(event);
  //   this.file = event.addedFiles;

  //   //const formData = new FormData();

  //   // for (var i = 0; i < this.files.length; i++) { 
  //   //   formData.append("file[]", this.files[i]);
  //   // }

  //   // this.http.post('http://localhost:8001/upload.php', formData)
  //   // .subscribe(res => {
  //   //    console.log(res);
  //   //    alert('Uploaded Successfully.');
  //   // })
  // }

  // onRemove(event : any) {
  //     console.log(event);
  //     this.files.splice(this.files.indexOf(event), 1);
  // }
