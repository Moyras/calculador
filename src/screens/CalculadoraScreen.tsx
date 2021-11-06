import React, {useRef, useState} from 'react';
import {View, Text} from 'react-native';
import ButtonCalc from '../components/ButtonCalc';
import {styles} from '../theme/appTheme';

enum Operators {
  add,
  subtract,
  multiply,
  divide,
}

const CalculadoraScreen = () => {
  const [numero, setNumero] = useState('0');
  const [previousNumber, setPreviousNumber] = useState('0');
  const lastOperation = useRef<Operators>();

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

  const btnDelete = () => {
    if ((numero.startsWith('-') && numero.length <= 2) || numero.length <= 1) {
      setNumero('0');
    } else if (numero.length > 1) {
      setNumero(numero.slice(0, -1));
    }
  };

  const ChangeToPrevNumber = () => {
    if (numero.endsWith('.')) {
      setPreviousNumber(numero.slice(0, -1));
    } else {
      setPreviousNumber(numero);
    }
    setNumero('0');
  };

  const divideButton = () => {
    ChangeToPrevNumber();
    lastOperation.current = Operators.divide;
  };
  const multiplyButton = () => {
    ChangeToPrevNumber();
    lastOperation.current = Operators.multiply;
  };
  const subtractButton = () => {
    ChangeToPrevNumber();
    lastOperation.current = Operators.subtract;
  };
  const addButton = () => {
    ChangeToPrevNumber();
    lastOperation.current = Operators.add;
  };

  const calcular = () => {
    const num1 = Number(numero);
    const num2 = Number(previousNumber);
    switch (lastOperation.current) {
      case Operators.add:
        setNumero(`${num2 + num1}`);
        break;
      case Operators.multiply:
        setNumero(`${num2 * num1}`);
        break;
      case Operators.subtract:
        setNumero(`${num2 - num1}`);
        break;
      case Operators.divide:
        if (num2 === 0) {
          setNumero('ERR');
        } else {
          setNumero(`${num2 / num1}`);
        }
        break;
    }
    setPreviousNumber('0');
  };

  return (
    <View style={styles.calcContainer}>
      {previousNumber !== '0' && (
        <Text style={styles.smallResult}>{previousNumber}</Text>
      )}

      <Text style={styles.result} numberOfLines={1} adjustsFontSizeToFit>
        {numero}
      </Text>
      <View style={styles.buttonsRow}>
        <ButtonCalc text="C" color="#9b9b9b" accion={clean} />
        <ButtonCalc text="+/-" color="#9b9b9b" accion={PositiveNegative} />
        <ButtonCalc text="del" color="#9b9b9b" accion={btnDelete} />
        <ButtonCalc text="/" color="#FF9427" accion={divideButton} />
      </View>
      <View style={styles.buttonsRow}>
        <ButtonCalc text="7" accion={makeNumber} />
        <ButtonCalc text="8" accion={makeNumber} />
        <ButtonCalc text="9" accion={makeNumber} />
        <ButtonCalc text="x" color="#FF9427" accion={multiplyButton} />
      </View>
      <View style={styles.buttonsRow}>
        <ButtonCalc text="4" accion={makeNumber} />
        <ButtonCalc text="5" accion={makeNumber} />
        <ButtonCalc text="6" accion={makeNumber} />
        <ButtonCalc text="-" color="#FF9427" accion={subtractButton} />
      </View>
      <View style={styles.buttonsRow}>
        <ButtonCalc text="1" accion={makeNumber} />
        <ButtonCalc text="2" accion={makeNumber} />
        <ButtonCalc text="3" accion={makeNumber} />
        <ButtonCalc text="+" color="#FF9427" accion={addButton} />
      </View>
      <View style={styles.buttonsRow}>
        <ButtonCalc text="0" ancho accion={makeNumber} />
        <ButtonCalc text="." accion={makeNumber} />
        <ButtonCalc text="=" color="#FF9427" accion={calcular} />
      </View>
    </View>
  );
};

export default CalculadoraScreen;
