import React, { Component } from "react";
import {Alert, StyleSheet,Text,TouchableOpacity,ScrollView,View} from "react-native";
import { TextInput, Switch } from 'react-native-paper';
import Database from '../Database';
import TouchEncrypt from './TouchEncrypt';

const db = new Database();

export default class RegisterScreen extends Component {
	constructor(props){
		super(props);
		this.nameRef = React.createRef();
		this.usernameRef = React.createRef();
        this.state = {
			name: '',
			username: '',
			isSwitchOn: false,
			error: '',
			usernameError: false,
			navigation: this.props.navigation
		}
	}


	createUser = async() => {
		let { name, username } = this.state;

		// let passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
		let usernameRegex = /^\w[\w.]{2,18}\w$/;
		
		if (usernameRegex.test(username)){
					db.getUser().then((data) => {
						if(data.length < 4){
							db.addUser(this.state.name, this.state.username, this.state.isSwitchOn).then(() => {
								// this.setState({
								//   isLoading: true,
								//   isAuthenticated:true
								// });
							  }).catch((err) => {
								console.log(err);
								console.log("Something went wrong with the db register")
							  })
						} else {
							return Alert.alert('4 Users already created!',  'You can only have 4 at a time on device. Delete a user and create new', [
								{text: 'Ok', onPress: () => console.log('Pressed Ok')},
							  ],
							  { cancelable: true })
						}
					})
		} else {
			this.setState({username: '', usernameError: true})
			return alert('Username needs to be 4-20 characters. Cannot end with special characters. No spaces');
		}
	}

	render() {
		const { isSwitchOn } = this.state;
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

					{/* touchId */}
					<View style={styles.viewBiometrics}>
						<Text >Enable Biometrics?</Text>
						<Switch
							value={isSwitchOn} 
							onValueChange={() =>
								{ this.setState({ isSwitchOn: !isSwitchOn }); }}
							// style={styles.inputStyles}
						/>
					</View>

					<View style={{ marginHorizontal: 30, marginTop: 20 }} >
						<TouchableOpacity  onPress={() => {this.createUser(); this.state.navigation.navigate('Login')}} style={{ paddingVertical: 15, backgroundColor: '#000', paddingHorizontal: 20, borderRadius: 20 }} >
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
	viewBiometrics: {
		justifyContent: 'center', 
		alignItems: 'center', 
		marginTop: 20 
	},
	inputStyles: {
		height: 40
	},
});