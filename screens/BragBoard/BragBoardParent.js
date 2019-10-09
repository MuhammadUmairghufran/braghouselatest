import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, Platform, FlatList, RefreshControl, StatusBar,SafeAreaView } from 'react-native';
import { List } from 'native-base';
import Ripple from 'react-native-material-ripple';
import { NavigationActions,StackActions } from 'react-navigation';
import {DrawerActions} from 'react-navigation-drawer'
import IMAGES from '../../Constants/Images/';
import * as String from '../../Constants/Strings/';
import * as Color from '../../Themes/Colors/';
import AppStyles from '../../Themes/AppStyles';
import Utility from '../../Utils/Utility/';
import Toaster from '../../Utils/Toaster/';
import WSManager from '../../Networking/WSManager/';
import { Container, Header, Content, Label, Input, ActionSheet } from 'native-base';
import * as URLConstants from '../../Networking/URLConstants';
import ConstantLib from '../../Constants/ConstantLib';
import Loader from '../../Utils/Loader/';
import LinearGradient from 'react-native-linear-gradient';
import { getItem, saveItem } from '../../lib/Session';
import PreferencesConstant from '../../Preferences/PreferenceConstant'
import { Images } from '../../Themes';
import MyBragBoardForWeek from './MyBragBoardForWeek';
import MyBragBoardOverAll from './MyBragBoardOverAll';
import { TabBarTop } from 'react-navigation';

import { createMaterialTopTabNavigator as TabNavigator} from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack';


const CustomTab = TabNavigator({
  'THIS WEEK': {
    screen: MyBragBoardForWeek,
  },
  'ALL TIME': {
    screen: MyBragBoardOverAll,
  },

},{
  initialRouteName: "THIS WEEK",
  tabBarComponent: TabBarTop,
  tabBarPosition: 'top',
  animationEnabled: true,
  swipeEnabled: true,
  initialRouteName: 'ALL TIME',
  

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



export default class BragBordParent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      refreshing: false,
      notificationList: [],
      canLoadMoreContent: false,
      currentPage: 1,
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };
  static router = CustomTab.router

  render() {
    mContext = this;
    return (
      <View style={AppStyles.Wrapper}>
         <StatusBar
                  translucent
                  backgroundColor={'transparent'}  />
              <LinearGradient
                start={{ x: 0.6, y: 0 }} end={{ x: 2.5, y: 1.5 }}
                locations={[0.0, 0.4]}
                colors={['#1B75BC', '#9AD8DD']}
                style={{ paddingTop: Platform.OS === "ios" ? 30 : 20,height:'100%',  width:'100%' }}>
                 <View style={{ flexDirection: 'row', paddingBottom: 15, marginLeft: 0, paddingTop: Platform.OS === "ios" ? 20 : 20 }}>
          <View style={{ flex: 1, paddingRight: 0, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent'}}>
          <Text style={AppStyles.header_title}>BRAGBOARD</Text>
            </View>
            <TouchableOpacity style={{ position: "absolute", flex: 0, padding: 10, justifyContent: 'center',alignSelf: 'center', backgroundColor: 'transparent' }}  onPress={() => WSManager.getTopLevelNavigator().dispatch(DrawerActions.openDrawer())} >
              <Image source={IMAGES.ic_drawer_menu} />
            </TouchableOpacity>
            
          </View>

                <CustomTab navigation = {this.props.navigation} />
              </LinearGradient>

      </View>
    );
  }



  componentDidMount() {
    mContext = this;
    this.subs = [
      this.props.navigation.addListener('willFocus', () => mContext = this),
    ];

  }

  componentWillUnmount() {
    this.subs.forEach((sub) => {
      sub.remove(); DrawerActions
    });
  }
}

