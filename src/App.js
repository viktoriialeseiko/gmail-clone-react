import React, { useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Mail from './Mail';
import EmailList from './EmailList';
import SendMail from './SendMail';
import { useSelector } from 'react-redux';
import { selectSendMessageIsOpen } from './features/mailSlice';
import { login, selectUser } from './features/userSlice';
import Login from './Login';
import { useDispatch } from 'react-redux';
import './App.css';
import { auth } from './firebase';

function App() {
  // Pull data from the state
  const sendMessageIsOpen = useSelector(selectSendMessageIsOpen);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if(user){
        //the user is logged in
        dispatch(
          login({
          displayName: user.displayName,
          email: user.email,
          photoUrl: user.photoURL
        }))
      }
    })
  }, []);

  return (
    <Router>
{/* If no user -> login or -> render whole page */}
      {!user ? (
      <Login />
      ): (
      <div className="app">
        <Header />

        <div className="app__body">
          <Sidebar />

          <Switch>
            <Route path='/mail'>
              <Mail />
            </Route>
            <Route>
              <EmailList path='/'/>
            </Route>
          </Switch>

        </div>
        {sendMessageIsOpen && <SendMail />}
      </div>
      )}
    </Router>
  );
}

export default App;
