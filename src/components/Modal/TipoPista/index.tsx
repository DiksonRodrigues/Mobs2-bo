import React, { useState } from 'react';

import NextButton from '../../BO/NextButton';
import SelectButton from '../../BO/SelectButton';

import { 
Container,
Footer,
CarList,
CarContainer,
CarContainerText
} from './styles';

interface Descricao {
  id: number;
  nome: string;
}

interface Props {
  category: Descricao
  setCategory: (descricao: Descricao) => void;
  closeSelectCategory: () => void;
}

const TipoPista: React.FC<Props> = ({setCategory,closeSelectCategory,category}) => {
    const [tipoPista,setTipoPista] = useState([
    {id: '1', nome: 'Simples'},
    {id: '2', nome: 'Mão dupla'},
    {id: '3', nome: 'Mão unica'},
    {id: '4', nome: 'Cruzamento'},
    {id: '5', nome: 'Multifaixas'},
    {id: '6', nome: 'Dupla'},
    {id: '7', nome: 'Outro'},
    ])

    function HandleCategorySelect(category: Descricao){
        setCategory(category)
      }

  return (
    <Container>
    <CarList
    data={tipoPista}
    showsVerticalScrollIndicator={false}
    keyExtractor={ item => String(item.id) }
    renderItem={ ({item}) => 
    <CarContainer
    onPress={ () => HandleCategorySelect(item) }
    isActive = {category.id === item.id}>
    <CarContainerText>{item.nome}</CarContainerText>
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

export default TipoPista;