import { StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const styles = StyleSheet.create({
  ViewPhotos: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

const LineStyle = styled.View`
  border-width: 0.5px;
  border-color: #000;
  background-color: #000;
  margin: 10px;
  height: 2px;
  width: 95%;
`;

const Title = styled.Text`
  margin: 30px 0 10px 0;
  font-size: 20px;
  font-weight: 700;
`;

const SubTitle = styled.Text`
  margin: 10px 0 20px 0;
  font-size: ${RFValue(15)}px;
  color: ${({theme}) => theme.color.text};
  font-family: ${({theme}) => theme.font.medium};
`;

const TitleInputsContainer = styled.View`
  justify-content: center;
  align-items: flex-start;
  width: 90%;
`;

const TitleInputs = styled.Text`
  font-size: 20px;
  font-weight: 700;
`;

const ButtonsContainer = styled.View`
  flex-direction: row;
  margin: 20px 15px;
`;

const ButtonPhotos = styled.TouchableOpacity`
  flex-direction: row;
  margin: 10px;
`;

const ViewPhotos = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const ImagePhotos = styled.Image`
  margin-left: 20px;
  margin-bottom: 20px;
  width: 150px;
  height: 150px;
`;

const ImageMappedContainer = styled.View``;

export {
  LineStyle,
  Title,
  SubTitle,
  TitleInputsContainer,
  TitleInputs,
  ButtonsContainer,
  ButtonPhotos,
  ImageMappedContainer,
  ViewPhotos,
  ImagePhotos,
};
