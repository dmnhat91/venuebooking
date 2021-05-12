import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_RES } from '../../config';

export default function TestPage({searchInfo}){
  const [restaurants, setRestaurants] = useState()

  useEffect(()=> {
    axios.get(API_RES + "/search?location=" + searchInfo.location + "&name=" + searchInfo.name + "&eventType=" + searchInfo.eventType + "&minPrice=" + searchInfo.minPrice + "&maxPrice=" + searchInfo.maxPrice)
    .then((res) => setRestaurants(res.data))
  }, [searchInfo])

    return (
      <div className="container">
      <h1>Restaurant</h1>
      <table className="table">
        <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Location</th>
            </tr>
        </thead>
        {restaurants == null || 
        <tbody>
          {restaurants.map(el => (
            <tr key={el.id}>
                <td>{el.id}  </td>
                <td>{el.name}  </td>
                <td>{el.location}  </td>
            </tr>
          ))}
        </tbody>}
      </table>
    </div>
    );
}