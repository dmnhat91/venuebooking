import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './VenueInformationPage.css'
import { API_VENUE, API_RES } from '../../config';
import VenueOverview from './VenueOverview'
import Facilities from './Facilities'
import { useParams } from 'react-router-dom';
import { Star, StarFill } from "react-bootstrap-icons";


///// DEBUGG
// TODO: delete this
import SubVenue from './SubVenue';
export default function VenueInformationPage() {
    // Extract restaurant id from the url
    const { resId } = useParams();

    const [venues, setVenues] = useState([]);

    // const [restaurant, setRestaurant] = useState();

    // useEffect(() => {
    //     axios.get(API_RES + "/searchid?id=" + resId)
    //         .then((response) => {
    //             console.log(response.data)
    //             setRestaurant(response.data);
    //         })
    // }, [resId])

    useEffect(() => {
        axios.get(API_VENUE + "/searchByResId?id=" + resId)
            .then((response) => {
                setVenues(response.data);
            })
    }, [resId]);

    return (
        <div>
            {/* TODO: delete the class name */}
            <VenueOverview resId={resId}/>
            {/* <div className="Fac__container">
                <h2>Fa</h2>
            </div> */}
            <Facilities/>
            {venues.length > 0 &&
                <div class="venues-container">
                    {venues == null || venues.map((venue) => <SubVenue key={venue.id} venueInfo={venue} />)}
                </div>}
        </div>
    );
}