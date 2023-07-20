import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes/routes';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Layout } from './layout/Layout';
import { FirebaseContext } from './contexts/FirebaseContext';

export const App = () => {
  const { auth } = useContext(FirebaseContext);
  const [user] = useAuthState(auth);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {user ? (
          <>
            {privateRoutes.map(({ path, component }) => (
              <Route key={path} path={path} element={component} exact={true} />
            ))}
            <Route path="*" element={<Navigate replace to={'/chat'} />} />
          </>
        ) : (
          <>
            {publicRoutes.map(({ path, component }) => (
              <Route key={path} path={path} element={component} exact={true} />
            ))}
            <Route path="*" element={<Navigate replace to={'/home'} />} />
          </>
        )}
      </Route>
    </Routes>
  );
};
