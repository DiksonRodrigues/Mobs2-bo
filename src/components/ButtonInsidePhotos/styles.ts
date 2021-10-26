import styled from 'styled-components/native';
import colors from '../../util/styles/colors';

const ButtonContainer = styled.TouchableOpacity<{ label: string }>`
  border-width: 2px;
  border-radius: 20px;
  border: ${props => (props.label === 'Voltar' ? 2 : 0)}px;
  margin: 10px;
  background-color: ${props =>
    props.label === 'Voltar' ? 'transparent' : 'transparent'};
`;

const ButtonText = styled.Text<{ label: string }>`
  color: ${colors.main};
  font-weight: 700;
`;

export { ButtonContainer, ButtonText };
