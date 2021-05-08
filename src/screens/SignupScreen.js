import React, { useContext } from 'react';
import { NavigationEvents } from 'react-navigation';

import AuthForm from '../components/AuthForm';
import { Context as AuthContext } from '../context/AuthContext';

const SignupScreen = ({ navigation }) => {
  const { state, signup, clearErrorMessage } = useContext(AuthContext);

  <NavigationEvents
    onDidBlur={clearErrorMessage}
    onDidFocus={clearErrorMessage}
    onWillBlur={clearErrorMessage}
    onWillFocus={clearErrorMessage}
  />;

  return (
    <AuthForm
      submit={signup}
      title="Sign Up"
      error={state.errorMessage}
      navText="Already have an account?/nSign-in instead."
      navTextColor="blue"
      navAction={() => {
        navigation.navigate('Signin');
      }}
    />
  );
};

SignupScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

export default SignupScreen;
