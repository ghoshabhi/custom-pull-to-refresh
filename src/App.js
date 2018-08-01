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

export default class App extends React.Component {
  state = {
    data,
    refreshing: false
  };

  _onRefresh = () => {
    this.setState({
      refreshing: true
    });
    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 2000);
  };

  render() {
    return (
      <SafeAreaView style={styles.scrollView}>
        <View style={styles.topBar}>
          <Text style={styles.navText}>PTR Animation</Text>
        </View>
        <View style={styles.fillParent}>
          <FlatList
            data={this.state.data}
            keyExtractor={item => uuidv1()}
            ref={"PTRFlatListView"}
            onScrollBeginDrag={props => console.log("start")}
            onScrollEndDrag={props => console.log("end")}
            renderItem={({ item }) => (
              <View style={styles.row}>
                <Text style={styles.rowText}>{item}</Text>
              </View>
            )}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              >
                <View style={[styles.fillParent, { top: 0 }]}>
                  <GearsIndicator />
                </View>
              </RefreshControl>
            }
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
