package venuebooking.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import venuebooking.exception.ResourceNotFoundException;
import venuebooking.model.Booking;
import venuebooking.repository.BookingRepository;

import java.util.List;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;

    public long createBooking(Booking booking){
        bookingRepository.save(booking);
        return booking.getId();
    }

    public List<Booking> getAllBookings(){
        return bookingRepository.findAll();
    }

    public ResponseEntity<Booking> editBooking(long id, Booking bookingUpdateInfo) throws ResourceNotFoundException{
        Booking booking = bookingRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Booking not found for this id :: "+id));
        booking.setResId(bookingUpdateInfo.getResId());
        booking.setVenueId(bookingUpdateInfo.getVenueId());
        final Booking updatedBooking = bookingRepository.save(booking);
        return ResponseEntity.ok(updatedBooking);
    }

    public boolean deleteBooking(long id) throws ResourceNotFoundException{
        Booking booking = bookingRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Booking not found for this id ::"+id));
        bookingRepository.delete(booking);
        return true;
    }
}
