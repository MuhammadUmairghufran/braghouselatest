import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, StatusBar, Animated, Platform, FlatList, ImageBackground, Thumbnail, RefreshControl } from 'react-native';
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



export default class UserFollowers extends Component {


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
      teamLeagueId: '',
    }
  }

  moveToOthersProfile(user_id) {

    const navigateAction = NavigationActions.navigate({
      routeName: 'OtherProfileScreen',
      params: { 'user_id': user_id },
      action: NavigationActions.navigate({ routeName: 'OtherProfileScreen' })
    })
    const nav = WSManager.getTopLevelNavigator()
    nav.dispatch(navigateAction)
  }


  moveToUserOwnProfile(user_id) {

    const navigateAction = NavigationActions.navigate({
      routeName: 'ProfileScreen',
      params: { 'isFromBottomTab': false },

    })
    const nav = WSManager.getTopLevelNavigator()
    nav.dispatch(navigateAction)

  }


  render() {

    return (
      <View style={{ backgroundColor: 'white', width: '100%', height: '100%' }}>

        <Loader loading={this.state.loading} />

        <FlatList
          extraData={this.state}
          style={{ backgroundColor: 'white' }}
          data={this.state.users}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
          renderItem={({ item, index }) =>
            <View  style={AppStyles.Conference}>
              <Ripple onPress={() => (getItem(PreferenceConstant.USER_ID).then((value) => {
              (value != item.user_id) ? this.moveToOthersProfile(item.user_id) : this.moveToUserOwnProfile(item.user_id);
            }))}>
            
                <Image style={AppStyles.Conference_item_image}
                  source={item.image === null || item.image === '' || item.image === 'null' ? Images.default_user : { uri: item.image }} />
              </Ripple>
              <Ripple onPress={() => (getItem(PreferenceConstant.USER_ID).then((value) => {
              (value != item.user_id) ? this.moveToOthersProfile(item.user_id) : this.moveToUserOwnProfile(item.user_id);
            }))}>
                <Text style={AppStyles.Conference_item_text}>{item.first_name + ' ' + item.last_name}</Text>
                <Text style={{ fontFamily: 'SourceSansPro-Regular', flex: 1, fontSize: 12, color: '#989898', paddingLeft: 10, justifyContent: 'flex-start' }}>Ranking {item.user_rank}</Text>
                {/* <Text style={{ fontFamily: 'SourceSansPro-Regular', flex: 1, fontSize: 12, color: '#989898', paddingLeft: 10, justifyContent: 'flex-start' }}>Ranking {item.user_rank}  |  {item.bid_amount} Brag Points</Text> */}
              </Ripple>

              <View style={{ justifyContent: 'flex-end', flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ backgroundColor: '#e6e6e6', borderRadius: 10, alignItems: 'center' }}>
                </View>

                {(item.user_id !== ConstantLib.USER_ID) &&
                  (
                    (item.is_follow == '0') ?
                      <Button onPress={() => this.followUsers(index)} transparent style={{borderWidth: 1, borderColor: '#E2E2E2', borderRadius: 13, height: 26, width: 70, justifyContent: 'center'}}>
                        <Text style={{ fontSize: 10, color: '#666666', paddingLeft: 7, paddingRight: 7, fontFamily: 'SourceSansPro-Regular' }}>FOLLOW</Text>
                      </Button>
                      :
                      <Button onPress={() => this.followUsers(index)} transparent style={{borderWidth: 1, borderColor: '#E2E2E2', borderRadius: 13, height: 26, width: 70, justifyContent: 'center'}}>
                        <Text style={{ fontSize: 10, color: '#1CBB04', paddingLeft: 7, paddingRight: 7, fontFamily: 'SourceSansPro-Regular' }}>FOLLOWING</Text>
                      </Button>
                  )
                }
              </View>
            </View>
          }
        />
      </View>
    );
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    this.setState({ currentPage: 1 });
    this.getContestMasterData(false, ConstantLib.USER_ID);
  }

  componentDidMount() {
    mContext = this;
    this.subs = [
      this.props.navigation.addListener('willFocus', () => mContext = this),
    ];
    this.setState({ contest_id: ConstantLib.CURRENT_CONTEST_ID })
    this.setState({ contest_unique_id: ConstantLib.CURRENT_CONTEST_UNIQUE_ID })
    setTimeout(() => {
      //     var contestId = this.props.navigation.getParam('contest_id','');
      //     var contestUniqueId = this.props.navigation.getParam('contest_unique_id','');
      this.setState({ contest_id: ConstantLib.CURRENT_CONTEST_ID })
      this.setState({ contest_unique_id: ConstantLib.CURRENT_CONTEST_UNIQUE_ID })

          this.getContestMasterData(false, ConstantLib.USER_ID);
     
    }, 1000);

  }

  getContestMasterData(showLoader, teamLeagueId) {
    if (showLoader) {
      this.setState({ loading: true })
    }
    else {
      this.setState({ loading: false })
    }
    const params = {
      type: 'user',
      entity_id: teamLeagueId,
      offset: 0,
      limit: 100,
    };

    WSManager.postData(URLConstants.GET_FOLLOWER_LIST, params)
      .then(response => {

        
        // console.log("Followers Data: "+JSON.stringify(response.data))
        this.setState({ users: response.data.data }, function()
        {
          setTimeout(() => {
            
          }, 500); 
        })
        this.setState({ loading: false })
        this.setState({ refreshing: false });
      })
      .catch(error => {
        this.setState({ loading: false })
        this.setState({ refreshing: false });
        console.log('Error= ' + JSON.stringify(error));
        Toaster.showLongToast('Error:' + error.message);
        return error;
      });
  }

  followUsers(index) {
    if (Utility.isLoggedIn()) {
      
      this.setState({ loading: true })
      const params = {
        follower_id: this.state.users[index].user_id,
        type: 'user',
      };


      WSManager.postData(URLConstants.TOGGLE_FOLLOW_ENTITY, params)
        .then(response => {

          
          let { posts } = this.state;
          this.setState({ loading: false })
          var updatedArr = [...this.state.users];
          updatedArr[index].follow_status = updatedArr[index].follow_status === '0' ? '1' : '0';
          this.setState({ users: updatedArr }, function()
          {

          });
          this.setState({ notifyDataChange: true });
          this.getContestMasterData(true, ConstantLib.USER_ID);
        })
        .catch(error => {
          this.setState({ loading: false })
          Toaster.showLongToast('Follow Users:' + error.message);
          return error;
        });

    }
  }
  static callBackMethod(data1, contestId1, contestUniqueId1) {
    data = contestId1;
    Toaster.showLongToast('data:' + data);
    // mContext.setState({contestId:contestId})
    // mContext.setState({contest_unique_id:contestUniqueId})
    // mContext.setState({responseData:data})
    //     this.getContestMasterData(false);
  }



}
