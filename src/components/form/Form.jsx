import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoodIcon from '@mui/icons-material/Mood';
import classes from './Form.module.css';
import { app } from "../../config/firebase";
import 'firebase/firestore';
import 'firebase/compat/storage';

const Form = ({
  setImageURL,
  setValue,
  emojiValue,
  setEmojiValue,
  value,
  imageURL,
  sendMessage,
  focus,
  setIsVisibleEmoji,
  isVisibleEmoji,
  btnRef,
}) => {
  const textareaRef = useRef(null);
  const [textValue, setTextValue] = useState('');

  const atachImage = async (event) => {
    const file = event.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setImageURL(await fileRef.getDownloadURL());
  }

  useEffect(() => {
    if (!textValue) {
      setValue(emojiValue)
      return;
    }

    setValue(textValue + emojiValue)
  }, [value]);

  const enterKey = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      textareaRef.current.focus();
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

  const handleClickButton = () => {
    if (value || imageURL) {
      sendMessage();
    }

    setValue('');
    setEmojiValue('');
    setTextValue('');
  }

  if (focus) {
    textareaRef.current.focus();
  }

  return (
    <Grid onKeyDown={enterKey}>
      <div className={classes.form}>
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
        <button
          ref={btnRef}
          className={classes.button}
          onClick={handleClickButton}>
          <SendIcon className={classes.icon} />
        </button>
      </div>
    </Grid>
  )
}

Form.propTypes = {
  setImageURL: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  emojiValue: PropTypes.string.isRequired,
  setEmojiValue: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  imageURL: PropTypes.string.isRequired,
  sendMessage: PropTypes.func.isRequired,
  focus: PropTypes.func.isRequired,
  setIsVisibleEmoji: PropTypes.func.isRequired,
  isVisibleEmoji: PropTypes.bool.isRequired,
  btnRef: PropTypes.object.isRequired,
};

export default Form;