import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export function HeaderLogo({ title = 'Marhba', subtitle = 'Sign in to continue' }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/hexagon_symbol.png')}
        style={styles.logoImage}
        resizeMode="contain"
      />
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 28,
  },
  logoImage: {
    width: 52,
    height: 52,
    borderRadius: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
  },
  subtitle: {
    fontSize: 15,
    color: '#4b5563',
    marginTop: 6,
    textAlign: 'center',
  },
});
