package com.example.nutrilifeserver.model;

import jakarta.persistence.*;
import java.io.Serializable;
import java.util.Arrays;
import java.util.Set;

@Entity
@Table(name = "users")
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private int id;
    private String firstName;
    private String middleName;
    private String lastName;
    private String age;
    private String gender;
    private String weight;
    private String height;

    private boolean glutenFree;
    private boolean lactoseIntolerant;
    private boolean diabetes;
    private String insulinIntake;

    @OneToOne
    @JoinColumn(name="accountId")
    private Account account;

    @ElementCollection
    private Set<Integer> favouriteDailyPlanIds;

    private String imageName;
    private String imageContentType;
    private byte[] imageData;

    public User() {
    }

    public User(int id, String firstName, String middleName, String lastName, String age, String gender, String weight, String height, boolean glutenFree, boolean lactoseIntolerant, boolean diabetes, String insulinIntake, Account account, Set<Integer> favouriteDailyPlanIds, String imageName, String imageContentType, byte[] imageData) {
        this.id = id;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.age = age;
        this.gender = gender;
        this.weight = weight;
        this.height = height;
        this.glutenFree = glutenFree;
        this.lactoseIntolerant = lactoseIntolerant;
        this.diabetes = diabetes;
        this.insulinIntake = insulinIntake;
        this.account = account;
        this.favouriteDailyPlanIds = favouriteDailyPlanIds;
        this.imageName = imageName;
        this.imageContentType = imageContentType;
        this.imageData = imageData;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getAge() {
        return age;
    }

    public void setAge(String age) {
        this.age = age;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getWeight() {
        return weight;
    }

    public void setWeight(String weight) {
        this.weight = weight;
    }

    public String getHeight() {
        return height;
    }

    public void setHeight(String height) {
        this.height = height;
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

    public boolean isDiabetes() {
        return diabetes;
    }

    public void setDiabetes(boolean diabetes) {
        this.diabetes = diabetes;
    }

    public String getInsulinIntake() {
        return insulinIntake;
    }

    public void setInsulinIntake(String insulinIntake) {
        this.insulinIntake = insulinIntake;
    }

    public Account getAccount() {
        return account;
    }

    public void setAccount(Account account) {
        this.account = account;
    }

    public Set<Integer> getFavouriteDailyPlanIds() {
        return favouriteDailyPlanIds;
    }

    public void setFavouriteDailyPlanIds(Set<Integer> favouriteDailyPlanIds) {
        this.favouriteDailyPlanIds = favouriteDailyPlanIds;
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

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", middleName='" + middleName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", age='" + age + '\'' +
                ", gender='" + gender + '\'' +
                ", weight='" + weight + '\'' +
                ", height='" + height + '\'' +
                ", glutenFree=" + glutenFree +
                ", lactoseIntolerant=" + lactoseIntolerant +
                ", diabetes=" + diabetes +
                ", insulinIntake='" + insulinIntake + '\'' +
                ", account=" + account +
                ", favouriteDailyPlanIds=" + favouriteDailyPlanIds +
                ", imageName='" + imageName + '\'' +
                ", imageContentType='" + imageContentType + '\'' +
                ", imageData=" + Arrays.toString(imageData) +
                '}';
    }
}
