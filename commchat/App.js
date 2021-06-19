import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Login from './components/Login';
import Users from './components/Users';
import Chat from './components/Chat';
import Register from './components/Register'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Database from './Database';
import nodejs from 'nodejs-mobile-react-native';
import SplashScreen from './components/SplashScreen';

const db = new Database();
let foundUser = null;
export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
		isAuthenticated: false,
      	isLoading: true,
		user: ''
	}
	// this.user = this.state.user.bind(this);
    // nodejs.start('nodeFunctions.js');
  }

  componentDidMount() {
		let users = [];
		db.getUser().then((data) => {
		  users = data;
		  foundUser = users[0]
		  this.setState({user: users[0]})
		})
	// 	let isAuth = AsyncStorage.getItem('isAuthenticated');
	// 	this.setState({ isAuthenticated: isAuth });
		setTimeout(() => {
			this.setState({ isLoading: false });
		}, 1000)
	}

  render() {
    return (
      <Provider store={ store }>
        <NavigationContainer>
          {this.state.isLoading ? <SplashScreen/> : this.state.isAuthenticated ? <ChatStackScreen/> : this.state.user ? <LoginStackScreen/> : <RegisterStackScreen/>}
        </NavigationContainer>
      </Provider>
    );
  }
}

const RegisterStack = createStackNavigator();
const RegisterStackScreen = () => (
	<RegisterStack.Navigator initialRouteName="Register">
		<RegisterStack.Screen
			name="Register"
			component={Register}
			options={{ headerShown: false }}
		/>
	</RegisterStack.Navigator>
);

const LoginStack = createStackNavigator();
const LoginStackScreen = () => (
	<LoginStack.Navigator initialRouteName="Login">
		<LoginStack.Screen
			name="Login"
			component={Login}
			options={{ headerShown: false }}
			initialParams={{availableUser: foundUser}}
		/>
		<LoginStack.Screen
			name="Register"
			component={Register}
			options={{ headerShown: false }}
		/>
	</LoginStack.Navigator>
);

const ChatStack = createStackNavigator();
const ChatStackScreen = () => (
	<ChatStack.Navigator initialRouteName="Users">
		<ChatStack.Screen
			name="Chat"
			component={Chat}
			options={{ headerShown: false }}
		/>
		<ChatStack.Screen
			name="Users"
			component={Users}
			options={{ headerShown: false }}
		/>
	</ChatStack.Navigator>
);