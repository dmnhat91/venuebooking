package venuebooking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import venuebooking.exception.ResourceNotFoundException;
import venuebooking.model.Venue;
import venuebooking.service.VenueService;

import java.util.List;

@RestController
@RequestMapping(value = "/venues")
@CrossOrigin(origins = "*",allowedHeaders = "*")
public class VenueController {
    @Autowired
    private VenueService venueService;

    @GetMapping
    public List<Venue> getAllVenues() {
        return venueService.getVenues();
    }

    @GetMapping("/searchByResId")
    public List<Venue> getVenuesByResId(@RequestParam("id") long resId){
        return venueService.findVenuesByResId(resId);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Venue> getVenuesById(@PathVariable("id") long venueId) throws ResourceNotFoundException {
        return venueService.findVenueById(venueId);
    }

    @PostMapping
    public long createVenue(@RequestBody Venue venue) {
        return venueService.createVenue(venue);
    }

}
