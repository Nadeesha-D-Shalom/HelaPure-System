// src/main/java/com/helapure/backend/controller/UserController.java
package com.app.HelaPure.controller;

import com.app.HelaPure.model.User;
import com.app.HelaPure.repository.UserRepository;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
@RestController
@RequestMapping("/api/users")
public class UserController {
    private UserRepository users;
    // ... your existing code (register, login, etc.)

    // Simple DTOs (fine to keep nested for now)
    public static class RegisterRequest {
        @NotBlank public String name;
        @NotBlank @Email public String email;
        @NotBlank public String password;
        public String role; // defaults later to USER
    }

    public static class LoginRequest {
        @NotBlank @Email public String email;
        @NotBlank public String password;
    }

    public static class UserResponse {
        public Long id;
        public String name;
        public String email;
        public String role;

        public UserResponse(User u) {
            this.id = u.getId();
            this.name = u.getName();
            this.email = u.getEmail();
            this.role = u.getRole();
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest req) {
        String email = req.email.trim().toLowerCase();
        if (users.existsByEmail(email)) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "Email already registered"));
        }

        User u = new User();
        u.setName(req.name.trim());
        u.setEmail(email); // normalize before storing
        u.setPassword(BCrypt.hashpw(req.password, BCrypt.gensalt())); // hash
        u.setRole((req.role == null || req.role.isBlank()) ? "USER" : req.role.trim());

        try {
            User saved = users.save(u);
            return ResponseEntity.status(HttpStatus.CREATED).body(new UserResponse(saved));
        } catch (DataIntegrityViolationException e) {
            // covers rare race where another request registered same email just now
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "Email already registered"));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest req) {
        String email = req.email.trim().toLowerCase();
        return users.findByEmail(email)
                .filter(u -> BCrypt.checkpw(req.password, u.getPassword()))
                .<ResponseEntity<?>>map(u -> ResponseEntity.ok(new UserResponse(u)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("message", "Invalid email or password")));
    }
}
