import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Animated,
  Image
} from "react-native";

const { height, windowWidth } = Dimensions.get("window");

export default class GearsIndicator extends React.Component {
  render() {
    return (
      <View style={styles.background}>
        <Animated.Image
          style={styles.gearOne}
          source={require("../images/GearOne.png")}
        />
        <Animated.Image
          style={styles.gearTwo}
          source={require("../images/GearTwo.png")}
        />
        <Animated.Image
          style={styles.gearThree}
          source={require("../images/GearThree.png")}
        />
        <Animated.Image
          style={styles.gearFour}
          source={require("../images/GearFour.png")}
        />
        <Animated.Image
          style={styles.gearFive}
          source={require("../images/GearFive.png")}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#24589A",
    height: 130,
    alignItems: "center",
    overflow: "hidden"
  },
  gearOne: {
    position: "absolute",
    top: -35,
    left: 10
  },
  gearTwo: {
    position: "absolute",
    bottom: -25,
    left: 60
  },
  gearThree: {
    marginTop: 45
  },
  gearFour: {
    position: "absolute",
    top: -35,
    right: 80
  },
  gearFive: {
    position: "absolute",
    bottom: -25,
    right: 30
  }
});
