import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, Platform } from 'react-native';
import { Button, Form, Item, Input, Container, Content, StyleProvider, Icon } from 'native-base';
import AppStyles from '../../Themes/AppStyles';
import IMAGES  from '../../Constants/Images/';
import Video from 'react-native-video';
import LinearGradient from 'react-native-linear-gradient';
import Modal from "react-native-modal";
import * as URLConstants from '../../Networking/URLConstants/';
import WSManager from '../../Networking/WSManager/';
import Toaster  from '../../Utils/Toaster';
import String  from '../../Constants/Strings/';
import Loader from '../../Utils/Loader/';
import {getItem,saveItem} from '../../lib/Session';
import PreferenceConstant from '../../Preferences/PreferenceConstant';
import ConstantLib  from '../../Constants/ConstantLib/';


export default class SignUpPhone extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    mute: false,
    fullScreen: true,
    shouldPlay: true,
    loop: true,
     phone_no:"",
     loading:false,

  }


  render() {
    const { width } = Dimensions.get('window');
    return (
         <View style={AppStyles.Wrapper} >
        <View style={AppStyles.modalWrap}>
          <Loader loading={this.state.loading} />
          <View style={{paddingTop: 100}}>
            <Text style={{textAlign: 'center', fontSize: 22, color: '#222222',fontFamily:'SourceSansPro-Bold' }}>Sign Up</Text>
            <TouchableOpacity onPress={() => this.props.navigation.goBack(null)} style={AppStyles.modalClose}>
              <Image source={IMAGES.close}/>
            </TouchableOpacity>
          </View>
          <Container>
            <Content style={{paddingTop: 100}}>
              <Form>
                <Item regular>
                  <Text style={{color:'#1B75BC', fontSize: 14, paddingLeft: 20, paddingRight: 14, fontFamily:'SourceSansPro-Regular'}}>US +1</Text>
                  <Input placeholderTextColor="#C7C7C7" maxLength = {10} keyboardType='phone-pad' placeholder='Number' onChangeText={(text) => this.setState({phone_no:text})} style={{borderLeftWidth: 1, borderLeftColor: '#E1E1E1', marginVertical: 10, height: 50}}/>
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
                    <Button block disabled = {this.state.phone_no != '' && this.state.phone_no.length == 10 ? false : true}  transparent large onPress={()=>this.verifyMobile()}><Text style={{fontSize: 18, color:'#fff', fontFamily:'SourceSansPro-Regular'}}>NEXT</Text></Button>
                </LinearGradient>


                <Text style={{fontSize: 13, color:'#999', alignSelf: 'center', marginTop: 16, textAlign: 'center', paddingHorizontal: 0, lineHeight: 16, fontFamily:'SourceSansPro-Regular'}}>You may receive SMS updates from Brag House and can opt out at any time.</Text>


              </Form>
            </Content>
          </Container>
        </View>

        </View>

    );
  }



    verifyMobile() {
         if(this.validate())
         {
         ConstantLib.PHONE_NO = this.state.phone_no;
             this.setState({loading: true})
           const params = {
              phone_no:this.state.phone_no,
                         };

        WSManager.postData(URLConstants.SIGNUP_PHONE, params)
           .then(response => {
                   this.setState({loading: false})
                
                 saveItem(PreferenceConstant.PHONE_NO, ''+this.state.phone_no);
                 saveItem(PreferenceConstant.OTP, ''+response.data.data.otp_code);
                  Toaster.showLongToast(response.data.data.otp_code);
                  {this.props.navigation.navigate('Verification')}

           })
          .catch(error => {

                this.setState({loading: false})
                console.log("verifyMobile Error= "+JSON.stringify(error));
                Platform.OS === "ios" ? setTimeout(() => {
                  alert(JSON.stringify(error.response.data.error.phone_no))
                }, 500)  :Toaster.showLongToast(JSON.stringify(error.response.data.error.phone_no) );
                this.setState({loading: false})
            return error;
          });
        }


     }

    validate =() =>{

      if (this.state.phone_no.trim() == "") {
        Platform.OS === "ios" ? alert('Please enter mobile number') : Toaster.showLongToast('Please enter mobile number')
          return false;
      }

      return true;
    }






}
