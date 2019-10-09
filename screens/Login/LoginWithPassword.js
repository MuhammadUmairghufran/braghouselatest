import React, { Component } from 'react';
import {StyleSheet,AsyncStorage, Text, View, Image, TextInput, KeyboardAvoidingView, ScrollView, TouchableOpacity,Platform,Switch} from 'react-native';
import AppStyles from '../../Themes/AppStyles';
import IMAGES  from '../../Constants/Images/';
import Modal from "react-native-modal";
import {showMessage} from "react-native-flash-message";
import {Item, Input, Label, Button, Container, Content, Form } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import Loader from '../../Utils/Loader/';
import Utility from '../../Utils/Utility/';
import WSManager from '../../Networking/WSManager/';
import * as URLConstants from '../../Networking/URLConstants/';
import {StackActions, NavigationActions, Header} from 'react-navigation';
import Conference from '../Conference/Conference';
import SignUp from '../Signup/SignUp';
import Dashboard from '../Dashboard/';
import Drawer from '../Drawer/Drawer'
import ConstantLib  from '../../Constants/ConstantLib/';
import PreferenceConstant, {UserCurrentBalancePreferenceConstant} from '../../Preferences/PreferenceConstant';

import DeviceInfo from 'react-native-device-info';
import FCM, { NotificationActionType } from "react-native-fcm";
import { registerKilledListener, registerAppListener } from "../fcm/Listeners";
import firebaseClient from "../fcm/FirebaseClient";
import {saveItem} from '../../lib/Session';
import Toaster  from '../../Utils/Toaster';
import Ripple from 'react-native-material-ripple';

export default class LoginWithPassword extends Component {
    constructor(props) {
      super(props);
      this.state = {
        mobile:'',
        passwordText:'',
        isLoading: false,
        message:false,
        loading:false,
        showPassword:true,
        DeviceToken: "twurtwurwurtwurwurtwrtwurtwrutwrtwurtwurtwrutwruwtru",
      }
    }

  static navigationOptions = {
    header: null
  };
  onClickCrossButton() {

    const navigateAction = NavigationActions.navigate({
      routeName: 'SignUpLogin',
      params: {},

    })
    const nav = WSManager.getTopLevelNavigator()
    nav.dispatch(navigateAction)

  }

