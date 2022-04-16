import React, { useContext, useState, useEffect } from 'react';
import { Grid, Container, Button } from '@material-ui/core';
import { Context } from '../../index';
import firebase from 'firebase/compat/app';
import classes from './Logout.module.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from "firebase/auth";
import Avatar from '@material-ui/core/Avatar';

const Logout = (setVisible) => {
  const { auth, } = useContext(Context);
  const [photoURL, setPhotoURL] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [user] = useAuthState(auth);

  const getPhotoURL = async () => {
    const photoURL = await getAuth().currentUser.photoURL;
    const name = await getAuth().currentUser.displayName;
    const email = await getAuth().currentUser.email;
    setPhotoURL(photoURL);
    setName(name);
    setEmail(email);
  }


  useEffect(() => {
    getPhotoURL();
  }, [user]);

  const logout = async () => {
    auth.signOut()
    setVisible(false);
  }

  return (
    <div>
      <Container >
        <Grid
          container
          style={{
            height: 'auto'
          }}
          alignItems={'center'}
          justify={'center'}
        >
          <Grid
            className={classes.wrapper}
            container
            justifyContent={'center'}
            alignItems={'center'}
            direction={'column'}>
            <Avatar variants='square' src={photoURL} className={classes.avatar} />
            <h1 className={classes.name}>{name}</h1>
            <h2 className={classes.email}>{email}</h2>
            <button className={classes.button} onClick={logout}>
              Log out
            </button>
          </Grid>
        </Grid>
      </Container>
    </div >
  )
}

export default Logout;
