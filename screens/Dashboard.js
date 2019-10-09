import {  createAppContainer } from 'react-navigation';
import {DrawerActions} from 'react-navigation-drawer'
import { createStackNavigator} from 'react-navigation-stack'
import {  createBottomTabNavigator} from 'react-navigation-tabs'
import React from 'react';
import { Text, View, Button, Image, StatusBar, Platform, TouchableOpacity, Dimensions } from 'react-native';
import { AppStyles, Images, ImageBackground } from './../Themes';
import TabPlayers from './TabPlayers';
import BHLobbyScreen from './BHLobby/BHLobbyScreen';
import LinearGradient from 'react-native-linear-gradient';
import ProfileScreen from './Profile/ProfileScreen';
import BragSpaceHomeScreen from './Lobby/BragSpaceHomeScreen';
import NotificationsScreen from './Notifications/NotificationsScreen';
import BragBoardParent from './BragBoard/BragBoardParent';
import BragBoardParentGuest from './BragBoard/BragBoardParentGuest';
import NotificationGuest from './Notifications/NotificationGuest';
import ProfileGuest from './Profile/ProfileGuest';
import BragSpaceGuest from './BHLobby/BragSpaceGuest';



import BragSpace from './BHLobby/BragSpace';
import IMAGES from '../Constants/Images';
import BragSpaceLobbyGuestScreen from './Lobby/BragSpaceLobbyGuestScreen';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
import ConstantLib  from '../Constants/ConstantLib/';
import WSManager  from '../Networking/WSManager/';
 import * as URLConstants from '../Networking/URLConstants';

import { getItem, saveItem } from '../lib/Session';
import UserProfileScreen from './Profile/UserProfileScreen';
import PreferenceConstant from '../Preferences/PreferenceConstant';
// import MyBragBoardForWeek from './Bragboard/MyBragBoardForWeek';
// import MyBragBoardOverAll from './Bragboard/MyBragBoardOverAll';

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[AppStyles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);
var mContext =null;
 isFromHome = false;
isFromNotification = true;
const CustomHeader = ({ navigation }) => (
  <LinearGradient
    start={{ x: 0.6, y: 0 }} end={{ x: 2.5, y: 1.5 }}
    locations={[0.0, 0.4]}
    colors={['#1B75BC', '#9AD8DD']}
    style={{ paddingTop: Platform.OS === "ios" ? 10 : 20 }}>

     <View style={{ flexDirection: 'row', padding: 15, paddingTop: Platform.OS === "ios" ? 10 : 20 }}>
      <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={{ flex: 1, justifyContent: 'center' }} transparent>
        <Image source={IMAGES.ic_drawer_menu} />
      </TouchableOpacity>
      <View style={{ flex: 1, alignItems: 'flex-end', paddingRight: 15 }}>
        <Text style={AppStyles.header_title}>{ConstantLib.header_title}</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.goBack} style={{ flex: 1, alignItems: "flex-end" }} transparent>
        <Text style={{ color: '#fff', fontSize: 16, textAlign: 'center' }}></Text>
      </TouchableOpacity>
    </View>
  </LinearGradient>
);

