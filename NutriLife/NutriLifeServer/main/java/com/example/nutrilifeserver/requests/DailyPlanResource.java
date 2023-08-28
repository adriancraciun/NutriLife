package com.example.nutrilifeserver.requests;

import com.example.nutrilifeserver.controller.DailyPlanService;
import com.example.nutrilifeserver.controller.UserService;
import com.example.nutrilifeserver.model.DailyPlan;
import com.example.nutrilifeserver.model.User;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.lang.reflect.Array;
import java.util.*;

@RestController
@RequestMapping("/dailyPlan")
public class DailyPlanResource {
    private final DailyPlanService dailyPlanService;
    private final UserService userService;

    @Autowired
    public DailyPlanResource(DailyPlanService dailyPlanService, UserService userService) {
        this.dailyPlanService = dailyPlanService;
        this.userService = userService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<DailyPlan>> getAllDailyPlans(){
        List<DailyPlan> dailyPlans = dailyPlanService.findAllDailyPlans();
        return new ResponseEntity<>(dailyPlans, HttpStatus.OK);
    }

    @GetMapping("/all/byName/{name}")
    public ResponseEntity<List<DailyPlan>> getAllDailyPlans(@PathVariable("name") String name){
        List<DailyPlan> dailyPlans;
        if (Objects.equals(name, "any"))
             dailyPlans = dailyPlanService.findAllDailyPlans();
        else {
            dailyPlans = dailyPlanService.findAllDailyPlansByName(name);
        }
        return new ResponseEntity<>(dailyPlans, HttpStatus.OK);
    }

    @GetMapping("/all/fullyFiltered/{name}/{glutenFree}/{lactoseFree}/{diabetesFriendly}")
    public ResponseEntity<List<DailyPlan>> getAllDailyPlansFullyFiltered(@PathVariable("name") String name,
                                                            @PathVariable("glutenFree") String glutenFree,
                                                            @PathVariable("lactoseFree") String lactoseFree,
                                                            @PathVariable("diabetesFriendly") String diabetesFriendly){
        List<DailyPlan> dailyPlans;
        boolean booleanGlutenFree = Boolean.parseBoolean(glutenFree);
        boolean booleanLactoseFree = Boolean.parseBoolean(lactoseFree);
        boolean booleanDiabetesFriendly = Boolean.parseBoolean(diabetesFriendly);
        if (Objects.equals(name, "any")) {
            name = "";
        }
        if (Objects.equals(glutenFree, "false") && Objects.equals(diabetesFriendly, "false") && Objects.equals(lactoseFree, "false"))
        {
            dailyPlans = dailyPlanService.findAllDailyPlansByName(name);
            return new ResponseEntity<>(dailyPlans, HttpStatus.OK);
        }
        if (Objects.equals(glutenFree, "true") && Objects.equals(diabetesFriendly, "false") && Objects.equals(lactoseFree, "false"))
        {
            dailyPlans = dailyPlanService.findAllDailyPlansGlutenFree(name);
            return new ResponseEntity<>(dailyPlans, HttpStatus.OK);
        }
        else if (Objects.equals(glutenFree, "false") && Objects.equals(diabetesFriendly, "true") && Objects.equals(lactoseFree, "false"))
        {
            dailyPlans = dailyPlanService.findAllDailyPlansDiabetesFriendly(name);
            return new ResponseEntity<>(dailyPlans, HttpStatus.OK);
        }
        else if (Objects.equals(glutenFree, "false") && Objects.equals(diabetesFriendly, "false") && Objects.equals(lactoseFree, "true"))
        {
            dailyPlans = dailyPlanService.findAllDailyPlansLactoseIntolerant(name);
            return new ResponseEntity<>(dailyPlans, HttpStatus.OK);
        }
        else if (Objects.equals(glutenFree, "true") && Objects.equals(diabetesFriendly, "true") && Objects.equals(lactoseFree, "false"))
        {
            dailyPlans = dailyPlanService.findAllDailyPlansGlutenFreeDiabetesFriendly(name);
            return new ResponseEntity<>(dailyPlans, HttpStatus.OK);
        }
        else if (Objects.equals(glutenFree, "true") && Objects.equals(diabetesFriendly, "false") && Objects.equals(lactoseFree, "true"))
        {
            dailyPlans = dailyPlanService.findAllDailyPlansGlutenFreeLactoseFree(name);
            return new ResponseEntity<>(dailyPlans, HttpStatus.OK);
        }
        else if (Objects.equals(glutenFree, "false") && Objects.equals(diabetesFriendly, "true") && Objects.equals(lactoseFree, "true"))
        {
            dailyPlans = dailyPlanService.findAllDailyPlansDiabetesFriendlyLactoseFree(name);
            return new ResponseEntity<>(dailyPlans, HttpStatus.OK);
        }

        dailyPlans = dailyPlanService.findAllDailyPlansFullyFiltered(name, booleanGlutenFree, booleanLactoseFree, booleanDiabetesFriendly);
        return new ResponseEntity<>(dailyPlans, HttpStatus.OK);
    }


    @GetMapping("/all/byUserfullyFiltered/{user}/{name}/{glutenFree}/{lactoseFree}/{diabetesFriendly}")
    public ResponseEntity<List<DailyPlan>> getAllDailyPlansByUserFullyFiltered(@PathVariable("user") String userId,
                                                                         @PathVariable("name") String name,
                                                                         @PathVariable("glutenFree") String glutenFree,
                                                                         @PathVariable("lactoseFree") String lactoseFree,
                                                                         @PathVariable("diabetesFriendly") String diabetesFriendly) throws Throwable {
        List<DailyPlan> dailyPlans;
        boolean booleanGlutenFree = Boolean.parseBoolean(glutenFree);
        boolean booleanLactoseFree = Boolean.parseBoolean(lactoseFree);
        boolean booleanDiabetesFriendly = Boolean.parseBoolean(diabetesFriendly);
        if (Objects.equals(name, "any")) {
            name = "";
        }
        if (Objects.equals(glutenFree, "false") && Objects.equals(diabetesFriendly, "false") && Objects.equals(lactoseFree, "false"))
        {
            dailyPlans = dailyPlanService.findAllDailyPlansByName(name);
        }
        else if (Objects.equals(glutenFree, "true") && Objects.equals(diabetesFriendly, "false") && Objects.equals(lactoseFree, "false"))
        {
            dailyPlans = dailyPlanService.findAllDailyPlansGlutenFree(name);
        }
        else if (Objects.equals(glutenFree, "false") && Objects.equals(diabetesFriendly, "true") && Objects.equals(lactoseFree, "false"))
        {
            dailyPlans = dailyPlanService.findAllDailyPlansDiabetesFriendly(name);
        }
        else if (Objects.equals(glutenFree, "false") && Objects.equals(diabetesFriendly, "false") && Objects.equals(lactoseFree, "true"))
        {
            dailyPlans = dailyPlanService.findAllDailyPlansLactoseIntolerant(name);
        }
        else if (Objects.equals(glutenFree, "true") && Objects.equals(diabetesFriendly, "true") && Objects.equals(lactoseFree, "false"))
        {
            dailyPlans = dailyPlanService.findAllDailyPlansGlutenFreeDiabetesFriendly(name);
        }
        else if (Objects.equals(glutenFree, "true") && Objects.equals(diabetesFriendly, "false") && Objects.equals(lactoseFree, "true"))
        {
            dailyPlans = dailyPlanService.findAllDailyPlansGlutenFreeLactoseFree(name);
        }
        else if (Objects.equals(glutenFree, "false") && Objects.equals(diabetesFriendly, "true") && Objects.equals(lactoseFree, "true"))
        {
            dailyPlans = dailyPlanService.findAllDailyPlansDiabetesFriendlyLactoseFree(name);
        }
        else {
            dailyPlans = dailyPlanService.findAllDailyPlansFullyFiltered(name, booleanGlutenFree, booleanLactoseFree, booleanDiabetesFriendly);
        }

        User myUser = userService.findUserById(Integer.parseInt(userId));
        dailyPlans = dailyPlanService.filterByUser(dailyPlans, myUser);
        return new ResponseEntity<>(dailyPlans, HttpStatus.OK);
    }

    @GetMapping("/all/favouriteByUserfullyFiltered/{user}/{name}/{glutenFree}/{lactoseFree}/{diabetesFriendly}")
    public ResponseEntity<List<DailyPlan>> getAllDailyPlansFavouriteByUserFullyFiltered(@PathVariable("user") String userId,
                                                                               @PathVariable("name") String name,
                                                                               @PathVariable("glutenFree") String glutenFree,
                                                                               @PathVariable("lactoseFree") String lactoseFree,
                                                                               @PathVariable("diabetesFriendly") String diabetesFriendly) throws Throwable {
        List<DailyPlan> dailyPlans;
        boolean booleanGlutenFree = Boolean.parseBoolean(glutenFree);
        boolean booleanLactoseFree = Boolean.parseBoolean(lactoseFree);
        boolean booleanDiabetesFriendly = Boolean.parseBoolean(diabetesFriendly);
        if (Objects.equals(name, "any")) {
            name = "";
        }
        if (Objects.equals(glutenFree, "false") && Objects.equals(diabetesFriendly, "false") && Objects.equals(lactoseFree, "false"))
        {
            dailyPlans = dailyPlanService.findAllDailyPlansByName(name);
        }
        else if (Objects.equals(glutenFree, "true") && Objects.equals(diabetesFriendly, "false") && Objects.equals(lactoseFree, "false"))
        {
            dailyPlans = dailyPlanService.findAllDailyPlansGlutenFree(name);
        }
        else if (Objects.equals(glutenFree, "false") && Objects.equals(diabetesFriendly, "true") && Objects.equals(lactoseFree, "false"))
        {
            dailyPlans = dailyPlanService.findAllDailyPlansDiabetesFriendly(name);
        }
        else if (Objects.equals(glutenFree, "false") && Objects.equals(diabetesFriendly, "false") && Objects.equals(lactoseFree, "true"))
        {
            dailyPlans = dailyPlanService.findAllDailyPlansLactoseIntolerant(name);
        }
        else if (Objects.equals(glutenFree, "true") && Objects.equals(diabetesFriendly, "true") && Objects.equals(lactoseFree, "false"))
        {
            dailyPlans = dailyPlanService.findAllDailyPlansGlutenFreeDiabetesFriendly(name);
        }
        else if (Objects.equals(glutenFree, "true") && Objects.equals(diabetesFriendly, "false") && Objects.equals(lactoseFree, "true"))
        {
            dailyPlans = dailyPlanService.findAllDailyPlansGlutenFreeLactoseFree(name);
        }
        else if (Objects.equals(glutenFree, "false") && Objects.equals(diabetesFriendly, "true") && Objects.equals(lactoseFree, "true"))
        {
            dailyPlans = dailyPlanService.findAllDailyPlansDiabetesFriendlyLactoseFree(name);
        }
        else {
            dailyPlans = dailyPlanService.findAllDailyPlansFullyFiltered(name, booleanGlutenFree, booleanLactoseFree, booleanDiabetesFriendly);
        }

        User myUser = userService.findUserById(Integer.parseInt(userId));

        Set<Integer> planIds = myUser.getFavouriteDailyPlanIds();
        dailyPlans.removeIf(dailyPlan -> !planIds.contains(dailyPlan.getId()));

        return new ResponseEntity<>(dailyPlans, HttpStatus.OK);
    }


    @GetMapping("/all/fullyFilteredByType/{name}/{glutenFree}/{lactoseFree}/{diabetesFriendly}/{type}")
    public ResponseEntity<List<DailyPlan>> getAllDailyPlansFullyFilteredByType(@PathVariable("name") String name,
                                                            @PathVariable("glutenFree") String glutenFree,
                                                            @PathVariable("lactoseFree") String lactoseFree,
                                                            @PathVariable("diabetesFriendly") String diabetesFriendly,
                                                            @PathVariable("type") String type){
        System.out.println(type);
        List<DailyPlan> dailyPlans;
        boolean booleanGlutenFree = Boolean.parseBoolean(glutenFree);
        boolean booleanLactoseFree = Boolean.parseBoolean(lactoseFree);
        boolean booleanDiabetesFriendly = Boolean.parseBoolean(diabetesFriendly);
        if (Objects.equals(name, "any")) {
            name = "";
        }
        if (Objects.equals(glutenFree, "false") && Objects.equals(diabetesFriendly, "false") && Objects.equals(lactoseFree, "false"))
        {
            System.out.println("went here");
            dailyPlans = dailyPlanService.findAllDailyPlansByNameByType(name, type);
            return new ResponseEntity<>(dailyPlans, HttpStatus.OK);
        }
        if (Objects.equals(glutenFree, "true") && Objects.equals(diabetesFriendly, "false") && Objects.equals(lactoseFree, "false"))
        {
            dailyPlans = dailyPlanService.findAllDailyPlansGlutenFreeByType(name, type);
            return new ResponseEntity<>(dailyPlans, HttpStatus.OK);
        }
        else if (Objects.equals(glutenFree, "false") && Objects.equals(diabetesFriendly, "true") && Objects.equals(lactoseFree, "false"))
        {
            dailyPlans = dailyPlanService.findAllDailyPlansDiabetesFriendlyByType(name, type);
            return new ResponseEntity<>(dailyPlans, HttpStatus.OK);
        }
        else if (Objects.equals(glutenFree, "false") && Objects.equals(diabetesFriendly, "false") && Objects.equals(lactoseFree, "true"))
        {
            dailyPlans = dailyPlanService.findAllDailyPlansLactoseIntolerantByType(name, type);
            return new ResponseEntity<>(dailyPlans, HttpStatus.OK);
        }
        else if (Objects.equals(glutenFree, "true") && Objects.equals(diabetesFriendly, "true") && Objects.equals(lactoseFree, "false"))
        {
            dailyPlans = dailyPlanService.findAllDailyPlansGlutenFreeDiabetesFriendlyByType(name, type);
            return new ResponseEntity<>(dailyPlans, HttpStatus.OK);
        }
        else if (Objects.equals(glutenFree, "true") && Objects.equals(diabetesFriendly, "false") && Objects.equals(lactoseFree, "true"))
        {
            dailyPlans = dailyPlanService.findAllDailyPlansGlutenFreeLactoseFreeByType(name, type);
            return new ResponseEntity<>(dailyPlans, HttpStatus.OK);
        }
        else if (Objects.equals(glutenFree, "false") && Objects.equals(diabetesFriendly, "true") && Objects.equals(lactoseFree, "true"))
        {
            dailyPlans = dailyPlanService.findAllDailyPlansDiabetesFriendlyLactoseFreeByType(name, type);
            return new ResponseEntity<>(dailyPlans, HttpStatus.OK);
        }

        dailyPlans = dailyPlanService.findAllDailyPlansFullyFiltered(name, booleanGlutenFree, booleanLactoseFree, booleanDiabetesFriendly);
        return new ResponseEntity<>(dailyPlans, HttpStatus.OK);
    }

    @GetMapping("/all/byUserfullyFilteredByType/{user}/{name}/{glutenFree}/{lactoseFree}/{diabetesFriendly}/{type}")
    public ResponseEntity<List<DailyPlan>> getAllDailyPlansByUserFullyFilteredByType(@PathVariable("user") String userId,
                                                                                     @PathVariable("name") String name,
                                                                                     @PathVariable("glutenFree") String glutenFree,
                                                                                     @PathVariable("lactoseFree") String lactoseFree,
                                                                                     @PathVariable("diabetesFriendly") String diabetesFriendly,
                                                                                     @PathVariable("type") String type) throws Throwable {
        System.out.println(type);
        List<DailyPlan> dailyPlans;
        boolean booleanGlutenFree = Boolean.parseBoolean(glutenFree);
        boolean booleanLactoseFree = Boolean.parseBoolean(lactoseFree);
        boolean booleanDiabetesFriendly = Boolean.parseBoolean(diabetesFriendly);
        if (Objects.equals(name, "any")) {
            name = "";
        }
        if (Objects.equals(glutenFree, "false") && Objects.equals(diabetesFriendly, "false") && Objects.equals(lactoseFree, "false"))
        {
            System.out.println("went here");
            dailyPlans = dailyPlanService.findAllDailyPlansByNameByType(name, type);
        }
        else if (Objects.equals(glutenFree, "true") && Objects.equals(diabetesFriendly, "false") && Objects.equals(lactoseFree, "false"))
        {
            dailyPlans = dailyPlanService.findAllDailyPlansGlutenFreeByType(name, type);
        }
        else if (Objects.equals(glutenFree, "false") && Objects.equals(diabetesFriendly, "true") && Objects.equals(lactoseFree, "false"))
        {
            dailyPlans = dailyPlanService.findAllDailyPlansDiabetesFriendlyByType(name, type);
        }
        else if (Objects.equals(glutenFree, "false") && Objects.equals(diabetesFriendly, "false") && Objects.equals(lactoseFree, "true"))
        {
            dailyPlans = dailyPlanService.findAllDailyPlansLactoseIntolerantByType(name, type);
        }
        else if (Objects.equals(glutenFree, "true") && Objects.equals(diabetesFriendly, "true") && Objects.equals(lactoseFree, "false"))
        {
            dailyPlans = dailyPlanService.findAllDailyPlansGlutenFreeDiabetesFriendlyByType(name, type);
        }
        else if (Objects.equals(glutenFree, "true") && Objects.equals(diabetesFriendly, "false") && Objects.equals(lactoseFree, "true"))
        {
            dailyPlans = dailyPlanService.findAllDailyPlansGlutenFreeLactoseFreeByType(name, type);
        }
        else if (Objects.equals(glutenFree, "false") && Objects.equals(diabetesFriendly, "true") && Objects.equals(lactoseFree, "true"))
        {
            dailyPlans = dailyPlanService.findAllDailyPlansDiabetesFriendlyLactoseFreeByType(name, type);
        }
        else {
            dailyPlans = dailyPlanService.findAllDailyPlansFullyFiltered(name, booleanGlutenFree, booleanLactoseFree, booleanDiabetesFriendly);
        }
        User myUser = userService.findUserById(Integer.parseInt(userId));
        dailyPlans = dailyPlanService.filterByUser(dailyPlans, myUser);
        return new ResponseEntity<>(dailyPlans, HttpStatus.OK);
    }

    @GetMapping("/all/favouriteByUserfullyFilteredByType/{user}/{name}/{glutenFree}/{lactoseFree}/{diabetesFriendly}/{type}")
    public ResponseEntity<List<DailyPlan>> getAllDailyPlansFavouriteByUserFullyFilteredByType(@PathVariable("user") String userId,
                                                                                     @PathVariable("name") String name,
                                                                                     @PathVariable("glutenFree") String glutenFree,
                                                                                     @PathVariable("lactoseFree") String lactoseFree,
                                                                                     @PathVariable("diabetesFriendly") String diabetesFriendly,
                                                                                     @PathVariable("type") String type) throws Throwable {
        System.out.println(type);
        List<DailyPlan> dailyPlans;
        boolean booleanGlutenFree = Boolean.parseBoolean(glutenFree);
        boolean booleanLactoseFree = Boolean.parseBoolean(lactoseFree);
        boolean booleanDiabetesFriendly = Boolean.parseBoolean(diabetesFriendly);
        if (Objects.equals(name, "any")) {
            name = "";
        }
        if (Objects.equals(glutenFree, "false") && Objects.equals(diabetesFriendly, "false") && Objects.equals(lactoseFree, "false"))
        {
            System.out.println("went here");
            dailyPlans = dailyPlanService.findAllDailyPlansByNameByType(name, type);
        }
        else if (Objects.equals(glutenFree, "true") && Objects.equals(diabetesFriendly, "false") && Objects.equals(lactoseFree, "false"))
        {
            dailyPlans = dailyPlanService.findAllDailyPlansGlutenFreeByType(name, type);
        }
        else if (Objects.equals(glutenFree, "false") && Objects.equals(diabetesFriendly, "true") && Objects.equals(lactoseFree, "false"))
        {
            dailyPlans = dailyPlanService.findAllDailyPlansDiabetesFriendlyByType(name, type);
        }
        else if (Objects.equals(glutenFree, "false") && Objects.equals(diabetesFriendly, "false") && Objects.equals(lactoseFree, "true"))
        {
            dailyPlans = dailyPlanService.findAllDailyPlansLactoseIntolerantByType(name, type);
        }
        else if (Objects.equals(glutenFree, "true") && Objects.equals(diabetesFriendly, "true") && Objects.equals(lactoseFree, "false"))
        {
            dailyPlans = dailyPlanService.findAllDailyPlansGlutenFreeDiabetesFriendlyByType(name, type);
        }
        else if (Objects.equals(glutenFree, "true") && Objects.equals(diabetesFriendly, "false") && Objects.equals(lactoseFree, "true"))
        {
            dailyPlans = dailyPlanService.findAllDailyPlansGlutenFreeLactoseFreeByType(name, type);
        }
        else if (Objects.equals(glutenFree, "false") && Objects.equals(diabetesFriendly, "true") && Objects.equals(lactoseFree, "true"))
        {
            dailyPlans = dailyPlanService.findAllDailyPlansDiabetesFriendlyLactoseFreeByType(name, type);
        }
        else {
            dailyPlans = dailyPlanService.findAllDailyPlansFullyFiltered(name, booleanGlutenFree, booleanLactoseFree, booleanDiabetesFriendly);
        }
        User myUser = userService.findUserById(Integer.parseInt(userId));

        Set<Integer> planIds = myUser.getFavouriteDailyPlanIds();
        dailyPlans.removeIf(dailyPlan -> !planIds.contains(dailyPlan.getId()));

        return new ResponseEntity<>(dailyPlans, HttpStatus.OK);
    }

    @GetMapping("/find")
    public ResponseEntity<DailyPlan> getDailyPlanById(@RequestBody String id) throws Throwable {
        DailyPlan dailyPlan = dailyPlanService.findDailyPlanById(Integer.parseInt(id));
        return new ResponseEntity<>(dailyPlan, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<DailyPlan> getDailyPlanByIdPath(@PathVariable("id") String id) throws Throwable {
        DailyPlan dailyPlan = dailyPlanService.findDailyPlanById(Integer.parseInt(id));
        return new ResponseEntity<>(dailyPlan, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<DailyPlan> addDailyPlan(
            @RequestParam("file") MultipartFile file, @RequestParam("dailyPlan") String dailyPlanJson
//            @RequestBody DailyPlan dailyPlan
    ) throws IOException {
        DailyPlan dailyPlan = new ObjectMapper().readValue(dailyPlanJson, DailyPlan.class);
        dailyPlan.setImageName(file.getOriginalFilename());
        dailyPlan.setImageContentType(file.getContentType());
        dailyPlan.setImageData(file.getBytes());
        DailyPlan newDailyPlan = dailyPlanService.addDailyPlan(dailyPlan);
        return new ResponseEntity<>(newDailyPlan, HttpStatus.CREATED);
    }

    @PutMapping("/updateWithImage")
    public ResponseEntity<DailyPlan> updateDailyPlanWithImage(
            @RequestParam("file") MultipartFile file, @RequestParam("dailyPlan") String dailyPlanJson
    ) throws IOException {
        DailyPlan dailyPlan = new ObjectMapper().readValue(dailyPlanJson, DailyPlan.class);
        dailyPlan.setImageName(file.getOriginalFilename());
        dailyPlan.setImageContentType(file.getContentType());
        dailyPlan.setImageData(file.getBytes());
        DailyPlan newDailyPlan = dailyPlanService.updateDailyPlan(dailyPlan);
        return new ResponseEntity<>(newDailyPlan, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<DailyPlan> updateDailyPlan(@RequestBody DailyPlan dailyPlan){
        DailyPlan newDailyPlan = dailyPlanService.updateDailyPlan(dailyPlan);
        return new ResponseEntity<>(newDailyPlan, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteDailyPlan(@PathVariable("id") String id){
        dailyPlanService.deleteDailyPlanById(Integer.parseInt(id));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/deleteFromUser/{id}")
    public ResponseEntity<?> deleteDailyPlanFromUser(@PathVariable("id") String id) throws Throwable {
        User user = userService.findUserById(Integer.parseInt(id));
        dailyPlanService.deleteDailyPlansFromUser(user);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{dailyPlanId}/image")
    public ResponseEntity<Resource> getDailyPlanImage(@PathVariable int dailyPlanId) throws Throwable {
        // Retrieve the image data for the user with the specified userId
        byte[] imageData = dailyPlanService.getUserImage(dailyPlanId);

        // Create a ByteArrayResource from the image data
        ByteArrayResource resource = new ByteArrayResource(imageData);

        // Build the response with appropriate headers and content type
        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=image.jpg")
                .contentType(MediaType.IMAGE_JPEG)
                .body(resource);
    }
}