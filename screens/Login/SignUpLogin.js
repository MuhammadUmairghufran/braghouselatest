import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Dimensions, TouchableOpacity, Image,Platform, SafeAreaView } from 'react-native';
import { Button, Form, Item, Input, Container, Content, StyleProvider, Icon } from 'native-base';
import AppStyles from '../../Themes/AppStyles';
import IMAGES from '../../Constants/Images/';
import Video from 'react-native-video';
import LinearGradient from 'react-native-linear-gradient';
import Modal from "react-native-modal";
import * as URLConstants from '../../Networking/URLConstants/';
import WSManager from '../../Networking/WSManager/';
import Toaster from '../../Utils/Toaster';
import String from '../../Constants/Strings/';
import ConstantLib from '../../Constants/ConstantLib/';
import AppPreferences from '../../Preferences/AppPreferences/';
import PreferenceConstant from '../../Preferences/PreferenceConstant/';
import Dashboard from '../Dashboard/';
import { getItem } from '../../lib/Session';
import { clearItem } from '../../lib/Session';
import FCM, { NotificationActionType } from "react-native-fcm";
import SignUp from '../Signup/SignUp';
import Conference from '../Conference/Conference';
import { StackActions, NavigationActions, Header } from 'react-navigation';


export default class SignUpLogin extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    mute: true,
    fullScreen: true,
    shouldPlay: true,
    loop: true,
    isModalVisible: false,
  }

  componentDidMount() {

    if (Platform.OS === "ios") {
      FCM.requestPermissions()
      .then(e => function(){console.log('permitted')})
      .catch(() => function(){console.log('error')})
    }

    clearItem();
    this.subs = [
      this.props.navigation.addListener('willFocus', () =>{
        mContext = this

        this.setState({ shouldPlay: true });
      } ),
      this.props.navigation.addListener('willBlur', () => {

        this.setState({ shouldPlay: false });
      }),
    ];
  }

  gotToHome()
  {
    const resetAction = StackActions.reset({
    index: 0,
    key:null,
    actions: [
    NavigationActions.navigate({ routeName: 'Drawer'}),
    ]
    });

    this.props.navigation.dispatch(resetAction);
  }


  render() {
    const { width } = Dimensions.get('window');
    return (

      
      <View style={AppStyles.Wrapper} >
        <Video
          source={require('../../video.mov')}

          isLooping={true}
          repeat={this.state.shouldPlay}
          resizeMode="cover"
          paused={!this.state.shouldPlay}
          isMuted={this.state.mute}
          style={[AppStyles.video, { width }]}
        />
        <View style={{ backgroundColor: 'rgba(0,0,0,0.1)', position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}></View>
        <View style={{ justifyContent: 'flex-end', flex: 1 }}>
          <LinearGradient
            start={{ x: 0, y: 0 }} end={{ x: 3.5, y: 0.2 }}
            locations={[0.0, 0.4]}
            colors={['#1B75BC', '#9AD8DD']}
            style={{
              margin: 50,
              borderRadius: 4,
              marginBottom: 20
            }}
          >
            <Button block onPress={() => this.props.navigation.navigate('SignUpPhone')} transparent large><Text style={{ fontSize: 18, color: '#fff',fontFamily:'SourceSansPro-Regular' }}>SIGN UP</Text></Button>
          </LinearGradient>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' ,paddingBottom: 40}}>

            <Text style={{ fontSize: 13, color: 'white', alignSelf: 'center', textAlign: 'center', paddingHorizontal: 0, lineHeight: 16, fontFamily:'SourceSansPro-Regular' }}>Already a member? </Text>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('LoginWithPassword')}>
              <Text style={{ fontSize: 14, paddingLeft: 15, color: '#fff', alignSelf: 'center', textAlign: 'center', paddingHorizontal: 0, lineHeight: 16, fontFamily:'SourceSansPro-Regular' }}>LOGIN</Text>
            </TouchableOpacity >
          </View>

        </View>
      </View>
      


    );
  }




  // <TouchableOpacity style={[AppStyles.center, { paddingBottom: 40, paddingTop: 10 }]}>
  //   <Text onPress={() => this.gotToHome()} style={AppStyles.linkTxt}>Continue as Guest</Text>
  // </TouchableOpacity>



}
