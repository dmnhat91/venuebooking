package venuebooking.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import venuebooking.exception.ResourceNotFoundException;
import venuebooking.model.Booking;
import venuebooking.service.BookingService;

import java.util.List;

@RestController
@RequestMapping(value = "/bookings")
@CrossOrigin(origins = "*",allowedHeaders = "*")
public class BookingController {
    @Autowired
    private BookingService bookingService;

    @PostMapping
    public long createBooking(@RequestBody Booking booking){
        return bookingService.createBooking(booking);
    }

    @GetMapping
    public List<Booking> getAllBookings(){
        return bookingService.getAllBookings();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Booking> editBooking(@PathVariable long id, @RequestBody Booking bookingUpdateInfo) throws ResourceNotFoundException {
        return bookingService.editBooking(id,bookingUpdateInfo);
    }

    @DeleteMapping("/{id}")
    public boolean deleteBooking(@PathVariable long id) throws ResourceNotFoundException {
        return bookingService.deleteBooking(id);
    }
}
