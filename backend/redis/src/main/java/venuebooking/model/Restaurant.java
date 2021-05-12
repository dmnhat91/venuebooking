package venuebooking.model;

import java.io.Serializable;

import org.springframework.stereotype.Component;

// Employee model class has basic employee-related attributes.
@Component
public class Restaurant implements Serializable {

    private long id;


    private String name;


    private String image;


    private String location;


    private int rating;


    private String description;

    public Restaurant() {}

    public Restaurant(long id, String name, String location, String image, Integer rating, String description) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.image = image;
        this.rating = rating;
        this.description = description;
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

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}

