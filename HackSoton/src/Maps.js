import * as React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  Button,
  View
} from 'react-native';
import MapView, {
  Marker,
  Callout,
  Polyline,
} from 'react-native-maps';

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

export default class Maps extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      routes: [],
      destination: {lat: 0, lng: 0}
    };
    this.handlePress = this.handlePress.bind(this);
  }
  async componentDidMount() {
    const interest = this.props.navigation.getParam("type", "museum");
    const response = await fetch('http://35.246.66.42:3000/text_search/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        coords: {
          lat: LATITUDE,
          lng: LONGITUDE
        },
        interest: interest
      })
    });
    const resJson = await response.json();
    await this.setState({markers: resJson.placesArray});
  }
  async handlePress(destination) {
    const response = await fetch('http://35.246.66.42:3000/directions/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        origin: [LATITUDE, LONGITUDE],
        destination: [destination.lat, destination.lng],
        optimize: true
      })
    });
    const resJson = await response.json();
    await this.setState({
      routes: resJson.directionsArray,
      destination
    });
  }
  render() {
    const {markers, routes, destination} = this.state;
    if (routes.length > 0 && destination) {
      return (
        <MapView initialRegion={{
                  latitude: LATITUDE,
                  longitude: LONGITUDE,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                }}
                customMapStyle={mapStyles}
                showsPointsOfInterest={false}
                loadingEnabled={true}
                showsUserLocation={true}
                followsUserLocation={true}
                style={StyleSheet.absoluteFillObject}>
          {
            routes.map((r, key) => {
              return <Polyline key={key} coordinates={r.coordsArray} strokeWidth={4} strokeColor={"#CE9FFC"} geodesic/>;
            })
          }
          <Marker coordinate={{latitude: destination.lat, longitude: destination.lng}}/>
        </MapView>
      );
    } else if (markers.length > 0) {
      return (
          <MapView initialRegion={{
                    latitude: LATITUDE,
                    longitude: LONGITUDE,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                  }}
                  customMapStyle={mapStyles}
                  showsPointsOfInterest={false}
                  loadingEnabled={true}
                  showsUserLocation={true}
                  followsUserLocation={true}
                  style={StyleSheet.absoluteFillObject}>
            {
              markers.map((m, key) => {
                return (
                  <Marker key={key} title={m.name} coordinate={{latitude: m.location.lat, longitude: m.location.lng}}>
                    <Callout tooltip={true} onPress={() => this.handlePress({lat: m.location.lat, lng: m.location.lng})}>
                      <View style={styles.tooltip}>
                        <Text style={styles.tooltipText}>{m.name}</Text>
                        <Button title={"Get Directions"} onPress={(m) => this.handlePress({lat: m.location.lat, lng: m.location.lng, name: m.name})}/>
                      </View>
                    </Callout>
                  </Marker>
                );
              })
            }
          </MapView>
      );
    } else {
      return (
        <MapView initialRegion={{
                  latitude: LATITUDE,
                  longitude: LONGITUDE,
                  latitudeDelta: LATITUDE_DELTA,
                  longitudeDelta: LONGITUDE_DELTA,
                }}
                customMapStyle={mapStyles}
                showsPointsOfInterest={false}
                loadingEnabled={true}
                showsUserLocation={true}
                followsUserLocation={true}
                style={StyleSheet.absoluteFillObject}/>
      );
    }
  }
}

const styles = StyleSheet.create({
  tooltip: {
    backgroundColor: "white",
    paddingHorizontal: 8,
    paddingVertical: 12,
    maxWidth: 175,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8
  },
  tooltipText: {
    fontFamily: "Quicksand-Bold",
    fontSize: 20,
    textAlign: 'center',
    alignSelf: "center"
  }
});

const mapStyles = [{
  featureType: "poi",
  elementType: "labels",
  stylers: [
    {visibility: "off"}
  ]
}];
