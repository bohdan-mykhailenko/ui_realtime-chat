import React from 'react';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import classes from './Form.module.css';


const Form = (props) => {
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
          onChange={(event) => {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = () => {
              props.setImageURL(reader.result)
            }
            reader.readAsDataURL(file);
          }} />
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
