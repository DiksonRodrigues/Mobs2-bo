import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';
import Octicons from 'react-native-vector-icons/Octicons';

export const Container = styled.View`
  flex: 1;
  background: ${({theme}) => theme.color.background};
`;

export const Informations = styled.View`
  align-items: center;
`;

export const LogoMobs = styled.Image`
  margin-top: ${RFValue(86)}px;
`;

export const SingInInformations = styled.View`
  padding: ${RFValue(25)}px;
`;

export const InputStyle = styled.View`
  width: 100%;
  height: ${RFValue(65)}px;
  margin-bottom: 10px;
  justify-content: center;

  border-width: 1px;
  border-color: ${({theme}) => theme.color.border};
  border-radius: 8px;
`;

export const InputSenhaStyle = styled.View`
  width: 100%;
  height: ${RFValue(65)}px;
  margin-bottom: 10px;
  flex-direction: row;
  align-items: center;

  border-width: 1px;
  border-color: ${({theme}) => theme.color.border};
  border-radius: 8px;
`;

export const SingInInput = styled.TextInput`
  width: 85%;
  font-size: ${RFValue(15)}px;
  margin-left: 10px;
  color: ${({theme}) => theme.color.text};
  font-family: ${({theme}) => theme.font.regular};
`;

export const SingInButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8
})`
  width: 100%;
  padding: 12px;
  align-items: center;

  border-radius: 8px;
  border-width: 2px;
  border-color: ${({theme}) => theme.color.borderAlt};
`;

export const SingInButtonText = styled.Text`
  font-size: ${RFValue(18)}px;
  color: ${({theme}) => theme.color.primary};
  font-family: ${({theme}) => theme.font.medium};
`;

export const Icon = styled(Octicons)`
  font-size: ${RFValue(24)}px;
`;

export const Footer = styled.View`
  margin-top: ${RFValue(150)}px;
  align-items: center;
`;

export const Copyright = styled.Text`
  font-size: ${RFValue(20)}px;
  color: ${({theme}) => theme.color.text};
  font-family: ${({theme}) => theme.font.medium};
`;

export const Logo = styled.Image`
width: ${RFValue(115)}px;
height: ${RFValue(31)}px;
`;