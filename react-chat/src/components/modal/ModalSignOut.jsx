import React, { useContext } from 'react';
import classes from './ModalSignIn.module.css';
import { Context } from '../../index';
import Logout from '../logout/Logout';

const ModalSignOut = ({ visible, setVisible }) => {
  const { auth } = useContext(Context);
  const rootClasses = [classes.modal];

  if (visible) {
    rootClasses.push(classes.active);
  }

  return (
    <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
      <div className={classes.modalContent} onClick={(e) => e.stopPropagation()} >
        <Logout setVisible={setVisible} />
      </div>
    </div>
  )
}

export default ModalSignOut;