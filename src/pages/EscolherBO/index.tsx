import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hooks/auth'
import axios from 'axios';

import { 
Container,
Title,
BoShowcase,
ChooseContainer,
BOIcon,
BOCustomIcon,
BoName,
} from './styles';

const EscolherBO: React.FC = () => {
    const navigation = useNavigation();
    const { user } = useAuth()

    const HandleGerarIdBoletim = async(boletim_ocorrencia_type_id: number, navigationToBo:{screenName:string, props:{nome: string}}) => {
        let Token = await AsyncStorage.getItem('@BO:token');
    
        const idboletim = {
        boletim_ocorrencia_type_id,
        driver_id: user?.id
        }
    
        try{
          await axios.post('http://m2hmg.eastus.cloudapp.azure.com/api/boletim_ocorrencia/initial/42', idboletim, {headers:{Authorization: Token ? Token : ''}})
          .then( response => {
          const id = response.data.data.id;

          AsyncStorage.setItem('@IdBoletim', id.toString())
          console.log('id do boletim:',response.data.data.id)
          })
     
          console.log('id do tipo de boletim:', idboletim)
          navigation.navigate(navigationToBo.screenName, navigationToBo.props)
          return
          }catch(error){
          console.log(error)
        }
      }

  return (
  <Container>
    <Title>QUAL A SITUAÇÃO DO SEU BO?</Title>
    <BoShowcase>

      <ChooseContainer onPress={ () => HandleGerarIdBoletim(1,{screenName: "B.O.", props:{nome: 'B.O ACIDENTE DE TRANSITO'}}) }>
        <BOIcon>
          <BOCustomIcon name="car-traction-control"/>
        </BOIcon>
        <BoName>Acidente de transito</BoName>
      </ChooseContainer>

      <ChooseContainer onPress={ () => HandleGerarIdBoletim(2,{screenName: "B.O.", props:{nome: 'B.O ACIDENTE DE TRANSITO COM VITIMA'}}) }>
        <BOIcon>
          <BOCustomIcon name="hospital-building"/>
        </BOIcon>
        <BoName>{`Acidente de transito \ncom vitima`}</BoName>
      </ChooseContainer>

      <ChooseContainer onPress={ () => HandleGerarIdBoletim(3,{screenName: "B.O.", props:{nome: 'B.O COLISÃO'}}) }>
        <BOIcon>
          <BOCustomIcon name="car-brake-alert"/>
        </BOIcon>
        <BoName>Colisão</BoName>
      </ChooseContainer>

      <ChooseContainer onPress={ () => HandleGerarIdBoletim(4,{screenName: "B.O.", props:{nome: 'B.O COLISÃO COM TERCEIROS'}}) }>
        <BOIcon>
          <BOCustomIcon name="car-multiple"/>
        </BOIcon>
        <BoName>Colisão com terceiros</BoName>
      </ChooseContainer>

      <ChooseContainer onPress={ () => HandleGerarIdBoletim(5,{screenName: "B.O.", props:{nome: 'B.O ROTA INTERDITADA'}}) }>
        <BOIcon>
          <BOCustomIcon name="alert-octagon"/>
        </BOIcon>
        <BoName>Rota interditada</BoName>
      </ChooseContainer>

      <ChooseContainer onPress={ () => HandleGerarIdBoletim(6,{screenName: "B.O.", props:{nome: 'B.O ROTA PASSEATAS'}}) }>
        <BOIcon>
          <BOCustomIcon name="account-supervisor"/>
        </BOIcon>
        <BoName>Passeatas</BoName>
      </ChooseContainer>

    </BoShowcase>

  </Container>
  )
}

export default EscolherBO;