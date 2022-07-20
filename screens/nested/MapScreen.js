import { StyleSheet, View, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";

export function MapScreen({ route }) {
  const { location, latitude, longitude } = route.params;

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          title={location}
          coordinate={{
            latitude,
            longitude,
          }}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height - 58,
  },
});
