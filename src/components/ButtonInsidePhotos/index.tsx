import React from 'react';
import { ButtonContainer, ButtonText } from './styles';

interface IProps {
  label: string;
  onPress: () => void;
}

const ButtonInsidePhotos: React.FC<IProps> = ({ label, onPress }) => {
  return (
    <ButtonContainer label={label} onPress={onPress}>
      <ButtonText label={label}>{label}</ButtonText>
    </ButtonContainer>
  );
};

export default ButtonInsidePhotos;
