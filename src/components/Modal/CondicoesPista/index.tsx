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

const CondicoesPista: React.FC<Props> = ({setCategory,closeSelectCategory,category}) => {
    const [condicoesPista,setCondicoesPista] = useState([
    {id: '1', nome: 'Pista estreita'},
    {id: '2', nome: 'Depressão'},
    {id: '3', nome: 'Chuva'},
    {id: '4', nome: 'Curva fechada'},
    {id: '5', nome: 'Buraco'},
    {id: '6', nome: 'Chuvisco'},
    {id: '7', nome: 'Valeta'},
    {id: '8', nome: 'Lombada'},
    {id: '9', nome: 'Outro'},
    ])

    function HandleCategorySelect(category: Descricao){
        setCategory(category)
      }

  return (
    <Container>
    <CarList
    data={condicoesPista}
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

export default CondicoesPista;