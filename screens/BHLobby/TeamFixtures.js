import React, { Component } from 'react';
import { Card, CardItem, Body, Button, Right, Left, Separator, H3, Container, Content, Tab, Tabs, TabHeading, Header, StyleProvider, Icon, Title, Subtitle, List ,Label} from 'native-base';
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
import {  NavigationActions } from 'react-navigation';

const HH = Dimensions.get('window').height;
const WW = Dimensions.get('window').width;
const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[AppStyles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

const CustomHeader = ({navigation}) => (
  <LinearGradient
        start={{x: 0.6, y: 0}} end={{x: 2.5, y: 1.5}}
        locations={[0.0, 0.4]}
        colors={['#1B75BC', '#9AD8DD']}
        style={{paddingTop: Platform.OS === "ios" ? 30 : 20}}
        >

        <View style={{ flexDirection:'row',padding:15,  alignItems:'center'}}>
                  <TouchableOpacity onPress={()=> navigation.goBack(null)} style={{flex:1,justifyContent:"flex-start"}} transparent>
                  <Image source={Images.back} />
                  </TouchableOpacity>
              <View style={{ flex:12,justifyContent:'flex-start'}}>
                    <View style={{ alignItems:'center'}}>

                          <View style={{ flexDirection:'row',alignItems:'center'}}>
                                      <Text   style={AppStyles.header_title}>{ConstantLib.DATA2.team_name}</Text>

                          </View>
                    </View>
              </View>
          </View>
  </LinearGradient>
);

export default class TeamFixtures extends Component {
  constructor(props) {
    super(props);
    this.state = {
    currentPage:0,
    canLoadMoreContent:false,
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
  this.getLobbyMasterData();
}
  _renderBragsRow = (rowData, sectionID, rowID) => {
    return (
      <View style={Styles.list_item_parent}>

        <View style={{ flexDirection: 'row' }}>
          <Text style={Styles.team_text} >Alabama</Text>
          <Text style={{ fontFamily:'SourceSansPro-Regular' }}> VS </Text>
          <Text style={Styles.team_text}>Vanderbilt</Text>

        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text style={Styles.date_text}>Apr 24, Sat - 12:00 AM</Text>
        </View>

      </View>
    )
  }


  blankData=async () => {
  }
   getLobbyMasterData=async () => {
       var cPage = 0;
       if(this.state.contest_list.length===0){
           cPage = 0;
       }
       else{
           cPage = this.state.currentPage+1;
       }


        const params = {
           	team_league_id:ConstantLib.DATA2.team_league_id,
          	sort_field: 'season_scheduled_date',
          	sort_order: 'DESC',
          	offset: cPage,
          	limit: '20'
        };
        this.setState({loading: true})
        WSManager.postData(URLConstants.GET_CONTESTS_OF_LEAGUE, params)
        .then(response => {

                  var data = response.data.data;
                  console.log(JSON.stringify(data));
                 this.setState({contest_list:data.contest_list});
                 if(data.contest_list.length<20){
                   this.setState({canLoadMoreContent:false});
                 }
                 else{
                     this.setState({canLoadMoreContent:true});
                 }
          this.setState({loading: false})
        })
        .catch(error => {
          this.setState({loading: false})
           return error;
        });
      }



  render() {
    return (


      <View style={[AppStyles.Wrapper, {backgroundColor:'#fff'}]}>
        <MyStatusBar backgroundColor="rgba(0,0,0,0)" barStyle="light-content" />

        <Loader loading={this.state.loading} />


       {(this.state.contest_list.length > 0) ?
        <FlatList
          data={this.state.contest_list}
          canLoadMore={this.state.canLoadMoreContent}
          onEndThreshold={this.state.contest_list.length>=20?this.state.contest_list.length-2:0}
          onEndReached={this.state.canLoadMoreContent==true?this.getLobbyMasterData:this.blankData}
          renderItem={({ item }) =>

              <View style={{ margin: 5 }}>
                <View style={{ position: 'relative' }}>
                  <Card style={{ paddingVertical: 2, borderRadius: 5, borderWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, marginBottom: 3 }}>

                    <CardItem>
                      <Body>
                        <Text style={{ fontSize: 20, color: '#1E77BD', fontFamily:'SourceSansPro-Regular' }}>{item.question.replace("{{player_position}}",item.player_name)}</Text>
                      </Body>
                    </CardItem>
                    <CardItem style={{ paddingBottom: 25 }}>
                      <Left style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                        <Text style={{ fontSize: 10, color: 'rgba(0,0,0,0.4)', fontFamily:'SourceSansPro-Regular' }}>MIN POINTS</Text>
                        <Text style={{ fontSize: 14, color: '#000', fontFamily:'SourceSansPro-Regular' }}>{item.entry_fee}</Text>
                      </Left>

                      <Left style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                        <Text style={{ fontSize: 10, color: 'rgba(0,0,0,0.4)', fontFamily:'SourceSansPro-Regular' }}>PARTICIPANTS</Text>
                        {
                            (item.total_user_joined=='')?
                            <Text style={{ fontSize: 14, color: '#000', fontFamily:'SourceSansPro-Regular' }}>0</Text>
                            :
                            <Text style={{ fontSize: 14, color: '#000', fontFamily:'SourceSansPro-Regular' }}>{item.total_user_joined}</Text>
                        }
                      </Left>
                      <Right style={{ alignSelf: 'flex-end', marginLeft: 10 }}>
                        <Button onPress={() => this.joinBrag(item.contest_id,item.contest_unique_id)} transparent style={{ height: 32, width: 66, borderRadius: 25, borderWidth: 1, borderColor: '#1CBB04', alignItems: 'center', alignSelf: 'flex-end', justifyContent: 'center' }}><Text style={{ textAlign: 'center', fontSize: 14, color: '#1CBB04' }}>BRAG</Text></Button>
                      </Right>
                    </CardItem>
                  </Card>
                </View>
              </View>


          }
        />
        :
        <View style={Styles.NoRecordContainer}>
          <Label style={Styles.white_text_14}>No record to display</Label>
        </View>
      }
      </View>


    );
  }

  joinBrag(contestId,contest_unique_id){
    const navigateAction = NavigationActions.navigate({
      routeName: 'BHEntries',
      params: {'contest_id':contestId,'contest_unique_id':contest_unique_id},
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
    fontFamily:'SourceSansPro-Regular'
  },
  week_number_text: {
    fontSize: 22,
    marginBottom: -3,
    marginTop: -3,
    color: Colors.ColorPrimary,
    fontFamily:'SourceSansPro-Regular'
  },  NoRecordContainer:{
      height:300,
      width:WW,
      alignItems:'center',
      backgroundColor:'transparent',
      justifyContent:'center',
    },

});
