import React, {Component} from 'react';
import {Dimensions} from 'react-native';
import { DrawerItems } from 'react-navigation';
import { createDrawerNavigator as DrawerNavigator} from 'react-navigation-drawer'
import { createStackNavigator} from 'react-navigation-stack'
import DrawerContent from './DrawerContent'
import BragSpaceHomeScreen from '../Lobby/BragSpaceHomeScreen';
import Dashboard from '../Dashboard';
import BragBoardParent from '../BragBoard/BragBoardParent';
import NotificationsScreen from '../Notifications/NotificationsScreen';
import CreateBragScreen from '../CreateBrag/CreateBragScreen';
import JoinBragsByCode from '../CreateBrag/JoinBragsByCode';
import PrivacyPolicyWebView from '../PrivacyPolicyWebView';
import Conference from '../Conference/Conference';
import ConferenceHome from '../Conference/ConferenceHome';
import ConferenceTeam from '../Conference/ConferenceTeam';
import SignUpLogin from '../Login/SignUpLogin';
import TransactionsScreenContainer from '../Transactions/TransactionsScreenContainer';
import CreatePost from '../feed/createPost';
import Forgotpassword from '../Profile/Forgotpassword';
import Invite from '../CreateBrag/Invite';
import SearchParent from '../search/SearchParent';
import ReferFriends from '../Share/ReferFriends';
import MyBrags from '../Brags/MyBrags/MyBrags'
import Help from '../Help'
import ChatScreen from '../Chat/ChatScreen';



  const windowWidth = Dimensions.get('window').width;

export default DrawerNavigator(
  {

    Dashboard:{
      screen: createStackNavigator({
        screen:Dashboard,
      }, {
        defaultNavigationOptions:{
          header:null
        }
      })
    },
    BragSpaceHomeScreen:{
      screen: createStackNavigator({
        screen:BragSpaceHomeScreen
      })
    },
    BragBoardParent:{
      screen: createStackNavigator({
        screen:BragBoardParent
      })
    },
    NotificationsScreen:{
      screen: createStackNavigator({
        screen:NotificationsScreen
      })
    },
    CreateBragScreen:{
      screen: createStackNavigator({
        screen:CreateBragScreen
      })
    },
    CreatePost:{
        screen: createStackNavigator({
          screen:CreatePost
        })
      },
    ConferenceHome:{
      screen: createStackNavigator({
        screen:ConferenceHome
      })
    },
    TransactionsScreenContainer:{
      screen: createStackNavigator({
        screen:TransactionsScreenContainer
      })
    },
    ConferenceTeam:{
      screen: createStackNavigator({
        screen:ConferenceTeam
      })
    },
    SignUpLogin:{
      screen: createStackNavigator({
        screen:SignUpLogin
      })
    },
    PrivacyPolicyWebView:{
      screen: createStackNavigator({
        screen:PrivacyPolicyWebView
      })
    },
    JoinBragsByCode:{
      screen: createStackNavigator({
        screen:JoinBragsByCode
      })
    },
    Invite:{
      screen: createStackNavigator({
        screen:Invite
      })
    },
    SearchParent:{
      screen: createStackNavigator({
        screen:SearchParent
      })
    },
    ReferFriends:{
      screen: createStackNavigator({
        screen:ReferFriends
      })
    },
    ChatScreen:{
      screen: createStackNavigator({
        screen:ChatScreen
      })
    },
    
    MyBrags:{
      screen: createStackNavigator({
        screen:MyBrags
      })
    },
    Help: {
      screen: createStackNavigator({
        screen:Help
      })
    },
  },


  {
    contentComponent: DrawerContent,
    drawerWidth: windowWidth,
    drawerPosition: 'left',
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',

  });
