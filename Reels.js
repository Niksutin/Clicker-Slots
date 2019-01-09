import React from 'react';
import { StyleSheet, View, Animated, ScrollView, Image, Easing } from 'react-native';
import Symbol from './Symbol';

const SCROLLVIEW1_REF = 'scrollview1'
const SCROLLVIEW2_REF = 'scrollview2'
const SCROLLVIEW3_REF = 'scrollview3'

export default class Reels extends React.Component {
  constructor(props) {
    super(props);
    this.animatedValue1 = new Animated.Value(0);
    this.animatedValue2 = new Animated.Value(0);
    this.animatedValue3 = new Animated.Value(0);
    this.intervalId = 'borderInterval';
    this.contentHeight = 0;

    this.state = {
      reel1: [],
      reel2: [],
      reel3: [],
      borderValue: 3,
    }
  }

  componentDidMount() {
    this.fillReels();
  }

  onStart = () => {
    this.props.reduceMoney(1);
    this.fillReels();
    this.scrollToLastItem();
  }

  fillReels = () => {
    this.setState({reel1: this.fillArray(), reel2: this.fillArray(), reel3: this.fillArray()});
    this.resetReels();
  }

  resetReels = () => {
    this.refs[SCROLLVIEW1_REF].scrollTo({x:0, y:0, animated: false})
    this.refs[SCROLLVIEW2_REF].scrollTo({x:0, y:0, animated: false})
    this.refs[SCROLLVIEW3_REF].scrollTo({x:0, y:0, animated: false})
    this.animatedValue1.setValue(0);
    this.animatedValue2.setValue(0);
    this.animatedValue3.setValue(0);
    this.setState({borderValue: 0});
    clearInterval(this.intervalId);
    this.intervalId = 'borderInterval'
  }

  fillArray = () => {
    let array = []
    let rand = Math.random() * 1;

    for (let i = 0; i < 30; i++) {
      if (rand < 0.4) {
        array.push(
          new Symbol(2, require('./assets/checksum.png'), styles.scrollItem)
        )
      } else if (rand > 0.4 && rand < 0.7) {
        array.push(
          new Symbol(5, require('./assets/heart.png'), styles.scrollItem)
        )
      } else if (rand > 0.7 && rand < 0.9) {
        array.push(
          new Symbol(10, require('./assets/lightning.png'), styles.scrollItem)
        )
      } else {
        array.push(
          new Symbol(20, require('./assets/star.png'), styles.scrollItem)
        )
      }
      rand = Math.random() * 1;
    }
    return array;
  }

  scrollToLastItem = () => {
    this.animatedListenerId1 = this.animatedValue1.addListener(
      ({value}) => {
        this.refs[SCROLLVIEW1_REF].scrollTo({x: 0, y: Math.floor(value), animated: false})
      }
    );

    this.animatedListenerId2 = this.animatedValue2.addListener(
      ({value}) => {
        this.refs[SCROLLVIEW2_REF].scrollTo({x: 0, y: Math.floor(value), animated: false})
      }
    );
    
    this.animatedListenerId3 = this.animatedValue3.addListener(
      ({value}) => {
        this.refs[SCROLLVIEW3_REF].scrollTo({x: 0, y: Math.floor(value), animated: false})
      }
    );
    Animated.parallel([
      this.scrollAnimation(this.animatedValue1, 3000),
      this.scrollAnimation(this.animatedValue2, 4000),
      this.scrollAnimation(this.animatedValue3, 5000)
    ]).start(() => {
      this.checkIfPrize();
    });
  }

  borderFlash = () => {
    this.intervalId = setInterval(() => {
      if (this.state.borderValue > 0) {
        this.setState({borderValue: 0});
      } else {
        this.setState({borderValue: 3});
      }
    }, 500)
  }

  scrollAnimation = (animValue, duration) => {
    return Animated.timing(
      animValue, {
        toValue: this.contentHeight,
        duration: duration,
        easing: Easing.linear
    });
  }

