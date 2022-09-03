import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useRefugeDetail from '../../hooks/useRefugeDetail';
import PageTitle from '../Shared/PageTitle/PageTitle';
import './Register.css';
import { toast } from 'react-toastify';
import DatePicker from 'react-date-picker';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const Register = () => {
    const [user] = useAuthState(auth);
    const { regId } = useParams();
    const [refuge] = useRefugeDetail(regId);
    const navigate = useNavigate();
    const location = useLocation();
    const [value, onChange] = useState(new Date());
    const from = location.state?.from?.pathname || '/';


    const handleRegistration = event => {
        event.preventDefault();
        const volunteer = {
            name: event.target.name.value,
            email: user?.email,
            date: event.target.date.value,
            description: event.target.description.value,
            title: refuge.title
        }
        axios.post('http://localhost:5000/volunteer', volunteer)
            .then(response => {
                const { data } = response;
                if (data.insertedId) {
                    toast("Your registration successful");
                    event.target.reset();
                    navigate(from, { replace: true });
                }
            })
    }

    return (
        <div className='register-area'>
            <PageTitle title='Register Volunteer'></PageTitle>
            <div className='register-container'>
                <h2 className='register-title'>Register as a Volunteer</h2>
                <form onSubmit={handleRegistration}>
                    <input type="text" name='name' placeholder='Full Name' required /><br />
                    <input type="text" name='email' value={user?.email} required /><br />
                    <div>
                        <DatePicker className='register-date' onChange={onChange} value={value} />
                    </div>
                    <input type="text" name='description' placeholder='Description' required /><br />
                    <input type="text" name='title' value={refuge.title} readOnly required /><br />
                    <button className='registration-btn'>Registration</button>
                </form>
            </div>
        </div>
    );
};

export default Register;