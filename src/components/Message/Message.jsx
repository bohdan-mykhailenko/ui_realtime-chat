import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Grid } from '@mui/material';
import classes from '../../pages/c  hat/Chat.module.css';
import { DateInfo } from '../DateInfo/DateInfo';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { MessageType } from '../../types/MessageType';
import { PhotoType } from '../../types/PhotoType';

export const Message = ({ message, index, user }) => {
  // const likeMessage = async (event) => {
  //   if (event.detail >= 2) {
  //     if (event.currentTarget.lastChild.firstChild.style.display === 'block') {
  //       event.currentTarget.lastChild.firstChild.style.display = 'none';
  //       await firestore.collection(collections[0]).doc(event.currentTarget.id).update({ like: false });
  //       return;
  //     }

  //     event.currentTarget.lastChild.firstChild.style.display = 'block';
  //     await firestore.collection(collections[0]).doc(event.currentTarget.id).update({ like: true });
  //   }
  // }

  const escapeMouseDown = (event) => {
    event.stopPropagation();
  }

  return (
    <div
      onMouseDown={(event) => escapeMouseDown(event)}
      //onClick={likeMessage}
      id={index}
      className={classes.item}
      style={{
        margin: 5,
        marginTop: 10,
        background: user.uid === message.uid ? 'var(--first-color)' : 'var(--message-color)',
        border: user.uid === message.uid ? '3px solid var(--first-color)' : '3px solid var(--message-color)',
        borderRadius: user.uid === message.uid ? '25px 25px 0px 25px' : '0px 25px 25px 25px',
        marginLeft: user.uid === message.uid ? 'auto' : '5px',
        width: 'fit-content'
      }}>
      <Grid container className={classes.infoWrapper}>
        <Avatar src={message.photoURL} className={classes.avatar} />
        <div
          className={classes.name}
          onMouseDown={(event) => escapeMouseDown(event)}
        >
          {message.displayName
            ? <div>
              {message.displayName}
            </div>
            : <div>
              {"Github user"}
            </div>
          }
        </div>
      </Grid>
      <div
        className={classes.text}
        onMouseDown={(event) => escapeMouseDown(event)}
      >
        {message.text}
      </div>
      {message.image
        ?
        <div className={classes.imgWrapper}>
          <img src={message.image} className={classes.img} alt='img' />
        </div>
        :
        <div className={classes.emptyImg}>
        </div>
      }
      <div className={classes.bottomInfoWrapper}>
        <FavoriteIcon className={classes.like}
          style={{
            display: message.like === true ? 'block' : 'none'
          }} />
        <DateInfo message={message} />
      </div>
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.shape(MessageType),
  photos: PropTypes.shape(PhotoType),
  user: PropTypes.object,
};
