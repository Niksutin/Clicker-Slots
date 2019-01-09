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
          <View style={styles.paytableSymbolsContainer}>
            <Text style={styles.paytableSymbolsText}>Symbols</Text>
            <Text style={styles.paytableText}><Image style={styles.imageSymbol} source={require('./assets/checksum.png')}/>{' = 2'}</Text>
            <Text style={styles.paytableText}><Image style={styles.imageSymbol} source={require('./assets/heart.png')}/>{' = 5'}</Text>
            <Text style={styles.paytableText}><Image style={styles.imageSymbol} source={require('./assets/lightning.png')}/>{' = 10'}</Text>
            <Text style={styles.paytableText}><Image style={styles.imageSymbol} source={require('./assets/star.png')}/>{' = 20'}</Text>
          </View>
          <View style={styles.paytableLanesContainer}>
            <Text style={styles.paytableLanesText}>Lanes</Text>
            <Image style={styles.imageLane} source={require('./assets/row0.png')}/>
            <Image style={styles.imageLane} source={require('./assets/row1.png')}/>
            <Image style={styles.imageLane} source={require('./assets/row2.png')}/>
            <Image style={styles.imageLane} source={require('./assets/diag0.png')}/>
            <Image style={styles.imageLane} source={require('./assets/diag1.png')}/>
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
    alignSelf: 'center',
    padding: 3
  },
  paytableSymbolsText: {
    alignSelf: 'center',
    fontSize: 20,
  },
  paytableLanesText: {
    alignSelf: 'center',
    fontSize: 20,
  },
  paytableLanesContainer: {
    width: 100
  },
  paytableSymbolsContainer: {
    width: 100
  },
  imageSymbol: {
    height: 20,
    width: 20,
  },
  imageLane: {
    borderWidth: 1,
    borderColor: 'white',
    alignSelf: 'center',
    borderRadius: 3,
    height: 20,
    width: 20,
    margin: 5,
  }
});