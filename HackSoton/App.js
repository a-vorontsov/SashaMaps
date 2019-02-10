import * as React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import Views from './src/Views';


export default class App extends React.Component {
  render() {
    return <Views style={styles.text}/>;
  }
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "Quicksand-Regular"
  }
});
