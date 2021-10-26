import React, {useState} from 'react';
import {ActivityIndicator, PermissionsAndroid, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Title, SubTitle, TitleInputsContainer, TitleInputs} from './styles';
import Button from '../../components/Button';
import {ButtonsContainer} from './styles';
import {
  Container,
  ScrollView,
  TextInput,
  TextArea,
  ContainerIndicator,
} from '../../util/styles/stylesSearched';
import colors from '../../util/styles/colors';
import Geolocation from '@react-native-community/geolocation';
import {setBoletimOccurrence} from '../../services/requests';
import {ITypes} from '../../services/interfaces';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';
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
    position: {long: number; lat: number};
    description: string;
    boDataRegisteredId: string;
  };
};

const BO: React.FC = () => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [description, setDescription] = useState('');
  const [position, setPosition] = useState({lat: 0, long: 0});
  const [loading, setLoading] = useState(false);
  const [infos, setInfos] = useState({
    type: {id: '', desc: ''},
    boData: {
      hourMeter: '',
      odometer: '',
      selectedStatus: {id: ''},
      selectedDriver: {id: ''},
      selectedEnterprise: {id: ''},
      selectedVehicleDescription: {id: ''},
      address: '',
      city: '',
      position: {long: 0, lat: 0},
      description: '',
      boDataRegisteredId: '',
    },
  });

  const {matricula} = useAuth();

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

  const requestLocalPermission = async () => {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Localização',
        message: 'O App precisa de acesso à sua localização',
        buttonNeutral: 'Pergunte-me depois',
        buttonNegative: 'Cancelar',
        buttonPositive: 'OK',
      },
    );
  };

  return (
    <>
      {loading ? (
        <ContainerIndicator>
          <ActivityIndicator size="large" color="#0000ff" />
        </ContainerIndicator>
      ) : (
        <ScrollView>
          <Container>
            <Title>{infos.type.desc}</Title>
            <SubTitle>Descrição do ocorrido</SubTitle>
            <TitleInputsContainer>
              <TitleInputs>Descrição:</TitleInputs>
            </TitleInputsContainer>
            <TextArea
              value={description}
              onChangeText={setDescription}
              placeholder="Descrição"
              placeholderTextColor={colors.main}
              selectionColor={colors.main}
              autoCapitalize="none"
              numberOfLines={5}
              multiline={true}
              returnKeyType="go"
              autoCorrect={false}
              blurOnSubmit={true}
            />

            <TitleInputsContainer>
              <TitleInputs>Local da Ocorrência:</TitleInputs>
            </TitleInputsContainer>
            <TextInput
              value={address}
              onChangeText={setAddress}
              placeholder="Endereço"
              placeholderTextColor={colors.main}
              selectionColor={colors.main}
              autoCapitalize="none"
              numberOfLines={1}
              returnKeyType="go"
              autoCorrect={false}
              blurOnSubmit={true}
            />
            <TextInput
              value={city}
              onChangeText={setCity}
              placeholder="Cidade"
              placeholderTextColor={colors.main}
              selectionColor={colors.main}
              autoCapitalize="none"
              numberOfLines={1}
              returnKeyType="go"
              autoCorrect={false}
              blurOnSubmit={true}
            />

            <Button
              label="Enviar localização por GPS"
              onPress={async () => {
                setLoading(true);
                await requestLocalPermission();
                Geolocation.getCurrentPosition(
                  currentPosition => {
                    const captured = {
                      lat: currentPosition.coords.latitude,
                      long: currentPosition.coords.longitude,
                    };
                    setPosition(captured);
                    Alert.alert('Localização enviada com sucesso');
                    setLoading(false);
                  },
                  async error => {
                    setLoading(false);
                    Alert.alert('Falha ao enviar localização');
                    await requestLocalPermission();
                    console.log('Error', JSON.stringify(error));
                  },
                  {
                    enableHighAccuracy: true,
                    timeout: 20000,
                    maximumAge: 1000,
                  },
                );
              }}
            />

            <ButtonsContainer>
              <Button label="Voltar" onPress={() => navigation.goBack()} />
              <Button
                label="Avançar"
                onPress={async () => {
                  setLoading(true);

                  setTimeout(() => {
                    setLoading(false);
                    navigation.navigate('Photo');
                  }, 1000);

                  await NetInfo.fetch().then(async state => {
                    if (state.isConnected) {
                      const data = await setBoletimOccurrence(
                        {
                          // Id do tipo de BO
                          boletim_ocorrencia_type_id: infos.type.id,

                          // Descrição Veículo
                          asset_id: infos.boData.selectedVehicleDescription.id,

                          // Motorista
                          driver_id: infos.boData.selectedDriver.id,

                          // Empresa contratada
                          contracted_company_id:
                            infos.boData.selectedEnterprise.id,

                          // Hodômetro
                          hodometro: infos.boData.odometer,

                          // Horímetro
                          horimetro: infos.boData.hourMeter,

                          // Status
                          assets_state_id: infos.boData.selectedStatus.id,

                          // Latitude
                          lat: position.lat,

                          // Longitude
                          long: position.long,

                          // Descrição
                          desc: description,

                          // Endereço
                          address,

                          // Cidade
                          city,
                        },
                        matricula,
                      );

                      AsyncStorage.setItem(
                        '@BO:infos',
                        JSON.stringify({
                          ...infos,
                          boData: {
                            ...infos.boData,
                            boDataRegisteredId: data.id,
                            address,
                            city,
                            position,
                            description,
                          },
                        }),
                      );
                    } else {
                      AsyncStorage.setItem(
                        '@BO:infos',
                        JSON.stringify({
                          ...infos,
                          boData: {
                            ...infos.boData,
                            boDataRegisteredId: '',
                            address,
                            city,
                            position,
                            description,
                          },
                        }),
                      );
                    }
                  });
                }}
              />
            </ButtonsContainer>
          </Container>
        </ScrollView>
      )}
    </>
  );
};

export default BO;
