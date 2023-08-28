package com.example.nutrilifeserver.model;

import com.example.nutrilifeserver.model.User;
import jakarta.persistence.*;

import java.util.Arrays;

@Entity
@Table(name = "dailyPlan")
public class DailyPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private int id;
    private String name;
    private String breakfast;
    private String lunch;
    private String dinner;
    private String snack;
    private String calories;
    private String type;
    private boolean glutenFree;
    private boolean lactoseIntolerant;
    private boolean diabetesFriendly;
    private String hearts;

    /*
     5. Observer Pattern
     When using relations between our tables(objects) in java spring hibernate with jakarta, and we make a change to an
     object, all the other objects will get notified and change accordingly.
     */
    @ManyToOne
    @JoinColumn(name="userId")
    private User user;

    private String imageName;
    private String imageContentType;
    private byte[] imageData;

    @Column(length = 1001)
    private String comments;

    public DailyPlan() {
    }

    public DailyPlan(int id, String name, String breakfast, String lunch, String dinner, String snack, String calories, String type, boolean glutenFree, boolean lactoseIntolerant, boolean diabetesFriendly, String hearts, User user, String imageName, String imageContentType, byte[] imageData, String comments) {
        this.id = id;
        this.name = name;
        this.breakfast = breakfast;
        this.lunch = lunch;
        this.dinner = dinner;
        this.snack = snack;
        this.calories = calories;
        this.type = type;
        this.glutenFree = glutenFree;
        this.lactoseIntolerant = lactoseIntolerant;
        this.diabetesFriendly = diabetesFriendly;
        this.hearts = hearts;
        this.user = user;
        this.imageName = imageName;
        this.imageContentType = imageContentType;
        this.imageData = imageData;
        this.comments = comments;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBreakfast() {
        return breakfast;
    }

    public void setBreakfast(String breakfast) {
        this.breakfast = breakfast;
    }

    public String getLunch() {
        return lunch;
    }

    public void setLunch(String lunch) {
        this.lunch = lunch;
    }

    public String getDinner() {
        return dinner;
    }

    public void setDinner(String dinner) {
        this.dinner = dinner;
    }

    public String getSnack() {
        return snack;
    }

    public void setSnack(String snack) {
        this.snack = snack;
    }

    public String getCalories() {
        return calories;
    }

    public void setCalories(String calories) {
        this.calories = calories;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public boolean isGlutenFree() {
        return glutenFree;
    }

    public void setGlutenFree(boolean glutenFree) {
        this.glutenFree = glutenFree;
    }

    public boolean isLactoseIntolerant() {
        return lactoseIntolerant;
    }

    public void setLactoseIntolerant(boolean lactoseIntolerant) {
        this.lactoseIntolerant = lactoseIntolerant;
    }

    public boolean isDiabetesFriendly() {
        return diabetesFriendly;
    }

    public void setDiabetesFriendly(boolean diabetesFriendly) {
        this.diabetesFriendly = diabetesFriendly;
    }

    public String getHearts() {
        return hearts;
    }

    public void setHearts(String hearts) {
        this.hearts = hearts;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getImageName() {
        return imageName;
    }

    public void setImageName(String imageName) {
        this.imageName = imageName;
    }

    public String getImageContentType() {
        return imageContentType;
    }

    public void setImageContentType(String imageContentType) {
        this.imageContentType = imageContentType;
    }

    public byte[] getImageData() {
        return imageData;
    }

    public void setImageData(byte[] imageData) {
        this.imageData = imageData;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }

    @Override
    public String toString() {
        return "DailyPlan{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", breakfast='" + breakfast + '\'' +
                ", lunch='" + lunch + '\'' +
                ", dinner='" + dinner + '\'' +
                ", snack='" + snack + '\'' +
                ", calories='" + calories + '\'' +
                ", type='" + type + '\'' +
                ", glutenFree=" + glutenFree +
                ", lactoseIntolerant=" + lactoseIntolerant +
                ", diabetesFriendly=" + diabetesFriendly +
                ", hearts='" + hearts + '\'' +
                ", user=" + user +
                ", imageName='" + imageName + '\'' +
                ", imageContentType='" + imageContentType + '\'' +
                ", imageData=" + Arrays.toString(imageData) +
                ", comments='" + comments + '\'' +
                '}';
    }
}
