import React from 'react'
import './CoverPage.css'
import { Card, CardBody } from 'shards-react'

// import cover_photo from '../img/HomePage/coverpage_2921x1946.png'
import SearchBar from './SearchBar'
export default function CoverPage() {
    return (
        <div className="CoverPage__wrapper">
            <div>
                <div className="CoverPage__content">
                    <p className="brand-name">BRAND</p>    
                    <p className="CoverPage__subtitle">Book a venue for your event</p>
                    <p className="CoverPage__subtitle2">Find suitable spaces for all private and corporate events</p>
                </div>
            </div>
            <Card className="CoverPage__search">
                <SearchBar/>
            </Card>
        </div>
        
    )
}
