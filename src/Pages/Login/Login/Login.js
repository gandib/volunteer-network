import React, { useRef } from 'react';
import PageTitle from '../../Shared/PageTitle/PageTitle';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Login.css';
import googleLogo from '../../../images/google(1).png';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import Loading from '../../Shared/Loading/Loading';
import useToken from '../../../hooks/useToken';

const Login = () => {
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const navigate = useNavigate();
    const location = useLocation();
    let errorElement;
    const from = location.state?.from?.pathname || '/';

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const [signInWithGoogle, user1, loading1, error1] = useSignInWithGoogle(auth);


    const [token] = useToken(user || user1);

    const handleSubmit = async event => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        await signInWithEmailAndPassword(email, password);
    }

    if (loading || loading1) {
        return <Loading></Loading>
    }

    if (token) {
        navigate(from, { replace: true });
    }

    if (error || error1) {
        errorElement = <p className='text-danger'>Error: {error?.message}</p>
    }

    return (
        <div className='login-section'>
            <PageTitle title='Login'></PageTitle>
            <div className='login-container'>
                <form onSubmit={handleSubmit}>
                    <h4 className='login-with mb-4 '>Login With</h4>
                    <input className='mb-2 input-field' type="email" ref={emailRef} placeholder='Email' required /><br />
                    <input className='mb-2 input-field' type="password" ref={passwordRef} placeholder='Password' required /><br />
                    <input className='mb-2 btn btn-primary mt-2' type="submit" value="Login" /><br />
                    <div className='d-flex justify-content-center align-items-center'>
                        <div className='devider'></div>
                        <p className='or mt-2 p-2'>or</p>
                        <div className='devider'></div>
                    </div>
                    <button onClick={() => signInWithGoogle()} className='google-btn'><span><img className='me-5' src={googleLogo} alt="" /></span> <span className='me-5'>Continue with Google</span></button>
                    <p className='mt-2 donot-account'>Don't have an account? <span className='create-account'><Link to='/signup'>Create an account</Link></span></p>
                    {errorElement}
                </form>
            </div>
        </div>
    );
};

export default Login;