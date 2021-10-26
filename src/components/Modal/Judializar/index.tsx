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

const Judializar: React.FC<Props> = ({setCategory,closeSelectCategory,category}) => {
    const [Judializar,setJudializar] = useState([
    {id: '1', nome: 'sim'},
    {id: '2', nome: 'não'},
    ])

    function HandleCategorySelect(category: Descricao){
        setCategory(category)
      }

  return (
    <Container>
    <CarList
    data={Judializar}
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

export default Judializar;