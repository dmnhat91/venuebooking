// import styled from "styled-components";

// export default styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 150px;
//   width: 100%;
//   // background-color: #353a40;
//   color: #fff;
//   margin: 0 15px;
//   font-size: 4em;
//   background-image: url("https://mdbootstrap.com/img/Photos/Slides/img%20(46).jpg");
// `;

import React, { useEffect, useState }  from 'react';
import { Card, CardBody, CardImg, CardTitle, Button, Badge } from "shards-react";
import { ArrowRightShort } from 'react-bootstrap-icons';
import { useHistory } from 'react-router-dom';
import { GeoAlt, Search, Star, StarFill } from "react-bootstrap-icons";

function HomePageItem({ resData }) {
  const history = useHistory();
  return (
    <div className="p-4">
    <Card style={{borderRadius: 0}}>
      <CardImg style={{borderRadius: 0}} top src={resData.image} height="180px"/>
      <Badge theme="danger" style={{position: 'absolute', top: '10px', left: '10px'}}>{resData.discount}% off</Badge>
      
      <CardBody>
        <CardTitle>{resData.name}</CardTitle>
        <p>
          {Array.from(Array(resData.rating)).map((i) => (
            <StarFill key={i} color="#8675a9" />
          ))}
          {Array.from(Array(5 - resData.rating)).map((i) => (
            <Star key={i} color="#8675a9" />
          ))}
        </p>
        <p>{resData.description}</p>
        <Button outline squared theme="light" size="sm" className="ml-auto" onClick={()=> {history.push("/restaurants/" + resData.id)}}>
        See more <ArrowRightShort/>
      </Button>
      </CardBody>
    </Card>
  </div>
  )
}

export default HomePageItem;
