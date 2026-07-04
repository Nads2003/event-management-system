package org.example.eventhubbackend.controllers.auth;
import org.example.eventhubbackend.dto.auth.AuthResponse;
import org.example.eventhubbackend.entity.user.User;
import org.example.eventhubbackend.services.user.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final UserService userService;
    public AuthController(UserService userService) {
        this.userService = userService;
    }
    //faire inscription des utilisateurs
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {

        try {
            User savedUser = userService.registerUser(user);
            return ResponseEntity.ok(savedUser);

        } catch (RuntimeException e) {
            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }
    //se connecter
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {

        try {

            AuthResponse response = userService.loginUser(
                    user.getEmail(),
                    user.getPassword()
            );

            return ResponseEntity.ok(response);

        } catch (IllegalArgumentException e) {

            return ResponseEntity
                    .badRequest()
                    .body(e.getMessage());
        }
    }
}
