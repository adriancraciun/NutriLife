import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DailyPlan } from 'src/app/model/dailyplan'
import { DailyPlanService } from '../controller/dailyplan.service';
import { ToastrService } from 'ngx-toastr';
import { truncate } from 'fs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private toastr: ToastrService, private router : Router,  private changeDetection: ChangeDetectorRef ) {}

  ngOnInit(): void {
  }
}
