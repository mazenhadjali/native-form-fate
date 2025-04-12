import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

type Props = {
    children?: React.ReactNode;
    fieldConfig?: {
        title?: string;
        className?: string; // Ignored in RN, unless you're using a utility-based library
        [key: string]: any;
    };
};

const Block = ({ children, fieldConfig }: Props) => {
    return (
        <View style={styles.container}>
            {fieldConfig?.title && (
                <Text style={styles.title}>{fieldConfig.title}</Text>
            )}
            <View>
                {children}
            </View>
        </View>
    );
};

const styles = StyleSheet.create<{ container: ViewStyle; title: TextStyle; }>({
    container: {
        marginBottom: 24,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
    },
});

export default Block;
