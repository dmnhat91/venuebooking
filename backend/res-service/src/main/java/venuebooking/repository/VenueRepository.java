package venuebooking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import venuebooking.model.Venue;

import java.util.List;

public interface VenueRepository extends JpaRepository<Venue, Long> {
    List<Venue> findVenuesByResId(long resId);
    List<Venue> findByNameContains(String key);
    List<Venue> findByEventTypeContains(String key);
    List<Venue> findByPriceGreaterThanEqual(long minPrice);
    List<Venue> findByPriceLessThanEqual(long maxPrice);
}
