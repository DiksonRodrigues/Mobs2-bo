import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import Octions from 'react-native-vector-icons/Octicons';

export const IconContainer = styled.View`
flex: 1;
background: ${({theme}) => theme.color.shape};
`;

export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 9px 10px;
  margin-top: ${RFValue(22)}px;

  border-bottom-width: 2px;
  border-color: ${({theme}) => theme.color.border};
`;

export const Greeting = styled.Text`
  font-size: ${RFValue(18)}px;
  color: ${({theme}) => theme.color.textAlt};
  font-family: ${({theme}) => theme.font.medium};
`;

export const SingoutButton = styled.TouchableOpacity.attrs({
    activeOpacity: 0.5
})`
`;

export const SingoutButtonText = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.color.secondary};
  font-family: ${({theme}) => theme.font.medium};
`;

export const Informations = styled.View`
  flex: 1;
  margin-top: 16px;
  padding: 10px;
`;

export const Historic = styled.View`
  width: ${RFValue(113)}px;
  padding: 5px;
  border-radius: 4px;

  align-items: center;
  background: ${({theme}) => theme.color.primary};
`;

export const Title = styled.Text`
  font-size: ${RFValue(14)}px;
  color: ${({theme}) => theme.color.shape};
  font-family: ${({theme}) => theme.font.medium};
`;

export const NotFoundView = styled.View`
flex: 1;
align-items: center;
`;

export const MessageNotFound = styled.Text`
  font-size: ${RFValue(16)}px;
  color: ${({theme}) => theme.color.text};
  font-family: ${({theme}) => theme.font.medium};
  top: ${RFValue(15)}px;
`;

export const MakeCheckListButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7
})`
width: ${RFValue(50)}px;
height: ${RFValue(50)}px;
align-items: center;
justify-content: center;
position: absolute;

right: 26px;
bottom:79px;
border-radius: ${RFValue(8)}px;
background: ${({theme}) => theme.color.primary};
`;

export const Icon = styled(Octions)`
font-size: ${RFValue(24)}px;
color: ${({theme}) => theme.color.shape};
`;


