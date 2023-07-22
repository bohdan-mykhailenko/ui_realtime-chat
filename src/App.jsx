import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Layout } from './layout/Layout';
import { FirebaseContext } from './contexts/FirebaseContext';
import Home from './pages/home/Home';
import Chat from "./pages/chat/Chat";
import Gallery from "./pages/gallery/Gallery"

export const App = () => {
  const { auth } = useContext(FirebaseContext);
  const [user] = useAuthState(auth);
  
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {user ? (
          <>
            <Route path="/" element={<Navigate replace to="chat" />} />

            <Route path="chat" element={<Chat />} exact={true} />
            <Route path="gallery" element={<Gallery />} exact={true} />
            
            <Route path="*" element={<Navigate replace to="chat" />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Home />} exact={true} />
          
            <Route path="*" element={<Navigate replace to="/" />} />
          </>
        )}
      </Route>
    </Routes>
  );
};
