package com.example.nutrilifeserver.model;

import jakarta.persistence.*;
import java.io.Serializable;


@Entity
@Table(name = "account")
/*
5. Data Transfer Object Pattern

    DTO is another well-known and often used design pattern.
    It introduces one or more classes to model a data structure employed by a specific
    use case or by the API of your application. A DTO is a simple Java class that aims to
    transfer and provide access to its data in the most efficient way.
 */
public class Account implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String username;
    private String password;
    private String email;
    private String type;

    public Account() {
    }

    public Account(int id, String username, String password, String email, String type) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.type = type;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public String toString() {
        return "Account{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", type='" + type + '\'' +
                '}';
    }
}