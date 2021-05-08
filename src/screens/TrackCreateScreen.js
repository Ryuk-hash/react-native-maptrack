import React from 'react';
import { Text } from 'react-native-elements';
import { SafeAreaView } from 'react-navigation';
import { StyleSheet, StatusBar } from 'react-native';

import Map from '../components/Map';

const TrackCreateScreen = () => {
  return (
    <SafeAreaView style={styles.container} forceInset={{ top: 'always' }}>
      <Text h1>TrackCreateScreen</Text>
      <Map />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});

export default TrackCreateScreen;
