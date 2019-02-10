import * as React from 'react';
import {
  Dimensions,
  StyleSheet,
} from 'react-native';
import MapView from 'react-native-maps';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width/screen.height;
const LATITUDE_DELTA = 0.015;
let LATITUDE;
let LONGITUDE;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
navigator.geolocation.getCurrentPosition((pos) => {
  LATITUDE = pos.coords.latitude,
  LONGITUDE = pos.coords.longitude
});

export default class Maps extends React.Component {
  render() {
    return (
        <MapView initialRegion={{
                  latitude: LATITUDE,
                  longitude: LONGITUDE,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                }}
                showsUserLocation={true}
                followsUserLocation={true}
                style={StyleSheet.absoluteFillObject}/>
    );
  }
}
