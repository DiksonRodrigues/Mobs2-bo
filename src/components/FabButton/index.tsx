import React, {useState} from 'react';
import { View, StyleSheet, TouchableWithoutFeedback,} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Animated,{ 
useSharedValue,
useAnimatedStyle,
withTiming,
interpolate,
} from 'react-native-reanimated';

import IconAwesome from 'react-native-vector-icons/FontAwesome';

const FabButton: React.FC = () => {
  const navigation = useNavigation();
  const [open,setOpen] = useState(false)

  const MainButtonRotate = useSharedValue(0)
  const CarButtonPositon = useSharedValue(0);
  const CarTextPositon = useSharedValue(0);

  function openMenuButton(){
   setOpen(true)
   CarButtonPositon.value = withTiming(-60, {
    duration: 320,
   }, () => {
    MainButtonRotate.value = withTiming(45, {
    duration:80
    })
   });
   CarTextPositon.value = withTiming(-60, {
    duration:320
   })
  }

  function closeMenuButton(){
    setOpen(false)
    CarButtonPositon.value = withTiming(0, {
     duration: 320,
    }, () => {
     MainButtonRotate.value = withTiming(0, {
     duration:80
     })
    });
    CarTextPositon.value = withTiming(0, {
     duration:320
    })
  }

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${MainButtonRotate.value}deg` }],
    };
  });

  const CarButtonStyles = useAnimatedStyle(()=>{
    return {
    transform: [{translateY: CarButtonPositon.value}],
    opacity: interpolate(
    CarButtonPositon.value,
    [0, -60],
    [0,1]
    )
  };
  });

  const CarTextStyles = useAnimatedStyle(()=>{
  return{
  transform: [{translateY: CarTextPositon.value}],
  opacity: interpolate(
  CarTextPositon.value,
  [0, -60],
  [0,1]
  )
  }
  });

  return(
  <View style={styles.container}>
    <TouchableWithoutFeedback onPress={ () =>  navigation.navigate('EscolherBO')}>
      <View style={{flexDirection: 'row', alignItems:'center'}}>
      <Animated.Text style={[styles.textoanimado,CarTextStyles]}>Criar novo BO</Animated.Text>

      <Animated.View style={[styles.button, styles.menu,styles.submenu,CarButtonStyles]}> 
      <IconAwesome name="car" size={20} color="#FFF"/>
      </Animated.View>
      </View>
    </TouchableWithoutFeedback>

    <TouchableWithoutFeedback onPress={ () => open ? closeMenuButton() : openMenuButton()}>
      <Animated.View style={[styles.button, styles.menu,styles.menu,animatedStyle]}> 
      <IconAwesome name="plus" size={25} color="#FFF"/>
      </Animated.View>
    </TouchableWithoutFeedback>
  </View>
  )
}

const styles = StyleSheet.create({
container:{
alignItems:'center',
position: 'absolute',
bottom:60,
right:40
},
button:{
justifyContent: 'center',
alignItems:'center',
width: 60,
height: 60,
borderRadius: 60 / 2,
shadowRadius:10,
shadowColor: '#28273e',
shadowOpacity: 0.3,
textShadowOffset:{
height: 10
 }
},
menu:{
backgroundColor:'#403F98'
},
submenu:{
width: 55,
height: 55,
top:50,
},
textoanimado:{
right:60, 
position:'absolute',
top:70,
fontSize:16,
fontWeight:'700' 
},
})
export default FabButton;