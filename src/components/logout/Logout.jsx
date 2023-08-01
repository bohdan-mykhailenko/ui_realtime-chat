import React, { useContext, useState, useEffect } from 'react';
import { Grid, Container } from '@mui/material';
import { FirebaseContext } from '../../contexts/FirebaseContext';
import classes from './Logout.module.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuth } from 'firebase/auth';
import Loader from '../loader/Loader';

const Logout = (setVisible) => {
  const { auth } = useContext(FirebaseContext);
  const [photoURL, setPhotoURL] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [user] = useAuthState(auth);

  const getUserInfo = async () => {
    const photoURL = getAuth().currentUser.photoURL;
    let name = await getAuth().currentUser.displayName;
    let email = await getAuth().currentUser.email;

    if (name === null) {
      name = 'GitHub user';
    }

    if (email === null) {
      email = 'hidden_email@mail.com';
    }

    setPhotoURL(photoURL);
    setName(name);
    setEmail(email);
  };

  useEffect(() => {
    getUserInfo();
  }, [user]);

  const logout = async () => {
    await auth.signOut();
    await setVisible(false);

    return <Loader />;
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
            <img src={photoURL} className={classes.avatar} />
            <h1 className={classes.name}>{name}</h1>
            <h2 className={classes.email}>{email}</h2>
            <button className={classes.button} onClick={logout}>
              Log out
            </button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Logout;
