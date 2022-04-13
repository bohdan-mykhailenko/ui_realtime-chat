import React, { useContext, useState, useEffect } from 'react';
import { Grid, Container, Button } from '@material-ui/core';
import { Context } from '../../index';
import firebase from 'firebase/compat/app';
import classes from './Login.module.css';

const Login = (setVisible) => {
  const { auth, } = useContext(Context);

  const login = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const { user } = await auth.signInWithPopup(provider);
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
            <button className={classes.button} onClick={login}>Log in with Google</button>
          </Grid>
        </Grid>
      </Container>
    </div >
  )
}

export default Login;
