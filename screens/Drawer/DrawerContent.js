import React, { Component } from 'react';
import { StackActions, NavigationActions, Header } from 'react-navigation';
import { ScrollView, Text, View, StyleSheet, Image, TouchableOpacity, Alert, StatusBar, Platform, SafeAreaView, Dimensions } from 'react-native';
import { Button, List, ListItem } from 'native-base';
import PropTypes from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import {AppStyles,Images} from '../../Themes/';
import IMAGES from '../../Constants/Images/';
import Ripple from 'react-native-material-ripple';
import * as String from '../../Constants/Strings';
import * as Color from '../../Themes/Colors/';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const actionBarHeight = Platform.OS === 'android' ? 70 : 54;
import { getItem, saveItem } from '../../lib/Session';
import PreferenceConstant from '../../Preferences/PreferenceConstant';
import Style from './Style';
import Utility from '../../Utils/Utility/';
import ConstantLib from '../../Constants/ConstantLib';

import AppPreferences from '../../Preferences/AppPreferences';
import WSManager from '../../Networking/WSManager';

let mContext = null
const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[AppStyles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);
class DrawerContent extends Component {

  constructor(props) {
    super(props)
    this.state = {
      firstName:'',
      lastName:'',
      loginText:'LOGOUT',
      is_login:false,
      fullName:'Guest User',
      optionArray:      ["Home","My Brags" ,"Create Your Own Brag", "Write a Post","Join Private Brag",
      "Conference","Refer a Friend","Search", "Transaction History", "Terms of Use", "Help"],
      optionImageArray: [IMAGES.ic_home, IMAGES.mybg, IMAGES.ic_plus_white,  IMAGES.ic_edit_white, IMAGES.ic_join_private,
        IMAGES.ic_conference,IMAGES.ic_collaboration,IMAGES.ic_search, IMAGES.ic_exchange, IMAGES.ic_nav_privacy_policy, IMAGES.help]
    }



  }
  componentDidMount()
  {
    mContext = this
    DrawerContent.updateUserProfile()
  }

  moveToUserOwnProfile(user_id) {

    const navigateAction = NavigationActions.navigate({
      routeName: 'ProfileScreen',
      params: { 'isFromBottomTab': false },


    })
    const nav = WSManager.getTopLevelNavigator();
    nav.dispatch(navigateAction)
  }

  static updateUserProfile()
  {
    if (mContext)
    {
    getItem(PreferenceConstant.USER_IMAGE).then((value) => {
      let UserImage = value;
      mContext.setState({ userImage: UserImage })
     })
     getItem(PreferenceConstant.SESSION_KEY).then((value) => {
       if(value!==null && value!=='')
      {

        getItem(PreferenceConstant.FIRST_NAME).then((value) => {
          let FirstName = value;
          mContext.setState({ firstName: FirstName })
          getItem(PreferenceConstant.LAST_NAME).then((value) => {
            let LastName= value;
            mContext.setState({ lastName: LastName })
            var fName = FirstName+' '+LastName;
            mContext.setState({fullName:fName})
          })

        })


        mContext.setState({ is_login: true })
        mContext.setState({ loginText: "LOGOUT" })

      }
      else {
        mContext.setState({fullName:'Guest User'})
        mContext.setState({ is_login: false })
        mContext.setState({ loginText: "LOGIN" })
        }
      })
    }
  }

