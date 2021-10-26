import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { 
Container,
InputContent,
InputIcon,
} from './styles';

interface Props extends TouchableOpacityProps {
  title: string
}

const BoFotoButton: React.FC<Props> = ({title, ...rest}) => {
  return (
  <Container {...rest}>
    <InputContent>{title}</InputContent>
    <InputIcon name="camera"/>
  </Container>
  )
}

export default BoFotoButton;