import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {ActivityIndicator, Modal, View} from 'react-native';
import {TextInputMask} from 'react-native-masked-text';
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
import FotosLocal from '../../components/Modal/FotosLocal';
import BOInputHookNumber from '../../components/BO/BOInputHookNumber';
import axios from 'axios';
import BackButton from '../../components/BO/BackButton';

interface FormData {
  Tipo_de_ocorrência_policial: string
  Código_da_ocorrencia: string
  Total_de_Vítimas: string
  Perícia_do_local: string
  Nome_do_perito: string
  Disco_tacógrafo_apreendido: string
  Viatura_policial: string
  Socorro_resgate: string
  Delegacia: string
  viatura_da_perícia: string
  DP: string
  Situação: string
}

const CaracteristicasGerais: React.FC<FormData> = () => {
  const [loading, setLoading] = useState(false);
  const [hora, setHora] = useState('');
  const [horaLiberacao, setHoraLiberacao] = useState('');
  const [handleFotosLocalModal, setHandleFotosLocalModal] = useState(false);

  const [categoryFotosLocal, setCategoryFotosLocal] = useState({
    nome: 'Foram tirados fotos no local?',
    })
  
  function handleFotosLocalModalClose(){
    setHandleFotosLocalModal(false)
  }

  function handleFotosLocalModalOpen(){
    setHandleFotosLocalModal(true)
  } 
  
  const {
    control,
    handleSubmit,
  } = useForm();
  const navigation = useNavigation();
  const {matricula} = useAuth();

  async function handleRegister(form: FormData){
    const data = {
    ocorrencia_policial: form.Tipo_de_ocorrência_policial,
    codigo_ocorrencia: form.Código_da_ocorrencia,
    total_vitimas: form.Total_de_Vítimas,
    pericia_local: form.Perícia_do_local,
    perito: form.Perícia_do_local,
    disco_tacografo_apreendido: form.Disco_tacógrafo_apreendido,
    viatura_policial: form.Viatura_policial,
    socorro_resgate: form.Socorro_resgate,
    delegacia: form.Delegacia,
    tirado_fotos_local: categoryFotosLocal.nome,
    viatura_pericia: form.viatura_da_perícia,
    horario_atendimento_local: hora,
    dp: form.DP,
    situacao: form.Situação,
    horario_liberacao_veiculo: horaLiberacao,
    }

    try{
      const idBoletim = await AsyncStorage.getItem('@IdBoletim');
      let Token = await AsyncStorage.getItem('@BO:token');
      
      if(idBoletim){
      const res = await axios.post(`http://m2hmg.eastus.cloudapp.azure.com/api/boletim_ocorrencia/${idBoletim && JSON.parse(idBoletim)}/info/42`,{data},{headers:{Authorization: Token ? Token : ''}})
      res.data
      console.log('enviou os dados gerais!');
      navigation.navigate('Testemunhas');
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
          <PageTitle>Características gerais</PageTitle>

          
          <BOInputHook 
          placeholder="Tipo de ocorrência policial"
          control={control}
          name="Tipo_de_ocorrência_policial"/>

          <BOInputHookNumber 
          placeholder="Código da ocorrencia"
          control={control}
          name="Código_da_ocorrencia"/>

          <BOInputHookNumber 
          placeholder="Total de Vítimas"
          control={control}
          name="Total_de_Vítimas"/>

          <BOInputHook 
          placeholder="Perícia do local"
          control={control}
          name="Perícia_do_local"/>

          <BOInputHook 
          placeholder="Nome do perito"
          control={control}
          name="Nome_do_perito"/>

          <BOInputHook 
          placeholder="Disco tacógrafo apreendido"
          control={control}
          name="Disco_tacógrafo_apreendido"/>

          <BOInputHook 
          placeholder="Viatura policial"
          control={control}
          name="Viatura_policial"/>

          <BOInputHook 
          placeholder="Socorro resgate"
          control={control}
          name="Socorro_resgate"/>

          <BOInputHook 
          placeholder="Delegacia"
          control={control}
          name="Delegacia"/>

          <PickerInput
            title={categoryFotosLocal.nome}
            onPress={handleFotosLocalModalOpen}/>

          <BOInputHook 
          placeholder="viatura da perícia"
          control={control}
          name="viatura_da_perícia"/>

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
            format: 'HH:mm'
            }}
            value={hora}
            onChangeText={ text => setHora(text) }
            placeholder="Horario do atendimento no local"/>

          <BOInputHook 
          placeholder="DP"
          control={control}
          name="DP"/>

          <BOInputHook 
          placeholder="Situação"
          control={control}
          name="Situação"/>

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
            format: 'HH:mm'
            }}
            value={horaLiberacao}
            onChangeText={ text => setHoraLiberacao(text) }
            placeholder="Horario da liberação do veículo"/>

          
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

          <Modal visible={handleFotosLocalModal}>
            <FotosLocal
            category = {categoryFotosLocal}
            setCategory = {setCategoryFotosLocal}
            closeSelectCategory = {handleFotosLocalModalClose}/>
          </Modal>

        </ScrollView>
      )}
    </>
  );
};

export default CaracteristicasGerais;