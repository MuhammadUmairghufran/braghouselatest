import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, Platform } from 'react-native';
import { Button, Form, Item, Input, Container, Content, StyleProvider, Icon, H3 } from 'native-base';
import AppStyles from '../../Themes/AppStyles';
import IMAGES from '../../Constants/Images/';
import String from '../../Constants/Strings/';
import WSManager from '../../Networking/WSManager/';
import Toaster from '../../Utils/Toaster';
import * as URLConstants from '../../Networking/URLConstants/';
import * as AppPreferences from '../../Preferences/AppPreferences/';
import PreferenceConstant, {UserCurrentBalancePreferenceConstant} from '../../Preferences/PreferenceConstant';
import Loader from '../../Utils/Loader/';
import ConstantLib from '../../Constants/ConstantLib/';
import LinearGradient from 'react-native-linear-gradient';
import Conference from '../Conference/Conference';
import SignUp from '../Signup/SignUp';
import Dashboard from '../Dashboard/';
import { StackActions, NavigationActions, Header } from 'react-navigation';
import { getItem, saveItem } from '../../lib/Session';
import Ripple from 'react-native-material-ripple';

import DeviceInfo from 'react-native-device-info';
import FCM, { NotificationActionType } from "react-native-fcm";
import { registerKilledListener, registerAppListener } from "../fcm/Listeners";
import firebaseClient from "../fcm/FirebaseClient";

export default class Verification extends Component {
  static navigationOptions = {
    header: null
  };



  constructor(props) {
    super(props);
    this.state = {
      otp: '',
      phone_no: '',
      loading: false,
      DeviceToken: "twurtwurwurtwurwurtwrtwurtwrutwrtwurtwurtwrutwruwtru",

    }
  }
  componentDidMount() {
    getItem(PreferenceConstant.PHONE_NO).then((value) => {
      this.setState({ phone_no: value });

    }),

      this.subs = [
        this.props.navigation.addListener('willFocus', () => {
          mContext = this;

        }),

      ];
      // if (Platform.OS === "ios") {
      //   FCM.getAPNSToken().then(token => {
      //     console.log("APNS TOKEN (getFCMToken)", token);
      //     this.setState({ DeviceToken: token || "" });
      //   });
      // }
      FCM.getFCMToken().then(token => {
        console.log("FCM TOKEN (getFCMToken)", token);
        this.setState({ DeviceToken: token || "" });
      });

      

  }




