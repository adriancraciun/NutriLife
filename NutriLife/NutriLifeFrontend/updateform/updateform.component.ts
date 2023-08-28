import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DailyPlan } from '../model/dailyplan';
import { ActivatedRoute, Router } from '@angular/router';
import { DailyPlanService } from '../controller/dailyplan.service';
import { UserService } from '../controller/user.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-updateform',
  templateUrl: './updateform.component.html',
  styleUrls: ['./updateform.component.css']
})
export class UpdateformComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router, private dailyPlanService: DailyPlanService, private userService: UserService, private formBuilder : FormBuilder, private toastr: ToastrService, private changeDetection: ChangeDetectorRef) { }
  selectedType: string = "";
  public updateProgramForm!: FormGroup;
  files: File[] = [];
  inputComments: String = "";
  maxCharacterLimit: number = 1000;
  plan: DailyPlan | undefined
  allTypes: String[] = ["Regular", "Anorexic", "Underweight", "Overweight", "Obese", "High-Protein", "Low-Fat", "Low-Carbohydrate", "Low-Calorie", "Vegan", "Vegetarian", "Pescetarian", "Plant-Based", "Liquid-Based", "Detoxifying", "HCG", "Gastrits and Ulcers"];


  ngOnInit(): void {
    const pId = this.route.snapshot.paramMap.get('planId')
    if (pId){
      this.dailyPlanService.getDailyPlansById(pId).subscribe(dp => {
        this.plan = dp
        this.updateProgramForm = this.formBuilder.group({
          id: [`${this.plan?.id}`], 
          name: [``], 
          breakfast: [``],
          lunch: [``], 
          dinner: [``],  
          snack: [``], 
          calories: [``],
          type: [``],
          glutenFree: [``],  
          lactoseIntolerant: [``],
          diabetesFriendly: [``],  
          user: [``],
          comments: [``]
        });
        this.changeDetection.detectChanges()
      })
    }
    this.changeDetection.detectChanges()
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

  updateProgram() {
    var loggedUserId = localStorage.getItem("loggedUserId")
    var loggedUserIdNumber = Number(loggedUserId)
    this.userService.getUserById(loggedUserIdNumber).subscribe(loggedUser => {

      this.toastr.show(this.updateProgramForm.value.name)
      if(this.updateProgramForm.value.name.length < 1){
        this.updateProgramForm = this.formBuilder.group({
          id: [`${this.plan?.id}`], 
          name: [``], 
          breakfast: [``],
          lunch: [``], 
          dinner: [``],  
          snack: [``], 
          calories: [``],
          type: [``],
          glutenFree: [``],  
          lactoseIntolerant: [``],
          diabetesFriendly: [``],  
          user: [``],
          comments: [``]
        });
        this.toastr.error('The name of the program can not be empty.');
        return
      }

      if(this.updateProgramForm.value.breakfast.length < 1){
        this.updateProgramForm = this.formBuilder.group({
          id: [`${this.plan?.id}`], 
          name: [``], 
          breakfast: [``],
          lunch: [``], 
          dinner: [``],  
          snack: [``], 
          calories: [``],
          type: [``],
          glutenFree: [``],  
          lactoseIntolerant: [``],
          diabetesFriendly: [``],  
          user: [``],
          comments: [``]
        });
        this.toastr.error('The breakfast can not be empty.');
        return
      }

      if(this.updateProgramForm.value.lunch.length < 1){
        this.updateProgramForm = this.formBuilder.group({
          id: [`${this.plan?.id}`], 
          name: [``], 
          breakfast: [``],
          lunch: [``], 
          dinner: [``],  
          snack: [``], 
          calories: [``],
          type: [``],
          glutenFree: [``],  
          lactoseIntolerant: [``],
          diabetesFriendly: [``],  
          user: [``],
          comments: [``]
        });
        this.toastr.error('The lunch can not be empty.');
        return
      }

      if(this.updateProgramForm.value.dinner.length < 1){
        this.updateProgramForm = this.formBuilder.group({
          id: [`${this.plan?.id}`], 
          name: [``], 
          breakfast: [``],
          lunch: [``], 
          dinner: [``],  
          snack: [``], 
          calories: [``],
          type: [``],
          glutenFree: [``],  
          lactoseIntolerant: [``],
          diabetesFriendly: [``],  
          user: [``],
          comments: [``]
        });
        this.toastr.error('The dinner can not be empty.');
        return
      }

      if(this.updateProgramForm.value.snack.length < 1){
        this.updateProgramForm = this.formBuilder.group({
          id: [`${this.plan?.id}`], 
          name: [``], 
          breakfast: [``],
          lunch: [``], 
          dinner: [``],  
          snack: [``], 
          calories: [``],
          type: [``],
          glutenFree: [``],  
          lactoseIntolerant: [``],
          diabetesFriendly: [``],  
          user: [``],
          comments: [``]
        });
        this.toastr.error('The snack can not be empty.');
        return
      }

      if(this.updateProgramForm.value.calories.length < 1){
        this.updateProgramForm = this.formBuilder.group({
          id: [`${this.plan?.id}`], 
          name: [``], 
          breakfast: [``],
          lunch: [``], 
          dinner: [``],  
          snack: [``], 
          calories: [``],
          type: [``],
          glutenFree: [``],  
          lactoseIntolerant: [``],
          diabetesFriendly: [``],  
          user: [``],
          comments: [``]
        });
        this.toastr.error('The calories number can not be empty.');
        return
      }

      if(this.selectedType.length < 1){
        this.updateProgramForm = this.formBuilder.group({
          id: [`${this.plan?.id}`], 
          name: [``], 
          breakfast: [``],
          lunch: [``], 
          dinner: [``],  
          snack: [``], 
          calories: [``],
          type: [``],
          glutenFree: [``],  
          lactoseIntolerant: [``],
          diabetesFriendly: [``],  
          user: [``],
          comments: [``]
        });
        this.toastr.error('The type can not be empty.');
        return
      }

      if(this.updateProgramForm.value.comments.length < 1){
        this.updateProgramForm = this.formBuilder.group({
          id: [`${this.plan?.id}`], 
          name: [``], 
          breakfast: [``],
          lunch: [``], 
          dinner: [``],  
          snack: [``], 
          calories: [``],
          type: [``],
          glutenFree: [``],  
          lactoseIntolerant: [``],
          diabetesFriendly: [``],  
          user: [``],
          comments: [``]
        });
        this.toastr.error('Please add some comments to your program!');
        return
      }
      let updatesProgram : DailyPlan = {
        id: this.updateProgramForm.value.id, 
        name: this.updateProgramForm.value.name, 
        breakfast: this.updateProgramForm.value.breakfast,
        lunch: this.updateProgramForm.value.lunch, 
        dinner: this.updateProgramForm.value.dinner,
        snack: this.updateProgramForm.value.snack, 
        calories: this.updateProgramForm.value.calories,
        type: this.selectedType, 
        glutenFree: this.updateProgramForm.value.glutenFree,
        lactoseIntolerant: this.updateProgramForm.value.dairyFree, 
        diabetesFriendly: this.updateProgramForm.value.diabetesFriendly,
        user: loggedUser,
        hearts: 0,
        imageName: null,
        imageContentType: null,
        imageData: null,
        comments: this.updateProgramForm.value.comments
      };
      this.dailyPlanService.updateDailyPlanWithImage(updatesProgram, this.files[0]).subscribe(
        res => {
          this.toastr.success('Program Updated!')
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

  navigateBack(): void {
    window.history.back()
  }
}
