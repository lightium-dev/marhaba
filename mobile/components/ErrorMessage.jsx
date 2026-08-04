import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function ErrorMessage({ message }) {
  if (!message) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffdad6',
    borderWidth: 1,
    borderColor: '#ba1a1a',
    borderRadius: 8,
    padding: 12,
    marginVertical: 4,
  },
  text: {
    color: '#93000a',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});
