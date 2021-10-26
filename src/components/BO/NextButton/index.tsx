import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { 
Container,
ButtonTilte
} from './styles';

interface Props extends TouchableOpacityProps {
  ButtonText: string
}

const NextButton: React.FC<Props> = ({ButtonText, ...rest}) => {
  return (
  <Container {...rest}>
    <ButtonTilte>{ButtonText}</ButtonTilte>
  </Container>
  )
}

export default NextButton;