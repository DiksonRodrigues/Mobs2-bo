import colors from '../../util/styles/colors';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  justify-content: space-around;
  align-items: flex-end;
  height: 95px;
  padding-bottom: 20px;
  background: ${colors.main};
  flex-direction: row;
`;

const IconContent = styled.SafeAreaView`
  flex: 1;
  align-items: flex-start;
  margin-left: 10px;
  justify-content: center;
`;

const MidContent = styled.SafeAreaView`
  flex: 5;
  align-items: flex-start;
  justify-content: center;
`;

const MidText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: bold;
`;

const LogoutContent = styled.TouchableOpacity`
  flex: 1;
  align-items: flex-end;
  margin-right: 10px;
  justify-content: center;
`;

const LogoutText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 500;
`;

export {
  Container,
  IconContent,
  MidContent,
  MidText,
  LogoutContent,
  LogoutText,
};
