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
import { useLoginMutation } from '../../hooks/useAuthQueries';
import { HeaderLogo } from '../../components/HeaderLogo';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { ErrorMessage } from '../../components/ErrorMessage';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();
  const loginMutation = useLoginMutation();

  const handleLogin = () => {
    setErrorMessage('');
    if (!email || !password) {
      setErrorMessage('Please fill in all fields');
      return;
    }

    loginMutation.mutate(
      { email, password },
      {
        onError: (error) => {
          setErrorMessage(error.message || 'Incorrect email or password');
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
        <HeaderLogo
          title="Marhba"
          subtitle="Sign in to continue"
        />

        <View style={styles.form}>
          <ErrorMessage message={errorMessage} />

          <CustomInput
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <CustomInput
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            isPassword
            rightActionLabel="Forgot Password?"
          />

          <CustomButton
            title="Log In"
            onPress={handleLogin}
            isLoading={loginMutation.isPending}
            style={styles.loginBtn}
          />
        </View>

        <View style={styles.footerContainer}>
          <TouchableOpacity
            onPress={() => router.push('/(auth)/register')}
            activeOpacity={0.7}
            style={styles.footerTouch}
          >
            <Text style={styles.footerText}>
              Don't have an account?{' '}
              <Text style={styles.registerLinkText}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
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
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  form: {
    gap: 16,
  },
  loginBtn: {
    marginTop: 8,
  },
  footerContainer: {
    marginTop: 36,
    alignItems: 'center',
  },
  footerTouch: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  footerText: {
    fontSize: 14,
    color: '#4b5563',
  },
  registerLinkText: {
    color: '#1d61e7',
    fontWeight: '600',
  },
});
