import React from 'react';
import PropTypes from 'prop-types';
import { FirebaseContext } from '../contexts/FirebaseContext';
import firebase from "firebase/compat/app";
import { app } from '../config/firebase';

import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firestore = app.firestore();
const auth = firebase.auth();

export const FirebaseProvider = ({ children }) => (
  <FirebaseContext.Provider
    value={{
      auth,
      firebase,
      firestore,
    }}
  >
    {children}
  </FirebaseContext.Provider>
);

FirebaseProvider.propTypes = {
  children: PropTypes.node,
};
