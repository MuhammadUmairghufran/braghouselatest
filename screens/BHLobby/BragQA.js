import React, { Component } from 'react';
import { Card, CardItem, Body, Button, Right, Left, Separator, H3, Container, Header, Content, Tab, Tabs, TabHeading, Item, Label, Input } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {
  TouchableOpacity, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, ScrollView, ImageBackground,
  FlatList, Dimensions, Platform, ActivityIndicator, SafeAreaView
} from 'react-native';
import { AppStyles, Images } from '../../Themes'
import LinearGradient from 'react-native-linear-gradient';
import JoinBragStyle from './JoinBragStyle';
import * as URLConstants from '../../Networking/URLConstants/';
import WSManager from '../../Networking/WSManager/';
import ConstantLib from '../../Constants/ConstantLib';
import * as IMAGES from '../../Constants/Images';
import Loader from '../../Utils/Loader/';
import Ripple from 'react-native-material-ripple';
import AutoComplete from 'react-native-autocomplete-input';
import Toaster from '../../Utils/Toaster/';
import { NavigationActions, StackActions } from 'react-navigation';
import Utility from '../../Utils/Utility/';
import { getItem, saveItem } from '../../lib/Session';

import PreferenceConstant, { UserCurrentBalancePreferenceConstant } from '../../Preferences/PreferenceConstant';

export default class BragQA extends Component {
  static navigationOptions = {
    header: null
  };

	constructor(props) {
			super(props);
			this.state = {
				loading:false,
				responseData:'',
				selectedOptionId:'',
				bidAmount: '',
        contest_id:'',
        contest_unique_id:'',
        searchText:'',
        searchItem:'',
        SearchResults: [],
        hideResult:false,
        isComplete:'0',
        winner_team_league_id:[],
        playerDetails: [],
        isShowPlayerProjection:false
			}
	}

  render() {
    return (
      <View style={[AppStyles.Wrapper, { backgroundColor: 'rgba(232, 233, 232,1.0)' }]}>
        {Platform.OS === 'ios' &&
          <View style={{
            shadowColor: '#000',
            elevation: 10,
            shadowOpacity: 0.4,
            shadowOffset: { width: 0, height: 10 },
            shadowRadius: 10,
            backgroundColor: '#f4f4f4',
            height: 8,
            marginTop: -16,
            zIndex: 9
          }}>
          </View>
        }
        {Platform.OS === 'android' &&
          <View style={{
            shadowColor: '#000',
            elevation: 10,
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 10,
            backgroundColor: '#76BCD4',
            height: 15,
            marginTop: -14
          }}>
          </View>
        }
        {/* <Loader loading={this.state.loading} /> */}
        <View style={[JoinBragStyle.MainContainerStyle, { backgroundColor: 'rgba(232, 233, 232,1.0)' }]}>
          <ScrollView keyboardShouldPersistTaps='handled' >
            <KeyboardAvoidingView behavior="padding">

              {this.displayQues()}

              {this.placeBragPoints()}

              { this.state.isShowPlayerProjection == true? this.showPlayerProjectionView(this.state.playerDetails):null}
              </KeyboardAvoidingView>
              <View style={{justifyContent: 'flex-end',padding:30}}>
            <LinearGradient
                colors={['#1B75BC', '#9AD8DD']}
                start={{x: 0.3, y: 0}} end={{x: 3.0, y: 1.17}}
                    locations={[0.0, 0.4]}
                style={{
                  padding: 0,
                  paddingVertical: 0
                }}
                >
                	{ this.state.isComplete!='1'?  <Button onPress={()=>this.joinContestAPI()}
                   block transparent style={{height: 60}}><Text style={{fontSize: 18, color:'#fff', fontFamily:'SourceSansPro-Bold'}}>
                   BET & PLAY</Text></Button>:<Text>Test</Text>}
              </LinearGradient>
            </View>
            </ScrollView>
					</View>

         

      </View>
    );
  }

  displayQues() {
    var quesObj = this.state.responseData;
    return <View style={JoinBragStyle.box_container}>
      {this.populateQuestion()}
      {(quesObj.contest_type === '0') ?
        <View style={JoinBragStyle.autocompleteContainer}>

          <AutoComplete

            containerStyle={{ marginHorizontal: 15, marginVertical: 0 }}
            inputContainerStyle={{ width: '100%', borderColor: '#E7E6E6', borderWidth: 0, borderBottomWidth: 1, fontSize: 16, fontFamily: 'SourceSansPro-Regular' }}
            listContainerStyle={{ height: 300 }}
            listStyle={{ position: 'relative', }}
            data={this.state.SearchResults}
            defaultValue={this.state.searchText}
            hideResults={this.state.hideResult}
            onChangeText={text => this.autoSearchAPI(text)}
            placeholder="Answer"
            placeholderTextColor='#999999'
            renderItem={item => (
              <TouchableOpacity onPress={() => this.updateSelectedPlayer(item)} style={{ backgroundColor: 'rgba(232,233,232,0.5)', width: '100%', height: 30, padding: 5, borderBottomWidth: 0.4, borderBottomColor: '#999999' }}>
                <Text style={{ fontFamily: 'SourceSansPro-Regular', fontSize: 16, color: '#999999' }}>{item.full_name + ', ' + item.position}</Text>

              </TouchableOpacity>
            )}
          />

        </View>
        : (quesObj.contest_type === '1') ?
          this.addQuesOptions()
          :
          this.addTeamTypeOptions()
      }
    </View>
  }

