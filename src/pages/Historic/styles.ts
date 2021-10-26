import styled from 'styled-components/native';
import IconAwesome from 'react-native-vector-icons/FontAwesome';

const Container = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #FFFFFF;
`;

const HistoricIconContainer = styled.View`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: flex-end;
  margin-right: 20px;
`;

const HistoricIcon = styled(IconAwesome)<{
  marginBottomRight?: number;
}>`
  margin-bottom: ${props => props.marginBottomRight || 0}px;
  margin-right: ${props => props.marginBottomRight || 0}px;
`;

const HistoricIconItemContainer = styled.TouchableOpacity<{
  isFinished: string;
}>`
  display: flex;
  flex-direction: row;
  width: 95%;
  margin: 20px;
  border-radius: 20px;
  border: 1px solid #B4B4B4;
  background-color: #FFFF;
`;

const MarkerIndicator = styled.View<{
  isFinished: string;
}>`
  width: 15px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  background-color: ${props =>
  props.isFinished === 'aberta' ? '#ED5353' : '#403F98'};
`;

const HistoricItemsContainer = styled.View`
  display: flex;
  flex: 6;
  justify-content: center;
  align-items: flex-start;
  padding: 20px 20px;
`;

const HistoricItemsTitle = styled.Text`
  margin-bottom: 10px;
  font-size: 15px;
  font-weight: bold;
  color: #504F54;
`;

const HistoricItemsText = styled.Text`
  color: #BBBBBB;
  font-size: 15px;
`;

export {
  Container,
  MarkerIndicator,
  HistoricItemsContainer,
  HistoricItemsTitle,
  HistoricItemsText,
  HistoricIconContainer,
  HistoricIcon,
  HistoricIconItemContainer,
};
