import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
  input: {
    marginTop: 20,
    borderRadius: 25,
    fontSize: 16,
    color: '#FFF',
    paddingHorizontal: 20,
    textAlign: 'center',
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  autocomplete: {
    width: 300,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    backgroundColor: '#0000',
  },
  options_autocomplete: {
    borderRadius: 5,
    borderWidth: 1.0,
    backgroundColor: '#0000',
    height: Dimensions.get('screen').height / 4,
  },
  listAutocompleteStyle: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
});
