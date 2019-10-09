import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View,SafeAreaView, Dimensions, TouchableOpacity, Image, StatusBar, Animated, Platform, FlatList, ImageBackground }
  from 'react-native';
import { Button, Form, Item, Input, Container, Content, StyleProvider, Icon, H3, Header, Left, Right, Tab, Tabs }
  from 'native-base';
import { AppStyles, Images } from '../../Themes/';
import * as IMAGES from '../../Constants/Images';
import LinearGradient from 'react-native-linear-gradient';
import Modal from "react-native-modal";
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import SearchPeople from './SearchPeople'
import SearchTeams from './SearchTeams';
import SearchStyle from './SearchStyle';
import * as URLConstants from '../../Networking/URLConstants/';
import WSManager from '../../Networking/WSManager/';
import ConstantLib from '../../Constants/ConstantLib';
import Loader from '../../Utils/Loader/';
import Ripple from 'react-native-material-ripple';
import Toaster from '../../Utils/Toaster/';
import Utility from '../../Utils/Utility/';
import { TabBarTop } from 'react-navigation';
import { createMaterialTopTabNavigator as TabNavigator} from 'react-navigation-tabs'

import {DrawerActions} from 'react-navigation-drawer'
import SearchInput, { createFilter } from 'react-native-search-filter';

let mContext = null;
export const CustomTab = TabNavigator({
  PEOPLE: {
    screen: SearchPeople,
  },
  TEAMS: {
    screen: SearchTeams,
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
      alignSelf: 'center',
      fontFamily:'SourceSansPro-Bold',
    },

    indicatorStyle:
    {
      backgroundColor: '#FFFFFF',
      height: 2
    }


  },
  });

export default class SearchParent extends Component {
  static router = CustomTab.router
  static navigationOptions = ({ navigation }) => {
    return {
      header: <CustomHeader this navigation={navigation} />
    };
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      searchText:'',
      currentPage:-1,
      searchResultForUsers:[],
      searchResultForTeams:[],
    }
  }

  render() {
    mContext = this;
    return (
      <View style={[AppStyles.Wrapper, { backgroundColor: '#fff' }]}>
          <View style={{ flex: 1 }} >
                <Loader loading={this.state.loading} />
                <StatusBar
                  translucent
                  backgroundColor={'transparent'} />
           </View>
      </View>
    );
  }

  componentDidMount() {
    mContext = this;


    this.subs = [
      this.props.navigation.addListener('willFocus', () => {
        mContext = this;
        this.getSearchResult(mContext.state.searchText);
       }),
    ];

  }

  
  

  searchUpdated(term) {
        
      if(term.length>=3)
      {
      if(this.timeout) clearTimeout(this.timeout);

      this.timeout = setTimeout(function () {
        mContext.setState({searchText:term.trim()})
        mContext.getSearchResult(term.trim());
      }, 500);

      this.props.navigation.setParams({
        'searchText': term,
      });
      }
  }

  blankData=async () => {
  }

  loadmoreData=async () => {
      getSearchResult(mContext.state.searchText);
  }


  getSearchResult(term) {

    this.setState({ loading: true })
    const params = {
      search_keyword: term,
      offset:1,
      limit:150,
    };

    WSManager.postData(URLConstants.SEARCH_PEOPLE_TEAM_API, params)
      .then(response => {
        this.setState({ loading: false });
        var mUserList = response.data.data.user_list;
        var mTeamList = response.data.data.team_list;
        this.setState({ searchResultForUsers: mUserList});
        this.setState({ searchResultForTeams:mTeamList });

        console.log('getSearchResult team_list=' + JSON.stringify(response.data.data.team_list));
        console.log('getSearchResult user_list=' + JSON.stringify(response.data.data.user_list));
        SearchPeople.reloadList(mUserList);
        SearchTeams.reloadList(mTeamList);

      })
      .catch(error => {
        this.setState({ loading: false })
        console.log('Error= ' + JSON.stringify(error));
        return error;
      });
  }

    onSearchClear(){
      if(this.state.searchText!==''){
      this.props.navigation.setParams({
        'searchText': '',
      });
       mContext.setState({searchText:''});
       this.getSearchResult('');
     }
    }
}

const CustomHeader = ({ navigation }) => (
  <LinearGradient
    start={{ x: 0.6, y: 0 }} end={{ x: 2.5, y: 1.5 }}
    locations={[0.0, 0.4]}
    colors={['#1B75BC', '#9AD8DD']}
    style={{ paddingTop: Platform.OS === "ios" ? 30 : 20, width: '100%', height: '100%' }}>
    <View style={{ flexDirection: 'row', padding: 15, alignItems: 'center' }}>
          <TouchableOpacity onPress={() => {
            mContext.setState({searchText:''})
            WSManager.getTopLevelNavigator().dispatch(DrawerActions.openDrawer())}} style={{  padding:5, justifyContent: "flex-start" }} transparent>
            <Image source={Images.ic_drawer_menu} />
          </TouchableOpacity>
          <View style={SearchStyle.search_box_container}>
                           <View style={SearchStyle.search_box}>
                                <SearchInput
                                     ref={term => {mContext.textInput = term }}
                                     style={SearchStyle.search_input_box}
                                     value={navigation.getParam('searchText','')}
                                     onChangeText={(term) => {mContext.searchUpdated(term)}}
                                     placeholder="Search People & Team"
                                     placeholderTextColor="#FFFFFF"
                                     searchTextColor="#FFFFFF"
                                     throttle={1000}
                                   />
                                   <TouchableOpacity style={SearchStyle.search_parent} onPress={()=>mContext.onSearchClear()} >
                                       <Image style={SearchStyle.search_clear} source={Images.ic_clear} />
                                   </TouchableOpacity>
                           </View>


          </View>
    </View>

    <CustomTab navigation = {navigation}/>
  </LinearGradient>
);
