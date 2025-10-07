// src/main/java/com/helapure/backend/dto/LoginResponse.java
package com.app.HelaPure.dto;

public class LoginResponse {
    private Long id;
    private String name;
    private String email;
    private String role;
    private String message;

    public LoginResponse(Long id, String name, String email, String role, String message) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.role = role;
        this.message = message;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getEmail() { return email; }
    public String getRole() { return role; }
    public String getMessage() { return message; }

    public void setId(Long id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setEmail(String email) { this.email = email; }
    public void setRole(String role) { this.role = role; }
    public void setMessage(String message) { this.message = message; }
}
