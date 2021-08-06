import React from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { closeSendMessage } from './features/mailSlice';
import { db } from './firebase';
import firebase from 'firebase';
import './SendMail.css';

function SendMail() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }} = useForm();
    const dispatch = useDispatch();
    const onSubmit = (formData) => {
        //import data from local firebase file
        //every time we submit, will push data to firebase
        db.collection('emails').add(
            {
                to: formData.to,
                subject: formData.subject,
                message: formData.message,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            }
        )
        dispatch(closeSendMessage())
    };

    return (
        <div className='sendMail'>
            <div className="sendMail__header">
                <h3>New message</h3>
                {/* Close message */}
                <CloseIcon onClick={()=>dispatch(closeSendMessage())} className='sendMail__close'/>
            </div>

            {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* register your input into the hook by invoking the "register" function */}
                <input type='email' placeholder='To'{...register('to', { required: true })}/>
                {/* errors will return when field validation fails  */}
                {errors.to && <p className='sendMail__error'>To is Required!</p>}

                {/* include validation with required or other standard HTML validation rules */}
                <input placeholder='Subject' type="text" {...register('subject', { required: true })}/>
                {errors.subject && <p className='sendMail__error'>Subject is Required!</p>}

                <input placeholder='Message...' type="text" className='sendMail__message' {...register('message', { required: true })}/>
                {errors.message && <p className='sendMail__error'>Message is Required!</p>}

                <div className="sendMail__options">
                    <Button type='submit' className='sendMail__send'>Send</Button>
                </div>
            </form>
        </div>
    )
}

export default SendMail;
