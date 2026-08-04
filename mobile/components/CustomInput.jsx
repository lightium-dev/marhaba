import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export function CustomInput({
  label,
  value,
  onChangeText,
  placeholder,
  isPassword = false,
  rightActionLabel,
  onRightActionPress,
  keyboardType = 'default',
  autoCapitalize = 'none',
  autoCorrect = false,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.input, isPassword && styles.passwordInput]}
          placeholder={placeholder}
          placeholderTextColor="#9ca3af"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={isPassword && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
        />
        {isPassword ? (
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowPassword(!showPassword)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="#9ca3af"
            />
          </TouchableOpacity>
        ) : null}
      </View>

      {rightActionLabel ? (
        <View style={styles.rightActionRow}>
          <TouchableOpacity onPress={onRightActionPress} activeOpacity={0.7}>
            <Text style={styles.rightActionText}>{rightActionLabel}</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    height: 44,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    paddingHorizontal: 14,
    fontSize: 15,
    color: '#111827',
  },
  passwordInput: {
    paddingRight: 44,
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    height: '100%',
    justifyContent: 'center',
  },
  rightActionRow: {
    alignItems: 'flex-end',
    marginTop: 2,
  },
  rightActionText: {
    fontSize: 13,
    color: '#1d61e7',
    fontWeight: '500',
  },
});
