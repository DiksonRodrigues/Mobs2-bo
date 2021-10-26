import React from 'react';

import {
  Container,
  IconContent,
  MidContent,
  MidText,
  LogoutContent,
  LogoutText,
} from './styles';
import {IconAntDesignCustom} from '../../util/styles/stylesSearched';

import {useNavigation, DrawerActions} from '@react-navigation/native';

import {useAuth} from '../../hooks/auth';

const TopMenu = () => {
  const navigation = useNavigation();
  const {signOut} = useAuth();

  return (
    <Container>
      <IconContent>
        <IconAntDesignCustom
          name="menu-fold"
          size={22}
          color="#fff"
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        />
      </IconContent>
      <MidContent>
        <MidText>BOLETIM OCORRÊNCIA MOBS2</MidText>
      </MidContent>
      <LogoutContent
        onPress={() => { signOut() }}>
        <LogoutText>Sair</LogoutText>
      </LogoutContent>
    </Container>
  );
};

export default TopMenu;
