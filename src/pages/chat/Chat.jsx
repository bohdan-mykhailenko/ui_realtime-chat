import React, { useContext, useState, useRef } from 'react';
import { FirebaseContext } from '../../contexts/FirebaseContext';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Grid } from '@material-ui/core';
import Loader from '../../components/loader/Loader';
import { MessageForm } from '../../components/MessageForm';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import '../../contexts/FirebaseContext';
import 'firebase/firestore';
import 'firebase/compat/storage';
import { useUser } from '../../hooks/useUser';
import { Message } from '../../components/Message';
import classes from './Chat.module.css';

const Chat = () => {
  const { auth, firestore } = useContext(FirebaseContext);

  const [arrayOfID, setArrayOfID] = useState(new Set());
  const [isVisibleBottomDiv, setIsVisibleBottomDiv] = useState('');
  const bottomRef = useRef(null);

  // console.log(emojiValue);

  const [user] = useAuthState(auth);

  const { collections } = useUser(user);

  const [messages, messagesLoading] = useCollectionData(firestore
    .collection(collections[0])
    .orderBy('createdAt')
  );
  const [photos, photosLoading] = useCollectionData(firestore
    .collection(collections[1])
    .orderBy('createdAt')
  );

  if (photosLoading || messagesLoading) {
    return <Loader />
  }

  (function () {
    firestore.collection(collections[0]).orderBy('createdAt').get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        setArrayOfID(arrayOfID.add(doc.id));
      });
    });
  }());

  // const getDocumentIdFromSet = (set, index) => {
  //   let i = 0;
  //   let result;

  //   for (let value of set) {
  //     if (i === index) {
  //       result = value;
  //       break
  //     }
  //     i++;
  //   }
  //   return result;
  // }

  //likes

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




  // const changeEmojiValue = (event, value) => {
  //   setEmojiValue(value);
  // };

  // const changeFocus = (value) => setFocus(value);

  const escapeMouseDown = (event) => {
    event.stopPropagation();
  }

  return (
    <Grid className={classes.container} >
      <div className={classes.wrapper}>
        <div
          className={classes.body}
          onScroll={isVisible}>
          {messages.map((message, index) =>
            <Message
              key={message.id}
              message={message}
              index={index}
              user={user}
            />
          )}
          <div ref={bottomRef} className={classes.bottomItem}>
          </div>
        </div>

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

        <MessageForm messages={messages} photos={photos} bottomRef={bottomRef} />
      </div>
    </Grid>
  )
}

export default Chat;