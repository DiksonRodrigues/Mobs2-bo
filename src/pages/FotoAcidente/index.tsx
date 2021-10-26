import React, {useState} from 'react';
import {View, TouchableOpacity, Text, } from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Title,
  SubTitle,
  TitleInputsContainer,
  ImageMappedContainer,
  ViewPhotos,
  ImagePhotos,
} from './styles';

import {IconAwesomeCustom} from '../../util/styles/stylesSearched';
import ButtonPhotos from '../../components/ButtonPhotos';
import ButtonInsidePhotos from '../../components/ButtonInsidePhotos';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Container, ScrollView} from '../../util/styles/stylesSearched';
import {PermissionsAndroid} from 'react-native';
import {useAuth} from '../../hooks/auth';
import axios from 'axios';
import NextButton from '../../components/BO/NextButton';
import BackButton from '../../components/BO/BackButton';

const FotoAcidente: React.FC = () => {
  const [photos, setPhotos] = useState<Array<string>>([]);
  const navigation = useNavigation();

  const HandleEnviarFoto = async() => {
    const idBoletim = await AsyncStorage.getItem('@IdBoletim');
    let Token = await AsyncStorage.getItem('@BO:token');

    const data = {
    images: photos
    }

    try{
      if(idBoletim){
      await axios.post(`http://m2hmg.eastus.cloudapp.azure.com/api/boletim_ocorrencia/${idBoletim && JSON.parse(idBoletim)}/images/42`, data, {headers:{Authorization: Token ? Token : ''}})
      console.log('enviou a foto do acidente!')
      navigation.navigate('RelatoMotorista')
      return
      }
    }catch(error){
      console.log('id do boletim:',idBoletim)
      console.log(data)
      console.log(error.response.data)
      console.log(error)
    }
  }

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
        <SubTitle>Por favor envie as fotos do acidente</SubTitle>
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
          onPress={ () => HandleEnviarFoto() }/>
        </View>
      </Container>
    </ScrollView>
  );
};

export default FotoAcidente;