import React, { useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import classes from './Modal.module.css';
import { Context } from '../../index';


const Modal = ({ children, visible, setVisible }) => {
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
        {children}
      </div>
    </div>
  )
}

export default Modal;