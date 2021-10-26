import React, {useState, useEffect, useRef} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ActivityIndicator,Alert, View, Modal} from 'react-native';
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

import {
  ITypes,
} from '../../services/interfaces';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '../../hooks/auth';
import BoTextInput from '../../components/BO/BoTextInput';
import NextButton from '../../components/BO/NextButton';
import BoTextInputNumber from '../../components/BO/BoTextInputNumber';
import axios from 'axios';
import BackButton from '../../components/BO/BackButton';
import BoFotoButton from '../../components/BO/BoFotoButton';
import FotoTestemunhas from '../FotoTestemunhas';

const Testemunhas: React.FC = () => {

  const CPF1REF = useRef(null);
  const TEL1REF = useRef(null);

  const CPF2REF = useRef(null);
  const TEL2REF = useRef(null);

  const CPF3REF = useRef(null);
  const TEL3REF = useRef(null);

  const [openModal1, setOpenModal1] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [openModal3, setOpenModal3] = useState(false);

  const [loading, setLoading] = useState(false);

  const [nometestemunha1, setNometestemunha1] = useState('');
  const [cpfdatestemunha1, setCpfdatestemunha1] = useState('');
  const [cnhdatestemunha1, setCnhdatestemunha1] = useState('');
  const [telefonedatestemunha1, setTelefonedatestemunha1] = useState('');
  const [enderecotestemunha1, setEnderecotestemunha1] = useState('');
  const [complementodatestemunha1, setComplementodatestemunha1] = useState('');
  const [numerodatestemunha1, setNumerodatestemunha1] = useState('');

  const [nometestemunha2, setNometestemunha2] = useState('');
  const [cpfdatestemunha2, setCpfdatestemunha2] = useState('');
  const [cnhdatestemunha2, setCnhdatestemunha2] = useState('');
  const [telefonedatestemunha2, setTelefonedatestemunha2] = useState('');
  const [enderecotestemunha2, setEnderecotestemunha2] = useState('');
  const [complementodatestemunha2, setComplementodatestemunha2] = useState('');
  const [numerodatestemunha2, setNumerodatestemunha2] = useState('');

  const [nometestemunha3, setNometestemunha3] = useState('');
  const [cpfdatestemunha3, setCpfdatestemunha3] = useState('');
  const [cnhdatestemunha3, setCnhdatestemunha3] = useState('');
  const [telefonedatestemunha3, setTelefonedatestemunha3] = useState('');
  const [enderecotestemunha3, setEnderecotestemunha3] = useState('');
  const [complementodatestemunha3, setComplementodatestemunha3] = useState('');
  const [numerodatestemunha3, setNumerodatestemunha3] = useState('');

  const [armazenarFoto, setArmazenarFoto] = useState('');
  const [armazenarFoto2, setArmazenarFoto2] = useState('');
  const [armazenarFoto3, setArmazenarFoto3] = useState('');

  const navigation = useNavigation();
  const {matricula} = useAuth();

  const EnviarDadosDasTestemunhas=async()=>{

    const data = {
      testemunhas : [

        {
          nome: nometestemunha1,
          cpf: CPF1REF?.current.getRawValue(),
          rg: cnhdatestemunha1,
          celular: TEL1REF?.current.getRawValue(),
          endereco: enderecotestemunha1,
          complemento: complementodatestemunha1,
          numero: numerodatestemunha1,
          foto: armazenarFoto
        },

        {
          nome: nometestemunha2,
          cpf: CPF2REF?.current.getRawValue(),
          rg: cnhdatestemunha2,
          celular: TEL2REF?.current.getRawValue(),
          endereco: enderecotestemunha2,
          complemento: complementodatestemunha2,
          numero: numerodatestemunha2,
          foto: armazenarFoto2
        },
        
        {
          nome: nometestemunha3,
          cpf: CPF3REF?.current.getRawValue(),
          rg: cnhdatestemunha3,
          celular: TEL3REF?.current.getRawValue(),
          endereco: enderecotestemunha3,
          complemento: complementodatestemunha3,
          numero: numerodatestemunha3,
          foto: armazenarFoto3
        },

      ]
    }

    try{
      const idBoletim = await AsyncStorage.getItem('@IdBoletim');
      let Token = await AsyncStorage.getItem('@BO:token');

      if(idBoletim){
      await axios.post(`http://m2hmg.eastus.cloudapp.azure.com/api/boletim_ocorrencia/141/testemunhas/42`, data, {headers:{Authorization: Token ? Token : ''}})
      console.log('enviou os dados das testemunhas')
      navigation.navigate('FotoAcidente')
      return
      }
    }catch(error){
      console.log(data)
      console.log(error)
      console.log(error.response.data)
    }
  }

  function OpenPhotoModal1(){
  setOpenModal1(true)
  }
  
  function ClosePhotoModal1(){
  setOpenModal1(false)
  }

  function OpenPhotoModal2(){
  setOpenModal2(true)
  }
  
  function ClosePhotoModal2(){
  setOpenModal2(false)
  }

  function OpenPhotoModal3(){
  setOpenModal3(true)
  }
  
  function ClosePhotoModal3(){
  setOpenModal3(false)
  }

  useEffect(() => {
    function showAlertTestemunhas(){
      setLoading(false);
      Alert.alert(
        "HOUVE TESTEMUNHAS?",
        "",
        [
          {
            text: "SIM",
            onPress: () => navigation.navigate('Testemunhas')
          },
          { text: "NÃO", onPress: () => navigation.navigate('FotoAcidente') }
        ],
        { cancelable: false }
      );
    }

    showAlertTestemunhas()
  }, [matricula]);



  return (
    <>
      {loading ? (
        <ContainerIndicator>
          <ActivityIndicator size="large" color="#0000ff" />
        </ContainerIndicator>
      ) : (
        <ScrollView>
          <BOContainer>
            <Header>
              <BoTypeTitle>B.O Acidente</BoTypeTitle>
            </Header>

          <Informations>
            <PageTitle>Dados das testemunhas</PageTitle>

            <BoTextInput 
            placeholder="Nome da testemunha 1"
            value={nometestemunha1}
            onChangeText={setNometestemunha1}/>
            
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
            value={cpfdatestemunha1}
            onChangeText={ text => setCpfdatestemunha1(text) }
            placeholder="CPF da testemunha 1"
            ref={CPF1REF}
            />

            <BoTextInputNumber 
            placeholder="CNH da testemunha 1"
            value={cnhdatestemunha1}
            onChangeText={setCnhdatestemunha1}/>

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
            value={telefonedatestemunha1}
            onChangeText={ text => setTelefonedatestemunha1(text) }
            placeholder="Telefone da testemunha 1"
            ref={TEL1REF}/>

            <BoTextInputNumber 
            placeholder="Endereço da testemunha 1"
            value={enderecotestemunha1}
            onChangeText={setEnderecotestemunha1}/>

            <BoTextInputNumber 
            placeholder="Complemento"
            value={complementodatestemunha1}
            onChangeText={setComplementodatestemunha1}/>

            <BoTextInputNumber 
            placeholder="Numero"
            value={numerodatestemunha1}
            onChangeText={setNumerodatestemunha1}/>

            <BoFotoButton
            title = {armazenarFoto ? 'Enviou a foto!' : 'enviar a foto da testemunha 1'}
            onPress = { ()=> OpenPhotoModal1()}/>

            <BoTextInput 
            placeholder="Nome da testemunha 2"
            value={nometestemunha2}
            onChangeText={setNometestemunha2}/>
            
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
            value={cpfdatestemunha2}
            onChangeText={ text => setCpfdatestemunha2(text) }
            placeholder="CPF da testemunha 2"
            ref={CPF2REF}/>

            <BoTextInputNumber 
            placeholder="CNH da testemunha 2"
            value={cnhdatestemunha2}
            onChangeText={setCnhdatestemunha2}/>

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
            value={telefonedatestemunha2}
            onChangeText={ text => setTelefonedatestemunha2(text) }
            placeholder="Telefone da testemunha 2"
            ref={TEL2REF}/>

            <BoTextInputNumber 
            placeholder="Endereço da testemunha 2"
            value={enderecotestemunha2}
            onChangeText={setEnderecotestemunha2}/>

            <BoTextInputNumber 
            placeholder="Complemento"
            value={complementodatestemunha2}
            onChangeText={setComplementodatestemunha2}/>

            <BoTextInputNumber 
            placeholder="Numero"
            value={numerodatestemunha2}
            onChangeText={setNumerodatestemunha2}/>

            <BoFotoButton
            title = {armazenarFoto2 ? 'Enviou a foto!' : 'enviar a foto da testemunha 2'}
            onPress = { ()=> OpenPhotoModal2()}/>

            <BoTextInput 
            placeholder="Nome da testemunha 3"
            value={nometestemunha3}
            onChangeText={setNometestemunha3}/>
            
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
            value={cpfdatestemunha3}
            onChangeText={ text => setCpfdatestemunha3(text) }
            placeholder="CPF da testemunha 3"
            ref={CPF3REF}/>

            <BoTextInputNumber 
            placeholder="CNH da testemunha 3"
            value={cnhdatestemunha3}
            onChangeText={setCnhdatestemunha3}/>

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
            value={telefonedatestemunha3}
            onChangeText={ text => setTelefonedatestemunha3(text) }
            placeholder="Telefone da testemunha 3"
            ref={TEL3REF}/>

            <BoTextInputNumber 
            placeholder="Endereço da testemunha 3"
            value={enderecotestemunha3}
            onChangeText={setEnderecotestemunha3}/>

            <BoTextInputNumber 
            placeholder="Complemento"
            value={complementodatestemunha3}
            onChangeText={setComplementodatestemunha3}/>

            <BoTextInputNumber 
            placeholder="Numero"
            value={numerodatestemunha3}
            onChangeText={setNumerodatestemunha3}/>

            <BoFotoButton
            title = {armazenarFoto3 ? 'Enviou a foto!' : 'enviar a foto da testemunha 3'}
            onPress = { ()=> OpenPhotoModal3()}/>

          <View style={{flexDirection:'row'}}>

            <BackButton
            ButtonText="Voltar"
            onPress={ ()=> navigation.goBack() }/>

            <NextButton 
            ButtonText="Avançar"
            onPress={() => EnviarDadosDasTestemunhas() }/>
          </View>

          </Informations>

          <Modal visible={openModal1}>
            <FotoTestemunhas
            sendPhoto={setArmazenarFoto}
            closeSelectPhoto={ClosePhotoModal1}/>
          </Modal>

          <Modal visible={openModal2}>
            <FotoTestemunhas
            sendPhoto={setArmazenarFoto2}
            closeSelectPhoto={ClosePhotoModal2}/>
          </Modal>

          <Modal visible={openModal3}>
            <FotoTestemunhas
            sendPhoto={setArmazenarFoto3}
            closeSelectPhoto={ClosePhotoModal3}/>
          </Modal>

          </BOContainer>
          </ScrollView>
      )}
    </>
  );
};

export default Testemunhas;