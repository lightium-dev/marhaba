import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function UserProfileCard({ fullName, email }) {
  const initial = fullName ? fullName.charAt(0).toUpperCase() : 'U';

  return (
    <View style={styles.card}>
      <View style={styles.avatarCircle}>
        <Text style={styles.avatarText}>{initial}</Text>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{fullName || 'Utilisateur'}</Text>
        <Text style={styles.userEmail}>{email || 'email@example.com'}</Text>
      </View>
      <View style={styles.activeBadge}>
        <Text style={styles.activeBadgeText}>CONNECTÉ</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e2ed',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#d8e2ff',
    alignItems: 'center',
    justify: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0058bc',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 17,
    fontWeight: '700',
    color: '#181c23',
  },
  userEmail: {
    fontSize: 13,
    color: '#717786',
    marginTop: 2,
  },
  activeBadge: {
    backgroundColor: '#d1e7dd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  activeBadgeText: {
    color: '#0f5132',
    fontSize: 10,
    fontWeight: 'bold',
  },
});
