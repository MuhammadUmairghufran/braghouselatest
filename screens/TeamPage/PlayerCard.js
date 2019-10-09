import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, Animated, Platform, FlatList, ImageBackground, Thumbnail, RefreshControl, SafeAreaView, StatusBar } from 'react-native';
import { Button, Form, Item, Input, Container, Content, StyleProvider, Icon, H3, Header, Left, Right, Body }
  from 'native-base';
import { AppStyles, Images } from '../../Themes/';
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
import PreferenceConstant, { UserCurrentBalancePreferenceConstant } from '../../Preferences/PreferenceConstant'
import { getItem } from '../../lib/Session';
import { TabBarTop } from 'react-navigation';
import { createMaterialTopTabNavigator as TabNavigator} from 'react-navigation-tabs'
import GameLogs from './GameLogs';
import GameInfo from './GameInfo';
import IMAGES from '../../Constants/Images';

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[AppStyles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);
export const CustomTab = TabNavigator({

  'GAME LOGS': {
    screen: GameLogs,
  }
}, {
  tabBarComponent: TabBarTop,
  tabBarPosition: 'top',
  animationEnabled: true,
  swipeEnabled: true,

  tabBarOptions: {
    activeTintColor: '#ffffff',
    inactiveTintColor: '#ffffff60',
    allowFontScaling: false,
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
      alignSelf: 'flex-start',

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
    locations={[0.0, 0]}
    colors={['#1B75BC', '#9AD8DD']}
    style={{ paddingTop: Platform.OS === "ios" ? 30 : 20 }}
  >

  </LinearGradient>
);

export default class PlayerCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      refreshing: false,
      users: [],
      notifyDataChange: false,
      contest_id: '',
      contest_unique_id: '',
      responseData: '',
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };
  static router = CustomTab.router
  render() {

    return (
      <View style={[AppStyles.Wrapper, { backgroundColor: '#fff' }]}>
        <View style={{ flex: 1 }} >
          <MyStatusBar backgroundColor="rgba(0,0,0,0)" barStyle="light-content" />
          <LinearGradient
            start={{ x: 0.6, y: 0 }} end={{ x: 2.5, y: 1.5 }}
            locations={[0.0, 0.4]}
            colors={['#1B75BC', '#9AD8DD']}
            style={{ paddingTop: Platform.OS === "ios" ? 30 : 20, width: '100%', height: '100%' }}>
              <TouchableOpacity style = {{paddingTop:25, paddingLeft:25 }} onPress = {() => this.props.navigation.goBack(null)}>
              <Image source = {IMAGES.back} style = {{width: 25, height: 25}}></Image>
            </TouchableOpacity>
            <View style={{ flexDirection: "column", height: 150, paddingTop:5, width: '100%', backgroundColor: 'transparent', justifyContent: "center", alignItems: 'center' }}>
            
              <View style={{ width: 100, backgroundColor: 'transparent', alignItems: 'center', justifyContent: 'center' }}>
                <Image style={{ width: 80, height: 80, borderRadius: 40 }} source={{uri:ConstantLib.playerDetails.jersey}}></Image>
              </View>
              <View style={{ flex: 1, backgroundColor: 'transparent', paddingTop:10 }}>
                <View style={{ flex: 0 }}>
                  <Text style = {{fontFamily:'SourceSansPro-Regular', fontWeight: 'bold', color: '#FFFFFF', fontSize: 18}}>{ConstantLib.playerDetails.full_name}</Text>
                </View>

                <View>
                <Text style = {{ alignSelf: 'center', fontFamily:'SourceSansPro-Regular', fontWeight: 'bold', color: '#F3F3F390', fontSize: 14}}>{ConstantLib.playerDetails.team_name+','+ConstantLib.playerDetails.position}</Text>
                </View>
              </View>
            </View>

            <CustomTab navigation = {this.props.navigation}/>
          </LinearGradient>

        </View>
      </View >
    );
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    this.setState({ currentPage: 1 });
    this.getContestMasterData(false);
  }

  componentDidMount() {
    mContext = this;

  }

}
const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.2)'
  }
});
