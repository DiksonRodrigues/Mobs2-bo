import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {ActivityIndicator,View} from 'react-native';
import {
  Container,
  ScrollView,
  ContainerIndicator,
} from '../../util/styles/stylesSearched';

import {
BOContainer,
Header,
BoTypeTitle,
Informations,
PageTitle,
RelatoTextInput
} from './styles';

import {
  ITypes,
} from '../../services/interfaces';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAuth} from '../../hooks/auth';
import axios from 'axios';
import NextButton from '../../components/BO/NextButton';
import BackButton from '../../components/BO/BackButton';

type IncidentRouteParams = {
  type: ITypes;
};

const BO: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [relato, setRelato] = useState('')


  const navigation = useNavigation();
  const {matricula} = useAuth();

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
      position: {long: 0, lat: 0},
      description: '',
      boDataRegisteredId: '',
    },
  });


  const accessPageNext =()=> saveAsync()


  const readAsync=async()=>{
    let forms = await AsyncStorage.getItem('@forms')
    console.log('forms6.    ..')
    if(forms){
      setForms(JSON.parse(forms))
      if(forms?.forms7){
        setRelato(forms.forms7.relato)
      }
    }
  }
  
  async function Enviardados(){
    
    const dataPostRelato = {
      desc: relato
    }

    try{
      const idBoletim = await AsyncStorage.getItem('@IdBoletim');
      let Token = await AsyncStorage.getItem('@BO:token');

      if(idBoletim){
      const res = await axios.patch(`http://m2hmg.eastus.cloudapp.azure.com/api/boletim_ocorrencia/${idBoletim && JSON.parse(idBoletim)}/42`, {dataPostRelato},{headers:{Authorization: Token ? Token : ''}})
      console.log('enviou o relato!')
      res.data
      navigation.navigate('TutorialFotoCNH')
      return
      }
    }catch(error){
      console.log(dataPostRelato)
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

      if (Object.keys(forms.forms7).length<1) readAsync() 
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
            <PageTitle>Relato do motorista</PageTitle>
            
            <RelatoTextInput
             style={{textAlignVertical:'top'}}
             multiline={true}
             value={relato}
             onChangeText={setRelato}
             autoCorrect={false}
             />
            <View style={{flexDirection:'row'}}>
            <BackButton
            ButtonText="Voltar"
            onPress={ ()=> navigation.goBack() }/>
            <NextButton 
            ButtonText="Avançar"
            onPress={ () => Enviardados() }/>
            </View>
          </Informations>
          </BOContainer>
          </ScrollView>
      )}
    </>
  );
};

export default BO;