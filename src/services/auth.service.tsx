import { useCallback } from 'react';
import { useApolloClient } from '@apollo/react-hooks';

export const signIn = (currentUserId: string) => {
  document.cookie = `currentUserId=${currentUserId}`;

  // This will become async in the near future
  return Promise.resolve();
};

export const useSignOut = () => {
  const client = useApolloClient();

  return useCallback(() => {
    // "expires" represents the lifespan of a cookie. Beyond that date the cookie will
    // be deleted by the browser. "expires" cannot be viewed from "document.cookie"
    document.cookie = `currentUserId=;expires=${new Date(0)}`;

    // Clear cache
    return client.clearStore();
  }, [client]);
};

export const isSignedIn = () => {
  return /currentUserId=.+(;|$)/.test(document.cookie);
};
