import React, { Component } from 'react';
import { Card, CardItem, Body, Button, Right, Left, Separator, H3, Container, Content, Tab, Tabs, TabHeading, Header, StyleProvider, Icon, Title, Subtitle, List, Label } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { TouchableOpacity, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, ScrollView, ImageBackground, FlatList, Dimensions, Platform, ActivityIndicator, Animated, StatusBar } from 'react-native';
import { AppStyles, Images } from '../../Themes'
import * as Colors from '../../Constants/Colors/';
import LinearGradient from 'react-native-linear-gradient';
import IMAGES from '../../Constants/Images';
import Loader from '../../Utils/Loader/';
import ConstantLib from '../../Constants/ConstantLib/';
import { getItem, saveItem } from '../../lib/Session';
import PreferenceConstant from '../../Preferences/PreferenceConstant';
import * as URLConstants from '../../Networking/URLConstants/';
import WSManager from '../../Networking/WSManager/';
import { NavigationActions } from 'react-navigation';
import Utility from '../../Utils/Utility/';
import Ripple from 'react-native-material-ripple';
import PTRView from 'react-native-pull-to-refresh';
import CreateBragScreen from '../CreateBrag/CreateBragScreen';

let mContext = null;
const HH = Dimensions.get('window').height;
const WW = Dimensions.get('window').width;
const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[AppStyles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

export default class MatchFixtures extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: -1,
      isComplete: '0',
      isLive: '0',

      canLoadMoreContent: false,
      contest_list: [],
      loading: false,
      match_data: '',
      data: '',

      selectedConference: '',
      allConferenceList: [],
      conferenceList: [],
      selectedTeam: '',
      questionList: [],
      selectedMatch: '',
      matchList: [],
      teamList: [],
    }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      header: <CustomHeader this navigation={navigation} />
    };
  };

  componentDidMount() {
    
    var item = this.props.navigation.getParam('item', '');
    var isComplete = this.props.navigation.getParam('isComplete', '0');
    var isLive = this.props.navigation.getParam('isLive', '0');
    this.setState({ isComplete: isComplete, isLive: isLive }, function () {
      this.setState({ data: item }, () => {
        setTimeout(() => {
          this.getLobbyMasterData();
        }, 200);
      });
    });



    //   this.setState({data:ConstantLib.DATA}, function()
    // {
    //   setTimeout (() => {
    //     this.getLobbyMasterData();
    //   }, 400);
    // });

  }
  _renderBragsRow = (rowData, sectionID, rowID) => {
    return (
      <View style={Styles.list_item_parent}>

        <View style={{ flexDirection: 'row' }}>
          <Text style={Styles.team_text} >Alabama</Text>
          <Text style={{ fontFamily: 'SourceSansPro-Regular' }}> VS </Text>
          <Text style={Styles.team_text}>Vanderbilt</Text>

        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text style={Styles.date_text}>Apr 24, Sat - 12:00 AM</Text>
        </View>

      </View>
    )
  }
  _refresh() {
    // you must return Promise everytime
    return new Promise((resolve) => {

      mContext.setState({ currentPage: -1 }, function () {
        setTimeout(() => {

          mContext.getLobbyMasterData();
          resolve();
        }, 500)
      });




    })
  }


  getAllTeams(conferenceID, itemC) {
    this.setState({ isLoading: true })
    const params = {
      sports_id: ConstantLib.SPORTS_ID,
      league_id: ConstantLib.LEAGUE_ID,
      conference_id: conferenceID,
    };

    WSManager.postData(URLConstants.ALL_TEAMS_URL, params)
      .then(response => {
        if (this.state.isLive == '1')
        {
          this.setState({ isLoading: false })
        }
        
        var data = response.data.data.result;
        console.log("getAllTeams items==" + JSON.stringify(data));
        var items = [];
        items.push({
          "team_name": "",
        });


        if (data.length > 0) {
          this.setState({ teamList: [...items, ...data] });

          data.map((item, index) => {

            if (item.team_league_id == itemC.team_league_id_home) {
              this.setState({ selectedTeam: item.team_league_id }, () => {
                this.getAllMatchesByTeam(item.team_league_id)
              })
            }
            else if (item.team_league_id == itemC.team_league_id_away) {
              this.setState({ selectedTeam: item.team_league_id }, () => {
                this.getAllMatchesByTeam(item.team_league_id)
              })
            }
          })

          //   this.setState({teamList:data});
          //           this.setState({selectedTeam:data[0].team_league_id})
          //     this.getAllMatchesByTeam(data[0].team_league_id);
        }
        else {
          this.setState({ teamList: [] });
          this.setState({ loading: false })
          if (this.state.isLive == '1')
        {
          this.setState({ isLoading: false })
        }
        }
        
      })
      .catch(error => {
        this.setState({ isLoading: false })
        Toaster.showLongToast('getAllTeams:' + error.message);
        this.setState({ isLoading: false })
        return error;
      });
  }

  getAllMatchesByTeam(teamLeagueId) {
    
    const params = {
      team_league_id: teamLeagueId
    };

    WSManager.postData(URLConstants.CREATE_BRAG_GET_TEAM_MATCHES, params)
      .then(response => {
        

        var data = response.data.data.match_list;
        console.log("selectedMatch==" + data.length);
        var seasonGameUID = data[0].season_game_uid;
        this.setState({ selectedMatch: seasonGameUID })
        this.setState({ matchList: data }, () => {
          setTimeout(() => {
            this.setState({ loading: false })
          }, 200);
        });
      })
      .catch(error => {
        this.setState({ isLoading: false })
        Toaster.showLongToast('selectedMatch:' + error.message);
        this.setState({ isLoading: false })
        return error;
      });
  }


  getCreateBragMasterData() {

    const params = {
      sports_id: '2',
    };

    WSManager.postData(URLConstants.CREATE_BRAG_MASTER_URL, params)
      .then(response => {

        this.setState({ loading: false })

        var conferencesList = response.data.data.conferences;
        var items = [];
        items.push({
          "conference_name": "",
        });


        this.setState({ conferenceList: [...items, ...conferencesList] });

        //     this.setState({selectedConference:conferencesList[0].conference_id})
        //this.getAllTeams(conferencesList[0].conference_id);
        var question_dataList = response.data.data.question_data;
        console.log("getCreateBragMasterData==" + JSON.stringify(question_dataList));
        for (let i = 0; i < question_dataList.length; i++) {
          if (i === 0) {
            // question_dataList[i].selected = true;
            // this.setState({questionObj:question_dataList[i]})
            question_dataList[i].selected = false;
          }
          else {
            question_dataList[i].selected = false;
          }
        }
        var qObj = this.state.questionObj;
        //   console.log(JSON.stringify(qObj.question_var.positions));
        //   this.setState({playerPositions:qObj.question_var.positions})
        this.setState({ questionList: question_dataList }, () => {
          this.getAllTeams(this.state.selectedConference)
        })


      })
      .catch(error => {

        this.setState({ loading: false })
        Toaster.showLongToast('Error:' + error.message);


        return error;
      });
  }



  getAllConferences(itemC) {
    const params = {};
    this.setState({ loading: true })
    WSManager.postData(URLConstants.ALL_CONFERENCE_URL, params)
      .then(response => {
        // if (this.state.isLive == '1')
        // {
          this.setState({loading: false})
    
        // }
        var data = response.data.data;
        this.setState({ allConferenceList: data }, () => {

          setTimeout(() => {
            data.map((item, index) => {
              if (item.conference_id == itemC.home_conference_id) {
                this.setState({ selectedConference: item.conference_id }, () => {
                  this.getCreateBragMasterData()
                  this.getAllTeams(item.conference_id, itemC)
                })
              }
              else if (item.conference_id == itemC.away_conference_id) {
                this.setState({ selectedConference: item.conference_id }, () => {
                  this.getCreateBragMasterData()
                  this.getAllTeams(item.conference_id, itemC)
                })
              }

            })
          }, 200);
        });
        
      })
      .catch(error => {
        this.setState({ loading: false })
        Toaster.showLongToast('getAllConferences:' + error.message);
        return error;
      });
  }

  blankData = async () => {
  }
  getLobbyMasterData = async () => {

    var cPage = this.state.currentPage + 1;
    const params = {
      season_game_uid: this.state.data.season_game_uid,
      sort_field: 'season_scheduled_date',
      sort_order: 'DESC',
      offset: cPage,
      limit: '20',
      contest_type: '1'
    };
    this.setState({ loading: true })
    WSManager.postData(URLConstants.GET_CONTESTS_OF_LEAGUE, params)
      .then(response => {
        var data = response.data.data;
        console.log('GET_CONTESTS_OF_LEAGUE Contest = ' + JSON.stringify(data));

        var mList = data.contest_list;
        if (cPage === 0) {
          this.setState({ contest_list: [] });
        }
        this.setState({ contest_list: [...this.state.contest_list, ...mList] }, () => {
          // if (data.contest_list.length <= 0) {
            //this.getCreateBragMasterData()
            // this.getAllConferences(this.state.data)
          // }
          // else
          // {
            // if (this.state.isLive == '1')
            // {
              //changed by sandeep dubey because loader was not stopping
              this.setState({ loading: false })
            // }
            this.getAllConferences(this.state.data)
          // }
        });
        if (data.contest_list.length < 20) {
          this.setState({ canLoadMoreContent: false });
        }
        else {
          this.setState({ canLoadMoreContent: true });
        }
        
      })
      .catch(error => {
        console.log('GET_CONTESTS_OF_LEAGUE error = ' + error);
        this.setState({ loading: false })

        return error;
      });
  }

  render() {
    mContext = this;
    return (


      <View style={[AppStyles.Wrapper, { backgroundColor: '#fff' }]}>
        <MyStatusBar backgroundColor="rgba(0,0,0,0)" barStyle="light-content" />

        <Loader loading={this.state.loading} />
        { (this.state.isLive == '0')
        
   ?
        <TouchableOpacity onPress={() => this.goToCreateBrags(true)} style = {{zIndex: 999,}}>
                  <LinearGradient
                      start={{ x: 0.6, y: 0 }} end={{ x: 2.5, y: 1.5 }}
                      locations={[0.0, 0.4]}
                      colors={['#FFFFFF', '#FFFFFF']}
                      //colors={['#1B75BC', '#9AD8DD']}
                      style={{ borderRadius: 0, height: 40, justifyContent:'center', shadowOffset: { width: 5, height: 5 },
                      shadowColor: "#999999",
                      shadowOpacity: 0.5,  
                      shadowRadius: 10,
                      marginBottom: 0,}}>
                        <Label style={{ textDecorationLine: 'none', color: '#1B75BC', fontSize: 16, fontFamily: 'SourceSansPro-Regular', fontWeight:'bold', textAlign: 'center' }}>CREATE A BRAG</Label>
                  </LinearGradient>
              </TouchableOpacity> 
              : null}
        <PTRView onRefresh={this._refresh}>

          {(this.state.contest_list.length > 0) ?
            <FlatList
              data={this.state.contest_list}
              canLoadMore={this.state.canLoadMoreContent}
              onEndThreshold={this.state.contest_list.length >= 20 ? this.state.contest_list.length - 2 : 0}
              onEndReached={this.state.canLoadMoreContent == true ? this.getLobbyMasterData : this.blankData}
              renderItem={({ item }) =>
                <View >

                  <View style={{ margin: 5 }}>
                    <View style={{ position: 'relative' }}>
                      <Card style={{ paddingVertical: 2, borderRadius: 5, borderWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, marginBottom: 3 }}>

                        <CardItem>
                          <Body style={{ flexDirection: 'row' }}>
                            <Text style={{ flex: 2, fontSize: 20, color: '#1E77BD', fontFamily: 'SourceSansPro-Bold' }}>{item.question.replace("{{player_position}}", item.player_name)}</Text>
                            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end', color: '#00000040', textAlign: 'center' }}>
                              <Text style={{
                                fontSize: 12, color: 'rgba(0,0,0,0.4)', fontFamily: 'SourceSansPro-Bold',
                                alignItems: 'center', textAlign: 'right'
                              }}> TOTAL POT: </Text>
                              <Text style={{
                                paddingLeft: 5, fontSize: 12, color: '#000', fontFamily: 'SourceSansPro-Bold',
                                alignItems: 'center', textAlign: 'right', fontWeight: '600'
                              }}>{item.total_bet_amount} </Text>
                            </View>

                          </Body>
                        </CardItem>
                        <CardItem style={{ paddingBottom: 25 }}>
                          <Left style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                            <Text style={{ fontSize: 10, color: 'rgba(0,0,0,0.4)', fontFamily: 'SourceSansPro-Regular' }}>MIN POINTS</Text>
                            <Text style={{ fontSize: 14, color: '#000', fontFamily: 'SourceSansPro-Regular' }}>{item.entry_fee}</Text>
                          </Left>

                          <Left style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                            <Text style={{ fontSize: 10, color: 'rgba(0,0,0,0.4)', fontFamily: 'SourceSansPro-Regular' }}>PARTICIPANTS</Text>
                            {
                              (item.total_user_joined == '') ?
                                <Text style={{ fontSize: 14, color: '#000', fontFamily: 'SourceSansPro-Regular' }}>0</Text>
                                :
                                <Text style={{ fontSize: 14, color: '#000', fontFamily: 'SourceSansPro-Regular' }}>{item.total_user_joined}</Text>
                            }
                          </Left>
                          <Right style={{ alignSelf: 'flex-end', marginLeft: 10 }}>
                            {/* <Button onPress={() => this.joinBrag(item.contest_id, item.contest_unique_id)} transparent style={{ height: 32, width: 66, borderRadius: 25, borderWidth: 1, borderColor: '#1CBB04', alignItems: 'center', alignSelf: 'flex-end', justifyContent: 'center' }}><Text style={{ textAlign: 'center', fontSize: 14, color: '#1CBB04' }}>BRAG</Text></Button> */}
                            <LinearGradient
                start={{ x: 0.6, y: 0 }} end={{ x: 2.5, y: 1.5 }}
                locations={[0.0, 0.4]}
                colors={['#1B75BC', '#9AD8DD']}
                style={{ borderRadius: 18}}>
                <Ripple onPress={() => this.joinBrag(item.contest_id,item.contest_unique_id)} style = {{backgroundColor: 'transparent'}}>
                  <Text style={{ fontSize: 14,
                      color: '#fff',
                      paddingLeft: 18,
                      paddingRight: 18,
                      paddingTop: 7,
                      paddingBottom: 7,
                      fontFamily:'SourceSansPro-Regular',
                      fontWeight: 'bold' }}>BRAG</Text>
                </Ripple>
              </LinearGradient>
                          </Right>
                        </CardItem>
                      </Card>
                    </View>
                  </View>

                  

                </View>

              }
            />
            : <View style={Styles.NoRecordContainer}>
              <Label style={Styles.white_text_14}>No Brags created for this match.</Label>
              {/* <TouchableOpacity onPress={() => this.goToCreateBrags(true)}>
                <Label style={{ textDecorationLine: 'underline', color: '#1B75BC', fontSize: 16, textAlign: 'center' }}>Create your own brags.</Label>
              </TouchableOpacity> */}
            </View>
          }
        </PTRView>

      </View>


    );
  }
  // conferenceList: this.state.conferenceList, questionList: this.state.questionList, teamList: this.state.teamList, matchList: this.state.matchList, selectedConference: this.state.selectedConference, selectedTeam: this.state.selectedTeam, selectedMatch: this.state.selectedMatch },
  //action: NavigationActions.navigate({ routeName: 'CreateBragScreen' })
  goToCreateBrags(isFromUpComing) {
    const navigateAction = NavigationActions.navigate({
      routeName: 'CreateBragScreen_',
      params: { isFromUpComing:true, conferenceList: this.state.conferenceList, questionList: this.state.questionList, teamList: this.state.teamList, matchList: this.state.matchList, selectedConference: this.state.selectedConference, selectedTeam: this.state.selectedTeam, selectedMatch: this.state.selectedMatch },
      action: NavigationActions.navigate({ routeName: 'CreateBragScreen_' })
    })
    const nav = WSManager.getTopLevelNavigator()
    
    nav.dispatch(navigateAction) 
  }
  joinBrag(contestId, contest_unique_id) {
    const navigateAction = NavigationActions.navigate({
      routeName: 'BHEntries',
      params: { 'contest_id': contestId, 'contest_unique_id': contest_unique_id, isComplete: this.state.isComplete },
      action: NavigationActions.navigate({ routeName: 'BHEntries' })
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
    color: '#000',
    fontFamily: 'SourceSansPro-Regular'
  },
  date_text: {
    fontSize: 14,
    color: Colors.LableTextColor,
    fontFamily: 'SourceSansPro-Regular'
  },
  week_lable_text: {
    fontSize: 14,
    color: Colors.ColorPrimary,
    fontFamily: 'SourceSansPro-Regular'
  },
  week_number_text: {
    fontSize: 22,
    marginBottom: -3,
    marginTop: -3,
    color: Colors.ColorPrimary,
    fontFamily: 'SourceSansPro-Regular'
  }, NoRecordContainer: {
    height: '100%',
    width: WW,
    alignItems: 'center',
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },

});

const CustomHeader = ({ navigation }) => (
  <LinearGradient
    start={{ x: 0.6, y: 0 }} end={{ x: 2.5, y: 1.5 }}
    locations={[0.0, 0.4]}
    colors={['#1B75BC', '#9AD8DD']}
    style={{ paddingTop: Platform.OS === "ios" ? 30 : 20 }}
  >

    <View style={{ flexDirection: 'row', padding: 15, alignItems: 'center' }}>
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'transparent' }}>
        <View style={{ alignItems: 'center', marginLeft: 0 }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={AppStyles.header_title}>{mContext.props.navigation.getParam('item', '').home_common_name} vs {mContext.props.navigation.getParam('item', '').away_common_name}</Text>
            <Text style={AppStyles.header_title}>{Utility.getFormatedDate(mContext.props.navigation.getParam('item', '').season_scheduled_date, 'ddd, MMM Do - hh:mm A')}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity onPress={() => navigation.goBack(null)} style={{ position: "absolute", marginLeft: 15, backgroundColor: 'transparent' }} transparent>
        <Image source={Images.back} defaultSource={Images.back} />
      </TouchableOpacity>

    </View>
  </LinearGradient>
);
