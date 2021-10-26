import { RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native';

export const Container = styled(TouchableOpacity).attrs({
    activeOpacity: 0.7
})`
  width: 48%;
  padding: 16px;
  margin-right: 5px;
  margin-left: 5px;
  align-items: center;
  justify-content: center;
  
  border-radius: 5px;
  background: ${({theme}) => theme.color.primary};
`;

export const ButtonTilte = styled.Text`
  font-size: ${RFValue(18)}px;
  color: ${({theme}) => theme.color.shape};
  font-family: ${({theme}) => theme.font.bold};
`;
