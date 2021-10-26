import React, {useEffect, useState} from 'react';
import {Alert, View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  Title,
  SubTitle,
  TitleInputsContainer,
  TitleInputs,
  ButtonsContainer,
  ImageMappedContainer,
  ViewPhotos,
  ImagePhotos,
  styles,
} from './styles';
import {IconAwesomeCustom} from '../../util/styles/stylesSearched';
import Button from '../../components/Button';
import ButtonPhotos from '../../components/ButtonPhotos';
import ButtonInsidePhotos from '../../components/ButtonInsidePhotos';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Container, ScrollView} from '../../util/styles/stylesSearched';
import {updatePhotos} from '../../services/requests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ITypes} from '../../services/interfaces';
import NetInfo from '@react-native-community/netinfo';
import {PermissionsAndroid} from 'react-native';
import {useAuth} from '../../hooks/auth';
import axios from 'axios';
import NextButton from '../../components/BO/NextButton';
import BackButton from '../../components/BO/BackButton';

type IncidentRouteParams = {
  type: ITypes;
  boData: {
    hourMeter: string;
    odometer: string;
    selectedStatus: {id: ''};
    selectedDriver: {id: ''};
    selectedEnterprise: {id: ''};
    selectedVehicleDescription: {id: string};
    boType: string;
    address: string;
    city: string;
    position: {long: string; lat: string};
    description: string;
    boDataRegisteredId: string;
  };
};

const FotoCNH: React.FC = () => {
  const [photos, setPhotos] = useState<Array<string>>([]);
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
      position: {long: '', lat: ''},
      description: '',
      boDataRegisteredId: '',
    },
  });
  const [forms,setForms] = useState({
    forms1:{},
    forms2:{},
    forms3:{},
    forms4:{},
    forms5:{},
    forms6:{},
    forms7:{},
    forms8:{},
    forms9:{},
    forms10:{},
    forms11:{}
  })
  const {matricula, user} = useAuth();

  const accessPage11 =()=> saveAsync()

  const readAsync=async()=>{
    let forms = await AsyncStorage.getItem('@forms')
    console.log('forms',forms)
    if(forms){
      setForms(JSON.parse(forms))
      console.log(forms.forms7)
      if(forms?.forms8){
      setPhotos(forms?.forms8.photos)
      }
    }
    
  }

  const dataPhoto={
    foto_motorista: String(photos)
    }

  const updateMotoristaPhotos = async ( ): Promise<void> => {
    try{
      const idBoletim = await AsyncStorage.getItem('@IdBoletim');
      let Token = await AsyncStorage.getItem('@BO:token');

      if (idBoletim){
        const res = await axios.post(`http://m2hmg.eastus.cloudapp.azure.com/api/boletim_ocorrencia/${idBoletim && JSON.parse(idBoletim)}/foto_motorista/42`, {...dataPhoto,},{headers:{Authorization: Token ? Token : ''}});
        res.data
        console.log('enviou a foto motorista')
        navigation.navigate('Orçamento')
        return 
      }
      } catch(error){
        Alert.alert('Enviar uma foto é obrigatorio!')
        console.log(error.response.data)
        console.log(error)
      }
    }
  
  const saveAsync=async()=>{
    const forms8 = {
    photos: photos
    }
    console.log('forms7',forms8)
    forms.forms8 = forms8
    console.log('forms8 ...',forms.forms8)
    if(forms) await AsyncStorage.setItem('@forms',JSON.stringify(forms))
    navigation.navigate('Orçamento')
  }

  const navigation = useNavigation();

  useEffect(() => {
    if (Object.keys(forms.forms8).length<1) readAsync() 
  }, []);

  const requestCameraPermission = async () => {
    await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
      title: 'Permissão de Câmera',
      message: 'O App precisa de acesso à câmera.',
      buttonNeutral: 'Pergunte-me depois',
      buttonNegative: 'Cancelar',
      buttonPositive: 'OK',
    });
  };

  const launchLibrary = async () => {
    await requestCameraPermission();
    launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: true,
        maxHeight: 200,
        maxWidth: 200,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          if (response?.assets[0]?.base64) {
            setPhotos([...photos, response.assets[0].base64]);
          }
        }
      },
    );
  };

  const takePhoto = async () => {
    await requestCameraPermission();
    launchCamera(
      {
        mediaType: 'photo',
        includeBase64: true,
        maxHeight: 200,
        maxWidth: 200,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          if (response?.assets[0]?.base64) {
            setPhotos([...photos, response.assets[0].base64]);
          }
        }
      },
    );
  };

  const deletePhoto = (index: number) => {
    photos.splice(index, 1);
    setPhotos([...photos]);
  };

  return (
    <ScrollView>
      <Container>
        <Title></Title>
        <SubTitle>Foto do lado da sua CNH</SubTitle>
        <TitleInputsContainer>
        </TitleInputsContainer>
        <ViewPhotos>
          {photos.map((photo, index) => {
            return (
              <ImageMappedContainer key={index}>
                <ButtonInsidePhotos
                  label={`Deletar Image ${index + 1}`}
                  onPress={() => deletePhoto(index)}
                />
                <ImagePhotos
                  key={index}
                  source={{
                    uri: `data:image/jpeg;base64,${photo}`,
                  }}
                />
              </ImageMappedContainer>
            );
          })}
        </ViewPhotos>

        {photos.length < 4 && (
          <>
            <TouchableOpacity 
            style={{borderWidth:2, width:'80%',height:200, borderRadius:5, alignItems:'center', justifyContent:'center', borderColor:'#BBBBBB'}}
            onPress={() => launchLibrary()}>
              <IconAwesomeCustom name="photo" size={78} color="#BBBBBB" />
              <Text style={{fontSize:16, color:"#504F54"}}>Buscar da galeria</Text>
            </TouchableOpacity>
            <Text style={{fontSize:16, color:"#504F54"}} >Ou</Text>
            <View style={{borderWidth:2, width:'80%',height:50, borderRadius:5, alignItems:'center', borderColor:'#BBBBBB', flexDirection:'row', justifyContent:'center'}}>
              <IconAwesomeCustom name="camera" size={22} color="#BBBBBB" />
              <ButtonPhotos label="Abrir a camera" onPress={takePhoto} />
            </View>
          </>
        )}
          <View style={{flexDirection:'row', marginTop:30}}>
          <BackButton
          ButtonText="Voltar"
          onPress={ ()=> navigation.goBack() }/>
          <NextButton 
          ButtonText="Avançar"
          onPress={ () => updateMotoristaPhotos() }/>
          
        </View>
      </Container>
    </ScrollView>
  );
};

export default FotoCNH;
