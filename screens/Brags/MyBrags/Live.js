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




export default class Live extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
            fixtureList:[]
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
    	<View style={{backgroundColor:'#DDDDDD', flex:1,}}>
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
                {this.state.fixtureList.length > 0 ? 
                <FlatList
                showsHorizontalScrollIndicator = {false}
                  data={this.state.fixtureList}
                   renderItem={({ item,index }) =>

    <TouchableOpacity onPress={() => this.navigateToFixtureBrags(item)} style={{flexDirection:'row',padding:7,backgroundColor:'white',marginTop:10 }}>
       <View style={{ flex:3}}>

         <View style={{flexDirection:'row',alignItems:'center',height:30,width:'100%'}}>
               <View style={{flexDirection:'row',flex:2,alignItems:'center'}}>
               <Image style={{width:15,marginLeft:7,alignSelf:'center',height:15}}source={{uri: item.flag_home}} />
               <Text style={{fontSize:10,marginLeft:7,textAlign:'center',color:'gray'}}></Text>
               <Text style={{fontSize:14,marginLeft:7,textAlign:'center',color:'#000', fontFamily: 'SourceSansPro-Bold'}}>{item.home_common_name}</Text>
               </View>
               <Text style={{flex:1,fontSize:14,marginLeft:7,textAlign:'center',justifyContent:'flex-end',color:'#000', fontFamily: parseInt(item.home_team_score)>parseInt(item.away_team_score)?'SourceSansPro-Bold':'SourceSansPro-Regular'}}>{item.home_team_score}</Text>

          </View>
         <View style={{flexDirection:'row',height:30,width:'100%',marginTop:7,alignItems:'center'  }}>
         <View style={{flexDirection:'row',flex:2,alignItems:'center'}}>
         <Image style={{width:15,marginLeft:7,alignSelf:'center',height:15}}source={{uri: item.flag_away}} />
         <Text style={{fontSize:10,marginLeft:7,textAlign:'center',color:'gray'}}></Text>
         <Text style={{fontSize:14,marginLeft:7,textAlign:'center',color:'#000', fontFamily: 'SourceSansPro-Bold'}}>{item.away_team_name}</Text>
         </View>
             <Text style={{flex:1,fontSize:14,marginLeft:7,textAlign:'center',justifyContent:'flex-end',color:'#000', fontFamily: parseInt(item.away_common_name)>parseInt(item.home_team_score)?'SourceSansPro-Bold':'SourceSansPro-Regular'}}>{item.away_team_score}</Text>

         </View>
       </View>
       <View style={{backgroundColor:'#F5F5F5',height:50,width:1,marginTop:5,justifyContent:'center'}}/>


       <View style={{flex:1,height:60,width:'100%',justifyContent:'center'}}>

      <Text style={{fontSize:12,textAlign:'center',color:'green', fontFamily: 'SourceSansPro-Bold'}}>{'IN PROGRESS'}</Text>
      {/* {item.status == 2?'FINAL':'COMPLETED'}</Text> */}

      <View>
       <Text style={{fontSize:11,textAlign:'center',color:'gray',paddingTop:5}}>{Utility.getFormatedDate(item.season_scheduled_date,'ddd, MMM Do')}</Text>
       <Text style={{fontSize:11,textAlign:'center',color:'gray',paddingTop:5, fontFamily: 'SourceSansPro-Regular'}}>{Utility.getFormatedDate(item.season_scheduled_date,'hh:mm A')}</Text>
       </View>
         </View>

    </TouchableOpacity>

  }
  />
  :<View style = {{alignSelf: 'center', alignItems: 'center', height:'100%', justifyContent: 'center'}}><Text style = {{ fontFamily: 'SourceSansPro-Regular', fontSize:14, fontWeight:'600'}}>Currently no Live Match is present.</Text></View>}

</View>
    );
  }


    navigateToFixtureBrags(rowData){
      ConstantLib.DATA = rowData;
      this.props.navigation.navigate('MatchFixtures')
      const navigateAction = NavigationActions.navigate({
        routeName: 'MatchFixtures',
        params: {item:rowData,isLive:'1'},
        action: NavigationActions.navigate({ routeName: 'MatchFixtures' })
      })
      const nav = WSManager.getTopLevelNavigator()
      nav.dispatch(navigateAction)
    }



  getContest(){

      const params = {
      sports_id: '2',
      league_id: '113',
      status: 1,
         };
     this.setState({loading: true})
      WSManager.postData(URLConstants.GET_FIXTURE_LIST, params)
     .then(response => {
      var data = response.data.data;
    console.log('DATA :::::::::::'+JSON.stringify(data));
   this.setState({fixtureList:data.match_list});
     this.setState({loading: false})
  })
   .catch(error => {
    this.setState({loading: false})
    Toaster.showLongToast('getAllConferences:'+error.message);
    return error;
  });
}


}
