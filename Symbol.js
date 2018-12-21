import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default class Symbol extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      highlighted: props.highlighted
    }
  }

  render() {
    return (
      <View style={[styles.container, this.state.highlighted && styles.highlighted]}>
        <Image style={styles.image} source={this.props.image}></Image>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 5,
    paddingRight: 5,
  },
  image: {
    height: 70,
    width: 70,
  },
  highlighted: {
    backgroundColor: '#ceb55a'
  }
});