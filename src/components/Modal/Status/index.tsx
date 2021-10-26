import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';

import NextButton from '../../BO/NextButton';
import api from '../../../services/api';
import IconBack from 'react-native-vector-icons/MaterialCommunityIcons';

import {
    IStatus,
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
  name: string;
}

interface Props {
  category: Descricao
  setCategory: (descricao: Descricao) => void;
  closeSelectCategory: () => void;
}


const Status: React.FC<Props> = ({setCategory,closeSelectCategory,category}) => {
    const [status,setStatus] = useState<IStatus[]>([])

    function updateList(searchValue) {
  
        setStatus(searchValue);
  
      if (searchValue) {
          const currentmotoristas = [...status];
          
          currentmotoristas.sort((itemA, itemB) => {
              searchValue = searchValue.toLowerCase();
              let a = itemA.name.toLowerCase();
              let b = itemB.name.toLowerCase();
  
              if (a.includes(searchValue) && b.includes(searchValue)) {
                  return a.indexOf(searchValue) - b.indexOf(searchValue);
              } else if (a.includes(searchValue))
                  return -1;
              else if (b.includes(searchValue))
                  return 1;
              else
                  return 0;
          });
          setStatus(currentmotoristas);
        }
      }
  
      function HandleCategorySelect(category: Descricao){
        setCategory(category)
      }
  
    useEffect( ()=>{
      async function getVehicledescription(){
        try{    
        const response: {
            data: {
                data: Array<IStatus>;
            };
            } = await api.get(`/boletim_ocorrencia/status/42`);
          setStatus(response.data.data)
        } catch(error){
          console.log(error)
        }
      }
      getVehicledescription()
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
        placeholder="Pesquisar Status"
        onChangeText={(e) => updateList(e)}
      />
      <Icon name = "magnify"/>
    </InputContainer>

    <CarList
    data={status}
    showsVerticalScrollIndicator={false}
    keyExtractor={ item => String(item.id) }
    renderItem={ ({item}) => 
    <CarContainer
    onPress={ () => HandleCategorySelect(item) }
    isActive = {category.id === item.id}>

    <CarContainerText>{item.name}</CarContainerText>
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

export default Status;