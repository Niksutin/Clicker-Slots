import React from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import Paytable from './Paytable';
import MySlider from './MySlider';
import Reels from './Reels';

const REELS_REF = 'reels';

export default class SlotMachineScreen extends React.Component {
  constructor(props) {
    super(props);
    this.pulseValue = new Animated.Value(1);
  }

  pulseAnimation = () => {
    Animated.timing(
      this.pulseValue, {
        toValue: 2,
        duration: 150
    }).start(() => {
      Animated.timing(
        this.pulseValue, {
          toValue: 1,
          duration: 150
      }).start();
    });
  }

  playSlots = () => {
    if (this.props.screenProps.balance > 0) {
      this.refs[REELS_REF].onStart();
    } else {
      try {
        Alert.alert(
          'Not enough credits!',
          'You must play clicker minigame for more credits.',
          [
            { text: 'OK', onPress: () => console.log('OK Pressed') },
          ],
          { cancelable: true }
        )
      } catch (error) {
        console.log(error);
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Paytable/>
        <View style={styles.statsContainer}>
          <View style={styles.latestPrizeContainer}>
            <Text style={{fontSize: 20}}>Latest prize: </Text>
            <Animated.Text
              style={[styles.latestPrize, {
                transform: [
                  { scale: this.pulseValue }
                ]}
              ]}>{this.props.screenProps.latestPrize}
            </Animated.Text>
          </View>
          <View style={styles.balanceContainer}>
            <Text style={{fontSize: 20}}>Balance: </Text>
            <Animated.Text 
              style={[styles.balance, {
                transform: [
                  { scale: this.pulseValue }
                ]}
              ]}>{this.props.screenProps.balance}</Animated.Text>
          </View>
        </View>
        <View style={styles.reelsContainer}>
          <Reels 
            ref={REELS_REF}
            animateStats={this.pulseAnimation}
            addMoney={this.props.screenProps.addMoney}
            reduceMoney={this.props.screenProps.reduceMoney}
            setLatestPrize={this.props.screenProps.setLatestPrize}
            navigation={this.props.navigation}></Reels>
          <MySlider onMaxValueReached={this.playSlots}></MySlider>
        </View>
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
    margin: 10,
  },
  reelsContainer: {
    flexDirection: 'row',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'lightcoral',
    justifyContent: 'space-between',
    width: 390,
    padding: 10,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 20,
  },
  latestPrizeContainer: {
    flexDirection: 'row',
    marginLeft: 20,
  },
  balanceContainer: {
    flexDirection: 'row',
    marginRight: 20,
  },
  latestPrize: {
    color: 'white',
    fontSize: 20,
  },
  balance: {
    color: 'white',
    fontSize: 20,
  },
});
