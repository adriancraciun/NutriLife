package com.example.nutrilifeserver.requests;

import com.example.nutrilifeserver.controller.AccountService;
import com.example.nutrilifeserver.controller.UserService;
import com.example.nutrilifeserver.model.Account;
import com.example.nutrilifeserver.model.DailyPlan;
import com.example.nutrilifeserver.model.User;
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
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserResource {
    private final UserService userService;

    @Autowired
    public UserResource(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<User>> getAllUsers(){
        List<User> books = userService.findAllUsers();
        return new ResponseEntity<>(books, HttpStatus.OK);
    }

    @GetMapping("/id/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable int userId) throws Throwable {
        User user = userService.findUserById(userId);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<User> addUser(@RequestParam("file") MultipartFile file,
                                        @RequestParam("user") String userJson) throws IOException {

        User user = new ObjectMapper().readValue(userJson, User.class);
        user.setImageName(file.getOriginalFilename());
        user.setImageContentType(file.getContentType());
        user.setImageData(file.getBytes());

        System.out.println("updating the account");

        User newUser = userService.addUser(user);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<User> updateUser(@RequestBody User user){
        User newUser = userService.updateUser(user);
        return new ResponseEntity<>(newUser, HttpStatus.OK);
    }

    @PutMapping("/updateWithImage")
    public ResponseEntity<User> updateUserWithImage(
            @RequestParam("file") MultipartFile file, @RequestParam("user") String userJson
    ) throws IOException {
        User user = new ObjectMapper().readValue(userJson, User.class);
        user.setImageName(file.getOriginalFilename());
        user.setImageContentType(file.getContentType());
        user.setImageData(file.getBytes());
        User newUser = userService.updateUser(user);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") String id){
        userService.deleteUserById(Integer.parseInt(id));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{userId}/image")
    public ResponseEntity<Resource> getUserImage(@PathVariable int userId) throws Throwable {
        // Retrieve the image data for the user with the specified userId
        byte[] imageData = userService.getUserImage(userId);

        // Create a ByteArrayResource from the image data
        ByteArrayResource resource = new ByteArrayResource(imageData);

        // Build the response with appropriate headers and content type
        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=image.jpg")
                .contentType(MediaType.IMAGE_JPEG)
                .body(resource);
    }
}