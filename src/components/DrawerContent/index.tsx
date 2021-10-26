import React from 'react';
import {
  DrawerContentComponentProps,
  DrawerItem,
} from '@react-navigation/drawer';
import { IconAwesomeCustom } from '../../util/styles/stylesSearched';

const DrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <>
      <DrawerItem
        label="NOVO B.O."
        icon={propsDrawer => (
          <IconAwesomeCustom
            name="clipboard"
            color={propsDrawer.color}
            size={propsDrawer.size}
          />
        )}
        onPress={() => {
          props.navigation.navigate('Novo B.O.');
        }}
      />
      <DrawerItem
        label="HISTÓRICO"
        icon={propsDrawer => (
          <IconAwesomeCustom
            name="list-ul"
            color={propsDrawer.color}
            size={propsDrawer.size}
          />
        )}
        onPress={() => {
          props.navigation.navigate('Histórico');
        }}
      />
      <DrawerItem
        label="SUPORTE"
        icon={propsDrawer => (
          <IconAwesomeCustom
            name="envelope"
            color={propsDrawer.color}
            size={propsDrawer.size}
          />
        )}
        onPress={() => {
          props.navigation.navigate('Suporte');
        }}
      />
    </>
  );
};

export default DrawerContent;
