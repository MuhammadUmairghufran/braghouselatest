import React, { Component } from 'react';
import { Card, CardItem, Body, Button, Right, Left, Separator, H3, Container, Content, Tab, Tabs, TabHeading, Header, StyleProvider, Icon, Title, Subtitle, List } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { TouchableOpacity, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, ScrollView, ImageBackground, FlatList, Dimensions, Platform, ActivityIndicator, Animated, StatusBar } from 'react-native';
import { AppStyles, Images } from '../../Themes'
import * as Colors from '../../Constants/Colors/';
import LinearGradient from 'react-native-linear-gradient';
import IMAGES from '../../Constants/Images';
import Loader from '../../Utils/Loader/';
import ConstantLib  from '../../Constants/ConstantLib/';
import {getItem,saveItem} from '../../lib/Session';
import PreferenceConstant from '../../Preferences/PreferenceConstant';
import * as URLConstants from '../../Networking/URLConstants/';
import WSManager from '../../Networking/WSManager/';
import Utility from '../../Utils/Utility/';
import { SafeAreaView, NavigationActions } from 'react-navigation';
import Ripple from 'react-native-material-ripple';
import PTRView from 'react-native-pull-to-refresh';

let mContext = null;
const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[AppStyles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);
 export default class BHLobbyDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
    nextOffset:-1,
    canLoadMoreContent:true,
    match_list:[],
    contest_list:[],
    loading:false,
    match_data:'',
    }
  }
  static navigationOptions = ({navigation}) => {
  return {
  header: <CustomHeader this navigation={navigation} />
  };
  };
