package com.example.nutrilifeserver.model;

import jakarta.persistence.*;


@Entity
@Table(name = "weeklyPlan")
public class WeeklyPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    private int id;
    private String name;

    @ManyToOne
    @JoinColumn(name="mondayPlanId")
    private DailyPlan mondayPlan;

    @ManyToOne
    @JoinColumn(name="tuesdayPlanId")
    private DailyPlan tuesdayPlan;

    @ManyToOne
    @JoinColumn(name="wednesdayPlanId")
    private DailyPlan wednesdayPlan;

    @ManyToOne
    @JoinColumn(name="thursdayPlanId")
    private DailyPlan thursdayPlan;

    @ManyToOne
    @JoinColumn(name="fridayPlanId")
    private DailyPlan fridayPlan;

    @ManyToOne
    @JoinColumn(name="saturdayPlanId")
    private DailyPlan saturdayPlan;

    @ManyToOne
    @JoinColumn(name="sundayPlanId")
    private DailyPlan sundayPlan;

    private String totalCalories;
    private String hearts;

    @ManyToOne
    @JoinColumn(name="userId")
    private User user;

    public WeeklyPlan() {
    }

    public WeeklyPlan(int id, String name, DailyPlan mondayPlan, DailyPlan tuesdayPlan, DailyPlan wednesdayPlan, DailyPlan thursdayPlan, DailyPlan fridayPlan, DailyPlan saturdayPlan, DailyPlan sundayPlan, String totalCalories, String hearts, User user) {
        this.id = id;
        this.name = name;
        this.mondayPlan = mondayPlan;
        this.tuesdayPlan = tuesdayPlan;
        this.wednesdayPlan = wednesdayPlan;
        this.thursdayPlan = thursdayPlan;
        this.fridayPlan = fridayPlan;
        this.saturdayPlan = saturdayPlan;
        this.sundayPlan = sundayPlan;
        this.totalCalories = totalCalories;
        this.hearts = hearts;
        this.user = user;
    }

    public WeeklyPlan(String name, DailyPlan mondayPlan, DailyPlan tuesdayPlan, DailyPlan wednesdayPlan, DailyPlan thursdayPlan, DailyPlan fridayPlan, DailyPlan saturdayPlan, DailyPlan sundayPlan, String totalCalories, String hearts, User user) {
        this.name = name;
        this.mondayPlan = mondayPlan;
        this.tuesdayPlan = tuesdayPlan;
        this.wednesdayPlan = wednesdayPlan;
        this.thursdayPlan = thursdayPlan;
        this.fridayPlan = fridayPlan;
        this.saturdayPlan = saturdayPlan;
        this.sundayPlan = sundayPlan;
        this.totalCalories = totalCalories;
        this.hearts = hearts;
        this.user = user;
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

    public DailyPlan getMondayPlan() {
        return mondayPlan;
    }

    public void setMondayPlan(DailyPlan mondayPlan) {
        this.mondayPlan = mondayPlan;
    }

    public DailyPlan getTuesdayPlan() {
        return tuesdayPlan;
    }

    public void setTuesdayPlan(DailyPlan tuesdayPlan) {
        this.tuesdayPlan = tuesdayPlan;
    }

    public DailyPlan getWednesdayPlan() {
        return wednesdayPlan;
    }

    public void setWednesdayPlan(DailyPlan wednesdayPlan) {
        this.wednesdayPlan = wednesdayPlan;
    }

    public DailyPlan getThursdayPlan() {
        return thursdayPlan;
    }

    public void setThursdayPlan(DailyPlan thursdayPlan) {
        this.thursdayPlan = thursdayPlan;
    }

    public DailyPlan getFridayPlan() {
        return fridayPlan;
    }

    public void setFridayPlan(DailyPlan fridayPlan) {
        this.fridayPlan = fridayPlan;
    }

    public DailyPlan getSaturdayPlan() {
        return saturdayPlan;
    }

    public void setSaturdayPlan(DailyPlan saturdayPlan) {
        this.saturdayPlan = saturdayPlan;
    }

    public DailyPlan getSundayPlan() {
        return sundayPlan;
    }

    public void setSundayPlan(DailyPlan sundayPlan) {
        this.sundayPlan = sundayPlan;
    }

    public String getTotalCalories() {
        return totalCalories;
    }

    public void setTotalCalories(String totalCalories) {
        this.totalCalories = totalCalories;
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

    @Override
    public String toString() {
        return "WeeklyPlan{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", mondayPlan=" + mondayPlan +
                ", tuesdayPlan=" + tuesdayPlan +
                ", wednesdayPlan=" + wednesdayPlan +
                ", thursdayPlan=" + thursdayPlan +
                ", fridayPlan=" + fridayPlan +
                ", saturdayPlan=" + saturdayPlan +
                ", sundayPlan=" + sundayPlan +
                ", totalCalories='" + totalCalories + '\'' +
                ", hearts='" + hearts + '\'' +
                ", user=" + user +
                '}';
    }
}
