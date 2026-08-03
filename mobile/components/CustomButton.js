import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';

export function CustomButton({
  title,
  onPress,
  isLoading = false,
  disabled = false,
  variant = 'primary',
  icon,
  style,
}) {
  const isDanger = variant === 'danger';
  const isSecondary = variant === 'secondary';

  return (
    <TouchableOpacity
      style={[
        styles.button,
        isSecondary && styles.buttonSecondary,
        isDanger && styles.buttonDanger,
        (isLoading || disabled) && styles.buttonDisabled,
        style,
      ]}
      onPress={onPress}
      disabled={isLoading || disabled}
      activeOpacity={0.85}
    >
      {isLoading ? (
        <ActivityIndicator color={isSecondary ? '#1d61e7' : '#ffffff'} />
      ) : (
        <>
          {icon}
          <Text
            style={[
              styles.buttonText,
              isSecondary && styles.buttonTextSecondary,
              isDanger && styles.buttonTextDanger,
            ]}
          >
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 46,
    backgroundColor: '#1d61e7',
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justify: 'center',
    paddingHorizontal: 16,
    gap: 8,
  },
  buttonSecondary: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  buttonDanger: {
    backgroundColor: '#dc2626',
  },
  buttonDisabled: {
    opacity: 0.65,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
  buttonTextSecondary: {
    color: '#374151',
    fontWeight: '500',
  },
  buttonTextDanger: {
    color: '#ffffff',
    fontWeight: '600',
  },
});
