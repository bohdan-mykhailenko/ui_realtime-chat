import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../../routes';
import { CHAT_ROUTE, HOME_ROUTE } from '../../utils/consts';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '../../index';

const AppRoater = () => {
  const { auth } = useContext(Context);
  const [user] = useAuthState(auth);

  return user ?
    (
      <Routes>
        {privateRoutes.map(({ path, component }) =>
          <Route
            key={path}
            path={path}
            element={component}
            exact={true} />
        )}
        {<Route path="*" element={<Navigate replace to={CHAT_ROUTE} />} />}
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
        {<Route path="*" element={<Navigate replace to={HOME_ROUTE} />} />}
      </Routes>
    )
}

export default AppRoater;