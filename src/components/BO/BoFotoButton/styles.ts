import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7
})`
  width: 100%;
  padding: 15px 11px;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;

  border-radius: 5px;
  background: ${({theme}) => theme.color.shape};
`;

export const InputContent = styled.Text`
  width: 90%;
  color: ${({theme}) => theme.color.textAlt};
  font-size: ${RFValue(18)}px;
`;
export const InputIcon = styled(Icon)`
  font-size: ${RFValue(26)}px;
  color: ${({theme}) => theme.color.textAlt};
`;
