import React from 'react';
import { Redirect } from 'react-router-dom';
import client from '../client';
import { useCacheService } from './cache.service';

export const withAuth = <P extends object>(Component: React.ComponentType<P>) => {
  return (props: any) => {
    if (!isSignedIn()) {
      if (props.history.location.pathname === '/sign-in') {
        return null;
      }

      return (
        <Redirect to="/sign-in" />
      );
    }

    useCacheService();

    return (
      <Component {...props as P} />
    );
  };
};

export const signIn = (currentUserId: string) => {
  document.cookie = `currentUserId=${currentUserId}`;

  // This will become async in the near future
  return Promise.resolve();
};

export const signOut = () => {
  // "expires" represents the lifespan of a cookie. Beyond that date the cookie will
  // be deleted by the browser. "expires" cannot be viewed from "document.cookie"
  document.cookie = `currentUserId=;expires=${new Date(0)}`;

  // Clear cache
  return client.clearStore();
};

export const isSignedIn = () => {
  return /currentUserId=.+(;|$)/.test(document.cookie);
};