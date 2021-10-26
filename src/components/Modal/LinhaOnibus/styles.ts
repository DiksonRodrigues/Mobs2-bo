import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import IconSearch from 'react-native-vector-icons/MaterialCommunityIcons'
import { RFValue } from 'react-native-responsive-fontsize';

interface CategoryProps {
  isActive: boolean
}

import {
  ILinha,
} from '../../../services/interfaces';

export const Container = styled.View`
  flex: 1;
  padding: 15px;
  align-items: center;
`;

export const InputContainer = styled.View`
  width: 100%;
  margin-top: 30px;
  padding: 5px;
  align-items: center;
  flex-direction: row;


  border-radius: 8px;
  background: ${({theme}) => theme.color.shape};
`;

export const InputSearch = styled.TextInput`
  width: 90%;
  font-size: ${RFValue(15)}px;
`;

export const Icon = styled(IconSearch)`
  font-size: ${RFValue(25)}px;
  color: ${({theme}) => theme.color.textAlt};
`;

export const Footer = styled.View`
  width: 100%;
  z-index: 5;
  position: absolute;
  bottom: 17px;
`;

export const CarList = styled(FlatList as new ()=> FlatList<ILinha>)`
flex: 1;
width: 100%;
`;

export const CarContainer = styled.TouchableOpacity<CategoryProps>`
  width: 100%;
  padding: 8px;
  margin-top: 15px;

  border-radius: 8px;
  background: ${({isActive,theme}) => isActive ? theme.color.selected : theme.color.shape};
`;

export const CarContainerText = styled.Text`
  font-size: ${RFValue(18)}px;
  color: ${({theme}) => theme.color.textAlt};
`;
