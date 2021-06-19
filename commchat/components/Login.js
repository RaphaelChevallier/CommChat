import React, { Component } from 'react';
import {StyleSheet,View,Text,ScrollView,TouchableOpacity,SafeAreaView,KeyboardAvoidingView,} from 'react-native';
import { TextInput } from 'react-native-paper';
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio';
import Database from '../Database';

const db = new Database();
export default class LoginScreen extends Component {

	constructor(props) {
		super(props);
		this.emailRef = React.createRef();
		this.passwordRef = React.createRef();
		this.state = {
			errorText: 'Error in Value',
			user: null,
			navigation: this.props.navigation
		}
	}

	componentDidMount = async() => {
		// await AsyncStorage.getItem('userEmail')
		// 	.then((value) => this.setState({ actualEmail: value }));
		// await AsyncStorage.getItem('userPassword')
		// 	.then((value) => this.setState({ actualPassword: value }));

		// alert(this.state.actualEmail + ", " + this.state.actualPassword)
	}
	
	render(){
		return (
			<View style={{ flex: 1, backgroundColor: 'cyan', justifyContent:'center' }} >
				<ScrollView style={{ margin: 15, borderRadius: 30, backgroundColor: '#fff' }} showsVerticalScrollIndicator={false} >
					<View style={{ marginTop: 20, marginLeft: 20 }} >
						<Text style={styles.heading}>Welcome!</Text>
						<Text style={styles.heading}>Log into your profile!</Text>
					</View>


					<View style={{ marginHorizontal: 30, marginTop: 50 }} >
						<TouchableOpacity  onPress={() => this.createUser()} style={{ paddingVertical: 15, backgroundColor: '#000', paddingHorizontal: 20, borderRadius: 20 }} >
							<Text style={{ textAlign: 'center', color: '#fff' }} >
								{this.props.route.params.availableUser.userName}
							</Text>
						</TouchableOpacity>
					</View>

					<View style={{ marginHorizontal: 30, marginTop: 50 }} >
						<TouchableOpacity  onPress={() => {this.state.navigation.navigate('Register');}} style={{ paddingVertical: 15, backgroundColor: '#000', paddingHorizontal: 20, borderRadius: 20 }} >
							<Text style={{ textAlign: 'center', color: '#fff' }} >
								Create new User Profile
							</Text>
						</TouchableOpacity>
					</View>
			
				</ScrollView>
			</View>
		
		);
	}
};

	const styles = StyleSheet.create({
		heading: {
			fontSize: 30,
			fontWeight: 'bold',
			color: '#1B0F30',
			marginLeft: 20
		},
		imageStruct: { 
			justifyContent: 'center', 
			alignItems: 'center', 
			marginVertical: 20 
		},
		userImage: { 
			height: 100, 
			width: 100, 
			backgroundColor: '#0bc4d9', 
			borderRadius: 20,
			marginBottom: 5 
		},
		details: {
			padding: 10, 
		},
		viewBiometrics: {
			justifyContent: 'center', 
			alignItems: 'center', 
			marginTop: 30 
		},
		inputStyles: {
			height: 40
		},
	});