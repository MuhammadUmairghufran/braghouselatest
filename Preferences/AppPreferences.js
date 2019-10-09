import React, {Component} from 'react';
import {AsyncStorage} from 'react-native';
import Utility from '../Utils/Utility/';


export default class AppPreferences extends Component {


  static setItem(key, value) {
    try {
        AsyncStorage.setItem(key, value);

    } catch (error) {
      console.log(error.message);
    }
  }

  static getItem(key) {
    try {

      return AsyncStorage.getItem(key);

    } catch (error) {
      console.log(error.message);
    }
  }

  static clearAllData() {
    try {

        AsyncStorage.clear();

    } catch (error) {
      console.log(error.message);
    }
  }

  static removeItem(key) {
    try {

        AsyncStorage.removeItem(key);

    } catch (error) {
      console.log(error.message);
    }
  }

    // Example

      // AppPreferences.setItem("isLogin", "Vishal");
      //
      // AppPreferences.removeItem("isLogin1");
      //
      // AppPreferences.clearAllData();
      //
      // AppPreferences.getItem("isLogin")
      // .then((value) => {
      //     Utility.showShortToast("value=="+value);
      // });
}
