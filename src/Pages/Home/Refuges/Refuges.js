import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Refuges.css';

const Refuges = () => {
    const [refuges, setRefuges] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetch('http://localhost:5000/refuge')
            .then(res => res.json())
            .then(data => setRefuges(data));
    }, []);

    const handleRegister = id => {
        navigate(`/register/${id}`);
    }

    return (
        <div>
            <div className='container refuge-container'>
                {
                    refuges.map(refuge => <div onClick={() => handleRegister(refuge._id)} className='single-refuge' key={refuge._id}>
                        <img src={refuge.img} alt="" />
                        <p>{refuge.title}</p>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Refuges;