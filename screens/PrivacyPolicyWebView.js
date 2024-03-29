import React, {Component} from 'react';
import {Platform } from 'react-native';
import AppStyles from './../Themes/AppStyles';
import IMAGES  from './../Constants/Images/';
import * as String  from './../Constants/Strings/';
import * as Color  from './../Themes/Colors/';
import ConstantLib from './../Constants/ConstantLib/';
import * as URLConstants from './../Networking/URLConstants/';
import LinearGradient from 'react-native-linear-gradient';

import {DrawerActions} from 'react-navigation-drawer'

import { WebView } from 'react-native-webview';

import {Item } from 'native-base';
import { View,
        Image,
        ImageBackground, StatusBar,
        TouchableOpacity,
        SafeAreaView, Text,
        } from 'react-native';

export default class HowToPlayWebView extends Component {


  constructor(props)
  {
    super(props);
    this.state = {
        title:"",
        webURL:"",
      }
  }

  static navigationOptions = ({navigation}) => {
    return {
      header: <CustomHeader this navigation={navigation} />
    };
  };

  componentDidMount()
  {
    var webURL = URLConstants.PRIVACY_POLICY_URL;
    var title = 'Terms of Use';

    this.setState({title: title})
    this.setState({webURL: webURL})
  }

  render() {
    mContext = this;
    return (
      <View style={AppStyles.Wrapper}>
        <StatusBar
          backgroundColor={'transparent'}
          translucent
        />
        <WebView
          source={{uri: this.state.webURL}}
        />
      </View>
    );
  }
}

const CustomHeader = ({ navigation }) => (
  <LinearGradient
    start={{ x: 0.6, y: 0 }} end={{ x: 2.5, y: 1.5 }}
    locations={[0.0, 0.4]}
    colors={['#1B75BC', '#9AD8DD']}
    style={{ paddingTop: Platform.OS === "ios" ? 30 : 20 }}>

    <View style={{ flexDirection: 'row', padding: 15,  }}>
      <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={{  justifyContent:'center' }} transparent>
        <Image source={IMAGES.ic_drawer_menu}/>
      </TouchableOpacity>
      <View style={{ flex:1, alignSelf:'center', alignItems: 'center', paddingRight: 15 }}>
        <Text style={AppStyles.header_title}>Terms of Use</Text>
      </View>

    </View>
  </LinearGradient>
);
