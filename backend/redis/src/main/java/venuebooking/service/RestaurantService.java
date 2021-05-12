package venuebooking.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import javax.annotation.PostConstruct;

import org.apache.juli.logging.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import venuebooking.dao.RestaurantSearchByVenueRepo;
import venuebooking.dom.RestaurantSearchByVenue;
import venuebooking.model.Restaurant;

@Service
public class RestaurantService implements RestaurantSearchByVenueRepo {

    private final String RESTAURANT_CACHE = "RESTAURANT_CACHE";

    @Autowired
    RedisTemplate<String, Object> redisTemplate;
    private HashOperations<String, Long, RestaurantSearchByVenue> hashOperations;

    // This annotation makes sure that the method needs to be executed after
    // dependency injection is done to perform any initialization.
    @PostConstruct
    private void intializeHashOperations() {
        hashOperations = redisTemplate.opsForHash();
        redisTemplate.expire(RESTAURANT_CACHE, 5, TimeUnit.MINUTES);
    }

    // Save operation.
    @Override
    public void save(final List<RestaurantSearchByVenue> listRestaurant) {
        for(RestaurantSearchByVenue restaurant : listRestaurant) {
            hashOperations.put(RESTAURANT_CACHE, restaurant.getId(), restaurant);
        }
    }


    // Find by restaurant id operation.
    @Override
    public RestaurantSearchByVenue findById(final String id) {
        return (RestaurantSearchByVenue) hashOperations.get(RESTAURANT_CACHE, id);
    }

//    @Override
//    public List<RestaurantSearchByVenue> findRestaurantByRestaurantName(String name) {
//        return null;
//    }


    @Override
    public List<RestaurantSearchByVenue> searchRestaurant(String location, String name, String eventType, String _minPrice, String _maxPrice) {
        List<RestaurantSearchByVenue> result = new ArrayList<>();
        Map<Long, RestaurantSearchByVenue> res_list = hashOperations.entries(RESTAURANT_CACHE);
        System.out.println(location + " " + name + " " + eventType + " " + _minPrice + " " + _maxPrice);
        if(_minPrice.equals("")) _minPrice="100000";

        if(_maxPrice.equals("")) _maxPrice="999000";
        long minPrice = Long.parseLong(_minPrice);
        long maxPrice = Long.parseLong(_maxPrice);
        System.out.println(minPrice);
        System.out.println(maxPrice);

        for(RestaurantSearchByVenue res : res_list.values()) {
            if (res.getPrice() >= minPrice) System.out.println("min price");
            if (res.getPrice() <= maxPrice) System.out.println("max price");
            System.out.println(res.getPrice());
            if(location.equals(res.getLocation())) {
                if(name.equals(res.getName()) || (res.getPrice() >= minPrice && res.getPrice() <= maxPrice)) {
                    System.out.println(res.getLocation());
                    result.add(res);
                }
            }
//            if(location.equals(res.getLocation()) || name.equals(res.getName()) || (res.getPrice() >= minPrice && res.getPrice() <= maxPrice) ) {
//                System.out.println(res.getLocation());
//                result.add(res);
//            }
        }
        return result;
    }

    // Find all restaurants operation.
    @Override
    public Map<Long, RestaurantSearchByVenue> findAll() {
        return hashOperations.entries(RESTAURANT_CACHE);
    }

    // Delete restaurant by id operation.
    @Override
    public void delete(String id) {
        hashOperations.delete(RESTAURANT_CACHE, id);
    }


    // Find by restaurant name operation.
//    @Override
//    public List<Restaurant> findRestaurantByRestaurantName(final String name) {
//        List<Restaurant> result = new ArrayList<>();
//        Map<Long, Restaurant> allRestaurant = findAll();
//        for (Long id : allRestaurant.keySet())
//        {
//            // search  for value
//            Restaurant restaurant = allRestaurant.get(id);
//            if(restaurant.getName().equals(name)) {
//                result.add(restaurant);
//            }
//        }
//        return result;
//    }
}
