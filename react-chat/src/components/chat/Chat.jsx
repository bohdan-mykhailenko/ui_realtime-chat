import React, { useContext, useState, useRef } from 'react';
import { Context } from '../../index';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Grid, Container, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import firebase from "firebase/compat/app";
import Loader from '../loader/Loader';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import classes from './Chat.module.css';

const Chat = () => {
  const btnRef = useRef(null);
  const bottomRef = useRef(null);
  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);
  const [value, setValue] = useState('');
  const [messages, loading] = useCollectionData(
    firestore.collection('messages').orderBy('createdAt')
  )

  const sendMessage = async () => {
    firestore.collection('messages').add({
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      text: value,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
    setValue('');
    bottomRef.current.scrollIntoView(true);
  }

  const enterKey = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      btnRef.current.click();
    }
  };

  if (loading) {
    return <Loader />
  }

  return (
    <Container >
      <div
        className={classes.wrapper}>
        <div
          className={classes.body}>
          {messages.map(message =>
            <div
              className={classes.item}
              style={{
                margin: 5,
                marginTop: 10,
                border: user.uid === message.uid ? '3px solid green' : '3px solid #fff',
                borderRadius: user.uid === message.uid ? '25px 25px 0px 25px' : '0px 25px 25px 25px',
                marginLeft: user.uid === message.uid ? 'auto' : '5px',
                width: 'fit-content'
              }}>
              <Grid container >
                <Avatar src={message.photoURL} className={classes.avatar} />
                <div className={classes.name}>
                  {message.displayName}
                </div>
              </Grid>
              <div className={classes.text}>{message.text}</div>
            </div>
          )}
          <div ref={bottomRef} className={classes.bottomItem}></div>
        </div>
        <div
          className={classes.inputWrapper}
        >
          <textarea
            autoFocus
            className={classes.input}
            placeholder={'Write a message...'}
            value={value}
            onChange={event => setValue(event.target.value)}
            onKeyDown={enterKey}
          ></textarea>
          <button
            ref={btnRef}
            className={classes.button}
            onClick={value && sendMessage}>
            Send
          </button>
        </div>
      </div >
    </Container >
  )
}

export default Chat;