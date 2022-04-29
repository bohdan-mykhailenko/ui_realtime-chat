import React, { useContext } from 'react';
import firebase from "firebase/compat/app";
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import classes from './Form.module.css';
import { app } from "../../../src/index";
import { Context } from '../../index';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import 'firebase/firestore';
import 'firebase/compat/storage';

const Form = (props) => {
  const { firestore } = useContext(Context);
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

  const [photos, loading] = useCollectionData(
    firestore.collection('photos').orderBy('createdAt')
  )


  return (
    <div className={classes.form}>
      <textarea
        rows='3'
        className={classes.textarea}
        placeholder={'Write a message...'}
        value={props.value}
        onChange={event => props.setValue(event.target.value)}
        onKeyDown={props.enterKey}
      >
      </textarea>
      <label className={classes.label}>
        {props.imageURL
          ?
          < div className={classes.imgPreviewWrapper}>
            <img src={props.imageURL} className={classes.imgPreview} />
          </div>
          :
          <AttachFileIcon className={classes.icon} fontSize={'large'} />
        }

        <input
          type="file"
          accept="image/*"
          className={classes.fileInput}
          onChange={atachImage} />
      </label>
      <button
        ref={props.btnRef}
        className={classes.button}
        onClick={(props.value || props.imageURL) && props.sendMessage}>
        <SendIcon className={classes.icon} fontSize={'large'} />
      </button>
    </div>
  )
}

export default Form;