import React from 'react';
import { AsyncStorage } from 'react-native';
import Tabs from './Tabs';

export default class App extends React.Component {
  state = {
    balance: 0,
  }

  componentDidMount() {
    this.loadBalance();
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

  saveBalance = async () => {
    console.log('saveBalance was called');
    try {
      await AsyncStorage.setItem('@ClickerSlots/balance', String(this.state.balance));
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
        }}
      />
    )
  }
}