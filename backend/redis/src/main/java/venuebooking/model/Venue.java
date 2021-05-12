package venuebooking.model;

import java.io.Serializable;

import org.springframework.stereotype.Component;

// Employee model class has basic employee-related attributes.
@Component
public class Venue implements Serializable {

    private long id;

    private long resId;

    private String name;

    private String eventType;

    private String image;


    private long price;

    public Venue() {}

    public long getResId() {
        return resId;
    }

    public void setResId(long resId) {
        this.resId = resId;
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

    public String getEventType() {
        return eventType;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public long getPrice() {
        return price;
    }

    public void setPrice(long price) {
        this.price = price;
    }
}

