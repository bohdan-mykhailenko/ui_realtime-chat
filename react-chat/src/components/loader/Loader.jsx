import React from 'react';
import { Grid, Container } from '@material-ui/core';
import classes from './Loader.module.css';

const Loader = () => {
  return (
    <Container className={classes.container}>
      <Grid
        className={classes.container}
        alignItems={'center'}
        justifyContent={'center'}>
        <Grid
          container
          alignItems={'center'}
          direction={'column'}
        >
          <div className={classes.spinner}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          <h1 className={classes.title}>Loading...</h1>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Loader;