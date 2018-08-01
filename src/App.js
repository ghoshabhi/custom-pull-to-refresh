import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  Animated,
  RefreshControl,
  SafeAreaView
} from "react-native";
import { Constants } from "expo";
import uuidv1 from "uuid/v1";

import GearsIndicator from "./components/GearIndicator";

const data = Array(10)
  .fill()
  .map((_, i) => `Item #${i}`);

const MIN_PULLDOWN_DISTANCE = -100;

export default class App extends React.Component {
  state = {
    data,
    refreshing: false,
    readyToRefresh: false,
    scrollY: new Animated.Value(0)
  };

  componentDidMount() {
    this.state.scrollY.addListener(value => this.handleScroll(value));
  }

  componentWillUnmount() {
    this.state.scrollY.removeAllListeners();
  }

  handleRelease = () => {
    console.log(this.refs);
    if (this.state.readyToRefresh) {
      this.refs &&
        this.refs.flatlist &&
        this.refs.flatlist.scrollToOffset &&
        this.refs.flatlist.scrollToOffset({
          offset: -130,
          animated: true
        });
      this.setState({ refreshing: true });
      setTimeout(() => {
        this.refs &&
          this.refs.flatlist &&
          this.refs.flatlist.scrollToOffset &&
          this.refs.flatlist.scrollToOffset({
            offset: 0,
            animated: true
          });
        this.setState({ refreshing: false });
      }, 2000);
    }
    return this.setState({ readyToRefresh: false });
  };

  handleScroll = pullDownDistance => {
    console.log(pullDownDistance);
    if (pullDownDistance.value <= MIN_PULLDOWN_DISTANCE) {
      return this.setState({ readyToRefresh: true });
    }
  };

  render() {
    const animatedEvent = new Animated.event([
      {
        nativeEvent: {
          contentOffset: {
            y: this.state.scrollY
          }
        }
      }
    ]);

    const interpolatedRotateClockwise = this.state.scrollY.interpolate({
      inputRange: [-200, 0],
      outputRange: ["0deg", "360deg"]
    });

    const interpolatedRotateAntiClockwise = this.state.scrollY.interpolate({
      inputRange: [-200, 0],
      outputRange: ["0deg", "-360deg"]
    });

    return (
      <SafeAreaView style={styles.scrollView}>
        <View style={styles.topBar}>
          <Text style={styles.navText}>PTR Animation</Text>
        </View>
        <View style={[styles.fillParent]}>
          <GearsIndicator
            scrollPosition={this.state.scrollY}
            clockwiseRotation={interpolatedRotateClockwise}
            anticlockwiseRotation={interpolatedRotateAntiClockwise}
            refreshing={this.state.refreshing}
          />
        </View>
        <View style={styles.fillParent}>
          <FlatList
            data={this.state.data}
            keyExtractor={item => uuidv1()}
            ref="flatlist"
            onScroll={animatedEvent}
            scrollEventThrottle={16}
            onResponderRelease={this.handleRelease}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <Text style={styles.rowText}>{item}</Text>
              </View>
            )}
            // refreshControl={
            //   <RefreshControl
            //     refreshing={this.state.refreshing}
            //     onRefresh={this._onRefresh}
            //   >
            //     <View style={[styles.fillParent, { top: 0 }]}>
            //       <GearsIndicator />
            //     </View>
            //   </RefreshControl>
            // }
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1
  },
  fillParent: {
    backgroundColor: "transparent",
    position: "absolute",
    top: 64 + Constants.statusBarHeight,
    left: 0,
    right: 0,
    bottom: 0
  },
  topBar: {
    backgroundColor: "#F0DB4F",
    height: 64,
    justifyContent: "center",
    alignItems: "center"
  },
  row: {
    padding: 10,
    height: 70,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    marginBottom: -1,
    borderBottomColor: "#E5EDF5",
    borderTopColor: "#E5EDF5",
    borderBottomWidth: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  rowText: {
    // textAlign: "center",
    color: "#323330"
  },
  navText: {
    color: "#323330",
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center"
    // paddingTop: 30
  }
});
