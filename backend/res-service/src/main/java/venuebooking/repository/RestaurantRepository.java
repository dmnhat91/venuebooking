package venuebooking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import venuebooking.model.Restaurant;

import java.util.List;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {
    List<Restaurant> findByNameContains(String key);
    List<Restaurant> findByLocationContains(String key);
    List<Restaurant> findByLocationContainsAndNameContains(String location,String name);
}
