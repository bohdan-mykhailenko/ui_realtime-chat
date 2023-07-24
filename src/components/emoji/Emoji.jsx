import React from 'react';
import Picker from 'emoji-picker-react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';

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
    <Grid onClick={handleFocus}>
      <Picker
        groupVisibility={{ flags: false }}
        disableSearchBar={true}
        onEmojiClick={handleEmojiClick} 
      />
    </Grid>
  );
};

Emoji.propTypes = {
  emojiValue: PropTypes.string,
  onChangeEmojiValue: PropTypes.func,
  onChangeFocus: PropTypes.func,
}
