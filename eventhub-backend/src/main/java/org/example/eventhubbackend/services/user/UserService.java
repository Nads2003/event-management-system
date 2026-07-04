package org.example.eventhubbackend.services.user;

import lombok.RequiredArgsConstructor;
import org.example.eventhubbackend.config.JwtService;
import org.example.eventhubbackend.dto.auth.AuthResponse;
import org.example.eventhubbackend.entity.user.User;
import org.example.eventhubbackend.repository.user.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    // inscription
    public User registerUser(User user) {

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("Email déjà utilisé");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    // login
    public AuthResponse loginUser(String email, String password) {

        User existing = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException("Email ou mot de passe invalide"));

        if (!passwordEncoder.matches(password, existing.getPassword())) {
            throw new IllegalArgumentException("Email ou mot de passe invalide");
        }

        String token = jwtService.generateToken(existing.getEmail());

        return new AuthResponse(
                token,
                existing.getRole().name(),
                existing.getId()
        );
    }

    // find user
    public User findByEmail(String email) {

        return userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new IllegalArgumentException("Utilisateur introuvable"));
    }
}