import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7
})`
  width: 100%;
  padding: 5px 11px;
  margin-bottom: 11px;

  border-radius: 5px;
  background: ${({theme}) => theme.color.shape};
`;

export const InputContent = styled.TextInput`
  width: 90%;
  color: ${({theme}) => theme.color.text};
  font-size: ${RFValue(18)}px;
`;
