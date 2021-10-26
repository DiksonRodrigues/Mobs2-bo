import React, {useEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {
  ContainerIndicator,
} from '../../util/styles/stylesSearched';
import {LogBox} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {setBoletimOccurrence, RGetTypes} from '../../services/requests';
import {useAuth} from '../../hooks/auth';
import {ITypes} from '../../services/interfaces';
import FabButton from '../../components/FabButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';


import {
IconContainer,
Header,
Greeting,
SingoutButton,
SingoutButtonText,
Informations,
Historic,
Title,
NotFoundView,
MessageNotFound,
MakeCheckListButton,
Icon,

} from './styles';
import DrawerRoutes from '../../routes/drawer.routes';

const Home: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [types, setTypes] = useState<Array<{name: string; value: ITypes}>>([]);

  useEffect(() => {
    LogBox.ignoreLogs([
      'Animated: `useNativeDriver`',
      'componentWillReceiveProps',
    ]);
  }, []);

  const navigation = useNavigation();

  const {user, matricula, signOut} = useAuth();
  const [hour, setHour] = useState('');
  const time = new Date().getHours()

  useEffect(() => {
    console.log(user?.id)
    async function getItems() {
      setLoading(true);
      if (time <= 11){
        setHour('Bom dia!')
      }else if(time <= 18){
        setHour('Boa tarde!')
      }else{
        setHour('Boa noite!')
      }
      setLoading(false);
    }

    getItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? (
        <ContainerIndicator>
          <ActivityIndicator size="large" color="#0000ff" />
        </ContainerIndicator>
      ) : (
        <IconContainer>
          <Header>
          <Greeting>{hour}</Greeting>
          <SingoutButton onPress={ () => signOut() }>
            <SingoutButtonText>Sair do app</SingoutButtonText>
          </SingoutButton>
        </Header>
        
        <Informations>
          <NotFoundView>
          <MessageNotFound>Use essa tela para fazer seu B.O!</MessageNotFound>
          <LottieView
          source={require('../../util/lottie/paper.json')}
          style={{width:'90%',aspectRatio:1,}}
          autoPlay
          loop/>
          </NotFoundView>
        </Informations>

          <FabButton/>
        </IconContainer>
      )}
    </>
  );
};

export default Home;
