import React, {useState, useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {useNavigation} from '@react-navigation/native';
import {Title} from './styles';
import Button from '../../components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Container,
  ScrollView,
  TextInput,
} from '../../util/styles/stylesSearched';

import colors from '../../util/styles/colors';
import {IListMedidasTomadas, ITypes} from '../../services/interfaces';
import {closeBO, setManu} from '../../services/requests';
import {Alert} from 'react-native';
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
  const [localManu, setLocalManu] = useState('');
  const [insideHourData, setInsideHourData] = useState('');
  const [outsideHourData, setOutsideHourData] = useState('');
  const [closeData, setCloseData] = useState(false);
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

  const navigation = useNavigation();

  useEffect(() => {
    async function getItems() {
      const infosString = await AsyncStorage.getItem('@BO:infos');

      const infosJson: IncidentRouteParams =
        infosString !== null ? JSON.parse(infosString) : null;
      setInfos(infosJson);
    }

    getItems();
  }, []);

  const {matricula} = useAuth();

  return (
    <ScrollView>
      <Container>
        <Title>{infos.type.desc}</Title>
        <Title>Tempo de Manutenção</Title>
        <TextInput
          value={localManu}
          onChangeText={setLocalManu}
          placeholder="Local Manutenção"
          placeholderTextColor={colors.main}
          selectionColor={colors.main}
          autoCapitalize="none"
          multiline={false}
          returnKeyType="go"
          blurOnSubmit={true}
        />

        <TextInput
          value={insideHourData}
          onChangeText={setInsideHourData}
          placeholder="Data e hora de entrada"
          placeholderTextColor={colors.main}
          selectionColor={colors.main}
          autoCapitalize="none"
          multiline={false}
          returnKeyType="go"
          blurOnSubmit={true}
        />

        <TextInput
          value={outsideHourData}
          onChangeText={setOutsideHourData}
          placeholder="Data e hora de entrada"
          placeholderTextColor={colors.main}
          selectionColor={colors.main}
          autoCapitalize="none"
          multiline={false}
          returnKeyType="go"
          blurOnSubmit={true}
        />

        <Title>Fechamento B.O.</Title>

        <Button
          label="Incluir data de fechamento"
          onPress={() => {
            setCloseData(true);
            Alert.alert('Data de fechamento incluída com sucesso');
          }}
        />

        <Button
          label="Salvar B.O"
          onPress={() => {
            AsyncStorage.setItem(
              '@BO:infos',
              JSON.stringify({
                ...infos,
                boData: {
                  ...infos.boData,
                  localManu,
                  insideHourData,
                  outsideHourData,
                  closeData,
                },
              }),
            );

            NetInfo.fetch().then(async state => {
              if (state.isConnected) {
                const id = infos.boData.boDataRegisteredId;
                await setManu(
                  id,
                  localManu,
                  insideHourData,
                  outsideHourData,
                  matricula,
                );
                Alert.alert('B.O. salvo com sucesso');
                if (closeData) {
                  await closeBO(id, matricula);
                }
              } else {
                const offlineBOsString = await AsyncStorage.getItem(
                  '@BO:offline',
                );

                Alert.alert('B.O. salvo em memória com sucesso');

                const infosJson =
                  offlineBOsString !== null ? JSON.parse(offlineBOsString) : [];

                AsyncStorage.setItem(
                  '@BO:offline',
                  JSON.stringify([
                    ...infosJson,
                    {
                      ...infos,
                      boData: {
                        ...infos.boData,
                        localManu,
                        insideHourData,
                        outsideHourData,
                        closeData,
                      },
                    },
                  ]),
                );
              }
            });

            navigation.navigate('Home');
          }}
        />
      </Container>
    </ScrollView>
  );
};

export default MedidasTomadas;
