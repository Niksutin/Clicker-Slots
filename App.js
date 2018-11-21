import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icons: [
        '?',
        '#',
        '@',
      ]
    }
  }

  _randomizeIcons = () => {
    console.log('Play button was pressed!');
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to Clicker Slots!</Text>
        <View style={styles.paytable}>
          <Text>Paytable</Text>
          <Text>{'??? = 5'}</Text>
          <Text>{'### = 10'}</Text>
          <Text>{'@@@ = 20'}</Text>
        </View>
        <View style={styles.columnsContainer}>
          <View style={[styles.columnsGenera, styles.columns.first]}>
            <Text>?</Text>
          </View>
          <View style={[styles.columnsGenera, styles.columns.second]}>
            <Text>#</Text>
          </View>
          <View style={[styles.columnsGeneral, styles.columns.third]}>
            <Text>@</Text>
          </View>
        </View>
        <TouchableHighlight style={styles.buttonPlay}
          onPress={this._randomizeIcons}
          underlayColor='#999999'>
          <Text>Play</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  columnsContainer: {
    flexDirection: 'row',
    margin: 10
  },
  paytable: {
    backgroundColor: 'lightsalmon',
    width: 190,
    color: 'white',
    padding: 10,
    margin: 10,
  },
  textPlaytable: {

  },
  columnsGeneral: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 50,
      width: 50,
      margin: 10,
  },
  columns: {
    first: {
      backgroundColor: 'lightblue',
    },
    second: {
      backgroundColor: 'lightpink',
    },
    third: {
      backgroundColor: 'lightgreen',
    },
  },
  buttonPlay: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
    padding: 10,
    width: 190,
  }
});
