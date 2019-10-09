import React, { Component } from 'react';
import { Card, CardItem, Body, Button, Right, Left, Separator, H3, Container, Content, Tab, Tabs, TabHeading, Header, StyleProvider, Icon, Title, Subtitle, List } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { TouchableOpacity, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, ScrollView, ImageBackground, FlatList, Dimensions, Platform, ActivityIndicator, Animated, StatusBar } from 'react-native';
import { AppStyles, Images } from '../../Themes'
import * as Colors from '../../Constants/Colors/';
import * as String from '../../Constants/Strings/';
import LinearGradient from 'react-native-linear-gradient';
import IMAGES from '../../Constants/Images';
import Loader from '../../Utils/Loader/';
import ConstantLib from '../../Constants/ConstantLib/';
import { getItem, saveItem } from '../../lib/Session';
import PreferenceConstant from '../../Preferences/PreferenceConstant';
import * as URLConstants from '../../Networking/URLConstants/';
import WSManager from '../../Networking/WSManager/';
import { NavigationActions } from 'react-navigation';
import {DrawerActions} from 'react-navigation-drawer'
import Utility from '../../Utils/Utility/';
import Ripple from 'react-native-material-ripple';
import PTRView from 'react-native-pull-to-refresh';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet'
import { replaceAll } from '../../Constants/Methods';
// const MyStatusBar = ({ backgroundColor, ...props }) => (
//   <View style={[AppStyles.statusBar, { backgroundColor }]}>
//     <StatusBar translucent backgroundColor={backgroundColor} {...props} />
//   </View>
// );
var options = [
  <Text style={{color: '#000000'}}>Cancel</Text>,
  <Text style={{color: '#000000'}}>Recent Created</Text>,
  <Text style={{color: '#000000'}}>Recent Upcoming</Text>,
  <Text style={{color: '#000000'}}>Min. Brag Point (Low To High)</Text>,
  <Text style={{color: '#000000'}}>Min. Brag Point (High To Low)</Text>,
  <Text style={{color: '#000000'}}>No. of Participants (Low To High)</Text>,
  <Text style={{color: '#000000'}}>No. of Participants (High To Low)</Text>,
]

