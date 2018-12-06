import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated , Dimensions} from 'react-native';

var { height } = Dimensions.get('window');

export default class ClickerScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pulseAnimation: new Animated.Value(1),
      moneyCounter: 1,
      isAddingMoney: false,
    }
  }

  onPressCoin = () => {
    this.props.screenProps.addMoney(1);
    this.setState({moneyCounter: this.state.moneyCounter + 1, isAddingMoney: true}, () => this._pulseAnimation());
  }

  _pulseAnimation = () => {
      Animated.timing(this.state.pulseAnimation, {
          toValue: 3,
          duration: 300
      }).start(() => {
        if (!this.state.isAddingMoney) {
          Animated.timing(this.state.pulseAnimation, {
            toValue: 1,
            duration: 300
          }).start();
        }
      });
    this.setState({isAddingMoney: false});
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.Text 
          style={[styles.moneyGained, {
            transform: [
              {
                scale: this.state.pulseAnimation
              }
            ] 
          }]}>{this.state.moneyCounter}
        </Animated.Text>
        <View style={styles.coin}>
          <TouchableOpacity style={styles.button} onPress={this.onPressCoin} activeOpacity={0.1}>
            <Text>Press for credits!</Text>
          </TouchableOpacity>
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
  },
  button: {
    backgroundColor: '#FFD700',
    borderWidth: 20,
    borderColor: '#FFC700',
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
    borderRadius: 100,
    padding: 10,
    margin: 10,
  },
  moneyGained: {
    padding: 20
  }
});
