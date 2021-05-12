import React from 'react'
import './SearchPageBody.css'
import { Map, GoogleApiWrapper } from 'google-maps-react';
import { render } from '@testing-library/react';
import SearchInput from './SearchInput';
import SearchResult from './SearchResult';

export default function SearchPageBody() {
    const mapStyles = {
        width: '100%',
        height: '100%',
      };
    
    return (
        <div className="body">
            <div>
                <SearchInput/>
                <SearchResult/>
            </div>
        </div>
    )
}