var mContext;
export default class BragSpace extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: -1,
      canLoadMoreContent: false,
      contest_list: [],
      loading: false,
      hottest_brag: [],
 
      orderBy:'RecentCreated',
      sortBy:'DESC',
      isAppliedFilter:false,


    }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };
  componentDidMount() {

    this.subs = [
      this.props.navigation.addListener('willFocus', () => {
        mContext = this;
        this.getLobbyMasterData();

      }),
    ];
  }

  componentWillUnmount() {
    this.subs.forEach((sub) => {
      sub.remove();
    });
  }


  _refresh () {
      // you must return Promise everytime
      return new Promise((resolve) => {
        setTimeout(()=>{
        mContext.getLobbyMasterData();
          resolve();
        }, 500)
      })
  }
  static updateData()
  {
    if(mContext)
    mContext.getLobbyMasterData();
  }

  getLobbyMasterData = async () => {
    var cPage = this.state.currentPage + 1;

    const params = {
      offset: cPage,
      limit: '20',
      order_by:this.state.orderBy,
      sort_by:this.state.sortBy
    };
    this.setState({ loading: true })
    WSManager.postData(URLConstants.GET_BRAG_SPACE_API, params)
      .then(response => {
        var data = response.data.data;
        console.log('Full data: ' + JSON.stringify(data) + 'End here ----------------------------------------');
        console.log('Length of Brags and Hoteest Brags:', data.brag_list.length, data.hottest_brag.length  )
        console.log('Get Brag Space Data', JSON.stringify(data.brag_list))
        
        this.setState({ contest_list: data.brag_list });
        this.setState({ hottest_brag: data.hottest_brag })

        if (data.contest_list.length < 20) {
          this.setState({ canLoadMoreContent: false });
        }
        else {
          this.setState({ canLoadMoreContent: true });
        }
        this.setState({ loading: false })
      })
      .catch(error => {
        this.setState({ loading: false })
        //    alert(JSON.stringify(error));
        return error;
      });
  }
  showActionSheet = () => {
    this.actionSheetSortBy.show()
  }

  render() {
    return (

      <View style={[AppStyles.Wrapper, { backgroundColor: '#E8E8E8' }]}>
        {/* <StatusBar
          translucent
          backgroundColor={'transparent'} /> */}
        <LinearGradient
          start={{ x: 0.6, y: 0 }} end={{ x: 2.5, y: 1.5 }}
          locations={[0.0, 0.4]}
          colors={['#1B75BC', '#9AD8DD']}
          style={{ paddingTop: Platform.OS === "ios" ? 30 : 20 }}>

          <View style={{ flexDirection: 'row', paddingBottom: 15, marginLeft: 0, paddingTop: Platform.OS === "ios" ? 20 : 20 }}>

          <TouchableOpacity style={{ flex:1, padding: 10, justifyContent: 'center',alignSelf: 'center', backgroundColor: 'transparent' }}  onPress={() => WSManager.getTopLevelNavigator().dispatch(DrawerActions.openDrawer())} >
            <Image source={IMAGES.ic_drawer_menu} />
          </TouchableOpacity>

             <View style={{ flex:1,paddingRight: 0, alignSelf: 'center', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'transparent'}}>
             <Text style={AppStyles.header_title}>BRAG SPACE</Text>
             </View>

            <TouchableOpacity onPress = {this.showActionSheet} style = {{ flex:1,flexDirection:'row', justifyContent: 'flex-end', alignItems:"center", alignSelf: 'center', marginRight: 20 , backgroundColor: 'transparent'}} >
             <Text style = {{fontFamily: 'SourceSansPro-Regular',color:'#fff', fontWeight:'600', fontSize: 18, marginRight: 10, alignSelf: "center"}}>Sort</Text>
             <Image  source = {this.state.isAppliedFilter?IMAGES.ic_Filter_Enable:IMAGES.ic_Filter_Disable}></Image>
            </TouchableOpacity>

          </View>


        </LinearGradient>
        <Loader loading={this.state.loading} />

        <View style = {this.state.hottest_brag.length!=0 ? null:{height:0}} >
          <Text style={{ backgroundColor:'white',fontSize: 18, color: Colors.ColorPrimary,paddingVertical:this.state.hottest_brag.length!=0 ?5:0, marginTop: 10, textAlign: 'center', fontFamily: 'SourceSansPro-Bold' }}>Hottest Brags</Text>
        </View>
        <PTRView  onRefresh={this._refresh}>
        <View style={{ backgroundColor:'white',height: this.state.hottest_brag.length!=0 ? 165:0 } }>
          <FlatList
          showsHorizontalScrollIndicator = {false}
            data={this.state.hottest_brag}
            horizontal={true}
            renderItem={({ item }) =>
              <View style={Styles.active_brag_parent}>
                <TouchableOpacity onPress={() => this.onClickRowItem(item)}>
                  <View style={Styles.header_inner_view}>
                    <Image style={Styles.active_brag_img} resizeMode={'contain'} source={(item.conference_image != null && item.conference_image != '') ? { uri: item.conference_image } : IMAGES.ic_plus_white} />
                  </View>
                </TouchableOpacity>
                <View style={{ width: 100, justifyContent: 'center', alignItems: 'center', }}>
                  <Text style={Styles.brag_text}>{item.conference_name}</Text>
                </View>
              </View>

            }
            />
            </View>
<View style={{ backgroundColor:'#DDDDDD',height:8,width:'100%' ,shadowColor: '#000',
  shadowOffset: { width: 1, height: 1 },
  shadowOpacity: 0.2,
  shadowRadius: 2,
  elevation:2,}} />
              {this.state.contest_list.length!=0 ? 
        <FlatList
          ref="flatListContest"
          data={this.state.contest_list}
          canLoadMore={this.state.canLoadMoreContent}
          onEndThreshold={this.state.contest_list.length >= 20 ? this.state.contest_list.length - 2 : 0}
          onEndReached={this.state.canLoadMoreContent == true ? this.getLobbyMasterData : this.blankData}
          renderItem={({ item }) =>

            <BragsList item={item}></BragsList>
          }
        />
        :<View style = {{width: '100%', height:'100%', backgroundColor:'#FFFFFF', justifyContent: 'center', alignItems: 'center'}}><Text numberOfLines = {2} style = {{fontFamily: 'SourceSansPro-Regular', fontSize: 16, textAlign: "center", width: 250}} >No active brags at the moment. <Text numberOfLines = {2} style = {{fontFamily: 'SourceSansPro-Bold', fontSize: 16, textAlign: "center", width: 250}} onPress={() => this.onClickNavigateToScreen('CreateBragScreen')}  >Create</Text> and stay tuned</Text></View>
        }
      </PTRView>
        
      <ActionSheet
          ref={o => this.actionSheetSortBy = o}
          title={<Text style={{color: '#000', fontSize: 18}}>Sort By</Text>}
          options={options}
          cancelButtonIndex={0}
          destructiveButtonIndex={6}
          onPress={(index) => { this.sortBragsList(index)}}

        />


      </View>
    );
  }

  sortBragsList(index)
  {
    var _orderBy
    var _sortBy
    if (index == 1)
    {
      this.setState({isAppliedFilter:true});
        _orderBy = 'RecentCreated'
        _sortBy = 'DESC'

        options = [
          <Text style={{color: '#000000'}}>Cancel</Text>,
          <Text style={{color: '#1B75BC'}}>Recent Created</Text>,
          <Text style={{color: '#000000'}}>Recent Upcoming</Text>,
          <Text style={{color: '#000000'}}>Min. Brag Point (Low To High)</Text>,
          <Text style={{color: '#000000'}}>Min. Brag Point (High To Low)</Text>,
          <Text style={{color: '#000000'}}>No. of Participants (Low To High)</Text>,
          <Text style={{color: '#000000'}}>No. of Participants (High To Low)</Text>
        ]
    }
    else if (index == 2)
    {
      this.setState({isAppliedFilter:true});
        _orderBy = 'RecentUpcoming'
        _sortBy = 'ASC'
        options = [
          <Text style={{color: '#000000'}}>Cancel</Text>,
          <Text style={{color: '#000000'}}>Recent Created</Text>,
          <Text style={{color: '#1B75BC'}}>Recent Upcoming</Text>,
          <Text style={{color: '#000000'}}>Min. Brag Point (Low To High)</Text>,
          <Text style={{color: '#000000'}}>Min. Brag Point (High To Low)</Text>,
          <Text style={{color: '#000000'}}>No. of Participants (Low To High)</Text>,
          <Text style={{color: '#000000'}}>No. of Participants (High To Low)</Text>
        ]
    }
    else if (index == 3)
    {
      this.setState({isAppliedFilter:true});
        _orderBy = 'MinimumBragPoint'
        _sortBy = 'ASC'
        options = [
          <Text style={{color: '#000000'}}>Cancel</Text>,
          <Text style={{color: '#000000'}}>Recent Created</Text>,
          <Text style={{color: '#000000'}}>Recent Upcoming</Text>,
          <Text style={{color: '#1B75BC'}}>Min. Brag Point (Low To High)</Text>,
          <Text style={{color: '#000000'}}>Min. Brag Point (High To Low)</Text>,
          <Text style={{color: '#000000'}}>No. of Participants (Low To High)</Text>,
          <Text style={{color: '#000000'}}>No. of Participants (High To Low)</Text>
        ]
    }
    else if (index == 4)
    {
      this.setState({isAppliedFilter:true});
      _orderBy = 'MinimumBragPoint'
      _sortBy = 'DESC'
      options = [
        <Text style={{color: '#000000'}}>Cancel</Text>,
        <Text style={{color: '#000000'}}>Recent Created</Text>,
        <Text style={{color: '#000000'}}>Recent Upcoming</Text>,
        <Text style={{color: '#000000'}}>Min. Brag Point (Low To High)</Text>,
        <Text style={{color: '#1B75BC'}}>Min. Brag Point (High To Low)</Text>,
        <Text style={{color: '#000000'}}>No. of Participants (Low To High)</Text>,
        <Text style={{color: '#000000'}}>No. of Participants (High To Low)</Text>
      ]
    }
    else if (index == 5)
    {
      this.setState({isAppliedFilter:true});
      _orderBy = 'NoOfParticipants'
      _sortBy = 'ASC'
      options = [
        <Text style={{color: '#000000'}}>Cancel</Text>,
        <Text style={{color: '#000000'}}>Recent Created</Text>,
        <Text style={{color: '#000000'}}>Recent Upcoming</Text>,
        <Text style={{color: '#000000'}}>Min. Brag Point (Low To High)</Text>,
        <Text style={{color: '#000000'}}>Min. Brag Point (High To Low)</Text>,
        <Text style={{color: '#1B75BC'}}>No. of Participants (Low To High)</Text>,
        <Text style={{color: '#000000'}}>No. of Participants (High To Low)</Text>
      ]
    }
    else if (index == 6)
    {
      this.setState({isAppliedFilter:true});
      _orderBy = 'NoOfParticipants'
      _sortBy = 'DESC'
      options = [
        <Text style={{color: '#000000'}}>Cancel</Text>,
        <Text style={{color: '#000000'}}>Recent Created</Text>,
        <Text style={{color: '#000000'}}>Recent Upcoming</Text>,
        <Text style={{color: '#000000'}}>Min. Brag Point (Low To High)</Text>,
        <Text style={{color: '#000000'}}>Min. Brag Point (High To Low)</Text>,
        <Text style={{color: '#000000'}}>No. of Participants (Low To High)</Text>,
        <Text style={{color: '#1B75BC'}}>No. of Participants (High To Low)</Text>
      ]
    }


    if (index != 0) {
      this.setState({orderBy:_orderBy}, function()
      {
        this.setState({sortBy:_sortBy}, function()
      {
        this.state.currentPage = -1;

        this.getLobbyMasterData();
      })

      })
    }









  }

  renderHotestBrag = (rowData, rowID) => {
    return (
      <View style={Styles.active_brag_parent}>
        <TouchableOpacity onPress={() => this.onClickRowItem(rowData)}>
          <View style={Styles.header_inner_view}>
            <Image style={Styles.active_brag_img} resizeMode={'contain'} source={(rowData.conference_image != null && rowData.conference_image != '') ? { uri: rowData.conference_image } : IMAGES.ic_plus_white} />
          </View>
        </TouchableOpacity>
        <View style={{ width: 100, justifyContent: 'center', alignItems: 'center', }}>
          <Text style={Styles.brag_text}>{rowData.conference_name}</Text>
        </View>
      </View>



    )
  }

  onClickRowItem(passdata) {
    ConstantLib.DATA = passdata;
    const navigateAction = NavigationActions.navigate({
      routeName: 'BHLobbyScreen',
      params: {},
      action: NavigationActions.navigate({ routeName: 'BHLobbyScreen' })
    })
    const nav = WSManager.getTopLevelNavigator()
    nav.dispatch(navigateAction)
  }

  onClickNavigateToScreen(screenName) {
    
    const navigateAction = NavigationActions.navigate({
      routeName: screenName,
      params: {},
      action: NavigationActions.navigate({ routeName: screenName })
    })
    const nav = WSManager.getTopLevelNavigator()
    nav.dispatch(navigateAction)
  }





}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaeaea',
  },
  list_item_parent: {
    backgroundColor: '#fff',
    alignItems: 'center',
    marginLeft: 11,
    marginRight: 2,
    justifyContent: 'center',
    height: 50,
    minWidth: 150,
    paddingLeft: 10,
    paddingRight: 10,
    alignSelf: 'center',
    borderRadius: 2,
    borderColor: Colors.LableTextColor, // on selection #A2C1CE
    borderWidth: 1

  },
  team_text: {
    fontSize: 14,
    color: '#000'
  },
  date_text: {
    fontSize: 14,
    color: Colors.LableTextColor
  },
  week_lable_text: {
    fontSize: 14,
    color: Colors.ColorPrimary,

  },
  week_number_text: {
    fontSize: 22,
    marginBottom: -3,
    marginTop: -3,
    color: Colors.ColorPrimary
  },
  active_brag_parent: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    marginLeft: 11,
    marginRight: 2,
    marginTop: 0,
    justifyContent: 'center',

  },
  header_inner_view: {
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 3
  },
  active_brag_img: {
    height: 100,
    width: 100,
  },
  brag_text: {
    fontSize: 16,
    fontFamily: 'SourceSansPro-Bold',
    flexWrap: 'wrap',
    color: '#222222',

    width: 100,
    textAlign: 'center',


    marginTop: 5

  },

});

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const Style = StyleSheet.create({
  Wrapper: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingTop: Platform.OS === 'ios' ? 0 : 0,

  },
  main_container: {
    flex: 1,
    height: deviceHeight,
    width: deviceWidth,
  },
  active_brag_parent: {
    backgroundColor: 'white',
    alignItems: 'center',
    marginLeft: 11,
    marginRight: 2,
    justifyContent: 'center',

  },
  header_inner_view: {
    height: 100,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4
  },
  brag_text: {
    fontSize: 12,
    flexWrap: 'wrap',
    color: '#222222',
    fontFamily: 'SourceSansPro-Bold',
    marginTop: 5

  },
  hot_brag_img: {
    height: 100,
    width: 100,
    borderRadius: 50
  },
  active_brag_img: {
    height: 100,
    width: 100,
  },

  question_card_item: {
    minHeight: 100,
    marginLeft: 15,
    marginRight: 15,
    backgroundColor: 'white',
    marginTop: 10,
    borderRadius: 4,
    elevation: 2,
    paddingLeft: 20,
    paddingTop: 13,
    paddingRight: 15,
    paddingBottom: 18,
    borderWidth: 1,
    borderColor: '#D9D9D9',

    marginBottom: 15, shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5

  },
  share_text: {
    fontSize: 10,
    color: Colors.LableTextColor,
    alignSelf: 'center',
    fontFamily: 'SourceSansPro-Bold'
  },
  question_footer_share_view: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  share_and_image: {
    padding: 3,
    flexDirection: 'row'
  },
  team_name_text: {
    fontSize: 18,
    color: '#000',
    fontFamily: 'SourceSansPro-Bold'
  },


  question_text: {
    fontSize: 18,
    color: Colors.ColorPrimary,
    fontFamily:'SourceSansPro-Regular',
    fontWeight: '600',
    marginTop: 10,
  },
  seperator_style: {
    height: 1,
    backgroundColor: '#EFEEEE',
    marginLeft: -20,
    marginTop: 15,
    marginRight: -15
  },
  cards_bottom_view: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-between'
  },
  play_button_text: {
    fontSize: 14,
    color: '#fff',
    paddingLeft: 18,
    paddingRight: 18,
    paddingTop: 7,
    paddingBottom: 7,
    fontFamily:'SourceSansPro-Regular',
    fontWeight: 'bold'
  },
  play_button_gradient: {
    borderRadius: 18
  },
  question_card_lable_text: {
    fontSize: 10,
    color: Colors.LableTextColor,
    fontFamily:'SourceSansPro-Regular'
  },
  question_card_value_text: {
    fontSize: 16,
    color: '#000',
    fontFamily:'SourceSansPro-Regular',
    fontWeight: 'bold'
  },
  brag_item: {
    backgroundColor: '#FFF',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.2,
    shadowRadius: 7,
    elevation:10,
  }

});



