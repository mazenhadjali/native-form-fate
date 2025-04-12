import React, { createContext, useId } from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';

type FormItemContextValue = { id: string };

export const FormItemContext = createContext<FormItemContextValue>({} as FormItemContextValue);

interface FormItemProps extends ViewProps {
    children: React.ReactNode;
}

export const FormItem = ({ children, style, ...props }: FormItemProps) => {
    const id = useId();

    return (
        <FormItemContext.Provider value={{ id }}>
            <View
                style={[styles.container, style]}
                {...props}
            >
                {children}
            </View>
        </FormItemContext.Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        gap: 8, // Only supported in newer React Native versions
        // If targeting older versions, replace with marginBottom on children
    },
});
