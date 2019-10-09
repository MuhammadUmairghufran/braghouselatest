import React, { Component } from 'react';
import { Separator, StyleProvider, List } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { TouchableOpacity, StyleSheet, Text, View, Image, KeyboardAvoidingView, ScrollView, ImageBackground, Dimensions, Platform, ActivityIndicator, Animated, StatusBar,RefreshControl } from 'react-native';
import { AppStyles, Images } from '../../Themes'
import LinearGradient from 'react-native-linear-gradient';
import * as Colors from '../../Constants/Colors/';
import IMAGES from '../../Constants/Images/';
import Ripple from 'react-native-material-ripple';
import {  NavigationActions } from 'react-navigation';
import WSManager  from '../../Networking/WSManager/';
import * as URLConstants from '../../Networking/URLConstants/';
import Toaster  from '../../Utils/Toaster';
import Loader from '../../Utils/Loader/';
import Utility from '../../Utils/Utility/';
import ConstantLib  from '../../Constants/ConstantLib/';
import * as String from '../../Constants/Strings';
import { convertToStringCapitalizedForm, convertStringToLowerCase}  from '../../Constants/Methods';
import { getItem, saveItem } from '../../lib/Session';
import PreferenceConstant from '../../Preferences/PreferenceConstant'

const HH = Dimensions.get('window').height;
const WW = Dimensions.get('window').width;


const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[AppStyles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);


export default class TeamBrags extends Component {
  constructor(props) {
    super(props);
    //var ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => true });

    this.state = {
      contestList: [],
      loading:false,
       refreshing:false,
       currentPage:-1,
       userId:'',
       canLoadMoreContent:false,
       teamLeagueId:'',
    };
  }

  static navigationOptions = {
    header: null
  };

  componentDidMount()
  {
    setTimeout(() => {
      console.log('TabProps',this.props.screenProps.teamDetails);

      this.getTeamBrags(this.props.screenProps.teamDetails.team_league_id);
    }, 2000);

  }

  _onRefresh() {
    this.setState({ refreshing: true });
    this.setState({ currentPage: -1 });
this.getTeamBrags();
    }