  componentDidMount() {

    if (Platform.OS === "ios") {
      FCM.requestPermissions()
      .then(e => function(){console.log('permitted')})
      .catch(() => function(){console.log('error')})
    }


    FCM.getFCMToken().then(token => {
      console.log("FCM TOKEN (getFCMToken)", token);
      this.setState({ DeviceToken: token || "" });
    });

    // if (Platform.OS === "ios") {
    //   FCM.requestPermissions()
    //   .then(e => function(){console.log('permitted')})
    //   .catch(() => function(){console.log('error')})

    //   // FCM.getAPNSToken().then(token => {
    //   //   console.log("APNS TOKEN (getFCMToken)", token);
    //   //     this.setState({ DeviceToken: token || "" });
    //   // });
    // }



  }
  toggleSwitch() {
     this.setState({ showPassword: !this.state.showPassword });
   }
  render() {
    return (
      //Toast.show('This is a toast.');
        <ScrollView  keyboardShouldPersistTaps={'handled'} >
        {/* <KeyboardAvoidingView style={styles.container} behavior="padding"> */}

        <Loader loading={this.state.loading} />
             <View style={AppStyles.modalWrap}>
              <View style={{paddingTop: 20}}>
                <TouchableOpacity onPress={() => this.onClickCrossButton()} style={AppStyles.modalClose}>
                  <Image source={IMAGES.close}/>
                </TouchableOpacity>
              </View>

              <View style = {{marginTop: 78}}>
                <Text style={{textAlign: 'center', fontFamily:'SourceSansPro-Bold', fontSize: 20, color: '#222222'}}>LOG IN</Text>
                </View>
              <Container>
                <Content style={{marginTop: 40}}>
                  <Form>
                    <Item regular>

                    <Input maxLength = {10} keyboardType= 'phone-pad' placeholder='Phone Number'
                     onChangeText={(text) => this.setState({mobile:text})}
                    style={{borderLeftWidth: 0, borderRadius: 4, borderLeftColor: '#E1E1E1', marginVertical: 10, height: 50}}/>
                    </Item>
                    <Item regular style = {{marginTop: 15}}>
                    <Input secureTextEntry = {this.state.showPassword} placeholder='Password'
                    onChangeText={(text) => this.setState({passwordText:text})}
                    style={{borderLeftWidth: 0, borderRadius: 4, borderLeftColor: '#E1E1E1', marginVertical: 10, height: 50}}/>

                    <Ripple onPress={() => this.toggleSwitch()} style={{ width: 24, height: 14 ,marginRight:5 }}>
                      <Image source={this.state.showPassword===true?IMAGES.eye_d:IMAGES.eye} style={{ width: 24, height: 14 }}  />
                    </Ripple>
                    </Item>
                    <LinearGradient
                      start={{x: 0, y: 0}} end={{x: 3.5, y: 0.2}}
                      locations={[0.0, 0.4]}
                      colors={['#1B75BC', '#9AD8DD']}
                      style={{
                        borderRadius: 4,
                        marginTop: 39.5
                      }}
                      >
                        <Button block  transparent large onPress={()=>this.callLogin()}><Text style={{fontSize: 18, color:'#F9F9F9', fontFamily:'SourceSansPro-Regular'}}>LOGIN</Text></Button>
                    </LinearGradient>

                    <TouchableOpacity onPress={()=> {this.props.navigation.navigate('Forgotpassword')}} style={{flex:1,alignItems:"flex-end"}} transparent>
                    <Text style={{fontSize: 14, color:'#FF444F', alignSelf: 'flex-end', marginTop: 16, textAlign: 'right', paddingHorizontal: 0, lineHeight: 15,fontFamily:'SourceSansPro-Bold'}}>Forgot Password?</Text>
                    </TouchableOpacity>
                  </Form>
                </Content>
              </Container>
            </View>
            {/* </KeyboardAvoidingView> */}

         </ScrollView>
    );
  }


  validate(){
    if (this.state.mobile.trim() === "") {
      Platform.OS === "ios" ? alert('Please enter mobile number') : Toaster.showLongToast('Please enter mobile number')
        return false;
    }
    else if (this.state.passwordText.trim() === "" ) {
      Platform.OS === "ios" ? alert('Please enter password') : Toaster.showLongToast('Please enter password')
        return false;
    }
    else{
      return true;
    }

  }

