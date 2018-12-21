import React from 'react';
import { StyleSheet, Text, View, Alert, Animated } from 'react-native';
import Paytable from './Paytable';
import Symbol from './Symbol';
import MySlider from './MySlider';

export default class SlotMachineScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latestPrize: 0,
      slots: [
        [{sym: 1, hl: false}, {sym: 1, hl: false}, {sym: 1, hl: false}], [{sym: 2, hl: false}, {sym: 2, hl: false}, {sym: 2, hl: false}], [{sym: 3, hl: false}, {sym: 3, hl: false}, {sym: 3, hl: false}]
      ],
      pulseAnimation: new Animated.Value(1),
    }
  }

  pulseAnimation = () => {
    Animated.timing(this.state.pulseAnimation, {
        toValue: 3,
        duration: 150
    }).start(() => {
      Animated.timing(this.state.pulseAnimation, {
        toValue: 1,
        duration: 150
      }).start();
    });
  }

  componentDidMount() {
    this.randomizeIcons();
  }

  playSlots = () => {
    console.log('Game was activated!');
    if (this.props.screenProps.balance > 0) {
      this.randomizeIcons();
      this.props.screenProps.reduceMoney(1)
      this.checkIfPrize();
    } else {
      Alert.alert(
        'Not enough credits!',
        'You must play clicker minigame for more credits.',
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') },
        ],
        { cancelable: true }
      )
    }
  }

  randomizeIcons = () => {
    newSlots = this.state.slots;
    for (let i = 0; i < newSlots.length; i++) {
      let currentRow = newSlots[i];
      for (let j = 0; j < currentRow.length; j++) {
        let rand = Math.random();
        if (rand < 0.6) {
          currentRow[j].sym = 1
          currentRow[j].hl = false;
        } else if (rand < 0.7) {
          currentRow[j].sym = 3
          currentRow[j].hl = false;
        } else {
          currentRow[j].sym = 2
          currentRow[j].hl = false;
        }
      }
      newSlots[i] = currentRow;
    }
    this.setState({slots: newSlots});
  }

  prizeAmount = (which) => {
    if (which == 1) {
      return prizeMoney = 2
    } else if (which == 2) {
      return prizeMoney = 5
    } else {
      return prizeMoney = 20
    }
  }

  checkIfPrize = () => {
    let array = this.state.slots;
    let prizeMoney = 0;
    console.log(array);
    if (array[0][0].sym === array[0][1].sym && array[0][0].sym === array[0][2].sym) {
      prizeMoney = prizeMoney + this.prizeAmount(array[0][0].sym);
      array[0][0].hl = true;
      array[0][1].hl = true;
      array[0][2].hl = true;
    }
    if (array[1][0].sym === array[1][1].sym && array[1][0].sym === array[1][2].sym) {
      prizeMoney = prizeMoney + this.prizeAmount(array[1][0].sym);
      array[1][0].hl = true;
      array[1][1].hl = true;
      array[1][2].hl = true;
    }
    if (array[2][0].sym === array[2][1].sym && array[2][0].sym === array[2][2].sym) {
      prizeMoney = prizeMoney + this.prizeAmount(array[2][0].sym);
      array[2][0].hl = true;
      array[2][1].hl = true;
      array[2][2].hl = true;
    }
    if (array[0][0].sym === array[1][1].sym && array[0][0].sym === array[2][2].sym) {
      prizeMoney = prizeMoney + this.prizeAmount(array[0][0].sym);
      array[0][0].hl = true;
      array[1][1].hl = true;
      array[2][2].hl = true;
    }
    if (array[2][0].sym === array[1][1].sym && array[2][0].sym === array[0][2].sym) {
      prizeMoney = prizeMoney + this.prizeAmount(array[2][0].sym);
      array[2][0].hl = true;
      array[1][1].hl = true;
      array[0][2].hl = true;
    }
    this.setState({slots: array});
    this.pulseAnimation();
    this.setState({latestPrize: prizeMoney});
    this.props.screenProps.addMoney(prizeMoney);
  }

  showWinAlert(amount) {
    Alert.alert(
      'You won a prize!',
      'You won ' + amount + ' credits.',
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: true }
    );
  }

  renderSymbols = (row) => {
    let symbolArray = [];
    row.forEach(element => {
      if (element.sym == 1) {
        symbolArray.push(<Symbol key={Math.random()} image={require('./assets/coin1.png')} value={2} highlighted={element.hl}></Symbol>);
      } else if (element.sym == 2) {
        symbolArray.push(<Symbol key={Math.random()} image={require('./assets/coin2.png')} value={5} highlighted={element.hl}></Symbol>);
      } else {
        symbolArray.push(<Symbol key={Math.random()} image={require('./assets/coin3.png')} value={20} highlighted={element.hl}></Symbol>);
      }
    });
    return symbolArray;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to Clicker Slots!</Text>
        <Paytable/>
        <View style={styles.stats}>
        <View style={styles.statsLatestPrize}>
          <Text>Latest prize: </Text>
          <Animated.Text 
          style={[styles.latestPrize, {
            transform: [
              { scale: this.state.pulseAnimation }
            ]}
          ]}>{this.state.latestPrize}</Animated.Text>
        </View>
        <Text>Balance: <Text style={styles.balance}>{this.props.screenProps.balance}</Text></Text>
        </View>
        <View style={styles.slotsBackground}>
          <View style={styles.row}>
            {this.renderSymbols(this.state.slots[0])}
          </View>
          <View style={styles.row}>
            {this.renderSymbols(this.state.slots[1])}
          </View>
          <View style={styles.row}>
            {this.renderSymbols(this.state.slots[2])}
          </View>
        </View>
        <MySlider onMaxValueReached={this.playSlots}></MySlider>
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
    marginTop: 10,
    borderRadius: 20,
  },
  statsLatestPrize: {
    flexDirection: 'row',
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
  row: {
    flexDirection: 'row',
    margin: 10,
    padding: 5,
  },
  slotsBackground: {
    backgroundColor: '#9ca9b7',
    margin: 10,
    borderRadius: 20,
  }
});
