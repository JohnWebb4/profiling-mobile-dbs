import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

function SearchBar({children, onChangeText, placeholder, style}) {
  return (
    <TextInput
      onChangeText={onChangeText}
      placeholder={placeholder}
      style={[styles.text, style]}>
      {children}
    </TextInput>
  );
}

const styles = StyleSheet.create({
  text: {
    borderColor: 'gray',
    borderWidth: 1,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export {SearchBar};
