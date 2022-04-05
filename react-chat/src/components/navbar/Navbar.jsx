import React, { useContext, useState } from 'react';
import AppBar from '@material-ui/core/Appbar';
import Toolbar from '@material-ui/core/Toolbar';
import { Grid } from '@material-ui/core';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '../../index';
import Loader from '../loader/Loader';
import Modal from '../modal/Modal';
import Login from '../login/Login';
import '../../App.css';
import { ReactComponent as Logo } from '../../imgs/logo.svg'
import classes from './Navbar.module.css';


const Navbar = () => {
  const [modal, setModal] = useState(false);
  const { auth, loading, } = useContext(Context);
  const [user] = useAuthState(auth);

  if (loading) {
    return <Loader />
  }

  return (
    <AppBar color={'primary'} position="static">
      <Toolbar className={classes.toolbar} color={'primary'}>
        <Logo className={classes.logo} />
        <h1 className={classes.title} >
          MyChat
        </h1>
        <Grid container justify={"flex-end"}>
          {user
            ?
            <button className={classes.button} onClick={() => auth.signOut()}> Exit</button>
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
    </AppBar>
  )
}

export default Navbar;