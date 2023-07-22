import React from 'react';
import { Grid } from '@material-ui/core';
import classes from './Loader.module.css';

const Loader = () => {
  return (
    <Grid
      container
      className={classes.container}
      alignItems={'center'}
      justifyContent={'center'}>
      <Grid
        container
        alignItems={'center'}
        direction={'column'}
      >
        <div className={"spinner"}><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
      </Grid>
    </Grid>
  )
}

export default Loader;