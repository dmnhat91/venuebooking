package venuebooking.dom;


import org.springframework.stereotype.Component;

import java.io.Serializable;


public class RestaurantSearchByVenue implements Serializable {
    private long id;
    private String name;
    private String location;
    private String image;
    private Integer rating;
    private Long price;
    private String description;
    private Long numOfVenues;

    public RestaurantSearchByVenue(long id, String name, String location, String image, Integer rating, Long price, String description, Long numOfVenues) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.image = image;
        this.rating = rating;
        this.price = price;
        this.description = description;
        this.numOfVenues = numOfVenues;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public Long getPrice() {
        return price;
    }

    public void setPrice(Long price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getNumOfVenues() {
        return numOfVenues;
    }

    public void setNumOfVenues(Long numOfVenues) {
        this.numOfVenues = numOfVenues;
    }
}
