package com.example.nutrilifeserver.controller;

import com.example.nutrilifeserver.model.DailyPlan;
import com.example.nutrilifeserver.model.User;
import com.example.nutrilifeserver.repository.DailyPlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class DailyPlanService {
    private final DailyPlanRepository dailyPlanRepository;

    @Autowired
    public DailyPlanService(DailyPlanRepository dailyPlanRepository) {
        this.dailyPlanRepository = dailyPlanRepository;
    }

    public DailyPlan addDailyPlan(DailyPlan dailyPlan){
        DailyPlan newDailyPlan = new DailyPlan();
        newDailyPlan.setName(dailyPlan.getName());
        newDailyPlan.setBreakfast(dailyPlan.getBreakfast());
        newDailyPlan.setLunch(dailyPlan.getLunch());
        newDailyPlan.setDinner(dailyPlan.getDinner());
        newDailyPlan.setSnack(dailyPlan.getSnack());
        newDailyPlan.setCalories(dailyPlan.getCalories());
        newDailyPlan.setType(dailyPlan.getType());
        newDailyPlan.setGlutenFree(dailyPlan.isGlutenFree());
        newDailyPlan.setLactoseIntolerant(dailyPlan.isLactoseIntolerant());
        newDailyPlan.setDiabetesFriendly(dailyPlan.isDiabetesFriendly());
        newDailyPlan.setHearts(dailyPlan.getHearts());
        newDailyPlan.setUser(dailyPlan.getUser());
        newDailyPlan.setImageName(dailyPlan.getImageName());
        newDailyPlan.setImageContentType(dailyPlan.getImageContentType());
        newDailyPlan.setImageData(dailyPlan.getImageData());
        newDailyPlan.setComments(dailyPlan.getComments());
        return dailyPlanRepository.save(newDailyPlan);
    }

    public List<DailyPlan> findAllDailyPlans(){
        return dailyPlanRepository.findAll();
    }

    @Transactional
    public DailyPlan updateDailyPlan(DailyPlan dailyPlan){
        return dailyPlanRepository.save(dailyPlan);
    }

    public DailyPlan findDailyPlanById(int id) throws Throwable {
        return dailyPlanRepository.findDailyPlanById(id).
                orElseThrow(() -> new Exception("DailyPlan by id " + id + " was not found"));
    }

    @Transactional
    public void deleteDailyPlanById(int id){
        dailyPlanRepository.removeDailyPlanById(id);
    }


    public void deleteDailyPlansFromUser(User user) {

        dailyPlanRepository.removeDailyPlansByUserEquals(user);
    }

    public List<DailyPlan> findAllDailyPlansByName(String name) {
        return dailyPlanRepository.findDailyPlansByNameContaining(name);
    }

    public List<DailyPlan> findAllDailyPlansByNameAndType(String name, String type) {
        return dailyPlanRepository.findDailyPlansByNameContainingAndTypeEquals(name, type);
    }

    public List<DailyPlan> findAllDailyPlansFullyFiltered(String name, boolean glutenFree, boolean lactoseFree, boolean diabetesFriendly) {
        return dailyPlanRepository.findDailyPlansByNameContainingAndGlutenFreeEqualsAndLactoseIntolerantEqualsAndDiabetesFriendlyEquals(name, glutenFree, lactoseFree, diabetesFriendly);
    }

    public List<DailyPlan> findAllDailyPlansFullyFilteredByType(String name, boolean booleanGlutenFree, boolean booleanLactoseFree, boolean booleanDiabetesFriendly, String type) {
        return  dailyPlanRepository.findDailyPlansByNameContainingAndGlutenFreeEqualsAndLactoseIntolerantEqualsAndDiabetesFriendlyEqualsAndTypeEquals(name, booleanGlutenFree, booleanLactoseFree, booleanDiabetesFriendly, type);
    }

    public List<DailyPlan> findAllDailyPlansGlutenFree(String name) {
        return  dailyPlanRepository.findDailyPlansByNameContainingAndGlutenFreeEquals(name, true);
    }

    public List<DailyPlan> findAllDailyPlansGlutenFreeByType(String name, String type) {
        return  dailyPlanRepository.findDailyPlansByNameContainingAndGlutenFreeEqualsAndTypeEquals(name, true, type);
    }

    public List<DailyPlan> findAllDailyPlansDiabetesFriendly(String name) {
        return  dailyPlanRepository.findDailyPlansByNameContainingAndDiabetesFriendlyEquals(name, true);
    }

    public List<DailyPlan> findAllDailyPlansLactoseIntolerant(String name) {
        return  dailyPlanRepository.findDailyPlansByNameContainingAndLactoseIntolerantEquals(name, true);
    }

    public List<DailyPlan> findAllDailyPlansGlutenFreeDiabetesFriendly(String name) {
        return  dailyPlanRepository.findDailyPlansByNameContainingAndGlutenFreeEqualsAndDiabetesFriendlyEquals(name, true, true);
    }

    public List<DailyPlan> findAllDailyPlansGlutenFreeLactoseFree(String name) {
        return dailyPlanRepository.findDailyPlansByNameContainingAndGlutenFreeEqualsAndLactoseIntolerantEquals(name, true, true);
    }


    public List<DailyPlan> findAllDailyPlansDiabetesFriendlyLactoseFree(String name) {
        return  dailyPlanRepository.findDailyPlansByNameContainingAndDiabetesFriendlyEqualsAndLactoseIntolerantEquals(name, true, true);
    }

    public List<DailyPlan> findAllDailyPlansDiabetesFriendlyByType(String name, String type) {
        return  dailyPlanRepository.findDailyPlansByNameContainingAndDiabetesFriendlyEqualsAndTypeEquals(name, true, type);
    }

    public List<DailyPlan> findAllDailyPlansLactoseIntolerantByType(String name, String type) {
        return  dailyPlanRepository.findDailyPlansByNameContainingAndLactoseIntolerantEqualsAndTypeEquals(name, true, type);
    }

    public List<DailyPlan> findAllDailyPlansGlutenFreeDiabetesFriendlyByType(String name, String type) {
        return  dailyPlanRepository.findDailyPlansByNameContainingAndGlutenFreeEqualsAndDiabetesFriendlyEqualsAndTypeEquals(name, true, true, type);
    }

    public List<DailyPlan> findAllDailyPlansGlutenFreeLactoseFreeByType(String name, String type) {
        return dailyPlanRepository.findDailyPlansByNameContainingAndGlutenFreeEqualsAndLactoseIntolerantEqualsAndTypeEquals(name, true, true, type);
    }


    public List<DailyPlan> findAllDailyPlansDiabetesFriendlyLactoseFreeByType(String name, String type) {
        return  dailyPlanRepository.findDailyPlansByNameContainingAndDiabetesFriendlyEqualsAndLactoseIntolerantEqualsAndTypeEquals(name, true, true, type);
    }

    public List<DailyPlan> findAllDailyPlansByNameByType(String name, String type) {
        return  dailyPlanRepository.findDailyPlansByNameContainingAndTypeEquals(name, type);
    }

    public List<DailyPlan> filterByUser(List<DailyPlan> dailyPlans, User user) {
        List<DailyPlan> userDailyPlans = dailyPlanRepository.findDailyPlansByUser(user);

        List<DailyPlan> finalList = new ArrayList<DailyPlan>();

        for (DailyPlan t : dailyPlans) {
            if(userDailyPlans.contains(t)) {
                finalList.add(t);
            }
        }

        return finalList;
    }

    public byte[] getUserImage(int userId) throws Throwable {
        // Assuming you have a UserService that handles user-related operations
        DailyPlan dailyPlan = this.findDailyPlanById(userId);

        if (dailyPlan != null) {
            // Assuming the image data is stored as a byte array in the user object
            return dailyPlan.getImageData();
        }

        // Return null or an empty byte array if user not found or no image data available
        return new byte[0];
    }
}