const FooterTab = createBottomTabNavigator(
  {
    Home: {
      screen: BragSpaceHomeScreen,
      navigationOptions: {
        showLabel: true,

        tabBarIcon: ({ focused, tintColor }) => (
          <View >
            <Image
              source={focused ? IMAGES.ic_home : IMAGES.ic_home_disabled} />
          </View>

        ),
        showIcon: true,
        activeIconColor: 'red',

      }
    },
    Bragboard: {
      screen: BragBoardParent,
      navigationOptions: {

        showLabel: true,
        tabBarIcon: ({ focused, tintColor }) => (
          <Image
            source={focused ? IMAGES.ic_nav_bragBoard : IMAGES.ic_nav_bragBoard_disabled}
          />

        ),
        showIcon: true,
        activeIconColor: 'red'
      }
    },
    BragSpace: {
      screen: BragSpace,
      navigationOptions: {

        showLabel: true,
        tabBarIcon: ({ focused, tintColor }) => (
          <Image
            source={focused ? IMAGES.ic_bragspace_active : IMAGES.ic_bragspace}
          />

        ),
        showIcon: true,
        activeIconColor: 'red'
      }
    },
    Notifications: {
      screen: NotificationsScreen,
      navigationOptions: {

        showLabel: true,
        tabBarIcon: ({ focused, tintColor }) => (
         <View style={{flexDirection:'row'}}>
          <Image
            source={focused ? IMAGES.ic_notifications : IMAGES.ic_notifications_disabled}
          />
           {mContext.state.unReadCount>0?
            <View style={{position: "absolute",right: -17, top: -5, backgroundColor:'red', alignItems:'center', borderRadius: 12 }}>
           <Text style={{ textAlign:'center', textAlignVertical:'center', color:'white',width:25,height:25,paddingTop:4,
           }}>{mContext.state.unReadCount>99?'99+':mContext.state.unReadCount}</Text>
             </View>:null}
           </View>
        ),
        showIcon: true,
        activeIconColor: 'red'
      }
    },

    'My Profile': {
      header: null,
      screen: ProfileScreen,
      navigationOptions: {
        showLabel: true,
        tabBarIcon: ({ focused, tintColor }) => (
          <Image
            source={focused ? IMAGES.ic_profile_active : IMAGES.ic_profile}
          />

        ),

        showIcon: true,
        activeIconColor: 'red'
      }
    },
  },
  {
    
    tabBarOptions: {
      activeTintColor: '#fff',
      inactiveTintColor: '#8DBADD',

      style: {
        backgroundColor: '#1B75BC',
        height: 60,

      }, labelStyle: { fontSize: 12 },

    }
  }
);
const NonLoginFooterTab = createBottomTabNavigator(
  {
    Home: {
      screen: BragSpaceHomeScreen,
      navigationOptions: {
        showLabel: true,

        tabBarIcon: ({ focused, tintColor }) => (
          <View >
            <Image
              source={focused ? IMAGES.ic_home : IMAGES.ic_home} />
          </View>

        ),
        showIcon: true,
        activeIconColor: 'red',

      }
    },
    Bragboard: {
      screen: BragBoardParentGuest,
      navigationOptions: {

        showLabel: true,
        tabBarIcon: ({ focused, tintColor }) => (
          <Image
            source={focused ? IMAGES.ic_nav_bragBoard : IMAGES.ic_nav_bragBoard}
          />

        ),
        showIcon: true,
        activeIconColor: 'red'
      }
    },
    BragSpace: {
      screen: BragSpace,
      navigationOptions: {

        showLabel: true,
        tabBarIcon: ({ focused, tintColor }) => (
          <Image
            source={focused ? IMAGES.ic_bragspace : IMAGES.ic_bragspace}
          />

        ),
        showIcon: true,
        activeIconColor: 'red'
      }
    },
    Notifications: {
      screen: NotificationGuest,
      navigationOptions: {

        showLabel: true,
        tabBarIcon: ({ focused, tintColor }) => (
          <Image
            source={focused ? IMAGES.ic_notifications : IMAGES.ic_notifications}
          />

        ),
        showIcon: true,
        activeIconColor: 'red'
      }
    },
    'My Profile': {
      header: null,
      screen: ProfileGuest,
      navigationOptions: {
        showLabel: true,
        tabBarIcon: ({ focused, tintColor }) => (
          <Image
            source={focused ? IMAGES.ic_profile : IMAGES.ic_profile}
          />

        ),

        showIcon: true,
        activeIconColor: 'red'
      }
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#fff',
      inactiveTintColor: '#8DBADD',

      style: {
        backgroundColor: '#1B75BC',
        height: 60,

      }, labelStyle: { fontSize: 12 },

    }
  }
);



 export class Dashboard extends React.Component {

static router = FooterTab.router
  constructor(props) {
    super(props)
    this.state = {
      unReadCount:0 ,
    }
  }
static updateCount()
{
   if(mContext)
   {
     mContext.setState({unReadCount:0});
   }
}


  getNotificationCount() {
    const params = {
      };

    WSManager.postData(URLConstants.MY_NOTIFICATION_LIST, params)
      .then(response => {
        var data = response.data.data;
        mContext.setState({unReadCount:data.unread_count});
      })
      .catch(error => {

        return error;
      });
  }

    componentDidMount() {
      mContext=this;
      this.subs = [
      this.props.navigation.addListener('willFocus', ()=>{
        UserProfileScreen.updateData()
        UserProfileScreen.updateFeedData()
        BragSpace.updateData()
        BragSpaceHomeScreen.updatedBalance();
        ProfileScreen.update()
        getItem(PreferenceConstant.FIRST_NAME).then((value) => {
          this.setState({ lastName: value })
          ConstantLib.FIRST_NAME=value;

         })
      }),
      ];
this.getNotificationCount();
      getItem(PreferenceConstant.SESSION_KEY).then((value) => {
          ConstantLib.SESSION_KEY=value;
      })
    }

  static navigationOptions = ({ navigation }) => {
    return {

      header: null
    };
  };

  render() {
    mContext=this;

    return (
      <View style={{ flex: 1, width: '100%', height: '100%' }}
      >
        {/* <MyStatusBar backgroundColor="rgba(0,0,0,0.0)" barStyle="light-content" /> */}

        <FooterTab navigation = {this.props.navigation}></FooterTab>
        {/* {  (ConstantLib.SESSION_KEY!==null && ConstantLib.SESSION_KEY!=='')?<FooterTab />:<NonLoginFooterTab />} */}

      </View>

    );
  }
}

 
const dashStack = createStackNavigator({
  Dashboard: {
    screen: Dashboard,
  }
}, {
  defaultNavigationOptions:{
    header:null
  }
} )
export default createAppContainer(dashStack);
// export default Dashboard
