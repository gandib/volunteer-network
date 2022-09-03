import React from 'react';
import notFoundPic from '../../../images/404.png';
import PageTitle from '../PageTitle/PageTitle';

const NotFound = () => {
    return (
        <div>
            <PageTitle title='Not Found'></PageTitle>
            <h2 className='text-center mt-5 text-danger'>Oooops! Page not found!</h2>
            <img className='img-fluid w-100 h-50' src={notFoundPic} alt="" />
        </div>
    );
};

export default NotFound;