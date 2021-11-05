import React, {useState} from 'react';
import {View, Text} from 'react-native';
import ButtonCalc from '../components/ButtonCalc';
import {styles} from '../theme/appTheme';

const CalculadoraScreen = () => {
  const [numero, setNumero] = useState('0');
  const [previousNumber, setPreviousNumber] = useState('0');

  const clean = () => {
    setNumero('0');
    setPreviousNumber('0');
  };

  const makeNumber = (numeroTexto: string) => {
    if (numero.includes('.') && numeroTexto === '.') return;
    if (numero.startsWith('0') || numero.startsWith('-0')) {
      if (numeroTexto === '.') {
        setNumero(numero + numeroTexto);
      } else if (numeroTexto === '0' && numero.includes('.')) {
        setNumero(numero + numeroTexto);
      } else if (numeroTexto !== '0' && !numero.includes('.')) {
        setNumero(numeroTexto);
      } else if (numeroTexto === '0' && !numero.includes('.')) {
        setNumero(numero);
      } else {
        setNumero(numero + numeroTexto);
      }
    } else {
      setNumero(numero + numeroTexto);
    }
  };

  const PositiveNegative = () => {
    if (numero.includes('-')) {
      setNumero(numero.replace('-', ''));
    } else {
      setNumero('-' + numero);
    }
  };

  return (
    <View style={styles.calcContainer}>
      <Text style={styles.smallResult}>{previousNumber}</Text>
      <Text style={styles.result} numberOfLines={1} adjustsFontSizeToFit>
        {numero}
      </Text>
      <View style={styles.buttonsRow}>
        <ButtonCalc text="C" color="#9b9b9b" accion={clean} />
        <ButtonCalc text="+/-" color="#9b9b9b" accion={PositiveNegative} />
        <ButtonCalc text="del" color="#9b9b9b" accion={clean} />
        <ButtonCalc text="/" color="#FF9427" accion={clean} />
      </View>
      <View style={styles.buttonsRow}>
        <ButtonCalc text="7" accion={makeNumber} />
        <ButtonCalc text="8" accion={makeNumber} />
        <ButtonCalc text="9" accion={makeNumber} />
        <ButtonCalc text="x" color="#FF9427" accion={clean} />
      </View>
      <View style={styles.buttonsRow}>
        <ButtonCalc text="4" accion={makeNumber} />
        <ButtonCalc text="5" accion={makeNumber} />
        <ButtonCalc text="6" accion={makeNumber} />
        <ButtonCalc text="-" color="#FF9427" accion={clean} />
      </View>
      <View style={styles.buttonsRow}>
        <ButtonCalc text="1" accion={makeNumber} />
        <ButtonCalc text="2" accion={makeNumber} />
        <ButtonCalc text="3" accion={makeNumber} />
        <ButtonCalc text="+" color="#FF9427" accion={clean} />
      </View>
      <View style={styles.buttonsRow}>
        <ButtonCalc text="0" ancho accion={makeNumber} />
        <ButtonCalc text="." accion={makeNumber} />
        <ButtonCalc text="=" color="#FF9427" accion={clean} />
      </View>
    </View>
  );
};

export default CalculadoraScreen;
