import React, { useEffect, useState, useRef } from 'react';
import { Grid } from '@material-ui/core';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoodIcon from '@mui/icons-material/Mood';
import classes from './Form.module.css';
import { app } from "../../../src/index";
import 'firebase/firestore';
import 'firebase/compat/storage';

const Form = (props) => {
  const textareaRef = useRef(null);
  const [textValue, setTextValue] = useState('');
  const atachImage = async (event) => {
    const file = event.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    props.setImageURL(await fileRef.getDownloadURL());
    // const sendPhotoURL = async () => {
    //   await firestore.collection('photos').add({
    //     createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    //     image: imageURL,
    //     id: itemID,
    //   })
  }
  // const storageRef = app.storage().ref();
  // console.log(storageRef.get())

  useEffect(() => {
    if (!textValue) {
      props.setValue(props.emojiValue)
      return
    }
    props.setValue(textValue + props.emojiValue)
  }, [props]);

  const enterKey = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      textareaRef.current.focus();
    }
  };

  if (props.focus) {
    textareaRef.current.focus();
  }

  return (
    <Grid
      onKeyDown={enterKey}
    >
      <div className={classes.form}>
        <label className={classes.label}>
          {props.imageURL
            ?
            < div className={classes.imgPreviewWrapper}>
              <img src={props.imageURL} className={classes.imgPreview} alt='img' />
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
          value={props.value}
          onChange={event => {
            setTextValue(event.target.value);
            if (event.target.value !== undefined) {
              props.setValue(event.target.value + props.emojiValue)
              props.setEmojiValue('');
              console.log(event.target.value)
              return
            }
            props.setValue(props.emojiValue)
            props.setEmojiValue('');
          }}
          onKeyDown={props.enterKey}
        >
        </textarea>
        <button className={classes.moodIcon}>
          <MoodIcon
            className={classes.icon}
            onClick={(event) => {
              props.setIsVisibleEmoji(!props.isVisibleEmoji);
              event.preventDefault();
              textareaRef.current.focus();
            }}
          />
        </button>
        <button
          ref={props.btnRef}
          className={classes.button}
          onClick={() => {
            if (props.value || props.imageURL) {
              props.sendMessage();
            }
            props.setValue('');
            props.setEmojiValue('');
            setTextValue('');
          }}>
          <SendIcon className={classes.icon} />
        </button>
      </div>
    </Grid >
  )
}

export default Form;