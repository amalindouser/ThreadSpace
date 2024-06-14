import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import { asyncPreloadProcess } from '../states/isPreload/action';
import { asyncUnsetAuthUser } from '../states/authUser/action';
import Navigation from './Navigation';
import Loading from './Loading';

const Authentication = (Component) => {
  const AuthenticatedComponentWrapper = function AuthenticatedComponentWrapper(props) {
    const dispatch = useDispatch();
    const userAuth = useSelector((state) => state.authUser);
    const isLoading = useSelector((state) => state.isPreload);

    useEffect(() => {
      if (!userAuth) {
        dispatch(asyncPreloadProcess());
      }
    }, [userAuth, dispatch]);

    if (isLoading) {
      return <Loading />;
    }

    if (!userAuth) {
      return <Navigate to="/login" replace />;
    }

    const handleLogout = () => {
      dispatch(asyncUnsetAuthUser());
    };

    return <Component {...props} logout={handleLogout} />;
  };

  AuthenticatedComponentWrapper.propTypes = {
    logout: PropTypes.func.isRequired,
  };

  return AuthenticatedComponentWrapper;
};

function AuthenticatedComponent(props) {
  const { logout } = props;
  return (
    <>
      <Navigation logout={logout} />
      <Outlet />
    </>
  );
}

AuthenticatedComponent.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default Authentication(AuthenticatedComponent);
