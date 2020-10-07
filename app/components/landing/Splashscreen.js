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
import { createStackNavigator } from '@react-navigation/stack';
import Signup from './Signup';
import Login from './Login';
import Landing from './Landing';
import Dashboard from "../dashboard/Dashboard";
import baseurl from 'res/Baseurl';
import AuthContext from './AuthContext';

const Stack = createStackNavigator();

export default function Splashscreen({ navigation }) {

	const [state, dispatch] = React.useReducer(
		(prevState, action) => {
			switch (action.type) {
				case 'RESTORE_TOKEN':
					return {
						...prevState,
						userToken: action.token,
						isLoading: false,
					};
				case 'SIGN_IN':
					return {
						...prevState,
						isSignout: false,
						userToken: action.token,
					};
				case 'SIGN_OUT':
					return {
						...prevState,
						isSignout: true,
						userToken: null,
					};
			}
		},
		{
			isLoading: true,
			isSignout: false,
			userToken: null,
		}
	);

	React.useEffect(() => {
		const bootstrapAsync = async () => {
			let userToken;
			try {
				userToken = await AsyncStorage.getItem('userToken');
			} catch (e) {
				console.warn('asyncstorage error at 55', e)
			}

			dispatch({type: 'RESTORE_TOKEN', token: userToken})
		}
	})
  
	const authContext = React.useMemo(
		()=>({
			signIn: async data => {
				console.warn('the whole sign in logic here');
				dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
			},
			signOut: () => dispatch({ type: 'SIGN_OUT' }),
			signUp: async data => {
				console.warn('sign up dispatched', baseurl);
				console.warn('body reecived in signup', JSON.stringify(data))
				//dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token'})
			}
		}),
		[]
	)

	return(
		<AuthContext.Provider value={authContext}>
			<Stack.Navigator headerMode='none'>
				{state.userToken == null ? (
					<>
						<Stack.Screen name="Landing" component={Landing} />
						<Stack.Screen name="Login" component={Login} />
						<Stack.Screen name="Signup" component={Signup} />
					</>
				) : (
					<Stack.Screen name="Dashboard" component={Dashboard} />
				)}
			</Stack.Navigator>
		</AuthContext.Provider>
	)
}


