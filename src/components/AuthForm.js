import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Button } from 'react-native-elements';

import GlobalStyles from '../constants/styles';
import NavLink from '../components/NavLink';

const AuthForm = ({ submit, title, error, navTextColor, navText, navAction }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const isEmailValid = email !== '' && email.match(/^\S+@\S+$/);
  const isPasswordValid = password !== '' && password.length > 7;
  const isFormValid = isEmailValid && isPasswordValid;

  const submitHandler = async () => {
    clearErrors();

    if (!isFormValid) {
      if (!isEmailValid) setEmailError('Email should be valid (example: johndoe@gmail.com)');
      else setEmailError('');

      if (!isPasswordValid) setPasswordError('Password should be at least 7 characters');
      else setPasswordError('');

      return;
    }

    submit({ email, password });

    clearErrors();
  };

  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
    setLoading((prev) => !prev);
  };

  return (
    <View style={styles.container}>
      <Text style={[GlobalStyles.mb5]} h3>
        {title} for Tracker
      </Text>

      <Input
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={setEmail}
        value={email}
        labelStyle={GlobalStyles.mt5}
        label="Email"
        errorStyle={{ color: 'red' }}
        errorMessage={emailError}
      />

      <Input
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={setPassword}
        value={password}
        label="Password"
        errorStyle={{ color: 'red' }}
        errorMessage={passwordError}
        secureTextEntry={true}
      />

      {error ? <Text style={GlobalStyles.error}>{error}</Text> : null}

      <Button
        loading={loading}
        containerStyle={[styles.submitBtn, GlobalStyles.m3]}
        title={title}
        onPress={submitHandler}
      />

      <NavLink color={navTextColor} clicked={navAction}>
        {navText}
      </NavLink>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  submitBtn: { alignSelf: 'stretch' },
});

export default AuthForm;
