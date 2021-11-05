import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

interface Props {
  text: string;
  color?: string;
  ancho?: boolean;
  accion: (numeroText: string) => void;
}

const ButtonCalc = ({text, color = '#2d2d2d', ancho, accion}: Props) => {
  return (
    <TouchableOpacity onPress={() => accion(text)}>
      <View
        style={{
          ...styles.button,
          backgroundColor: color,
          width: ancho ? 180 : 80,
        }}>
        <Text
          style={{
            ...styles.buttonText,
            color: color === '#9b9b9b' ? 'black' : 'white',
          }}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 80,
    width: 80,
    borderRadius: 100,
    justifyContent: 'center',
    marginHorizontal: 10,
    backgroundColor: '#2d2d2d',
  },

  buttonText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default ButtonCalc;
