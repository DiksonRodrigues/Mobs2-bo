import React from 'react';
import { TextInputProps } from 'react-native';

import { 
Container,
InputContent,
} from './styles';

interface Props extends TextInputProps {
  title?: string
}

const BoTextInput: React.FC<Props> = ({...rest}) => {
  return (
  <Container>
    <InputContent{...rest}/>
  </Container>
  )
}

export default BoTextInput;