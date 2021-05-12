package venuebooking.dao;

import venuebooking.dom.RestaurantSearchByVenue;
import venuebooking.model.Restaurant;

import java.util.List;
import java.util.Map;

public interface RestaurantSearchByVenueRepo {
    void save(List<RestaurantSearchByVenue> restaurant);

    RestaurantSearchByVenue findById(String id);

//    List<RestaurantSearchByVenue> findRestaurantByRestaurantName(String name);

    Map<Long, RestaurantSearchByVenue> findAll();
    List<RestaurantSearchByVenue> searchRestaurant(String location, String name, String eventType, String minPrice, String maxPrice);

    void delete(String id);
}
