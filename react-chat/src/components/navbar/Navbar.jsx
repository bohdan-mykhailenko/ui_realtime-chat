import React, { useContext, useState, useEffect } from 'react';
import AppBar from '@material-ui/core/Appbar';
import Toolbar from '@material-ui/core/Toolbar';
import { Grid } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '../../index';
import Loader from '../loader/Loader';
import Modal from '../modal/Modal';
import Login from '../login/Login';
import '../../App.css';
import { ReactComponent as Logo } from '../../imgs/logo.svg'
import classes from './Navbar.module.css';
import { getAuth } from "firebase/auth";


const Navbar = () => {
  const [modal, setModal] = useState(false);
  const { auth, loading } = useContext(Context);
  const [user] = useAuthState(auth);

  const [photoURL, setPhotoURL] = useState('');



  const getURL = async () => {
    const url = await getAuth().currentUser.photoURL;
    setPhotoURL(url);
  }

  useEffect(() => {
    getURL();
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
        <Grid container justify={"flex-end"} className={classes.buttonWrapper}>
          {user
            ?
            <div>
              <button className={classes.avatarWrapper} onClick={() => {
                auth.signOut();
                //setModal(false);
              }}>
                <Avatar variants='square' src={photoURL} className={classes.avatar} />
              </button>
            </div>
            :
            <div>
              <button className={classes.button} onClick={() => setModal(true)} >Login</button>
              <Modal visible={modal} setVisible={setModal}>
                <Login />
              </Modal>
            </div>
          }
        </Grid>
      </Toolbar>
    </AppBar >
  )
}

export default Navbar;