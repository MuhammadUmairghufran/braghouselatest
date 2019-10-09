import React, { Component } from "react";
//import { NetInfo } from "react-native";
import NetInfo from "@react-native-community/netinfo";
import axios from "axios";
import ConstantLib from "../Constants/ConstantLib";
import * as String from "../Constants/Strings";
import Toaster from "../Utils/Toaster";
import { StackActions, NavigationActions } from "react-navigation";

//'session_key': ConstantLib.SESSION_KEY,
let _navigator;
export default class WSManager extends Component {
  // static postData(url, params) {
  //   //  alert("url==" + url);
  //   //  alert("SessionKey==" + ConstantLib.SESSION_KEY);
  //   //  alert("params==" + JSON.stringify(params));

  //   return NetInfo.getConnectionInfo().then(connectionInfo => {
  //     if (connectionInfo.type == "none") {
  //       Toaster.showLongToast("Please check your network status");
  //     } else {
  //       if (ConstantLib.SESSION_KEY == null) {
  //          axios.post(url, params, {
  //           headers: {
  //             "Content-Type": "application/json"
  //           }
  //         }).then(response =>{
  //         //  alert('ddd')
  //      // alert(JSON.stringify(response));
  //         }).catch(err =>{
  //         console.log(err);
  //        //  alert(JSON.stringify(err));
  //         })
  //       } else {
  //         return axios.post(url, params, {
  //           headers: {
  //             "Content-Type": "application/json",
  //             session_key: ConstantLib.SESSION_KEY //"7f8f79fe-49d5-e8a8-d6d8-556ee8b8ad27"
  //           }
  //         });
  //       }
  //     }
  //     console.log(
  //       "Network Status" +
  //         connectionInfo.type +
  //         ", effectiveType: " +
  //         connectionInfo.effectiveType
  //     );
  //   });
  // }
// Add a request interceptor



  static postData(url, params) {
    console.log("url==" + url);
    console.log("SessionKey==" + ConstantLib.SESSION_KEY);
    console.log("params==" + JSON.stringify(params));

    return NetInfo.getConnectionInfo().then(connectionInfo => {
      if (connectionInfo.type == "none") {
        Toaster.showLongToast("Please check your network status");
      } else {
        if (ConstantLib.SESSION_KEY == null) {
          return axios.post(url, params, {
            headers: {
              "Content-Type": "application/json"
            }
          });
        } else {
          return axios.post(url, params, {
            headers: {
              "Content-Type": "application/json",
              session_key: ConstantLib.SESSION_KEY //"7f8f79fe-49d5-e8a8-d6d8-556ee8b8ad27"
            }
          });
        }
      }
      console.log(
        "Network Status" +
          connectionInfo.type +
          ", effectiveType: " +
          connectionInfo.effectiveType
      );
    });
  }

  static getData(url) {
    console.log("url==" + url);

    if (ConstantLib.SESSION_KEY == null) {
      return axios.get(url);
    } else {
      return axios.get(url, {
        headers: {
          session_key: ConstantLib.SESSION_KEY
        }
      });
    }
  }

  static setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
  }
  static goBack() {
    _navigator.dispatch(NavigationActions.back());
  }
  static getTopLevelNavigator() {
    return _navigator;
  }
}
