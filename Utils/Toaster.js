import React, {Component} from 'react';
import Toast from 'react-native-simple-toast';

export default class Toaster extends Component {

  static showLongToast(message) {
      Toast.show(message, Toast.LONG);
  }
  static showShortToast(message) {
      Toast.show(message, Toast.SHORT);
  }
}
