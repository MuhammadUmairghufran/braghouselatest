import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, StatusBar, Animated, Platform, FlatList, ImageBackground }
  from 'react-native';
import { Button, Form, Item, Input, Container, Content, StyleProvider, Icon, H3, H1, Header, Left, Right, Tab, Tabs }
  from 'native-base';
import { AppStyles, Images } from '../../Themes/';
import LinearGradient from 'react-native-linear-gradient';
import Modal from "react-native-modal";
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import UserFollowers from '../Profile/UserFollowers';
import CreatedBrags from '../Profile/CreatedBrags';
import TeamsDelete from '../BHLobby/TeamsDelete';
import TabNews from '../BHLobby/TabNews';
import { TabBarTop } from 'react-navigation';
import {DrawerActions} from 'react-navigation-drawer'
import { createMaterialTopTabNavigator as TabNavigator} from 'react-navigation-tabs'
import { getItem, saveItem } from '../../lib/Session';
import PreferenceConstant from '../../Preferences/PreferenceConstant';
import IMAGES from '../../Constants/Images';
import UserProfileScreen from '../Profile/UserProfileScreen';
import UserProfileBasicInfo from '../Profile/UserProfileBasicInfo'
import ConstantLib from '../../Constants/ConstantLib/';
import { EventRegister } from 'react-native-event-listeners'
import Loader from '../../Utils/Loader/';
import * as URLConstants from '../../Networking/URLConstants/';
import WSManager from '../../Networking/WSManager';
import Utility from '../../Utils/Utility/';
import { FooterTab } from '../Dashboard';
import {convertStringToLowerCase} from '../../Constants/Methods';
import DrawerContent from '../Drawer/DrawerContent';
import BragSpaceHomeScreen from '../Lobby/BragSpaceHomeScreen';
//var ImagePicker = require('react-native-image-picker');

