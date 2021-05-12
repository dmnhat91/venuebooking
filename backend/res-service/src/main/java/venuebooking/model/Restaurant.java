package venuebooking.model;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "restaurants")
public class Restaurant {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(nullable = false)
    private String name;

    @Column
    private String image;

    @Column
    private String location;

    @Column
    private int rating;

    @Column
    private String description;

    @Column
    private Integer discount;

    public Restaurant() {}

    public Restaurant(long id, String name, String image, String location, Integer rating, String description) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.image = image;
        this.rating = rating;
        this.description = description;
    }

    public Restaurant(long id, String name, String image, String location, Integer rating, String description, Integer discount) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.image = image;
        this.rating = rating;
        this.description = description;
        this.discount = discount;
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

    public Integer getDiscount() {
        return discount;
    }

    public void setDiscount(Integer discount) {
        this.discount = discount;
    }
}
