import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect, } from 'react';
import {View, Modal} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';

import {
  ScrollView,
  ContainerIndicator,
} from '../../util/styles/stylesSearched';
import {
BOContainer,
Header,
BoTypeTitle,
Informations,
PageTitle,
} from './styles';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '../../hooks/auth';
import axios from 'axios';
import BoTextInput from '../../components/BO/BoTextInput';
import NextButton from '../../components/BO/NextButton';
import BoTextInputNumber from '../../components/BO/BoTextInputNumber';
import BackButton from '../../components/BO/BackButton';
import BoFotoButton from '../../components/BO/BoFotoButton';
import BOPhoto from '../boPhoto';

const boTerceiro: React.FC = () => {
  
  const [loading, setLoading] = useState(false);
  const [nometerceiro, setNometerceiro] = useState('');
  const [adress, setAdress] = useState('');
  const [complement, setComplement] = useState('');
  const [rg, setRG] = useState('');
  const [cnh, setCNH] = useState('');
  const [cpf, setCpf] = useState('');
  const [data, setData] = useState('');
  const [celular, setCelular] = useState('');

  const [openPhotoModal, setOpenPhotoModal] = useState(false);
  const [armazenarFoto, setArmazenarFoto] = useState('')
  
  const navigation = useNavigation();
  const {matricula, user} = useAuth();
 
const HandleEnviarDadosTerceiro = async() => {
  const forms2 = {
    nome: nometerceiro,
    endereco: adress,
    complemento: complement,
    celular: celular,
    rg: rg,
    cnh: cnh,
    cnh_validade: data,
    cpf: cpf,
    cnh_frente: armazenarFoto
  }
  
  try{
    const idBoletim = await AsyncStorage.getItem('@IdBoletim');
    let Token = await AsyncStorage.getItem('@BO:token');

    if(idBoletim){
    const res = await axios.post(`http://m2hmg.eastus.cloudapp.azure.com/api/boletim_ocorrencia/${idBoletim && JSON.parse(idBoletim)}/terceiro/42`, {forms2},{headers:{Authorization: Token ? Token : ''}})
    console.log('enviou os dados terceiro!')
    console.log(forms2)
    res.data
    navigation.navigate('CaracteristicasVia')
    return
    }
  }catch(error){
    console.log(user?.id)
    console.log(matricula)
    console.log(error)
  }
  
}

function ClosePhotoModal(){
  setOpenPhotoModal(false)
}

  return (
  <ScrollView>
  <BOContainer>
    <Header>
      <BoTypeTitle>B.O Acidente</BoTypeTitle>
    </Header>

  <Informations>
    <PageTitle>Dados de terceiros</PageTitle>

    <BoTextInput 
    placeholder="Nome"/>
    
    <BoTextInput 
    placeholder="Endereço"/>

    <BoTextInput 
    placeholder="Complemento (opcional)"/>

    <TextInputMask
    style={{
    width: '100%',
    paddingTop:15,
    paddingBottom:15,
    paddingHorizontal:11,
    marginBottom:11,
    borderRadius:5,
    backgroundColor:'#FFFFFF',
    fontSize:20,
    color: '#686666',
    }}
    type={'cel-phone'}
    options={{
      maskType: 'BRL',
      withDDD: true,
      dddMask: '(99) '
    }}
    value={celular}
    onChangeText={ text => setCelular(text) }
    placeholder="celular"/>

    <BoTextInputNumber 
    placeholder="DocumentoRG"/>

    <BoTextInputNumber 
    placeholder="Numero CNH"/>


    <TextInputMask
    style={{
    width: '100%',
    paddingTop:15,
    paddingBottom:15,
    paddingHorizontal:11,
    marginBottom:11,
    borderRadius:5,
    backgroundColor:'#FFFFFF',
    fontSize:20,
    color: '#686666',
    }}
    type={'datetime'}
    options={{
    format: 'DD/MM/YYYY'
    }}
    value={cnh}
    onChangeText={ text => setCNH(text) }
    placeholder='data de validade da CNH'/>

      <TextInputMask
      style={{
      width: '100%',
      paddingTop:15,
      paddingBottom:15,
      paddingHorizontal:11,
      marginBottom:11,
      borderRadius:5,
      backgroundColor:'#FFFFFF',
      fontSize:20,
      color: '#686666',
      }}
      type={'cpf'}
      value={cpf}
      onChangeText={ text => setCpf(text) }
      placeholder="Numero do CPF"/>

      <BoFotoButton
      title={armazenarFoto ? 'Enviou a foto!' : 'Enviar foto do terceiro'}
      onPress={ ()=> setOpenPhotoModal(true)}/>

    <View style={{flexDirection:'row'}}>
      <BackButton
      ButtonText="Voltar"
      onPress={ ()=> navigation.goBack() }/>
      <NextButton 
      ButtonText="Avançar"
      onPress={ () => HandleEnviarDadosTerceiro() }/>
    </View>
  </Informations>

  <Modal visible={openPhotoModal}>
    <BOPhoto
    sendPhoto={setArmazenarFoto}
    closeSelectPhoto={ClosePhotoModal}/>
  </Modal>
  </BOContainer>
  </ScrollView>
)}

export default boTerceiro;