import React, { Component } from 'react';
import {StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, ScrollView, TouchableOpacity, Platform} from 'react-native';
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
import ConstantLib  from '../../Constants/ConstantLib/';
import PreferenceConstant from '../../Preferences/PreferenceConstant';
import {saveItem} from '../../lib/Session';
import Toaster  from '../../Utils/Toaster';

export default class LoginWithPassword extends Component {
    constructor(props) {
      super(props);
      this.state = {
        mobile:'',
        passwordText:'',
        isLoading: false,
        message:false,
        loading:false,
      }
    }

  static navigationOptions = {
    header: null
  };


    callLogin(){
      if(this.validate())
      {
        this.setState({loading: true})
         const params = {
          phone_no: this.state.mobile,
          };

         WSManager.postData(URLConstants.FORGOT_PASSWORD, params)
        .then(response => {
          this.setState({loading: false})
          console.log(JSON.stringify(response));
          ConstantLib.PHONE=this.state.mobile;
          ConstantLib.OTP=  response.data.data.otp_code;
          this.props.navigation.navigate('ForgotPasswordVerification');

        })
        .catch(error => {
          this.setState({loading: false})
          console.log('Error = '+JSON.stringify(error));
          Platform.OS === "ios" ? setTimeout(() => {
            alert(JSON.stringify(error.response.data.error.phone_no))
          }, 500) :Toaster.showLongToast(JSON.stringify(error.response.data.error.phone_no) );
          return error;
        });
      }
    }

    validate =() =>{

      if (this.state.mobile.trim() == "") {
        Platform.OS === "ios" ? alert('Please enter your mobile number'):Toaster.showLongToast('Please enter your mobile number')
          return false;
      }

      return true;
    }


  render() {
    return (
        <ScrollView  keyboardShouldPersistTaps={'handled'} >
        {/* <KeyboardAvoidingView behavior="padding"> */}

                <View style={AppStyles.modalWrap}>
                    <Loader loading={this.state.loading} />
                 <View style={{paddingTop: 20}}>
                   <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={AppStyles.modalClose}>
                     <Image source={IMAGES.close}/>
                   </TouchableOpacity>
                 </View>

                 <View style = {{marginTop: 78}}>
                   <Text style={{textAlign: 'center', fontFamily:'SourceSansPro-Bold', fontSize: 20, color: '#222222', }}>FORGOT PASSWORD</Text>
                   </View>
                 <Container>
                   <Content style={{marginTop: 40}}>
                     <Form>
                       <Item regular>
                         <Text style={{color:'#1B75BC', fontSize: 14, paddingLeft: 20, paddingRight: 14, fontFamily:'SourceSansPro-Regular'}}>US +1</Text>
                         <Input placeholderTextColor="#C7C7C7" maxLength = {10} keyboardType="number-pad"  onChangeText={(text) => this.setState({mobile:text})} placeholder='Enter Number' style={{borderLeftWidth: 1, borderLeftColor: '#E1E1E1', marginVertical: 10, height: 50}}/>
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
                           <Button block  transparent large onPress={()=>this.callLogin()}><Text style={{fontSize: 18, color:'#F9F9F9', fontFamily:'SourceSansPro-Regular'}}>GET CONFIRMATION CODE</Text></Button>
                       </LinearGradient>

                       <Text style={{fontSize: 13, fontFamily:'SourceSansPro-Bold', color:'#999', alignSelf: 'center', marginTop: 16, textAlign: 'center', paddingHorizontal: 0, lineHeight: 16}}>You will receive SMS to confirm your existing phone number.</Text>


                     </Form>
                   </Content>
                 </Container>
               </View>
               {/* </KeyboardAvoidingView> */}

         </ScrollView>
    );
  }

}
