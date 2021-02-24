import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Login from './components/Login';
import Users from './components/Users';
import Chat from './components/Chat';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack';
import nodejs from 'nodejs-mobile-react-native';
export default class App extends React.Component {
  constructor(props){
    super(props)
    // nodejs.start('nodeFunctions.js');
  }

  render() {
    return (
      <Provider store={ store }>
        <Container />
      </Provider>
    );
  }
}

const RootStack = createStackNavigator({
  Login: {
    screen: Login
  },
  Users: {
    screen: Users
  },
  Chat: {
    screen: Chat
  }
}, {
  initialRouteName: 'Login',
  navigationOptions: {
    headerTitle: 'Chat!'
  }
});

const Container = createAppContainer(RootStack);