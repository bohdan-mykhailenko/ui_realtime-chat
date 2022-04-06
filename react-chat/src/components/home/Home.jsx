import React from 'react';
import classes from './Home.module.css'
import Loader from '../loader/Loader'
import { Grid, Container, Button } from '@material-ui/core';

const Home = () => {
  return (
    <Container >
      <Grid
        container
        className={classes.wrapper}
        justifyContent={'center'}>
        <h1 className={classes.title}>dfddddd</h1>
        <div className={classes.text} >LoremLLoremLoremLLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremoremLoremLoremLoremLLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremoremLoremLoremLoremLLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremoremLoremLoremLoremLLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremoremLoremLoremLoremLLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremoremLoremLoremLoremLLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremoremLoremLoremLoremLLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremoremLoremLoremLoremLLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremLoremoremLoremLorem</div>
      </Grid>
      <Loader />
    </Container>
  )
}

export default Home;
