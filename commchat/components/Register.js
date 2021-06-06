import React, { Component } from "react";
import {StyleSheet,Text,TouchableOpacity,ScrollView,View} from "react-native";
import { TextInput } from 'react-native-paper';
import Database from '../Database';

const db = new Database();
export default class RegisterScreen extends Component {
	constructor(props){
		super(props);
		this.nameRef = React.createRef();
		this.usernameRef = React.createRef();
		this.passwordRef = React.createRef();
		this.confirmPasswordRef = React.createRef();
        this.state = {
			name: '',
			username: '',
			password: '',
			confirmPassword: '',
			error: '',
			passwordError: false,
			confirmPasswordError: false,
			usernameError: false,
			navigation: this.props.navigation
		}
	}

	showData = async() => {
		let { name, username, password, confirmPassword } = this.state;

		let passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
		let usernameRegex = /^\w[\w.]{2,18}\w$/;
		
		if (usernameRegex.test(username)){
			if (passwordRegex.test(password)) {
				this.setState({ passwordError: true })
				if (password === confirmPassword) {
					this.setState({ passwordError: false, confirmPasswordError: false })
					db.initDB();
					
					// await AsyncStorage.setItem('userName', name)
					// await AsyncStorage.setItem('userEmail', email)
					// await AsyncStorage.setItem('userPassword', password)
					// await AsyncStorage.setItem('userMobile', mobile)
					// await AsyncStorage.setItem('userDOB', bdate);
					// await AsyncStorage.setItem('userImage', imageURI);
					// await AsyncStorage.setItem('isAuth', 'true')
					
					return this.state.navigation;
				}
			}
			this.setState({ password: '', confirmPassword: '', passwordError: true, confirmPasswordError: true })
			return alert('Password Not Matching');
		}
		this.setState({username: '', usernameError: true})
		return alert('Username needs to be 4-20 characters. Cannot end with special characters. No spaces');
	}

	render() {
		return (
			<View style={{ flex: 1, backgroundColor: 'cyan' }} >
				<ScrollView style={{ margin: 15, borderRadius: 30, backgroundColor: '#fff' }} showsVerticalScrollIndicator={false} >
					<View style={{ marginTop: 20, marginLeft: 20 }} >
						<Text style={styles.heading}>Hello!</Text>
						<Text style={styles.heading}>Sign Up To</Text>
						<Text style={styles.heading}>Join the People's Free Chat Network!</Text>
					</View>

					{/* Name */}
					<View style={styles.details}>
						<TextInput
							mode="outlined"
							label="Name (Optional)"
							placeholder="Name" 
							returnKeyType="next"
							blurOnSubmit={false}
							ref={this.nameRef}
							value={this.state.name}
							onChangeText={ (name) => this.setState({ name })}
							style={styles.inputStyles}
						/>
					</View>

					{/* username */}
					<View style={styles.details}>
						<TextInput
							mode="outlined"
							label="Username"
							placeholder="Username" 
							returnKeyType="next"
							blurOnSubmit={false}
							error={this.state.usernameError}
							ref={this.usernameRef}
							value={this.state.username}
							onChangeText={ (username) => this.setState({ username })}
							style={styles.inputStyles}
						/>
					</View>

					{/* Password */}
					<View style={styles.details}>
						<TextInput
							mode="outlined"
							label="Password"
							placeholder="Password"
							returnKeyType="next"
							blurOnSubmit={false}
							error={this.state.passwordError}
							ref={this.passwordRef}
							value={this.state.password}
							secureTextEntry={true}
							onChangeText={ (password) => this.setState({ password })} 
							onSubmitEditing={() => this.confirmPasswordRef.current.focus()}
							style={styles.inputStyles}
						/>
					</View>

					{/* Confirm Password */}
					<View style={styles.details}>
						<TextInput
							mode="outlined"
							label="Confirm Password"
							placeholder="Confirm Password"
							returnKeyType="next"
							blurOnSubmit={false}
							error={this.state.confirmPasswordError}
							ref={this.confirmPasswordRef}
							value={this.state.confirmPassword}
							secureTextEntry={true}
							onChangeText={ (confirmPassword) => this.setState({ confirmPassword })} 
							onSubmitEditing={() => this.mobileRef.current.focus()}
							style={styles.inputStyles}
						/>
					</View>

					<View style={{ marginHorizontal: 30, marginTop: 20 }} >
						<TouchableOpacity  onPress={() => this.showData()} style={{ paddingVertical: 15, backgroundColor: '#000', paddingHorizontal: 20, borderRadius: 20 }} >
							<Text style={{ textAlign: 'center', color: '#fff' }} >
								Submit
							</Text>
						</TouchableOpacity>
					</View>
			
				</ScrollView>
			</View>
		);
	}
}

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
	inputStyles: {
		height: 40
	},
});