  checkIfPrize = () => {
    let prizeReel1 = this.state.reel1;
    let prizeReel2 = this.state.reel2;
    let prizeReel3 = this.state.reel3;
    let prizeMoney = 0;
    let win = false;

    if (prizeReel1[27].value === prizeReel2[27].value && prizeReel2[27].value === prizeReel3[27].value) {
      prizeMoney = prizeMoney + prizeReel1[27].value;
      prizeReel1[27].style = styles.scrollItemHighlight;
      prizeReel2[27].style = styles.scrollItemHighlight;
      prizeReel3[27].style = styles.scrollItemHighlight;
      console.log('Winnings in row 0');
      win = true;
    }
    if (prizeReel1[28].value === prizeReel2[28].value && prizeReel2[28].value === prizeReel3[28].value) {
      prizeMoney = prizeMoney + prizeReel1[28].value;
      prizeReel1[28].style = styles.scrollItemHighlight;
      prizeReel2[28].style = styles.scrollItemHighlight;
      prizeReel3[28].style = styles.scrollItemHighlight;
      console.log('Winnings in row 1');
      win = true;
    }
    if (prizeReel1[29].value === prizeReel2[29].value && prizeReel2[29].value === prizeReel3[29].value) {
      prizeMoney = prizeMoney + prizeReel1[29].value;
      prizeReel1[29].style = styles.scrollItemHighlight;
      prizeReel2[29].style = styles.scrollItemHighlight;
      prizeReel3[29].style = styles.scrollItemHighlight;
      console.log('Winnings in row 2');
      win = true;
    }
    if (prizeReel1[27].value === prizeReel2[28].value && prizeReel2[28].value === prizeReel3[29].value) {
      prizeMoney = prizeMoney + prizeReel1[27].value;
      console.log('Winnings in diag 0');
      prizeReel1[27].style = styles.scrollItemHighlight;
      prizeReel2[28].style = styles.scrollItemHighlight;
      prizeReel3[29].style = styles.scrollItemHighlight;
      win = true;
    }
    if (prizeReel1[29].value === prizeReel2[28].value && prizeReel2[28].value === prizeReel3[27].value) {
      prizeMoney = prizeMoney + prizeReel1[29].value;
      console.log('Winnings in diag 1');
      prizeReel1[29].style = styles.scrollItemHighlight;
      prizeReel2[28].style = styles.scrollItemHighlight;
      prizeReel3[27].style = styles.scrollItemHighlight;
      win = true;
    }
    
    if (!win) {
      console.log('No winnings :(');
    } else {
      this.setState({reel1: prizeReel1, reel2: prizeReel2, reel3: prizeReel3});
      this.borderFlash();
      this.props.animateStats();
      this.props.addMoney(prizeMoney);
      this.props.setLatestPrize(prizeMoney);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          scrollEventThrottle={1}
          onContentSizeChange = {(contentWidth, contentHeight) => {
            this.contentHeight = contentHeight;
          }}
          ref={SCROLLVIEW1_REF}>
          {this.state.reel1.map((symbol) => {
            return <Image 
              source={symbol.image}
              style={[symbol.style, {borderWidth: this.state.borderValue}]}
              key={Math.random()}
              symbol={symbol.value}></Image>
          })}
        </ScrollView>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          scrollEventThrottle={1}
          onContentSizeChange = {(contentWidth, contentHeight) => {
            this.contentHeight = contentHeight;
          }}
          ref={SCROLLVIEW2_REF}>
          {this.state.reel2.map((symbol) => {
            return <Image source={symbol.image}
              style={[symbol.style, {borderWidth: this.state.borderValue}]}
              key={Math.random()}
              symbol={symbol.value}></Image>
          })}
        </ScrollView>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false}
          scrollEventThrottle={1}
          onContentSizeChange = {(contentWidth, contentHeight) => {
            this.contentHeight = contentHeight;
          }}
          ref={SCROLLVIEW3_REF}>
          {this.state.reel3.map((symbol) => {
            return <Image source={symbol.image}
              style={[symbol.style, {borderWidth: this.state.borderValue}]}
              key={Math.random()}
              symbol={symbol.value}></Image>
          })}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333333',
    borderRadius: 17,
    borderWidth:10,
    borderColor: 'grey',
    flexDirection: 'row',
    height: 260,
    width: 300,
  },
  scrollView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollItem: {
    height: 80,
    width: 80,
  },
  scrollItemHighlight: {
    borderRadius: 10,
    borderColor: 'white', 
    height: 80,
    width: 80,
  },
});