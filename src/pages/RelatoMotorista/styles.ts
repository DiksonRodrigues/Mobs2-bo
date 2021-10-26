import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const BOContainer = styled.View`
  flex:1;
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(100)}px;
  align-items: center;
  justify-content: flex-end;

  background: ${({theme}) => theme.color.primary};
`;

export const BoTypeTitle = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({theme}) => theme.font.bold};
  color: ${({theme}) => theme.color.shape};

`;

export const Informations = styled.View`
  flex: 1;
  padding: 15px;
  margin-top: 20px;

  background: ${({theme}) => theme.color.backgroundAlt};
`;

export const PageTitle = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({theme}) => theme.font.medium};
  color: ${({theme}) => theme.color.text};

  margin-bottom: 11px;
`;
export const RelatoTextInput = styled.TextInput`
  width: 100%;
  height: 250px;
  font-size: 18px;
  margin-bottom: 20px;

  border-radius: 10px;
  border-width: 1px;
  border-color: ${({theme}) => theme.color.textAlt};
  font-family: ${({theme}) => theme.font.regular};
  color: ${({theme}) => theme.color.text};
`;
