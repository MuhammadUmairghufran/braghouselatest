import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, StatusBar, Animated, Platform, FlatList, ImageBackground }
  from 'react-native';
import { Button, Form, Item, Input, Container, Content, StyleProvider, Icon, H3, Header, Left, Right, Tab, Tabs }
  from 'native-base';
import { AppStyles, Images } from '../../../Themes'
import LinearGradient from 'react-native-linear-gradient';
import Modal from "react-native-modal";
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Participiants from '../../BHLobby/Participiants'// BHLobby/Participiants';
import UpcomingBrags from '../../Brags/MyBrags/UpcomingBrags';
import Completed from '../../Brags/MyBrags/Completed';
import Live from '../../Brags/MyBrags/Live';
import  WSManager  from '../../../Networking/WSManager';
import { NavigationActions } from 'react-navigation';
import {DrawerActions} from 'react-navigation-drawer'
import { TabBarTop } from 'react-navigation';
import { createMaterialTopTabNavigator as TabNavigator} from 'react-navigation-tabs'

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[AppStyles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);



export const CustomTab = TabNavigator({
  Upcoming: {
    screen: UpcomingBrags,
  },
  Live: {
    screen: Live,
  },
  Completed: {
    screen: Completed,
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
  // static router = CustomTab.router
  <LinearGradient
    start={{ x: 0.6, y: 0 }} end={{ x: 2.5, y: 1.5 }}
    locations={[0.0, 0.4]}
    colors={['#1B75BC', '#9AD8DD']}
    style={{ paddingTop: Platform.OS === "ios" ? 30 : 20, height:'100%', width:'100%' }}>
    <View style={{ flexDirection: 'row', paddingBottom: 15, marginLeft: 0, paddingTop: Platform.OS === "ios" ? 20 : 20 }}>
          <View style={{ flex: 1, paddingRight: 0, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent'}}>
          <Text style={AppStyles.header_title}>My Brags</Text>
            </View>
            <TouchableOpacity style={{ position: "absolute", flex: 0, padding: 10, justifyContent: 'center',alignSelf: 'center', backgroundColor: 'transparent' }}  onPress={() => WSManager.getTopLevelNavigator().dispatch(DrawerActions.openDrawer())} >
              <Image source={Images.ic_drawer_menu} defaultSource = {Images.ic_drawer_menu} />
            </TouchableOpacity>
            
          </View>

    <CustomTab navigation = {navigation} />
  </LinearGradient>
);

export default class MyBrags extends Component {
static router = CustomTab.router
  static navigationOptions = ({ navigation }) => {
    return {
      header: <CustomHeader this navigation={navigation} />

    };
  };

  render() {
    return (
      <View>
        <MyStatusBar backgroundColor="rgba(0,0,0,0)" barStyle="light-content" />
      </View>
    );
  }
}
