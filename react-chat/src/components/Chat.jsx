import React, { useContext, useState } from 'react';
import { Context } from '../index';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Grid, Container, Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import firebase from "firebase/compat/app";
import Loader from './Loader';
import { useCollectionData } from 'react-firebase-hooks/firestore';

const Chat = () => {
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
  }

  if (loading) {
    return <Loader />
  }


  return (
    <Container>
      <Grid
        container
        style={{ height: window.innerHeight - 50, marginTop: 5 }}
        justify={'center'}>
        <div style={{ width: '80%', height: '68vh', border: '1px solid gray', overflowY: 'auto' }}>
          {messages.map(message =>
            <div style={{
              margin: 10,
              border: user.uid === message.uid ? '2px solid green' : '2px dashed red',
              marginLeft: user.uid === message.uid ? 'auto' : '10px',
              width: 'fit-content'
            }}>
              <Grid container>
                <Avatar src={message.photoURL} />
                <div>{message.displayName}</div>
              </Grid>
              <div>{message.text}</div>
            </div>
          )}
        </div>
        <Grid
          container
          direction={'column'}
          alignItems={'flex-end'}
          style={{ width: '80%' }}
        >
          <TextField
            fullWidth
            variant={'outlined'}
            rowsMax={2}
            value={value}
            onChange={event => setValue(event.target.value)}
          />
          <Button
            variant={'outlined'}
            onClick={sendMessage}>
            Send
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Chat;