import ImagePicker from 'react-native-image-picker';

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[AppStyles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

export const CustomTab = TabNavigator({



  PROFILE: {
    screen: UserProfileScreen,
    
  },
  BRAGS: {
    screen: CreatedBrags,
  },
  'MY TEAMS': {
    screen: TeamsDelete,
  },
  'Basic Info':
  {
    screen: UserProfileBasicInfo,
  },
  'FOLLOWERS':{
    screen: UserFollowers
  },

}, {
    tabBarComponent: TabBarTop,
    tabBarPosition: 'top',
    animationEnabled: true,
    swipeEnabled: false,
    

    tabBarOptions: {
      activeTintColor: '#ffffff',
      inactiveTintColor: '#ffffff60',
      allowFontScaling: false,
      scrollEnabled:true,
      style: {
        backgroundColor: 'transparent',
        borderColor: 'red',
        elevation: 0

      },

      tabStyle:
      {
        paddingTop: 0,
      },

      labelStyle:
      {
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'SourceSansPro-Regular',
        color: '#FFFFFF',
        alignSelf: 'center',

      },


      indicatorStyle:
      {
        backgroundColor: '#FFFFFF',
        height: 2
      }


    },

  });
const CustomHeader = ({ navigation }) => (
  <LinearGradient
    start={{ x: 0.6, y: 0 }} end={{ x: 2.5, y: 1.5 }}
    locations={[0.0, 0.4]}
    colors={['#1B75BC', '#9AD8DD']}
    style={{ paddingTop: Platform.OS === "ios" ? 0 : 0 }}
  >
  </LinearGradient>
);
let  mContext = null;





export default class ProfileScreen extends Component {
  constructor(props) {
    super(props);
  }

  static update() {
    if (mContext) {
      mContext.initProfileData();
    }
  }

  handleMouseClick() {
    //  alert('handle');
  }

  componentDidMount() {
    mContext = this;
    var isFromBottomTab = this.props.navigation.getParam('isFromBottomTab', true);
    this.setState({isFromBottomTab: isFromBottomTab}, function()
  {

  })
  this.initProfileData()




    this.subs = [
      this.props.navigation.addListener('willFocus', () => {
        //   alert('{ProfileScreen} '+ConstantLib.FIRST_NAME);
      }),
    ];
  }
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'First' },
      { key: 'second', title: 'Second' },
    ],
    firstName: '',
    lastName: '',
    userImage: '',
    imagePath: '',
    serverImagePath: '',
    userProfile: '',
    isFromBottomTab : true,
    imageMimeType:'',
    imageName: '',
    loading: false,
    position:'',

  };

  initProfileData() {

    getItem(PreferenceConstant.LAST_NAME).then((value) => {
      this.setState({ lastName: value })
      //  alert(value);

    })
    getItem(PreferenceConstant.FIRST_NAME).then((value) => {
      this.setState({ firstName: value })
      ConstantLib.FIRST_NAME = value;
    })

    getItem(PreferenceConstant.USER_IMAGE).then((value) => {
      this.setState({ userImage: value })

    })
    getItem(PreferenceConstant.USER_ID).then((value) => {
      this.getProfileApi(value)
    })
    
  }


  getProfileApi(userID) {

    
    const params = {
      user_id: userID
    };




    WSManager.postData(URLConstants.GET_USER_PROFILE, params)
      .then(response => {
        var data = response.data.data.user_profile;
        this.setState({ loading: false });
        this.setState({ refreshing: false });
        this.setState({ userProfile: false });
        console.log("getAllNotifications==" + JSON.stringify(data));
        this.setState({position: data.position})
      })
      .catch(error => {
        this.setState({ loading: false });
        this.setState({ refreshing: false });
        Toaster.showLongToast('getAllTeams:' + error.message);
        return error;
      });
  }

  TakeImage() {
    //    alert(0);
  }

  static router = CustomTab.router

  render() {
    mContext = this;
    return (

      <View style={{ flex: 1 }} >
        <MyStatusBar backgroundColor="rgba(0,0,0,0)" barStyle="light-content" />

        <LinearGradient
          start={{ x: 0.6, y: 0 }} end={{ x: 2.5, y: 1.5 }}
          locations={[0.0, 0.4]}
          colors={['#1B75BC', '#9AD8DD']}
          style={{ paddingTop: Platform.OS === "ios" ? 30 : 20, width: '100%', height: '100%' }}>

          <Loader loading={this.state.loading} />

          <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 20 }}>
            <TouchableOpacity onPress={() => (this.state.isFromBottomTab?WSManager.getTopLevelNavigator().dispatch(DrawerActions.openDrawer()):this.props.navigation.goBack(null))} style={{ paddingLeft: 10, paddingTop: 5, marginLeft: 5 }} transparent>
              <Image source={this.state.isFromBottomTab?IMAGES.ic_drawer_menu:IMAGES.back} />
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'center', paddingTop: 10, paddingBottom: 10 }}>
            <View style={{
              width: 80,
              height: 80,
              borderRadius: 40,
            }}>

              <TouchableOpacity style = {{flexDirection: 'row', alignItems: 'flex-end'}} onPress={this.pickImage}>
                <Image style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                }}
                  source={this.state.userImage === null || this.state.userImage === '' || this.state.userImage === 'null' ? Images.default_user : { uri: this.state.userImage }} />
                  <Text style={{ marginTop: 14, fontSize: 11, color: '#FFFFFF' }}>{this.state.position!=undefined && this.state.position!=null && this.state.position!='null' && this.state.position!=''?"#" + this.state.position:""}</Text>
              </TouchableOpacity>
            </View>


            <H3 style={{ marginTop: 14, fontSize: 22, color: '#FFFFFF' }}>{ConstantLib.FIRST_NAME + " " + this.state.lastName}</H3>
            
            
          </View>



          <CustomTab screenProps = {{userImage:this.state.userImage, navigation: this.props.navigation}} navigation = {this.props.navigation} />
          
          
        </LinearGradient>
      </View >
    );
  }

  uploadImage = async () => {
    this.setState({ loading: true })
    var url = URLConstants.UPLOAD_PROFILE_PIC;
    var photo = {
      uri: this.state.imagePath,
      type: this.state.imageMimeType,
      name: this.state.imageName,
    };

    var data = new FormData();
    data.append("userfile", photo);
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;




    xhr.open("POST", url);


    xhr.setRequestHeader("session_key", ConstantLib.SESSION_KEY);
    xhr.send(data);


    xhr.addEventListener("readystatechange", function () {
      mContext.setState({ loading: false })

      if (this.readyState === 4 && xhr.response.length>0) {
        jsonResponse = JSON.parse(xhr.response);
        mContext.setState({ serverImagePath: jsonResponse.data.image_path })
        mContext.setState({ userImage: jsonResponse.data.image_path })
        saveItem(PreferenceConstant.USER_IMAGE, jsonResponse.data.image_path);

        DrawerContent.updateUserProfile()
        BragSpaceHomeScreen.updateUserProfile()

      }
    });


  }


  pickImage = () => {
    const options = {
      maxImagesCount: 10,      // Max number of images user can select; if maxImagesCount == 1, Single mode (i.e. Tap to Select & Finish) will be activated.
      allowsEditing: true,
      quality: 0.5,
      selectedPaths: [
      ]                       // Currently selected paths, must be from result of previous calls. Empty array allowed.
    };
    ImagePicker.showImagePicker(options, (response) => {

      if (Platform.OS == 'ios') 
      {
        if (response.uri !== undefined && response.uri != null && response.uri != 'null' && response.uri != '') {
          fileType = convertStringToLowerCase(response.uri.split('.').pop())
          this.setState({ imageName: 'abc.' + fileType })
          

          if (fileType == 'jpg' || fileType == 'jpeg') {
            this.setState({ imageMimeType: 'image/jpg' })
          }
          else if (fileType == 'png') {
            this.setState({ imageMimeType: 'image/png' })
          }
          else if (fileType == 'gif') {
            this.setState({ imageMimeType: 'image/gif' })
          }
          else if (fileType == 'bmp') {
            this.setState({ imageMimeType: 'image/bmp' })
          }
          else {
            this.setState({ imageMimeType: 'image/jpg' })

          }
          this.setState({ imagePath: response.uri }, function () {
            this.uploadImage();

          }
          );
        }
      }
      else {
        if (response.fileName !== undefined) {
          fileType = convertStringToLowerCase(response.fileName.split('.').pop())
          this.setState({ imageName: 'abc.' + fileType })
          console.log('Image ka type: ', fileType, response.fileName, response.uri)

          if (fileType == 'jpg' || fileType == 'jpeg') {
            this.setState({ imageMimeType: 'image/jpg' })
          }
          else if (fileType == 'png') {
            this.setState({ imageMimeType: 'image/png' })
          }
          else if (fileType == 'gif') {
            this.setState({ imageMimeType: 'image/gif' })
          }
          else if (fileType == 'bmp') {
            this.setState({ imageMimeType: 'image/bmp' })
          }
          else {
            this.setState({ imageMimeType: 'image/jpg' })
          }
          this.setState({ imagePath: response.uri }, function () {
            this.uploadImage();

          });
        }
      }
   



     });

  }



}
