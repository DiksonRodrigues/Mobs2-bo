import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const AppStack = createStackNavigator();

import Drawer from './drawer.routes';
import Home from '../pages/Home';
import HomeRoutes from '../routes/stack.routes';

const Routes: React.FC = () => (
  <AppStack.Navigator
    screenOptions={{
      headerShown: false,
    }}>
    <AppStack.Screen name="Main" component={HomeRoutes} />
  </AppStack.Navigator>
);

export default Routes;
