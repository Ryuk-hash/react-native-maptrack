import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

import { Context } from '../context/AuthContext';

const AccountScreen = () => {
  const { signout } = useContext(Context);

  return (
    <View style={styles.container}>
      <Text style={{ marginBottom: 30 }}>Account Screen</Text>
      <Button title="Logout" onPress={signout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AccountScreen;