class BragsList extends Component {

  constructor(props) {
    super(props);
  }

  toggleLike(item) {
    //this.setState({loading: true});
    if (Utility.isLoggedIn()) {
      const params = {
        contest_unique_id: item.contest_unique_id
      };




      WSManager.postData(URLConstants.BRAG_TOGGLE_LIKE, params)
        .then(response => {


          var data = response.data.data;
          var is_like = response.data.data.is_like;

          item.is_like = response.data.data.is_like;

          if (is_like == 1) {
            item.no_of_likes = parseInt(item.no_of_likes, 10) + 1;
          } else {
            item.no_of_likes = parseInt(item.no_of_likes, 10) - 1;
          }





          this.setState({ loading: false });

          this.setState({ refreshing: false });

        })
        .catch(error => {
          this.setState({ loading: false });
          this.setState({ refreshing: false });
          console.log('getAllTeams:' + error.message)
          Toaster.showLongToast('getAllTeams:' + error.message);
          return error;
        });
    }
  }

  joinBrag(contestId, contest_unique_id) {
    console.log('Ye hai contest id' + contest_unique_id)
    const navigateAction = NavigationActions.navigate({
      routeName: 'BHEntries',
      params: { 'contest_id': contestId, 'contest_unique_id': contest_unique_id },
      action: NavigationActions.navigate({ routeName: 'BHEntries' })
    })
    const nav = WSManager.getTopLevelNavigator()
    nav.dispatch(navigateAction)
  }