componentDidMount()
{
  mContext=this;
  this.callGetFixtureApi()
  this.getLobbyMasterData();
}
_refresh () {
    // you must return Promise everytime
    return new Promise((resolve) => {
      setTimeout(()=>{
        mContext.setState({nextOffset:-1});
      mContext.getLobbyMasterData();
        resolve();
      }, 100)
    })
}
  _renderBragsRow = (rowData, sectionID, rowID) => {
    return (
      <Ripple onPress={()=>this.navigateToFixtureBrags(rowData)} style={Styles.list_item_parent}>

        <View style={{ flexDirection: 'row' }}>
          <Text style={Styles.team_text} >{rowData.home}</Text>
          <Text style={{ fontFamily:'SourceSansPro-Regular'}}> vs </Text>
          <Text style={Styles.team_text}>{rowData.away}</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text style={Styles.date_text}>{Utility.getFormatedDate(rowData.season_scheduled_date,'ddd, MMM Do - hh:mm A')}</Text>
        </View>

      </Ripple>
    )
  }

    blankData=async () => {
    }

    callGetFixtureApi() {
      this.setState({ loading: true })
      const params = {
        sports_id:'2',
        league_id: '113',
        status: '0',
        conference_id: ConstantLib.DATA.conference_id,
        //week:this.state.selectedWeek
  
      };
  
      WSManager.postData(URLConstants.GET_FIXTURE_LIST, params)
        .then(response => {
          this.setState({ loading: false }, function()
          {
            setTimeout(() => {
              var data = response.data.data;
  
              this.setState({ match_list:  data.match_list}, () => {
                setTimeout(() => {
                  //this.upcomingMatchesList
                  
                  //this.forceMount
  
                }, 200);
              });    
              console.log('callGetFixtureApi = ' + JSON.stringify(data.match_list));
            },200);
  
          })
          
        })
        .catch(error => {
          this.setState({ loading: false }, function()
          {
            setTimeout(() => {
              //console.log('Error = ' + JSON.stringify(error.response.data));
              return error;  
            }, 200);
          })
        });
    }
  
     getLobbyMasterData=async () => {
          if(this.state.canLoadMoreContent){
               var cPage = this.state.nextOffset + 1;
               this.setState({canLoadMoreContent:false})
               this.setState({nextOffset:cPage});
                const params = {

                   	conference_id:ConstantLib.DATA.conference_id,
                  	sort_field: 'season_scheduled_date',
                  	sort_order: 'DESC',
                  	offset: cPage,
                  	limit: '20'

                };
                this.setState({loading: true})
                WSManager.postData(URLConstants.GET_LOBBY_MASTER_DATA, params)
                .then(response => {

                    var data = response.data.data;
                    var mList = data.contest_list;
                    this.setState({ contest_list: [...this.state.contest_list, ...mList] });
                    //this.setState({match_list:data.match_data.match_list});
                    
                    console.log('getLobbyMasterData=======>>>>>>>>>'+JSON.stringify(data));
                    this.setState({loading: false})
                    console.log('contest_list_next_offset=======>>>>>>>>>'+data.contest_list_next_offset);
                    console.log('contest_list_is_load_more=======>>>>>>>>>'+data.contest_list_is_load_more);
                    if(data.contest_list_is_load_more){
                       this.setState({canLoadMoreContent:true});
                    }
                    else{
                       this.setState({canLoadMoreContent:false});
                    }
                })
                .catch(error => {
                  this.setState({loading: false})
                   return error;
                });
          }
      }

  render() {
    mContext = this;
    return (

      <View style={[AppStyles.Wrapper, {backgroundColor:'#F3F3F3'}]}>
        <MyStatusBar backgroundColor="rgba(0,0,0,0)" barStyle="light-content" />
        {/* <Loader loading={this.state.loading} /> */}

    <PTRView  onRefresh={this._refresh}>


        <View style={{ flexDirection: 'row', backgroundColor:'#fff', elevation: 5, shadowColor: '#000', shadowOpacity: .2, shadowOffset: { width: 0, height: 2 } }}>

          <List
            style={{ minHeight: 75, }}
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            dataArray={this.state.match_list}
            renderRow={(item, sectionID, rowID) => this._renderBragsRow(item, sectionID, rowID)}>
          </List>
        </View>

        <FlatList
          data={this.state.contest_list}
          canLoadMore={this.state.canLoadMoreContent}
          onEndReached={this.getLobbyMasterData}
          onEndThreshold={this.state.contest_list.length - 3}
          renderItem={({ item }) =>
            <View>
              <View style={{ margin: 5, }}>
                <View style={{ position: 'relative' }}>
                  <Card style={{ paddingBottom: 2, paddingTop: 5, borderRadius: 5, borderWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, marginBottom: 0 }}>
                  <View style={{ flexDirection:'row',flex:1,justifyContent: 'flex-end' , color: '#00000040',textAlign:'center', marginHorizontal: 10}}>
                         <Text style={{ fontSize: 12, color: 'rgba(0,0,0,0.4)', fontFamily:'SourceSansPro-Bold',
                                alignItems: 'center',textAlign:'right'}}> TOTAL POT: </Text>
                         <Text style={{ paddingLeft:5,fontSize: 12, color: '#000', fontFamily:'SourceSansPro-Bold',
                                       alignItems: 'center',textAlign:'right', fontWeight:'600' }}>{item.total_bet_amount} </Text>
                         </View>
                    <CardItem>
                    
                      <Body style={{marginVertical: 0}}>
                        <Text style={{ flex:1,fontSize: 20, color: '#1E77BD', fontFamily:'SourceSansPro-Bold' }}>{item.question.replace("{{player_position}}",item.player_position)}</Text>
                      </Body>
                      
                    </CardItem>
                    <CardItem style={{ paddingBottom: 25 }}>
                      <Left style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                        <Text style={{ fontSize: 10, color: 'rgba(0,0,0,0.4)', fontFamily:'SourceSansPro-Regular'    }}>MIN BRAGS</Text>
                        <Text style={{ fontSize: 14, color: '#000', fontFamily:'SourceSansPro-Bold',  }}>{item.entry_fee}</Text>
                      </Left>
                      <Left style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                        <Text style={{ fontSize: 10, color: 'rgba(0,0,0,0.4)', fontFamily:'SourceSansPro-Regular' }}>PARTICIPANTS</Text>
                        {
                            (item.total_user_joined=='')?
                            <Text style={{ fontSize: 14, color: '#000', fontFamily:'SourceSansPro-Regular' }}>0</Text>
                            :
                            <Text style={{ fontSize: 14, color: '#000', fontFamily:'SourceSansPro-Bold' }}>{item.total_user_joined}</Text>
                        }
                      </Left>
                      
                      <Right style={{ alignSelf: 'flex-end', marginLeft: 10 }}>

                      <LinearGradient
                start={{ x: 0.6, y: 0 }} end={{ x: 2.5, y: 1.5 }}
                locations={[0.0, 0.4]}
                colors={['#1B75BC', '#9AD8DD']}
                style={{ borderRadius: 18}}>
                <Ripple onPress={() => this.joinBrag(item.contest_id,item.contest_unique_id, ConstantLib.DATA.conference_name)} style = {{backgroundColor: 'transparent'}}>
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

    </PTRView>
      </View>
    );
  }

  navigateToFixtureBrags(rowData){
    ConstantLib.DATA = rowData;
    this.props.navigation.navigate('MatchFixtures')
    const navigateAction = NavigationActions.navigate({
      routeName: 'MatchFixtures',
      params: {item:rowData},
      action: NavigationActions.navigate({ routeName: 'MatchFixtures' })
    })
    const nav = WSManager.getTopLevelNavigator()
    nav.dispatch(navigateAction)
  }

  joinBrag(contestId,contest_unique_id, conference_name){
    const navigateAction = NavigationActions.navigate({
      routeName: 'BHEntries',
      params: {'contest_id':contestId,'contest_unique_id':contest_unique_id, 'conference_name':conference_name, 'isFromConference': true},
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
    marginTop:1,
    justifyContent: 'center',
    height: 50,
    minWidth: 150,
    paddingLeft: 10,
    paddingRight: 10,
    alignSelf: 'center',
    borderRadius: 2,
    borderColor: '#CCCCCC',//Colors.LableTextColor, // on selection #A2C1CE
    borderWidth:1

  },
  team_text: {
    fontSize: 14,
    color: '#000',
    fontFamily:'SourceSansPro-Regular'
  },
  date_text: {
    fontSize: 14,
    color: Colors.LableTextColor,
    fontFamily:'SourceSansPro-Regular'
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
});

const CustomHeader = ({navigation}) => (

  <ImageBackground
    source={Images.gredient_bg}
    style={{ paddingTop: Platform.OS === "ios" ? 10 : 20, width: '100%', height: '100%' }
    }
  >
  <View style={{ flexDirection:'row',padding:15,  alignItems:'center'}}>
            <TouchableOpacity onPress={()=> navigation.goBack(null)} style={{flex:1,justifyContent:"flex-start"}} transparent>
            <Image source={Images.back} />
            </TouchableOpacity>
        <View style={{ flex:12,justifyContent:'flex-start'}}>
              <View style={{ alignItems:'center'}}>

                    <View style={{ flexDirection:'row',alignItems:'center'}}>
                                <Text   style={AppStyles.header_title}>Duke</Text>
                    </View>
              </View>
                  <Text   style={AppStyles.header_sub_title}>sjhsj</Text>
        </View>
    </View>
  </ImageBackground>
);
