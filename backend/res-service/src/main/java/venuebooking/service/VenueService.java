package venuebooking.service;

import venuebooking.exception.ResourceNotFoundException;
import venuebooking.model.Venue;
import venuebooking.repository.VenueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VenueService {
    @Autowired
    private VenueRepository venueRepository;

    public List<Venue> getVenues() {
        return venueRepository.findAll();
    }

    public List<Venue> findVenuesByResId(long id){
        return venueRepository.findVenuesByResId(id);
    }

    public ResponseEntity<Venue> findVenueById(long id) throws ResourceNotFoundException {
        Venue venue = venueRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Venue not found for this id :: " + id));
        return ResponseEntity.ok().body(venue);
    }

    public List<Venue> findVenueByName(String key) {
        return venueRepository.findByNameContains(key);
    }

    public List<Venue> findVenueByEventType(String key) {
        return venueRepository.findByEventTypeContains(key);
    }

    public List<Venue> filterByMaxPrice(long key) {
        return venueRepository.findByPriceLessThanEqual(key);
    }

    public List<Venue> filterByMinPrice(long key) {
        return venueRepository.findByPriceGreaterThanEqual(key);
    }

    public long createVenue(Venue venue) {
        venueRepository.save(venue);
        return venue.getId();
    }

    public boolean deleteVenue(long id) throws ResourceNotFoundException {
        Venue venue = venueRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Venue not found for this id :: " + id));
        venueRepository.delete(venue);
        return true;
    }

    public ResponseEntity<Venue> editVenue (long id, Venue venueUpdateInfo) throws ResourceNotFoundException {
        Venue venue = venueRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("User not found for this id :: " + id));
        venue.setEventType(venueUpdateInfo.getEventType());
        venue.setName(venueUpdateInfo.getName());
        venue.setPrice(venueUpdateInfo.getPrice());
        venue.setImage(venueUpdateInfo.getImage());
        final Venue updatedVenue = venueRepository.save(venue);
        return ResponseEntity.ok(updatedVenue);
    }
}

