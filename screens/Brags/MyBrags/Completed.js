import React, { Component } from 'react';
import {Card, CardItem, Body, Button, Right, Left, Separator, H3, Container, Header, Content, Tab, Tabs, TabHeading,  Item,Label,Input, Title } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {TouchableOpacity, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, ScrollView, ImageBackground,
  FlatList, SectionList, Dimensions, Platform, ActivityIndicator} from 'react-native';

import { AppStyles, Images } from '../../../Themes'//Themes'
import LinearGradient from 'react-native-linear-gradient';
import Utility from '../../../Utils/Utility/';
import WSManager from '../../../Networking/WSManager/';
import * as URLConstants from '../../../Networking/URLConstants/';
import {getItem,saveItem} from '../../../lib/Session';
import PreferenceConstant from '../../../Preferences/PreferenceConstant';
import ConstantLib from '../../../Constants/ConstantLib';
import Loader from '../../../Utils/Loader/';
import { NavigationActions } from 'react-navigation';




export default class Completed extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
            sectionList:[]
	    }
	  }
    componentDidMount()
    {
      getItem(PreferenceConstant.SESSION_KEY).then((value)=>{
          ConstantLib.SESSION_KEY=value;
          this.getContest();

      })
    }



  static navigationOptions = {
    header: null
  };
  render() {
    return (
    	<View style={{backgroundColor:'#E8E8E8', flex:1,}}>
	    	{ Platform.OS === 'ios' && <View style={{shadowColor: '#000000',
	    			    //elevation: 10,
	    			    shadowOpacity: 0.4,
	    			    shadowOffset: { width: 0, height: 10},
	    			    shadowRadius: 10,
	    			    backgroundColor: '#f4f4f4',
	    			    height: 8,
	    			    marginTop: -16,
                zIndex: 9,
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
                return(  <TouchableOpacity onPress={() => this.detail(item.contest_type,item.contest_id, item.contest_unique_id)}>
                    <Card style={{paddingVertical: 15, borderRadius: 5, marginBottom: 15, borderWidth: 0, shadowColor: '#000', elevation: 2, shadowOpacity: 0.2, shadowOffset: { width: 0, height: 2 }, shadowRadius: 10,
                                    borderTopWidth: 0, borderBottomWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, marginLeft: 15, marginRight: 15}}>
                                    <CardItem>
                                      <Body>
                          <View style={{flexDirection:'row'}}>
                          <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10}}>
                                      <View><Text style={{fontSize: 14, color: '#00000040', fontFamily:'SourceSansPro-Regular'}}>Week{item.season_week}</Text></View>
                                      <View style={{height: 4, borderRadius:2, width: 4, backgroundColor: '#9B9B9B', margin: 5}}>
                                      </View>
                                      <View><Text style={{fontSize: 14, color: '#00000040', fontFamily:'SourceSansPro-Regular'}}>{Utility.getFormatedDate(item.season_scheduled_date,'ddd, MMM Do - hh:mm A')}</Text></View>
                                  </View>
                                  <View style={{ flexDirection:'row',marginTop:0,flex:1,justifyContent: 'flex-end' , color: '#00000040',textAlign:'center'}}>
                                      <Text style={{ fontSize: 12, color: 'rgba(0,0,0,0.4)', fontFamily:'SourceSansPro-Bold', alignItems: 'center',textAlign:'right'}}> TOTAL POT: </Text>
                                      <Text style={{ paddingLeft:5,fontSize: 12, color: '#000', fontFamily:'SourceSansPro-Bold',
                                             alignItems: 'center',textAlign:'right', fontWeight:'600' }}>{item.total_bet_amount} </Text>
                                  </View>
               </View>
                                  
                                  <Text style={{flex:2,fontSize: 20, fontFamily:'SourceSansPro-Bold', color:'rgb(0,97,177)'}}>{item.question.replace("{{player_position}}",item.player_name)}</Text>
                                  <View style={{ height: 1, backgroundColor: '#EFEEEE', marginLeft: -20, marginTop: 15, marginRight: -15
  }}></View>
                                      </Body>
                                    </CardItem>
                                    <CardItem>
                                <Body style={{ flexDirection: 'column'}}>
                                <View style={{flex: 1 , flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 0}}>
                                  <View style={{flex: 1 }}><Text style={{fontSize: 10, fontFamily:'SourceSansPro-Bold', color: '#00000040', }}>BET POINTS</Text></View>
                                  <View style={{flex: 1 }}><Text style={{fontSize: 10, fontFamily:'SourceSansPro-Bold', color: '#00000040', }}>WON POINTS</Text></View>
                                  <View style={{flex: 1 }}><Text style={{fontSize: 10, fontFamily:'SourceSansPro-Bold', color: '#00000040', }}>PARTICIPANTS</Text></View>
                                </View>

                                <View style={{flex: 1 , flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                                  <View style={{flex: 1 }}><Text style={{  fontSize: 16, fontFamily:'SourceSansPro-Bold', color: '#000000', }}>{item.my_bet_amount}</Text></View>
                                  <View style={{flex: 1 }}><Text style={{ fontSize: 16, fontFamily:'SourceSansPro-Bold', color: '#000000', }}>{item.my_win_amount}</Text></View>
                                  <View style={{flex: 1 }} ><Text style={{  fontSize: 16, fontFamily:'SourceSansPro-Bold', color: '#000000', }}>{item.total_user_joined}</Text></View>
                                </View>
                                    </Body>
                                    </CardItem>
                            </Card>
                              </TouchableOpacity>);
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

              sections = {this.state.sectionList}

              >
              </SectionList>




      </View>
    );
  }


  detail(contestType,contestId, contest_unique_id) {

// if(contestType==='2')
// {
//     const navigateAction = NavigationActions.navigate({
//       routeName: 'HotBragQA',
//       params: { 'contest_id': contestId, 'contest_unique_id': contest_unique_id,isComplete:'1' },
//       action: NavigationActions.navigate({ routeName: 'HotBragQA' })
//     })
//     const nav = WSManager.getTopLevelNavigator()
//     nav.dispatch(navigateAction)
// }else {
     const navigateAction = NavigationActions.navigate({
      routeName: 'BHEntries',
      params: { 'contest_id': contestId, 'contest_unique_id': contest_unique_id ,isComplete:'1'},
      action: NavigationActions.navigate({ routeName: 'BHEntries' })
    })
    const nav = WSManager.getTopLevelNavigator()
    nav.dispatch(navigateAction)
//    }
  }




  getContest(){

      const params = {
      status: 2,
      offset: 0,
         };
     this.setState({loading: true})
      WSManager.postData(URLConstants.GET_MY_LEAGUES, params)
     .then(response => {
      var data = response.data.data;
      console.log('Getmyleag'+JSON.stringify(data));
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
