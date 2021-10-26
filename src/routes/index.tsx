import React from 'react';
import { ActivityIndicator } from 'react-native';

import { useAuth } from '../hooks/auth';

import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import { Container } from './styles';

const Routes: React.FC = () => {
  const { signed, loading } = useAuth();

  if (loading) {
    return (
      <Container>
        <ActivityIndicator size="large" color="#666" />
      </Container>
    );
  }

  return signed ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;
