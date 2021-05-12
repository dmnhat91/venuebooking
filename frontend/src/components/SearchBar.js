import React, { useState, useEffect } from 'react'
import { CaretDown, CaretUp, Search } from 'react-bootstrap-icons';
import { Row, Col, FormSelect, Form, FormInput, FormGroup, Collapse, Button, FormRadio, Slider } from "shards-react";
import { useHistory } from "react-router-dom";

export default function SearchBar() {
  const history = useHistory();
  const [isSearch, setIsSearch] = useState(window.location.pathname === '/search');

  const [url, setUrl] = useState(window.location.href);
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
  var params = getUrlVars(url);

  /*****  Search Parameters  Variables *******/
  const [location, setLocation] = useState("Ba Ria - Vung Tau");
  const [restaurantName, setRestaurantName] = useState('');
  const [eventType, setEventType] = useState('');
  const [collapse, setCollapse] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [priceValue, setPriceValue] = useState([100, 500]);

  useEffect(() => {
    if (Object.keys(params).length > 1) {
      setLocation(params.location.replaceAll("%20", " "));
      setRestaurantName(params.name.replaceAll("%20", " "));
      setEventType(params.eventType);
      setSelectedEvent(params.eventType);
      setPriceValue([(params.minPrice).substring(0, params.minPrice.length - 3), (params.maxPrice).substring(0, params.maxPrice.length - 3)]);
    }
    console.log("url" + url)
    if (url.includes("search")) {
      setCollapse(true)
      setIsSearch(true)
    }
  }, [url])

  const routeChange = () => {
    let path = '/search?' + "location=" + location + "&name=" + restaurantName + "&eventType=" + eventType + "&minPrice=" + priceValue[0] + "000" + "&maxPrice=" + priceValue[1] + "000"
    history.push(path)
  }

  function handleSlide(e) {
    setPriceValue(
      [parseInt(e[0]), parseInt(e[1])]
    );
  }

  const handleCollapse = () => {
    setCollapse(collapse => !collapse)
  }

  return (
        <Form>
          {isSearch && <h6 className="mx-2 text-white">You're search for</h6>}
          <Row className="px-2">
            <Col>
              <FormGroup>
                {isSearch || <label>Location</label>}
                <FormSelect value={location} onChange={(e)=>setLocation(e.target.value)}>
                  <option value={"Ba Ria - Vung Tau"} select={location  === "Ba Ria - Vung Tau"}>Ba Ria - Vung Tau</option>
                  <option value={"Da Lat"} select={location  === "Da Lat"}>Da Lat</option>
                  <option value={"Da Nang"} select={location  === "Da Nang"}>Da Nang</option>
                  <option value={"Ha Long Bay"} select={location  === "Ha Long Bay"}>Ha Long Bay</option>
                  <option value={"Ha Noi"} select={location  === "Ha Noi"}>Ha Noi</option>
                  <option value={"Ho Chi Minh"} select={location  === "Ho Chi Minh"}>Ho Chi Minh</option>
                  <option value={"Hue"}select={location  === "Hue"}>Hue</option>
                  <option value={"Nha Trang"}select={location  === "Nha Trang"}>Nha Trang</option>
                  <option value={"Phu Quoc"} selected>Phu Quoc</option>
                </FormSelect>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                {isSearch || <label>Restaurant</label>}
                <FormInput value={restaurantName} onChange={(e)=>setRestaurantName(e.target.value)} placeholder="Enter restaurant name..." />
              </FormGroup>
            </Col>
            {isSearch && <Col xs={1}>
              <Button theme="light" onClick={(e)=>{routeChange()}} style={{width: '100%'}}><Search/></Button>
            </Col>}
          </Row>
        {/* <Row>
          <Col>
            <FormGroup>
              <label>Từ ngày</label>
              <FormInput type="date" />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <label>Đến ngày</label>
              <FormInput type="date" />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <label>Khung giờ</label>
              <FormSelect>
                <option value="first">7h sáng - 12h trưa</option>
                <option value="second">12h trưa - 5h chiều</option>
                <option value="third">5h chiều - 10h tối</option>
              </FormSelect>
            </FormGroup>
          </Col>
        </Row> */}


      <div className="mx-2">
      <Collapse open={collapse} style={{ backgroundColor: 'white', borderRadius: '5px' }}>
        <div className="p-3 mt-3 border rounded">
          <Row>
            <Col sm="12" md="4" lg="3"><label>Event type</label></Col>
            <Col sm="12" md="4" lg="3">
              <FormRadio
                value="Party"
                checked={selectedEvent === "Party"}
                onChange={() => { setSelectedEvent("Party"); setEventType("Party") }}>Party</FormRadio>
            </Col>
            <Col sm="12" md="4" lg="3">
              <FormRadio
                value="Wedding"
                checked={selectedEvent === "Wedding"}
                onChange={() => { setSelectedEvent("Wedding"); setEventType("Wedding") }}>Wedding</FormRadio>
            </Col>
            <Col>
              <FormRadio
                value="Formal Meeting"
                checked={selectedEvent === "Formal Meeting"}
                onChange={() => { setSelectedEvent("Formal Meeting"); setEventType("Formal Meeting") }}>Formal Meeting</FormRadio>
            </Col>
          </Row>
          <Row>
            <Col sm="12" md="4" lg="3">
              <label>Price range </label>
            </Col>
            <Col>
              <p>
                From {priceValue[0]},000 VND to {priceValue[1]},000 VND
                </p>
              <Slider
                connect
                pips={{ mode: "steps", stepped: true, density: 3 }}
                onSlide={handleSlide}
                start={priceValue}
                range={{ min: 100, max: 999 }}
              />
            </Col>
            <Col sm="12" md="4" lg="3">
            </Col>
          </Row>
        </div>
      </Collapse>
      <div className="d-flex justify-content-center m-0 p-0" >
        <Button size="sm" outline squared theme="light" onClick={() => handleCollapse()} style={{ backgroundColor: 'white', border: "none", width: '100vw', boxShadow: "0 0 0 3px rgba(233,236,239,.15),0 3px 15px rgba(233,236,239,.2),0 2px 5px rgba(0,0,0,.1)" }}>
          {collapse ? (<span>Hide <CaretUp /></span>) : (<span>More <CaretDown /></span>)}
        </Button>
      </div>
      </div>
      {isSearch || <div className="d-flex justify-content-center">
        <Button outline theme="secondary" style={{ marginTop: "10px", width: '200px' }} onClick={(e) => { routeChange() }} >SEARCH <Search style={{ marginLeft: "5px" }} /></Button>
      </div>}
    </Form>
  )
}
