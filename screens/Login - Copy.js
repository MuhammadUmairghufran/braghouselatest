import React, {Component} from 'react';
import {TouchableOpacity, ActivityIndicator, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, ScrollView, AsyncStorage} from 'react-native';
import {Colors, Fonts, Metrics, ApplicationStyles, Images} from '../Themes/';
import {saveItem, getItem} from '../lib/Session';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {Item, Input, Label, Button} from 'native-base';
import md5 from 'react-native-md5';
import Expo from 'expo';
import { showMessage } from "react-native-flash-message";

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email:'',
      password:'',
      isLoading: false
    }
  }

  async componentDidMount(){
    await getItem('session_key').then((key) => {
      this.props.navigation.navigate(key ? 'Lobby' : 'Login');
    });
  }

  static navigationOptions = {
    header: null
  };

  logIn = async () => {
    const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('288424861584897', {
        permissions: ['public_profile'],
      });
    if (type === 'success') {
      // Get the user's name using Facebook's Graph API
      const response = await fetch(
        `https://graph.facebook.com/me?access_token=${token}`);
      Alert.alert(
        'Logged in!',
        `Hi ${(await response.json()).name}!`,
      );
    }
    console.log(type);
  }

  _onPress = (event) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!this.state.email || !re.test(this.state.email)) {
      showMessage({
        message: 'Please enter a valid email address',
        type: 'danger',
        autoHide:true,
        duration:5000,
        backgroundColor: 'rgba(217,83,79,0.8)'
      });
      return false;
    }

    if(!this.state.password) {
      showMessage({
        message: 'Please enter password',
        type: 'danger',
        autoHide:true,
        duration:5000,
        backgroundColor: 'rgba(217,83,79,0.8)'
      });
      return false;
    }

    this.setState({
      isLoading:true
    });
    fetch('http://vfantasy.vinfotech.org/user/auth/login',{
      body: JSON.stringify({email:this.state.email,password:md5.hex_md5(this.state.password),device_id:'',device_type:3}),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    })
    .then(function(response){
      var contentType = response.headers.get('content-type');
      if(contentType && contentType.includes('application/json')) {
       return response.json();
      }
      // throw new TypeError('Oops, we haven't got JSON!');
    })
    .then((responseJson) => {
      if(responseJson.response_code==200) {
        this.setState({email:'',password:''});
        showMessage({
          message: responseJson.message,
          type: 'success',
          autoHide:true,
          duration:5000
        });

        saveItem('session_key', responseJson.data.session_key);
        // saveItem('user_profile', responseJson.data.user_profile);
        this.props.navigation.navigate('Lobby');
      }

      if(responseJson.response_code==500) {
        if(responseJson.error.email) {
          showMessage({
            message: responseJson.error.email,
            type: 'danger',
            autoHide:true,
            duration:5000,
            backgroundColor: 'rgba(217,83,79,0.8)'
          });
        }
        else if(responseJson.error.password) {
          showMessage({
            message: responseJson.error.password,
            type: 'danger',
            autoHide:true,
            duration:5000,
            backgroundColor: 'rgba(217,83,79,0.8)'
          });
        }
      }
      this.setState({
        isLoading: false,
      }, function(){
      });
    })
    .catch((error) =>{
      console.error(error);
      this.setState({
        isLoading:false
      });
    });
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
      <View style={getTheme(material)}>
          <Text>
            I have changed the text color.
          </Text>
          <Button primary block><Text>Color Changes</Text></Button>
      </View>
        <ScrollView>
          <View>
            {this.state.isLoading && <View style={styles.loading}><ActivityIndicator size="large" color="#EC8A0F" /></View>}
            <Text style={styles.txthead}>LOGIN</Text>
            <Text style={styles.txtsubhead}>CONNECT INSTANTLY WITH</Text>
            <View style={styles.grid}>
              <TouchableOpacity onPress={this.logIn}>
                <Image style={styles.socialicn} source={Images.fb}/>
              </TouchableOpacity>
              <Image style={styles.socialicn} source={Images.gplus}/>
            </View>
            <View style={{alignItems: 'center', marginTop: 15, marginBottom: 15, position: 'relative'}}>
              <View  style={{borderWidth: 0.5, borderColor: 'rgba(216,216,216,0.6)', width: 130, justifyContent: 'center', flex:1, flexDirection: 'row', position: 'absolute', top: 15}}>
              </View>
                <Col style={{ height: 30, width: 30}}>
                  <View style={styles.teamLogo}>
                    <Text style={{color: '#333333', fontSize: 12}}>OR</Text>
                  </View>
                </Col>
            </View>
            <View style={styles.formfield}>
              <Item floatingLabel style={styles.formElements}>
                <Label style={styles.lbltxt}>Enter Email</Label>
                <Input style={styles.inpttext} onSubmitEditing={this._onPress} keyboardType='email-address'  value={this.state.email} onChangeText={(email) => this.setState({email})}/>
              </Item>
              <Item floatingLabel style={styles.formElements}>
                <Label style={styles.lbltxt}>Password</Label>
                <Input style={styles.inpttext} onSubmitEditing={this._onPress} secureTextEntry={true} value={this.state.password} onChangeText={(password) => this.setState({password})}/>
              </Item>
              {/*<TextInput underlineColorAndroid='transparent' onSubmitEditing={this._onPress} keyboardType='email-address' style={styles.formElements} placeholder='Enter Email' value={this.state.email} onChangeText={(email) => this.setState({email})}/>*/}
              {/*<TextInput underlineColorAndroid='transparent' onSubmitEditing={this._onPress} secureTextEntry={true} style={styles.formElements} placeholder='Password' value={this.state.password} onChangeText={(password) => this.setState({password})}/>*/}
              <Button block style={styles.buttonDefault}  onPress={this._onPress}><Text style={styles.buttonDefaultTxt}> LOGIN </Text></Button>
              <Button block transparent  style={{marginTop: 10, alignSelf: 'center'}}  onPress={() => this.props.navigation.navigate('Forgotpassword')}>
                <Text style={styles.linktxt}>Forgot Password?</Text>
              </Button>
              <View style={{flexDirection:'row', alignItems: 'center', justifyContent: 'center', marginTop:5}}>
                <Text style={styles.linktext}>Don't have account?</Text>
                <Button transparent onPress={() => this.props.navigation.navigate('SignUp')}>
                      <Text style={styles.linktxt}>Sign up</Text>
                </Button>
              </View>
              </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: 50
  },
  txthead: {
    textAlign: 'center',
    fontSize: 16,
    
    color: '#333333'
  },
  txtsubhead: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 10,
    color: '#808080',
    
  },
  grid: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'center',
  },
  socialicn: {
    margin: 10,
    marginHorizontal: 25
  },
  formfield: {
    marginHorizontal: 20,
  },
  formElements: {
    marginBottom: 15,
  },
  dateInput: {
    borderBottomWidth: 1,
    width: '100%',
    marginBottom: 20
  },
  linktext: {
    textAlign: 'center',
    marginRight: 10,
    color: '#808080'
  },
  buttonDefault : {
    backgroundColor: '#EC8A0F',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 4
  },
  buttonDefaultTxt: {
    color: 'white'
  },
  errmsg: {
    color:'red',
    marginBottom: 20
  },
  successmsg: {
    color:'green',
    marginTop: 20
  },
  teamLogo:{
    width:30,
    height: 30,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: '#ffffff',
    shadowColor:"#000000",
    shadowOffset:{width:0, height:0},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5
  },
  lbltxt: {
    color: '#808080',
    
    fontSize: 14,
    fontFamily:'SourceSansPro-Bold',
    marginLeft: 5
  },
  inpttext: {
    color: '#333333',
    
    fontSize: 20,
  },
  linktxt: {
    color: '#EC8A0F',
    fontFamily:'SourceSansPro-Bold'
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },

});
