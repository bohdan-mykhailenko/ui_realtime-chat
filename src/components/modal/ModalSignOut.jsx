import React, { useContext } from 'react';
import classes from './ModalSignIn.module.css';
import { FirebaseContext } from '../../contexts/FirebaseContext';
import Logout from '../logout/Logout';

const ModalSignOut = ({ visible, setVisible }) => {
  const { auth } = useContext(FirebaseContext);
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