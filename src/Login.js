import React from 'react';
import Button from '@material-ui/core/Button';
import { auth, provider } from './firebase';
import { login } from './features/userSlice'
import { useDispatch } from 'react-redux';
import './Login.css';

function Login() {
    const dispatch = useDispatch();
    const signIn = () => {
        // e.preventDefault();
        // Google authentification 
        auth
        .signInWithPopup(provider)
        .then(({user}) => {
            dispatch(
                login ({
                displayName: user.displayName,
                email: user.email,
                photoUrl: user.photoURL,
                })
            );
        })
        .catch(error=>alert("Error message"))
    };

    return (
        <div className='login'>
            <div className="login__container">
                <img src="https://www.google.com/gmail/about/static-2.0/images/logo-gmail.png?fingerprint=c2eaf4aae389c3f885e97081bb197b97" alt="Gmail logo" />
                <Button variant="contained" color="primary" onClick={signIn}>Login</Button>
            </div>
        </div>
    )
}

export default Login
