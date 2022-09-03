import React, { useEffect, useState } from 'react';
import PageTitle from '../Shared/PageTitle/PageTitle';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import axiosPrivate from '../../api/axiosPrivate';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    useEffect(() => {

        const getOrders = async () => {
            const email = user?.email;
            const url = `http://localhost:5000/addevent?email=${email}`;
            try {
                const { data } = await axiosPrivate.get(url);
                setEvents(data);
            }
            catch (error) {
                console.log(error.message)
                if (error.response.status === 401 || error.response.status === 403) {
                    signOut(auth);
                    navigate('/login');
                }
            }
        }
        getOrders();

    }, [user]);

    const handleCancel = id => {

    }

    return (
        <div>
            <PageTitle title='Events'></PageTitle>
            <h2>Events {events.length}</h2>
            <div>
                {
                    events.map(event => <div key={event._id}>
                        <h3>{event.title}</h3>
                        <h4>{event.date}</h4>
                        <button onClick={() => handleCancel(event._id)}>Cancel</button>
                    </div>)
                }
            </div>
        </div>
    );
};

export default Events;