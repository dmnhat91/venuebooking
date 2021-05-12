import React, { useEffect, useState } from 'react'
import CoverPage from '../../components/CoverPage';
import Carousel from "react-multi-carousel";
// import './HotDeal.css'
import HomePageItem from '../../components/HomePageItem';
import { API_RES } from '../../config';
import axios from 'axios';
import './HomePage.css'



const HomePage = () => {
    const [deals, setDeals] = useState([]);
    const [tops, setTops] = useState([])
    useEffect(() => {
        axios.get(API_RES + "/searchHotDeal")
            .then((res) => { setDeals(res.data); })
            axios.get(API_RES + "/searchTopRating")
            .then((res) => { setTops(res.data); })
        
    }, [])
    return (
        <div>
            <CoverPage />
            <Section restaurants={deals} title="Hot deals" color="#f3f3f3" />
            <Section restaurants={tops} title="Top rating"/>
        </div>
    )
}



const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};


function Section({restaurants, title, color = "white"}) {

    return (
        <div className="HPsection__container" style={{backgroundColor: color}}>
            <h2 className="HPsection__header" >{title}</h2>
            <h6 className="HPsection__subheader">Lorem ipsum dolor sit amet consectetur adipisicing elit.</h6>

            <Carousel
                ssr
                partialVisible
                itemClass="image-item"
                responsive={responsive}
                infinite={true}
                autoPlay
                autoPlaySpeed={2000}
            >
                {restaurants == null || restaurants.map((resData) => <HomePageItem resData={resData} />)}
            </Carousel>
        </div>
    )

}

export default HomePage;
