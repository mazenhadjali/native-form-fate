import React, { forwardRef } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ControllerRenderProps } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';
import { useFormField } from '../../fieldRenderer/formField';

export interface SelectProps {
  fieldConfig?: {
    title?: string;
    description?: string;
    options?: { value: string; label: string }[];
    [key: string]: unknown;
  };
  field?: ControllerRenderProps<Record<string, any>>;
}

export const Select = forwardRef<any, SelectProps>(
  ({ field, fieldConfig }, ref) => {
    const { error } = useFormField();

    return (
      <View style={styles.container}>
        {fieldConfig?.title && (
          <Text style={styles.label}>{fieldConfig.title}</Text>
        )}

        <View
          style={[
            styles.pickerContainer,
            error ? styles.errorBorder : styles.defaultBorder,
          ]}
        >
          <Picker
            ref={ref}
            selectedValue={field?.value}
            onValueChange={(itemValue) => field?.onChange(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="-- Select an option --" value="" enabled={false} />
            {fieldConfig?.options?.map((option) => (
              <Picker.Item
                key={option.value}
                label={option.label}
                value={option.value}
              />
            ))}
          </Picker>
        </View>

        {fieldConfig?.description && !error && (
          <Text style={styles.description}>{fieldConfig.description}</Text>
        )}

        {error?.message && (
          <Text style={styles.errorText}>{error.message}</Text>
        )}
      </View>
    );
  }
);

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
  pickerContainer: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
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
  errorBorder: {
    borderWidth: 1,
    borderColor: '#e74c3c',
  },
  defaultBorder: {
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default Select;
