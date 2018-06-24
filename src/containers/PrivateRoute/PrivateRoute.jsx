import React from 'react';
import { Redirect } from 'react-router-dom';

export default ({ children, isAuthenticated, loginPath, render, ...rest }) => {
  if (isAuthenticated) {
    console.log('Authenticated');
    return render(rest);
  }
  return (
    <Redirect to={loginPath} />
  );
};
