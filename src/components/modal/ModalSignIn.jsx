import React, { useContext, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import classes from './ModalSignIn.module.css';
import { FirebaseContext } from '../../contexts/FirebaseContext';
import Login from '../login/Login';

const ModalSignIn = ({ visible, setVisible }) => {
  const { auth } = useContext(FirebaseContext);
  const [user] = useAuthState(auth);
  const rootClasses = [classes.modal];

  useEffect(() => {
    setVisible(false);
  }, []);

  if (visible) {
    rootClasses.push(classes.active);
  }

  if (user) {
    setVisible(false);
  }

  return (
    <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
      <div className={classes.modalContent} onClick={(e) => e.stopPropagation()} >
        <Login setVisible={setVisible} />
      </div>
    </div>
  )
}

export default ModalSignIn;