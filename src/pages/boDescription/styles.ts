import styled from 'styled-components/native';

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

export {
  LineStyle,
  Title,
  SubTitle,
  TitleInputsContainer,
  TitleInputs,
  ButtonsContainer,
};
