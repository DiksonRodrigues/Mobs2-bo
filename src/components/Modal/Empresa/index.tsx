import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';

import NextButton from '../../BO/NextButton';
import api from '../../../services/api';
import IconBack from 'react-native-vector-icons/MaterialCommunityIcons';

import {
    IEnterprises,
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


const Empresa: React.FC<Props> = ({setCategory,closeSelectCategory,category}) => {
    const [empresa,setEmpresa] = useState<IEnterprises[]>([])

    function updateList(searchValue) {
  
        setEmpresa(searchValue);
  
      if (searchValue) {
          const currentempresas = [...empresa];
          
          currentempresas.sort((itemA, itemB) => {
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
          setEmpresa(currentempresas);
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
                data: Array<IEnterprises>;
            };
            } = await api.get(`/boletim_ocorrencia/clients/42`);
            setEmpresa(response.data.data)
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
        placeholder="Pesquisar Empresa"
        onChangeText={(e) => updateList(e)}
      />
      <Icon name = "magnify"/>
    </InputContainer>

    <CarList
    data={empresa}
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

export default Empresa;