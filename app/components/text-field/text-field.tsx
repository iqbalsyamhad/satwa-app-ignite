import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  useController,
  useFormContext,
  ControllerProps,
  UseControllerProps
} from 'react-hook-form';
import { color, spacing } from '../../theme';
import { Caption, TextInput } from 'react-native-paper';

export const TextField = (props) => {

  const {
    containerStyle,
    name,
    rules,
    defaultValue,
    ...inputProps
  } = props;

  const formContext = useFormContext();
  const { ...methods } = formContext

  if (!formContext || !name) {
    const msg = !formContext ? "TextInput must be wrapped by the FormProvider" : "Name must be defined"
    console.error(msg)
    return null
  }

  const { field } = useController({ name, rules, defaultValue });

  return (
    <View style={[
      { backgroundColor: color.palette.bgForms, borderWidth: 1, borderColor: '#E7ECF3', borderRadius: spacing[3], overflow: 'hidden' },
      containerStyle
    ]}>
      <TextInput
        style={{ backgroundColor: 'transparent', height: 50 }}
        underlineColor={'transparent'}
        onChangeText={field.onChange}
        onBlur={field.onBlur}
        value={field.value}
        {...inputProps}
      />
    </View>

  );
};