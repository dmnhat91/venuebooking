import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_RES, API_REDIS } from '../../config';
import { Card, Row, Col } from "react-bootstrap";
import { GeoAlt, Search, Star, StarFill } from "react-bootstrap-icons";
import { Badge } from "shards-react";

import Lavender from '../../img/plant-lavender-flower.png';

import "./SearchPage.css";
import SearchBar from '../../components/SearchBar';
import { useHistory } from 'react-router-dom';

export default function SearchPage() {
    const history = useHistory();
    
    function getUrlVars(url) {
        var hash;
        var myJson = {};
        var hashes = url.slice(url.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            myJson[hash[0]] = hash[1];
            // If you want to get in native datatypes
            // myJson[hash[0]] = JSON.parse(hash[1]); 
        }
        return myJson;
    }
    var params = getUrlVars(window.location.href);
    const [info, setInfo] = useState(params);

    const [restaurants, setRestaurants] = useState([]);
    
    useEffect(()=> {
        axios.get(API_REDIS + "/search?location=" + info.location + "&name=" + info.name + "&eventType=" + info.eventType + "&minPrice=" + info.minPrice + "&maxPrice=" + info.maxPrice)
        .then((res) => {
            console.log("return" + res.data)
            setRestaurants(res.data);
            if(res.data == 0) {
                console.log("query db")
                axios.get(API_RES + "/search?location=" + info.location + "&name=" + info.name + "&eventType=" + info.eventType + "&minPrice=" + info.minPrice + "&maxPrice=" + info.maxPrice)
                .then((response) => {
                    console.log("from db" + response.data)
                    var x
                    setRestaurants(response.data)
                    console.log(restaurants)              

                    axios.post(API_REDIS, response.data)
                    .then((res) => console.log(res))



                })
            } else {
                setRestaurants(res.data);
            }
        })
      }, [info])

    const RestaurantItem = ({ resData }) => (
        <Row className="Card__container" 
        onClick={()=> {history.push("/restaurants/" + resData.id)}}>
            <Col
                sm="3"
                className="Card__img"
                style={{ backgroundColor: "blue", backgroundImage: "url('link')".replace('link', resData.image) }}
            ></Col> 
            <Col className="Card__body" >
                <h6 className="Card__title">{resData.name}</h6>
                <p className="Card__subtitle">{resData.description}</p>
                <p><span>{resData.numOfVenues} </span><span>venues matched</span></p>
                <Badge theme="secondary" outline className="Card__badge">
                    <GeoAlt /> {resData.location}
                </Badge>
                {/* <Badge theme="secondary" outline className="Card__badge">Wedding</Badge>
                <Badge theme="secondary" outline>Party</Badge> */}
            </Col>
            <Col className="Card__extra" sm="2">
                {resData.rating !== 0 && Array.from(Array(resData.rating)).map((i) => (
                    <StarFill key={i} color="#8675a9" />
                ))}
                {resData.rating !== 5 && Array.from(Array(5 - resData.rating)).map((i) => (
                    <Star key={i} color="#8675a9" />
                ))}
                <div style={{ marginTop: "10px" }}>
                    <span className="Card__from">From</span> 
                    <span className="Card__price">
                        {" "}
                        {resData.price.toLocaleString("it-IT", {
                            style: "currency",
                            currency: "VND",
                        })}
                    </span>
                </div>
                <img className="Card__deco" src={Lavender} alt="lavender"/>
            </Col>
        </Row>
    );

    return (
        <div>
            <div className="SearchBox__container">
                <div className="SearchBox__container2">
                    <SearchBar/>
                </div>
            </div>
            <div className="search-box">
                {restaurants == null || restaurants.map((resData) => <RestaurantItem key={resData.id} resData={resData}/>)}
            </div>
        </div>
    );
}