  updateSelectedPlayer(item) {
    this.setState({ hideResult: true });
    this.setState({ searchText: item.full_name });
    this.setState({ searchItem: item });

    this.showPlayerProjection(item.player_uid)
  }
  showPlayerProjectionView(playerDetails) {
    return (
      <PlayerCards playerDetails={playerDetails} ></PlayerCards>
    );
  }
  showPlayerProjection(player_uid) {


    if (player_uid != '') {
      console.log('Pehla Padav Paar');

      let params = {
        player_unique_id: player_uid
      };

      WSManager.postData(URLConstants.GET_PLAYER_PROJECTION, params)
        .then(response => {

          this.setState({ playerDetails: response.data.data }, function () {
            if (response.data.data != null && response.data.data != 'null' && response.data.data != '')
            {
              this.setState({ isShowPlayerProjection: true })
            }
            else
            {
              this.setState({ isShowPlayerProjection: false })
            }

          })
          //console.log("GET_PLAYER_PROJECTION=="+JSON.stringify(response.data.data));

          //    Toaster.showLongToast('Success:'+this.state.SearchResults.length);
        })
        .catch(error => {
          this.setState({ isShowPlayerProjection: false })
          console.log('Error= ' + JSON.stringify(error));
          Toaster.showLongToast('Error:' + error.response.data.global_error);
          return error;
        });
    }

    //GET_PLAYER_PROJECTION


    // if (this.state.isShowPlayerProjection)
    // {
    //   <PlayerCards playerDetails = {''}></PlayerCards>
    // }
    // else
    // {

    // }

  }


  populateQuestion = () => {
    if (this.state.responseData !== null && this.state.responseData !== '') {
      var quesObj = this.state.responseData;
      var ques = quesObj.question;
      var NewText = ques.replace("{{player_position}}", quesObj.player_name);
      return <Label style={JoinBragStyle.main_ques_text}>{NewText}</Label>
    }
  }

  addInputTypeAnswer() {
    return <View style={JoinBragStyle.Answer_container}>

      <Label style={JoinBragStyle.ques_text}>Answer</Label>
      <View style={JoinBragStyle.autocompleteContainer}>
        <Autocomplete

          data={this.state.SearchResults}
          defaultValue={this.state.searchItem}
          onChangeText={text => this.setState({ searchItem: text })}
          renderItem={item => (
            <TouchableOpacity>
              <Text style={{ fontFamily: 'SourceSansPro-Regular' }}>{item.full_name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  }
  setStateForTextItem(item) {
    this.setState({ searchText: item.full_name })
    this.setState({ searchItem: item.full_name })
  }
  showSuggesionItem(item) {
    console.log(item.full_name)
    return <TouchableOpacity onPress={() => setStateForTextItem(item)}>
      <Text style={{ fontFamily: 'SourceSansPro-Regular' }}>{item.full_name}</Text>
    </TouchableOpacity>
  }

  addTeamTypeOptions(){
    var data = this.state.responseData;
    //alert
				if(data!=='' && data.match_list!=='' && data.match_list.length>0){
         if(this.state.isComplete=='1')
         {
				 return   <View>
                       <View  style={JoinBragStyle.Option_Container}>
                            <View  style={JoinBragStyle.Option_Item_Container}>
                                  {(this.state.winner_team_league_id[0]==='' || this.state.winner_team_league_id[0]!==data.match_list[0].team_league_id_home)?
                                   <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_unchecked}/>
                                 :
                                   <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_checked}/>}
                                  <Text style={{ fontFamily:'SourceSansPro-Regular' }}>{data.match_list[0].home_team_name}</Text>
                            </View>
                            <View   style={JoinBragStyle.Option_Item_Container}>
                                {(this.state.winner_team_league_id[0]==='' || this.state.winner_team_league_id[0]!==data.match_list[0].team_league_id_away)?
                                 <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_unchecked}/>
                               :
                                 <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_checked}/>}
                                <Text style={{ fontFamily:'SourceSansPro-Regular' }}>{data.match_list[0].away_team_name}</Text>
                            </View>
                        </View>
               </View>
         }
         else {
           return   <View>
                         <View  style={JoinBragStyle.Option_Container}>
                         <Ripple onPress={()=>  this.optionSelectionEvent(data.match_list[0].team_league_id_home)}  style={JoinBragStyle.Option_Item_Container}>
                                    {(this.state.selectedOptionId==='' || this.state.selectedOptionId!==data.match_list[0].team_league_id_home)?
                                     <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_unchecked}/>
                                   :
                                     <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_checked}/>}
                                    <Text style={{ fontFamily:'SourceSansPro-Regular' }}>{data.match_list[0].home_team_name}</Text>
                              </Ripple>
                              <Ripple onPress={()=>  this.optionSelectionEvent(data.match_list[0].team_league_id_away)}  style={JoinBragStyle.Option_Item_Container}>
                                  {(this.state.selectedOptionId==='' || this.state.selectedOptionId!==data.match_list[0].team_league_id_away)?
                                   <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_unchecked}/>
                                 :
                                   <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_checked}/>}
                                  <Text style={{ fontFamily:'SourceSansPro-Regular' }}>{data.match_list[0].away_team_name}</Text>
                              </Ripple>
                          </View>
                 </View>
         }
        }
	}

	addQuesOptions(){
       if(this.state.isComplete == '1')
      {
        this.addQACompleted();
      }
      else {
        this.addQA();
      }
	}