  callLogin(){
    if(this.validate()){
      this.setState({loading: true})
      const params = {
        phone_no: this.state.mobile,
       // password: Utility.getMD5(this.state.passwordText),
        password: this.state.passwordText,
        device_type:Platform.OS === "ios"?2:1,
        device_id:this.state.DeviceToken,
       };

       WSManager.postData(URLConstants.LOGIN_API, params)
      .then(response => {
        this.setState({loading: false})
        ConstantLib.SESSION_KEY = response.data.data.session_key;
        saveItem(PreferenceConstant.SESSION_KEY, ''+ConstantLib.SESSION_KEY);
        saveItem(PreferenceConstant.USER_ID, ''+response.data.data.user_profile.user_id);
        saveItem(PreferenceConstant.USER_UNIQUE_ID, ''+response.data.data.user_profile.user_unique_id);
        saveItem(PreferenceConstant.USER_NAME, ''+response.data.data.user_profile.user_name);
        saveItem(PreferenceConstant.EMAIL, ''+response.data.data.user_profile.email);
        saveItem(PreferenceConstant.DOB, ''+response.data.data.user_profile.dob);
        saveItem(PreferenceConstant.FIRST_NAME, ''+response.data.data.user_profile.first_name);
        saveItem(PreferenceConstant.LAST_NAME, ''+response.data.data.user_profile.last_name);
        saveItem(PreferenceConstant.PHONE_NO, ''+response.data.data.user_profile.phone_no);
      
        AsyncStorage.setItem('user', JSON.stringify(parseInt(response.data.data.user_profile.phone_no)));
        AsyncStorage.setItem('firstname', JSON.stringify(parseInt(response.data.data.user_profile.first_name)));

        saveItem(PreferenceConstant.GENDER, ''+response.data.data.user_profile.gender);
        saveItem(PreferenceConstant.USER_IMAGE, ''+response.data.data.user_profile.image);
        saveItem(PreferenceConstant.REF_CODE, ''+response.data.data.user_profile.referral_code);

        
        saveItem(PreferenceConstant.BANK_ACCOUNT_SET, ''+response.data.data.user_profile.bank_account_set);

        ConstantLib.PROFILE_STATUS = response.data.data.user_profile.profile_status;
        ConstantLib.FOLLOW_STATUS = response.data.data.user_profile.follow_status;
        ConstantLib.REF_CODE = ''+response.data.data.user_profile.referral_code;
        ConstantLib.USER_ID = ''+response.data.data.user_profile.user_id;
        ConstantLib.EMAIL = response.data.data.user_profile.email;
        saveItem(PreferenceConstant.PROFILE_STATUS, ''+ConstantLib.PROFILE_STATUS);
        saveItem(PreferenceConstant.FOLLOW_STATUS, ''+ConstantLib.FOLLOW_STATUS);
        this.callGetUserBalanceApi(''+response.data.data.user_profile.user_id)
      })
      .catch(error => {
        this.setState({loading: false})
        console.log('Error = '+JSON.stringify(error));

        // console.log('1st Condition ', error.response.data.error.phone_no)
        // console.log('2nd Condition ', error.response.error.password)
        // console.log('3rd Condition ', error.response.data.error.password)

        if ((error.response.data.error.phone_no != null)&&(error.response.data.error.phone_no != 'null')&&(error.response.data.error.phone_no != ""))
        {
        Platform.OS === "ios" ? setTimeout(() => {
          alert(JSON.stringify(error.response.data.error.phone_no))
        }, 500)  : Toaster.showLongToast(JSON.stringify(error.response.data.error.phone_no) );
      }
      else if ((error.response.data.error.password != null)&&(error.response.data.error.password != 'null')&&(error.response.data.error.password != ""))
      {
        Platform.OS === "ios" ? setTimeout(() => {
          alert(JSON.stringify(error.response.data.error.password))
        }, 500)  : Toaster.showLongToast(JSON.stringify(error.response.data.error.password) );
      }
      else
      {
        Platform.OS === "ios" ? setTimeout(() => {
          alert(JSON.stringify(error.response.data.error.password))
        }, 500)  : Toaster.showLongToast(JSON.stringify(error.response.data.error.password) );
      }

        return error;
      });
    }
  }



  callGetUserBalanceApi(userId) {
    this.setState({ loading: true })

    console.log('Loginwithpassword', userId)
    const params = {

      user_id: userId


    };

    WSManager.postData(URLConstants.GET_USER_BALANCE, params)
      .then(response => {
        this.setState({ loading: false })

        var data = response.data.data;
        //this.setState({ userBalanceData: data.user_balance })
        console.log('LOG WITH PWD wala balance', data.user_balance.point_balance)
        saveItem(UserCurrentBalancePreferenceConstant.BONUS_AMOUNT , ''+data.user_balance.bonus_amount);
        saveItem(UserCurrentBalancePreferenceConstant.REAL_AMOUNT , ''+data.user_balance.real_amount);
        saveItem(UserCurrentBalancePreferenceConstant.WINNING_AMOUNT , ''+data.user_balance.winning_amount);
        saveItem(UserCurrentBalancePreferenceConstant.POINT_BALANCE , ''+data.user_balance.point_balance);

        if(ConstantLib.PROFILE_STATUS==='0'){
          const resetAction = StackActions.reset({
          index: 0,
          key:null,
          actions: [
          NavigationActions.navigate({ routeName: 'SignUp'}),
          ]
          });

          this.props.navigation.dispatch(resetAction);

        }
        else if(ConstantLib.FOLLOW_STATUS==='0'){
          const resetAction = StackActions.reset({
          index: 0,
          key:null,
          actions: [
          NavigationActions.navigate({ routeName: 'Conference'}),
          ]
          });

          this.props.navigation.dispatch(resetAction);
        }
        else{
          const resetAction = StackActions.reset({
          index: 0,
          key:null,
          actions: [
          NavigationActions.navigate({ routeName: 'Drawer'}),
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
}
const styles = StyleSheet.create({

});
