import React, {Component} from 'react';
import {TouchableOpacity} from 'react-native';

import Home from '../screens/Home';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Forgotpassword from '../screens/Forgotpassword';
import Lobby from '../screens/Lobby';
import Lobbydetail from '../screens/Lobbydetail';
import Bragdetail from '../screens/Bragdetail';
import TabBrags from '../screens/TabBrags';
import TabRules from '../screens/TabRules';
import TabParticipants from '../screens/TabParticipants';
import TabPlayers from '../screens/TabPlayers';
import TabFixtures from '../screens/TabFixtures';
import TabFix from '../screens/TabFix';
import Verification from '../screens/Verification';
import Conference from '../screens/Conference';
import ConferenceTeam from '../screens/ConferenceTeam';
import FollowBraggers from '../screens/FollowBraggers';
import EditUserProfile from '../screens/EditUserProfile';
import Withdraw from '../screens/Withdraw';
import ChatListing from '../screens/Chat';

import { createAppContainer } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { createStackNavigator} from 'react-navigation-stack'
const Drawer = createDrawerNavigator(
  {
    Lobby: { screen: Lobby },
    Home: { screen: Home },
  },
  {
    initialRouteName: "Lobby",
    contentOptions: {
      activeTintColor: "#e91e63"
    }
  }
);

const mainNavigator = createStackNavigator({
  Drawer: {
    screen: Drawer
  },
  Home: {
    screen: Home
  },
  Login: {
    screen: Login
  },
  SignUp: {
    screen: SignUp
  },
  Forgotpassword: {
    screen: Forgotpassword
  },
  Lobby:{
    screen: Lobby
  },
  Lobbydetail:{
    screen: Lobbydetail
  },
  Bragdetail:{
    screen: Bragdetail
  },
  TabBrags:{
    screen: TabBrags
  },
  TabRules:{
    screen: TabRules
  },
  TabParticipants:{
    screen: TabParticipants
  },
  TabPlayers:{
    screen: TabPlayers
  },
  TabFixtures:{
    screen: TabFixtures
  },
  TabFix:{
    screen: TabFix
  },
  Verification:{
    screen: Verification
  },
  Conference:{
    screen: Conference
  },
  ConferenceTeam:{
    screen: ConferenceTeam
  },
  FollowBraggers:{
    screen: FollowBraggers
  },
  EditUserProfile:{
    screen: EditUserProfile
  },
  Withdraw:{
    screen: Withdraw
  },
  ChatListing:{screen:ChatListing},
},
  {
    initialRouteName: 'EditUserProfile',
  }
);

export default createAppContainer(mainNavigator)
