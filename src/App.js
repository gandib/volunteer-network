import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Pages/Shared/Header/Header';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Donation from './Pages/Donation/Donation';
import Events from './Pages/Events/Events';
import Blog from './Pages/Blog/Blog';
import Login from './Pages/Login/Login/Login';
import RequireAuth from './Pages/Login/RequireAuth/RequireAuth';
import Dashboard from './Pages/Dashboard/Dashboard';
import Signup from './Pages/Login/Signup/Signup';
import Register from './Pages/Register/Register';
import NotFound from './Pages/Shared/NotFound/NotFound';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './firebase.init';

function App() {
  const [user] = useAuthState(auth);
  const admin = user?.email === "gandibroy11@gmail.com";
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/donation' element={<Donation></Donation>}></Route>
        <Route path='/events' element={
          <RequireAuth>
            <Events></Events>
          </RequireAuth>}></Route>
        <Route path='/blog' element={<Blog></Blog>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/register/:regId' element={
          <RequireAuth>
            <Register></Register>
          </RequireAuth>
        }></Route>
        {
          admin &&
          <Route path='/dashboard' element={
            <RequireAuth>
              <Dashboard></Dashboard>
            </RequireAuth>
          }></Route>
        }

        <Route path='*' element={<NotFound></NotFound>}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
