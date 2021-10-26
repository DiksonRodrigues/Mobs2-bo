import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import DrawerContent from '../components/DrawerContent';

import HomeRoutes from '../routes/stack.routes';
import Historic from '../pages/Historic';
import Support from '../pages/Support';
import TopMenu from '../components/TopMenu';
import Home from '../pages/Home';

const Drawer = createDrawerNavigator();
const Tab = createMaterialTopTabNavigator();
const Bottom = createMaterialBottomTabNavigator();

const DrawerRoutes = () => (
  <>
    <Bottom.Navigator
    shifting={true}
    activeColor="#50BF82"
    inactiveColor="#C4C4C4"
    barStyle={{ backgroundColor: '#FFF', padding: 5}}>
      <Bottom.Screen 
      name="Novo B.O." 
      component={Home}
      options={{
        tabBarIcon: ({ color, focused }) => (
         <Icon name={focused ? 'home' : 'home-outline'} size={26} color={color}/>
        )
      }}/>

      <Bottom.Screen 
      name="Histórico" 
      component={Historic}
      options={{
        tabBarIcon: ({ color }) => (
         <Icon name='format-list-bulleted-square' size={26} color={color}/>
        )
      }}/>
      
      <Bottom.Screen 
      name="Suporte" 
      component={Support}
      options={{
        tabBarIcon: ({ color }) => (
         <Icon name='face-agent' size={26} color={color}/>
        )
      }}/>
    </Bottom.Navigator>
  </>
);

export default DrawerRoutes;
