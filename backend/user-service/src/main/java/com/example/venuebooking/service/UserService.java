package com.example.venuebooking.service;

import com.example.venuebooking.exception.ResourceNotFoundException;
import com.example.venuebooking.model.CustomUserDetails;
import com.example.venuebooking.model.ERole;
import com.example.venuebooking.model.User;
import com.example.venuebooking.payload.request.LoginRequest;
import com.example.venuebooking.payload.request.SignUpRequest;
import com.example.venuebooking.payload.response.ApiResponse;
import com.example.venuebooking.payload.response.JwtResponse;
import com.example.venuebooking.repository.UserRepository;
import com.example.venuebooking.security.jwt.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtils jwtUtils;

    //
    public ResponseEntity<?> signUpWithGoogle(User signUpUser) {
        if (userRepository.existsByUsername(signUpUser.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new ApiResponse(false, "Error: Username is already taken!"));
        }
        signUpUser.setRole(ERole.ROLE_USER);
        userRepository.save(signUpUser);
        return ResponseEntity.ok(new ApiResponse(true,"User registered successfully with ID: " + signUpUser.getId()));
    }

    // SIGN UP METHOD
    // Params: SignUpRequest contains necessary properties to sign up.
    public ResponseEntity<?> signUp(SignUpRequest signUpUser) {

        if (userRepository.existsByUsername(signUpUser.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body(new ApiResponse(false, "Error: Username is already taken!"));
        }
        // Encode password
        User user = new User(
                signUpUser.getUsername(),
                passwordEncoder.encode(signUpUser.getPassword()),
                signUpUser.getName(),
                signUpUser.getAddress(),
                signUpUser.getPhone());
        ERole userRole;
        switch (signUpUser.getRole().toLowerCase()) {
            case "admin":
                userRole = ERole.ROLE_ADMIN;
                break;
            case "user": default:
                userRole = ERole.ROLE_USER;
                break;
        }
        user.setRole(userRole);
        userRepository.save(user);
        return ResponseEntity.ok(new ApiResponse(true,"User registered successfully with ID: " + user.getId()));
    }

    // LOGIN METHOD
    public ResponseEntity<?> login(LoginRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(item -> item.getAuthority())
                .collect(Collectors.toList());

        return ResponseEntity.ok(new JwtResponse(jwt,
                userDetails.getId(),
                userDetails.getUsername(),
                roles.get(0)));
    }

    // ADD RESTAURANT
    public ResponseEntity<?> addRestaurantOwnership(String token, String restaurantId)  throws ResourceNotFoundException {
        String username = jwtUtils.getUserNameFromJwtToken(token);
        User user = userRepository.findByUsername(username).orElseThrow(() ->new ResourceNotFoundException("Invalid token"));
        if (user.getRestaurantIds().contains(restaurantId)) {
            return ResponseEntity
                    .badRequest()
                    .body(new ApiResponse(false, "Error: Restaurant has already been added!"));
        }
        user.getRestaurantIds().add(restaurantId);
        userRepository.save(user);
        return ResponseEntity.ok(new ApiResponse(true, "Successfully create ownership between " + username + " and restaurant with ID " + restaurantId));
    }

    // EDIT USER PROFILE
    public ResponseEntity<User> editUser (String token, User userUpdateInfo) throws ResourceNotFoundException {
        String username = jwtUtils.getUserNameFromJwtToken(token);
        User user = userRepository.findByUsername(username).orElseThrow(()->new ResourceNotFoundException("Invalid token for :: " + userUpdateInfo.getUsername()));
        user.setAddress(userUpdateInfo.getAddress());
        user.setName(userUpdateInfo.getName());
        user.setPhone(userUpdateInfo.getPhone());
        final User updatedUser = userRepository.save(user);
        return ResponseEntity.ok(updatedUser);
    }

    // EDIT PASSWORD
    // Todo: Password Validation
    public ResponseEntity<?> changePassword (String token, String password) throws ResourceNotFoundException {
        String username = jwtUtils.getUserNameFromJwtToken(token);
        User user = userRepository.findByUsername(username).orElseThrow(()->new ResourceNotFoundException("Invalid token"));
        user.setPassword(passwordEncoder.encode(password));
        return ResponseEntity.ok(new ApiResponse(true, "Change password successfully"));
    }

    // FIND USER BY ID (VIEW PROFILE)
    public ResponseEntity<User> findUserById(long id) throws ResourceNotFoundException {
        User user = userRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("User not found for this id :: " + id));
        return ResponseEntity.ok().body(user);
    }

    // FIND USER BY PART OF USERNAME (SEARCH USER)
    public List<User> findUserByUsername(String key) {
        return userRepository.findByUsernameContains(key);
    }

    // GET ALL USERS (NOT USED)
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    // DELETE USER (NOT USED)
    public boolean deleteUser(long id) throws ResourceNotFoundException {
        User user = userRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("User not found for this id :: " + id));
        userRepository.delete(user);
        return true;
    }
}
