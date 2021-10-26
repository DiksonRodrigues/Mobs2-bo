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

const AlinhamentoPista: React.FC<Props> = ({setCategory,closeSelectCategory,category}) => {
    const [alinhamentoPista,setAlinhamentoPista] = useState([
    {id: '1', nome: 'Plano'},
    {id: '2', nome: 'Subida'},
    {id: '3', nome: 'Descida'},
    {id: '4', nome: 'Outro'},
    ])

    function HandleCategorySelect(category: Descricao){
        setCategory(category)
      }

  return (
    <Container>
    <CarList
    data={alinhamentoPista}
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

export default AlinhamentoPista;