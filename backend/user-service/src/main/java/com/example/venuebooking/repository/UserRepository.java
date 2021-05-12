package com.example.venuebooking.repository;

import com.example.venuebooking.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    List<User> findByUsernameContains(String key);

    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);
}
