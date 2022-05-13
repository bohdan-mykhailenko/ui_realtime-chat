import React from 'react';
import Picker from 'emoji-picker-react';

const Emoji = (props) => {
  const onEmojiClick = (event, emojiObject) => {
    props.setEmojiValue(props.emojiValue + emojiObject.emoji);
  };

  return (
    <div onClick={props.setFocus(true)}>
      <div>
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