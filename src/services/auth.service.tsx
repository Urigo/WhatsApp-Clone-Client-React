import React from 'react';
import { useContext, useCallback } from 'react';
import { useApolloClient } from 'react-apollo-hooks';
import { Redirect } from 'react-router-dom';
import { useMeQuery, User, useSignInMutation, useSignUpMutation } from '../graphql/types';
import { useCacheService } from './cache.service';

const MyContext = React.createContext<User | null>(null);

export const useMe = () => {
  return useContext(MyContext);
};

export const withAuth = <P extends object>(
  Component: React.ComponentType<P>
) => {
  return (props: any) => {
    if (!isSignedIn()) {
      if (props.history.location.pathname === '/sign-in') {
        return null;
      }

      return <Redirect to="/sign-in" />;
    }

    const signOut = useSignOut();
    const { data, error, loading } = useMeQuery();

    useCacheService();

    if (loading) return null;

    if (data === undefined) return null;

    if (error || !data.me) {
      signOut();

      return <Redirect to="/sign-in" />;
    }

    return (
      <MyContext.Provider value={data.me}>
        <Component {...props as P} />
      </MyContext.Provider>
    );
  };
};

export const useSignIn = useSignInMutation;
export const useSignUp = useSignUpMutation;

export const useSignOut = () => {
  const client = useApolloClient()

  return useCallback(() => {
    // "expires" represents the lifespan of a cookie. Beyond that date the cookie will
    // be deleted by the browser. "expires" cannot be viewed from "document.cookie"
    document.cookie = `authToken=;expires=${new Date(0)}`;

    // Clear cache
    return client.clearStore();
  }, [client])
};

export const isSignedIn = () => {
  return /authToken=.+(;|$)/.test(document.cookie);
};
