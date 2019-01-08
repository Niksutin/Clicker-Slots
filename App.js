import React from 'react';
import { AsyncStorage } from 'react-native';
import Tabs from './Tabs';

export default class App extends React.Component {
  state = {
    balance: 0,
    latestPrize: 0,
    bestStreak: 0,
  }

  componentDidMount() {
    this.loadBalance();
    this.loadLatestPrize();
    this.loadBestStreak();
  }

  addMoney = (amount) => {
    let newBalance = this.state.balance + amount;
    this.setState({balance: newBalance}, this.saveBalance);
    return newBalance;
  }

  reduceMoney = (amount) => {
    let newBalance = this.state.balance - amount;
    this.setState({balance: newBalance}, this.saveBalance);
    return newBalance;
  }

  setLatestPrize = (amount) => {
    this.setState({latestPrize: amount}, this.saveLatestPrize);
    return amount;
  }

  setBestStreak = (amount) => {
    this.setState({bestStreak: amount}, this.saveBestStreak);
    return amount;
  }

  loadBalance = async () => {
    console.log('loadBalance was called');
    try {
      await AsyncStorage.getItem('@ClickerSlots/balance').then((item) => {
        if (item != null) {
          console.log('loading was successfull');
          this.setState({balance: Number(item)});
        } else {
          this.setState({balance: 0});
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  loadLatestPrize = async () => {
    console.log('loadLatestPrize was called');
    try {
      await AsyncStorage.getItem('@ClickerSlots/latestPrize').then((item) => {
        if (item != null) {
          console.log('loading was successfull');
          this.setState({latestPrize: Number(item)});
        } else {
          this.setState({latestPrize: 0});
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  loadBestStreak = async () => {
    console.log('loadBestStreak was called');
    try {
      await AsyncStorage.getItem('@ClickerSlots/bestStreak').then((item) => {
        if (item != null) {
          console.log('loading was successfull');
          this.setState({bestStreak: Number(item)});
        } else {
          this.setState({bestStreak: 0});
        }
      })
    } catch (error) {
      console.log(error);
    }
  }

  saveBalance = async () => {
    console.log('saveBalance was called');
    try {
      await AsyncStorage.setItem('@ClickerSlots/balance', String(this.state.balance));
      console.log('saving was successfull');
    } catch (error) {
      console.log(error);
    }
  }

  saveLatestPrize = async () => {
    console.log('saveLatestPrize was called');
    try {
      await AsyncStorage.setItem('@ClickerSlots/latestPrize', String(this.state.latestPrize));
      console.log('saving was successfull');
    } catch (error) {
      console.log(error);
    }
  }

  saveBestStreak = async () => {
    console.log('saveBestStreak was called');
    try {
      await AsyncStorage.setItem('@ClickerSlots/bestStreak', String(this.state.bestStreak));
      console.log('saving was successfull');
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <Tabs
        screenProps={{
          balance: this.state.balance,
          addMoney: this.addMoney,
          reduceMoney: this.reduceMoney,
          latestPrize: this.state.latestPrize,
          setLatestPrize: this.setLatestPrize,
          bestStreak: this.state.bestStreak,
          loadBestStreak: this.loadBestStreak,
          setBestStreak: this.setBestStreak,
        }}
      />
    )
  }
}