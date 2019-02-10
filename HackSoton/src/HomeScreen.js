import * as React from 'react';
import {
  View,
  Text,
  Button
} from 'react-native';

export default class HomeScreen extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      types: []
    }
  }
  async componentWillMount() {
    const response = await fetch('http://10.9.240.72:3000/types/', {
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
      <View>
        <Button
          title="View map"
          color="#CE9FFC"
          onPress={() => navigate("Map")}/>
        {
          types.map((t, key) => {
            return <Text key={key}>{t}</Text>
          })
        }
      </View>
    );
  }
}
