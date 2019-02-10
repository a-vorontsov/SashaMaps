import {createStackNavigator, createAppContainer} from 'react-navigation';
import Maps from './Maps';
import HomeScreen from './HomeScreen';
import LandingScreen from './Landing';

const MainNavigator = createStackNavigator(
  {
    Landing: {screen: LandingScreen},
    Home: {screen: HomeScreen},
    Map: {screen: Maps}
  },
  {
    initialRouteName: "Landing",
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
  }
);

const Views = createAppContainer(MainNavigator);

export default Views;
