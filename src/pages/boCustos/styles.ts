import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import colors from '../../util/styles/colors';

export const styles = StyleSheet.create({
  inputMask: {
    fontSize: 16,
  },
  inputMaskContainer: {
    borderWidth: 2,
    width: '90%',
    borderRadius: 20,
    paddingLeft: 15,
    borderColor: '#000',
    height: 54,
    marginVertical: 8,
    paddingHorizontal: 12,
    justifyContent: 'center',
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
  font-size: 20px;
  font-weight: 700;
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
  margin: 10px;
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
  margin-left: 20;
  margin-bottom: 20;
  width: 150;
  height: 150;
`;

const ImageMappedContainer = styled.View``;

const ContainerList = styled.View`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-bottom: 15px;
  padding-left: 25px;
`;

const TextList = styled.Text`
  font-weight: bold;
  font-size: 13px;
`;

const TextDescriptionList = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;

const ContainerTable = styled.View`
  display: flex;
  flex-direction: row;
  margin: 10px;
  border-radius: 40px;
  background-color: #bababa;
  width: 80%;
`;

const ContentTable = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  padding-left: 30px;
  margin: 10px 0;
`;

const TitleTable = styled.Text`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ButtonTable = styled.TouchableOpacity`
  margin-top: 10px;
  background-color: ${colors.main};
  justify-content: center;
  border-radius: 40px;
  align-items: center;
`;

const ButtonTableText = styled.Text`
  color: ${colors.white};
  padding: 10px 15px;
`;

const ButtonContainer = styled.View`
  position: absolute;
  right: 0;
  width: 12%;
  height: 60%;
  top: 0;
`;

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
  ContainerList,
  TextList,
  TextDescriptionList,
  ContainerTable,
  TitleTable,
  ContentTable,
  ButtonTable,
  ButtonTableText,
  ButtonContainer,
};
