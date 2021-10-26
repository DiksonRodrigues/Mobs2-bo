import React, {useEffect, useState} from 'react';
import {Alert, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  Title,
  SubTitle,
  ButtonsContainer,
  ImageMappedContainer,
  ViewPhotos,
  ImagePhotos,
  styles,
  simpleTextA,
} from './styles';

import {IconAwesomeCustom} from '../../util/styles/stylesSearched';

import ButtonPhotos from '../../components/ButtonPhotos';
import ButtonInsidePhotos from '../../components/ButtonInsidePhotos';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Container, ScrollView} from '../../util/styles/stylesSearched';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PermissionsAndroid} from 'react-native';
import {useAuth} from '../../hooks/auth';
import axios from 'axios';
import { Text } from 'react-native-paper';
import NextButton from '../../components/BO/NextButton';
import BackButton from '../../components/BO/BackButton';
import SelectButton from '../../components/BO/SelectButton';


interface Props{
  sendPhoto: (item:string[]) => void;
  closeSelectPhoto: () => void
}

const BOPhoto: React.FC<Props> = ({sendPhoto,closeSelectPhoto,}) => {

  const {matricula, user} = useAuth();
  const [photos, setPhotos] = useState<Array<string>>([]);

  const EnviarFotoTerceiro=async(  )=>{
    
    const forms3 = {
    cnh_frente: photos
    }

    try{
      const idBoletim = await AsyncStorage.getItem('@IdBoletim');

      if(idBoletim){
        const res = await axios.post(`http://m2hmg.eastus.cloudapp.azure.com/api/boletim_ocorrencia/${idBoletim && JSON.parse(idBoletim)}/terceiro/42`, {forms3})
        console.log('envou a foto da CNH!')
        res.data
        navigation.navigate('CaracteristicasVia')
        return
      }
    }catch(error){
      console.log(error)
    }
  }

  const navigation = useNavigation();
  
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

  function SendPhotoModal(item:string[]){
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
        <SubTitle>Fotos frente e verso da CNH ( terceiro )</SubTitle>
        
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
        <View style={{ marginTop:30, width:'90%'}}>
          <SelectButton 
          ButtonText="Selecionar"
          onPress={ () => SendPhotoModal(photos) }/>
        </View>
      </Container>
    </ScrollView>
  );
};

export default BOPhoto;
