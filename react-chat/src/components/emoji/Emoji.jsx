import React, { useState } from 'react';
import Picker from 'emoji-picker-react';
import classes from './Emoji.module.css';

const Emoji = (props) => {
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    props.setEmojiValue(props.emojiValue + emojiObject.emoji);
  };



  return (
    <div onClick={props.setFocus(true)}>
      <div className={classes.picker}>
        <Picker
          groupVisibility={{
            flags: false,
          }}
          disableSearchBar={true}
          onEmojiClick={onEmojiClick} />
      </div>
    </div>
  );
};

export default Emoji;