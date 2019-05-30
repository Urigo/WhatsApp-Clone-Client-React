import React from 'react';
import { Redirect } from 'react-router-dom';
import client from '../client';
import { useCacheService } from './cache.service';
import gql from 'graphql-tag';

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

    useCacheService();

    return <Component {...props as P} />;
  };
};

export const signIn = ({
  username,
  password,
}: {
  username: string;
  password: string;
}) => {
  return client.mutate({
    mutation: gql`
      mutation signIn($username: String!, $password: String!) {
        signIn(username: $username, password: $password) {
          id
        }
      }
    `,
    variables: {
      username,
      password,
    },
  });
};

export const signOut = () => {
  document.cookie = `authToken=;expires=${new Date(0)}`;

  return client.clearStore();
};

export const isSignedIn = () => {
  return /authToken=.+(;|$)/.test(document.cookie);
};
