import React from 'react';
import { TextInputProps } from 'react-native';

import { 
Container,
InputContent,
} from './styles';

interface Props extends TextInputProps {

}

const BoTextInputNumber: React.FC<Props> = ({...rest}) => {
  return (
  <Container>
    <InputContent
    {...rest}
    keyboardType= 'numeric'/>
  </Container>
  )
}

export default BoTextInputNumber;