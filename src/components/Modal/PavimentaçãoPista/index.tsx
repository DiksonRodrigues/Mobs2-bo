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

const PavimentaçãoPista: React.FC<Props> = ({setCategory,closeSelectCategory,category}) => {
    const [pavimentacaoPista,setPavimentacaoPista] = useState([
    {id: '1', nome: 'Asfalto'},
    {id: '2', nome: 'Terra'},
    {id: '3', nome: 'Cascalho'},
    {id: '4', nome: 'Paralelepípedo'},
    {id: '5', nome: 'Outro'},
    ])

    function HandleCategorySelect(category: Descricao){
        setCategory(category)
      }

  return (
    <Container>
    <CarList
    data={pavimentacaoPista}
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

export default PavimentaçãoPista;