import React from 'react';
import { StyleSheet, Text, View, Alert, Animated } from 'react-native';
import Reels from './Reels';

export default class SlotMachineScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  /**
   staticSymbols: [
    <Symbol key={Math.random()} image={require('./assets/coin1.png')} value={2} highlighted={false}></Symbol>,
    <Symbol key={Math.random()} image={require('./assets/coin2.png')} value={2} highlighted={false}></Symbol>,
    <Symbol key={Math.random()} image={require('./assets/coin3.png')} value={2} highlighted={false}></Symbol>
  ],
  
  generateWeighedList = (list, weight) => {
    let newList = [];
     
    for (let i = 0; i < weight.length; i++) {
        let multiples = weight[i] * 100;
         
        for (let j = 0; j < multiples; j++) {
          newList.push(list[i]);
        }
    }  
    return newList;
  }

  generateRandomSymbols = () => {
    let randNumber = this.rand(0, this.state.weightedList.length-1);
    let randomSymbols = [];
    for (let i = 0; i < this.props.size*3; i++) {
      randomSymbols.push(this.state.weightedList[randNumber])
      randNumber = this.rand(0, this.state.weightedList.length-1);
    }
    this.setState({animatedSymbols: randomSymbols});
  }
  rand = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

   */

  render() {
    return(
    <View style={styles.container}>
      <Reels/>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  }
});