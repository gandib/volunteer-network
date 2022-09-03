import React, { useRef, useState } from 'react';
import PageTitle from '../../Shared/PageTitle/PageTitle';
import './Signup.css';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCreateUserWithEmailAndPassword, useSendPasswordResetEmail, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';
import { toast } from 'react-toastify';
import useToken from '../../../hooks/useToken';

const Signup = () => {
    const [agree, setAgree] = useState(false);
    const nameRef = useRef('');
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const navigate = useNavigate();
    const location = useLocation();
    let errorElement;

    const from = location.state?.from?.pathname || '/';
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

    const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);
    const [updateProfile, updating] = useUpdateProfile(auth);


    const [token] = useToken(user);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const displayName = nameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        await createUserWithEmailAndPassword(email, password);
        await updateProfile({ displayName });
    }


    const ResetPassword = async (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        if (email) {
            await sendPasswordResetEmail(email);
            toast('Sent email');
        }
        else {
            toast('Please enter your email address');
        }
    }

    if (loading || sending || updating) {
        return <Loading></Loading>
    }

    if (token) {
        navigate(from, { replace: true });
    }

    if (error) {
        errorElement = <p className='text-danger'>Error: {error?.message}</p>
    }

    return (
        <div className='signup-section'>
            <PageTitle title='Signup'></PageTitle>
            <div className='signup-area'>
                <div className='signup-container'>
                    <form onSubmit={handleSubmit}>
                        <h4 className='signup-with mb-4'>Signup</h4>
                        <input className='mb-2 input-field' type="text" ref={nameRef} name='name' placeholder='Full Name' required /><br />
                        <input className='mb-2 input-field' type="email" ref={emailRef} placeholder='Email' required /><br />
                        <input className='mb-2 input-field' type="password" ref={passwordRef} placeholder='Password' required /><br />
                        <input onClick={() => setAgree(!agree)} className='me-2' type="checkbox" name="terms" id="terms" />
                        <label className={agree ? 'text-primary' : 'text-danger'} htmlFor="terms">Accept Volunteer Network's terms and condition</label><br />
                        <input disabled={!agree} className='mb-2 btn btn-primary mt-2' type="submit" value="Signup" /><br />
                    </form>
                </div>
                <div className='container d-flex text-start ms-5'>
                    <div>
                        {errorElement}
                        <button onClick={ResetPassword} className='reset-password d-flex text-start'>Reset password?</button>
                        <p className='mt-2 have-account d-flex text-start'>Already have an account? <span className='create-account'><Link className='go-to-login ms-2' to='/login'>Login</Link></span></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;