import React, { useEffect, useState, useRef, useContext } from 'react';
import { FirebaseContext } from '../../contexts/FirebaseContext';
import { useAuthState } from 'react-firebase-hooks/auth';
import PropTypes from 'prop-types';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoodIcon from '@mui/icons-material/Mood';
import { app } from "../../config/firebase";
import 'firebase/firestore';
import 'firebase/compat/storage';
import classes from './MessageForm.module.css';
import { Grid } from '@mui/material';
import { Emoji } from '../Emoji';
import { useUser } from '../../hooks/useUser';
import { postMessage } from '../../api/messages';
import { MessageType } from '../../types/MessageType';
import { PhotoType } from '../../types/PhotoType';


export const MessageForm = ({ messages, photos, bottomRef }) => {
  const textareaRef = useRef(null);
  const [textValue, setTextValue] = useState('');
  const [isVisibleEmoji, setIsVisibleEmoji] = useState(false);
  const [emojiValue, setEmojiValue] = useState('');
  const [focus, setFocus] = useState(false);

  const btnRef = useRef(null);
  const [value, setValue] = useState('');
  const [imageURL, setImageURL] = useState(null);
  const { auth, firestore } = useContext(FirebaseContext);

  const [user] = useAuthState(auth);

  const { collections } = useUser(user);

  const atachImage = async (event) => {
    const file = event.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);

    await fileRef.put(file);

    setImageURL(await fileRef.getDownloadURL());
  }

  const messageId = messages.length + 1 || 1;
  const photoId = photos.length + 1 || 1;

  const sendMessage = async () => {
    postMessage(user, firestore, collections, value, imageURL, messageId, photoId);

    setValue('');
    setImageURL(null);
    bottomRef.current.scrollIntoView(true);
  }

  useEffect(() => {
    if (!textValue) {
      setValue(emojiValue);

      return;
    }

    setValue(textValue + emojiValue)
  }, [value, emojiValue]);

  const enterKey = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      textareaRef.current.focus();

      return;
    }
  };

  const handleChangeTextValue = (event) => {
    setTextValue(event.target.value);

    if (event.target.value !== undefined) {
      setValue(event.target.value + emojiValue)
      setEmojiValue('');
      return;
    }

    setValue(emojiValue)
    setEmojiValue('');
  }


  if (focus) {
    textareaRef.current.focus();
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!value && !imageURL) {
      return
    }

    sendMessage();

    setValue('');
    setEmojiValue('');
    setTextValue('');
  }

  return (
    <Grid onKeyDown={enterKey}>
      <form
        className={classes.form}
        onSubmit={handleSubmit}
      >
        <label className={classes.label}>
          {imageURL
            ?
            < div className={classes.imgPreviewWrapper}>
              <img src={imageURL} className={classes.imgPreview} alt='img' />
            </div>
            :
            <AttachFileIcon className={classes.icon} />
          }
          <input
            type="file"
            accept="image/*"
            className={classes.fileInput}
            onChange={atachImage} />
        </label>
        <textarea
          ref={textareaRef}
          rows='3'
          className={classes.textarea}
          placeholder={'Write a message...'}
          value={value}
          onChange={(event) => handleChangeTextValue(event)}
          onKeyDown={enterKey}
        >
        </textarea>
        <button className={classes.moodIcon}>
          <MoodIcon
            className={classes.icon}
            onClick={(event) => {
              setIsVisibleEmoji(!isVisibleEmoji);
              event.preventDefault();
              textareaRef.current.focus();
            }}
          />
        </button>

        {isVisibleEmoji &&
          <div className={classes.emoji} >
            <Emoji
              emojiValue={emojiValue}
              onChangeEmojiValue={setEmojiValue}
              onChangeFocus={setFocus}
            />
          </div>
        }

        <button
          ref={btnRef}
          className={classes.button}
        >
          <SendIcon className={classes.icon} />
        </button>
      </form>
    </Grid>
  )
};

MessageForm.propTypes = {
  messages: PropTypes.arrayOf(MessageType),
  photos: PropTypes.arrayOf(PhotoType),
  bottomRef: PropTypes.object.isRequired,
};
