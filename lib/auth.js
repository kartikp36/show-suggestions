import React, { useState, useEffect, useContext, createContext } from 'react';
import { createUser } from './database';
import firebase from './firebase';

const authContext = createContext();

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

const useProvideAuth = () => {
  const [user, setUser] = useState(null);

  const formatUser = (user) => {
    return {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      photoUrl: user.photoURL,
      provider: user.providerData[0].providerId,
    };
  };
  const handleUser = (rawUser) => {
    if (rawUser) {
      console.log('raw:', rawUser);
      const user = formatUser(rawUser);
      createUser(user.uid, user);
      setUser(user);

      console.log('format:', user);
      return user;
    } else {
      setUser(false);
      return false;
    }
  };
  const signinWithGithub = () => {
    return firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider())
      .then((response) => {
        handleUser(response.user);
      });
  };

  const signout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => handleUser(false));
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(handleUser);

    return () => unsubscribe();
  }, []);

  return {
    user,
    signinWithGithub,
    signout,
  };
};
