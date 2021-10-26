import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Modal, View} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';
import {
  Container,
  ScrollView,
  TextInput,
  ContainerIndicator,
} from '../../util/styles/stylesSearched';

import {
  BOContainer,
  Header,
  BoTypeTitle,
  Informations,
  PageTitle,
} from './styles';

import Button from '../../components/Button';
import colors from '../../util/styles/colors';
import {
  IVehicleDescription,
  IEnterprises,
  IStatus,
  IDriver,
  ITypes,
  IStoppingPoints
} from '../../services/interfaces';

import {
  REnterprisesOptions,
  RVehicleDescriptionOptions,
  RGetStatus,
  RGetDriver,
} from '../../services/requests';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchEngine from 'react-native-search-engine';
import {styles} from '../../util/styles/styleSearchEngine';
import {useAuth} from '../../hooks/auth';
import api from '../../services/api';
import axios from 'axios';
import PickerInput from '../../components/BO/PickerInput';
import BoTextInput from '../../components/BO/BoTextInput';
import NextButton from '../../components/BO/NextButton';
import Judializar from '../../components/Modal/Judializar';
import BackButton from '../../components/BO/BackButton';

type IncidentRouteParams = {
  type: ITypes;
};

const Orçamento: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [orçamento1, setOrçamento1] = useState('');
  const [orçamento2, setOrçamento2] = useState('');
  const [orçamento3, setOrçamento3] = useState('');
  const [judicializar, setJudicializar] = useState();
  const [juciliação, setJuciliação] = useState('');
  const [handleJudializarModal, setHandleJudializarModal] = useState(false);

  const [categoryJudializar, setCategoryJudializar] = useState({
    nome: 'Deseja judializar a ação?',
    })
  
  function handleJudializarModalClose(){
    setHandleJudializarModal(false)
  }

  function handleJudializarModalOpen(){
    setHandleJudializarModal(true)
  } 

  const [infos, setInfos] = useState({type: {desc: ''}});

  const navigation = useNavigation();
  const {matricula, user} = useAuth();

  const data ={
    valor_1: orçamento1,
    valor_2: orçamento2,
    valor_3: orçamento3,
    //judicializar: judicializar,
    dados_judicializacao: juciliação
    }

  const Enviardaodos = async () => {
  try{
  const res = await axios.post(`http://m2hmg.eastus.cloudapp.azure.com/api/boletim_ocorrencia/9/orcamento/9`, {...data})
  console.log('enviou os dados' + data)
  navigation.navigate('Home')
  return res.data
  } catch(error){
  console.log(error)
  }
}

  const closeBO =()=> saveAsync()


  const readAsync=async()=>{
    let forms = await AsyncStorage.getItem('@forms')
    console.log('forms3.    ..')
    if(forms){
      setForms(JSON.parse(forms))
      if(forms?.forms4){
        setOrçamento1(forms.forms4.orçamento1)
        setOrçamento3(forms.forms4.orçamento2)
        setOrçamento4(forms.forms4.orçamento3)
        setJudicializar(forms.forms4.judicializar)
        setJuciliação(forms.forms4.juciliação)
      }
    }
  }
  const saveAsync=async()=>{

    const data = {
    valor_1: orçamento1,
    valor_2: orçamento2,
    valor_3: orçamento3,
    judicializar: categoryJudializar.nome,
    dados_judicializacao: juciliação
    }

    try {
    const idBoletim = await AsyncStorage.getItem('@IdBoletim');
    let Token = await AsyncStorage.getItem('@BO:token');

    if(idBoletim){
      const res = await axios.post(`http://m2hmg.eastus.cloudapp.azure.com/api/boletim_ocorrencia/${idBoletim && JSON.parse(idBoletim)}/orcamento/42`, {data},{headers:{Authorization: Token ? Token : ''}})
      res.data
      console.log('enviou o orçamento')
      navigation.navigate('Home')
      return
    }
    } catch (error) {
      console.log(error.response.data)
      console.log(error)
    }
  }

  useEffect(() => {
    async function getItems() {
      setLoading(true);


      const infosString = await AsyncStorage.getItem('@BO:infos');

      const infosJson: IncidentRouteParams =
        infosString !== null ? JSON.parse(infosString) : null;
      setInfos(infosJson);

      setLoading(false);
    }

    getItems();
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
          <PageTitle>Observações da área responsavel</PageTitle>

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
            type={'money'}
            value={orçamento1}
            onChangeText={ text => setOrçamento1(text) }
            placeholder="Valor total do orçamento 1"/>
          
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
            type={'money'}
            value={orçamento2}
            onChangeText={ text => setOrçamento2(text) }
            placeholder="Valor total do orçamento 2"/>

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
            type={'money'}
            value={orçamento3}
            onChangeText={ text => setOrçamento3(text) }
            placeholder="Valor total do orçamento 3"/>

          <PickerInput 
            title={categoryJudializar.nome}
            onPress={handleJudializarModalOpen}/>

          <BoTextInput 
          placeholder="Dados da Juciliação"
          value={juciliação}
          onChangeText={setJuciliação}/>

          <View style={{flexDirection:'row'}}>
            <BackButton
            ButtonText="Voltar"
            onPress={ ()=> navigation.goBack() }/>
            <NextButton 
            ButtonText="Finalizar B.O"
            onPress={ () => closeBO() }/>
          </View>

        </Informations>

        <Modal visible={handleJudializarModal}>
            <Judializar
            category = {categoryJudializar}
            setCategory = {setCategoryJudializar}
            closeSelectCategory = {handleJudializarModalClose}/>
          </Modal>
        </BOContainer>
        </ScrollView>
      )}
    </>
  );
};

export default Orçamento;