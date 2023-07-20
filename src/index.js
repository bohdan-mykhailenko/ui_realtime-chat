import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { ThemeProvider } from '@material-ui/core';
import { FirebaseProvider } from './providers/FirebaseProvider';
import { HashRouter } from 'react-router-dom';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { theme } from './consts/theme';
import './index.css';
 
ReactDOM.render(
  <HashRouter>
    <FirebaseProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </FirebaseProvider>
  </HashRouter>,
  document.getElementById('root')
);

