import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Paytable extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.paytableContainer}>
        <Text style={styles.paytableHeader}>Paytable</Text>
        <Text style={styles.paytableText}>{'??? = 2'}</Text>
        <Text style={styles.paytableText}>{'### = 5'}</Text>
        <Text style={styles.paytableText}>{'@@@ = 20'}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  paytableContainer: {
    backgroundColor: 'lightsalmon',
    width: 250,
    color: 'white',
    padding: 10,
    marginTop: 10,
  },
  paytableHeader: {
    fontSize: 20,
    borderBottomWidth: 1,
  },
  paytableText: {
    color: 'white',
    padding: 5
  },
});