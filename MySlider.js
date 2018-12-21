import React from 'react';
import { StyleSheet, View, Animated, PanResponder } from 'react-native';

export default class SlotMachineScreen extends React.Component {
  constructor(props) {
    super(props);
    this.position = new Animated.ValueXY()
    this.state = {
      currentIndex: 0,
      isMaxValue: false,
      isMinValue: true,
    }
  }

  onMaxValueReached = () => {
    if (this.props.onMaxValueReached != null) {
      this.props.onMaxValueReached();
    }
  }

  componentWillMount() {
    this.PanResponder = PanResponder.create({
      onStartShouldSetPanResponder: (event, gestureState) => true,
      onPanResponderMove: (event, gestureState) => {
        if (gestureState.dx >= 150 && !this.state.isMaxValue) {
          console.log('MaxValueReached');
          this.position.setValue({x: 150, y: 0});
          this.setState({isMaxValue: true, isMinValue: false}, this.onMaxValueReached());
        } else if (gestureState.dx <= 0 && !this.state.isMinValue) {
          console.log('MinValueReached');
          this.position.setValue({x: 0, y: 0});
          this.setState({isMaxValue: false, isMinValue: true});
        } else if (gestureState.dx < 150 && gestureState.dx > 0){
          this.position.setValue({x: gestureState.dx, y: 0});
          this.setState({isMaxValue: false, isMinValue: false});
        }
    },
      onPanResponderRelease: (event, gestureState) => {
        this.position.setValue({x: 0, y: 0});
      },
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View style={[{transform: this.position.getTranslateTransform()}, styles.slider]}
        {...this.PanResponder.panHandlers}>
        </Animated.View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'grey',
    width: 250,
    borderRadius: 50,
  },
  slider: {
    borderRadius: 50,
    width: 100,
    height: 50,
    backgroundColor: 'lightgrey',
  }
})
