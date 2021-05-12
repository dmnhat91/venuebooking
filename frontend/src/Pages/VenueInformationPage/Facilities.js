import React from 'react'
import './Facilities.css'
import { Form, Row, Col } from 'react-bootstrap'
import airConditioner from '../../img/VenueInformationPage/air_conditioner_64.png'
import {ReactComponent as AC} from '../../img/svg/air-conditioner.svg'
import parking from '../../img/VenueInformationPage/parking_64.png'
import internet from '../../img/VenueInformationPage/wifi_64.png'
import elevator from '../../img/VenueInformationPage/elevator_64.png'

export default function Facilities() {
    return (
        <div className="Fac__container">
            <h3 className="mb-5" style={{fontWeight: 500}}>Facilities</h3>
            <div className="container" style={{ maxWidth: '900px' }} >
                <div className="row">
                <div className="col-sm-3 text-center">
                    {/* <AC width="100" height="100"/> */}
                    <img src={airConditioner}  width="40" height="40"/>
                    <h6 className="my-3">AC</h6>
                </div>
                <div className="col-sm-3 text-center">
                    <img src={elevator} width="40" height="40"/>
                    <h6 className="my-3">Elevator</h6>
                </div>
                <div className="col-sm-3 text-center">
                    <img src={internet} width="40" height="40"/>
                    <h6 className="my-3">Internet</h6>
                </div>
                <div className="col-sm-3 text-center">
                    <img src={parking} width="40" height="40"/>
                    <h6 className="my-3">Parking</h6>
                </div>
                </div>
            </div>
        </div>
    )
}

