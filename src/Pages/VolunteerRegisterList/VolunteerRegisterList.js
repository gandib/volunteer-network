import React, { useEffect, useState } from 'react';
import './VolunteerRegisterList.css';
import Table from 'react-bootstrap/Table';
import trash from '../../images/logos/trash-2 9.png';

const VolunteerRegisterList = () => {
    const [volunteerLists, setVolunteerLists] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/volunteer')
            .then(res => res.json())
            .then(data => setVolunteerLists(data));
    }, []);

    const handleDelete = (id) => {
        const proceed = window.confirm('Are you sure?');
        if (proceed) {
            const url = `http://localhost:5000/volunteer/${id}`;
            fetch(url, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    const remaining = volunteerLists.filter(volunterList => volunterList._id !== id);
                    setVolunteerLists(remaining);
                });
        }
    }

    return (
        <div>
            <div className='volunteer-register-title'>
                <h4>Volunteer Register List</h4>
            </div>
            <div className='volunteer-list-section'>
                <div className='volunteer-list-container'>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email Id</th>
                                <th>Registration Date</th>
                                <th>Volunteer List</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {
                            volunteerLists.map(volunterList => <tbody key={volunterList._id}>
                                <tr>
                                    <td>{volunterList.name}</td>
                                    <td>{volunterList.email}</td>
                                    <td>{volunterList.date}</td>
                                    <td>{volunterList.title}</td>
                                    <td><button onClick={() => handleDelete(volunterList._id)} className='trash-btn'><img className='trashIcon' src={trash} alt="" /></button></td>
                                </tr>
                            </tbody>)
                        }
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default VolunteerRegisterList;