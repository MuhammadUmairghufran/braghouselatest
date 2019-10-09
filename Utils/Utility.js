import React, { Component } from 'react';
import { Toast } from 'native-base';
import { ToastAndroid, Linking, Alert } from 'react-native';
import * as String from '../Constants/Strings/';
import Moment from 'moment';
import md5 from "react-native-md5";
import { Share } from 'react-native';
import { getItem, saveItem } from '../lib/Session';
import PreferenceConstant from '../Preferences/PreferenceConstant';
import ConstantLib from '../Constants/ConstantLib/';
import { StackActions, NavigationActions } from 'react-navigation';
import WSManager from '../Networking/WSManager';

const SPORTS_ID = '5';
const LEAGUE_ID = '111';

export default class Utility extends Component {

  static showToastDialog(message) {
    Toast.show({
      text: "Wrong password!",
      buttonText: "Okay",
      position: "top"
    })
  }
  static shareTextMessage(message) {
    Share.share({
      message: message
    })
      .catch(err => console.log(err))
  }
  static openUrlInBrowser(url) {

    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        this.showLongToast(String.something_went_wrong)
      }
    });
  }

  static getFormatedDate(date, outputDateFormat) {
    var formatedDate = Moment(date).format(outputDateFormat);
    return formatedDate
  }

  static isLoggedIn() {
    getItem(PreferenceConstant.SESSION_KEY).then((value) => {
      ConstantLib.SESSION_KEY = value;
    })

    if (ConstantLib.SESSION_KEY !== null && ConstantLib.SESSION_KEY !== '') {
      return true;
    }
    else {


      Alert.alert(
        'Brag House',
        String.non_login_text,
        [
          {
            text: "Yes", onPress: () => {
              this.goToLogin(mContext)
            }
          },
          { text: "No" },
        ],
        {
          cancelable: true
        })



      return false;
    }

  }
  static checkLoggedIn() {
    getItem(PreferenceConstant.SESSION_KEY).then((value) => {
      ConstantLib.SESSION_KEY = value;
    })

    if (ConstantLib.SESSION_KEY !== null && ConstantLib.SESSION_KEY !== '') {
      return true;
    }
    else {
      return false;
    }

  }
  static goToLogin() {
    const resetAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [
        NavigationActions.navigate({ routeName: 'SignUpLogin' }),
      ]
    });
    const nav = WSManager.getTopLevelNavigator()

    nav.dispatch(resetAction);
  }
  static showSimpleAlert(message) {
    Alert.alert(
      'BragHouse',
      message,
      [
        { text: 'OK' },
      ],
      {
        cancelable: true
      })
  }

  static showTwoButtonAlert(message, button1, button2) {
    Alert.alert(
      'AGL',
      message,
      [
        { text: button1, onPress: () => { return "button1" } },
        { text: button2, onPress: () => { return "button2" } },
      ],
      {
        cancelable: true
      })
  }

  static getMD5(value) {
    return md5.hex_md5(value);
  }

}
