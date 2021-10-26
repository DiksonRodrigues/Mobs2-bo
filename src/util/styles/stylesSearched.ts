import styled from 'styled-components/native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import colors from './colors';

const Container = styled.View`
  flex: 1;
  align-items: center;
`;

const ScrollView = styled.ScrollView.attrs(() => {
  return {
    keyboardShouldPersistTaps: 'always',
    showsVerticalScrollIndicator: false,
  };
})`
  flex: 1;
  background-color: ${colors.bg};
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
`;

const IconAntDesignCustom = styled(IconAntDesign)<{
  marginBottomRight?: number;
}>`
  margin-bottom: ${props => props.marginBottomRight || 0}px;
  margin-right: ${props => props.marginBottomRight || 0}px;
`;

const IconAwesomeCustom = styled(IconAwesome)<{
  marginBottomRight?: number;
}>`
  margin-bottom: ${props => props.marginBottomRight || 0}px;
  margin-right: ${props => props.marginBottomRight || 0}px;
`;

const TextInput = styled.TextInput`
  border-width: 2px;
  width: 90%;
  border-radius: 20px;
  padding-left: 15px;
  margin: 5px 0 20px 0;
  height: 50px;
  font-size: 16px;
`;

const TextArea = styled.TextInput`
  border-width: 2px;
  width: 90%;
  border-radius: 20px;
  padding-left: 15px;
  margin: 5px 0 20px 0;
  font-size: 16px;
  text-align-vertical: top;
`;

const ContainerIndicator = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export {
  Container,
  TextInput,
  TextArea,
  ScrollView,
  IconAntDesignCustom,
  IconAwesomeCustom,
  ContainerIndicator,
};
