import React, { useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import axios from "axios";
import { API_BOOK, API_RES, API_VENUE, API_USER } from "../../config";
import './ProfilePage.css'
import { Check, GeoAlt } from "react-bootstrap-icons";

function ProfilePage() {
  const [data, setData] = useState([]);
  const [resList, setResList] = useState([]);
  const [venue, setVenueList] = useState([]);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    axios.get(API_BOOK).then((res) => {
      const filterList = res.data.filter((d) => d.userId === parseInt(localStorage.getItem("id")))
      setData(filterList)
    });
  }, []);

  useEffect(() => {
    console.log(data)
    // After finish get all book belong to current user
    // Fetch res & venue info
    // if (resList.length < data.length) {
    for (var value of data) {
      axios.get(API_RES + "/searchid?id=" + value.resId).then((res) => setResList(list => [...list, res.data]))
      axios.get(API_VENUE + "/" + value.venueId).then((res) => setVenueList(list => [...list, res.data]))

    }
    // }
  }, [data])

  useEffect(() => {
    var userId = localStorage.getItem("id");
    axios.get(API_USER + "/" + userId)
      .then((res) => setUserData(res.data))
  }, []);

  return (
    <div style={{ backgroundColor: '#f3f3f3' }}>
      <div className="my-container">
        <div className="my-4">
          <img className="my-avatar" src={userData.avatar} alt="User avatar" />
          <span className="my-name">{userData.name}</span>
          <span className="my-name">|</span>
          {data == null || data.length === 0 ? (
            <span className="my-name">No booking yet</span>
          ) : (
              <span className="my-name">{data.length} booking{data.length === 0 || "s"}</span>)
          }
        </div>
        <ListGroup >
          {resList.map((res, i) => (
            <ListGroup.Item>
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex">
                  <img src={res.image} className="my-book-image" alt="venue"/>
                  <div>
                  <h6>Restaurant name: {res.name}</h6>
                  {venue[i] == null || <h6>Venue name: {venue[i].name}</h6>}
                  <GeoAlt /> {res.location}
                  </div>
                </div>
                <p className="my-book">Booked <Check /></p>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
}

export default ProfilePage;
