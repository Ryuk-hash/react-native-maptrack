import React, { useContext } from 'react';
import { NavigationEvents } from 'react-navigation';

import AuthForm from '../components/AuthForm';
import { Context as AuthContext } from '../context/AuthContext';

const SigninScreen = ({ navigation }) => {
  const { state, signin, clearErrorMessage } = useContext(AuthContext);

  <NavigationEvents
    onDidBlur={clearErrorMessage}
    onDidFocus={clearErrorMessage}
    onWillBlur={clearErrorMessage}
    onWillFocus={clearErrorMessage}
  />;

  return (
    <AuthForm
      submit={signin}
      title="Sign In"
      error={state.errorMessage}
      navText="Don't have an account?/nGo back to sign up."
      navTextColor="blue"
      navAction={() => {
        navigation.navigate('Signup');
      }}
    />
  );
};

SigninScreen.navigationOptions = () => {
  return {
    headerShown: false,
  };
};

export default SigninScreen;