addQA()
{
  var data = this.state.responseData;
      if(data!=='' && (data.question_option.length==4 || data.question_option.length==5)){

       return  (data.question_option.length==4)?
                 <View>
                        <View  style={JoinBragStyle.Option_Container}>
                             <Ripple onPress={()=>  this.optionSelectionEvent(data.question_option[0].option_id)}  style={JoinBragStyle.Option_Item_Container}>
                                   {(this.state.selectedOptionId==='' || this.state.selectedOptionId!==data.question_option[0].option_id)?
                                    <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_unchecked}/>
                                  :
                                    <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_checked}/>}
                                   <Text style={{ fontFamily:'SourceSansPro-Regular' }}>{data.question_option[0].min_value+'-'+data.question_option[0].max_value}</Text>
                             </Ripple>
                             <Ripple onPress={()=>  this.optionSelectionEvent(data.question_option[1].option_id)}  style={JoinBragStyle.Option_Item_Container}>
                                 {(this.state.selectedOptionId==='' || this.state.selectedOptionId!==data.question_option[1].option_id)?
                                  <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_unchecked}/>
                                :
                                  <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_checked}/>}
                                 <Text style={{ fontFamily:'SourceSansPro-Regular' }}>{data.question_option[1].min_value+'-'+data.question_option[1].max_value}</Text>
                             </Ripple>
                         </View>


                     <View  style={JoinBragStyle.Option_Container}>
                              <Ripple onPress={()=>  this.optionSelectionEvent(data.question_option[2].option_id)}  style={JoinBragStyle.Option_Item_Container}>
                                      {(this.state.selectedOptionId==='' || this.state.selectedOptionId!==data.question_option[2].option_id)?
                                      <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_unchecked}/>
                                    :
                                      <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_checked}/>}
                                    <Text style={{ fontFamily:'SourceSansPro-Regular' }}>{data.question_option[2].min_value+'-'+data.question_option[2].max_value}</Text>
                              </Ripple>
                              <Ripple onPress={()=>  this.optionSelectionEvent(data.question_option[3].option_id)}  style={JoinBragStyle.Option_Item_Container}>
                                    {(this.state.selectedOptionId==='' || this.state.selectedOptionId!==data.question_option[3].option_id)?
                                    <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_unchecked}/>
                                  :
                                    <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_checked}/>}
                              {  (data.question_option[3].max_value==='0')?
                                <Text style={{ fontFamily:'SourceSansPro-Regular' }}>{data.question_option[3].min_value+'+'}</Text>
                                :
                                <Text style={{ fontFamily:'SourceSansPro-Regular' }}>{data.question_option[3].min_value+'-'+data.question_option[3].max_value}</Text>}
                              </Ripple>

                          </View>


                  </View>
                  :
                  <View>
                      <View  style={JoinBragStyle.Option_Container}>
                           <Ripple onPress={()=>  this.optionSelectionEvent(data.question_option[0].option_id)} style={JoinBragStyle.Option_Item_Container}>
                                 {(this.state.selectedOptionId==='' || this.state.selectedOptionId!==data.question_option[0].option_id)?
                                    <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_unchecked}/>
                                  :
                                    <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_checked}/>}
                                 <Text style={{ fontFamily:'SourceSansPro-Regular' }}>{data.question_option[0].min_value+'-'+data.question_option[0].max_value}</Text>
                           </Ripple>
                           <Ripple onPress={()=>  this.optionSelectionEvent(data.question_option[1].option_id)}  style={JoinBragStyle.Option_Item_Container}>
                                  {(this.state.selectedOptionId==='' || this.state.selectedOptionId!==data.question_option[1].option_id)?
                                   <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_unchecked}/>
                                 :
                                   <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_checked}/>}
                               <Text style={{ fontFamily:'SourceSansPro-Regular' }}>{data.question_option[1].min_value+'-'+data.question_option[1].max_value}</Text>
                           </Ripple>
                       </View>

                       <View  style={JoinBragStyle.Option_Container}>
                            <Ripple onPress={()=>  this.optionSelectionEvent(data.question_option[2].option_id)}  style={JoinBragStyle.Option_Item_Container}>
                                  {(this.state.selectedOptionId==='' || this.state.selectedOptionId!==data.question_option[2].option_id)?
                                   <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_unchecked}/>
                                 :
                                   <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_checked}/>}
                                  <Text style={{ fontFamily:'SourceSansPro-Regular' }}>{data.question_option[2].min_value+'-'+data.question_option[2].max_value}</Text>
                            </Ripple>
                            <Ripple onPress={()=>  this.optionSelectionEvent(data.question_option[3].option_id)}  style={JoinBragStyle.Option_Item_Container}>
                            {(this.state.selectedOptionId==='' || this.state.selectedOptionId!==data.question_option[3].option_id)?
                            <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_unchecked}/>
                          :
                            <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_checked}/>}
                            {  (data.question_option[3].max_value==='0')?
                              <Text style={{ fontFamily:'SourceSansPro-Regular' }}>{data.question_option[3].min_value+'+'}</Text>
                              :
                              <Text style={{ fontFamily:'SourceSansPro-Regular' }}>{data.question_option[3].min_value+'-'+data.question_option[3].max_value}</Text>}
                            </Ripple>

                        </View>

                        <View  style={JoinBragStyle.Option_Container}>
                             <Ripple onPress={()=>  this.optionSelectionEvent(data.question_option[4].option_id)}  style={JoinBragStyle.Option_Item_Container}>
                             {(this.state.selectedOptionId==='' || this.state.selectedOptionId!==data.question_option[4].option_id)?
                              <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_unchecked}/>
                            :
                              <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_checked}/>}
                                 {  (data.question_option[4].max_value==='0')?
                                   <Text style={{ fontFamily:'SourceSansPro-Regular' }}>{data.question_option[4].min_value+'+'}</Text>
                                   :
                                   <Text style={{ fontFamily:'SourceSansPro-Regular' }}>{data.question_option[4].min_value+'-'+data.question_option[4].max_value}</Text>}
                             </Ripple>
                         </View>
               </View>
      }
}
addQACompleted()
{
  var data = this.state.responseData;
      if(data!=='' && (data.question_option.length==4 || data.question_option.length==5)){

       return  (data.question_option.length==4)?
                 <View>
                        <View  style={JoinBragStyle.Option_Container}>
                             <View  style={JoinBragStyle.Option_Item_Container}>
                                   {(this.state.selectedOptionId==='' || this.state.selectedOptionId!==data.question_option[0].option_id)?
                                    <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_unchecked}/>
                                  :
                                    <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_checked}/>}
                                   <Text style={{ fontFamily:'SourceSansPro-Regular' }}>{data.question_option[0].min_value+'-'+data.question_option[0].max_value}</Text>
                             </View>
                             <View  style={JoinBragStyle.Option_Item_Container}>
                                 {(this.state.selectedOptionId==='' || this.state.selectedOptionId!==data.question_option[1].option_id)?
                                  <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_unchecked}/>
                                :
                                  <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_checked}/>}
                                 <Text style={{ fontFamily:'SourceSansPro-Regular' }}>{data.question_option[1].min_value+'-'+data.question_option[1].max_value}</Text>
                             </View>
                         </View>


                     <View  style={JoinBragStyle.Option_Container}>
                              <View  style={JoinBragStyle.Option_Item_Container}>
                                      {(this.state.selectedOptionId==='' || this.state.selectedOptionId!==data.question_option[2].option_id)?
                                      <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_unchecked}/>
                                    :
                                      <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_checked}/>}
                                    <Text style={{ fontFamily:'SourceSansPro-Regular' }}>{data.question_option[2].min_value+'-'+data.question_option[2].max_value}</Text>
                              </View>
                              <View  style={JoinBragStyle.Option_Item_Container}>
                                    {(this.state.selectedOptionId==='' || this.state.selectedOptionId!==data.question_option[3].option_id)?
                                    <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_unchecked}/>
                                  :
                                    <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_checked}/>}
                              {  (data.question_option[3].max_value==='0')?
                                <Text style={{ fontFamily:'SourceSansPro-Regular' }}>{data.question_option[3].min_value+'+'}</Text>
                                :
                                <Text style={{ fontFamily:'SourceSansPro-Regular' }}>{data.question_option[3].min_value+'-'+data.question_option[3].max_value}</Text>}
                              </View>

                          </View>


                  </View>
                  :
                  <View>
                      <View  style={JoinBragStyle.Option_Container}>
                           <View style={JoinBragStyle.Option_Item_Container}>
                                 {(this.state.selectedOptionId==='' || this.state.selectedOptionId!==data.question_option[0].option_id)?
                                    <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_unchecked}/>
                                  :
                                    <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_checked}/>}
                                 <Text style={{ fontFamily:'SourceSansPro-Regular' }}>{data.question_option[0].min_value+'-'+data.question_option[0].max_value}</Text>
                           </View>
                           <View  style={JoinBragStyle.Option_Item_Container}>
                                  {(this.state.selectedOptionId==='' || this.state.selectedOptionId!==data.question_option[1].option_id)?
                                   <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_unchecked}/>
                                 :
                                   <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_checked}/>}
                               <Text style={{ fontFamily:'SourceSansPro-Regular' }}>{data.question_option[1].min_value+'-'+data.question_option[1].max_value}</Text>
                           </View>
                       </View>

                       <View  style={JoinBragStyle.Option_Container}>
                            <View  style={JoinBragStyle.Option_Item_Container}>
                                  {(this.state.selectedOptionId==='' || this.state.selectedOptionId!==data.question_option[2].option_id)?
                                   <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_unchecked}/>
                                 :
                                   <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_checked}/>}
                                  <Text style={{ fontFamily:'SourceSansPro-Regular' }}>{data.question_option[2].min_value+'-'+data.question_option[2].max_value}</Text>
                            </View>
                            <View  style={JoinBragStyle.Option_Item_Container}>
                            {(this.state.selectedOptionId==='' || this.state.selectedOptionId!==data.question_option[3].option_id)?
                            <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_unchecked}/>
                          :
                            <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_checked}/>}
                            {  (data.question_option[3].max_value==='0')?
                              <Text style={{ fontFamily:'SourceSansPro-Regular' }}>{data.question_option[3].min_value+'+'}</Text>
                              :
                              <Text style={{ fontFamily:'SourceSansPro-Regular' }}>{data.question_option[3].min_value+'-'+data.question_option[3].max_value}</Text>}
                            </View>

                        </View>

                        <View  style={JoinBragStyle.Option_Container}>
                             <View  style={JoinBragStyle.Option_Item_Container}>
                             {(this.state.selectedOptionId==='' || this.state.selectedOptionId!==data.question_option[4].option_id)?
                              <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_unchecked}/>
                            :
                              <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_checked}/>}
                                 {  (data.question_option[4].max_value==='0')?
                                   <Text style={{ fontFamily:'SourceSansPro-Regular' }}>{data.question_option[4].min_value+'+'}</Text>
                                   :
                                   <Text style={{ fontFamily:'SourceSansPro-Regular' }}>{data.question_option[4].min_value+'-'+data.question_option[4].max_value}</Text>}
                             </View>
                         </View>
               </View>
      }
}

	componentWillReceiveProps(){
		//	console.log('response ==>>>>>>>>>>>>>>>>>>>>>>>> '+JSON.stringify(this.props));
	}

	optionSelectionEvent(value){
    if(this.state.isComplete!='1')
    {
		 this.setState({selectedOptionId:value})
    }
  }

  addQuesOptions() {
    var data = this.state.responseData;
    if (data !== '' && (data.question_option.length == 4 || data.question_option.length == 5)) {

      return (data.question_option.length == 4) ?
        <View>
          <View style={JoinBragStyle.Option_Container}>
            <Ripple onPress={() => this.optionSelectionEvent(data.question_option[0].option_id)} style={JoinBragStyle.Option_Item_Container}>
              {(this.state.selectedOptionId === '' || this.state.selectedOptionId !== data.question_option[0].option_id) ?
                <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_unchecked} />
                :
                <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_checked} />}
              <Text style={{ fontFamily: 'SourceSansPro-Regular' }}>{data.question_option[0].min_value + '-' + data.question_option[0].max_value}</Text>
            </Ripple>
            <Ripple onPress={() => this.optionSelectionEvent(data.question_option[1].option_id)} style={JoinBragStyle.Option_Item_Container}>
              {(this.state.selectedOptionId === '' || this.state.selectedOptionId !== data.question_option[1].option_id) ?
                <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_unchecked} />
                :
                <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_checked} />}
              <Text style={{ fontFamily: 'SourceSansPro-Regular' }}>{data.question_option[1].min_value + '-' + data.question_option[1].max_value}</Text>
            </Ripple>
          </View>


          <View style={JoinBragStyle.Option_Container}>
            <Ripple onPress={() => this.optionSelectionEvent(data.question_option[2].option_id)} style={JoinBragStyle.Option_Item_Container}>
              {(this.state.selectedOptionId === '' || this.state.selectedOptionId !== data.question_option[2].option_id) ?
                <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_unchecked} />
                :
                <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_checked} />}
              <Text style={{ fontFamily: 'SourceSansPro-Regular' }}>{data.question_option[2].min_value + '-' + data.question_option[2].max_value}</Text>
            </Ripple>
            <Ripple onPress={() => this.optionSelectionEvent(data.question_option[3].option_id)} style={JoinBragStyle.Option_Item_Container}>
              {(this.state.selectedOptionId === '' || this.state.selectedOptionId !== data.question_option[3].option_id) ?
                <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_unchecked} />
                :
                <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_checked} />}
              {(data.question_option[3].max_value === '0') ?
                <Text style={{ fontFamily: 'SourceSansPro-Regular' }}>{data.question_option[3].min_value + '+'}</Text>
                :
                <Text style={{ fontFamily: 'SourceSansPro-Regular' }}>{data.question_option[3].min_value + '-' + data.question_option[3].max_value}</Text>}
            </Ripple>

          </View>


        </View>
        :
        <View>
          <View style={JoinBragStyle.Option_Container}>
            <Ripple onPress={() => this.optionSelectionEvent(data.question_option[0].option_id)} style={JoinBragStyle.Option_Item_Container}>
              {(this.state.selectedOptionId === '' || this.state.selectedOptionId !== data.question_option[0].option_id) ?
                <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_unchecked} />
                :
                <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_checked} />}
              <Text style={{ fontFamily: 'SourceSansPro-Regular' }}>{data.question_option[0].min_value + '-' + data.question_option[0].max_value}</Text>
            </Ripple>
            <Ripple onPress={() => this.optionSelectionEvent(data.question_option[1].option_id)} style={JoinBragStyle.Option_Item_Container}>
              {(this.state.selectedOptionId === '' || this.state.selectedOptionId !== data.question_option[1].option_id) ?
                <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_unchecked} />
                :
                <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_checked} />}
              <Text style={{ fontFamily: 'SourceSansPro-Regular' }}>{data.question_option[1].min_value + '-' + data.question_option[1].max_value}</Text>
            </Ripple>
          </View>

          <View style={JoinBragStyle.Option_Container}>
            <Ripple onPress={() => this.optionSelectionEvent(data.question_option[2].option_id)} style={JoinBragStyle.Option_Item_Container}>
              {(this.state.selectedOptionId === '' || this.state.selectedOptionId !== data.question_option[2].option_id) ?
                <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_unchecked} />
                :
                <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_checked} />}
              <Text style={{ fontFamily: 'SourceSansPro-Regular' }}>{data.question_option[2].min_value + '-' + data.question_option[2].max_value}</Text>
            </Ripple>
            <Ripple onPress={() => this.optionSelectionEvent(data.question_option[3].option_id)} style={JoinBragStyle.Option_Item_Container}>
              {(this.state.selectedOptionId === '' || this.state.selectedOptionId !== data.question_option[3].option_id) ?
                <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_unchecked} />
                :
                <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_checked} />}
              {(data.question_option[3].max_value === '0') ?
                <Text style={{ fontFamily: 'SourceSansPro-Regular' }}>{data.question_option[3].min_value + '+'}</Text>
                :
                <Text style={{ fontFamily: 'SourceSansPro-Regular' }}>{data.question_option[3].min_value + '-' + data.question_option[3].max_value}</Text>}
            </Ripple>

          </View>

          <View style={JoinBragStyle.Option_Container}>
            <Ripple onPress={() => this.optionSelectionEvent(data.question_option[4].option_id)} style={JoinBragStyle.Option_Item_Container}>
              {(this.state.selectedOptionId === '' || this.state.selectedOptionId !== data.question_option[4].option_id) ?
                <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_unchecked} />
                :
                <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_checked} />}
              {(data.question_option[4].max_value === '0') ?
                <Text style={{ fontFamily: 'SourceSansPro-Regular' }}>{data.question_option[4].min_value + '+'}</Text>
                :
                <Text style={{ fontFamily: 'SourceSansPro-Regular' }}>{data.question_option[4].min_value + '-' + data.question_option[4].max_value}</Text>}
            </Ripple>
          </View>
        </View>
    }
  }

  componentWillReceiveProps() {
    //	console.log('response ==>>>>>>>>>>>>>>>>>>>>>>>> '+JSON.stringify(this.props));
  }

  optionSelectionEvent(value) {
    //alert(value);
    if (this.state.isComplete != '1') {
      this.setState({ selectedOptionId: value })
    }
  }

  placeBragPoints() {
    if (this.state.isComplete == '1') {
      return <View />
    } else {
      return <View style={JoinBragStyle.blue_box_container}>
        <Label style={JoinBragStyle.ques_text}>Place your Brag Points to enter this contest</Label>
        <TextInput maxLength={5} keyboardType="numeric" placeholder='Enter Brag Points'
          onChangeText={(text) => this.setState({ bidAmount: text })}
          style={{ marginHorizontal: 12, fontSize: 16, borderRadius: 4, borderBottomWidth: 0.5, borderColor: 'rgba(0,0,0,0.2)', fontFamily: 'SourceSansPro-Regular', color: '#222222', height: 40 }} />

        <Text style={{ marginHorizontal: 16, marginTop: 6, fontSize: 10, color: '#00000040', fontFamily: 'SourceSansPro-Regular', fontWeight: '600' }}>Min. Brag {this.state.responseData.entry_fee}</Text>

      </View>
    }

  }



  componentDidMount() {

    mContext = this;
    this.subs = [
      this.props.navigation.addListener('willFocus', () => mContext = this),
    ];

    setTimeout(() => {
      var cId = ConstantLib.CURRENT_CONTEST_ID;
      var cUId = ConstantLib.CURRENT_CONTEST_UNIQUE_ID;
      var isComplete = ConstantLib.IS_COMPLETE;
      this.setState({ contest_id: cId })
      this.setState({ contest_unique_id: cUId })
      this.setState({ isComplete: isComplete }, () => {
        this.getContestMasterData(cId, cUId);
      })
      
    }, 300);
    getItem(PreferenceConstant.USER_ID).then((value) => {
      ConstantLib.USER_ID = value;
    })

   }
  //  getContestMasterData({ contestId, contestUniqueId }) {
  //    this.setState({ loading: false })
  //    const params = {
  //      contest_id: ConstantLib.CURRENT_CONTEST_ID,
  //      contest_unique_id: ConstantLib.CURRENT_CONTEST_UNIQUE_ID,
  //    };

  //    WSManager.postData(URLConstants.JOIN_BRAG_MASTER_API, params)
  //      .then(response => {
  //        this.setState({ responseData: response.data.data });
  //        this.setState({ loading: false });
  //        this.setState({ winner_team_league_id: response.data.data.winner_team_league_id })
  //        console.log('getContestMasterData=' + JSON.stringify(response.data.data));
  //        this.props.navigation.setParams({
  //          customTitle: 'MyTitle',
  //        });
  //      })
  //      .catch(error => {
  //        this.setState({ loading: false })
  //        console.log('Error= ' + JSON.stringify(error));
  //        return error;
  //      });
  //  }


		validate(){
          var quesObj = this.state.responseData;
          if(quesObj.contest_type==='0' && this.state.searchText===''){
                Toaster.showLongToast('Please enter player name');
          }
          else if(quesObj.contest_type==='1' && this.state.selectedOptionId===''){
                Toaster.showLongToast('Please select any option');
          }
          else if(quesObj.contest_type==='2' && this.state.selectedOptionId===''){
                Toaster.showLongToast('Please select any Team');
          }
          else if(this.state.bidAmount===''){
                Toaster.showLongToast('Please enter minimum brag points');
          }
					else{
						return true;
					}
		}

		joinContestAPI(){

      if(Utility.isLoggedIn(this.props.navigation))
   {
       var quesObj = this.state.responseData;
					if(this.validate()){
					      this.setState({loading: true})
                let params='';
                if(quesObj.contest_type==='0'){
                  params = {
  					        player_team_id: this.state.searchItem.player_team_id,
  					        player_unique_id: this.state.searchItem.player_uid,
  					        contest_id: this.state.contest_id,
  					        bid_amount:this.state.bidAmount,
  					      };
                }
                else if(quesObj.contest_type==='1'){
                  params = {
  					        option_id: this.state.selectedOptionId,
  					        league_id: ConstantLib.LEAGUE_ID,
  					        contest_id: this.state.contest_id,
  					        bid_amount:this.state.bidAmount,
  					      };
                }
                else if(quesObj.contest_type==='2'){
                  params = {
                    team_league_id: this.state.selectedOptionId,
                    contest_id: this.state.contest_id,
                    bid_amount:this.state.bidAmount,
                  };
                }

					      WSManager.postData(URLConstants.JOIN_BRAG_API, params)
					      .then(response => {
					        console.log("joinContestAPI=="+JSON.stringify(response.data));
					        this.setState({loading: false})
  								//Toaster.showLongToast('Success:'+response.data.message);
                  this.callGetUserBalanceApi();
                  const navigateAction = NavigationActions.navigate({
                    routeName: 'WellDoneAfterCreatingBrag',
                    index:0,
                    params: {},
                    action: NavigationActions.navigate({ routeName: 'WellDoneAfterCreatingBrag' })
                  })
                  const nav = WSManager.getTopLevelNavigator()
                  nav.dispatch(navigateAction)
					      })
					      .catch(error => {
					        this.setState({loading: false})
					        console.log('Error= '+JSON.stringify(error));
					        Toaster.showLongToast('Error:'+error.response.data.global_error);
					        return error;
					      });
					}
        }
	    }

  getContestMasterData({ contestId, contestUniqueId }) {
    this.setState({ loading: false })
    const params = {
      contest_id: ConstantLib.CURRENT_CONTEST_ID,
      contest_unique_id: ConstantLib.CURRENT_CONTEST_UNIQUE_ID,
    };

    WSManager.postData(URLConstants.JOIN_BRAG_MASTER_API, params)
      .then(response => {
        this.setState({ responseData: response.data.data });
        this.setState({ loading: false });
        console.log('getContestMasterData=' + JSON.stringify(response.data.data));
        this.props.navigation.setParams({
          customTitle: 'MyTitle',
        });
      })
      .catch(error => {
        this.setState({ loading: false })
        console.log('Error= ' + JSON.stringify(error));
        return error;
      });
  }


  validate() {
    var quesObj = this.state.responseData;
    if (quesObj.contest_type === '0' && this.state.searchText === '') {
      Toaster.showLongToast('Please enter player name');
    }
    else if (quesObj.contest_type === '1' && this.state.selectedOptionId === '') {
      Toaster.showLongToast('Please select any option');
    }
    else if (quesObj.contest_type === '2' && this.state.selectedOptionId === '') {
      Toaster.showLongToast('Please select any Team');
    }
    else if (this.state.bidAmount === '') {
      Toaster.showLongToast('Please enter minimum brag points');
    }
    else {
      return true;
    }
  }

  joinContestAPI() {

    if (Utility.isLoggedIn(this.props.navigation)) {
      var quesObj = this.state.responseData;
      if (this.validate()) {
        this.setState({ loading: true })
        let params = '';
        if (quesObj.contest_type === '0') {
          params = {
            player_team_id: this.state.searchItem.player_team_id,
            player_unique_id: this.state.searchItem.player_uid,
            contest_id: this.state.contest_id,
            bid_amount: this.state.bidAmount,
          };
        }
        else if (quesObj.contest_type === '1') {
          params = {
            option_id: this.state.selectedOptionId,
            league_id: ConstantLib.LEAGUE_ID,
            contest_id: this.state.contest_id,
            bid_amount: this.state.bidAmount,
          };
        }
        else if (quesObj.contest_type === '2') {
          params = {
            team_league_id: this.state.selectedOptionId,
            contest_id: this.state.contest_id,
            bid_amount: this.state.bidAmount,
          };
        }

        WSManager.postData(URLConstants.JOIN_BRAG_API, params)
          .then(response => {
            console.log("joinContestAPI==" + JSON.stringify(response.data));
            this.setState({ loading: false })
           // Toaster.showLongToast('Success:' + response.data.message);
            this.callGetUserBalanceApi();
            const navigateAction = NavigationActions.navigate({
              routeName: 'WellDoneAfterCreatingBrag',
              index: 0,
              params: {},
              action: NavigationActions.navigate({ routeName: 'WellDoneAfterCreatingBrag' })
            })
            const nav = WSManager.getTopLevelNavigator()
            nav.dispatch(navigateAction)
          })
          .catch(error => {
            this.setState({ loading: false })
            console.log('Error= ' + JSON.stringify(error));
            Toaster.showLongToast('Error:' + error.response.data.global_error);
            return error;
          });
      }
    }
  }

  callGetUserBalanceApi() {
    this.setState({ loading: false })
    const params = {
      user_id: ConstantLib.USER_ID

    };

    WSManager.postData(URLConstants.GET_USER_BALANCE, params)
      .then(response => {
        this.setState({ loading: false })

        var data = response.data.data;
        this.setState({ userBalanceData: data.user_balance })
        saveItem(UserCurrentBalancePreferenceConstant.POINT_BALANCE, '' + data.user_balance.point_balance);

        console.log('callGetUserBalanceApi Success = ' + JSON.stringify(data));
      })
      .catch(error => {

        this.setState({ loading: false })
        console.log('callGetUserBalanceApi Error = ' + JSON.stringify(error));
        return error;
      });
  }

  autoSearchAPI(text) {
    if (text.length > 0) {
      this.setState({ searchText: text })
      this.setState({ loading: false })
      this.setState({isShowPlayerProjection:false})
      const params = {
        contest_unique_id: this.state.contest_unique_id,
        player_name: text
      };

      WSManager.postData(URLConstants.AUTO_SEARCH_BRAG_API, params)
        .then(response => {
          this.setState({ loading: false })
          this.setState({ hideResult: false });
          console.log("autoSearchAPI==" + JSON.stringify(response.data.data));
          this.setState({ SearchResults: response.data.data });
          //    Toaster.showLongToast('Success:'+this.state.SearchResults.length);
        })
        .catch(error => {
          this.setState({ loading: false })
          console.log('Error= ' + JSON.stringify(error));
          Toaster.showLongToast('Error:' + error.response.data.global_error);
          return error;
        });
    }
  }

  static callBackMethod(data, contestId, contestUniqueId) {
    mContext.setState({ contest_id: contestId })
    mContext.setState({ contest_unique_id: contestUniqueId })
    mContext.setState({ responseData: data })
  }
}






