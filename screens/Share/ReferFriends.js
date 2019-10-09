import React, { Component } from 'react';
import { Clipboard, StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, Image, Platform, TouchableOpacity, SafeAreaView, StatusBar, Slider, ImageBackground, FlatList, Dimensions } from 'react-native';
import { Label, Radio, Picker, Icon, Item, Right } from 'native-base';
import { AppStyles, Images } from '../../Themes/';
import LinearGradient from 'react-native-linear-gradient';

import {DrawerActions} from 'react-navigation-drawer'
import * as String from '../../Constants/Strings/';
import IMAGES from '../../Constants/Images/';
import Ripple from 'react-native-material-ripple';
import RadioGroup from 'react-native-radio-buttons-group';
import * as URLConstants from '../../Networking/URLConstants/';
import WSManager from '../../Networking/WSManager/';
import ConstantLib from '../../Constants/ConstantLib';
import Loader from '../../Utils/Loader/';
import Utility from '../../Utils/Utility/';
import Toaster from '../../Utils/Toaster/';
import { StackActions, NavigationActions, Header } from 'react-navigation';
import WellDoneAfterCreatingBrag from '../WellDoneAfterCreatingBrag'
import { getItem, saveItem } from '../../lib/Session';
import PreferenceConstant from '../../Preferences/PreferenceConstant';
import { replaceAll } from '../../Constants/Methods';

var mContext = null;
const WW = Dimensions.get('window').width;
export default class ReferFriends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      refreshing: false,
      code: ''
    }
  }
  componentDidMount() {
    this.setState({ code: ConstantLib.ID })
    getItem(PreferenceConstant.REF_CODE).then((value) => {
      this.setState({ code: value })
    })
  }
  static navigationOptions = ({ navigation }) => {
    return {
      header: <CustomHeader this navigation={navigation} />
    };
  };

  mContext = this;
  render() {
    return (
      <View style={AppStyles.Wrapper}>

        <StatusBar
          translucent
          backgroundColor={'transparent'} />



        <View style={{ backgroundColor: '#FFFFFF', height: '100%' }}>
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
            <Image source={IMAGES.ic_doodles} />
            <Text style={{
              justifyContent: 'center', alignItems: 'center', marginTop: 30,
              fontFamily: 'SourceSansPro-Bold', textAlign: 'center', color: '#363636', fontSize: 18
            }}>{String.refer_text_}</Text>
            <Text style={{
              justifyContent: 'center', alignItems: 'center', marginTop: 30,
              textAlign: 'center', color: '#363636', fontSize: 18
            }}>Your Referral Code</Text>

            <Text style={{
              justifyContent: 'center', alignItems: 'center', marginTop: 30,
              textAlign: 'center', color: '#363636', fontSize: 30, fontFamily: 'SourceSansPro-Regular', fontWeight:'900'
            }}>{this.state.code}</Text>
            <TouchableOpacity onPress={() => this.writeToClipboard()} transparent>

              <Text style={{
                color: '#00B732', fontSize: 16, textAlign: 'center', marginTop: 30, fontFamily: 'SourceSansPro-Bold',
                borderWidth: 2, borderColor: '#00B732', borderRadius: 17, padding: 5
              }}>COPY CODE       </Text>
            </TouchableOpacity>


            <TouchableOpacity style={{ marginTop: 30, }} onPress={() => {
                    //inviteReferralMessage = String.Share_Brag_Message.toString()
                    //"USER_FIRSTNAME", "TITLE", "CODE"
                    getItem(PreferenceConstant.REF_CODE).then((value)=>{
                      ConstantLib.REF_CODE=value;
                      var map = {
                        '"CODE"' : ''+ConstantLib.REF_CODE,
                      };
                      
                      Utility.shareTextMessage(replaceAll(String.Invite_Referral_Message, map))
                  })
                   
                   
                    
                
                   // Utility.shareTextMessage(ConstantLib.FIRST_NAME+' '+ConstantLib.LAST_NAME +String.Share_message_public+' '+ConstantLib.REF_CODE+' '+String.Share_message2)
                }} transparent>
              <Text style={{ textDecorationLine: 'underline', color: '#1B75BC', fontSize: 16, textAlign: 'center', marginTop: 30, }}>View More Sharing Options</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    );
  }



  writeToClipboard = () => {
    Clipboard.setString(ConstantLib.ID);
    Toaster.showLongToast('Copied to Clipboard!');
  };


}

var customStyles9 = StyleSheet.create({
  thumb: {
    width: 30,
    height: 30,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
  }
});



const CustomHeader = ({ navigation }) => (

  <LinearGradient
    start={{ x: 0.6, y: 0 }} end={{ x: 2.5, y: 1.5 }}
    locations={[0.0, 0.4]}
    colors={['#1B75BC', '#9AD8DD']}
    style={{ paddingTop: Platform.OS === "ios" ? 30 : 20 }}>

    <View style={{ flexDirection: 'row', padding: 15, }}>
      <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={{ justifyContent: 'center' }} transparent>
        <Image source={IMAGES.ic_drawer_menu} />
      </TouchableOpacity>
      <View style={{ flex: 1, alignSelf: 'center', alignItems: 'center', paddingRight: 15 }}>
        <Text style={AppStyles.header_title}>Refer a Friend</Text>
      </View>

    </View>
  </LinearGradient>


);
