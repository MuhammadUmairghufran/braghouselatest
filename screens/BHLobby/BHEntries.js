import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, StatusBar, Animated, Platform, FlatList, ImageBackground }
  from 'react-native';
import { Button, Form, Item, Input, Container, Content, StyleProvider, Icon, H3, Header, Left, Right, Tab, Tabs }
  from 'native-base';
import { AppStyles, Images } from '../../Themes/';
import LinearGradient from 'react-native-linear-gradient';
import Modal from "react-native-modal";
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Participiants from '../BHLobby/Participiants';
import BHRules from '../BHLobby/BHRules'
import BragQA from '../BHLobby/BragQA';
import * as URLConstants from '../../Networking/URLConstants/';
import WSManager from '../../Networking/WSManager/';
import ConstantLib from '../../Constants/ConstantLib';
import Loader from '../../Utils/Loader/';
import Ripple from 'react-native-material-ripple';
import Toaster from '../../Utils/Toaster/';
import Utility from '../../Utils/Utility/';
import { TabBarTop } from 'react-navigation';

import { createMaterialTopTabNavigator as TabNavigator} from 'react-navigation-tabs'

let mContext = null;
const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[AppStyles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

export const CustomTab = TabNavigator({
  Brag: {
    screen: BragQA,
  },
  RULES: {
    screen: BHRules,
  },
  PARTICIPANTS: {
    screen: Participiants,

  },
}, {
  tabBarComponent: TabBarTop,
  tabBarPosition: 'top',
  initialRouteName:'Brag',
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
    Brag: {
      screen: BragQA,
    },
    RULES: {
      screen: BHRules,
    },
    PARTICIPANTS: {
      screen: Participiants,

    },
  }, {
    tabBarComponent: TabBarTop,
    tabBarPosition: 'top',
    initialRouteName:'RULES',
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
    export const CustomTab3 = TabNavigator({
      Brag: {
        screen: BragQA,
      },
      RULES: {
        screen: BHRules,
      },
      PARTICIPANTS: {
        screen: Participiants,

      },
    }, {
      tabBarComponent: TabBarTop,
      tabBarPosition: 'top',
      initialRouteName:'PARTICIPANTS',
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

export default class BHEntries extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <CustomHeader this navigation={navigation} />
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      responseData: '',
      matchData: '',
      contestId: '',
      contest_unique_id: '',
      conference_name: '',
      isFromConference: false
    }
    this.myRef = React.createRef();
  }

  render() {
    mContext = this;
    return (
      <View  >
        <Loader loading={this.state.loading} />
        <StatusBar
          translucent
          backgroundColor={'transparent'} />
      </View>
    );
  }

  componentDidMount() {
    mContext = this;
    this.subs = [
      this.props.navigation.addListener('willFocus', () => mContext = this),
    ];

    
    this.props.navigation.setParams({ customTitle: '' });

    this.setState({data:ConstantLib.DATA});
      setTimeout (() => {
        
        var contestId = this.props.navigation.getParam('contest_id', '');
        var contestUniqueId = this.props.navigation.getParam('contest_unique_id', '');
        var conferenceName = this.props.navigation.getParam('conference_name', '');
        var isFromConference = this.props.navigation.getParam('isFromConference', false);
        var isComplete = this.props.navigation.getParam('isComplete', '');
         ConstantLib.CURRENT_CONTEST_ID = '' + contestId;
        ConstantLib.CURRENT_CONTEST_UNIQUE_ID = '' + contestUniqueId;
        ConstantLib.IS_COMPLETE = ''+isComplete;

        this.setState({ contestId: contestId })
        this.setState({ contest_unique_id: contestUniqueId })
        this.setState({ conference_name: conferenceName })
        this.setState({ isFromConference: isFromConference })


        this.getContestMasterData({ contestId, contestUniqueId,});

      }, 200);

  }
static router = (ConstantLib.TabName == 'PARTICIPANTS' || ConstantLib.IS_COMPLETE == '1' )? CustomTab3.router :CustomTab.router
  componentWillUnmount()
  {
    ConstantLib.TabName = ''
  }

  getContestMasterData({ contestId, contestUniqueId }) {
    this.setState({ loading: true })
    const params = {
      contest_id: contestId,
      contest_unique_id: contestUniqueId,
    };

    WSManager.postData(URLConstants.JOIN_BRAG_MASTER_API, params)
      .then(response => {
        this.setState({ responseData: response.data.data });
        this.setState({ loading: false });
        this.setState({ matchData: response.data.data.match_list[0] })
      //  BragQA.callBackMethod(response.data.data, contestId, contestUniqueId);
       
        console.log('getContestMasterData=' + JSON.stringify(response.data.data));
        this.props.navigation.setParams({
          customTitle: 'MyTitle',
        });
      })
      .catch(error => {
        this.setState({ loading: false })
        console.log('Error= ' + JSON.stringify(error));
        return error;
      });
  }
}

const CustomHeader = ({ navigation }) => (
  <LinearGradient
    start={{ x: 0.6, y: 0 }} end={{ x: 2.5, y: 1.5 }}
    locations={[0.0, 0.4]}
    colors={['#1B75BC', '#9AD8DD']}
    style={{ paddingTop: Platform.OS === "ios" ? 30 : 20, width: '100%', height: '100%' }}>
    <View style={{ flexDirection: 'row', padding: 15, alignItems: 'center' }}>
      <TouchableOpacity onPress={() => navigation.goBack(null)} style={{ flex: 1, padding:5, justifyContent: "flex-start" }} transparent>
        <Image source={Images.back} />
      </TouchableOpacity>
      <View style={{ flex: 12, justifyContent: 'flex-start' }}>
        <View style={{ alignItems: 'center', marginRight: 25 }}>

      { mContext.state.isFromConference?
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* <Text style={AppStyles.header_title}>{mContext.state.matchData.home_team_name}</Text> */}
            <Text style={AppStyles.header_title}>{mContext.state.conference_name}</Text>
            {/* <Text style={{ fontSize: 12, opacity: 1, color: '#fff', paddingLeft: 5, paddingRight: 5, fontFamily:'SourceSansPro-Regular' }}>vs</Text>
            <Text style={AppStyles.header_title}>{mContext.state.matchData.away_team_name}</Text> */}
          </View>

          :
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={AppStyles.header_title}>{mContext.state.matchData.home}</Text>
            <Text style={{ fontSize: 12, opacity: 1, color: '#fff', paddingLeft: 5, paddingRight: 5, fontFamily:'SourceSansPro-Regular' }}>vs</Text>
            <Text style={AppStyles.header_title}>{mContext.state.matchData.away}</Text>
          </View>
          }
        </View>
        {/* <Text style={AppStyles.header_sub_title}>{Utility.getFormatedDate(mContext.state.matchData.season_scheduled_date, 'MMM Do, ddd - hh:mm A')} </Text> */}
      </View>
    </View>
    {(ConstantLib.TabName == 'PARTICIPANTS' || ConstantLib.IS_COMPLETE == '1' )?<CustomTab3 navigation = {navigation} />:<CustomTab navigation = {navigation}/>}
  </LinearGradient>
);
