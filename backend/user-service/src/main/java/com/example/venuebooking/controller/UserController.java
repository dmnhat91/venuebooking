package com.example.venuebooking.controller;

import com.example.venuebooking.exception.ResourceNotFoundException;
import com.example.venuebooking.model.User;
import com.example.venuebooking.payload.request.LoginRequest;
import com.example.venuebooking.payload.request.SignUpRequest;
import com.example.venuebooking.payload.response.ApiResponse;
import com.example.venuebooking.payload.response.JwtResponse;
import com.example.venuebooking.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    private UserService userService;

    // SIGN UP
    @PostMapping("/signUp/withGoogle")
    public ResponseEntity<?> signUpUserWithGoogle( @RequestBody User user) {
        return userService.signUpWithGoogle(user);
    }

    // SIGN UP
    @PostMapping("/signUp")
    public ResponseEntity<?> signUpUser(@Valid @RequestBody SignUpRequest signUpRequest) {
        return userService.signUp(signUpRequest);
    }

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> signUpUser(@Valid @RequestBody LoginRequest loginRequest) {
        return userService.login(loginRequest);
    }

    // ADD RESTAURANT FOR USER
    @PutMapping("/private/restaurants/{id}")
    public ResponseEntity<?> addRestaurantOwnership(@RequestParam String token, @PathVariable(value = "id") String restaurantId) throws ResourceNotFoundException {
        System.out.println("Token" + token);
        return userService.addRestaurantOwnership(token, restaurantId);
    }

    // EDIT USER PROFILE (Not include password and restaurant ids)
    @PutMapping("/private/edit")
    public ResponseEntity<User> editUser(@RequestParam String token, @RequestBody User userUpdateInfo) throws ResourceNotFoundException {
        return userService.editUser(token, userUpdateInfo);
    }

    // CHANGE PASSWORD
    @PutMapping("/private/password")
    public ResponseEntity<?> changeUserPassword(@RequestParam String token, @RequestBody String password) throws ResourceNotFoundException {
        return userService.changePassword(token, password);
    }

    // FIND ONE USER
    // Return: user profile
    // Todo: Should make private?
    @GetMapping("/{id}")
    public ResponseEntity<User> findUserById(@PathVariable long id) throws ResourceNotFoundException {
        return userService.findUserById(id);
    }

    // FIND USERS BY USERNAME (FOR TESTING PURPOSE ONLY)
    @GetMapping("/username/{key}")
    public List<User> findUsersByUsername(@PathVariable String key) {
        return userService.findUserByUsername(key);
    }

    // GET ALL USERS (FOR TESTING PURPOSE ONLY)
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getUsers();
    }

//    @DeleteMapping("/{id}")
//    public boolean deleteUser(@PathVariable long id) throws ResourceNotFoundException {
//        return userService.deleteUser(id);
//    }
}
