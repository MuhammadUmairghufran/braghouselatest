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

export default class ChangePassword extends Component {
    constructor(props) {
      super(props);
      this.state = {
        passwordText:'',
        confirmPassword:'',
        isLoading: false,
        message:false,
        loading:false,
      }
    }

  static navigationOptions = {
    header: null
  };


  render() {
    return (
      //Toast.show('This is a toast.');
        <ScrollView  keyboardShouldPersistTaps={'handled'}  >
        <KeyboardAvoidingView style={styles.container} behavior="padding">

        <Loader loading={this.state.loading} />
             <View style={AppStyles.modalWrap}>
              <View style={{paddingTop: 20}}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={AppStyles.modalClose}>
                  <Image source={IMAGES.close}/>
                </TouchableOpacity>
              </View>

              <View style = {{marginTop: 78}}>
                <Text style={{textAlign: 'center', fontFamily:'SourceSansPro-Bold', fontSize: 20, color: '#222222'}}>RESET PASSWORD</Text>
                </View>
              <Container>
                <Content style={{marginTop: 40}}>
                  <Form>
                    <Item regular>

                    <Input  placeholderTextColor="#C7C7C7" secureTextEntry = {true} placeholder='Enter Password'
                     onChangeText={(text) => this.setState({passwordText:text})}
                    style={{borderLeftWidth: 0, borderRadius: 4, borderLeftColor: '#E1E1E1', marginVertical: 10, height: 50}}/>
                    </Item>
                    <Item regular style = {{marginTop: 15}}>
                    <Input placeholderTextColor="#C7C7C7" secureTextEntry = {true} placeholder='Confirm Passwords'
                    onChangeText={(text) => this.setState({confirmPassword:text})}
                    style={{borderLeftWidth: 0, borderRadius: 4, borderLeftColor: '#E1E1E1', marginVertical: 10, height: 50}}/>
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
                        <Button block  transparent large onPress={()=>this.resetPassword()}><Text style={{fontSize: 18, color:'#F9F9F9', fontFamily:'SourceSansPro-Bold'}}>RESET</Text></Button>
                    </LinearGradient>
                  </Form>
                </Content>
              </Container>
            </View>
            </KeyboardAvoidingView>

         </ScrollView>
    );
  }
  validate =() =>{

    if (this.state.passwordText.trim() == "") {

        Platform.OS === "ios" ? alert('Please enter new password') : Toaster.showLongToast('Please enter new password')
        return false;
    }else if(this.state.confirmPassword.trim() == ""){
      Platform.OS === "ios" ? alert('Please enter confirm password') :Toaster.showLongToast('Please enter password again')
      return false;

    }
    else if(this.state.passwordText.trim() !== this.state.confirmPassword.trim()){
      Platform.OS === "ios" ? alert('Password does not match.') :Toaster.showLongToast('Password does not match.')
      return false;

    }

    return true;
  }
  resetPassword(){

    if(this.validate())
    {

      this.setState({loading: true})
      const params = {
        otp:ConstantLib.OTP,
        password: Utility.getMD5(this.state.passwordText),
        };

       WSManager.postData(URLConstants.CHANGE_PASSWORD, params)
      .then(response => {
        console.log('Response = '+JSON.stringify(response));

        this.setState({loading: false})

          const resetAction = StackActions.reset({
          index: 0,
          key:null,
          actions: [
          NavigationActions.navigate({ routeName: 'LoginWithPassword'}),
          ]
          });
          this.props.navigation.dispatch(resetAction);

      })
      .catch(error => {
        this.setState({loading: false})
        console.log('Error = '+JSON.stringify(error));
        Platform.OS === "ios" ? setTimeout(() => {
          alert(JSON.stringify(error.response.data.error))
        }, 500) : Toaster.showLongToast(JSON.stringify(error.response.data.error) );

        return error;
      });
    }
    }
}
const styles = StyleSheet.create({

});
