import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  StatusBar
} from 'react-native';
import GestureRecognizer from 'react-native-swipe-gestures';

export default class LandingScreen extends React.Component {
  onSwipeUp() {
    this.props.navigation.navigate("Home");
  }
  render() {
    return (
      <GestureRecognizer
        onSwipeUp={() => this.onSwipeUp()}
        config={{velocityThreshold: 0.3, directionalOffsetThreshold: 80}}
        style={styles.container}>
        <StatusBar backgroundColor="#CE9FFC" barStyle="light-content" hidden={true}/>
        <View>
          <Text style={styles.welcome}>SashaMaps</Text>
        </View>
        <View>
          <Text style={styles.upArrow}>&uarr;</Text>
          <Text style={styles.arrowText}>slide up to begin</Text>
        </View>
      </GestureRecognizer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#CE9FFC',
  },
  welcome: {
    fontSize: 64,
    textAlign: 'center',
    margin: 10,
    fontFamily: 'Quicksand-Bold',
    color: 'white'
  },
  upArrow: {
    fontSize: 48,
    textAlign: 'center',
    opacity: 0.5,
    bottom: 30,
    color: 'white',
    fontFamily: 'Quicksand-Regular',
  },
  arrowText: {
    fontSize: 32,
    textAlign: 'center',
    opacity: 0.5,
    bottom: 30,
    color: 'white',
    fontFamily: 'Quicksand-Regular',
  }
});