class PlayerCards extends Component {

  constructor(props) {
    super(props);
    this.state = {

      position: this.props.playerDetails.position,
      passingYards: this.props.playerDetails.passing_yards,
      passingTouchDown: this.props.playerDetails.passing_touchdowns,
      passingRating: this.props.playerDetails.passing_rating,
      passingInterceptions:this.props.playerDetails.passing_interceptions,
      passingCompletionPercentage:this.props.playerDetails.passingCompletionPercentage,
      interceptions: this.props.playerDetails.interceptions,

      rushingYards: this.props.playerDetails.rushing_yards,
      rushingAttempts: this.props.playerDetails.rushing_attempts,
      rushingTouchDown: this.props.playerDetails.rushing_touchdowns,
      rushingYardsPerAttempt: this.props.playerDetails.rushing_yards_per_attempt,

      sacks: this.props.playerDetails.sacks,
      soloTackles: this.props.playerDetails.solo_tackles,


      fieldGoalsMade: this.props.playerDetails.field_goals_made,
      fieldGoalsAttempted: this.props.playerDetails.field_goals_attempted,
      fieldGoalPercentage: this.props.playerDetails.field_goal_percentage,
      fieldGoalsLongestMade: this.props.playerDetails.field_goals_longest_made,

      extraPointsAttempted: this.props.playerDetails.extra_points_attempted,
      extraPointsMade: this.props.playerDetails.extra_points_made,



      reception: this.props.playerDetails.receptions,
      receivingYards: this.props.playerDetails.receiving_yards,
      receivingYardsPerReception: this.props.playerDetails.receiving_yards_per_reception,
      receivingTouchDown: this.props.playerDetails.receiving_touchdowns,
      seasonScheduledDate: this.props.playerDetails.season_scheduled_date,
      oppTeam: this.props.playerDetails.OPP,




    }
  }



