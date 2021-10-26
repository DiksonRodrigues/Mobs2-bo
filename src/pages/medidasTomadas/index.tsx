import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Title, ContainerList, TextList, TextDescriptionList} from './styles';
import Button from '../../components/Button';
import {
  Container,
  ScrollView,
  TextArea,
} from '../../util/styles/stylesSearched';
import NetInfo from '@react-native-community/netinfo';
import colors from '../../util/styles/colors';
import moment from 'moment';
import {setMedidasTomadas} from '../../services/requests';
import {IListMedidasTomadas, ITypes} from '../../services/interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonInsidePhotos from '../../components/ButtonInsidePhotos';
import {useAuth} from '../../hooks/auth';

type IncidentRouteParams = {
  type: ITypes;
  boData: {
    hourMeter: string;
    odometer: string;
    selectedStatus: {id: ''};
    selectedDriver: {id: ''};
    selectedEnterprise: {id: ''};
    selectedVehicleDescription: {id: string};
    address: string;
    city: string;
    position: {long: string; lat: string};
    description: string;
    boDataRegisteredId: string;
    photos: Array<string>;
  };
};

const MedidasTomadas: React.FC = () => {
  const [list, setList] = useState<Array<IListMedidasTomadas>>([]);
  const [description, setDescription] = useState('');
  const [infos, setInfos] = useState<IncidentRouteParams>({
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

  const deleteDescription = (index: number) => {
    list.splice(index, 1);
    setList([...list]);
  };

  const {matricula} = useAuth();

  return (
    <ScrollView>
      <Container>
        <Title>BO: Acidente</Title>

        <TextArea
          value={description}
          onChangeText={setDescription}
          placeholder="Descrição do ocorrido"
          placeholderTextColor={colors.main}
          selectionColor={colors.main}
          autoCapitalize="none"
          numberOfLines={5}
          multiline={true}
          returnKeyType="go"
          autoCorrect={false}
          blurOnSubmit={true}
        />

        <Button
          label="Adicionar ao histórico"
          onPress={() => {
            if (description !== '') {
              const data = moment().format('DD/MM/YYYY hh:mm');
              const created_at = moment().format('YYYY-MM-DD hh:mm:ss');
              const item = {
                desc: description,
                created_at,
                dataToShow: data,
              };
              setList([...list, item]);
              setDescription('');
            }
          }}
        />

        <Title>Lista de Medidas Tomadas:</Title>
        {list.map((oc, index) => {
          return (
            <ContainerList key={index}>
              <TextList>{oc.dataToShow}</TextList>
              <TextDescriptionList>{oc.desc}</TextDescriptionList>
              <ButtonInsidePhotos
                label="Deletar descrição"
                onPress={() => deleteDescription(index)}
              />
            </ContainerList>
          );
        })}

        <Button
          label="Avançar"
          onPress={async () => {
            const valorJson = {
              type: infos.type,
              boData: {
                ...infos.boData,
                medidasTomadas: list,
              },
            };
            const valorString = JSON.stringify(valorJson);
            await AsyncStorage.setItem('@BO:infos', valorString);

            NetInfo.fetch().then(async state => {
              if (state.isConnected) {
                await setMedidasTomadas(
                  infos.boData.boDataRegisteredId,
                  list,
                  matricula,
                );
              }
            });

            navigation.navigate('Custos');
          }}
        />
      </Container>
    </ScrollView>
  );
};

export default MedidasTomadas;
