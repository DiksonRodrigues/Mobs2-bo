import styled from 'styled-components/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const Container = styled.View`
  flex: 1;
  background: #FFFFFF;
`;

export const Title = styled.Text`
  margin-top: 44px;
  text-align: center;
  font-size: 18px;
  color: #686666;
  font-family: 'Poppins-Medium';
`;

export const BoShowcase = styled.View`
  flex: 1;
  padding: 22px;
`;

export const ChooseContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7
})`
  width: 100%;
  height: 70px;
  margin-bottom: 11px;
  border-radius: 8px;
  align-items: center;

  border-width: 1px;
  border-color: #BBBBBB;
  flex-direction: row;
`;

export const BOIcon = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-left: 11px;
  align-items: center;
  justify-content: center;

  background: #403F98;
`;

export const BOCustomIcon = styled(MaterialCommunityIcons)`
  color: #FFFFFF;
  font-size: 25px;
`;

export const BoName = styled.Text`
  margin-left: 13px;
  font-size: 18px;
  color: #686666;
  font-family: 'Poppins-Medium';
`;