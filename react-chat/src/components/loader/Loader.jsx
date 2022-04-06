import React from 'react';
import { Grid, Container } from '@material-ui/core';
import classes from './Loader.module.css';

const Loader = () => {
  return (
    <Container>
      <Grid
        container
        style={{ height: window.innerHeight - 50 }}
        alignItems={'center'}
        justify={'center'}>
        <Grid
          container
          alignItems={'center'}
          direction={'column'}
        >
          <div class={classes.spinner}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          <h1 class={classes.title}>Loading...</h1>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Loader;