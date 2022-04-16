import React, { useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import classes from './ModalSignIn.module.css';
import { Context } from '../../index';
import Login from '../login/Login';


const ModalSignIn = ({ visible, setVisible }) => {
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);
  if (user) {
    setVisible(false);
  }

  const rootClasses = [classes.modal];

  if (visible) {
    rootClasses.push(classes.active);
  }

  return (
    <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
      <div className={classes.modalContent} onClick={(e) => e.stopPropagation()} >
        <Login />
      </div>
    </div>
  )
}

export default ModalSignIn;