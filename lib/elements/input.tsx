import React from 'react';
import { Text, TextInput, View, StyleSheet, TextInputProps } from 'react-native';
import { useFormField } from '../fieldRenderer/formField';
import { ControllerRenderProps } from 'react-hook-form';

export interface InputProps extends TextInputProps {
    fieldConfig: {
        type: string;
        title?: string;
        placeholder?: string;
        description?: string;
        className?: string;
        [key: string]: unknown;
    };
    field: ControllerRenderProps<Record<string, any>>;
}

const Input = ({ field, fieldConfig, style, ...rest }: InputProps) => {
    const { error } = useFormField();

    return (
        <View style={styles.wrapper}>
            {fieldConfig.title && (
                <Text style={styles.label}>{fieldConfig.title}</Text>
            )}

            <TextInput
                {...field}
                placeholder={fieldConfig.placeholder}
                secureTextEntry={fieldConfig.type === 'password'}
                keyboardType={fieldConfig.type === 'email' ? 'email-address' : 'default'}
                style={[
                    styles.input,
                    error && styles.inputError,
                    style,
                ]}
                onChangeText={field.onChange}
                {...rest}
            />

            {error?.message && (
                <Text style={styles.errorText}>{error.message}</Text>
            )}
        </View>
    );
};

export default Input;

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 16,
        width: '100%',
    },
    label: {
        marginBottom: 6,
        fontWeight: '500',
        fontSize: 14,
        color: '#333',
    },
    input: {
        width: '100%',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 8,
        fontSize: 15,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    inputError: {
        borderColor: '#e74c3c',
        shadowColor: '#e74c3c',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    errorText: {
        marginTop: 4,
        color: '#e74c3c',
        fontSize: 13,
    },
});