  render() {
    return (

      <View style={AppStyles.Wrapper}>
        <Loader loading={this.state.loading} />

        <TouchableOpacity style = {{paddingTop: 60, paddingBottom: 0, left: 20}} onPress={() => this.props.navigation.navigate('SignUpPhone')}><Image style={{ paddingLeft:3, paddingRight:3}} source={IMAGES.ic_back_Black} /></TouchableOpacity>
        <View style={[AppStyles.center, { paddingVertical: 50 }]}>

          <H3 style={AppStyles.heading}>ENTER CONFIRMATION CODE</H3>
          <View style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: 55, paddingTop: 20 }}>
            <View style={{ flexDirection: 'row', }}>
              <Text style={{ textAlign: 'center', fontSize: 15, lineHeight: 20, }}>Enter the 6-digit code we sent to </Text>
            </View>
            <View style={{flexDirection:'row'}}>
              <Text style={{ fontFamily:'SourceSansPro-Regular' }}>+1{this.state.phone_no}.</Text>
              <TouchableOpacity onPress={() => this.resendOTP()}>
              <Text style={{ color: '#1B75BC', fontFamily:'SourceSansPro-Regular', fontWeight: 'bold',}}> Request a new one. </Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
        <View style={{ paddingHorizontal: 28 }}>
          <Form>
            <Item regular>
              <Input maxLength = {6} keyboardType = 'phone-pad' onChangeText={(text) => this.setState({ otp: text })} placeholder='Confirmation Code' />
            </Item>
            <LinearGradient
              start={{ x: 0, y: 0 }} end={{ x: 3.5, y: 0.2 }}
              locations={[0.0, 0.4]}
              colors={['#1B75BC', '#9AD8DD']}
              style={{
                borderRadius: 4,
                marginTop: 15
              }}
            >
              <Button block transparent large onPress={this.verifyMobile.bind(this)}><Text style={{ fontSize: 18, color: '#fff', fontFamily:'SourceSansPro-Regular' }}>NEXT</Text></Button>
            </LinearGradient>
          </Form>
        </View>
      </View>

    );
  }

  resendOTP() {

    this.setState({ loading: true })
    const params = {
      phone_no: ConstantLib.PHONE_NO,
    };

    WSManager.postData(URLConstants.RESEND_OTP, params)
      .then(response => {
        this.setState({ loading: false })
        console.log(response.data.data.otp_code);
        saveItem(PreferenceConstant.OTP, '' + response.data.data.otp_code);
        Toaster.showLongToast(response.data.data.otp_code);
        { this.props.navigation.navigate('Verification') }

      })
      .catch(error => {
        this.setState({ loading: false })
        console.log("verifyMobile Error= " + JSON.stringify(error));
        Platform.OS === "ios" ? setTimeout(() => {
          alert(error.response.data.global_error)
        }, 500) : Toaster.showLongToast(JSON.stringify(error.response.data.global_error));
        return error;
      });
  }

  verifyMobile = () => {
    if (this.validate()) {
      this.setState({ loading: true })
      const params = {
        otp: this.state.otp,
        device_type: Platform.OS === "ios" ? 2 : 1,
        device_id:this.state.DeviceToken,
      };

      WSManager.postData(URLConstants.VALIDATE_OTP, params)
        .then(response => {
          console.log(response);

          this.setState({ loading: false })
          console.log("main data", response.data)
          console.log("sub data", response.data.data)
          ConstantLib.SESSION_KEY = response.data.data.session_key;
          var user_profile = response.data.data.user_profile;
          saveItem(PreferenceConstant.REF_CODE, ''+user_profile.referral_code);

          ConstantLib.PROFILE_STATUS = '0';
          ConstantLib.FOLLOW_STATUS = '0';
          saveItem(PreferenceConstant.SESSION_KEY, '' + ConstantLib.SESSION_KEY);
          saveItem(PreferenceConstant.PROFILE_STATUS, '' + ConstantLib.PROFILE_STATUS);
          saveItem(PreferenceConstant.FOLLOW_STATUS, '' + ConstantLib.FOLLOW_STATUS);
          
          this.callGetUserBalanceApi(user_profile.user_id)

        })
        .catch(error => {

          console.log("error verify", error)


          this.setState({ loading: false })
          Platform.OS === "ios" ? setTimeout(() => {
            alert(JSON.stringify(error.response.data.error.otp))
          }, 500) :Toaster.showLongToast(JSON.stringify(error.response.data.error.otp));
          return error;
        });
    }
  }

  callGetUserBalanceApi(userId) {
    this.setState({ loading: true })
    const params = {

      user_id: userId


    };

    WSManager.postData(URLConstants.GET_USER_BALANCE, params)
      .then(response => {
        this.setState({ loading: false })

        var data = response.data.data;
        //this.setState({ userBalanceData: data.user_balance })
        saveItem(UserCurrentBalancePreferenceConstant.BONUS_AMOUNT , ''+data.user_balance.bonus_amount);
        saveItem(UserCurrentBalancePreferenceConstant.REAL_AMOUNT , ''+data.user_balance.real_amount);
        saveItem(UserCurrentBalancePreferenceConstant.WINNING_AMOUNT , ''+data.user_balance.winning_amount);
        saveItem(UserCurrentBalancePreferenceConstant.POINT_BALANCE , ''+data.user_balance.point_balance);


        if (ConstantLib.PROFILE_STATUS === '0') {
          const resetAction = StackActions.reset({
            index: 0,
            key: null,
            actions: [
              NavigationActions.navigate({ routeName: 'SignUp' }),
            ]
          });

          this.props.navigation.dispatch(resetAction);
        }
        else if (ConstantLib.FOLLOW_STATUS === '0') {
          const resetAction = StackActions.reset({
            index: 0,
            key: null,
            actions: [
              NavigationActions.navigate({ routeName: 'Conference' }),
            ]
          });

          this.props.navigation.dispatch(resetAction);
        }
        else {
          const resetAction = StackActions.reset({
            index: 0,
            key: null,
            actions: [
              NavigationActions.navigate({ routeName: 'Drawer' }),
            ]
          });
          this.props.navigation.dispatch(resetAction);
        }

        console.log(data)

        console.log('TopBraggersApi Success = ' + JSON.stringify(data));
      })
      .catch(error => {

        this.setState({ loading: false })
        console.log('Error = ' + JSON.stringify(error.response.data));
        return error;
      });
  }
  validate = () => {
    if (this.state.otp.trim() === '') {
      Platform.OS === "ios" ? alert('Enter confirmation code') :Toaster.showLongToast('Enter confirmation code')
      return false;
    }

    return true;
  }

}
