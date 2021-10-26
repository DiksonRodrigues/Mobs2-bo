import React, { Dispatch, SetStateAction } from 'react';
import { Picker } from '@react-native-picker/picker';
import { styles, PickerContainer } from './styles';

interface IProps {
  selected: { id: string };
  setSelected: Dispatch<SetStateAction<{ id: string }>>;
  firstOption: {
    label: string;
    value: string;
  };
  options: Array<{
    id: string
    name: string;
    value: any;
  }>;
}

const PickerComponent: React.FC<IProps> = ({
  selected,
  setSelected,
  firstOption,
  options,
}) => {
  return (
    <PickerContainer>
      <Picker
        style={styles.pickerContainer}
        selectedValue={selected}
        onValueChange={(itemValue: { id: string }) => {
          setSelected(itemValue);
        }}>
        <Picker.Item label={firstOption.label} value={firstOption.value} />
        {options.map((option, index, ) => (
          <Picker.Item key={index} label={option.name} value={option.value.id} />
        ))}
      </Picker>
    </PickerContainer>
  );
};

export default PickerComponent;
