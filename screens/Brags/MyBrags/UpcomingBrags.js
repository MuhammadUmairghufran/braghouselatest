import React, { Component } from 'react';
import {Card, CardItem, Body, Button, Right, Left, Separator, H3, Container, Header, Content, Tab, Tabs, TabHeading,  Item,Label,Input, Title } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {TouchableOpacity, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, ScrollView, ImageBackground,
FlatList, SectionList, Dimensions, Platform, ActivityIndicator} from 'react-native';
import { AppStyles, Images } from '../../../Themes'//Themes'
import LinearGradient from 'react-native-linear-gradient';
 import WSManager from '../../../Networking/WSManager/';
import * as URLConstants from '../../../Networking/URLConstants/';
import {getItem,saveItem} from '../../../lib/Session';
import PreferenceConstant from '../../../Preferences/PreferenceConstant';
import ConstantLib from '../../../Constants/ConstantLib';
import Utility from '../../../Utils/Utility/';
import Loader from '../../../Utils/Loader/';
import * as Colors from '../../../Constants/Colors/';
import Ripple from 'react-native-material-ripple';
import { NavigationActions } from 'react-navigation';

 export default class UpcomingBrags extends Component {

  constructor(props) {
	    super(props);
	    this.state = {
      sectionList:[]
	    }
	  }
  static navigationOptions = {
    header: null
  };
componentDidMount()
{
  getItem(PreferenceConstant.SESSION_KEY).then((value)=>{
      ConstantLib.SESSION_KEY=value;
      this.getContest();

  })
}

joinBrag(contestId, contest_unique_id) {
   const navigateAction = NavigationActions.navigate({
    routeName: 'BHEntries',
    params: { 'contest_id': contestId, 'contest_unique_id': contest_unique_id ,isComplete:'0'},
    action: NavigationActions.navigate({ routeName: 'BHEntries' })
  })
  const nav = WSManager.getTopLevelNavigator()
  nav.dispatch(navigateAction)
}

  render() {
    return (
    	<View style={{backgroundColor:'#E8E8E8', flex:1}}>
	    	{ Platform.OS === 'ios' && <View style={{shadowColor: '#000',
	    			    elevation: 10,
	    			    shadowOpacity: 0.4,
	    			    shadowOffset: { width: 0, height: 10},
	    			    shadowRadius: 10,
	    			    backgroundColor: '#f4f4f4',
	    			    height: 8,
	    			    marginTop: -16  ,
	    			    zIndex: 9
	    				}}>
	    		    	</View>}
	    		    	{ Platform.OS === 'android' && <View style={{shadowColor: '#000',
	    			    elevation: 10,
	    			    shadowOpacity: 0.2,
	    			    shadowOffset: { width: 0, height: 2},
	    			    shadowRadius: 10,
	    			    backgroundColor: '#76BCD4',
	    			    height: 15,
	    			    marginTop: -14
	    			    }}>
	    		    	</View>}

                <Loader loading={this.state.loading} />


          <SectionList style = {{marginTop: 30}}
              renderItem = {({ item, index}) => {
                return(

                  <View>





  <Ripple onPress={() => this.joinBrag(item.contest_id, item.contest_unique_id)}>

                  <View style={Style.question_card_item}>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Text style = {{fontFamily:'SourceSansPro-Regular', color: '#00000040' }}>Week {item.season_week}</Text>
                      <View style={{ height: 5, width: 5, borderRadius: 2.5, backgroundColor: '#9B9B9B', marginLeft: 3 }}>
                      </View>
                      <Text style={{ marginLeft: 3, fontFamily:'SourceSansPro-Regular', color: '#00000040' }}>{Utility.getFormatedDate(item.season_scheduled_date, 'ddd, MMM Do - hh:mm A')}</Text>

                      <View style={{ flexDirection:'row',flex:1,justifyContent: 'flex-end' , color: '#00000040',textAlign:'center'}}>
                          <Text style={{ fontSize: 12, color: 'rgba(0,0,0,0.4)', fontFamily:'SourceSansPro-Bold', alignItems: 'center',textAlign:'right'}}> TOTAL POT: </Text>
                          <Text style={{ paddingLeft:5,fontSize: 12, color: '#000', fontFamily:'SourceSansPro-Bold',
                                 alignItems: 'center',textAlign:'right', fontWeight:'600' }}>{item.total_bet_amount} </Text>
                      </View>
                    </View>
                    <Text style={Style.question_text}>{item.question.replace("{{player_position}}", item.player_name)}</Text>
                    <View style={Style.seperator_style}></View>



                    <View style={Style.cards_bottom_view}>
                      <View>
                        <Text style={Style.question_card_lable_text}>BET POINTS</Text>
                        <Text style={Style.question_card_value_text}>{item.my_bet_amount}</Text>
                      </View>
                      <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                        <Text style={{ fontSize: 10, color: 'rgba(0,0,0,0.4)', fontFamily:'SourceSansPro-Regular', fontWeight:'600'  }}>PARTICIPANTS</Text>
                        {
                          (item.total_user_joined== '') ?
                            <Text style={{ fontSize: 14, color: '#000', fontFamily:'SourceSansPro-Regular', fontWeight:'600'  }}>0</Text>
                            :
                            <Text style={{ fontSize: 14, color: '#000', fontFamily:'SourceSansPro-Regular', fontWeight:'600'  }}>{item.total_user_joined}</Text>
                        }
                      </View>
                      <View style={{ justifyContent: 'center' }}>
                        <LinearGradient
                          start={{ x: 0.6, y: 0 }} end={{ x: 2.5, y: 1.5 }}
                          locations={[0.0, 0.4]}
                          colors={['#1B75BC', '#9AD8DD']}
                          style={Style.play_button_gradient}>

                            <Text style={Style.play_button_text}>BRAG</Text>

                        </LinearGradient>
                      </View>

                    </View>
                  </View>

  </Ripple>















                  </View>
                );
              }}

              renderSectionHeader = {({section}) => {
                return(

                  <View style = {{flexDirection: 'row', alignItems: 'baseline', justifyContent: 'center' }}>
                    <View><Text style = {{textAlign: 'center', fontSize: 20,  color: "#222222", fontFamily:'SourceSansPro-Bold'}} >{section.home_common_name}</Text></View>
                    <View><Text style = {{textAlign: 'center', fontSize: 14,color: "#666666", marginHorizontal: 10, fontFamily:'SourceSansPro-Regular'}} > VS </Text></View>
                    <View><Text style = {{textAlign: 'center', fontSize: 20,  color: "#222222", fontFamily:'SourceSansPro-Bold'}} >{section.away_common_name}</Text></View>
                </View>


            );
              }}

              stickySectionHeadersEnabled = {false}

              sections = {this.state.sectionList}  >
              </SectionList>

      </View>
    );
  }


    getContest(){

        const params = {
       	status: 0,
	      offset: 0,
           };
       this.setState({loading: true})
        WSManager.postData(URLConstants.GET_MY_LEAGUES, params)
       .then(response => {
        var data = response.data.data;
        console.log('getContest===1'+JSON.stringify(response));
        sectionList=data.contest_list;
        this.setState({sectionList:data.contest_list});
        this.setState({loading: false})
    })
     .catch(error => {
      this.setState({loading: false})
      Toaster.showLongToast('getAllConferences:'+error.message);
      return error;
    });
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
    backgroundColor: '#415561',
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
     marginBottom: 7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation:7,
  }

});
