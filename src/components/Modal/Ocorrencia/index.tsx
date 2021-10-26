import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import api from '../../../services/api';
import IconBack from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../../hooks/auth'

import {
  ITypes,
} from '../../../services/interfaces';

import { 
Container,
InputContainer,
InputSearch,
Icon,
Footer,
CarList,
CarContainer,
CarContainerText
} from './styles';
import SelectButton from '../../BO/SelectButton';

interface Descricao {
  id: number;
  desc: string;
}

interface Props {
  category: Descricao
  setCategory: (descricao: Descricao) => void;
  closeSelectCategory: () => void;
}


const Ocorrencia: React.FC<Props> = ({setCategory,closeSelectCategory,category}) => {
    const [ocorrencia,setOcorrencia] = useState<ITypes[]>([])
    const {user} = useAuth();

    function updateList(searchValue) {
  
        setOcorrencia(searchValue);
  
      if (searchValue) {
          const currentmotoristas = [...ocorrencia];
          
          currentmotoristas.sort((itemA, itemB) => {
              searchValue = searchValue.toLowerCase();
              let a = itemA.desc.toLowerCase();
              let b = itemB.desc.toLowerCase();
  
              if (a.includes(searchValue) && b.includes(searchValue)) {
                  return a.indexOf(searchValue) - b.indexOf(searchValue);
              } else if (a.includes(searchValue))
                  return -1;
              else if (b.includes(searchValue))
                  return 1;
              else
                  return 0;
          });
          setOcorrencia(currentmotoristas);
        }
      }
  
      function HandleCategorySelect(category: Descricao){
        setCategory(category)
      }
  
    useEffect( ()=>{
      async function getVehicleDescription(){
        try{
        const idBoletim = await AsyncStorage.getItem('@IdBoletim');

        if ( idBoletim ) {
          console.log(" aaaaaaa " , idBoletim)
          const response: {
            data: {
              data: Array<ITypes>;
            };
          } = await api.get(`/users/${user?.id}/boletim_ocorrencia/types/42`);

          setOcorrencia(response.data.data)
        }       
        } catch(error){
          console.log(error)
        }
      }
      getVehicleDescription()
  },[])

  return (
    <Container>

    <TouchableOpacity 
    style ={{marginLeft:280}}
    onPress={closeSelectCategory}>
    <IconBack  name="close-circle-outline" size = {40} color ="#BBBBBB"/>
    </TouchableOpacity>


    <InputContainer>
      <InputSearch
        placeholder="Pesquisar Ocorrencia"
        onChangeText={(e) => updateList(e)}
      />
      <Icon name = "magnify"/>
    </InputContainer>

    <CarList
    data={ocorrencia}
    showsVerticalScrollIndicator={false}
    keyExtractor={ item => String(item.id) }
    renderItem={ ({item}) => 
    <CarContainer
    onPress={ () => HandleCategorySelect(item) }
    isActive = {category.id === item.id}>

    <CarContainerText>{item.desc}</CarContainerText>
    </CarContainer>
    }/>

    <Footer>
      <SelectButton 
      ButtonText="Selecionar"
      onPress={closeSelectCategory}/>
    </Footer>

  </Container>
  )
}

export default Ocorrencia;