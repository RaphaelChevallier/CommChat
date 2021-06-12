import React, { Component } from 'react';
import {StyleSheet,View,Text,ScrollView,TouchableOpacity,SafeAreaView,KeyboardAvoidingView,} from 'react-native';
import { TextInput } from 'react-native-paper';
import Database from '../Database';

const db = new Database();
export default class LoginScreen extends Component {

	constructor(props) {
		super(props);
		this.emailRef = React.createRef();
		this.passwordRef = React.createRef();
		this.state = {
			userPassword: '',
			errorText: 'Error in Value',
			actualPassword: '',
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

	checkExistingUsers = () => {
    let users = [];
    db.getUser().then((data) => {
      users = data;
      return users[0]
    })
		// let passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
		// let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

		// if (emailRegex.test(this.state.userEmail)) {
		// 	if (passwordRegex.test(this.state.userPassword)) {
		// 		AsyncStorage.setItem('isAuth', 'true')

		// 		if (this.state.actualEmail === this.state.userEmail && this.state.actualPassword === this.state.userPassword ) {
		// 			return this.state.navigation.replace('MaterialBottomNavigation');
		// 		} else {
		// 			this.setState({ userEmail: '', userPassword: '', errorText: 'User not Registered' });
		// 			return alert(this.state.errorText);
		// 		}
		// 	} else {
		// 		this.setState({ userEmail: '', userPassword: '', errorText: 'Password is incorrect' });
		// 		return alert(this.state.errorText);
		// 	}
		// } else {
		// 	this.setState({ userEmail: '', userPassword: '', errorText: 'Email is incorrect' });
		// 	return alert(this.state.errorText);
		// }

 	}
	
	render(){
		const users = this.checkExistingUsers()
		return (
			<View style={{ flex: 1, backgroundColor: 'cyan', justifyContent:'center' }} >
				<ScrollView style={{ margin: 15, borderRadius: 30, backgroundColor: '#fff' }} showsVerticalScrollIndicator={false} >
					<View style={{ marginTop: 20, marginLeft: 20 }} >
						<Text style={styles.heading}>Welcome!</Text>
						<Text style={styles.heading}>Choose your profile!</Text>
					</View>


					<View style={{ marginHorizontal: 30, marginTop: 50 }} >
						<TouchableOpacity  onPress={() => this.createUser()} style={{ paddingVertical: 15, backgroundColor: '#000', paddingHorizontal: 20, borderRadius: 20 }} >
							<Text style={{ textAlign: 'center', color: '#fff' }} >
								Submit
							</Text>
						</TouchableOpacity>
					</View>

					<View style={{ marginHorizontal: 30, marginTop: 50 }} >
						<TouchableOpacity  onPress={() => this.createUser()} style={{ paddingVertical: 15, backgroundColor: '#000', paddingHorizontal: 20, borderRadius: 20 }} >
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
	// heading: {
	// 	fontSize: 30,
	// 	fontWeight: 'bold',
	// 	color: '#1B0F30',
	// 	marginLeft: 20
	// },
	// imageStruct: { 
	// 	justifyContent: 'center', 
	// 	alignItems: 'center', 
	// 	marginVertical: 20 
	// },
	// userImage: { 
	// 	height: 100, 
	// 	width: 100, 
	// 	backgroundColor: '#0bc4d9', 
	// 	borderRadius: 20,
	// 	marginBottom: 5 
	// },
	// details: {
	// 	padding: 10, 
	// },
	// viewBiometrics: {
	// 	justifyContent: 'center', 
	// 	alignItems: 'center', 
	// 	marginTop: 20 
	// },
	// inputStyles: {
	// 	height: 40
	// },
	});

	// <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }} >
	// 			<KeyboardAvoidingView style={{ flex: 1 }} >
	// 				<View style={{ flex: 1, justifyContent: 'center' }} >
	
	// 					<View style={styles.headingStyles} >
	// 						<Text style={styles.title} >Welcome Back!</Text>
	// 						<Text style={styles.subTitle} >Enter your credentials to continue</Text>
	// 					</View>
						
	// 					{/* Login Part */}
	// 					<View style={{ flex: 3 }} >
	// 						<ScrollView style={{ marginHorizontal: 20 }} showsVerticalScrollIndicator={false} >
								
	// 							{/* Email Address */}
	// 							<View>
	// 								<TextInput
	// 									mode="flat"
	// 									label="Email"
	// 									ref={this.emailRef}
	// 									value={this.state.userEmail}
	// 									style={styles.inputStyles}
	// 									onChangeText={(userEmail) => this.setState({ userEmail })}
	// 									placeholder="Enter Email" 
	// 									keyboardType="email-address"
	// 									returnKeyType="next"
	// 									onSubmitEditing={() => this.passwordRef.current.focus()}
	// 									blurOnSubmit={false}
	// 								/>
	// 							</View> 
								
	// 							{/* Password */}
	// 							<View>
	// 								<TextInput
	// 									mode="flat"
	// 									label="Password"
	// 									ref={this.passwordRef}
	// 									value={this.state.userPassword}
	// 									style={styles.inputStyles}
	// 									onChangeText={ (userPassword) => this.setState({ userPassword })}
	// 									secureTextEntry={true}
	// 									placeholder="Enter Password"
	// 									returnKeyType="done"
	// 								/>
	// 							</View>
								
	// 							{/* Login Button */}
	// 							<TouchableOpacity
	// 								style={styles.buttonStyle}
	// 								activeOpacity={0.5}
	// 								onPress={this.dataValidation}>
	// 								<Text>
	// 									Login
	// 								</Text>
	// 							</TouchableOpacity>

	// 						</ScrollView>
	// 					</View>
	
	// 					{/* Register Part */}
	// 					<View style={{ marginHorizontal: 10 }} >
	// 						<TouchableOpacity
	// 							style={styles.registerButtonStyle}
	// 							activeOpacity={0.5}
	// 							onPress={() => {
	// 								this.setState({ userEmail: '', userPassword: '', errorText: '' });
	// 								this.state.navigation.navigate('Register');
	// 							}}
	// 						>
	// 							<Text style={{ textAlign: 'center', fontWeight: 'bold' }} >
	// 								Register Now To Join The Community!
	// 							</Text>
	// 						</TouchableOpacity>
	// 					</View>
					
	// 				</View>
	// 			</KeyboardAvoidingView>

	// 		</SafeAreaView>