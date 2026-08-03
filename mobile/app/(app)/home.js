import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Image,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuthStore } from '../../store/useAuthStore';
import { useUserProfile } from '../../hooks/useAuthQueries';

export default function HomeScreen() {
  const { user: storeUser, logout } = useAuthStore();
  const { data: queryUser } = useUserProfile();

  const user = queryUser || storeUser;
  const fullName = user?.fullName || 'Mohamed';

  const [activeTab, setActiveTab] = useState('home');

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.headerIconBtn} activeOpacity={0.7}>
          <Ionicons name="menu-outline" size={24} color="#0052cc" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Marhba</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.welcomeSection}>
          <Text style={styles.greeting}>Welcome, {fullName}</Text>
          <Text style={styles.greetingSub}>Here is your daily summary.</Text>
        </View>

        <View style={styles.card}>
          <Image
            source={require('../../assets/desk_office.png')}
            style={styles.cardImage}
            resizeMode="cover"
          />
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>Q3 Performance Review</Text>
            <Text style={styles.cardDesc}>
              Your quarterly report is ready for executive review. Key metrics
              have been updated and are awaiting final sign-off.
            </Text>
            <TouchableOpacity style={styles.reviewButton} activeOpacity={0.85}>
              <Text style={styles.reviewButtonText}>Review Document</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Ionicons name="checkmark-circle-outline" size={24} color="#1e293b" />
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>PENDING TASKS</Text>
          </View>

          <View style={styles.statCard}>
            <Ionicons name="chatbox-outline" size={24} color="#1e293b" />
            <Text style={styles.statValue}>4</Text>
            <Text style={styles.statLabel}>UNREAD MESSAGES</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={logout} activeOpacity={0.7}>
          <Ionicons name="exit-outline" size={16} color="#475569" />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab('home')}
          activeOpacity={0.7}
        >
          <Ionicons
            name="home-outline"
            size={22}
            color={activeTab === 'home' ? '#0052cc' : '#64748b'}
          />
          <Text style={[styles.navText, activeTab === 'home' && styles.navTextActive]}>
            Home
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab('history')}
          activeOpacity={0.7}
        >
          <Ionicons
            name="time-outline"
            size={22}
            color={activeTab === 'history' ? '#0052cc' : '#64748b'}
          />
          <Text style={[styles.navText, activeTab === 'history' && styles.navTextActive]}>
            History
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => setActiveTab('profile')}
          activeOpacity={0.7}
        >
          <Ionicons
            name="person-outline"
            size={22}
            color={activeTab === 'profile' ? '#0052cc' : '#64748b'}
          />
          <Text style={[styles.navText, activeTab === 'profile' && styles.navTextActive]}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0,
  },
  header: {
    height: 56,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'space-between',
    paddingHorizontal: 16,
  },
  headerIconBtn: {
    width: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
    textAlign: 'center',
  },
  headerSpacer: {
    width: 40,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 90,
    gap: 20,
  },
  welcomeSection: {
    marginTop: 4,
    marginBottom: 4,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
  },
  greetingSub: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 180,
  },
  cardBody: {
    padding: 20,
    gap: 12,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
  },
  cardDesc: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 22,
  },
  reviewButton: {
    alignSelf: 'flex-start',
    height: 42,
    backgroundColor: '#0052cc',
    borderRadius: 6,
    paddingHorizontal: 18,
    alignItems: 'center',
    justify: 'center',
    marginTop: 4,
  },
  reviewButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    padding: 20,
    gap: 8,
  },
  statValue: {
    fontSize: 32,
    fontWeight: '700',
    color: '#0f172a',
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748b',
    letterSpacing: 0.5,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'center',
    gap: 6,
    paddingVertical: 14,
    marginTop: 8,
    alignSelf: 'center',
  },
  logoutButtonText: {
    color: '#475569',
    fontSize: 14,
    fontWeight: '600',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 64,
    backgroundColor: '#ffffff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justify: 'center',
    gap: 2,
  },
  navText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748b',
  },
  navTextActive: {
    color: '#0052cc',
    fontWeight: '700',
  },
});
