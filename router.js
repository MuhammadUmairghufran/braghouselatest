import React, { Component } from "react";
import { TouchableOpacity, Image } from "react-native";

import Home from "./screens/Home";
import SignUpLogin from "./screens/Login/SignUpLogin";
import LoginWithPassword from "./screens/Login/LoginWithPassword";
import Forgotpassword from "./screens/Profile/Forgotpassword";
import Lobby from "./screens/Lobby";
import Lobbydetail from "./screens/Lobbydetail";
import TabRules from "./screens/TabRules";
import TabParticipants from "./screens/TabParticipants";
import TabPlayers from "./screens/TabPlayers";
import TabFix from "./screens/Fixtures/TabFix";
import Verification from "./screens/Signup/Verification";
import Conference from "./screens/Conference/Conference";
import ConferenceTeam from "./screens/Conference/ConferenceTeam";
import FollowBraggers from "./screens/Conference/FollowBraggers";
import EditUserProfile from "./screens/Profile/EditUserProfile";
import CreateBragScreen from "./screens/CreateBrag/CreateBragScreen";
import CreateBragScreen_ from "./screens/CreateBrag/CreateBragScreen_";
import Drawer from "./screens/Drawer/Drawer";
import VerifyOTP from "./screens/Login/VerifyOTP";
import BHEntries from "./screens/BHLobby/BHEntries";
import HotBragQA from "./screens/BHLobby/HotBragQA";
import TabBrags from "./screens/BragBoard/TabBrags";
import BragBoardParent from "./screens/BragBoard/BragBoardParent";
import NotificationsScreen from "./screens/Notifications/NotificationsScreen";
import BragSpaceLobbyGuestScreen from "./screens/Lobby/BragSpaceLobbyGuestScreen";
import Comments from "./screens/Lobby/Comments";
import LikersList from "./screens/Lobby/LikersList";
import BragSpaceHomeScreen from "./screens/Lobby/BragSpaceHomeScreen";
import BHLobbyScreen from "./screens/BHLobby/BHLobbyScreen";
import BHLobbyDetail from "./screens/BHLobby/BHLobbyDetail";
import BragSpace from "./screens/BHLobby/BragSpace";
import ShareBragScreen from "./screens/Share/ShareBragScreen";
import CreatePost from "./screens/feed/createPost";

import CreatePost_ from "./screens/feed/createPost_";
import ProfileScreen from "./screens/Profile/ProfileScreen";
import OtherUserTeams from "./screens/Profile/OtherUserTeams";
import OtherProfileScreen from "./screens/Profile/OtherProfileScreen";
import SignUpPhone from "./screens/Login/SignUpPhone";
import SignUp from "./screens/Signup/SignUp";
import SplashScreen from "./screens/SplashScreen";
import PrivacyPolicyWebView from "./screens/PrivacyPolicyWebView/";
import ConferenceTeamHome from "./screens/Conference/ConferenceTeamHome";
import SearchParent from "./screens/search/SearchParent";
import CommentMedia from "./screens/Lobby/CommentMedia";

import Dashboard from "./screens/Dashboard";

import TransactionsScreenContainer from "./screens/Transactions/TransactionsScreenContainer";
import TransactionsHistory from "./screens/Transactions/TransactionsHistory";
import ThankYouAfterPurchase from "./screens/ThankYouAfterPurchase";
import WellDoneAfterCreatingBrag from "./screens/WellDoneAfterCreatingBrag";

import UserProfileScreen from "./screens/Profile/UserProfileScreen";
import UserProfileBasicInfo from "./screens/Profile/UserProfileBasicInfo";
import OtherUserProfileScreen from "./screens/Profile/OtherUserProfileScreen";
import MyBrags from "./screens/Brags/MyBrags/MyBrags";
import PostDetail from "./screens/feed/PostDetail";
import Help from './screens/Help'

import { AppStyles, Images } from "././Themes";

import {  createAppContainer} from 'react-navigation'
import { createStackNavigator} from 'react-navigation-stack'
import { createBottomTabNavigator} from 'react-navigation-tabs'
import ForgotPasswordVerification from "./screens/Profile/ForgotPasswordVerification";
import ChangePassword from "./screens/Profile/ChangePassword";
import TeamFixtures from "./screens/BHLobby/TeamFixtures";
import MatchFixtures from "./screens/BHLobby/MatchFixtures";
import UselessTextInput from "./screens/UselessTextInput";
import NewsDetail from "./screens/BHLobby/NewsDetail";
import Invite from "./screens/CreateBrag/Invite";
import JoinBragsByCode from "./screens/CreateBrag/JoinBragsByCode";
import TeamDetail from "./screens/TeamPage/TeamDetail";
import PlayerCard from "./screens/TeamPage/PlayerCard";
import Withdraw from './screens/Transactions/Withdraw';
import ChatScreen from './screens/Chat/ChatScreen';
import ChatListing from './screens/Chat/ChatListing';

