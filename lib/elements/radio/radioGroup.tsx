import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { ControllerRenderProps } from 'react-hook-form';
import { useFormField } from '../../fieldRenderer/formField';

export interface RadioFieldProps {
    fieldConfig?: {
        title?: string;
        description?: string;
        options: { label: string; value: string }[];
    };
    field?: ControllerRenderProps<Record<string, any>>;
}

export const RadioField: React.FC<RadioFieldProps> = ({ field, fieldConfig }) => {
    const { error } = useFormField();

    return (
        <View style={styles.container}>
            {fieldConfig?.title && <Text style={styles.label}>{fieldConfig.title}</Text>}

            <View style={styles.optionsContainer}>
                {fieldConfig?.options.map((option) => (
                    <Pressable
                        key={option.value}
                        onPress={() => field?.onChange(option.value)}
                        style={styles.option}
                    >
                        <View
                            style={[
                                styles.radioOuter,
                                field?.value === option.value && styles.radioOuterSelected,
                            ]}
                        >
                            {field?.value === option.value && <View style={styles.radioInner} />}
                        </View>
                        <Text style={styles.optionLabel}>{option.label}</Text>
                    </Pressable>
                ))}
            </View>

            {fieldConfig?.description && !error && (
                <Text style={styles.description}>{fieldConfig.description}</Text>
            )}

            {error?.message && <Text style={styles.errorText}>{error.message}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
        width: '100%',
    },
    label: {
        marginBottom: 6,
        fontWeight: '500',
        fontSize: 14,
        color: '#333',
    },
    optionsContainer: {
        flexDirection: 'column',
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    radioOuter: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#ccc',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioOuterSelected: {
        borderColor: '#007AFF',
    },
    radioInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#007AFF',
    },
    optionLabel: {
        fontSize: 15,
        color: '#333',
    },
    description: {
        marginTop: 4,
        fontSize: 13,
        color: '#666',
    },
    errorText: {
        marginTop: 4,
        color: '#e74c3c',
        fontSize: 13,
    },
});

export default RadioField;
