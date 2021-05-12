package venuebooking.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import venuebooking.model.Booking;

public interface BookingRepository extends JpaRepository<Booking, Long> {
    //something if needed
}
