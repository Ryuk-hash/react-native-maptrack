import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const NavLink = ({ children, clicked, color }) => {
  return (
    <View style={styles.navLink}>
      <TouchableOpacity onPress={clicked}>
        {children.split('/n').map((line, index) => {
          return (
            <Text key={`Line-${index}`} style={{ color }}>
              {line}
            </Text>
          );
        })}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navLink: {
    alignItems: 'center',
    margin: 25,
  },
});

export default NavLink;
