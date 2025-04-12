import { FormProvider } from 'react-hook-form';
import { FormDefinition, useFormFate } from 'formfatecore';
import { CustomComponents } from './interfaces';
import { FieldRenderer, FieldRendererProps } from './fieldRenderer/fieldRenderer';
import React from 'react';
import Block from './elements/block';
import Button from './elements/button';
import { StyleSheet, View } from 'react-native';

export interface FormFateProps {
    formDefinition: FormDefinition;
    onSubmit?: (data: Record<string, unknown>) => void;
    components?: CustomComponents;
}

export function FormFate({ formDefinition, onSubmit, components }: FormFateProps) {
    const form = useFormFate(formDefinition,);
    const { handleSubmit, control, watch, reset } = form;
    const formValues = watch();


    // Handle form reset by a recurring function
    const handleReset = (fields: Record<string, FormDefinition['properties']>) => {
        reset({}); // Reset the form values to initial state
        // Object.entries(fields).forEach(([name, field]) => {
        //     if (field.type === 'block' && field.properties) {
        //         handleReset(field.properties);
        //     } else {
        //         // console.log('Setting default value for field:', name);
        //         setValue(name, field.default || '');
        //     }
        // });
    };


    const defaultOnSubmit = (data: Record<string, unknown>) => {
        console.log('Form Data Submitted:', data);
    };

    const submitHandler = onSubmit || defaultOnSubmit;
    console.log(form);

    const renderFields = (properties: FormDefinition['properties']) => {
        return Object.entries(properties).map(([key, fieldConfig]: [string, FormDefinition['properties']]) => {
            const conditional = fieldConfig.conditional;

            // Handle conditional display
            if (conditional) {
                const { field, equal, notEqual, state } = conditional;
                const fieldValue = formValues[field] ?? null;
                let conditionMet = false;

                if (equal !== undefined) { conditionMet = fieldValue === equal; }
                else if (notEqual !== undefined) { conditionMet = fieldValue !== notEqual; }

                if (fieldValue === undefined && (equal !== undefined || notEqual !== undefined)) {
                    conditionMet = false;
                }

                if (conditionMet !== state) { return null; }
            }

            // Handle "block" type fields
            if (fieldConfig.type === 'block' && fieldConfig.properties) {
                return (
                    <Block fieldConfig={fieldConfig} key={key}>
                        {renderFields(fieldConfig.properties)}
                    </Block>
                );
            }

            // Render normal field
            return (
                <FieldRenderer
                    key={key}
                    control={control}
                    name={key}
                    fieldConfig={fieldConfig as FieldRendererProps['fieldConfig']}
                    components={components}
                />
            );
        });
    };

    return (
        <FormProvider {...form}>
            {renderFields(formDefinition.properties)}

            <View style={styles.buttonRow}>
                {formDefinition?.buttons?.map((button: any, index: any) => {
                    return (
                        <Button
                            label={button.label}
                            key={index}
                            onPress={button.type === 'submit' ? handleSubmit(submitHandler) : button.type === 'reset' ? () => handleReset(formDefinition) : undefined}
                        />
                    );
                })}
            </View>
        </FormProvider>
    );
}

const styles = StyleSheet.create({
    buttonRow: {
        flexDirection: 'row',
        paddingTop: 16,
        flexWrap: 'wrap',
    },
    buttonWrapper: {
        marginRight: 12,
        marginBottom: 12,
    },
});
