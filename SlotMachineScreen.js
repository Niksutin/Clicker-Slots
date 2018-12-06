import React from 'react';
import { StyleSheet, Text, View, TouchableHighlight, Alert } from 'react-native';
import Paytable from './Paytable';

export default class SlotMachineScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latestPrize: 0,
      icons: [
        '?',
        '#',
        '@',
      ]
    }
  }

  _randomizeIcons = () => {
    console.log('Play button was pressed!');
    if (this.props.screenProps.balance > 0) {
      newIcons = this.state.icons;
      for (let i = 0; i < newIcons.length; i++) {
        let rand = Math.random();
        if (rand < 0.6) {
          newIcons[i] = '?'
        } else if (rand < 0.7) {
          newIcons[i] = '@'
        } else {
          newIcons[i] = '#'
        }
      }
      this.setState({icons: newIcons});
      this.props.screenProps.reduceMoney(1)
      this._checkIfPrize();
    } else {
      Alert.alert(
        'Not enough credits!',
        'You must play clicker minigame for more credits.',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: false }
      )
    }
  }

  _checkIfPrize = () => {
    let array = this.state.icons;
    counter = 0;
    which = '';

    for (let i = 0; i <= array.length; i++) {
      for (let j = i; j <= array.length; j++) {
        if (i != j && array[i] == array[j]) {
            counter++;
            which = array[i];
        }
      }
    }

    let prizeMoney = 0
    if (counter === 3) {
      if (which == '?') {
        prizeMoney = 2
        Alert.alert(
          'You won a prize!',
          'You won 2 credits.',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false }
        );
      } else if (which == '#') {
        prizeMoney = 5
        Alert.alert(
          'You won a prize!',
          'You won 5 credits.',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false }
        );
      } else {
        prizeMoney = 20
        Alert.alert(
          'You won a prize!',
          'You won 20 credits.',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: false }
        );
      }
      this.setState({latestPrize: prizeMoney});
      this.props.screenProps.addMoney(1);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to Clicker Slots!</Text>
        <Paytable/>
        <View style={styles.stats}>
          <Text style={styles.latestPrize}>Latest prize: {this.state.latestPrize}</Text>
          <Text style={styles.balance}>Balance: {this.props.screenProps.balance}</Text>
        </View>
        <View style={styles.columnsContainer}>
          <View style={[styles.columns, styles.columnsFirst]}>
            <Text>{this.state.icons[0]}</Text>
          </View>
          <View style={[styles.columns, styles.columnsSecond]}>
            <Text>{this.state.icons[1]}</Text>
          </View>
          <View style={[styles.columns, styles.columnsThird]}>
            <Text>{this.state.icons[2]}</Text>
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
  stats: {
    flexDirection: 'row',
    backgroundColor: 'lightcoral',
    width: 250,
    padding: 10,
  },
  latestPrize: {
    color: 'white',
    justifyContent: 'flex-start',
    marginRight: 50
  },
  balance: {
    color: 'white',
    justifyContent: 'flex-end',
  },
  columnsContainer: {
    flexDirection: 'row',
    margin: 10
  },
  columns: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 70,
    width: 70,
    margin: 10,
  },
  columnsFirst: {
    backgroundColor: 'lightblue',
  },
  columnsSecond: {
    backgroundColor: 'lightpink',
  },
  columnsThird: {
    backgroundColor: 'lightgreen',
  },
  buttonPlay: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
    padding: 10,
    width: 250,
  }
});
