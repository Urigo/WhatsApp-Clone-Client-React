import React from 'react';
import { Redirect } from 'react-router-dom';

export const withAuth(component: React.Component) => {
  return (props) => getAuthHeader() ? (
    <Component {...props} authHeader={getAuthHeader()} user={getUser()} />
  ) : (
    <Redirect {...props} to="/login" />
  );
};

export const storeAuthHeader = (auth: string) => {
  localStorage.setItem('Authorization', auth);
};

export const getAuthHeader = (): string => {
  return localStorage.getItem('Authorization');
};

export const storeUser = (user: User) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const getUser = (): User => {
  return JSON.parse(localStorage.getItem('user'));
};

export default {
  withAuth,
  storeAuthHeader,
  getAuthHeader,
  storeUser,
  getUser,
};
