import React, { useState, useEffect } from 'react';
import { Checkbox, IconButton } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import RedoIcon from '@material-ui/icons/Redo';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import KeyboardHideIcon from '@material-ui/icons/KeyboardHide';
import SettingsIcon from '@material-ui/icons/Settings';
import InboxIcon from '@material-ui/icons/Inbox';
import PeopleIcon from '@material-ui/icons/People';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import Section from './Section';
import EmailRow from './EmailRow';
import './EmailList.css';
import { db } from './firebase';

function EmailList() {
    //pease of state
    const [emails, setEmails] = useState([]);
    //run this pease of code when component it runs once 
    useEffect(() => {
        //targetting the collection from database
                                /* VAxfNJugURcPnqLn6k6b
                                message
                                "This is a test message!"
                                subject
                                "Test message"
                                timestamp
                                June 21, 2021 at 4:59:59 PM UTC-4
                                to
                                "annpermi@gmail.com" */
    db.collection('emails')
    .orderBy('timestamp', 'desc')
    .onSnapshot((snapshot) => setEmails (
        snapshot.docs.map((doc) => 
            ({
                id: doc.id,
                data: doc.data()
            }))
        )
    )
    }, []);
    return (
        <div className='emailList'>
            <div className="emailList__settings">
                <div className="emailList__settingsLeft">
                    <Checkbox />
                    <IconButton>
                        <ArrowDropDownIcon/>
                    </IconButton>
                    <IconButton>
                        <RedoIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
                <div className="emailList__settingsRight">
                    <IconButton>
                        <ChevronLeftIcon />
                    </IconButton>
                    <IconButton>
                        <ChevronRightIcon />
                    </IconButton>
                    <IconButton>
                        <KeyboardHideIcon />
                    </IconButton>
                    <IconButton>
                        <SettingsIcon />
                    </IconButton>
                </div>
            </div>

            <div className="emailList__sections">
                    <Section Icon={InboxIcon} title='Primary' color='red' selected/>
                    <Section Icon={PeopleIcon} title='Social' color='#1A73E8'/>
                    <Section Icon={LocalOfferIcon} title='Promotions' color='green'/>
            </div>

            <div className="emailList__list">
                {emails.map(({id, data: {to, subject, message, timestamp}})=>(
                    <EmailRow
                    id={id}
                    key={id}
                    title={to}
                    subject={subject}
                    description={message}
                    time={new Date(timestamp?.seconds * 1000).toUTCString()}
                    />
                ))}
                {/* <EmailRow 
                title='Gmail'
                subject='Hey check this out'
                description='This is a gmail clone'
                time='10pm'
                />
                <EmailRow 
                title='Facebook'
                subject='How are you'
                description='Like please'
                time='10am'
                /> */}
            </div>
        </div>
    )
}

export default EmailList;
