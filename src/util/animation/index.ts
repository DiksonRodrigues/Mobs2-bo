import { Animated, Easing } from 'react-native';

import animateParams from './params';

const animationLogin = () => {
  setTimeout(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(animateParams.basePos, {
          toValue: 0,
          duration: 1000,
          easing: Easing.bezier(1, -0.57, 0, 1.34),
          useNativeDriver: true,
        }),
        Animated.timing(animateParams.baseOpacity, {
          toValue: 1,
          duration: 1000,
          easing: Easing.cubic,
          useNativeDriver: true,
        }),
        Animated.timing(animateParams.btPos, {
          toValue: 0,
          duration: 800,
          easing: Easing.bezier(1, -0.57, 0, 1.34),
          delay: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animateParams.btOpacity, {
          toValue: 1,
          duration: 800,
          easing: Easing.bezier(1, -0.57, 0, 1.34),
          delay: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animateParams.textOpacity, {
          toValue: 1,
          duration: 800,
          easing: Easing.cubic,
          delay: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animateParams.inputPos_1, {
          toValue: 1,
          duration: 1900,
          easing: Easing.bezier(1, -0.57, 0, 1.34),
          delay: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(animateParams.inputOpacity_1, {
          toValue: 1,
          duration: 1900,
          easing: Easing.bezier(1, -0.57, 0, 1.34),
          delay: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(animateParams.inputPos_2, {
          toValue: 1,
          duration: 1900,
          easing: Easing.bezier(1, -0.57, 0, 1.34),
          delay: 1900,
          useNativeDriver: true,
        }),
        Animated.timing(animateParams.inputOpacity_2, {
          toValue: 1,
          duration: 1900,
          easing: Easing.bezier(1, -0.57, 0, 1.34),
          delay: 1900,
          useNativeDriver: true,
        }),
        Animated.timing(animateParams.inputPos_3, {
          toValue: 1,
          duration: 1900,
          easing: Easing.bezier(1, -0.57, 0, 1.34),
          delay: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(animateParams.inputOpacity_3, {
          toValue: 1,
          duration: 1900,
          easing: Easing.bezier(1, -0.57, 0, 1.34),
          delay: 2000,
          useNativeDriver: true,
        }),
      ]),
    ]).start(() => {});
  }, 1000);
};

export default animationLogin;
