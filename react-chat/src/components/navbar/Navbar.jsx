import React, { useContext, useState, useEffect } from 'react';
import AppBar from '@material-ui/core/Appbar';
import Toolbar from '@material-ui/core/Toolbar';
import { Grid } from '@material-ui/core';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '../../index';
import Loader from '../loader/Loader';
import ModalSignIn from '../modal/ModalSignIn';
import ModalSignOut from '../modal/ModalSignOut';
import Login from '../login/Login';
import { ReactComponent as Logo } from '../../imgs/logo.svg'
import classes from './Navbar.module.css';
import { getAuth } from "firebase/auth";
import { useMyTheme } from '../../hooks/useMyTheme';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7'

const Navbar = () => {
  const { theme, setTheme } = useMyTheme();
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

  const escapeMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  }

  if (loading) {
    return <Loader />
  }

  const handleSelectThemeClick = () => {
    if (theme === 'dark') {
      setTheme('light');
      return
    }
    setTheme('dark');
  }

  return (
    <AppBar className={classes.appbar} position="static">
      <Toolbar
        className={classes.toolbar}
        onMouseDown={(event) => escapeMouseDown(event)}>
        <Logo
          className={classes.logo}
          onMouseDown={(event) => escapeMouseDown(event)}
        />
        <h1
          className={classes.title}
          onMouseDown={(event) => escapeMouseDown(event)} >
          MyChat
        </h1>
        <div className="navbar__links">
        </div>
        <Grid container justifyContent={"flex-end"} className={classes.buttonWrapper}>
          <div className={classes.themeSelector}>
            <h2
              style={{
                color: theme === 'dark' ? 'var(--theme-selector-color)' : 'var(--theme-selector-color'
              }}
              className={classes.themeSelectorTitle}>
              {theme}
            </h2>
            <IconButton
              className={classes.themeSelectorIconWrapper}
              onClick={handleSelectThemeClick}
              style={{
                color: theme === 'dark' ? 'var(--theme-selector-color)' : 'var(--theme-selector-color)'
              }}>
              {theme === 'dark'
                ? <Brightness4Icon
                  fontSize='small'
                  className={classes.themeSelectorIcon}
                />
                : <Brightness7Icon
                  fontSize='small'
                  className={classes.themeSelectorIcon}
                />}
            </IconButton>
          </div>
          <div>
            {user
              ?
              <div>
                <button className={classes.avatarWrapper} onClick={() => { setModalSignOut(true) }} >
                  {photoURL
                    ?
                    <img src={photoURL} className={classes.avatar} />
                    :
                    <div className={classes.defaultAvatar}></div>
                  }
                </button>
                <ModalSignOut visible={modalSignOut} setVisible={setModalSignOut} />
              </div>
              :
              <div>
                <button className={classes.button} onClick={() => {
                  setModalSignIn(true);
                  setModalSignOut(false);
                }} >
                  Log in
                </button>
                <ModalSignIn visible={modalSignIn} setVisible={setModalSignIn}>
                  <Login />
                </ModalSignIn>
              </div>
            }
          </div>
        </Grid>
      </Toolbar>
    </AppBar >
  )
}

export default Navbar;