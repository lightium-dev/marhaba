import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useRegisterMutation } from '../../hooks/useAuthQueries';
import { HeaderLogo } from '../../components/HeaderLogo';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { ErrorMessage } from '../../components/ErrorMessage';

export default function RegisterScreen() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();
  const registerMutation = useRegisterMutation();

  const handleRegister = () => {
    setErrorMessage('');
    if (!fullName.trim() || !email.trim() || !password) {
      setErrorMessage('Please fill in all fields');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters');
      return;
    }

    registerMutation.mutate(
      { fullName, email, password },
      {
        onError: (error) => {
          setErrorMessage(error.message || 'Registration failed');
        },
      }
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <HeaderLogo title="Create Account" subtitle="Join Marhba today." />

        <View style={styles.card}>
          <ErrorMessage message={errorMessage} />

          <View style={styles.form}>
            <CustomInput
              label="Full Name"
              placeholder="Jane Doe"
              value={fullName}
              onChangeText={setFullName}
              autoCapitalize="words"
            />

            <CustomInput
              label="Email"
              placeholder="jane@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <CustomInput
              label="Password"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              isPassword
            />

            <CustomButton
              title="Sign Up"
              onPress={handleRegister}
              isLoading={registerMutation.isPending}
              style={styles.signUpBtn}
            />
          </View>

          <View style={styles.footerContainer}>
            <TouchableOpacity
              onPress={() => router.push('/(auth)/login')}
              activeOpacity={0.7}
              style={styles.footerTouch}
            >
              <Text style={styles.footerText}>
                Already have an account?{' '}
                <Text style={styles.loginLinkText}>Login</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    paddingHorizontal: 24,
    paddingVertical: 28,
    gap: 16,
  },
  form: {
    gap: 16,
  },
  signUpBtn: {
    marginTop: 8,
    backgroundColor: '#0052cc',
  },
  footerContainer: {
    marginTop: 8,
    alignItems: 'center',
  },
  footerTouch: {
    paddingVertical: 4,
  },
  footerText: {
    fontSize: 14,
    color: '#475569',
  },
  loginLinkText: {
    color: '#0052cc',
    fontWeight: '600',
  },
});