  goToParticipantsList(contestId, contest_unique_id) {
    ConstantLib.TabName = 'PARTICIPANTS'
    console.log(ConstantLib.TabName)

    const navigateAction = NavigationActions.navigate({
      routeName: 'BHEntries',
      params: { 'contest_id': contestId, 'contest_unique_id': contest_unique_id },
      action: NavigationActions.navigate({ routeName: 'BHEntries' })
    })
    const nav = WSManager.getTopLevelNavigator()

    nav.dispatch(navigateAction)
  }


  goToTeamDetails(team_league_id)
  {

    const navigateAction = NavigationActions.navigate({
      routeName: 'TeamDetail',
      params: {'team_league_id':team_league_id},
      action: NavigationActions.navigate({ routeName: 'TeamDetail' })
    })
    const nav = WSManager.getTopLevelNavigator()
    console.log('teamleague:',''+team_league_id)
    nav.dispatch(navigateAction)

  }




  goToCommentsList(item) {
    if (Utility.isLoggedIn()) {

      const navigateAction = NavigationActions.navigate({
        routeName: 'Comments',
        params: { items: item, is_brag: true },
      })
      const nav = WSManager.getTopLevelNavigator()
      nav.dispatch(navigateAction)
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
      typeof(this.props.item.match_data)!='undefined'?
      <View style={[Style.brag_item, {}]}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, marginRight: 20, marginTop: 20, }}>
          <View >
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity onPress = {() => ((PreferenceConstant.USER_ID != this.props.item.user_id) ? this.moveToOthersProfile(this.props.item.user_id) : this.moveToUserOwnProfile(this.props.item.user_id))}><Text style={{ fontSize: 15, color: 'black', fontFamily: 'SourceSansPro-Bold' }}>{this.props.item.user_name}</Text></TouchableOpacity>
              <Text style={{ fontSize: 15, }}> created a brag</Text>
 </View>
            <Text style = {{fontFamily:'SourceSansPro-Regular', color: '#00000040' }}>{Utility.getFormatedDate(this.props.item.added_date, 'ddd, MMM Do - hh:mm A')}</Text>
          </View>
          <Image source={IMAGES.ic_navigation_cross} />
        </View>
        <View style={Style.question_card_item}>
          <View style={{ flexDirection: 'row' }}>

