import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../../routes';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '../../index';
import { Layout } from '../../layout/Layout';

const AppRoater = () => {
  const { auth } = useContext(Context);
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


export default AppRoater;