package com.example.nutrilifeserver.controller;

import com.example.nutrilifeserver.repository.WeeklyPlanRepository;
import com.example.nutrilifeserver.model.WeeklyPlan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class WeeklyPlanService {
    private final WeeklyPlanRepository weeklyPlanRepository;

    @Autowired
    public WeeklyPlanService(WeeklyPlanRepository weeklyPlanRepository) {
        this.weeklyPlanRepository = weeklyPlanRepository;
    }

    public WeeklyPlan addWeeklyPlan(WeeklyPlan weeklyPlan){
        return weeklyPlanRepository.save(weeklyPlan);
    }

    public List<WeeklyPlan> findAllWeeklyPlans(){
        return weeklyPlanRepository.findAll();
    }

    @Transactional
    public WeeklyPlan updateWeeklyPlan(WeeklyPlan weeklyPlan){
        return weeklyPlanRepository.save(weeklyPlan);
    }

    public WeeklyPlan findWeeklyPlanById(int id) throws Throwable {
        return weeklyPlanRepository.findWeeklyPlanById(id).
                orElseThrow(() -> new Exception("WeeklyPlan by id " + id + " was not found"));
    }

    @Transactional
    public void deleteWeeklyPlanById(int id){
        weeklyPlanRepository.removeWeeklyPlanById(id);
    }
}