            <TouchableOpacity onPress = {() => this.goToTeamDetails(this.props.item.match_data.team_league_id_home)}>
           <Text style={Style.team_name_text}>{typeof(this.props.item.match_data)!='undefined'?this.props.item.match_data.home_common_name:''}</Text>
          </TouchableOpacity>
             <Text style={{ fontFamily:'SourceSansPro-Bold', alignSelf:"center", color: '#00000040'}}> VS </Text>

            <TouchableOpacity onPress = {() => this.goToTeamDetails(this.props.item.match_data.team_league_id_away)}>
            <Text style={Style.team_name_text}>{typeof(this.props.item.match_data)!='undefined'?this.props.item.match_data.away_common_name:''}</Text>
            </TouchableOpacity>

          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style = {{fontFamily:'SourceSansPro-Regular', color: '#00000040' }}>Week {typeof(this.props.item.match_data)!='undefined'?this.props.item.match_data.week:''}</Text>
            <View style={{ height: 5, width: 5, borderRadius: 2.5, backgroundColor: '#9B9B9B', marginLeft: 3 }}>
            </View>
            <Text style={{ marginLeft: 3, fontFamily:'SourceSansPro-Regular', color: '#00000040' }}>{Utility.getFormatedDate(this.props.item.match_data.season_scheduled_date, 'ddd, MMM Do - hh:mm A')}</Text>

