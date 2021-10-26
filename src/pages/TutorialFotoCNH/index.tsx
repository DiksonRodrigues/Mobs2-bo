import React, {useEffect} from 'react';
import { View, StyleSheet } from 'react-native';
import LotttieView from 'lottie-react-native';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native'
import Animated,{
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming
} from 'react-native-reanimated';
import { 
Background,
Title,
RowView,
SubTitle,
IConBox,
DicasTitle,
CameraButton,
CameraButtonText
} from './styles';

const TutorialFotoCNH: React.FC = () => {
  const navigation = useNavigation();
  const ImageAnimationPostion = useSharedValue(120);
  const ViewButtonsPosition = useSharedValue(120);

  useEffect( () =>{
  ViewButtonsPosition.value = withTiming(-40,{
    duration:550
   })
  },[])

  const ImageAnimationStyle = useAnimatedStyle(() => {
  return{
  transform: [{translateX: ImageAnimationPostion.value}],
  opacity: interpolate(
  ImageAnimationPostion.value,
  [120, 0],
  [0, 1]
  )
 }
})
  const ViewButtonsStyle = useAnimatedStyle(() => {
  return{
  transform: [{translateX: ViewButtonsPosition.value}],
  opacity: interpolate(
  ViewButtonsPosition.value,
  [120, 0],
  [0,1]
  )
 }
})
  const ViewButtonsStyleB = useAnimatedStyle(() => {
  return{
  transform: [{translateX: ViewButtonsPosition.value}],
  opacity: interpolate(
  ViewButtonsPosition.value,
  [120, 0],
  [0,1]
  )
 }
})
  const ViewButtonsStyleC = useAnimatedStyle(() => {
  return{
  transform: [{translateX: ViewButtonsPosition.value}],
  opacity: interpolate(
  ViewButtonsPosition.value,
  [120, 0],
  [0,1]
  )
 }
})

  return (
  <Background>
  <Title>(Enviar a foto é obrigatório!)</Title>
  <Title>Dicas para fazer uma boa foto:</Title>
  <SubTitle>Tire uma foto do motorista ao lado da sua CNH.</SubTitle>

  <LotttieView
  source={require('../../util/lottie/documentPhoto.json')}
  style={{width:'60%', aspectRatio:1}}
  autoPlay
  loop/>

  <Animated.View style={[styles.RowView, ViewButtonsStyleC]}>
  <IConBox>
   <IconAwesome name="mobile" size={40} color="#FFF"/>
  </IConBox>
  <DicasTitle>{`Cuidado com reflexos, \ntire uma foto na sombra.`}</DicasTitle>
  </Animated.View>

  <Animated.View style={[styles.RowView, ViewButtonsStyleB]}>
  <IConBox>
   <IconAwesome name="image" size={30} color="#FFF"/>
  </IConBox>
  <DicasTitle>{`Certifique que os dados \nestão legiveis.`}</DicasTitle>
  </Animated.View>

  <Animated.View style={[styles.RowView, ViewButtonsStyle]}>
  <IConBox>
   <IconAwesome name="check" size={30} color="#FFF"/>
  </IConBox>
  <DicasTitle>{`Verifique se o motorista \nestá visivel!`}</DicasTitle>
  </Animated.View>
  
  <CameraButton onPress={ () => navigation.navigate('FotoCNH') }>
    <CameraButtonText>ENTENDI</CameraButtonText>
  </CameraButton>
  </Background>
  )
}
const styles = StyleSheet.create({
RowView:{
alignItems:'center',
flexDirection:'row',
marginBottom:10
}
})

export default TutorialFotoCNH;