import React from 'react';
import {TextInput} from 'react-native';

function SearchBar({children, onChangeText, placeholder, style}) {
  return (
    <TextInput
      onChangeText={onChangeText}
      placeholder={placeholder}
      style={style}>
      {children}
    </TextInput>
  );
}

export {SearchBar};
