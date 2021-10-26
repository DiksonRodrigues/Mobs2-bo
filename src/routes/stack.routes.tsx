import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import DrawerRoutes from './drawer.routes';

import Home from '../pages/Home';
import BO from '../pages/BO';
import BoDescription from '../pages/boDescription';
import BoPhoto from '../pages/boPhoto';
import MedidasTomadas from '../pages/medidasTomadas';
import BoCustos from '../pages/boCustos';
import BoFechamento from '../pages/BoFechamento';
import boTerceiro from '../pages/boTerceiro';
import CaracteristicasVia from '../pages/CaracteristicasVia';
import CaracteristicasGerais from '../pages/CaracteristicasGerais';
import Testemunhas from '../pages/Testemunhas';
import FotoTestemunhas from '../pages/FotoTestemunhas';
import FotoAcidente from '../pages/FotoAcidente';
import RelatoMotorista from '../pages/RelatoMotorista';
import Orçamento from '../pages/Orçamento';
import TutorialFotoCNH from '../pages/TutorialFotoCNH';
import FotoCNH from '../pages/FotoCNH';
import Descricao from '../components/Modal/Descricao';
import EscolherBO from '../pages/EscolherBO';

const AuthStack = createStackNavigator();

const Routes: React.FC = () => (
  <>
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen name="Home" component={DrawerRoutes} />
      <AuthStack.Screen name="B.O." component={BO} />
      <AuthStack.Screen name="EscolherBO" component={EscolherBO} />
      <AuthStack.Screen name="Description" component={BoDescription} />
      <AuthStack.Screen name="Photo" component={BoPhoto} />
      <AuthStack.Screen name="MedidasTomadas" component={MedidasTomadas} />
      <AuthStack.Screen name="Custos" component={BoCustos} />
      <AuthStack.Screen name="Fechamento" component={BoFechamento} />
      <AuthStack.Screen name="boTerceiro" component={boTerceiro} />
      <AuthStack.Screen name="CaracteristicasVia" component={CaracteristicasVia} />
      <AuthStack.Screen name="CaracteristicasGerais" component={CaracteristicasGerais} />
      <AuthStack.Screen name="Testemunhas" component={Testemunhas} />
      <AuthStack.Screen name="FotoTestemunhas" component={FotoTestemunhas} />
      <AuthStack.Screen name="FotoAcidente" component={FotoAcidente} />
      <AuthStack.Screen name="RelatoMotorista" component={RelatoMotorista} />
      <AuthStack.Screen name="TutorialFotoCNH" component={TutorialFotoCNH}/>
      <AuthStack.Screen name="Orçamento" component={Orçamento} />
      <AuthStack.Screen name="FotoCNH" component={FotoCNH} />
    </AuthStack.Navigator>
  </>
);

export default Routes;
