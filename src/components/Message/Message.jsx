import React, { memo, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Grid } from '@mui/material';
import classes from './Message.module.scss';
import { DateInfo } from '../DateInfo/DateInfo';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { MessageType } from '../../types/MessageType';
import { FirebaseContext } from '../../contexts/FirebaseContext';
import { useUser } from '../../hooks/useUser';
import { useAuthState } from 'react-firebase-hooks/auth';

export const Message = memo(({ message }) => {
  const { auth, firestore } = useContext(FirebaseContext);
  const [user] = useAuthState(auth);
  const { collections } = useUser(user);

  const [liked, setLiked] = useState(message.like || false);
  const [updatingLike, setUpdatingLike] = useState(false);

  const handleLikeClick = async () => {
    if (updatingLike) {
      return;
    }

    try {
      const likeStatus = !liked;
      const docId = String(message.id);

      setUpdatingLike(true);
      setLiked(likeStatus);

      await firestore.collection(collections[0])
        .doc(docId)
        .set({
          like: likeStatus
        }, {
          merge: true
        });
    } catch (error) {
      console.error('Error updating like status:', error);
    } finally {
      setUpdatingLike(false);
    }
  };

  const escapeMouseDown = (event) => {
    event.stopPropagation();
  }

  return (
    <Grid
      onMouseDown={(event) => escapeMouseDown(event)}
      onClick={handleLikeClick}
      className={classes.message}
      style={{
        margin: 5,
        marginTop: 10,
        background: user.uid === message.uid ? 'var(--first-color)' : 'var(--message-color)',
        border: user.uid === message.uid ? '3px solid var(--first-color)' : '3px solid var(--message-color)',
        borderRadius: user.uid === message.uid ? '25px 25px 0px 25px' : '0px 25px 25px 25px',
        marginLeft: user.uid === message.uid ? 'auto' : '5px',
        width: 'fit-content'
      }}>
      <Grid container className={classes.message__infoWrapper}>
        <Avatar src={message.photoURL} className={classes.message__avatar} />
        <Grid
          className={classes.message__name}
          onMouseDown={(event) => escapeMouseDown(event)}
        >
          {message.displayName
            ? <Grid>
              {message.displayName}
            </Grid>
            : <Grid>
              {"Github user"}
            </Grid>
          }
        </Grid>
      </Grid>
      <Grid
        className={classes.message__text}
        onMouseDown={(event) => escapeMouseDown(event)}
      >
        {message.text}
      </Grid>
      {message.image
        ?
        <Grid className={classes.message__imgWrapper}>
          <img src={message.image} className={classes.message__img} alt='img' />
        </Grid>
        :
        <Grid className={classes.message__emptyImg}>
        </Grid>
      }
      <Grid className={classes.message__bottomInfoWrapper}>
        <FavoriteIcon className={classes.message__like}
          style={{
            display: message.like === true ? 'block' : 'none'
          }} />
        <DateInfo message={message} />
      </Grid>
    </Grid>
  );
});

Message.displayName = 'Message';

Message.propTypes = {
  message: PropTypes.shape(MessageType),
};
