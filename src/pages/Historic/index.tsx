import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {useAuth} from '../../hooks/auth';
import {IHist} from '../../services/interfaces';
import {RGetHistoric, closeBO} from '../../services/requests';
import {ScrollView} from '../../util/styles/stylesSearched';
import {
  Container,
  MarkerIndicator,
  HistoricItemsContainer,
  HistoricItemsTitle,
  HistoricItemsText,
  HistoricIconContainer,
  HistoricIcon,
  HistoricIconItemContainer,
} from './styles';

import Button from '../../components/Button';

const Historic = () => {
  const [historic, setHistoric] = useState<IHist[]>([]);
  const {user} = useAuth();

  useEffect(() => {

    async function getItems() {
      const getHistoric = await RGetHistoric(user?.id);

      setHistoric([]);
      setHistoric([...getHistoric]);
    }

    getItems();
  }, [user?.id]);

  const fecharBo = async (id:string) => {
    await closeBO(id);

    const getHistoric = await RGetHistoric(user?.id);
    setHistoric([]);
    setHistoric([...getHistoric]);
  };

  return (
    <ScrollView>
      <Container>
        {historic.map((hist, index) => {
          const [created_at] = moment(hist.created_at).format('DD/MM/YYYY hh:mm').split(' ');
          const [closed_at] = hist?.closed_at?.split(' ') || [''];
          const sumIsNumber =
            Number(hist.costs[0]) +
            Number(hist.costs[1]) +
            Number(hist.costs[2]);
          const sum = sumIsNumber.toFixed(2).toString().replace('.', ',');
          return (
            
            <HistoricIconItemContainer
              key={index}
              isFinished={hist.closed_at ? 'fechada' : 'aberta'}>
              
              <MarkerIndicator
              key={index}
              isFinished={hist.closed_at ? 'fechada' : 'aberta'}/>
              
              <HistoricItemsContainer>
                <HistoricItemsTitle>{hist.tipo}</HistoricItemsTitle>

                <HistoricItemsText>Veículo: <HistoricItemsTitle>{hist.veiculo}</HistoricItemsTitle>  </HistoricItemsText>

                <HistoricItemsText>Motorista: {hist?.driver?.name} </HistoricItemsText>

                <HistoricItemsText>Cliente: <HistoricItemsTitle>{hist.cliente}</HistoricItemsTitle></HistoricItemsText>

                <HistoricItemsText>Obra: <HistoricItemsTitle> {hist?.obra?.nome} </HistoricItemsTitle></HistoricItemsText>

                <HistoricItemsText>
                  Data de Abertura: <HistoricItemsTitle>{created_at}</HistoricItemsTitle>
                </HistoricItemsText>
                {hist.closed_at && (
                  <HistoricItemsText>
                    Data de Fechamento: <HistoricItemsTitle>{closed_at}</HistoricItemsTitle>
                  </HistoricItemsText>
                )}
                <HistoricItemsText>Valor total: <HistoricItemsTitle>R$ {sum} </HistoricItemsTitle></HistoricItemsText>
                {!hist.closed_at && (
                  <Button
                  label="Fechar B.O"
                  onPress={() => fecharBo(hist.id) }/>
                )}
              </HistoricItemsContainer>
              <HistoricIconContainer>
                <HistoricIcon name="cog" size={30} color="#BBBBBB" />
              </HistoricIconContainer>
            </HistoricIconItemContainer>
          );
        })}
      </Container>
    </ScrollView>
  );
};

export default Historic;
