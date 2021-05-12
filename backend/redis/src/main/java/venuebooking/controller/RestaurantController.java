package venuebooking.controller;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import venuebooking.dom.RestaurantSearchByVenue;
import venuebooking.model.Restaurant;
import venuebooking.service.RestaurantService;

// In this class, we have left the caching approach for tutorial simplicity.
// If users which they can enabling caching in this application.
@RestController
@CrossOrigin(origins = "*",allowedHeaders = "*")
@RequestMapping(value = "/api/redis/restaurant")
public class RestaurantController {

    private static final Logger LOG = LoggerFactory.getLogger(RestaurantController.class);

    @Autowired
    RestaurantService service;

    // Save a new restaurant.
    // Url - http://localhost:10091/api/redis/restaurant
    @PostMapping
    public String save(@RequestBody final List<RestaurantSearchByVenue> listRestaurant) {
        LOG.info("Saving the new restaurant to the redis.");
//        service.save(test);
        service.save(listRestaurant);
        return "add success";
    }

    // Get all restaurants.
    // Url - http://localhost:10091/api/redis/restaurant/getall
    @GetMapping("/getall")
    public Map<Long, RestaurantSearchByVenue> findAll() {
        LOG.info("Fetching all restaurants from the redis.");
        final Map<Long, RestaurantSearchByVenue> restaurantMap = service.findAll();
        // Todo - If developers like they can sort the map (optional).
        return restaurantMap;
    }


    @GetMapping("/test")
    public int findTest() {
        return 123;
    }

    @RequestMapping("/search")
    public List<RestaurantSearchByVenue> findRestaurants(@RequestParam("location") String location, @RequestParam("name") String name, @RequestParam("eventType") String eventType, @RequestParam("minPrice") String minPrice, @RequestParam("maxPrice") String maxPrice) {
        return service.searchRestaurant(location,name,eventType,minPrice,maxPrice);
    }

    // Get restaurant by id.
    // Url - http://localhost:10091/api/redis/restaurant/get/<restaurant_id>
    @GetMapping("/get/{id}")
    public RestaurantSearchByVenue findById(@PathVariable("id") final String id) {
        LOG.info("Fetching restaurant with id= " + id);
        return service.findById(id);
    }

//    @RequestMapping("/searchname")
//    public List<Restaurant> findRestaurantsByName(@RequestParam("name") String name) {
//        LOG.info("Fetching restaurant with name= " + name);
//        return service.findRestaurantByRestaurantName(name);
//    }

//    @GetMapping("/searchname/{name}")
//    public List<Restaurant> findRestaurantsByName(@PathVariable("name") final String name) {
//        LOG.info("Fetching restaurant with name= " + name);
//        return service.findRestaurantByRestaurantName(name);
//    }
    // Delete restaurant by id.
    // Url - http://localhost:10091/api/redis/restaurant/delete/<restaurant_id>
    @DeleteMapping("/delete/{id}")
    public Map<Long, RestaurantSearchByVenue> delete(@PathVariable("id") final String id) {
        LOG.info("Deleting restaurant with id= " + id);
        // Deleting the restaurant.
        service.delete(id);
        // Returning the all restaurants (post the deleted one).
        return findAll();
    }
}
