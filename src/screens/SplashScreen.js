import React, { useContext, useEffect } from 'react';
import { Context as AuthContext } from '../context/AuthContext';

const SplashScreen = () => {
  const { localSignIn } = useContext(AuthContext);

  useEffect(() => {
    localSignIn();
  }, []);
  return null;
};

export default SplashScreen;
