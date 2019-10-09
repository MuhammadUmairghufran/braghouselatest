import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Dimensions, TouchableOpacity, Image,StatusBar,Animated,Platform ,FlatList,ImageBackground,Thumbnail,RefreshControl} from 'react-native';
import { Button, Form, Item, Input, Container, Content, StyleProvider, Icon, H3 ,Header,Left, Right,Body}
from 'native-base';
import {AppStyles, Images} from '../../Themes/';
import { NavigationActions } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import Modal from "react-native-modal";
import * as URLConstants from '../../Networking/URLConstants/';
import WSManager from '../../Networking/WSManager/';
import ConstantLib from '../../Constants/ConstantLib';
import Loader from '../../Utils/Loader/';
import Ripple from 'react-native-material-ripple';
import Toaster from '../../Utils/Toaster/';
 import Utility from '../../Utils/Utility/';
import PreferenceConstant,{UserCurrentBalancePreferenceConstant} from '../../Preferences/PreferenceConstant'
import { getItem } from '../../lib/Session';
import { TabBarTop } from 'react-navigation';
// import { createMaterialTopTabNavigator as TabNavigator} from 'react-navigation-tabs'
export default class GameInfo extends Component {
  constructor(props) {
      super(props);
      this.state = {
        loading:false,
        refreshing: false,
        users:[],
        notifyDataChange:false,
        contest_id: '',
        contest_unique_id: '',
        responseData: '',
      }
  }


  render() {

    return (
         <View>
        </View>
     );
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this.setState({currentPage:1});
     this.getContestMasterData(false);
  }

  componentDidMount() {
         mContext = this;

   }

}
