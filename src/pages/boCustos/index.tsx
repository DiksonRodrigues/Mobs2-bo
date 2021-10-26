import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  Title,
  ContainerTable,
  ContentTable,
  ButtonTable,
  ButtonTableText,
  ButtonContainer,
  styles,
} from './styles';
import Button from '../../components/Button';

import {View, Text} from 'react-native';

import {
  Container,
  ScrollView,
  TextInput,
} from '../../util/styles/stylesSearched';
import colors from '../../util/styles/colors';
import PickerComponent from '../../components/Picker';
import {
  // RGetCustosOptions,
  sendCost,
} from '../../services/requests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import CurrencyInput from 'react-native-currency-input';
import {
  // ICosts,
  IListMedidasTomadas,
  ITypes,
} from '../../services/interfaces';

interface Props {
  desc: string;
  value: number | null;
  accountable: string;
}

import {useAuth} from '../../hooks/auth';

type IncidentRouteParams = {
  type: ITypes;
  boData: {
    hourMeter: string;
    odometer: string;
    selectedStatus: {id: string};
    selectedDriver: {id: string};
    selectedEnterprise: {id: string};
    selectedVehicleDescription: {id: string};
    address: string;
    city: string;
    position: {long: string; lat: string};
    description: string;
    boDataRegisteredId: string;
    photos: Array<string>;
    medidasTomadas: Array<IListMedidasTomadas>;
  };
};

const MedidasTomadas: React.FC = () => {
  const [descriptionCost, setDescriptionCost] = useState('');
  const [valueCost, setValueCost] = useState<number | null>(null);
  const [responsibleCost, setResponsibleCost] = useState({id: ''});
  const [table, setTable] = useState<Array<Props>>([]);
  const [costOptions, setCostOptions] = useState<
    Array<{name: string; value: string}>
  >([]);
  const [infos, setInfos] = useState({
    type: {id: '', desc: '', days: 0},
    boData: {
      hourMeter: '',
      odometer: '',
      selectedStatus: {id: ''},
      selectedDriver: {id: ''},
      selectedEnterprise: {id: ''},
      selectedVehicleDescription: {id: ''},
      address: '',
      city: '',
      position: {long: '', lat: ''},
      description: '',
      boDataRegisteredId: '',
      photos: [''],
      medidasTomadas: [
        {
          desc: '',
          created_at: '',
          dataToShow: '',
        },
      ],
    },
  });

  // const {matricula} = useAuth();

  useEffect(() => {
    async function getItems() {
      const infosString = await AsyncStorage.getItem('@BO:infos');

      const infosJson: IncidentRouteParams =
        infosString !== null ? JSON.parse(infosString) : null;
      setInfos(infosJson);

      setCostOptions([
        {name: 'Empresa', value: 'empresa'},
        {name: 'Cliente', value: 'cliente'},
        {name: 'Motorista', value: 'motorista'},
      ]);

      // const RCustosOptions = await RGetCustosOptions(
      //   infosJson.boData.boDataRegisteredId,
      // matricula
      // );
      // setCostOptions([]);
      // setCostOptions([...RCustosOptions]);
    }

    getItems();
  }, []);

  const navigation = useNavigation();

  const removeTableItem = (index: number) => {
    table.splice(index, 1);
    setTable([...table]);
  };

  const {matricula} = useAuth();

  return (
    <ScrollView>
      <Container>
        <Title>{infos.type.desc}</Title>
        <Title>Inserir custos</Title>
        <TextInput
          value={descriptionCost}
          onChangeText={setDescriptionCost}
          placeholder="Descrição do Custo"
          placeholderTextColor={colors.main}
          selectionColor={colors.main}
          autoCapitalize="none"
          multiline={false}
          returnKeyType="go"
          autoCorrect={false}
          blurOnSubmit={true}
        />
        <View style={styles.inputMaskContainer}>
          <CurrencyInput
            // style={styles.inputMask}
            value={valueCost}
            onChangeValue={setValueCost}
            prefix="R$ "
            delimiter="."
            separator=","
            precision={2}
          />
        </View>
        <PickerComponent
          selected={responsibleCost}
          setSelected={setResponsibleCost}
          firstOption={{label: 'Responsável pelo custo', value: ''}}
          options={costOptions}
        />
        <Button
          label="Adicionar na tabela"
          onPress={() => {
            setTable([
              ...table,
              {
                desc: descriptionCost,
                accountable: responsibleCost.toString(),
                value: valueCost,
              },
            ]);
            setResponsibleCost({id: ''});
            setValueCost(null);
            setDescriptionCost('');
          }}
        />

        {table.map((tableItem, index) => (
          <ContainerTable key={index}>
            <ContentTable>
              <Text>Descrição: {tableItem.desc}</Text>
              <Text>Valor: {tableItem.value}</Text>
              <Text>Responsável: {tableItem.accountable}</Text>
            </ContentTable>
            <ButtonContainer>
              <ButtonTable onPress={() => removeTableItem(index)}>
                <ButtonTableText>X</ButtonTableText>
              </ButtonTable>
            </ButtonContainer>
          </ContainerTable>
        ))}

        <Button
          label="Avançar"
          onPress={() => {
            AsyncStorage.setItem(
              '@BO:infos',
              JSON.stringify({
                ...infos,
                boData: {
                  ...infos.boData,
                  table,
                },
              }),
            );
            NetInfo.fetch().then(async state => {
              if (state.isConnected) {
                const id = infos.boData.boDataRegisteredId;
                await sendCost(id, table, matricula);
              }
            });
            navigation.navigate('Fechamento');
          }}
        />
      </Container>
    </ScrollView>
  );
};

export default MedidasTomadas;
