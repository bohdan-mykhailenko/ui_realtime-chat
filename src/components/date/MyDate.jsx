import classes from './MyDate.module.css';
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { FirebaseContext } from '../../contexts/FirebaseContext';
import { useCollectionData } from 'react-firebase-hooks/firestore';

export const MyDate = ({ message }) => {
  const [time, setTime] = useState(new Date());
  const { firestore } = useContext(FirebaseContext);
  const [messages] = useCollectionData(
    firestore.collection('messages').orderBy('createdAt')
  )

  const getTime = async () => {
    const timestamp = new Date(message.createdAt.seconds * 1000);
    setTime(timestamp);
  };

  useEffect(() => {
    getTime();
  }, [messages]);

  const date = new Date(time);

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  if (hours < 10) {
    hours = '0' + hours;
  }

  if (minutes < 10) {
    minutes = '0' + minutes;
  }

  if (day < 10) {
    day = '0' + day;
  }

  if (month < 10) {
    month = '0' + month;
  }

  if (year > 2022) {
    year = 23;
  } else {
    year = 22;
  }

  return (
    <div className={classes.date}>
      <div className={classes.dateHM}>
        {hours + ':'}
        {minutes}
      </div>
      <div className={classes.dateDMY}>
        {day + '/'}
        {month + '/'}
        {year}
      </div>
    </div>
  )
}

MyDate.propTypes = {
  message: PropTypes.shape({
    createdAt: PropTypes.timestamp,
    displayName: PropTypes.string,
    image: PropTypes.string,
    photoURL:  PropTypes.string,
    text: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
};
