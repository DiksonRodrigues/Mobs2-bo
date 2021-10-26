import styled from "styled-components/native";

const Background = styled.View`
  flex: 1;
  align-items: center;
  margin-top: 15px;
`;
const Title = styled.Text`
  margin: 15px 0 0px 0;
  font-size: 18px;
  font-family: ${({theme}) => theme.font.bold};
  color: ${({theme}) => theme.color.text};
`;
const SubTitle = styled.Text`
  font-size: 16px;
  font-family: ${({theme}) => theme.font.medium};
  color: ${({theme}) => theme.color.text};
`;
const DicasTitle = styled.Text`
  font-size: 18px;
  font-family: ${({theme}) => theme.font.regular};
  color: ${({theme}) => theme.color.text};
  margin-left: 5px;
`;
const RowView = styled.View`
align-items: center;
flex-direction: row;
margin-bottom: 10px;
`;
const IConBox = styled.View`
align-items: center;
justify-content: center;
height: 50px;
width: 50px;
border-radius: 30px;
background: #28273e;
`;
const CameraButton = styled.TouchableOpacity`
align-items: center;
justify-content: center;
position: absolute;
bottom: 25px;
height: 8%;
width: 60%;
border-radius: 8px;
background: ${({theme}) => theme.color.secondary};
`;
const CameraButtonText = styled.Text`
  font-size: 18px;
  font-family: ${({theme}) => theme.font.medium};
  color: #fff;
`;

export {Background,Title,RowView,SubTitle,IConBox,DicasTitle,CameraButton,CameraButtonText};