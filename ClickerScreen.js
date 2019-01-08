import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Animated} from 'react-native';

export default class ClickerScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pulseAnimation: new Animated.Value(1),
      currentStreak: 0,
      bestStreak: this.props.screenProps.bestStreak,
      isAddingMoney: false,
    }
  }

  componentDidMount() {
    this.props.navigation.addListener(
      'willBlur',
      payload => {
        if (this.state.currentStreak > this.state.bestStreak) {
          this.props.screenProps.setBestStreak(this.state.currentStreak);
        }
        this.props.screenProps.addMoney(this.state.currentStreak);
        this.setState({currentStreak: 0});
      }
    );
    this.props.navigation.addListener(
      'willFocus',
      payload => {
        this.setState({bestStreak: this.props.screenProps.bestStreak});
      }
    );
  }

  componentWillUnmount() {
    if (this.state.currentStreak > this.state.bestStreak) {
      this.props.screenProps.setBestStreak(this.state.currentStreak);
    }
  }
  
  onPressCoin = () => {
    this.setState({currentStreak: this.state.currentStreak + 1, isAddingMoney: true}, () => this.pulseAnimation());
  }

  pulseAnimation = () => {
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
      <View style={styles.bestStreakContainer}>
        <Text style={styles.bestStreakHeader}>Best streak</Text>
        <Text style={styles.bestStreak}>{this.state.bestStreak}</Text>
      </View>
      <View style={styles.currentStreakContainer}>
        <Text style={styles.currentStreakHeader}>Current streak</Text>
        <Animated.Text 
          style={[styles.currentStreak, {
            transform: [
              { scale: this.state.pulseAnimation }
            ] 
          }]}>{this.state.currentStreak}
        </Animated.Text>
      </View>
        <View style={styles.coin}>
          <TouchableOpacity style={styles.button} onPress={this.onPressCoin} activeOpacity={0.1}>
            <Text>Tap for credits!</Text>
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
  bestStreakContainer: {
    backgroundColor: 'lightsalmon',
    alignSelf: 'center',
    width: 200,
    padding: 10,
    borderRadius: 20,
    margin: 5,
  },
  bestStreakHeader: {
    fontSize: 20,
    borderBottomWidth: 1,
    alignSelf: 'center',
  },
  bestStreak: {
    color: 'white',
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 30,
    padding: 10,
  },
  currentStreakContainer: {
    backgroundColor: 'lightcoral',
    alignSelf: 'center',
    width: 200,
    padding: 10,
    borderRadius: 20,
    margin: 5,
  },
  currentStreakHeader: {
    fontSize: 20,
    borderBottomWidth: 1,
    alignSelf: 'center',
  },
  currentStreak: {
    color: 'white',
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 30,
    padding: 10,
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
});
