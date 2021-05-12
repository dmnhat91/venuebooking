import React, { useEffect, useState } from 'react'
import eventType from '../../img/VenueInformationPage/event_type_32.png'
import freeWifi from '../../img/VenueInformationPage/wifi_32.png'
import nonRefund from '../../img/VenueInformationPage/non_refund_32.png'
import nonReschedule from '../../img/VenueInformationPage/non_reschedule_32.png'
import cancelPolicy from '../../img/VenueInformationPage/cancel_policy_32.png'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import { API_BOOK } from "../../config";
import { Check } from 'react-bootstrap-icons'



export default function SubVenue({ venueInfo }) {

    const [bookedIds, setBookedIds] = useState([])

    useEffect(() => {
        axios.get(API_BOOK).then((res) => {
            const arr = []
            for (var value of res.data) {
                arr.push(value.venueId)
            }
            setBookedIds(arr)
        });
    }, []);
    return (
        <Row className="Card__container">
            <Col
                sm="3"
                className="Card__img"
                style={{ backgroundColor: "blue", backgroundImage: "url('link')".replace('link', venueInfo.image) }}
            ></Col>
            <Col className="Card__body">
                <h5 className="Card__title">{venueInfo.name}</h5>

                <div className="row mt-3">
                    <div className="col-sm">
                        {/* #3FAC4A - green color */}
                        <p><img className="mr-2" src={eventType} width="20" height="20" />{venueInfo.eventType}</p>
                        <p><img className="mr-2" src={freeWifi} width="20" height="20" />Free Wifi</p>
                    </div>
                    <div className="col-sm">
                        {/* #D02C2C - red color */}
                        <p><img className="mr-2" src={nonRefund} width="20" height="20" />Non-refundable</p>
                        <p><img className="mr-2" src={nonReschedule} width="20" height="20" />Non-reschedule</p>
                        <p style={{ color: "#259CD3" }}><img className="mr-2" src={cancelPolicy} width="20" height="20" />Read Cancel Policy</p>
                    </div>
                </div>
                {/* <p>3 venues</p> */}
            </Col>
            <Col className="Card__extra" sm="3">
                <p className="mb-1" style={{ textDecoration: "line-through" }}>{venueInfo.price + 20 * venueInfo.price / 100} đ</p>
                <p className="mb-1" style={{ color: "purple", fontSize: "1.3em", fontWeight: "bold" }}>
                    <span>
                        {venueInfo.price.toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                        })}
                    </span>
                </p>
                <p className="mb-3" style={{ color: "259CD3", fontSize: "15px", fontWeight: "bold" }}>Inclusive Tax</p>
                {bookedIds.includes(venueInfo.id) ?
                    <h6 style={{ color: "#771111"}}>Booked <Check/></h6> :
                    <Link to={"/checkout/" + venueInfo.resId + "/" + venueInfo.id}>
                        <Button
                            variant="outline-light"
                            style={{ color: "purple", borderColor: "purple" }}>
                            Book now
                    </Button>
                    </Link >}
            </Col>
        </Row>
    )
}