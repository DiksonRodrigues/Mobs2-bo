import styled from 'styled-components/native';
import colors from '../../util/styles/colors';

const ButtonContainer = styled.TouchableOpacity<{label: string}>`
  border-width: 2px;
  border-color: #BBBBBB;
  border-radius: 8px;
  padding: 15px 30px;
  margin: 10px;
  background-color: #FFFFFF;
`;

const ButtonText = styled.Text<{label: string}>`
  color: #504F54;
  font-weight: 700;
`;

export {ButtonContainer, ButtonText};
