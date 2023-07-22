import React from 'react';
import PropTypes from 'prop-types';
import classes from './DateInfo.module.css';
import { Grid } from '@material-ui/core';

export const DateInfo = ({ message }) => {
  const timestamp = message?.createdAt?.seconds * 1000;
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = (date.getFullYear() > 2022) ? '23' : '22';

  return (
    <Grid className={classes.date}>
      <Grid className={classes.dateHM}>
        {hours}
        :
        {minutes}
      </Grid>

      <Grid className={classes.dateDMY}>
        {day}
        /
        {month}
        /
        {year}
      </Grid>
    </Grid>
  )
}

DateInfo.propTypes = {
  message: PropTypes.shape({
    createdAt: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    displayName: PropTypes.string,
    image: PropTypes.string,
    photoURL:  PropTypes.string,
    text: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
};
