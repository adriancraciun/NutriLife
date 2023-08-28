package com.example.nutrilifeserver.controller;

import com.example.nutrilifeserver.model.Account;
import com.example.nutrilifeserver.repository.AccountRepository;
import com.example.nutrilifeserver.repository.UserRepository;
import com.example.nutrilifeserver.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User addUser(User user){
        User newUser = new User();
        newUser.setFirstName(user.getFirstName());
        newUser.setMiddleName(user.getMiddleName());
        newUser.setLastName(user.getLastName());
        newUser.setAge(user.getAge());
        newUser.setGender(user.getGender());
        newUser.setWeight(user.getWeight());
        newUser.setHeight(user.getHeight());
        newUser.setGlutenFree(user.isGlutenFree());
        newUser.setLactoseIntolerant(user.isLactoseIntolerant());
        newUser.setDiabetes(user.isDiabetes());
        newUser.setInsulinIntake(user.getInsulinIntake());
        newUser.setAccount(user.getAccount());
        newUser.setImageName(user.getImageName());
        newUser.setImageContentType(user.getImageContentType());
        newUser.setImageData(user.getImageData());
        return userRepository.save(newUser);
    }

    public List<User> findAllUsers(){
        return userRepository.findAll();
    }

    @Transactional
    public User updateUser(User user){
        return userRepository.save(user);
    }

    public User findUserById(int id) throws Throwable {
        return userRepository.findUserById(id).
                orElseThrow(() -> new Exception("User by id " + id + " was not found"));
    }

    @Transactional
    public void deleteUserById(int id){
        userRepository.removeUserById(id);
    }

    public byte[] getUserImage(int userId) throws Throwable {
        // Assuming you have a UserService that handles user-related operations
        User user = this.findUserById(userId);

        if (user != null) {
            // Assuming the image data is stored as a byte array in the user object
            return user.getImageData();
        }

        // Return null or an empty byte array if user not found or no image data available
        return new byte[0];
    }

    @Transactional
    public void updateUserAccount(User user, Account account){
        user.setAccount(account);
        userRepository.save(user);
    }
}
