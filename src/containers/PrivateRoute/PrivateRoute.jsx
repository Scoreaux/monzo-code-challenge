import React from 'react';
import { Redirect } from 'react-router-dom';

export default ({ isAuthenticated, loginPath, render, ...rest }) => {
  if (isAuthenticated) {
    return render(rest);
  }
  return (
    <Redirect to={loginPath} />
  );
};
