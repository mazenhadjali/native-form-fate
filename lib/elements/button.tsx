import React, { forwardRef } from 'react';
import { Text, TouchableOpacity, StyleSheet, ViewStyle, GestureResponderEvent, View } from 'react-native';

export interface ButtonProps {
  onPress?: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
  label?: string;
}

const Button = forwardRef<View, ButtonProps>(({ onPress, style, label }, ref) => {
  return (
    <TouchableOpacity
      ref={ref}
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.button, style]}
    >
      <Text style={[styles.text]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
);

Button.displayName = 'Button';

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Button;
