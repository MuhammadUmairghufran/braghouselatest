import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, StatusBar, Animated, Platform, FlatList, ImageBackground }
  from 'react-native';
import { Button, Form, Item, Input, Container, Content, StyleProvider, Icon, H3, Header, Left, Right, Tab, Tabs }
  from 'native-base';
import { AppStyles, Images } from '../../Themes/';
import LinearGradient from 'react-native-linear-gradient';
import Modal from "react-native-modal";
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import OtherUserCreatedBrags from '../Profile/OtherUserCreatedBrags';
import OtherUserTeams from '../Profile/OtherUserTeams';
import TabNews from '../BHLobby/TabNews';
import { TabBarTop } from 'react-navigation';

import { createMaterialTopTabNavigator as TabNavigator} from 'react-navigation-tabs'
import { getItem, saveItem } from '../../lib/Session';
import PreferenceConstant from '../../Preferences/PreferenceConstant';
import IMAGES from '../../Constants/Images';
import OtherUserProfileScreen from '../Profile/OtherUserProfileScreen';
import ConstantLib from '../../Constants/ConstantLib/';
import { EventRegister } from 'react-native-event-listeners'
import Loader from '../../Utils/Loader/';
import * as URLConstants from '../../Networking/URLConstants/';
import WSManager from '../../Networking/WSManager';
import Utility from '../../Utils/Utility/';
import Ripple from 'react-native-material-ripple';
import OtherUserProfileBasicInfo from '../Profile/OtherUserProfileBasicInfo';

//var ImagePicker = require('react-native-image-picker');

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[AppStyles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

export const CustomTab = TabNavigator({
  'PROFILE': {
    screen: OtherUserProfileScreen,
  },
  BRAGS: {
    screen: OtherUserCreatedBrags,
  },
  'TEAM': {
    screen: OtherUserTeams,
  },
  

}, {
  tabBarComponent: TabBarTop,
  tabBarPosition: 'top',
  animationEnabled: true,
  swipeEnabled: true,
  

  tabBarOptions: {
    activeTintColor: '#ffffff',
    inactiveTintColor: '#ffffff60',
    allowFontScaling: false,
    scrollEnabled:false,
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

export default class OtherProfileScreen extends Component {
  static router = CustomTab.router

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  constructor(props) {
    super(props);
  }
  
  static update() {
    if (mContext) {
    }
  }

  handleMouseClick() {
    //  alert('handle');
  }

  componentDidMount() {
    mContext = this;
    var mUID = this.props.navigation.getParam('user_id');
    ConstantLib.OTHER_USER_ID = mUID;
    this.setState({user_id:mUID}, function()
  {
    this.getProfileApi(mUID);
  });


    this.subs = [
      this.props.navigation.addListener('willFocus', () => {
        //   alert('{ProfileScreen} '+ConstantLib.FIRST_NAME);
      //  alert('test');
        OtherUserProfileScreen.updateFeedData();
      }),
    ];
  }
 
  state = {
    index: 0,
    user_id:'',
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
    loading: false,
    followStatus:'',

  };

  followUsers(){
    if(Utility.isLoggedIn())
    {
        this.setState({loading: true})
        const params = {
          follower_id: this.state.user_id,
          type: 'user',
        };
    WSManager.postData(URLConstants.TOGGLE_FOLLOW_ENTITY, params)
    .then(response => {
        let { posts } = this.state;
          this.setState({loading: false})
          console.log('followUsers===>>>>>>>>>>>>>'+JSON.stringify(response.data.data));
          var status = this.state.followStatus==='0'?'1':'0';
          this.setState({followStatus: status});
          this.setState({notifyDataChange:true});
        })
    .catch(error => {
      this.setState({loading: false})
      Toaster.showLongToast('followUsers:'+error.message);
      return error;
    });
  }
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
        console.log("getProfileApi response==" + JSON.stringify(data));
        this.setState({ firstName: data.first_name })
        this.setState({ lastName: data.last_name })
        this.setState({ userImage: data.image })
        this.setState({followStatus:data.follow_status})
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
            <TouchableOpacity onPress={() => this.props.navigation.goBack(null)} style={{ paddingLeft: 10, paddingTop: 5, marginLeft: 5 }} transparent>
              <Image source={IMAGES.back} />
            </TouchableOpacity>
            { PreferenceConstant.USER_ID != this.state.user_id ?
            <Ripple onPress={() => this.followUsers()} style={{position:'absolute',right:20,  padding: 5}}>
              <Text style={{fontSize: 14,
          fontWeight: 'bold',
          fontFamily: 'SourceSansPro-Regular',
          color: '#FFFFFF',
          alignSelf: 'center',marginTop:20 }}>{(this.state.followStatus==1)?'FOLLOWING': 'FOLLOW'}</Text>
            </Ripple>
            : null
            }
          </View>

          <View style={{ alignItems: 'center', paddingTop: 10, paddingBottom: 10 }}>

            <View style={{
              width: 80,
              height: 80,
              borderRadius: 40,
            }}>
              {console.log('Image url===>>> '+this.state.userImage)}
              <View>
                <Image style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                }}
                  source={this.state.userImage === null || this.state.userImage === '' || this.state.userImage === 'null' ? Images.default_user : { uri: this.state.userImage }} />
              </View>
            </View>
            <H3 style={{ marginTop: 14, fontSize: 22, color: '#FFFFFF' }}>{this.state.firstName + " " + this.state.lastName}</H3>
          </View>
          <CustomTab navigation = {this.props.navigation} />
        </LinearGradient>
      </View >
    );
  }
}
