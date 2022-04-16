import React, { useContext, useState, useEffect } from 'react';
import AppBar from '@material-ui/core/Appbar';
import Toolbar from '@material-ui/core/Toolbar';
import { Grid } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '../../index';
import Loader from '../loader/Loader';
import ModalSignIn from '../modal/ModalSignIn';
import ModalSignOut from '../modal/ModalSignOut';
import Login from '../login/Login';
import '../../App.css';
import { ReactComponent as Logo } from '../../imgs/logo.svg'
import classes from './Navbar.module.css';
import { getAuth } from "firebase/auth";
import { Link } from 'react-router-dom';
import { CHAT_ROUTE, HOME_ROUTE } from '../../utils/consts';


const Navbar = () => {
  const [modalSignIn, setModalSignIn] = useState(false);
  const [modalSignOut, setModalSignOut] = useState(false);
  const { auth, loading } = useContext(Context);
  const [user] = useAuthState(auth);
  const [photoURL, setPhotoURL] = useState('');

  const getPhotoURL = async () => {
    const url = await getAuth().currentUser.photoURL;
    setPhotoURL(url);
  }


  useEffect(() => {
    getPhotoURL();
  }, [user]);

  if (loading) {
    return <Loader />
  }

  return (
    <AppBar className={classes.appbar} color={'primary'} position="static">
      <Toolbar className={classes.toolbar} color={'primary'}>
        <Logo className={classes.logo} />
        <h1 className={classes.title} >
          MyChat
        </h1>
        <div className="navbar__links">
        </div>
        <Grid container justify={"flex-end"} className={classes.buttonWrapper}>
          {user
            ?
            <div>
              <button className={classes.avatarWrapper}
                onClick={() => { setModalSignOut(true) }}
              >
                <Avatar variants='square' src={photoURL} className={classes.avatar} />
              </button>
              <ModalSignOut visible={modalSignOut} setVisible={setModalSignOut} />
            </div>
            :
            <div>
              <button className={classes.button} onClick={() => setModalSignIn(true)} >
                Login
              </button>
              <ModalSignIn visible={modalSignIn} setVisible={setModalSignIn}>
                <Login />
              </ModalSignIn>
            </div>
          }
        </Grid>
      </Toolbar>
    </AppBar >
  )
}

export default Navbar;