import React, {Component} from 'react';
import { View, Image, Text,StyleSheet, SafeAreaView, TouchableOpacity, Dimensions} from 'react-native';
import { AppStyles, Images } from '../Themes';
import {LinearTextGradient} from 'react-native-text-gradient'
import LinearGradient from 'react-native-linear-gradient'
import {  NavigationActions,StackActions } from 'react-navigation';
import WSManager from './../Networking/WSManager/';
import Utility from './../Utils/Utility/';
import * as String from './../Constants/Strings';
import ConstantLib from './../Constants/ConstantLib/';
import { getItem, saveItem } from '../lib/Session';
import PreferenceConstant from '../Preferences/PreferenceConstant'
import {replaceAll} from '../Constants/Methods';

const ScreenWidth = Dimensions.get('screen').width
const ScreenHeight = Dimensions.get('screen').height
const WindowWidth = Dimensions.get('window').width
const WindowHeight = Dimensions.get('window').height

export default class WellDoneAfterCreatingBrag extends Component
{
  constructor(props) {
      super(props);
      this.state = {
        isLoading:false,
        refreshing: false,
        code:''
      }
  }
    static navigationOptions = {
        header: null
      };



      componentDidMount()
      {
        this.setState({code:ConstantLib.ID})

        getItem(PreferenceConstant.FIRST_NAME).then((value)=>{
            ConstantLib.FIRST_NAME=value;
        })
        getItem(PreferenceConstant.LAST_NAME).then((value)=>{
            ConstantLib.LAST_NAME=value;
        })
        getItem(PreferenceConstant.REF_CODE).then((value)=>{
            ConstantLib.REF_CODE=value;
        })
      }
moveToDashboard(){
  const navigateAction = NavigationActions.navigate({
    routeName: 'Drawer',
    index:0,
    params: {},
    action: NavigationActions.navigate({ routeName: 'Drawer' })
  })
  const nav = WSManager.getTopLevelNavigator()
  nav.dispatch(navigateAction)
}

componentWillUnmount()
{
    ConstantLib.BragTitle = ''
}

    render()
    {
        return (
            <View style = {{backgroundColor: 'white', height: ScreenHeight}}>
            <LinearGradient
            start={{ x: 0.0, y: 0 }} end={{ x: -0.1, y: 1.2 }}
            locations={[0.0, 1.0]}
            colors={['#1B75BC', '#9AD8DD']}
            style={{marginBottom: 0,}}
          >
            <View style = {{backgroundColor: 'transparent', height: ScreenHeight * 0.7}}>
            <View style={{alignSelf: 'flex-end', paddingTop: 62, paddingRight: 27}}>
                <TouchableOpacity onPress={()=>this.moveToDashboard()} style={{padding:5}}>
                    <Image  source={Images.whiteClose}/>
                </TouchableOpacity>
              </View>
            {/* <View style = {{width: 198, height: 226,}}> */}
            <Image style = {{marginTop: (((ScreenHeight*0.7)/2)-(113+62)), alignSelf: 'center'}} source = {Images.wellDone}  ></Image>
            {/* </View> */}
            </View>
            </LinearGradient>
            {/* Bottom White View */}
            <View style = {{ }}>
                <Text style = {{marginTop:((ScreenWidth*0.3)*0.3), alignSelf: "center", fontSize: 18, fontFamily:'SourceSansPro-Bold',}}>Share your brag with your friends</Text>
            </View>
            <View style = {{flexDirection: "row", alignSelf: "center", marginTop: 17}}>
            {/* Icons */}
            <TouchableOpacity onPress={()=>
                {
                    //inviteReferralMessage = String.Share_Brag_Message.toString()
                    //"USER_FIRSTNAME", "TITLE", "CODE"
                    var map = {
                        '"USER_FIRSTNAME"' : ConstantLib.FIRST_NAME,
                        '"TITLE"' : ConstantLib.BragTitle,
                        '"CODE"' : ConstantLib.REF_CODE,
                    };
                    
                    Utility.shareTextMessage(replaceAll(String.Share_Brag_Message, map))
                
                   // Utility.shareTextMessage(ConstantLib.FIRST_NAME+' '+ConstantLib.LAST_NAME +String.Share_message_public+' '+ConstantLib.REF_CODE+' '+String.Share_message2)
                }
                
                
                } style={{}}>
                <View style = {{alignItems: "center"}}>
                  <Image source={Images.linkShareIcon}/>
                  <Text style = {{fontSize: 10, fontFamily:'SourceSansPro-Regular'}}>Share with friends</Text>
                </View>
            </TouchableOpacity>
            </View>
            </View>
        );
    }
}
