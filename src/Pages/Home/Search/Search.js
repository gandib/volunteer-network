import React from 'react';
import './Search.css';

const Search = () => {
    return (
        <div className='mt-5 mb-3'>
            <h1 className=''>I GROW BY HELPING PEOPLE IN NEED. </h1>
            <input className='search-field' type="search" name="search" placeholder='Search...' />
            <input className='search-btn' type="submit" value="Search" />
        </div>
    );
};

export default Search;