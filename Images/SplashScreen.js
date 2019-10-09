
import React, { Component } from 'react';
import { View, Text, Button, Image, Dimensions, StatusBar } from 'react-native';
import IMAGES from '../Constants/Images/';
import { StackActions, NavigationActions, Header } from 'react-navigation';
import AppPreferences from '../Preferences/AppPreferences';
import PreferenceConstant from '../Preferences/PreferenceConstant';
import ConstantLib from '../Constants/ConstantLib';

const WW = Dimensions.get('window').width;
const WH = Dimensions.get('window').height;


export default class SplashScreen extends Component {
  static navigationOptions = { header: null };
  componentWillMount() {

    this.getPrefVariables();

    setTimeout(() => {
      this.startWalkthroughScreen();

    }, 2000);
  }


  render() {

    return (
      <View style={{ flex: 1, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
        {/* <StatusBar
          backgroundColor={'transparent'}
          translucent
        /> */}
        <Image style={{ flex: 1, position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, width: WW, height: WH }} source={IMAGES.splash} resizeMode={'cover'} />
      </View>
    );
  }

  startWalkthroughScreen() {
    const resetAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [
        NavigationActions.navigate({ routeName: ConstantLib.IS_LOGIN === "true" ? 'Drawer' : 'WalkThroughScreen' }),
      ]
    });

    this.props.navigation.dispatch(resetAction);

  }

  getPrefVariables() {
    AppPreferences.getItem(PreferenceConstant.SESSION_KEY)
      .then((value) => {
        ConstantLib.SESSION_KEY = value;
      })

    AppPreferences.getItem(PreferenceConstant.IS_LOGIN)
      .then((value) => {
        ConstantLib.IS_LOGIN = value;
      })
  }

}
