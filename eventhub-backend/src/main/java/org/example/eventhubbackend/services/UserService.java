package org.example.eventhubbackend.services;
import lombok.RequiredArgsConstructor;
import org.example.eventhubbackend.config.JwtService;
import org.example.eventhubbackend.entity.User;
import org.example.eventhubbackend.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    //inscription
    public User registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("Email dejà utilisé");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }
    // 🔹 se connecter → retourne JWT
    public String loginUser(String email, String password) {
        User existing = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Email ou mot de passe invalide"));

        if (!passwordEncoder.matches(password, existing.getPassword())) {
            throw new IllegalArgumentException("Email ou mot de passe invalide");
        }

        // génère token JWT
        return jwtService.generateToken(existing.getEmail());
    }
    // 🔹 Trouver user par email
    public User findByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Utilisateur introuvable"));
    }
}
