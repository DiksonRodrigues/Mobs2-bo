import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  containerFull: {
    width: '90%',
    marginBottom: 20,
  },
  containerButtonStyle: {
    borderLeftWidth: 0,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderTopColor: '#000',
    borderBottomColor: '#000',
    borderRightColor: '#000',
    borderLeftColor: 'rgba(255, 255, 255,0)',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    padding: 0,
    textAlign: 'center',
    alignItems: 'center',
    width: '20%',
  },
  containerTextInfoStyle: {
    borderWidth: 2,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
  },
  containerScrollStatusStyle: {
    backgroundColor: 'transparent',
    maxHeight: 100,
    position: 'absolute',
    left: 0,
    top: 54,
    width: '100%',
    zIndex: 5,
  },
  containerTextError: {
    opacity: 0,
  },
  containerScrollStyle: {
    backgroundColor: 'transparent',
    maxHeight: 100,
    position: 'absolute',
    left: 0,
    top: 54,
    width: '100%',
    zIndex: 5,
  },
  containerInputStyle: {
    borderLeftWidth: 2,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderRightWidth: 0,
    borderTopColor: '#000',
    borderBottomColor: '#000',
    borderRightColor: 'rgba(255, 255, 255, 0)',
    borderLeftColor: '#000',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    padding: 12,
  },
});