  render() {
    return (
      <View style={{ width: '100%', paddingTop: 10,paddingLeft:20,paddingRight:20,paddingBottom:20, backgroundColor: 'white', alignSelf: 'center', }}>
       <Text style={{ fontFamily: 'SourceSansPro-Bold', fontSize: 13, fontWeight: '600', color: '#000000', paddingBottom: 10 }}>Player Projection</Text>



        {(this.state.position == 'QB') ?
          <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
            {/* passingTouchDown*/}
            <View>
              <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 16, fontWeight: '600', color: '#666666' }}>{this.state.passingTouchDown != null && this.state.passingTouchDown != '' && this.state.passingTouchDown != 'null' ? this.state.passingTouchDown : 0}</Text></View>
              <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 13, fontWeight: '600', color: '#888888' }}>PaTD</Text></View>
            </View>
            {/* passingRating*/}
            <View>
              <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 16, fontWeight: '600', color: '#666666' }}>{this.state.passingRating != null && this.state.passingRating != '' && this.state.passingRating != 'null' ? this.state.passingRating : 0}</Text></View>
              <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 13, fontWeight: '600', color: '#888888' }}>PaRT</Text></View>
            </View>

            {/* passingInterceptions*/}
            <View>
              <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 16, fontWeight: '600', color: '#666666' }}>{this.state.passingInterceptions != null && this.state.passingInterceptions != '' && this.state.passingInterceptions != 'null' ? this.state.passingInterceptions : 0}</Text></View>
              <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 13, fontWeight: '600', color: '#888888' }}>PaINT</Text></View>
            </View>

            {/* passingCompletionPercentage*/}
            <View>
              <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 16, fontWeight: '600', color: '#666666' }}>{this.state.passingCompletionPercentage != null && this.state.passingCompletionPercentage != '' && this.state.passingCompletionPercentage != 'null' ? this.state.passingCompletionPercentage : 0}</Text></View>
              <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 13, fontWeight: '600', color: '#888888' }}>PaCP</Text></View>
            </View>


          </View>
          : null}
          {
            (this.state.position == 'WR' || this.state.position == 'TE') ?
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 20 }}>
              {/* reception*/}
              <View>
                <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 16, fontWeight: '600', color: '#666666' }}>{this.state.reception != null && this.state.reception != '' && this.state.reception != 'null' ? this.state.reception : 0}</Text></View>
                <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 13, fontWeight: '600', color: '#888888' }}>Rec</Text></View>
              </View>
              {/* receivingYards*/}
              <View>
                <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 16, fontWeight: '600', color: '#666666' }}>{this.state.receivingYards != null && this.state.receivingYards != '' && this.state.receivingYards != 'null' ? this.state.receivingYards : 0}</Text></View>
                <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 13, fontWeight: '600', color: '#888888' }}>RecYds</Text></View>
              </View>

              {/* receivingYardsPerReception*/}
              <View>
                <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 16, fontWeight: '600', color: '#666666' }}>{this.state.receivingYardsPerReception != null && this.state.receivingYardsPerReception != '' && this.state.receivingYardsPerReception != 'null' ? this.state.receivingYardsPerReception : 0}</Text></View>
                <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 13, fontWeight: '600', color: '#888888' }}>RecYdsPrRec</Text></View>
              </View>


            </View>
            : null}
            {
              (this.state.position == 'RB') ?
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 20 }}>
                {/* rushingYards*/}
                <View>
                <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 16, fontWeight: '600', color: '#666666' }}>{this.state.rushingYards != null && this.state.rushingYards != '' && this.state.rushingYards != 'null' ? this.state.rushingYards : 0}</Text></View>
                  <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 13, fontWeight: '600', color: '#888888' }}>RuYds</Text></View>
                </View>
                {/* RushingAttempt*/}
                <View>
                  <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 16, fontWeight: '600', color: '#666666' }}>{this.state.rushingAttempts != null && this.state.rushingAttempts != '' && this.state.rushingAttempts != 'null' ? this.state.rushingAttempts : 0}</Text></View>
                  <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 13, fontWeight: '600', color: '#888888' }}>RuAtt</Text></View>
                </View>

                {/* rushingYardsPerAttempt*/}
                <View>
                  <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 16, fontWeight: '600', color: '#666666' }}>{this.state.rushingYardsPerAttempt != null && this.state.rushingYardsPerAttempt != '' && this.state.rushingYardsPerAttempt != 'null' ? this.state.rushingYardsPerAttempt : 0}</Text></View>
                  <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 13, fontWeight: '600', color: '#888888' }}>RuYdsPerAtt</Text></View>
                </View>

                {/* rushingTouchDown*/}
                <View>
                <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 16, fontWeight: '600', color: '#666666'}}>{this.state.rushingTouchDown != null && this.state.rushingTouchDown != '' && this.state.rushingTouchDown != 'null' ? this.state.rushingTouchDown : 0}</Text></View>
                  <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 13, fontWeight: '600', color: '#888888' }}>RuTD</Text></View>
                </View>



              </View>
              : null}
              {
                (this.state.position == 'LB' || this.state.position == 'DB' || this.state.position == 'DE' || this.state.position == 'DL' || this.state.position == 'DT') ?
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 20 }}>
                  {/* sacks*/}
                  <View>
                    <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 16, fontWeight: '600', color: '#666666' }}>{this.state.sacks != null && this.state.sacks != '' && this.state.sacks != 'null' ? this.state.sacks : 0}</Text></View>
                    <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 13, fontWeight: '600', color: '#888888' }}>Sks</Text></View>

                  </View>
                  {/* soloTackles*/}
                  <View>
                    <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 16, fontWeight: '600', color: '#666666' }}>{this.state.soloTackles != null && this.state.soloTackles != '' && this.state.soloTackles != 'null' ? this.state.soloTackles : 0}</Text></View>
                    <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 13, fontWeight: '600', color: '#888888' }}>SoloTkls</Text></View>
                  </View>



                </View>
                : null
              }
              {
                  (this.state.position == 'CB' || this.state.position == 'S') ?
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 20 }}>
                    {/*  Interceptions*/}
                    <View>
                      <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 16, fontWeight: '600', color: '#666666' }}>{this.state.interceptions != null && this.state.interceptions != '' && this.state.interceptions != 'null' ? this.state.interceptions : 0}</Text></View>
                      <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 13, fontWeight: '600', color: '#888888' }}>INT</Text></View>
                    </View>

                  </View>
                  : null
              }
              {
                    (this.state.position == 'K') ?
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 20 }}>
                      {/* Passing*/}
                      <View>
                        <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 16, fontWeight: '600', color: '#666666' }}>{this.state.fieldGoalsMade != null && this.state.fieldGoalsMade != '' && this.state.fieldGoalsMade != 'null' ? this.state.fieldGoalsMade : 0}</Text></View>
                        <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 13, fontWeight: '600', color: '#888888' }}>FGM</Text></View>
                        <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 16, fontWeight: '600', color: '#666666', marginTop: 10 }}>{this.state.fieldGoalsAttempted != null && this.state.fieldGoalsAttempted != '' && this.state.fieldGoalsAttempted != 'null' ? this.state.fieldGoalsAttempted : 0}</Text></View>
                        <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 13, fontWeight: '600', color: '#888888' }}>FGA</Text></View>
                      </View>
                      {/* Rushing*/}
                      <View>
                        <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 16, fontWeight: '600', color: '#666666' }}>{this.state.fieldGoalPercentage != null && this.state.fieldGoalPercentage != '' && this.state.fieldGoalPercentage != 'null' ? this.state.fieldGoalPercentage : 0}</Text></View>
                        <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 13, fontWeight: '600', color: '#888888' }}>FGP</Text></View>

                        <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 16, fontWeight: '600', color: '#666666', marginTop: 10 }}>{this.state.fieldGoalsLongestMade != null && this.state.fieldGoalsLongestMade != '' && this.state.fieldGoalsLongestMade != 'null' ? this.state.fieldGoalsLongestMade : 0}</Text></View>
                        <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 13, fontWeight: '600', color: '#888888' }}>FGLM</Text></View>
                      </View>

                      {/* Receiving*/}
                      <View>
                        <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 16, fontWeight: '600', color: '#666666' }}>{this.state.extraPointsAttempted != null && this.state.extraPointsAttempted != '' && this.state.extraPointsAttempted != 'null' ? this.state.extraPointsAttempted : 0}</Text></View>
                        <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 13, fontWeight: '600', color: '#888888' }}>EPA</Text></View>
                        <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 16, fontWeight: '600', color: '#666666', marginTop: 10 }}>{this.state.extraPointsMade != null && this.state.extraPointsMade != '' && this.state.extraPointsMade != 'null' ? this.state.extraPointsMade : 0}</Text></View>
                        <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 13, fontWeight: '600', color: '#888888' }}>EPM</Text></View>
                      </View>

                    </View>
                    : null
        }
        <Separator style={{ height: 1, marginTop: 20 }}></Separator>



      </View>
    );
  }
}
