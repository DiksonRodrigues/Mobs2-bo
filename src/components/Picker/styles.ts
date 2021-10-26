import {StyleSheet} from 'react-native';

import styled from 'styled-components/native';

const PickerContainer = styled.View`
  border-width: 2px;
  border-radius: 20px;
  border-color: #000;
  margin-left: 20px;
  margin-right: 20px;
  height: 50px;
  min-width: 90%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const styles = StyleSheet.create({
  pickerContainer: {
    width: '100%',
  },
});

export {styles, PickerContainer};
