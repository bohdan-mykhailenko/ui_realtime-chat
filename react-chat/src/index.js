import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { ThemeProvider, createTheme } from '@material-ui/core';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4FBAA7'
    },
    secondary: {
      main: '#530B43'
    }
  }
})

const firebaseConfig = {
  "projectId": "chat-react-f698d",
  "appId": "1:743715572823:web:f75818978a5777f7d26712",
  "databaseURL": "https://chat-react-f698d-default-rtdb.europe-west1.firebasedatabase.app",
  "storageBucket": "chat-react-f698d.appspot.com",
  "locationId": "europe-west",
  "apiKey": "AIzaSyAn2PO7wTGLc-Wr6sr0xG5RkkgulZPifxw",
  "authDomain": "chat-react-f698d.firebaseapp.com",
  "messagingSenderId": "743715572823",
  "measurementId": "G-YFW3X90R2V",
}

export const app = firebase.initializeApp(firebaseConfig);


const firestore = app.firestore();
const auth = firebase.auth();

const photoURL = '';

export const Context = React.createContext(null);

ReactDOM.render(
  <Context.Provider value={{
    firebase,
    auth,
    firestore,
    photoURL,
  }}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Context.Provider>,

  document.getElementById('root')
);

