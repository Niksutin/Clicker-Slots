import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default class Paytable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.paytableContainer}>
        <Text style={styles.paytableHeader}>Paytable</Text>
        <View style={styles.paytableColumnContainer}>
          <View>
            <Text style={styles.paytableSymbolsText}>Symbols</Text>
            <Text style={styles.paytableText}><Image style={styles.image} source={require('./assets/coin1.png')}/>{' = 2'}</Text>
            <Text style={styles.paytableText}><Image style={styles.image} source={require('./assets/coin2.png')}/>{' = 5'}</Text>
            <Text style={styles.paytableText}><Image style={styles.image} source={require('./assets/coin3.png')}/>{' = 20'}</Text>
            <Text style={styles.paytableText}><Image style={styles.image} source={require('./assets/coin3.png')}/>{' = 20'}</Text>
          </View>
          <View>
            <Text style={styles.paytableLanesText}>Lanes</Text>
            <Text style={styles.paytableText}><Image style={styles.image} source={require('./assets/coin1.png')}/>{' x3'}</Text>
            <Text style={styles.paytableText}><Image style={styles.image} source={require('./assets/coin2.png')}/>{' x3'}</Text>
            <Text style={styles.paytableText}><Image style={styles.image} source={require('./assets/coin3.png')}/>{' x3'}</Text>
            <Text style={styles.paytableText}><Image style={styles.image} source={require('./assets/coin3.png')}/>{' x3'}</Text>
            <Text style={styles.paytableText}><Image style={styles.image} source={require('./assets/coin3.png')}/>{' x3'}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  paytableContainer: {
    backgroundColor: 'lightsalmon',
    alignSelf: 'stretch',
    color: 'white',
    padding: 10,
    borderRadius: 20,
  },
  paytableColumnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 40,
    marginRight: 40,
  },
  paytableHeader: {
    fontSize: 30,
    borderBottomWidth: 1,
    alignSelf: 'center'
  },
  paytableText: {
    color: 'white',
    padding: 5
  },
  paytableSymbolsText: {
    borderBottomWidth: 1,
    alignSelf: 'center',
    fontSize: 20,
  },
  paytableLanesText: {
    borderBottomWidth: 1,
    alignSelf: 'center',
    fontSize: 20,
  },
  image: {
    height: 20,
    width: 20,
  }
});