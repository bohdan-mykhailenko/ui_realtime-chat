import React, { useContext } from 'react';
import { Grid, Container } from '@mui/material';
import { FirebaseContext } from '../../contexts/FirebaseContext';
import firebase from 'firebase/compat/app';
import classes from './Login.module.css';
import Icon from '@mui/material/Icon';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';

const Login = (setVisible) => {
  const { auth } = useContext(FirebaseContext);

  const googleLogin = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const { user } = await auth.signInWithPopup(provider);
    setVisible(false);
    console.log(user);
  };

  const facebookLogin = async () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    const { user } = await auth.signInWithPopup(provider);
    setVisible(false);
    console.log(user);
  };

  const githubLogin = async () => {
    const provider = new firebase.auth.GithubAuthProvider();
    const { user } = await auth.signInWithPopup(provider);
    setVisible(false);
    console.log(user);
  };

  return (
    <div>
      <Container>
        <Grid
          container
          style={{
            height: 'auto',
          }}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Grid
            className={classes.wrapper}
            container
            justifyContent={'center'}
            alignItems={'center'}
            direction={'column'}
          >
            <h1 className={classes.title}>Log in with:</h1>
            <div className={classes.item} onClick={googleLogin}>
              <Icon className={classes.icon}>
                <GoogleIcon className={classes.googleIcon} />
              </Icon>
              <button className={classes.button}>Google</button>
            </div>
            <div className={classes.item} onClick={facebookLogin}>
              <Icon className={classes.icon}>
                <FacebookIcon className={classes.facebookIcon} />
              </Icon>
              <button className={classes.button}>Facebook</button>
            </div>
            <div className={classes.item} onClick={githubLogin}>
              <Icon className={classes.icon}>
                <GitHubIcon className={classes.githubIcon} />
              </Icon>
              <button className={classes.button}>GitHub</button>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Login;
