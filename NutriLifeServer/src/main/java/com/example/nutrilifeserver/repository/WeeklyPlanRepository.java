package com.example.nutrilifeserver.repository;

import com.example.nutrilifeserver.model.WeeklyPlan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface WeeklyPlanRepository extends JpaRepository<WeeklyPlan, Long>{
    Optional<WeeklyPlan> findWeeklyPlanById(int id);

    @Transactional
    void removeWeeklyPlanById(int id);
}
