import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function StatCard({ icon, label, value }) {
  return (
    <View style={styles.card}>
      <View style={styles.iconBadge}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e2ed',
    padding: 16,
  },
  iconBadge: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#f1f3fe',
    alignItems: 'center',
    justify: 'center',
    marginBottom: 8,
  },
  icon: {
    fontSize: 18,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: '#717786',
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#181c23',
    marginTop: 2,
  },
});