            <View style={{ flexDirection:'row',flex:1,justifyContent: 'flex-end' , color: '#00000040',textAlign:'center'}}>
             <Text style={{ fontSize: 12, color: 'rgba(0,0,0,0.4)', fontFamily:'SourceSansPro-Bold',
                    alignItems: 'center',textAlign:'right'}}> TOTAL POT: </Text>
                    <Text style={{ paddingLeft:5,fontSize: 12, color: '#000', fontFamily:'SourceSansPro-Bold',
                           alignItems: 'center',textAlign:'right', fontWeight:'600' }}>{this.props.item.total_bet_amount} </Text>
             </View>
          </View>
          <Text style={Style.question_text}>{this.props.item.question.replace("{{player_position}}", this.props.item.player_name)}</Text>
          <View style={Style.seperator_style}></View>

          <View style={Style.cards_bottom_view}>
            <View>
              <Text style={Style.question_card_lable_text}>MIN POINTS</Text>
              <Text style={Style.question_card_value_text}>{this.props.item.entry_fee}</Text>
            </View>
            <TouchableOpacity onPress = {() => this.goToParticipantsList(this.props.item.contest_id, this.props.item.contest_unique_id)} style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <Text style={{ fontSize: 10, color: 'rgba(0,0,0,0.4)', fontFamily:'SourceSansPro-Regular', fontWeight:'600'  }}>PARTICIPANTS</Text>
              {
                (this.props.item.total_user_joined == '') ?
                  <Text style={{ fontSize: 14, color: '#000', fontFamily:'SourceSansPro-Regular', fontWeight:'600'  }}>0</Text>
                  :
                  <Text style={{ fontSize: 14, color: '#000', fontFamily:'SourceSansPro-Regular', fontWeight:'600'  }}>{this.props.item.total_user_joined}</Text>
              }
            </TouchableOpacity>
            <View style={{ justifyContent: 'center' }}>
              <LinearGradient
                start={{ x: 0.6, y: 0 }} end={{ x: 2.5, y: 1.5 }}
                locations={[0.0, 0.4]}
                colors={['#1B75BC', '#9AD8DD']}
                style={Style.play_button_gradient}>
                <Ripple onPress={() => this.joinBrag(this.props.item.contest_id, this.props.item.contest_unique_id)}>
                  <Text style={Style.play_button_text}>BRAG</Text>
                </Ripple>
              </LinearGradient>
            </View>

