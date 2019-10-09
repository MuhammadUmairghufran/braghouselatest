import React, { Component } from 'react';
import Router from './router';
import FlashMessage from "react-native-flash-message";
import stripe from 'tipsi-stripe';
import { Root } from "native-base";
import { StatusBar, Platform } from 'react-native';
import WSManager from './Networking/WSManager';
import KeyboardManager from 'react-native-keyboard-manager';
import * as firebase from 'firebase'
//import Firebase from 'firebase';
if(__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

Platform.OS == 'ios' ? KeyboardManager.setToolbarPreviousNextButtonEnable(true) : '';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
    }

  
  }

  componentDidMount()
  {
    
    // StatusBar.setHidden(true)
    // StatusBar.setBackgroundColor()
    // StatusBar.setBarStyle("light-content", true)
    // StatusBar.setTranslucent(true)
  }
  
  render() {
    return (

      <Router ref={navigatorRef => {
        WSManager.setTopLevelNavigator(navigatorRef);
      }} />

    );
  }
}

console.disableYellowBox = true;

export default App;
