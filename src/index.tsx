import 'react-native-gesture-handler';
import React from 'react';
import {Platform, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { ThemeProvider } from 'styled-components';

import theme from './global/styles/theme';
import Routes from './routes';
import AppProvider from './hooks';
import colors from './util/styles/colors';

const App = () => {
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
      <AppProvider>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" />}
        {Platform.OS === 'android' && (
          <StatusBar
            backgroundColor={colors.transl}
            translucent
            barStyle="dark-content"
          />
        )}
        <Routes/>
      </AppProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
};

export default App;
