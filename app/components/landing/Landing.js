import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Pressable,
  StatusBar,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { Icon } from "react-native-elements";
import colors from 'styles/Colors';

export default class Landing extends React.Component {

  componentDidMount = async () => {};

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor={colors.darkgrey} /> 
        <TouchableOpacity style={styles.buttons} 
          onPress={() => this.props.navigation.navigate('Signup')}>
          <Text style={{fontSize: 14, color: colors.lightgrey}}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.buttons, {backgroundColor: colors.commonorange}]}
          onPress={() => this.props.navigation.navigate('Login')}
        >
          <Text style={{fontSize: 14}}>Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkgrey,
    alignItems: "center",
  },
  buttons: {
    borderColor: colors.commonorange,
    borderWidth: 3,
    marginTop:20,
    borderRadius: 20,
    width: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
