package venuebooking.service;

import venuebooking.dom.RestaurantSearchByVenue;
import venuebooking.exception.ResourceNotFoundException;
import venuebooking.model.Restaurant;
import venuebooking.repository.RestaurantRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.cfg.Configuration;
import org.hibernate.dialect.function.StandardSQLFunction;
import org.hibernate.type.StringType;

@Service
public class RestaurantService {
    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    EntityManagerFactory emf;

    public List<Restaurant> getRestaurants() {
        return restaurantRepository.findAll();
    }

    public ResponseEntity<Restaurant> findRestaurantById(long id) throws ResourceNotFoundException {
        Restaurant Restaurant = restaurantRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Restaurant not found for this id :: " + id));
        return ResponseEntity.ok().body(Restaurant);
    }

    public List<Restaurant> findRestaurantByRestaurantName(String key) {
        return restaurantRepository.findByNameContains(key);
    }

    public List<Restaurant> findRestaurantByLocation(String key) {
        return restaurantRepository.findByLocationContains(key);
    }

    public List<RestaurantSearchByVenue> findRestaurants(String location, String name, String eventType, String minPrice, String maxPrice){
        EntityManager em = emf.createEntityManager();
        if(minPrice.equals("")) minPrice="100000";
        if(maxPrice.equals("")) maxPrice="999000";
        Query query = em.createQuery("Select distinct r.id, r.name, r.location, r.image, r.rating, min(v.price), r.description, count(v.id) "
            +"from Venue v left outer join Restaurant r on v.resId=r.id "
            +"where r.location like '%"+location+"%' "
            +"and r.name like '%"+name+"%' "
            +"and v.eventType like '%"+eventType+"%' "
            +"and v.price >= "+minPrice+" "
            +"and v.price <= "+maxPrice+" "
            +"group by r.id "
            +"order by r.rating desc, min(v.price) desc");

        @SuppressWarnings("unchecked")
        // Convert the  query list from Array of Array of  Objects: [LJava.lang.Object to List<Restaurants>  (because it can't be cast directly, i don't know why)
        List<Object[]> rows = query.getResultList();
        List<RestaurantSearchByVenue> result = new ArrayList<>(rows.size());
        for (Object[] row : rows) {
            result.add(new RestaurantSearchByVenue((long) row[0],
                    (String) row[1],
                    (String) row[2],
                    (String) row[3],
                    (Integer) row[4],
                    (Long) row[5],
                    (String) row[6],
                    (Long) row[7]));
        }
        em.close();
        return result;
    }

    public List<Restaurant> findTopRatingRestaurants(){
        EntityManager em = emf.createEntityManager();
        Query query = em.createQuery("Select r.id, r.name, r.image, r.location, r.rating, r.description, r.discount "
                +"from Venue v left outer join Restaurant r on v.resId=r.id "
                +"order by r.rating desc").setMaxResults(10);

        @SuppressWarnings("unchecked")
        // Convert the  query list from Array of Array of  Objects: [LJava.lang.Object to List<Restaurants>  (because it can't be cast directly, i don't know why)
        List<Object[]> rows = query.getResultList();
        List<Restaurant> result = new ArrayList<>(rows.size());
        for (Object[] row : rows) {
            result.add(new Restaurant((long) row[0],
                    (String) row[1],
                    (String) row[2],
                    (String) row[3],
                    (Integer) row[4],
                    (String) row[5],
                    (Integer) row[6]));
        }
        em.close();
        return result;
    }

    public List<Restaurant> findHotDealRestaurants(){
        EntityManager em = emf.createEntityManager();
        Query query = em.createQuery("Select r.id, r.name, r.image, r.location, r.rating, r.description, r.discount "
                +"from Venue v left outer join Restaurant r on v.resId=r.id "
                +"order by r.discount desc").setMaxResults(10);

        @SuppressWarnings("unchecked")
        // Convert the  query list from Array of Array of  Objects: [LJava.lang.Object to List<Restaurants>  (because it can't be cast directly, i don't know why)
        List<Object[]> rows = query.getResultList();
        List<Restaurant> result = new ArrayList<>(rows.size());
        for (Object[] row : rows) {
            result.add(new Restaurant((long) row[0],
                    (String) row[1],
                    (String) row[2],
                    (String) row[3],
                    (Integer) row[4],
                    (String) row[5],
                    (Integer) row[6]));
        }
        em.close();
        return result;
    }

    public long createRestaurant(Restaurant Restaurant) {
        restaurantRepository.save(Restaurant);
        return Restaurant.getId();
    }

    public boolean deleteRestaurant(long id) throws ResourceNotFoundException {
        Restaurant restaurant = restaurantRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Restaurant not found for this id :: " + id));
        restaurantRepository.delete(restaurant);
        return true;
    }

    public ResponseEntity<Restaurant> editRestaurant (long id, Restaurant RestaurantUpdateInfo) throws ResourceNotFoundException {
        Restaurant Restaurant = restaurantRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Restaurant not found for this id :: " + id));
        Restaurant.setName(RestaurantUpdateInfo.getName());
        Restaurant.setLocation(RestaurantUpdateInfo.getLocation());
        final Restaurant updatedRestaurant = restaurantRepository.save(Restaurant);
        return ResponseEntity.ok(updatedRestaurant);
    }
}
