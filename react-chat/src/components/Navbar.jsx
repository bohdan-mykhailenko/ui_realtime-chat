import React, { useContext } from 'react';
import AppBar from '@material-ui/core/Appbar';
import Toolbar from '@material-ui/core/Toolbar';
import { Grid, Button } from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import { LOGIN_ROUTE } from '../utils/consts';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '../index';

const Navbar = () => {
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);

  return (
    <AppBar color={'secondary'} position="static">
      <Toolbar variant={'dense'}>
        <Grid container justify={"flex-end"}>
          {user
            ? <Button onClick={() => auth.signOut()} variant={'outlined'}>Exit</Button>
            :
            <NavLink to={LOGIN_ROUTE}>
              <Button variant={'outlined'}>Login</Button>
            </NavLink>
          }
        </Grid>
      </Toolbar>
    </AppBar >
  )
}

export default Navbar;