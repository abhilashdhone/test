import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-community/async-storage';
import {Icon} from 'react-native-elements';
import colors from 'styles/Colors';
import baseurl from 'res/Baseurl';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.input_1 = React.createRef();
    this.input_2 = React.createRef();
    this.state = {
      togglepanel: false,

      email: null,
      password: null,
    };
  }

  componentDidMount = async () => {};

  togglePanel = () => {
    this.setState({togglepanel: !this.state.togglepanel});
  };

  submitForm = () => {
    const {email, password} = this.state;
    const url = `${baseurl}users/sign-in`;
    let body = {
      password: password,
      email: email,
    };
    console.warn('submit for clicked', JSON.stringify(body));
    // signUp(body);

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data"
      },
      body: body
    })
    .then(res => {console.warn('this is reponse',res); return res.json()})
    .then(resjson => {console.warn(resjson)})
    .catch(e => console.warn(e))
  };

  render() {
    const {togglepanel} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.contOne}>
          <View style={styles.header}>
            <View style={{width: wp('82%'), paddingLeft: wp('10%')}}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>APICEM</Text>
            </View>
            <TouchableOpacity
              style={{width: wp('18%')}}
              onPress={() => this.togglePanel()}>
              <Icon name="menu" type="feather" color="green" size={30} />
            </TouchableOpacity>
          </View>
          {togglepanel ? (
            <View style={styles.panel}>
              <TouchableOpacity style={{marginBottom: hp('2%')}}>
                <Text style={{fontSize: 16, color: colors.lightgrey}}>
                  Careers
                </Text>
              </TouchableOpacity>
              <TouchableOpacity>
                <Text style={{fontSize: 16, color: colors.lightgrey}}>
                  Press
                </Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttons}
                onPress={() => {
                  this.setState({togglepanel: false}); 
                  this.props.navigation.navigate('Signup')}
                }>
                <Text style={{fontSize: 14, color: colors.lightgrey}}>
                  SIGN UP
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.buttons, {backgroundColor: colors.commonorange}]}>
                <Text style={{fontSize: 14}}>LOGIN</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
        <View style={[styles.contTwo, {
          height: togglepanel ? hp('62%') : hp('92%') 
        }]}>
          <ScrollView>
            <View style={styles.contThree}>
              <Text style={styles.titleOne}>LOGIN</Text>
              <View style={styles.contFour}>
                <Text style={styles.titleTwo}>Email</Text>
                <TextInput
                  style={styles.textinput}
                  placeholder="Email ID"
                  ref={this.input_1}
                  value={this.state.email}
                  placeholderTextColor={colors.lightgrey}
                  onChangeText={(text) =>
                    this.setState({email: text.replace(/\s/g, '')})
                  }
                  onSubmitEditing={() => this.input_2.current.focus()}
                />
              </View>
              <View style={styles.contFour}>
                <Text style={styles.titleTwo}>Password</Text>
                <TextInput
                  style={[styles.textinput, {marginBottom: hp('1%')}]}
                  placeholder="Password"
                  ref={this.input_2}
                  value={this.state.password}
                  placeholderTextColor={colors.lightgrey}
                  onChangeText={(text) =>
                    this.setState({password: text.replace(/\s/g, '')})
                  }
                  onSubmitEditing={() => this.submitForm()}
                />
              </View>
              <TouchableOpacity
                style={[styles.contFour, {flexDirection: 'row-reverse'}]}>
                <Text style={styles.titleTwo}>Forgot Password?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.submitForm()}
                style={[styles.buttonsTwo, {backgroundColor: colors.commonorange}]}>
                <Text style={{fontSize: 14}}>LOGIN</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contOne: {
    backgroundColor: colors.darkgrey,
    width: wp('100%'),
  },
  contTwo: {backgroundColor: colors.bluegrey, height: hp('92%')},
  contThree: {
    backgroundColor: colors.darkgrey,
    marginHorizontal: wp('10%'),
    marginTop: hp('10%'),
    padding: wp('5%'),
    borderRadius: 5,
    alignItems: 'center',
  },
  contFour: {flexDirection: 'column', width: wp('65%')},
  titleOne: {
    fontSize: 20,
    color: colors.lightgrey,
    marginTop: hp('5%'),
    marginBottom: hp('3%'),
  },
  titleTwo: {
    color: colors.commonorange,
    fontSize: 16,
    marginBottom: hp('1%'),
  },
  textinput: {
    borderWidth: 1,
    borderColor: colors.greyfour,
    borderRadius: 50,
    paddingLeft: wp('5%'),
    color: colors.lightgrey,
    marginBottom: hp('3%'),
  },
  buttons: {
    borderColor: colors.commonorange,
    borderWidth: 3,
    marginTop: 20,
    borderRadius: 20,
    width: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsTwo: {
    borderColor: colors.commonorange,
    borderWidth: 3,
    marginTop: hp('4%'),
    marginBottom: hp('4%'),
    borderRadius: 20,
    width: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  panel: {
    height: hp('30%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    height: hp('8%'),
    alignItems: 'center',
  },
});
