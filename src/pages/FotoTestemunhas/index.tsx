import React, {useEffect, useState} from 'react';
import {View, TouchableOpacity, Text, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  Title,
  SubTitle,
  ImageMappedContainer,
  ViewPhotos,
  ImagePhotos,
} from './styles';
import {IconAwesomeCustom} from '../../util/styles/stylesSearched';
import ButtonPhotos from '../../components/ButtonPhotos';
import ButtonInsidePhotos from '../../components/ButtonInsidePhotos';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Container, ScrollView} from '../../util/styles/stylesSearched';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ITypes} from '../../services/interfaces';
import {PermissionsAndroid} from 'react-native';
import {useAuth} from '../../hooks/auth';
import SelectButton from '../../components/BO/SelectButton';

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


interface Props{
  sendPhoto: (item:string) => void;
  closeSelectPhoto: () => void
}

const FotoTestemunhas: React.FC<Props> = ({sendPhoto,closeSelectPhoto,}) => {
  const [photos, setPhotos] = useState('');
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

  const accessPage11 =()=> saveAsync()

  const readAsync=async()=>{
    let forms = await AsyncStorage.getItem('@forms')
    console.log('forms',forms)
    if(forms){
      setForms(JSON.parse(forms))
      console.log(forms.forms9)
      if(forms?.forms10){
      setPhotos(forms?.forms10.photos)
      }
    }
    
  }

  
  const saveAsync=async()=>{

    const forms10 = {
    photos: photos
    }

    console.log('forms10',forms10)
    forms.forms9 = forms10
    console.log('forms10 ...',forms.forms8)
    if(forms) await AsyncStorage.setItem('@forms',JSON.stringify(forms))
    navigation.navigate('FotoAcidente')
    
  }

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
            setPhotos(...photos, response.assets[0].base64);
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
            setPhotos(response.assets[0].base64);
          }
        }
      },
    );
  };

  const deletePhoto = () => {
    setPhotos('');
  };

  function SendPhotoModal(item:string){
    sendPhoto(item)

    if(item){
      closeSelectPhoto()
    }else{
      Alert.alert('A foto é obrigatória!')
      console.log(item)
    }
  }

  return (
    <ScrollView>
      <Container>
        <Title></Title>
        <SubTitle>Foto das testemunhas</SubTitle>
        
        <ViewPhotos>
          <ImageMappedContainer >
            {photos.length > 1 && (
            <>
              
              <ImagePhotos
              source={{
                uri: `data:image/jpeg;base64,${photos}`,
              }}/>
            <View style={{borderWidth:2, width:'80%',height:50, borderRadius:5, alignItems:'center', borderColor:'#BBBBBB', flexDirection:'row', justifyContent:'center',marginLeft:10}}>
              <IconAwesomeCustom name="camera" size={22} color="#BBBBBB" />
              <ButtonPhotos label="Deletar" onPress={deletePhoto} />
            </View>
            </>
            )}
          </ImageMappedContainer>

        </ViewPhotos>

        {photos.length < 1 && (
          <>
            <TouchableOpacity 
            style={{borderWidth:2, width:'80%',height:200, borderRadius:5, alignItems:'center', justifyContent:'center', borderColor:'#BBBBBB', }}
            onPress={() => launchLibrary()}>
              <IconAwesomeCustom name="photo" size={78} color="#BBBBBB" />
              <Text style={{fontSize:16, color:"#504F54"}}>Buscar da galeria</Text>
            </TouchableOpacity>
            <Text style={{fontSize:16, color:"#504F54",}} >Ou</Text>
            <View style={{borderWidth:2, width:'80%',height:50, borderRadius:5, alignItems:'center', borderColor:'#BBBBBB', flexDirection:'row', justifyContent:'center',}}>
              <IconAwesomeCustom name="camera" size={22} color="#BBBBBB" />
              <ButtonPhotos label="Abrir a camera" onPress={takePhoto} />
            </View>
          </>
        )}
        <View style={{ marginTop:30, width:'90%'}}>

          <SelectButton 
          ButtonText="Selecionar"
          onPress={ () => SendPhotoModal(photos) }/>
        </View>
      </Container>
    </ScrollView>
  );
};

export default FotoTestemunhas;
