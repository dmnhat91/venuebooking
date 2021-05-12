package venuebooking.controller;

import venuebooking.dom.RestaurantSearchByVenue;
import venuebooking.exception.ResourceNotFoundException;
import venuebooking.model.Restaurant;
import venuebooking.service.RestaurantService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping(value = "/restaurants")
@CrossOrigin(origins = "*",allowedHeaders = "*")
public class RestaurantController {

    @Autowired
    private RestaurantService restaurantService;

    @GetMapping
    public List<Restaurant> getAllRestaurants() {
        return restaurantService.getRestaurants();
    }

    @PostMapping
    public long createRestaurant(@RequestBody Restaurant restaurant) {
        return restaurantService.createRestaurant(restaurant);
    }

    @DeleteMapping("/{id}")
    public boolean deleteRestaurant(@PathVariable long id) throws ResourceNotFoundException {
        return restaurantService.deleteRestaurant(id);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Restaurant> editRestaurant(@PathVariable long id, @RequestBody Restaurant restaurantUpdateInfo) throws ResourceNotFoundException {
        return restaurantService.editRestaurant(id, restaurantUpdateInfo);
    }

    @RequestMapping("/searchid")
    public ResponseEntity<Restaurant> findRestaurantById(@RequestParam("id") long id) throws ResourceNotFoundException {
        return restaurantService.findRestaurantById(id);
    }

    @RequestMapping("/searchname")
    public List<Restaurant> findRestaurantsByName(@RequestParam("name") String name) {
        return restaurantService.findRestaurantByRestaurantName(name);
    }

    @RequestMapping("/searchlocation")
    public List<Restaurant> findRestaurantsByLocation(@RequestParam("location") String location) {
        return restaurantService.findRestaurantByLocation(location);
    }

    @RequestMapping("/search")
    public List<RestaurantSearchByVenue> findRestaurants(@RequestParam("location") String location, @RequestParam("name") String name, @RequestParam("eventType") String eventType, @RequestParam("minPrice") String minPrice, @RequestParam("maxPrice") String maxPrice) {
        return restaurantService.findRestaurants(location,name,eventType,minPrice,maxPrice);
    }

    @RequestMapping("/searchTopRating")
    public List<Restaurant> findTopRatingRestaurant() {
        return restaurantService.findTopRatingRestaurants();
    }

    @RequestMapping("/searchHotDeal")
    public List<Restaurant> findHotDealRestaurant() {
        return restaurantService.findHotDealRestaurants();
    }
}