          </View>
        </View>


        <View style={{ marginHorizontal: 15, paddingHorizontal: 10, paddingTop: 8, paddingBottom: 15 }}>
          <View style={{ flexDirection: 'row', marginTop: 14, justifyContent: 'center' }}>
            <TouchableOpacity onPress={() => this.toggleLike(this.props.item)}>

              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <View><Image source={this.props.item.is_like == 1 ? Images.ic_liked_heart : Images.ic_like_heart} style={{width:21, height: 19, marginRight:8}}></Image></View>

                <View><Text>{this.props.item.no_of_likes}</Text></View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={{ flex: 1, alignItems: 'center', }} onPress={() => this.goToCommentsList(this.props.item)}>
              <View style={{ flexDirection: 'row', justifyContent: "center", marginLeft: 0 }}>
                <View><Image source={Images.comment} style={{ width: 23, height: 21, marginRight: 8 }}></Image></View>
                <View><Text>{this.props.item.no_of_comments}</Text></View>

              </View>
            </TouchableOpacity>

            <View style={{ flex: 0, alignItems: 'flex-end', }}>
              <TouchableOpacity style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center' }} onPress={() => {
                     //inviteReferralMessage = String.Share_Brag_Message.toString()
                    //"USER_FIRSTNAME", "TITLE", "CODE"
                    
                      getItem(PreferenceConstant.REF_CODE).then((value)=>{
                      ConstantLib.REF_CODE=value;
                      var map = {
                        '"USER_FIRSTNAME"' : ConstantLib.FIRST_NAME,
                        '"TEAM_A_vs_TEAM_B"' : this.props.item.match_data.home_team_name+' vs '+this.props.item.match_data.away_team_name,
                        '"BRAG_INFORMATION"': this.props.item.question.replace("{{player_position}}", this.props.item.player_name),
                        '"CODE"' : ConstantLib.REF_CODE,
                    };
                    //replace "PLAYER_NAME", "TEAM_A_vs_TEAM_B", "BRAG_INFORMATION", "CODE"
                    Utility.shareTextMessage(replaceAll(String.Share_Brag_From_BragSpace_Message, map))
                  })
              
               // Utility.shareTextMessage(''+String.Share_message1+' '+this.props.item.contest_unique_id+' '+String.Share_message2+'')
                
                }}>
                <Image source={Images.dark_share} style={{ width: 22, height: 21, marginRight: 5 }}></Image>                                                                 
                <View><Text>SHARE</Text></View>
              </TouchableOpacity>

            </View>
          </View>
        </View>

      </View>

:null


    );
  }
}
