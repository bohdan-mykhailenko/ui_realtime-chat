import React, { useContext } from 'react';
import { Grid, Container, Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { Context } from '../index';
import firebase from 'firebase/compat/app';

const Login = () => {
  const { auth } = useContext(Context);

  const login = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const { user } = await auth.signInWithPopup(provider);
  }
  return (
    <div>
      <Container>
        <Grid
          container
          style={{ height: window.innerHeight - 50 }}
          alignItems={'center'}
          justify={'center'}>
          <Grid
            container
            style={{ width: 400, background: 'lightgray' }}
            alignItems={'center'}
            direction={'column'}>
            <Box p={5}>
              <Button onClick={login} variant={'outlined'}>Log in with Google</Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default Login;
