package com.example.nutrilifeserver.repository;

import com.example.nutrilifeserver.model.DailyPlan;
import com.example.nutrilifeserver.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Repository
public interface DailyPlanRepository extends JpaRepository<DailyPlan, Long>{
    Optional<DailyPlan> findDailyPlanById(int id);

    List<DailyPlan> findDailyPlansByNameContaining(String name);

    List<DailyPlan> findDailyPlansByUser(User user);

    List<DailyPlan> findDailyPlansByNameContainingAndGlutenFreeEqualsAndLactoseIntolerantEqualsAndDiabetesFriendlyEquals(
            String name, boolean glutenFree, boolean lactoseIntolerant, boolean diabetesFriendly
    );

    List<DailyPlan> findDailyPlansByNameContainingAndGlutenFreeEqualsAndLactoseIntolerantEqualsAndDiabetesFriendlyEqualsAndTypeEquals(
            String name, boolean glutenFree, boolean lactoseIntolerant, boolean diabetesFriendly, String type
    );

    List<DailyPlan> findDailyPlansByNameContainingAndGlutenFreeEquals(String name, boolean glutenFree);

    List<DailyPlan> findDailyPlansByNameContainingAndDiabetesFriendlyEquals(String name, boolean diabetesFriendly);

    List<DailyPlan> findDailyPlansByNameContainingAndLactoseIntolerantEquals(String name, boolean diabetesFriendly);

    List<DailyPlan> findDailyPlansByNameContainingAndGlutenFreeEqualsAndDiabetesFriendlyEquals(
            String name, boolean glutenFree, boolean diabetesFriendly
    );

    List<DailyPlan> findDailyPlansByNameContainingAndGlutenFreeEqualsAndLactoseIntolerantEquals(
            String name, boolean glutenFree, boolean LactoseIntolerant
    );

    List<DailyPlan> findDailyPlansByNameContainingAndDiabetesFriendlyEqualsAndLactoseIntolerantEquals(
            String name, boolean diabetesFriendly, boolean lactoseIntolerant
    );

    List<DailyPlan> findDailyPlansByTypeEquals(String type);

    List<DailyPlan> findDailyPlansByNameContainingAndGlutenFreeEqualsAndTypeEquals(String name, boolean glutenFree, String type);

    List<DailyPlan> findDailyPlansByNameContainingAndDiabetesFriendlyEqualsAndTypeEquals(String name, boolean diabetesFriendly, String type);

    List<DailyPlan> findDailyPlansByNameContainingAndLactoseIntolerantEqualsAndTypeEquals(String name, boolean diabetesFriendly, String type);

    List<DailyPlan> findDailyPlansByNameContainingAndGlutenFreeEqualsAndDiabetesFriendlyEqualsAndTypeEquals(
            String name, boolean glutenFree, boolean diabetesFriendly, String type
    );

    List<DailyPlan> findDailyPlansByNameContainingAndGlutenFreeEqualsAndLactoseIntolerantEqualsAndTypeEquals(
            String name, boolean glutenFree, boolean LactoseIntolerant, String type
    );

    List<DailyPlan> findDailyPlansByNameContainingAndDiabetesFriendlyEqualsAndLactoseIntolerantEqualsAndTypeEquals(
            String name, boolean diabetesFriendly, boolean lactoseIntolerant, String type
    );

    @Transactional
    void removeDailyPlanById(int id);

    List<DailyPlan> findDailyPlansByNameContainingAndTypeEquals(String name, String type);

    @Transactional
    void removeDailyPlansByUserEquals(User user);
}
