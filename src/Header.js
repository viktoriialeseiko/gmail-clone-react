import React from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AppsIcon from '@material-ui/icons/Apps';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Avatar, IconButton } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import './Header.css';
import { logout, selectUser } from './features/userSlice';
import { auth } from './firebase';

function Header() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();

    const signOut = () => {
        //logout from firebase
        auth.
        signOut()
        .then(() => {
            //logout from google
            dispatch(logout())
        })
    };
    return (
        <div className='header'>
            <div className="header__left">
                <IconButton>
                    <MenuIcon />
                </IconButton>
                <img src='https://cdn.vox-cdn.com/thumbor/8fWz6qpiMYMsZhY4vrc9Vhl5yL8=/0x110:1320x770/fit-in/1200x600/cdn.vox-cdn.com/uploads/chorus_asset/file/21939811/newgmaillogo.jpg' alt='Gmail logo'/>
            </div>
            <div className="header__middle">
                <SearchIcon />
                <input placeholder='Search mail' type='text' />
                <ArrowDropDownIcon />
            </div>
            <div className="header__right">
                <IconButton>
                    <AppsIcon />
                </IconButton>
                <IconButton>
                    <NotificationsIcon />
                </IconButton>
                <IconButton>
                    <Avatar src={user?.photoUrl} onClick={signOut}/>
                </IconButton>
            </div>
        </div>
    )
}

export default Header;
