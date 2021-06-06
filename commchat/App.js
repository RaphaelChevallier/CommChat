import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Login from './components/Login';
import Users from './components/Users';
import Chat from './components/Chat';
import Register from './components/Register'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import nodejs from 'nodejs-mobile-react-native';
import SplashScreen from './components/SplashScreen';
export default class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
			isAuthenticated: false,
      isLoading: true
		}
    // nodejs.start('nodeFunctions.js');
  }

  componentDidMount() {
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
          {this.state.isLoading ? <SplashScreen/> : this.state.isAuthenticated ? <ChatStackScreen/> : <AuthStackScreen/>}
        </NavigationContainer>
      </Provider>
    );
  }
}

const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
	<AuthStack.Navigator initialRouteName="Login">
		<AuthStack.Screen
			name="Login"
			component={Login}
			options={{ headerShown: false }}
		/>
		<AuthStack.Screen
			name="Register"
			component={Register}
			options={{ headerShown: false }}
		/>
	</AuthStack.Navigator>
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