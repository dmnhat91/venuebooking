import axios from 'axios';
import { API_RES } from '../../config';
import React, { useEffect, useState } from 'react';
import locationPin from '../../img/VenueInformationPage/location_pin_16.png';
import { Col, Row } from 'react-bootstrap';
import "../SearchPage/SearchPage.css";
import { GeoAlt, Star, StarFill } from "react-bootstrap-icons";


export default function VenueOverview({ resId }) {
    const [restaurant, setRestaurant] = useState();

    useEffect(() => {
        axios.get(API_RES + "/searchid?id=" + resId)
            .then((response) => { setRestaurant(response.data); })
    }, [resId])

    return (
        <div className="ResInfo">
            {restaurant != null && <div className="container py-5 ResInfo__container">
                <div className="d-flex align-items-center">
                    <div className="ResInfo__name mr-2">{restaurant.name} </div>
                    <div>
                        {restaurant.rating !== 0 && Array.from(Array(restaurant.rating)).map((i) => (
                            <StarFill key={i} color="white" />
                        ))}
                        {restaurant.rating !== 5 && Array.from(Array(5 - restaurant.rating)).map((i) => (
                            <Star key={i} color="white" />
                        ))}
                    </div>
                </div>

                <p className="ResInfo__description">{restaurant.description}</p>
                <p><GeoAlt/> {restaurant.location}</p>
            </div>}
        </div>



    )
}
