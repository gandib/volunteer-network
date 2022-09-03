import React, { useState } from 'react';
import AddEvents from '../AddEvents/AddEvents';
import PageTitle from '../Shared/PageTitle/PageTitle';
import './Dashboard.css';
import userImg from '../../images/logos/users-alt 1.png';
import plusIcon from '../../images/logos/plus 1.png';
import VolunteerRegisterList from '../VolunteerRegisterList/VolunteerRegisterList';

const Dashboard = () => {
    const [value, setValue] = useState(0);
    const handleRegister = () => {
        setValue(0);
    }
    const handleEvent = () => {
        setValue(1);
    }
    return (
        <div className='dashboard-container'>
            <PageTitle title='Dashboard'></PageTitle>
            {/* <h2>Dashboard</h2> */}
            <div className='row'>
                <div className='col-3 dashboard-first-column'>
                    <div className='container dashboard-volunteer'>
                        <button onClick={handleRegister} className={`volunteer-btn ${value === 0 ? 'volunteer-btn-active' : ''}`}><span><img src={userImg} alt="" /></span>Volunteer register list</button>
                    </div>
                    <div className='container dashboard-volunteer-2'>
                        <img src={plusIcon} alt="" />
                        <button onClick={handleEvent} className='volunteer-btn'>Add event</button>
                    </div>
                </div>
                <div className='col-9'>
                    {
                        value === 0 ? <VolunteerRegisterList></VolunteerRegisterList>
                            :
                            <AddEvents></AddEvents>
                    }
                </div>
            </div>
        </div>
    );
};

export default Dashboard;