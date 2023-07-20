import React, { useContext, useState, useRef } from 'react';
import { FirebaseContext } from '../../contexts/FirebaseContext';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Grid } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import firebase from "firebase/compat/app";
import Loader from '../../components/loader/Loader';
import Form from '../../components/form/Form';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import classes from './Chat.module.css';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { MyDate } from '../../components/date'
import { Emoji } from '../../components/Emoji';
import '../../contexts/FirebaseContext';
import 'firebase/firestore';
import 'firebase/compat/storage';
import { useUser } from '../../hooks/useUser';

const Chat = () => {
  const [isVisibleEmoji, setIsVisibleEmoji] = useState(false);
  const [emojiValue, setEmojiValue] = useState('');
  const [focus, setFocus] = useState(false);
  const btnRef = useRef(null);
  const bottomRef = useRef(null);
  const { auth, firestore } = useContext(FirebaseContext);
  const [value, setValue] = useState('');
  const [imageURL, setImageURL] = useState(null);
  const [arrayOfID, setArrayOfID] = useState(new Set());
  const [isVisibleBottomDiv, setIsVisibleBottomDiv] = useState('');

  const [user] = useAuthState(auth);

  const { collections } = useUser(user);

  const [messages, loading] = useCollectionData(
    firestore.collection(collections[0]).orderBy('createdAt')
  )

  //main function
  const sendMessage = async () => {
    await firestore.collection(collections[0]).add({
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      text: value,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      image: imageURL,
    })

    if (imageURL) {
      await firestore.collection(collections[1]).add({
        URL: imageURL,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      })
    }

    firestore.collection(collections[0]).orderBy('createdAt').get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        arrayOfID.add(doc.id);
      });
    });

    setValue('');
    setImageURL(null);
    bottomRef.current.scrollIntoView(true);
  }

  //getDocumentsId

  (function () {
    firestore.collection(collections[0]).orderBy('createdAt').get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        setArrayOfID(arrayOfID.add(doc.id));
      });
    });
  }());

  const getDocumentIdFromSet = (set, index) => {
    let i = 0;
    let result;

    for (let value of set) {
      if (i === index) {
        result = value;
        break
      }
      i++;
    }
    return result;
  }

  //likes

  const likeMessage = async (event) => {
    if (event.detail >= 2) {
      if (event.currentTarget.lastChild.firstChild.style.display === 'block') {
        event.currentTarget.lastChild.firstChild.style.display = 'none';
        await firestore.collection(collections[0]).doc(event.currentTarget.id).update({ like: false });
        return;
      }

      event.currentTarget.lastChild.firstChild.style.display = 'block';
      await firestore.collection(collections[0]).doc(event.currentTarget.id).update({ like: true });
    }
  }

  //visibily of bottom element

  const isVisible = () => {
    const target = bottomRef.current;
    let targetPosition = {
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
      setIsVisibleBottomDiv(true);
      return;
    }
    setIsVisibleBottomDiv(false);
  };

  //key events

  const enterKey = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      btnRef.current.click();
    }
  };

  const escapeMouseDown = (event) => {
    event.stopPropagation();
  }

  if (loading) {
    return <Loader />
  }

  const changeEmojiValue = (value) => setEmojiValue(value);
  const changeFocus = (value) => setFocus(value);

  return (
    <Grid className={classes.container} >
      <div className={classes.wrapper}>
        {user
          ?
          <div
            className={classes.body}
            onScroll={isVisible}>
            {messages.map((message, index) =>
              <div
                key={message.uid}
                onMouseDown={(event) => escapeMouseDown(event)}
                onClick={likeMessage}
                id={getDocumentIdFromSet(arrayOfID, index)}
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
                  <MyDate message={message} />
                </div>
              </div>
            )}
            <div ref={bottomRef} className={classes.bottomItem}>
            </div>
          </div>
          :
          <Loader />
        }
        {
          !isVisibleBottomDiv
            ?
            <div className={classes.arrow} onClick={() => {
              bottomRef.current.scrollIntoView(true);
              escapeMouseDown();
            }}>
              <KeyboardDoubleArrowDownIcon fontSize={'large'} />
            </div>
            :
            <div></div>
        }
        <Form
          imageURL={imageURL}
          setImageURL={setImageURL}
          btnRef={btnRef}
          value={value}
          setValue={setValue}
          sendMessage={sendMessage}
          enterKey={enterKey}
          isVisibleEmoji={isVisibleEmoji}
          setIsVisibleEmoji={setIsVisibleEmoji}
          emojiValue={emojiValue}
          setEmojiValue={setEmojiValue}
          focus={focus}
          setFocus={setFocus}
        />
        {isVisibleEmoji &&
          <div className={classes.emoji} >
            <Emoji
              emojiValue={emojiValue}
              onChangeEmojiValue={changeEmojiValue}
              onChangeFocus={changeFocus}
            />
          </div>
        }
      </div >
    </Grid >
  )
}

export default Chat;