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
import { useTheme } from '../../hooks/useTheme';
import { useGallery } from '../../hooks/useGallery';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7'
import ChatIcon from '@mui/icons-material/Chat';
import CollectionsIcon from '@mui/icons-material/Collections';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const { isVisibleGallery, setIsVisibleGallery } = useGallery(false);
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
        <Grid className={classes.logoWrapper} container >
          <Logo
            className={classes.logo}
            onMouseDown={(event) => escapeMouseDown(event)}
          />
          <h1
            className={classes.title}
            onMouseDown={(event) => escapeMouseDown(event)} >
            MyChat
          </h1>
        </Grid>
        <Grid className={classes.interactiveWrapper} container justifyContent={"flex-end"} >
          {isVisibleGallery === true || isVisibleGallery === 'true'
            ?
            <div className={classes.linkWrapper}>
              <Link Link className={classes.link} to="/chat"
                onClick={() => {
                  setIsVisibleGallery(false)
                }}>
                <ChatIcon className={classes.linkIcon} fontSize='small' />
              </Link>

            </div>
            :
            <div className={classes.linkWrapper}>
              <Link className={classes.link} to="/gallery"
                onClick={() => {
                  setIsVisibleGallery(true)
                }}>
                <CollectionsIcon className={classes.linkIcon} fontSize='small' />
              </Link>

            </div>
          }
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
        </Grid>
      </Toolbar>
    </AppBar >
  )
}

export default Navbar;