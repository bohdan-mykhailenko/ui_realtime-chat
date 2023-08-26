import React from 'react';
import Picker from 'emoji-picker-react';
import PropTypes from 'prop-types';

export const Emoji = ({
  emojiValue,
  onChangeEmojiValue,
  onChangeFocus,
}) => {
  const handleFocus = () => {
    onChangeFocus(true);
  };

  const handleEmojiClick = (event, emojiObject) => {
    onChangeEmojiValue(emojiValue + emojiObject.emoji);
  };

  return (
    <div onClick={handleFocus}>
      <Picker
        groupVisibility={{ flags: false }}
        disableSearchBar={true}
        onEmojiClick={handleEmojiClick}
      />
    </div>
  );
};

Emoji.propTypes = {
  emojiValue: PropTypes.string,
  onChangeEmojiValue: PropTypes.func,
  onChangeFocus: PropTypes.func,
};
