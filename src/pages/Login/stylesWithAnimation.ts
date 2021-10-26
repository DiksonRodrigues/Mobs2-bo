import { StyleSheet } from 'react-native';

import colors from '../../util/styles/colors';
import dimensions from '../../util/dimensions';

const { vh } = dimensions;

const stylesWithAnimation = StyleSheet.create({
  loginContent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    minHeight: vh / 2,
    borderRadius: 50,
    backgroundColor: colors.white,
  },
  imageContent: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    minHeight: Number(`${(vh / 2.8).toFixed(0)}`),
    margin: 0,
    borderRadius: 50,
  },
  intro: {
    color: colors.main,
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 20,
    textAlign: 'center',
    paddingHorizontal: 10,
    marginBottom: vh / 16,
  },
  input: {
    borderRadius: 25,
    width: '100%',
    height: 50,
    fontSize: 16,
    color: colors.main,
    paddingHorizontal: 20,
    textAlign: 'center',
    backgroundColor: colors.bg,
    marginBottom: 10,
  },
  buttonWrap: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  buttonEntrar: {
    width: '100%',
    height: 60,
    textAlign: 'center',
    flex: 0,
    flexGrow: 0,
    borderRadius: 30,
    backgroundColor: colors.main,
  },
  buttonEntrarTouch: {
    flex: 1,
    flexDirection: 'column',
    height: 60,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonEntrarText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#FFF',
    textTransform: 'uppercase',
  },
});

export default stylesWithAnimation;
