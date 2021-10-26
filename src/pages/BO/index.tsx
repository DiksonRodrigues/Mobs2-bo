import React, {useState} from 'react';
import {ScrollView, Modal, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {TextInputMask} from 'react-native-masked-text';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
BOContainer,
Header,
BoTypeTitle,
Informations,
PageTitle,
} from './styles';

import PickerInput from '../../components/BO/PickerInput';
import BoTextInput from '../../components/BO/BoTextInput';
import NextButton from '../../components/BO/NextButton';
import Descricao from '../../components/Modal/Descricao';
import Motorista from '../../components/Modal/Motorista';
import Status from '../../components/Modal/Status';
import Empresa from '../../components/Modal/Empresa';
import Ocorrencia from '../../components/Modal/Ocorrencia';
import LinhaOnibus from '../../components/Modal/LinhaOnibus';
import BoTextInputNumber from '../../components/BO/BoTextInputNumber';
import axios from 'axios';
import BackButton from '../../components/BO/BackButton';
import { Row } from 'react-native-easy-grid';

const BO: React.FC = ({ route }) => {   
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [handleVehicleModal, setHandleVehicleModal] = useState(false);
  const [handleMotoristaModal, setHandleMotoristaModal] = useState(false);
  const [handleStatusModal, setHandleStatusModal] = useState(false);
  const [handleEmpresaModal, setHandleEmpresaModal] = useState(false);
  const [handleOcorrenciaModal, setHandleOcorrenciaModal] = useState(false);
  const [handleOnibusModal, setHandleOnibusModal] = useState(false);

  const [odometro, setOdometro] = useState('');
  const [horimetro, setHorimetro] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [endereco, setEndereco] = useState('');
  const [forms,setForms] = useState({
    idboletim:{},
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

  const [category, setCategory] = useState({
  id: 2,
  description: 'Descrição do veículo',
  })
  const [categoryMotorista, setCategoryMotorista] = useState({
  id:1,
  name: 'Motorista',
  })
  const [categoryStatus, setCategoryStatus] = useState({
  id:1,
  name: 'Status',
  })
  const [categoryEmpresa, setCategoryEmpresa] = useState({
  id:1,
  name: 'Empresa contratada',
  })
  const [categoryOcorrencia, setCategoryOcorrencia] = useState({
  id:1,
  desc: 'Tipo de ocorrência',
  })
  const [categoryOnibus, setCategoryOnibus] = useState({
  id: 2,
  nome_fantasia: 'Linha de Onibus',
  })

const EnviarDadosIniciais = async() => {
  
  const dataDados = {
    asset_id: category.id,
    hodometro:odometro,
    horimetro:horimetro,
    driver_id: categoryMotorista.id,
    assets_state_id: categoryStatus.id,
    contracted_company_id: categoryEmpresa.id,
    boletim_ocorrencia_type_id: categoryOcorrencia.id,
    address: endereco,
    linha_id: categoryOnibus.id,
    maintenance_started_at: data + " " + hora,
  }

  try{
  const idBoletim = await AsyncStorage.getItem('@IdBoletim');
  let Token = await AsyncStorage.getItem('@BO:token');
 
  if ( idBoletim ) {
    await axios.post('http://m2hmg.eastus.cloudapp.azure.com/api/boletim_ocorrencia/42', dataDados, {headers:{Authorization: Token ? Token : ''}})
    console.log(dataDados)
    console.log('enviou os dados iniciais')
    navigation.navigate('boTerceiro');
    return
  } 
 }catch(error){
  console.log(error.response.data)
  console.log(error)
 }
}

  function handleVehicleModalClose(){
    setHandleVehicleModal(false)
  }

  function handleVehicleModalOpen(){
    setHandleVehicleModal(true)
  }

  function handleMotoristaModalClose(){
    setHandleMotoristaModal(false)
  }

  function handleMotoristaModalOpen(){
    setHandleMotoristaModal(true)
  }

  function handleStatusModalClose(){
    setHandleStatusModal(false)
  }

  function handleStatusModalOpen(){
    setHandleStatusModal(true)
  }
  
  function handleEmpresaModalClose(){
    setHandleEmpresaModal(false)
  }

  function handleEmpresaModalOpen(){
    setHandleEmpresaModal(true)
  }
  
  function handleOcorrenciaModalClose(){
    setHandleOcorrenciaModal(false)
  }

  function handleOcorrenciaModalOpen(){
    setHandleOcorrenciaModal(true)
  }

  function handleOnibusModalClose(){
    setHandleOnibusModal(false)
  }

  function handleOnibusModalOpen(){
    setHandleOnibusModal(true)
  } 
    return (
    <ScrollView>
    <BOContainer>
      <Header>
        <BoTypeTitle>{route.params.nome}</BoTypeTitle>
      </Header>

    <Informations>
      <PageTitle>Dados Iniciais</PageTitle>
      <PickerInput
      title = {category.description}
      onPress={handleVehicleModalOpen}/>

      <BoTextInputNumber
      placeholder="Odômetro"
      value={odometro}
      onChangeText={setOdometro}/>
      
      <BoTextInputNumber 
      placeholder="Horímetro"
      value={horimetro}
      onChangeText={setHorimetro}/>

      <PickerInput 
      title={categoryMotorista.name}
      onPress={handleMotoristaModalOpen}/>

      <PickerInput 
      title={categoryStatus.name}
      onPress={handleStatusModalOpen}
      />

      <PickerInput 
      title={categoryEmpresa.name}
      onPress={handleEmpresaModalOpen}/>

      <PickerInput 
      title={categoryOcorrencia.desc}
      onPress={handleOcorrenciaModalOpen}/>

      <BoTextInput 
      placeholder="Endereço"
      value={endereco}
      onChangeText={setEndereco}/>

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
    value={data}
    onChangeText={ text => setData(text) }
    placeholder='Data'/>

      <PickerInput 
      title={categoryOnibus.nome_fantasia}
      onPress={handleOnibusModalOpen}/>

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
    placeholder="Horario"/>

    <View style={{flexDirection:'row'}}>
    <BackButton
    ButtonText="Voltar"
    onPress={ ()=> navigation.goBack() }/>
    <NextButton 
    ButtonText="Avançar"
    onPress={ () => EnviarDadosIniciais() }/>
    </View>

    </Informations>


    <Modal visible={handleVehicleModal}>
      <Descricao
      category = {category}
      setCategory = {setCategory}
      closeSelectCategory = {handleVehicleModalClose}/>
    </Modal>

    <Modal visible={handleMotoristaModal}>
      <Motorista
      category = {categoryMotorista}
      setCategory = {setCategoryMotorista}
      closeSelectCategory = {handleMotoristaModalClose}/>
    </Modal>

    <Modal visible={handleStatusModal}>
      <Status
      category = {categoryStatus}
      setCategory = {setCategoryStatus}
      closeSelectCategory = {handleStatusModalClose}/>
    </Modal>

    <Modal visible={handleEmpresaModal}>
      <Empresa
      category = {categoryEmpresa}
      setCategory = {setCategoryEmpresa}
      closeSelectCategory = {handleEmpresaModalClose}/>
    </Modal>

    <Modal visible={handleOcorrenciaModal}>
      <Ocorrencia
      category = {categoryOcorrencia}
      setCategory = {setCategoryOcorrencia}
      closeSelectCategory = {handleOcorrenciaModalClose}/>
    </Modal>

    <Modal visible={handleOnibusModal}>
      <LinhaOnibus
      category = {categoryOnibus}
      setCategory = {setCategoryOnibus}
      closeSelectCategory = {handleOnibusModalClose}/>
    </Modal>

    </BOContainer>
    </ScrollView>
  );
};
export default BO;