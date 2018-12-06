import React from 'react';
import Tabs from './Tabs';

export default class App extends React.Component {
  state = {
    balance: 0,
  }

  addMoney = (amount) => {
    let newBalance = this.state.balance + amount;
    this.setState({balance: newBalance});
    return newBalance;
  }

  reduceMoney = (amount) => {
    let newBalance = this.state.balance - amount;
    this.setState({balance: newBalance});
    return newBalance;
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