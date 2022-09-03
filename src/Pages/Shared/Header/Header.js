import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import CustomLink from '../CustomLink/CustomLink';
import logo from '../../../images/logos/Group 1329.png';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';

const Header = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();
    const admin = user?.email === "gandibroy11@gmail.com";


    const logout = () => {
        signOut(auth);
    }
    return (
        <div>
            <>
                <Navbar collapseOnSelect expand="lg" sticky='top' bg="white" variant="dark">
                    <Container>
                        <Navbar.Brand as={Link} to="/">
                            <img src={logo} height='30' alt="" />
                        </Navbar.Brand>
                        <Navbar.Toggle className='bg-black' aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse className='bg-white' id="responsive-navbar-nav">
                            <Nav className="me-auto">

                            </Nav>
                            <Nav>
                                <Nav.Link className='text-black' as={CustomLink} to="/home">Home</Nav.Link>
                                <Nav.Link className='text-black' as={CustomLink} to="/donation">Donation</Nav.Link>
                                <Nav.Link className='text-black' as={CustomLink} to="/events">Events</Nav.Link>
                                <Nav.Link className='text-black' as={CustomLink} to="/blog">Blog</Nav.Link>

                                {
                                    user ?
                                        <>
                                            {
                                                !admin &&
                                                <button className=' me-2' style={{ border: 'none', backgroundColor: 'white' }}>{user.displayName}</button>
                                            }

                                            {
                                                admin &&
                                                <>
                                                    <button onClick={() => navigate('/dashboard')} className='btn btn-primary me-2'>Register</button>

                                                    <button className='btn btn-primary me-2' style={{ backgroundColor: '#434141' }}>Admin</button>

                                                </>
                                            }
                                            <button onClick={logout} className='btn btn-danger'>Logout</button>
                                        </>
                                        :
                                        <Nav.Link className='text-black' as={CustomLink} to="/login">Login</Nav.Link>
                                }


                                {/* <Nav.Link as={CustomLink} to="/login">
                                Login
                            </Nav.Link> */}
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </>
        </div>
    );
};

export default Header;