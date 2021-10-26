import React from 'react';
import { TextInputProps } from 'react-native';
import { Control, Controller } from 'react-hook-form';

import BoTextInput from '../BoTextInput';
import { Container } from './styles';
import BoTextInputNumber from '../BoTextInputNumber';


  interface Props extends TextInputProps{
    control: Control;
    name: string
  }

const BOInputHookNumber: React.FC<Props> = ({control, name, ...rest}) => {
  return (
  <Container>
   <Controller
    control={control}
    render={({field: { onChange, value}}) => (
        <BoTextInputNumber
        onChangeText={onChange}
        value={value}
        {...rest}
        />   
      )}
    name={name}/>
  </Container>
  )
}

export default BOInputHookNumber;