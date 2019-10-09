import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, StatusBar, Animated, Platform, FlatList, ImageBackground, SafeAreaView }
  from 'react-native';
import { Button, Form, Item, Input, Container, Content, StyleProvider, Icon, H3, Header, Left, Right, Tab, Tabs }
  from 'native-base';
import { AppStyles, Images } from '../../Themes/';
import LinearGradient from 'react-native-linear-gradient';
import Modal from "react-native-modal";
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import BHLobbyDetail from '../BHLobby/BHLobbyDetail';
import Teams from '../BHLobby/Teams';
import TabNews from '../BHLobby/TabNews';
import TeamBrags from '../TeamPage/TeamBrags';
import TeamFollower from '../TeamPage/TeamFollower';
import Players from '../TeamPage/Players';
import { TabBarTop } from 'react-navigation';
import { createMaterialTopTabNavigator as TabNavigator} from 'react-navigation-tabs'
import ConstantLib from '../../Constants/ConstantLib/';
import { getItem, saveItem } from '../../lib/Session';
import PreferenceConstant from '../../Preferences/PreferenceConstant';
import * as URLConstants from '../../Networking/URLConstants/';
import WSManager from '../../Networking/WSManager/';
const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[AppStyles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);
export const CustomTab = TabNavigator({
  PLAYERS: {
    screen: Players,
  },
  'TEAM BRAGS': {
    screen: TeamBrags,
  },
  FOLLOWERS: {
    screen: TeamFollower,
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

export const CustomTab2 = TabNavigator({
  'TEAM BRAGS': {
    screen: TeamBrags,
  },
  PLAYERS: {
    screen: Players,
  },
  FOLLOWERS: {
    screen: TeamFollower,
  },

}, {
  tabBarComponent: TabBarTop,
  initialRouteName:'PLAYERS',
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
      color: '#ffffff',
      alignSelf: 'center'
    },

    indicatorStyle:
    {
      backgroundColor: '#FFFFFF',
      height: 2
    }


  },
  }
);
const CustomHeader = ({ navigation }) => (
  <LinearGradient
    start={{ x: 0.6, y: 0 }} end={{ x: 2.5, y: 1.5 }}
    locations={[0.0, 0]}
    colors={['#1B75BC', '#9AD8DD']}
    style={{ paddingTop: Platform.OS === "ios" ? 30 : 20 }}
  >

  </LinearGradient>
);

export default class TeamDetail extends Component {


  constructor(props)
  {
    super(props);

    this.state = {
      teamLeagueId:'',
      teamDetails:''
    }
  }
  async componentDidMount() {
    setTimeout(() => {
      this.setState({ activePage: 0 })
    }, 0)

    if (ConstantLib.DATA2 != null && ConstantLib.DATA2 != 'null' && ConstantLib.DATA2 != '')
    {
      console.log('teamleague1:',ConstantLib.DATA2.team_league_id)
      this.setState({teamLeagueId:ConstantLib.DATA2.team_league_id}, function()
        {
          this.getTeamDetailFromAPI(ConstantLib.DATA2.team_league_id)
        })
    }
    else
    {
      const team_league_id = this.props.navigation.getParam('team_league_id')
      console.log('teamleague:',team_league_id)
      if (team_league_id != null && team_league_id != 'null' & team_league_id != '')
      {
        this.setState({teamLeagueId:team_league_id}, function()
        {
          this.getTeamDetailFromAPI(team_league_id)
        })
      }
      
    }
  }

  

  componentWillUnmount()
  {
    ConstantLib.DATA2 = ''
  }

  getTeamDetailFromAPI(team_league_id)
  {
    const params = {

      team_league_id:team_league_id,
    
    };
    WSManager.postData(URLConstants.GET_TEAM_DETAIL, params)
    .then(response => {

      responseData = response.data.data
      this.setState({teamDetails:responseData}, function()
      {
        console.log('Team Details',responseData)
      })
         
    })
    .catch(error => {
        
       // Toaster.showLongToast('Error:'+error.message);
      return error;
    });

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


            <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 20 }}>
              <TouchableOpacity style={{ paddingLeft: 4, paddingRight: 4, marginLeft: 10 }} onPress={() => this.props.navigation.goBack(null)} >
                <Image source={Images.back} />
              </TouchableOpacity>

            </View>
            <View style={{ alignItems: 'center', paddingTop: 10, paddingBottom: 10 }}>
              <View style={{ width: 72, backgroundColor: '#415561', height: 72, borderRadius: 5 }}>
                <Image source={{uri: this.state.teamDetails.flag}} resizeMode={'contain'} style={{ width: 72, height: 72, }} />
              </View>


              <H3 style={{ marginTop: 14, fontSize: 22, color: '#FFFFFF' }}>{this.state.teamDetails.team_name}</H3>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'center' }}>
                <Text style={{ color: '#FFFFFF', fontSize: 14, fontFamily:'SourceSansPro-Regular' }}>{this.state.teamDetails.follower_count} Followers</Text>
              </View>
            </View>

            <CustomTab screenProps = {{teamDetails:this.state.teamDetails}} navigation = {this.props.navigation}/>
          </LinearGradient>

        </View>
      </View >
    );
  }
}
