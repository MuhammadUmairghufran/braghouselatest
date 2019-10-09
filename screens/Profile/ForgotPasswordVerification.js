import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Dimensions, TouchableOpacity, Image,Platform } from 'react-native';
import { Button, Form, Item, Input, Container, Content, StyleProvider, Icon, H3 } from 'native-base';
import AppStyles from '../../Themes/AppStyles';
import IMAGES  from '../../Constants/Images/';
import String  from '../../Constants/Strings/';
import WSManager  from '../../Networking/WSManager/';
import Toaster  from '../../Utils/Toaster';
import * as URLConstants from '../../Networking/URLConstants/';
import * as AppPreferences from '../../Preferences/AppPreferences/';
import PreferenceConstant from '../../Preferences/PreferenceConstant';
import Loader from '../../Utils/Loader/';
import ConstantLib  from '../../Constants/ConstantLib/';
import LinearGradient from 'react-native-linear-gradient';
import Conference from '../Conference/Conference';
import SignUp from '../Signup/SignUp';
import Dashboard from '../Dashboard/';
 import {StackActions, NavigationActions, Header} from 'react-navigation';
 import {getItem,saveItem} from '../../lib/Session';


export default class ForgotPasswordVerification extends Component {
  static navigationOptions = {
    header: null
  };

componentDidMount()
{

}
  constructor(props)
   {
     super(props);
     this.state = {
         otp:"",
         phone_no:'',
         loading:false,

       }
   }

   compon

   componentDidMount()
   {

      this.subs = [
     this.props.navigation.addListener('willFocus', ()=>{
     mContext = this;

     }),

     ];


   }



  render() {
    return (

        <View style={AppStyles.Wrapper}>
          <Loader loading={this.state.loading} />
          <TouchableOpacity style = {{paddingTop: 60, paddingBottom: 0, left: 20}} onPress={() => this.props.navigation.navigate('Forgotpassword')}><Image style={{ paddingLeft:3, paddingRight:3}} source={IMAGES.ic_back_Black} /></TouchableOpacity>
          <View style={[AppStyles.center,{paddingVertical: 50}]}>
            <H3 style={AppStyles.heading}>Enter Confirmation Code</H3>
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 55, paddingTop: 20}}>
              {/* <Text style={{textAlign: 'center', fontSize: 15, lineHeight: 20, fontFamily:'SourceSansPro-Regular'}}>Enter the 6-digit code we sent to +1{ConstantLib.PHONE}.<Text onPress={()=>{alert(0)}} style={{color:'#1B75BC', fontFamily:'SourceSansPro-Regular', fontWeight: 'bold',}}> Request a new one. </Text></Text> */}
              <TouchableOpacity></TouchableOpacity>
            </View>
          </View>
          <View style={{paddingHorizontal: 28}}>
            <Form>
              <Item regular>
                <Input placeholderTextColor="#C7C7C7" maxLength = {6} keyboardType="number-pad" onChangeText={(text) => this.setState({otp:text})} placeholder='Verify Your Code'/>
              </Item>
              <LinearGradient
                start={{x: 0, y: 0}} end={{x: 3.5, y: 0.2}}
                locations={[0.0, 0.4]}
                colors={['#1B75BC', '#9AD8DD']}
                style={{
                  borderRadius: 4,
                  marginTop: 15
                }}
                >
                  <Button block  transparent large onPress={this.verifyOtp.bind(this)}><Text style={{fontSize: 18, color:'#fff', fontFamily:'SourceSansPro-Bold'}}>ENTER</Text></Button>
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

  verifyOtp = () => {
       if(this.validate()){
             this.setState({loading: true})
             const params = {
            otp:this.state.otp,//otp//ConstantLib.OTP,
                       };

      WSManager.postData(URLConstants.FORGOT_PASSWORD_VALIDATE_CODE, params)
         .then(response => {
             this.setState({loading: false})
           console.log("main data",response.data)
           console.log("sub data",response.data.data)
           this.props.navigation.navigate('ChangePassword');


         })
        .catch(error => {

          console.log("error verify",error)
          this.setState({loading: false})
          Platform.OS === "ios" ? setTimeout(() => {
            alert(JSON.stringify(error.response.data.error.otp))
          }, 500) :Toaster.showLongToast(JSON.stringify(error.response.data.error.otp) );
          return error;
        });
      }
   }
  validate =() =>{

    if (this.state.otp.trim() == "") {
      Platform.OS === "ios" ? alert('Enter confirmation code') : Toaster.showLongToast('Enter confirmation code')
        return false;
    }

    return true;
  }

}
