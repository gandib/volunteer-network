import React from 'react';
import PageTitle from '../Shared/PageTitle/PageTitle';
import './Home.css';
import Refuges from './Refuges/Refuges';
import Search from './Search/Search';

const Home = () => {
    return (
        <div>
            <PageTitle title='Home'></PageTitle>
            <Search></Search>
            <Refuges></Refuges>
        </div>
    );
};

export default Home;