import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import AsyncStorage from "@react-native-community/async-storage";
import { Icon } from "react-native-elements";

export default class Dashboard extends React.Component {

  componentDidMount = async () => {};

  render() {
    return (
      <View style={styles.container}>
        <Text>This is dashboard</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center"
  }
});