    blankData=async () => {
    }
  getTeamBrags=async(teamLeagueId)=>{
    var cPage = this.state.currentPage + 1;

        this.setState({loading: true})
        const params = {
          team_league_id:teamLeagueId,
          offset: cPage,
          limit: '20',
          sort_field:'season_scheduled_date',
          sort_order:'DESC'
        };
         WSManager.postData(URLConstants.GET_CONTESTS_OF_LEAGUE, params)
        .then(response => {
          this.setState({loading: false})
          this.setState({ refreshing: false });

          var data = response.data.data.contest_list;
           if(data.length>0){
             this.setState({contestList:data});
          }
          else{
            this.setState({contestList:[]});
          }
        })
        .catch(error => {
          this.setState({loading: false})
          console.log(JSON.stringify(error));
          Toaster.showLongToast(error.message);

          return error;
        });
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
  _renderBragsInfoRow = (rowData, sectionID, rowID) => {
    return (
      <View style={[Style.brag_item, {marginTop: 0}]}>
        <View style={Style.question_card_item}>


<View style={{ flexDirection:'row', marginTop: 0, flex:1, justifyContent: 'flex-end' , color: '#00000040',textAlign:'center'}}>
           <Text style={{ fontSize: 12, color: 'rgba(0,0,0,0.4)', fontFamily:'SourceSansPro-Bold',
                  alignItems: 'center',textAlign:'right'}}> TOTAL POT: </Text>
                  <Text style={{ paddingLeft:5,fontSize: 12, color: '#000', fontFamily:'SourceSansPro-Bold',
                         alignItems: 'center',textAlign:'right', fontWeight:'600' }}>{rowData.total_bet_amount} </Text>
           </View>
        <View style={{ flexDirection: 'row',
}}>
        <Text style={Style.question_text}>{rowData.question.replace("{{player_position}}",rowData.player_name)}</Text>
          
        </View>

          <View style={Style.seperator_style}></View>

          <View style={Style.cards_bottom_view}>
          <View>
                <Text style={Style.question_card_lable_text}>MIN POINTS</Text>
                <Text style={Style.question_card_value_text}>{rowData.entry_fee}</Text>
              </View>
              <TouchableOpacity onPress = {() => this.goToParticipantsList(rowData.contest_id,rowData.contest_unique_id,)} style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                <Text style={{ fontSize: 10, color: 'rgba(0,0,0,0.4)', fontFamily:'SourceSansPro-Regular', fontWeight:'600' }}>PARTICIPANTS</Text>
                {
                    (rowData.total_user_joined=='')?
                    <Text style={{ fontSize: 16, color: '#000000',fontFamily:'SourceSansPro-Regular', fontWeight:'600' }}>0</Text>
                    :
                    <Text style={{ fontSize: 16, color: '#000000', fontFamily:'SourceSansPro-Regular', fontWeight:'600' }}>{rowData.total_user_joined}</Text>
                }
              </TouchableOpacity>
            <View style={{ justifyContent: 'center' }}>
              <LinearGradient
                start={{ x: 0.6, y: 0 }} end={{ x: 2.5, y: 1.5 }}
                locations={[0.0, 0.4]}
                colors={['#1B75BC', '#9AD8DD']}
                style={Style.play_button_gradient}>
                <Ripple onPress={() => this.joinBrag(rowData.contest_id,rowData.contest_unique_id,)}>
                  <Text style={Style.play_button_text}>BRAG</Text>
                </Ripple>
              </LinearGradient>
            </View>

          </View>
        </View>

      </View>
    )
  }
share(rowData){
    if(rowData.contest_access_type==='1'){
      ConstantLib.ID = rowData.join_code;

      const navigateAction = NavigationActions.navigate({
        routeName: 'Invite',
      })
      const nav = WSManager.getTopLevelNavigator()
      nav.dispatch(navigateAction)

      // const navigateAction = NavigationActions.navigate({
      //   routeName: 'Invite',
      //   params: {},
      //   action: NavigationActions.navigate({ routeName: 'Invite' })
      // })
      // const nav = WSManager.getTopLevelNavigator()
      // nav.dispatch(navigateAction)
    }
    else{
       Utility.shareTextMessage(ConstantLib.FIRST_NAME+' '+ConstantLib.LAST_NAME +String.Share_message_public+' '+ConstantLib.REF_CODE+' '+String.Share_message2)
    }

}

  joinBrag(contestId,contest_unique_id, conference_name){
    const navigateAction = NavigationActions.navigate({
      routeName: 'BHEntries',
      params: {'contest_id':contestId,'contest_unique_id':contest_unique_id,'isFromConference':false },
      action: NavigationActions.navigate({ routeName: 'BHEntries' })
    })
    const nav = WSManager.getTopLevelNavigator()
    nav.dispatch(navigateAction)
  }

  render() {
  return (
    <View style={[Style.Wrapper]}>
      <MyStatusBar backgroundColor="rgba(0,0,0,0)" barStyle = 'light-content' />
      <Loader loading={this.state.loading} />

      <View style={{backgroundColor:'transparent'}}>
        <View style={{ marginTop: 0 }}>
        {this.state.contestList.length > 0?
          <List
            showsHorizontalScrollIndicator={false}
            dataArray={this.state.contestList}
            canLoadMore={this.state.canLoadMoreContent}
            onEndThreshold={this.state.contestList.length>=20?this.state.contestList.length-2:0}
            onEndReached={this.state.canLoadMoreContent==true?this.getTeamBrags:this.blankData}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
              />
            }
            renderRow={(item, sectionID, rowID) => this._renderBragsInfoRow(item, sectionID, rowID)}>



          </List>
          :
          <View style={[{height: '100%',
            width: WW,
            alignItems: 'center',
            backgroundColor: 'transparent',
            justifyContent: 'center',}]}>
              <Text style={{color: '#000000'}}>NO BRAGS CREATED</Text>
              {/* <TouchableOpacity onPress={() => this.goToCreateBrags(true)}>
                <Label style={{ textDecorationLine: 'underline', color: '#1B75BC', fontSize: 16, textAlign: 'center' }}>Create your own brags.</Label>
              </TouchableOpacity> */}
            </View> 
          }
        </View>
      </View>

    </View>
  );
}

}

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
    fontFamily:'SourceSansPro-Bold',
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
    
    marginHorizontal: 10,
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 4,
    elevation: 2,
    paddingLeft: 20,
    paddingTop: 10,
    paddingRight: 15,
    paddingBottom: 18,
    borderWidth: 0,
    borderColor: '#D9D9D9',

    shadowOffset: { width: 0, height: 5 },
      shadowColor: "#333333",
      shadowOpacity: 0.5,
      shadowRadius: 5,

  },
  share_text: {
    fontSize: 10,
    color: Colors.LableTextColor,
    alignSelf: 'center',
    fontFamily:'SourceSansPro-Bold'
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
    color: '#000000',
    fontFamily:'SourceSansPro-Regular',
    fontWeight: 'bold'
  },
  question_text: {
    flex:2,
    fontSize: 18,
    color: Colors.ColorPrimary,
    fontFamily:'SourceSansPro-Regular',
    fontWeight: '600',
    marginTop: 5,
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
    backgroundColor: 'transparent',
    //marginTop: 5,
  }

});
