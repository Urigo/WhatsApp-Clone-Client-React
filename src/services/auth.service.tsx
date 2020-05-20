import React from 'react';
import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import client from '../client';
import { useMeQuery, User } from '../graphql/types';
import { useCacheService } from './cache.service';
import gql from 'graphql-tag';

const MyContext = React.createContext<User|null>(null);

export const useMe = () => {
  return useContext(MyContext);
};

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

export const signIn = ({ username, password }: { username: string, password: string}) => {
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
      password
    }
  });
};

export const signUp = ({ name, username, password, passwordConfirm }: 
  {name: string, username: string, password: string, passwordConfirm: string}) => {
  return client.mutate({
    mutation: gql`
      mutation signUp($name: String!, $username: String!, $password: String!, $passwordConfirm: String!) {
        signUp(name: $name, username: $username, password: $password, passwordConfirm: $passwordConfirm) {
          id
        }
      }
    `,
    variables: {
      name,
      username,
      password,
      passwordConfirm
    }
  });
};

export const signOut = () => {
  document.cookie = `authToken=;expires=${new Date(0)}`;

  return client.clearStore();
};

export const isSignedIn = () => {
  return /authToken=.+(;|$)/.test(document.cookie);
};
