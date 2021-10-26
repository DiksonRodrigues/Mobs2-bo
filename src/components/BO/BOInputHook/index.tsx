import React from 'react';
import { TextInputProps } from 'react-native';
import { Control, Controller } from 'react-hook-form';

import BoTextInput from '../BoTextInput';
import { Container } from './styles';


  interface Props extends TextInputProps{
    control: Control;
    name: string
  }

const BOInputHook: React.FC<Props> = ({control, name, ...rest}) => {
  return (
  <Container>
   <Controller
    control={control}
    render={({field: { onChange, value}}) => (
        <BoTextInput
        onChangeText={onChange}
        value={value}
        {...rest}
        />   
      )}
    name={name}/>
  </Container>
  )
}

export default BOInputHook;