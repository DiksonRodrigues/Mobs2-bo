import React, {useEffect, useState, useRef} from 'react';

import {
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  View,
} from 'react-native';

import Animated, 
{ 
useAnimatedStyle, 
useSharedValue, 
withTiming,
interpolate,
Extrapolate
} from 'react-native-reanimated';

import {TextInputMask} from 'react-native-masked-text';
import animationLogin from '../../util/animation';
import LottieView from 'lottie-react-native'

import {
  Container,
  Informations,
  LogoMobs,
  SingInInformations,
  InputStyle,
  InputSenhaStyle,
  SingInInput,
  SingInButton,
  SingInButtonText,
  Icon,
  Footer,
  Copyright,
  Logo,
} from './styles';

import {useAuth} from '../../hooks/auth';

const LogIn: React.FC = () => {
  const senhaInputRef = useRef<TextInput>(null);
  const [loading, setLoading] = useState(false);
  const [matricula, setMatricula] = useState('42');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const [olho, setOlho] = useState(false);
  const [corBorder, setCorBorder] = useState(false)

  const {signIn} = useAuth();

  useEffect(() => {
    animationLogin();
  });

  async function handleSignInPress() {
    setLoading(true);
    if (cpf.length === 0 || senha.length === 0) {
      setError('Todos os campos são obrigatórios.');
      Alert.alert(error);
      console.log('Houve um problema com o login, verifique suas credenciais.');
      setLoading(false);
    } else {
      try {
        signIn({cpf: cpf, senha: senha, matricula})
          .then(e => {
            if (e === false) {
              setLoading(false);
            }
          })
          .catch(() => {
            setLoading(false);
            console.log('Houve um problema com o login, verifique suas credenciais.');
          });
      } catch (err) {
        console.log('Houve um problema com o login, verifique suas credenciais.');
        setLoading(false);
        Alert.alert(error);
      }
    }
  }

  const CpfPosition = useSharedValue(25);
  const SenhaPosition = useSharedValue(0);

  const CpfStyle = useAnimatedStyle( () =>{
  return {
    transform: [{translateY: CpfPosition.value}],
    opacity: interpolate(
    CpfPosition.value,
    [25, -25],
    [0, 1],
    Extrapolate.CLAMP
    )
  }
})

const SenhaStyle = useAnimatedStyle( () =>{
  return {
    transform: [{translateY: SenhaPosition.value}],
    opacity: interpolate(
    SenhaPosition.value,
    [-25, 1],
    [1, 0],
    Extrapolate.CLAMP
    )
  }
})

  function Focado(){
    setCorBorder(false)

    CpfPosition.value = withTiming(-25, {
    duration:200,
    })

    SenhaPosition.value = withTiming(1, {
    duration:200,
    });
  }

  function desFocado(){
    setCorBorder(true)

    CpfPosition.value = withTiming(25, {
    duration:200,
    });

    SenhaPosition.value = withTiming(-25, {
    duration:200,
    });


  }

  return (
    <Container>
    <Informations>
    <LogoMobs source={require('../../util/images/logo_MOBS.png')}/>
    </Informations>

    <SingInInformations>

      <InputStyle
      style={{borderColor: corBorder ? '#B4B4B4' : '#504F54'}}>
      <Animated.Text style={[CpfStyle, {marginLeft:10,position:'absolute'}]}>CPF</Animated.Text>

      <TextInputMask
      type={'cpf'}
      autoFocus
      autoCapitalize="none"
      numberOfLines={1}
      onFocus={ () => Focado() }
      onBlur ={ () => desFocado() }
      keyboardType={
        Platform.OS === 'ios'
          ? 'numbers-and-punctuation'
          : 'number-pad'
      }
      placeholder={ corBorder ? 'CPF' : '' }
      value={cpf}
      returnKeyType="next"
      onChangeText={setCpf}
      style={{width:'85%',fontSize:18, marginLeft:10, color:'#504F54',fontFamily:'Poppins-Regular'}}
      onSubmitEditing={() => {
        senhaInputRef.current?.focus();
      }}
      />
      </InputStyle>

      <InputSenhaStyle
      style={{borderColor: corBorder ? '#504F54' : '#B4B4B4'}}>
      <Animated.Text style={[SenhaStyle, {marginLeft:10,position:'absolute'}]}>Senha</Animated.Text>

      <SingInInput 
      placeholder={ corBorder ? '' : 'Senha' }
      value={senha}
      onChangeText={setSenha}
      secureTextEntry={olho}
      keyboardType={
        Platform.OS === 'ios'
          ? 'numbers-and-punctuation'
          : 'number-pad'
      }
      returnKeyType="go"
      autoCorrect={false}
      blurOnSubmit={true}
      />
      <TouchableOpacity onPress={ () => setOlho(!olho) }>
      <Icon 
      name = {olho? 'eye' : 'eye-closed'}
      style={{color: senha.length >= 3 ? '#504F54' : '#FFFFFF'}}/>
      </TouchableOpacity>
      </InputSenhaStyle>  

      <SingInButton 
      style={{backgroundColor: senha.length >= 3 ? '#403F98' : '#FFFFFF', borderWidth: senha.length >= 3 ? 0 : 2}}
      onPress={ () =>  handleSignInPress()}>
      {
      loading ?
      (
      <LottieView 
      source={require('../../util/lottie/loading.json')}
      style={{width:'9%', aspectRatio:1}}
      autoPlay
      loop/>
      ) :
      (
        <SingInButtonText style={{color: senha.length >= 3 ? '#FFFFFF' : '#403F98'}}>ENTRAR</SingInButtonText>
      )
      }
      </SingInButton>
    </SingInInformations>

    <Footer>
      <Copyright>DESENVOLVIDO POR</Copyright>
      <Logo source={require('../../util/images/logo_MOBS2.png')}/>
    </Footer>

  </Container>
  );
}
export default LogIn;
