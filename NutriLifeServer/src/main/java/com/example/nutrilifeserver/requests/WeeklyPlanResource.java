package com.example.nutrilifeserver.requests;

import com.example.nutrilifeserver.controller.WeeklyPlanService;
import com.example.nutrilifeserver.model.WeeklyPlan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/weeklyPlan")
public class WeeklyPlanResource {
    private final WeeklyPlanService weeklyPlanService;

    @Autowired
    public WeeklyPlanResource(WeeklyPlanService weeklyPlanService) {
        this.weeklyPlanService = weeklyPlanService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<WeeklyPlan>> getAllWeeklyPlans(){
        List<WeeklyPlan> weeklyPlans = weeklyPlanService.findAllWeeklyPlans();
        return new ResponseEntity<>(weeklyPlans, HttpStatus.OK);
    }

    @GetMapping("/find")
    public ResponseEntity<WeeklyPlan> getWeeklyPlanById(@RequestBody String id) throws Throwable {
        WeeklyPlan dailyPlan = weeklyPlanService.findWeeklyPlanById(Integer.parseInt(id));
        return new ResponseEntity<>(dailyPlan, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<WeeklyPlan> addDailyPlan(@RequestBody WeeklyPlan weeklyPlan){
        WeeklyPlan newDailyPlan = weeklyPlanService.addWeeklyPlan(weeklyPlan);
        return new ResponseEntity<>(newDailyPlan, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<WeeklyPlan> updateDailyPlan(@RequestBody WeeklyPlan weeklyPlan){
        WeeklyPlan newWeeklyPlan = weeklyPlanService.updateWeeklyPlan(weeklyPlan);
        return new ResponseEntity<>(newWeeklyPlan, HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteWeeklyPlan(@RequestBody String id){
        weeklyPlanService.deleteWeeklyPlanById(Integer.parseInt(id));
        return new ResponseEntity<>(HttpStatus.OK);
    }
}