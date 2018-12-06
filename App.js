import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MapView } from "expo";
import _ from "lodash";
import ticketData from "./ticketData.json";

const { Marker } = MapView;

const toHex = num => {
  let hex = num.toString(16);
  if (hex.length === 1) hex = `0${hex}`;
  return hex;
};

const makers = ticketData.map((addressObj, index) => {
  const { address, ticketNumber, longitude, latitude } = addressObj;
  const ticketNumWeighted = Math.trunc(ticketNumber / 3);
  const redNumber = Math.max(Math.min(ticketNumWeighted, 255), 0);
  const greenNumber = 255 - redNumber;
  const redHex = toHex(redNumber);
  const greenHex = toHex(greenNumber);
  // console.warn('redHex', redHex, 'greenHex', )
  return (
    <Marker
      key={index}
      coordinate={{ longitude, latitude }}
      pinColor={`#${redHex}${greenHex}00`}
      title={address}
      description={`Tickets given: ${ticketNumber}`}
    />
  );
});

export default class App extends React.Component {
  state = {};

  render() {
    return (
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 49.3132578,
          longitude: -123.081004,
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
