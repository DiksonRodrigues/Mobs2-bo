import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';

import IconBack from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../../../services/api';

import {
    ILinha,
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
  nome_fantasia: string;
}

interface Props {
  category: Descricao
  setCategory: (descricao: Descricao) => void;
  closeSelectCategory: () => void;
}


const LinhaOnibus: React.FC<Props> = ({setCategory,closeSelectCategory,category}) => {
    const [onibus,setOnibus] = useState<ILinha[]>([])

    function updateList(searchValue) {
  
        setOnibus(searchValue);
  
      if (searchValue) {
          const currentonibus = [...onibus];
          
          currentonibus.sort((itemA, itemB) => {
              searchValue = searchValue.toLowerCase();
              let a = itemA.nome_fantasia.toLowerCase();
              let b = itemB.nome_fantasia.toLowerCase();
  
              if (a.includes(searchValue) && b.includes(searchValue)) {
                  return a.indexOf(searchValue) - b.indexOf(searchValue);
              } else if (a.includes(searchValue))
                  return -1;
              else if (b.includes(searchValue))
                  return 1;
              else
                  return 0;
          });
          setOnibus(currentonibus);
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
                data: Array<ILinha>;
            };
            } = await api.get(`/linhas/42`);
          setOnibus(response.data.data)
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
        placeholder="Pesquisar Onibus"
        onChangeText={(e) => updateList(e)}
      />
      <Icon name = "magnify"/>
    </InputContainer>

    <CarList
    data={onibus}
    showsVerticalScrollIndicator={false}
    keyExtractor={ item => String(item.id) }
    renderItem={ ({item}) => 
    <CarContainer
    onPress={ () => HandleCategorySelect(item) }
    isActive = {category.id === item.id}>

    <CarContainerText>{item.nome_fantasia}</CarContainerText>
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

export default LinhaOnibus;