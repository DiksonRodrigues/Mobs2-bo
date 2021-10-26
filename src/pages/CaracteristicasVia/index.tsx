import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Modal, View} from 'react-native';
import { useForm } from 'react-hook-form'
import BOInputHook from '../../components/BO/BOInputHook';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

import {useAuth} from '../../hooks/auth';
import PickerInput from '../../components/BO/PickerInput';
import NextButton from '../../components/BO/NextButton';
import Semaforo from '../../components/Modal/Semaforo';
import LuzArtificial from '../../components/Modal/LuzArtificial';
import TipoPista from '../../components/Modal/TipoPista';
import AlinhamentoPista from '../../components/Modal/AlinhamentoPista';
import PavimentaçãoPista from '../../components/Modal/PavimentaçãoPista';
import CondicoesPista from '../../components/Modal/CondicoesPista';
import axios from 'axios';
import BackButton from '../../components/BO/BackButton';


interface FormData {
  Velocidade_maxima: string
}


const CaracteristicasVia: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [handleFarolModal, setHandleFarolModal] = useState(false);
  const [handleLuzartificialModal, setHandleLuzartificialModal] = useState(false);
  const [handleTipoPistaModal, setHandleTipoPistaModal] = useState(false);
  const [handleAlinhamentoPistaModal, setHandleAlinhamentoPistaModal] = useState(false);
  const [handlePavimentacaoPistaModal, setHandlePavimentacaoPistaModal] = useState(false);
  const [handleCondicoesPistaModal, setHandleCondicoesPistaModal] = useState(false);

  const [categoryFarol, setCategoryFarol] = useState({
  nome: 'Qual a cor do farol?',
  })
  const [categoryLuz, setCategoryLuz] = useState({
  nome: 'Tinha Luz artificial?',
  })
  const [categoryTipoPista, setCategoryTipoPist] = useState({
  nome: 'Qual o tipo de pista?',
  })
  const [categoryAlinhamentoPista, setCategoryAlinhamentoPista] = useState({
  nome: 'Qual o alinhamento da pista?',
  })
  const [categoryPavimentacaoPista, setCategoryPavimentacaoPista] = useState({
  nome: 'Qual a pavimentação da pista?',
  })
  const [categoryCondicoesPista, setCategoryCondicoesPista] = useState({
  nome: 'Qual as condições da pista?',
  })

  const {
  control,
  handleSubmit,
  } = useForm();
  
  function handleFarolModalClose(){
    setHandleFarolModal(false)
  }

  function handleFarolModalOpen(){
    setHandleFarolModal(true)
  } 

  function handleLuzModalClose(){
    setHandleLuzartificialModal(false)
  }

  function handleLuzModalOpen(){
    setHandleLuzartificialModal(true)
  } 

  function handleTipoPistaModalClose(){
    setHandleTipoPistaModal(false)
  }

  function handleTipoPistaModalOpen(){
    setHandleTipoPistaModal(true)
  }

  function handleAlinhamentoPistaModalClose(){
    setHandleAlinhamentoPistaModal(false)
  }

  function handleAlinhamentoPistaModalOpen(){
    setHandleAlinhamentoPistaModal(true)
  } 

  function handlePavimentacaoPistaModalClose(){
    setHandlePavimentacaoPistaModal(false)
  }

  function handlePavimentacaoPistaModalOpen(){
    setHandlePavimentacaoPistaModal(true)
  } 

  function handleCondicoesPistaModalClose(){
    setHandleCondicoesPistaModal(false)
  }

  function handleCondicoesPistaModalOpen(){
    setHandleCondicoesPistaModal(true)
  } 

  const navigation = useNavigation();
  const {matricula} = useAuth();

  async function handleRegister(form: FormData){
    const data = {
    vel_max: form.Velocidade_maxima,
    semaforo: categoryFarol.nome,
    luz_artificial: categoryLuz.nome,
    pista: categoryTipoPista.nome,
    alinhamento: categoryAlinhamentoPista.nome,
    pavimentacao: categoryPavimentacaoPista.nome,
    condicoes: categoryCondicoesPista.nome
    }

    try{
      const idBoletim = await AsyncStorage.getItem('@IdBoletim');
      let Token = await AsyncStorage.getItem('@BO:token');

      if(idBoletim){
      const res = await axios.post(`http://m2hmg.eastus.cloudapp.azure.com/api/boletim_ocorrencia/${idBoletim && JSON.parse(idBoletim)}/via/42`, {data},{headers:{Authorization: Token ? Token : ''}})
      res.data
      console.log('enviou os dados da via!')
      navigation.navigate('CaracteristicasGerais')
      return
      }
      }catch(error){
        console.log(error)
      }

    console.log(data)
  }


  useEffect(() => {
    async function getItems() {
      setLoading(true);
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
            <PageTitle>Características via</PageTitle>

            
            <BOInputHook 
            placeholder="Velocidade maxima"
            control={control}
            name="Velocidade_maxima"
            />

            <PickerInput
            title={categoryFarol.nome}
            onPress={handleFarolModalOpen}/>

            <PickerInput
            title={categoryLuz.nome}
            onPress={handleLuzModalOpen}/>

            <PickerInput
            title={categoryTipoPista.nome}
            onPress={handleTipoPistaModalOpen}/>

            <PickerInput
            title={categoryAlinhamentoPista.nome}
            onPress={handleAlinhamentoPistaModalOpen}/>

            <PickerInput
            title={categoryPavimentacaoPista.nome}
            onPress={handlePavimentacaoPistaModalOpen}/>

            <PickerInput
            title={categoryCondicoesPista.nome}
            onPress={handleCondicoesPistaModalOpen}/>

          <View style={{flexDirection:'row'}}>
            <BackButton
            ButtonText="Voltar"
            onPress={ ()=> navigation.goBack() }/>
            <NextButton 
            ButtonText="Avançar"
            onPress={handleSubmit(handleRegister) }/>
          </View>
          </Informations>
          </BOContainer>

          <Modal visible={handleFarolModal}>
            <Semaforo
            category = {categoryFarol}
            setCategory = {setCategoryFarol}
            closeSelectCategory = {handleFarolModalClose}/>
          </Modal>

          <Modal visible={handleLuzartificialModal}>
            <LuzArtificial
            category = {categoryLuz}
            setCategory = {setCategoryLuz}
            closeSelectCategory = {handleLuzModalClose}/>
          </Modal>

          <Modal visible={handleTipoPistaModal}>
            <TipoPista
            category = {categoryTipoPista}
            setCategory = {setCategoryTipoPist}
            closeSelectCategory = {handleTipoPistaModalClose}/>
          </Modal>

          <Modal visible={handleAlinhamentoPistaModal}>
            <AlinhamentoPista
            category = {categoryAlinhamentoPista}
            setCategory = {setCategoryAlinhamentoPista}
            closeSelectCategory = {handleAlinhamentoPistaModalClose}/>
          </Modal>

          <Modal visible={handlePavimentacaoPistaModal}>
            <PavimentaçãoPista
            category = {categoryPavimentacaoPista}
            setCategory = {setCategoryPavimentacaoPista}
            closeSelectCategory = {handlePavimentacaoPistaModalClose}/>
          </Modal>

          <Modal visible={handleCondicoesPistaModal}>
            <CondicoesPista
            category = {categoryCondicoesPista}
            setCategory = {setCategoryCondicoesPista}
            closeSelectCategory = {handleCondicoesPistaModalClose}/>
          </Modal>
          </ScrollView>
      )}
    </>
  );
};

export default CaracteristicasVia;