  navigateToScreen = (route) => () => {
    const navigate = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigate);
  }

  _renderRow = (rowData, sectionID, rowID) => {
    return (

      <Ripple onPress={() => { this.navigateToMyScreen(rowData) }} >
        <View style={{ flexDirection: 'row' }}>
          <View style={{ height: 50, width: 50 ,justifyContent: 'center', }}>
            <Image style={Style.nav_icons} source={this.state.optionImageArray[rowID]} />
          </View>
          <View style={{ justifyContent: 'center', flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={Style.item_row_text}>{rowData}</Text>
              <Image style={Style.item_right_image} source={IMAGES.ic_right_white_arrow} />
            </View>
            <View style={Style.item_bottom_line} />
          </View>
        </View>

      </Ripple>
    )
  }
  render() {
    mContext = this;
    return (
      <View style={[AppStyles.Wrapper]}>
      
        <MyStatusBar backgroundColor="rgba(0,0,0,0)" barStyle="light-content" />
        <View style={Style.main_container}>
          <LinearGradient
            start={{ x: 0.6, y: 0 }} end={{ x: 2.5, y: 1.5 }}
            locations={[0.0, 0.4]}
            colors={['#1B75BC', '#9AD8DD']}
            style={Style.main_container}>
            <View style={Style.header_container}>
              <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress = {() => this.moveToUserOwnProfile(null)}>
                    <Image  style={{  width: 54,
                      height: 54,
                      borderRadius: 27,
                      marginLeft:20,
                      justifyContent:'center',
                      alignItems:'center',
                       marginTop:4}}  source={this.state.userImage===''||this.state.userImage===null||this.state.userImage==='null'?Images.default_user:{uri:this.state.userImage}} />
                  </TouchableOpacity>
                 <TouchableOpacity style={Style.header_cross_touchableOpacity} onPress={() => this.props.navigation.closeDrawer()}>
                  <Image style={Style.header_cross} source={IMAGES.ic_navigation_cross} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress = {() => this.moveToUserOwnProfile(null)}>
              <Text style={Style.header_text}>{this.state.fullName }</Text>
              </TouchableOpacity>
            </View>
            <View style={Style.horizontal_line} />
            <ScrollView showsVerticalScrollIndicator={false}>
              <View >
                <List dataArray={this.state.optionArray} renderRow={(item, sectionID, rowID) => this._renderRow(item, sectionID, rowID)}>
                </List>
              </View>
            </ScrollView>
            <View style={Style.footer_container}>
              <Ripple onPress={this.showLogoutAlert.bind(this)}>
                <Text style={Style.logout_button}>{this.state.loginText}</Text>
              </Ripple>
              <Text style={{ padding: 5, color: '#fff', fontFamily:'SourceSansPro-Bold' }}>
                Copyright (C) Brag House
              </Text>
            </View>
          </LinearGradient>

        </View>
      {/* </SafeAreaView> */}
      </View>
    );
  }

  navigateToMyScreen = (position) => {

    this.props.navigation.closeDrawer();

    if (position ==='Home') {
      this.props.navigation.navigate('Dashboard')
    }else if (position === 'Conference') {
    this.props.navigation.navigate('ConferenceHome')
    }else if (position === 'Create Your Own Brag') {
     if(Utility.isLoggedIn())
      this.props.navigation.navigate('CreateBragScreen')
    }else if (position == 'Write a Post') {
      if(Utility.isLoggedIn())
      this.props.navigation.navigate('CreatePost', {isFromUserProfile:true})
    }else if (position ==='Join Private Brag') {
        if(Utility.isLoggedIn())
        this.props.navigation.navigate('JoinBragsByCode')
    }else if (position ==='Search') {
        if(Utility.isLoggedIn())
      this.props.navigation.navigate('SearchParent')
    }else if (position === 'Transaction History') {
     if(Utility.isLoggedIn())
      this.props.navigation.navigate('TransactionsScreenContainer')
    } else if (position === 'Bragboard') {
      this.props.navigation.navigate('BragBoardParent')
    } else if (position === 'Notifications') {
      this.props.navigation.navigate('NotificationsScreen')
    } else if (position == 'Terms of Use') {
      this.props.navigation.navigate('PrivacyPolicyWebView')
    }
    else if (position == 'Refer a Friend') {
      if(Utility.isLoggedIn())
      this.props.navigation.navigate('ReferFriends')
    }
    else if (position == 'My Brags') {
      if(Utility.isLoggedIn())
      this.props.navigation.navigate('MyBrags')
    }
    else if (position == 'Help')
    {
      if(Utility.isLoggedIn())
      {
        this.props.navigation.navigate('Help')
      }
    }
    // else if (position == 'Chat')
    // {
    //   if(Utility.isLoggedIn())
    //   {
    //     this.props.navigation.navigate('Chat')
    //   }
    // }
  }

  showLogoutAlert() {

if(ConstantLib.SESSION_KEY!==null && ConstantLib.SESSION_KEY!=='')
{
    Alert.alert(
      'Brag House',
      String.logout_message,
      [
        {
          text: "Yes", onPress: () => {
            this.logout()
          }
        },
        { text: "No" },
      ],
      {
        cancelable: true
      })
}
   else {
  const resetAction = StackActions.reset({
    index: 0,
    key: null,
    actions: [
      NavigationActions.navigate({ routeName: 'SignUpLogin' }),
    ]
  });

  this.props.navigation.dispatch(resetAction);

    }
  }

  logout = () => {

ConstantLib.SESSION_KEY='';
    AppPreferences.clearAllData()
    this.props.navigation.closeDrawer();
    ConstantLib.OTHER_USER_ID='';
    const resetAction = StackActions.reset({
      index: 0,
      key: null,
      actions: [
        NavigationActions.navigate({ routeName: 'SignUpLogin' }),
      ]
    });

    this.props.navigation.dispatch(resetAction);

  }

}


DrawerContent.propTypes = {
  navigation: PropTypes.object
};

export default DrawerContent; 