const MainNavigator =  createStackNavigator(
  {
    Drawer: {
      screen: Drawer,
      navigationOptions:{
        header:null
      }
      
    },
    Home: {
      screen: Home,
      navigationOptions:{
        header:null
      }
      
    },

    SignUpLogin: {
      screen: SignUpLogin
    },

    Forgotpassword: {
      screen: Forgotpassword
    },

    Lobby: {
      screen: Lobby
    },

    Lobbydetail: {
      screen: Lobbydetail
    },

    TabRules: {
      screen: TabRules
    },

    TabParticipants: {
      screen: TabParticipants
    },

    TabPlayers: {
      screen: TabPlayers
    },

    TabFix: {
      screen: TabFix
    },

    Verification: {
      screen: Verification
    },

    Conference: {
      screen: Conference
    },

    ConferenceTeam: {
      screen: ConferenceTeam
    },

    FollowBraggers: {
      screen: FollowBraggers
    },

    EditUserProfile: {
      screen: EditUserProfile
    },

    BragBoardParent: {
      screen: BragBoardParent
    },

    NotificationsScreen: {
      screen: NotificationsScreen
    },

    BragSpaceLobbyGuestScreen: {
      screen: BragSpaceLobbyGuestScreen
    },

    BragSpaceHomeScreen: {
      screen: BragSpaceHomeScreen
    },
    Comments: {
      screen: Comments
    },
    LikersList: {
      screen: LikersList
    },
    BHEntries: {
      screen: BHEntries
    },
    HotBragQA: {
      screen: HotBragQA
    },

    TabBrags: {
      screen: TabBrags
    },

    BHLobbyScreen: {
      screen: BHLobbyScreen
    },
    BHLobbyDetail: {
      screen: BHLobbyDetail
    },
    BragSpace: {
      screen: BragSpace
    },
    Dashboard: {
      screen: Dashboard
    },

    LoginWithPassword: {
      screen: LoginWithPassword
    },

    VerifyOTP: {
      screen: VerifyOTP
    },

    CreateBragScreen: {
      screen: CreateBragScreen
    },
    CreateBragScreen_: {
      screen: CreateBragScreen_
    },

    WellDoneAfterCreatingBrag: {
      screen: WellDoneAfterCreatingBrag
    },

    UserProfileScreen: {
      screen: UserProfileScreen
    },
    UserProfileBasicInfo: {
      screen: UserProfileBasicInfo
    },
    OtherUserProfileScreen: {
      screen: OtherUserProfileScreen
    },

    ShareBragScreen: {
      screen: ShareBragScreen
    },

    ProfileScreen: {
      screen: ProfileScreen
    },
    OtherUserTeams: {
      screen: OtherUserTeams
    },
    OtherProfileScreen: {
      screen: OtherProfileScreen
    },

    SignUpPhone: {
      screen: SignUpPhone
    },

    SignUp: {
      screen: SignUp
    },

    TransactionsScreenContainer: {
      screen: TransactionsScreenContainer
    },

    SplashScreen: {
      screen: SplashScreen,
      navigationOptions:{
        header:null
      }
      
    },

    TransactionsHistory: {
      screen: TransactionsHistory
    },

    PrivacyPolicyWebView: {
      screen: PrivacyPolicyWebView
    },

    MyBrags: {
      screen: MyBrags
    },

    CreatePost: {
      screen: CreatePost
    },
    CreatePost_: {
      screen: CreatePost_
    },
    
    ForgotPasswordVerification: {
      screen: ForgotPasswordVerification
    },

    ChangePassword: {
      screen: ChangePassword
    },

    TeamFixtures: {
      screen: TeamFixtures
    },
    MatchFixtures: {
      screen: MatchFixtures
    },
    UselessTextInput: {
      screen: UselessTextInput
    },
    ConferenceTeamHome: {
      screen: ConferenceTeamHome
    },
    NewsDetail: {
      screen: NewsDetail
    },
    Invite: {
      screen: Invite
    },
    JoinBragsByCode: {
      screen: JoinBragsByCode
    },
    SearchParent: {
      screen: SearchParent
    },
    PostDetail: {
      screen: PostDetail
    },
    TeamDetail: {
      screen: TeamDetail
    },
    PlayerCard: {
      screen: PlayerCard
    },
    CommentMedia: {
      screen: CommentMedia
    },
    Help: {
      screen: Help
    },
    Withdraw:{
      screen: Withdraw
    },
    ChatScreen:{
      screen: ChatScreen,
    },
    ChatListing:{
      screen: ChatListing,
    },
  },
  {
    initialRouteName: "SplashScreen",
    defaultNavigationOptions:{
      header:null
    },
  
  }
);


export default createAppContainer(MainNavigator);
