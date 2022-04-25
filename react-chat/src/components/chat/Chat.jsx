import React, { useContext, useState, useRef, useEffect } from 'react';
import { Context } from '../../index';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Grid, Container } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import firebase from "firebase/compat/app";
import Loader from '../loader/Loader';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import classes from './Chat.module.css';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import MyDate from '../date/MyDate'
import { doc } from 'firebase/firestore';

const Chat = () => {
  const btnRef = useRef(null);
  const bottomRef = useRef(null);
  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);
  const [value, setValue] = useState('');
  const [messages, loading] = useCollectionData(
    firestore.collection('messages').orderBy('createdAt')
  )
  const [url, setUrl] = useState(null);
  const [fileInput, setFileInput] = useState('');
  const [visibleBottomDiv, setVisibleBottomDiv] = useState('');

  const sendMessage = async () => {
    await firestore.collection('messages').add({
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      text: value,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      image: url,
    })
    setValue('');
    setUrl('');
    bottomRef.current.scrollIntoView(true);
  }
  // Delete wong messages
  // var query = firestore.collection('messages').where("text", '==', "Перевірка");
  // query.get().then(function (querySnapshot) {
  //   querySnapshot.forEach(function (doc) {
  //     doc.ref.delete();
  //   });
  // });

  // var element = document.getElementById('id').getBoundingClientRect().top;
  // console.log(element);

  const visible = () => {
    const target = document.getElementById('id');
    var targetPosition = {
      top: window.pageYOffset + target.getBoundingClientRect().top,
      left: window.pageXOffset + target.getBoundingClientRect().left,
      right: window.pageXOffset + target.getBoundingClientRect().right,
      bottom: window.pageYOffset + target.getBoundingClientRect().bottom
    },
      windowPosition = {
        top: window.pageYOffset,
        left: window.pageXOffset,
        right: window.pageXOffset + document.documentElement.clientWidth,
        bottom: window.pageYOffset + document.documentElement.clientHeight
      };

    if (targetPosition.bottom > windowPosition.top &&
      targetPosition.top < windowPosition.bottom &&
      targetPosition.right > windowPosition.left &&
      targetPosition.left < windowPosition.right) {
      setVisibleBottomDiv(true);
    } else {
      setVisibleBottomDiv(false);
    };
  };


  const enterKey = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      btnRef.current.click();
      //bottomRef.current.scrollIntoView(true);
    }
  };

  if (loading) {
    return <Loader />
  }

  return (
    <Container >
      <div className={classes.wrapper}>
        {user
          ?
          <div
            className={classes.body}
            onScroll={visible}>
            {messages.map(message =>
              <div
                className={classes.item}
                style={{
                  margin: 5,
                  marginTop: 10,
                  border: user.uid === message.uid ? '3px solid #4FBAA7' : '3px solid #555',
                  borderRadius: user.uid === message.uid ? '25px 25px 0px 25px' : '0px 25px 25px 25px',
                  marginLeft: user.uid === message.uid ? 'auto' : '5px',
                  width: 'fit-content'
                }}>
                <Grid container >
                  {message.photoURL
                    ?
                    <div>
                      <Avatar src={message.photoURL} className={classes.avatar} />
                      <div className={classes.name}>
                        {message.displayName
                          ? <div>
                            {message.displayName}
                          </div>
                          : <div>
                            {"Github user"}
                          </div>
                        }
                      </div>
                    </div>
                    :
                    <Loader />
                  }
                </Grid>
                <div className={classes.text}>{message.text}</div>
                {message.image
                  ?
                  <div className={classes.imgWrapper}>
                    <img src={message.image} className={classes.img} />
                  </div>
                  :
                  <div className={classes.emptyImg}>
                  </div>
                }
                <MyDate message={message} />
              </div>
            )}
            <div id={'id'} ref={bottomRef} className={classes.bottomItem}>
              dddd
            </div>
          </div>
          :
          <Loader />
        }
        {!visibleBottomDiv
          ?
          <div className={classes.arrow} onClick={() => {
            bottomRef.current.scrollIntoView(true);
          }}>
            <KeyboardDoubleArrowDownIcon fontSize={'large'} />
          </div>
          :
          <div></div>
        }
        <div className={classes.form}>
          <textarea
            rows='3'
            className={classes.textarea}
            placeholder={'Write a message...'}
            value={value}
            onChange={event => setValue(event.target.value)}
            onKeyDown={enterKey}
          >
          </textarea>
          <label className={classes.label}>
            {url
              ?
              < div className={classes.imgPreviewWrapper}>
                <img src={url} className={classes.imgPreview} />
              </div>
              :
              <AttachFileIcon className={classes.icon} fontSize={'large'} />
            }

            <input
              type="file"
              accept="image/*"
              className={classes.fileInput}
              onChange={(event) => {
                setFileInput(event.target.value);
                const file = event.target.files[0];
                const reader = new FileReader();
                reader.onload = () => {
                  setUrl(reader.result)
                }
                reader.readAsDataURL(file);
              }} />
          </label>
          <button
            ref={btnRef}
            className={classes.button}
            onClick={(value || url) && sendMessage}>
            <SendIcon className={classes.icon} fontSize={'large'} />
          </button>
        </div>

      </div >
    </Container >
  )
}

export default Chat;