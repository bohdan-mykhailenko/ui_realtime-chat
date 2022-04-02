import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAn2PO7wTGLc-Wr6sr0xG5RkkgulZPifxw",
  authDomain: "chat-react-f698d.firebaseapp.com",
  projectId: "chat-react-f698d",
  storageBucket: "chat-react-f698d.appspot.com",
  messagingSenderId: "743715572823",
  appId: "1:743715572823:web:85db2765e440dcd2d26712",
  measurementId: "G-4JH19BSE76"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const firestore = firebaseApp.firestore();
const auth = firebase.auth();

export const Context = React.createContext(null);

ReactDOM.render(
  <Context.Provider value={{
    firebase,
    auth,
    firestore,
  }}>
    <App />
  </Context.Provider>,

  document.getElementById('root')
);

