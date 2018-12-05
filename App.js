import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MapView } from "expo";

const { Marker } = MapView;

const coordinates = [];
for (let i = 0; i < 100; i += 1) {
  const latitude = 37.78825 + Math.random() * 0.01;
  const longitude = -122.4324 + Math.random() * 0.01;
  coordinates.push({
    latitude,
    longitude
  });
}

const makers = coordinates.map((coordinate, index) => (
  <Marker
    key={index}
    coordinate={coordinate}
    pinColor="green"
    title="title"
    description="marker.description"
  />
));

export default class App extends React.Component {
  state = {};

  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        provider="google"
      >
        {makers}
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
