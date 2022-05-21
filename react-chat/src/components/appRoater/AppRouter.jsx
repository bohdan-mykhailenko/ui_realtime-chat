import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../../routes';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '../../index';

const AppRoater = () => {
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);

  return user
    ?
    (
      <Routes>
        {privateRoutes.map(({ path, component }) =>
          <Route
            key={path}
            path={path}
            element={component}
            exact={true} />
        )}
        {<Route path="*" element={<Navigate replace to={'/chat'} />} />}
      </Routes>
    )
    :
    (
      <Routes>
        {publicRoutes.map(({ path, component }) =>
          <Route
            key={path}
            path={path}
            element={component}
            exact={true} />
        )}
        {<Route path="*" element={<Navigate replace to={'/home'} />} />}
      </Routes>
    )
}

export default AppRoater;