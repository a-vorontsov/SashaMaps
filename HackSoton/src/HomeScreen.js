import * as React from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

export default class HomeScreen extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      types: []
    }
  }
  async componentWillMount() {
    const response = await fetch('http://35.246.66.42:3000/types/', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    });
    const resJson = await response.json();
    this.setState({
      types: resJson.types
    });
  }

  render() {
    const {navigate} = this.props.navigation;
    const {types} = this.state;
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {
          types.map(t => {
            return (
              <TouchableOpacity style={styles.button} key={t.type} onPress={() => navigate("Map", {type: t.type})}>
                <Text style={styles.text}>{t.name}</Text>
              </TouchableOpacity>
            )
          })
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: "45%",
    aspectRatio: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    backgroundColor: "#EEECF6",
  },
  text: {
    fontSize: 24,
    fontFamily: "Quicksand-Regular",
    textAlign: 'center',
    alignSelf: "center"
  }
});
