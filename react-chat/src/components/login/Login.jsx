import React, { useContext, useState, useEffect } from 'react';
import { Grid, Container, Button } from '@material-ui/core';
import { Context } from '../../index';
import firebase from 'firebase/compat/app';
import classes from './Login.module.css';
import { FacebookAuthProvider, signInWithPopup } from "firebase/auth";



const Login = (setVisible) => {
  const { auth, } = useContext(Context);

  // const login = async () => {
  //   const provider = new firebase.auth.GoogleAuthProvider();
  //   const { user } = await auth.signInWithPopup(provider);
  //   setVisible(false);
  // }

  const login = async () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider);
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
            <h1 className={classes.title}>Log in with:</h1>
            <button className={classes.button} onClick={login}> Google
            </button>
            <button className={classes.button} onClick={login}>
              Facebook
            </button>
            <button className={classes.button} onClick={login}>
              Twitter
            </button>
          </Grid>
        </Grid>
      </Container>
    </div >
  )
}

export default Login;
