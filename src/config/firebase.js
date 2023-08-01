import firebase from 'firebase/compat/app';

const firebaseConfig = {
  projectId: 'chat-react-f698d',
  appId: '1:743715572823:web:f75818978a5777f7d26712',
  databaseURL:
    'https://chat-react-f698d-default-rtdb.europe-west1.firebasedatabase.app',
  storageBucket: 'chat-react-f698d.appspot.com',
  locationId: 'europe-west',
  apiKey: 'AIzaSyAn2PO7wTGLc-Wr6sr0xG5RkkgulZPifxw',
  authDomain: 'chat-react-f698d.firebaseapp.com',
  messagingSenderId: '743715572823',
  measurementId: 'G-YFW3X90R2V',
};

export const app = firebase.initializeApp(firebaseConfig);
