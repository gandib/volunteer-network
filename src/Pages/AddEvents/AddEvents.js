import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import './AddEvents.css';
import ImageUploading from 'react-images-uploading';
import uploadImg from '../../images/logos/cloud-upload-outline 1.png';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';


const AddEvents = () => {
    const [value, onChange] = useState(new Date());
    const [user] = useAuthState(auth);
    const [images, setImages] = useState([]);
    const maxNumber = 1;

    const onChange2 = (imageList, addUpdateIndex) => {
        // data for submit
        console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };


    const handleSubmit = event => {
        event.preventDefault();
        const addEvents = {
            title: event.target.title.value,
            description: event.target.description.value,
            date: event.target.date.value,
            img: images,
            email: user?.email
        }
        axios.post('http://localhost:5000/addevent', addEvents)
            .then(response => {
                const { data } = response;
                if (data.insertedId) {
                    toast("Your event successfully submitted");
                    event.target.reset();
                }
            })
    }


    return (
        <div>
            <div className='add-event-title'>
                <h4>Add Events</h4>
            </div>
            <div>
                <form onSubmit={handleSubmit} className='add-events-section'>
                    <div className='container row add-events-container'>
                        <div className='col-6'>
                            <label className='event-title' htmlFor="title">Event Ttitle</label><br />
                            <input className='title-input' type="text" name='title' placeholder='Enter Title' required /> <br />
                            <label className='event-description' htmlFor="description">Description</label><br />
                            <textarea className='description-box' name="description" cols="30" rows="4" placeholder='Enter Description' required></textarea>
                        </div>

                        <div className='col-6'>
                            <label className='event-date' htmlFor="date">Event Date</label><br />
                            <div>
                                <DatePicker className='datepicker' onChange={onChange} value={value} />
                            </div>
                            <label className='event-banner' htmlFor="banner">Banner</label><br />

                            <div>
                                <ImageUploading
                                    multiple
                                    value={images}
                                    onChange={onChange2}
                                    maxNumber={maxNumber}
                                    dataURLKey="data_url"
                                >
                                    {({
                                        imageList,
                                        onImageUpload,
                                        onImageRemoveAll,
                                        onImageUpdate,
                                        onImageRemove,
                                        isDragging,
                                        dragProps,
                                    }) => (
                                        // write your building UI
                                        <div className="upload__image-wrapper">
                                            <button className='uploadImage'
                                                style={isDragging ? { color: 'red' } : undefined}
                                                onClick={onImageUpload}
                                                {...dragProps}
                                            >
                                                <span><img className='uploadimg' src={uploadImg} alt="" /></span>  Upload images
                                            </button>
                                            &nbsp;

                                            {imageList.map((image, index) => (
                                                <div key={index} className="image-item">
                                                    <img src={image['data_url']} alt="" width="100" />
                                                    <div className="image-item__btn-wrapper">
                                                        <button onClick={() => onImageUpdate(index)}>Update</button>
                                                        <button onClick={() => onImageRemove(index)}>Remove</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </ImageUploading>
                            </div>

                        </div>
                    </div>
                    <div className='event-btn-container'>
                        <button className='event-btn'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEvents;