import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';

import NextButton from '../../BO/NextButton';
import api from '../../../services/api';
import IconBack from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  IVehicleDescription,
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
  description: string;
}

interface Props {
  category: Descricao
  setCategory: (descricao: Descricao) => void;
  closeSelectCategory: () => void;
}

const Descricao: React.FC<Props> = ({setCategory,closeSelectCategory,category}) => {
  const [cars,setCars] = useState<IVehicleDescription[]>([])

  function updateList(searchValue) {

    setCars(searchValue);

    if (searchValue) {
        const currentcars = [...cars];
        
        currentcars.sort((itemA, itemB) => {
            searchValue = searchValue.toLowerCase();
            let a = itemA.description.toLowerCase();
            let b = itemB.description.toLowerCase();

            if (a.includes(searchValue) && b.includes(searchValue)) {
                return a.indexOf(searchValue) - b.indexOf(searchValue);
            } else if (a.includes(searchValue))
                return -1;
            else if (b.includes(searchValue))
                return 1;
            else
                return 0;
        });
        setCars(currentcars);
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
            data: Array<IVehicleDescription>;
          };
        } = await api.get(`/assets?orgid=42`);

        setCars(response.data.data)
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
        placeholder="Pesquisar carro"
        onChangeText={(e) => updateList(e)}
      />
      <Icon name = "magnify"/>
    </InputContainer>

    <CarList
    data={cars}
    showsVerticalScrollIndicator={false}
    keyExtractor={ item => String(item.id) }
    renderItem={ ({item}) => 
    <CarContainer
    onPress={ () => HandleCategorySelect(item) }
    isActive = {category.id === item.id}>
    <CarContainerText>{item.description}</CarContainerText>
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

export default Descricao;