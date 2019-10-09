import React, { Component } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, Image, Platform, TouchableOpacity, SafeAreaView, StatusBar, Slider, ImageBackground, FlatList, Dimensions } from 'react-native';
import { Label, Radio, Picker, Icon, Item, Right } from 'native-base';
import { AppStyles, Images } from '../../Themes/';
import LinearGradient from 'react-native-linear-gradient';
import CreateBragStyle from './CreateBragStyle';
import {  StackActions, NavigationActions, Header } from 'react-navigation';
import {DrawerActions} from 'react-navigation-drawer'
import * as String from '../../Constants/Strings/';
import IMAGES from '../../Constants/Images/';
import Ripple from 'react-native-material-ripple';
import RadioGroup from 'react-native-radio-buttons-group';
import * as URLConstants from '../../Networking/URLConstants/';
import WSManager from '../../Networking/WSManager/';
import ConstantLib from '../../Constants/ConstantLib';
import Loader from '../../Utils/Loader/';
import Utility from '../../Utils/Utility/';
import Toaster from '../../Utils/Toaster/';

import WellDoneAfterCreatingBrag from '../WellDoneAfterCreatingBrag'

var mContext = null;
const WW = Dimensions.get('window').width;
export default class CreateBragScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      refreshing: false,
      SliderMaxValue: 10,
      leagueType: '0',
      questionType: 'team',
      questionList: [],
      conferenceList: [],
      teamList: [],
      selectedConference: '',
      selectedTeam: '',
      selectedCategory: '',
      questionObj: '',
      matchList: [],
      selectedMatch: '',
      question1: '',
      playerPositions: [],
      player_position: '',
      player_position_id: '',
      isCategorySelected: false,
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: <CustomHeader this navigation={navigation} />
    };
  };
  componentDidMount() {
    mContext = this;

    this.subs = [
      this.props.navigation.addListener('willFocus', () => mContext = this),
    ];
    
    this.getCreateBragMasterData();
    


  }

  render() {
    mContext = this;
    return (
      <View style={AppStyles.Wrapper}>
      
        <StatusBar
          translucent
          backgroundColor={'transparent'} />
        {Platform.OS !== "ios" &&
          <Loader loading={this.state.isLoading} />
        }
        <View style={{ backgroundColor: '#EEEEEE', height: 15, elevation: 1 }} />

        <ScrollView style={CreateBragStyle.scrollView} showsVerticalScrollIndicator={false}>
          <View style={CreateBragStyle.mainView}>
            <View>
              <Label style={CreateBragStyle.label_text}>{String.Select_Conference}</Label>
              <View style={CreateBragStyle.DropDownStyle}>
                <Picker
                  iosIcon={<View style={{ position: 'absolute', left: 0, paddingRight: 10, width: WW - 20, height: 40, justifyContent: 'center', alignItems: 'flex-end', marginRight: 0, backgroundColor: 'transparent' }}><Image source={IMAGES.ic_down_aero}></Image></View>}
                  style={CreateBragStyle.drop_down_text}
                  note
                  mode="dropdown"
                  textStyle = {{color:'#000000'}}
                  selectedValue={this.state.selectedConference}
                  onValueChange={this.onValueChangeForConference.bind(this)}>
                  {this.state.conferenceList.map((item, index) => {
                    return (<Item label={item.conference_name} value={item.conference_id} key={index} />)
                  })}
                </Picker>
              </View>
              <View style={CreateBragStyle.bottom_border} />
              
            </View>

            <View style={CreateBragStyle.DropDownContainerStyle}>
              <Label style={CreateBragStyle.label_text}>{String.Select_Team}</Label>
              <View style={CreateBragStyle.DropDownStyle}>
                {/* {alert(JSON.stringify(this.state.teamList))} */}
                <Picker
                  iosIcon={<View style={{ position: 'absolute', left: 0, paddingRight: 10, width: WW - 20, height: 40, justifyContent: 'center', alignItems: 'flex-end', marginRight: 0, backgroundColor: 'transparent' }}><Image source={IMAGES.ic_down_aero}></Image></View>}
                  style={CreateBragStyle.drop_down_text}
                  note
                  mode="dropdown"
                  textStyle = {{color:'#000000'}}
                  selectedValue={this.state.selectedTeam}
                  onValueChange={this.onValueChangeForTeam.bind(this)}>

                  {
                    this.state.teamList.map((item, index) => {
                      return (<Item label={item.common_name+''} value={item.team_league_id} key={index} />)
                    })}
                </Picker>
              </View>
              <View style={CreateBragStyle.bottom_border} />
            </View>

            <View style={CreateBragStyle.DropDownContainerStyle}>
              <Label style={CreateBragStyle.label_text}>{String.Select_matches}</Label>
              <View style={CreateBragStyle.DropDownStyle}>
                <Picker

iosIcon={<View style={{ position: 'absolute', left: 0, paddingRight: 10, width: WW - 20, height: 40, justifyContent: 'center', alignItems: 'flex-end', marginRight: 0, backgroundColor: 'transparent' }}><Image source={IMAGES.ic_down_aero}></Image></View>}
                  style={[CreateBragStyle.drop_down_text]}
                  note
                  mode="dropdown"
                  textStyle = {{color:'#000000'}}
                  selectedValue={this.state.selectedMatch}
                  onValueChange={this.onValueChangeForMatch.bind(this)}>
                  {this.state.matchList.map((item, index) => {
                    return (<Item label={item.home + ' v ' + item.away + ' - ' + Utility.getFormatedDate(item.season_scheduled_date, 'MMM Do, ddd - hh:mm A')} value={item.season_game_uid} key={index} />)
                  })}
                </Picker>
              </View>
              <View style={CreateBragStyle.bottom_border} />
            </View>

            <View style={CreateBragStyle.DropDownContainerStyle}>
              <Label style={CreateBragStyle.label_text}>{String.min_points}</Label>
              <View style={CreateBragStyle.DropDownStyle}>

                <Slider
                  minimumTrackTintColor='#13a9d6'
                  thumbStyle={customStyles9.thumb}
                  thumbTintColor='#0c6692'
                  style={{ width: '100%', height: 50 }}
                  step={1.0}
                  minimumValue={0}
                  maximumValue={100}
                  value={10}
                  onValueChange={this.onValueChangeForSlider.bind(this)}
                  maximumTrackTintColor="ECF6FF"
                />
              </View>
              <Text style={CreateBragStyle.min_label_text}>Min. {this.state.SliderMaxValue}</Text>
            </View>

            <View style={CreateBragStyle.DropDownContainerStyle}>
              <Label style={CreateBragStyle.label_text}>{String.league}</Label>
              {this.LeagueTypeButton()}
            </View>

            <View style={CreateBragStyle.DropDownContainerStyle}>
              <Label style={CreateBragStyle.label_text}>{String.ques_Categories}</Label>
              {this.QuesCategoryButton()}
            </View>

            <View style={CreateBragStyle.DropDownContainerStyle}>
              <Label style={CreateBragStyle.label_text}>Select Player</Label>
              <View style={CreateBragStyle.DropDownStyle}>
                <Picker
                  iosIcon={<View style={{ position: 'absolute', left: 0, paddingRight: 10, width: WW - 20, height: 40, justifyContent: 'center', alignItems: 'flex-end', marginRight: 0, backgroundColor: 'transparent' }}><Image source={IMAGES.ic_down_aero}></Image></View>}
                  style={[CreateBragStyle.drop_down_text]}
                  note
                  mode="dropdown"
                  textStyle = {{color:'#000000'}}
                  selectedValue={this.state.player_position}
                  onValueChange={this.onValueChangeForPosition.bind(this)}>
                  {this.state.playerPositions.map((item, index) => {
                    return (<Item label={'' + item.full_name + ' (' + item.position + ')'} value={'' + item.full_name} key={index} />)
                  })}
                </Picker>
              </View>
              <View style={CreateBragStyle.bottom_border} />
            </View>

            <View style={CreateBragStyle.DropDownContainerStyle}>
              <Label style={CreateBragStyle.label_text}>{String.ques_lebel}</Label>
              {this.populateQuestion()}
              {this.addQuesOptions()}
            </View>



            <View style={CreateBragStyle.brag_button_container}>
              <TouchableOpacity onPress={() => this.createBragFromApp()}>
                <LinearGradient start={{ x: 0.6, y: 0 }} end={{ x: 2.5, y: 1.5 }}
    locations={[0.0, 0.4]} colors={['#1B75BC', '#9AD8DD']}style={CreateBragStyle.brag_button} >
                  <Text style={CreateBragStyle.disable_button_text}>{String.Create_Brag}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      {/* </SafeAreaView> */}
      </View>
    );
  }

  populateQuestion = () => {
    
    if (this.state.questionObj !== null && this.state.questionObj !== '') {
      
      var quesObj = this.state.questionObj;
      var ques = quesObj.question;
      var NewText = ques.replace("{{player_position}}", this.state.player_position);
      ConstantLib.BragTitle = NewText
      //alert(ConstantLib.BragTitle)
      return <Label style={CreateBragStyle.ques_text}>{NewText}</Label>
    }
    
    
  }

  addQuesOptions() {
    var data = this.state.questionObj;
    if (data !== '' && (data.question_option.length == 4 || data.question_option.length == 5)) {

      return (data.question_option.length == 4) ?
        <View>
          <View style={CreateBragStyle.Option_Container}>
            <View style={CreateBragStyle.Option_Item_Container}>

              <Text style={{ fontFamily: 'SourceSansPro-Regular' }}>{data.question_option[0].min_value + '-' + data.question_option[0].max_value}</Text>
            </View>
            <View style={CreateBragStyle.Option_Item_Container}>
              <Text style={{ fontFamily: 'SourceSansPro-Regular' }}>{data.question_option[1].min_value + '-' + data.question_option[1].max_value}</Text>
            </View>
          </View>

          <View style={CreateBragStyle.Option_Container}>
            <View style={CreateBragStyle.Option_Item_Container}>
              <Text style={{ fontFamily: 'SourceSansPro-Regular' }}>{data.question_option[2].min_value + '-' + data.question_option[2].max_value}</Text>
            </View>
            <View style={CreateBragStyle.Option_Item_Container}>
              {(data.question_option[3].max_value === '0') ?
                <Text style={{ fontFamily: 'SourceSansPro-Regular' }}>{data.question_option[3].min_value + '+'}</Text>
                :
                <Text style={{ fontFamily: 'SourceSansPro-Regular' }}>{data.question_option[3].min_value + '-' + data.question_option[3].max_value}</Text>}
            </View>

          </View>

        </View>
        :
        <View>
          <View style={CreateBragStyle.Option_Container}>
            <View style={CreateBragStyle.Option_Item_Container}>
              <Text style={{ fontFamily: 'SourceSansPro-Regular' }}>{data.question_option[0].min_value + '-' + data.question_option[0].max_value}</Text>
            </View>
            <View style={CreateBragStyle.Option_Item_Container}>
              <Text style={{ fontFamily: 'SourceSansPro-Regular' }}>{data.question_option[1].min_value + '-' + data.question_option[1].max_value}</Text>
            </View>
          </View>

          <View style={CreateBragStyle.Option_Container}>
            <View style={CreateBragStyle.Option_Item_Container}>
              <Text style={{ fontFamily: 'SourceSansPro-Regular' }}>{data.question_option[2].min_value + '-' + data.question_option[2].max_value}</Text>
            </View>
            <View style={CreateBragStyle.Option_Item_Container}>
              {(data.question_option[3].max_value === '0') ?
                <Text style={{ fontFamily: 'SourceSansPro-Regular' }}>{data.question_option[3].min_value + '+'}</Text>
                :
                <Text style={{ fontFamily: 'SourceSansPro-Regular' }}>{data.question_option[3].min_value + '-' + data.question_option[3].max_value}</Text>}
            </View>

          </View>

          <View style={CreateBragStyle.Option_Container}>
            <View style={CreateBragStyle.Option_Item_Container}>
              {(data.question_option[4].max_value === '0') ?
                <Text style={{ fontFamily: 'SourceSansPro-Regular' }}>{data.question_option[4].min_value + '+'}</Text>
                :
                <Text style={{ fontFamily: 'SourceSansPro-Regular' }}>{data.question_option[4].min_value + '-' + data.question_option[4].max_value}</Text>}
            </View>
          </View>
        </View>
    }
  }

  onValueChangeForConference(value) {
    this.setState({ selectedTeam: '' })
    this.setState({ teamList: [] })
    this.setState({ selectedMatch: '' })
    this.setState({ matchList: [] });
    this.setState({ selectedConference: value })
    if(typeof(value)!='undefined')
    this.getAllTeams(value);
    this.resetCategorySelected();
  }
  callWhenArriveFromUpcomingMatches(conferenceID, teamLeagueId) {
    this.setState({ selectedConference: conferenceID })
    this.onValueChangeForTeam(teamLeagueId)
  }

  onValueChangeForTeam(value) {
    this.setState({ selectedTeam: value }, function () {
      if (this.state.selectedTeam === '') {

      }
      else {
        if(typeof(value)!='undefined')

        this.getAllMatchesByTeam(value);
      }
    })

    this.resetCategorySelected();
  }

  onValueChangeForMatch(value) {
    this.setState({ selectedMatch: value })
  }

  onValueChangeForPosition(playerFullName) {
    //  this.setState({player_position_id:playerTeamID})
    this.setState({ player_position: playerFullName })
    // var item = this.state.playerPositions[index];
    // var name = item.full_name;
    // this.setState({player_position:name})
    for (let i = 0; i < this.state.playerPositions.length; i++) {
      if (this.state.playerPositions[i].full_name === playerFullName) {
        this.setState({ player_position_id: this.state.playerPositions[i].player_team_id })
      }
    }


  }

  onValueChangeForSlider(value) {
    this.setState({ SliderMaxValue: value });
  }

  QuesCategoryButton() {
    return <View style={CreateBragStyle.Button_Container}>
      <FlatList
        horizontal={true}
        style={{ height: 40 }}
        alwaysBounceVertical={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        automaticallyAdjustContentInsets={true}
        directionalLockEnabled={true}
        keyExtractor={this._keyExtractor}
        data={this.state.questionList}
        renderItem={this.renderItem.bind(this)}
      />
    </View>
  }

  renderItem(data) {
    let { item, index } = data;
    return (
      this.state.questionList[index].selected ?
        <View style={CreateBragStyle.Category_Container}>
          <Ripple onPress={() => this.updatedSelected(index)}>
            <LinearGradient start={{ x: 0.6, y: 0 }} end={{ x: 2.5, y: 1.5 }}
    locations={[0.0, 0.4]} colors={['#1B75BC', '#9AD8DD']}style={CreateBragStyle.enabled_button} >
              <Text style={CreateBragStyle.disable_button_text}>{item.category_name}</Text>
            </LinearGradient>
          </Ripple>
        </View>
        :
        <Ripple onPress={() => this.updatedSelected(index)} style={CreateBragStyle.disabled_button} >
          <Text style={CreateBragStyle.disable_button_text}>{item.category_name}</Text>
        </Ripple>
    )
  }

  updatedSelected(index) {
    
    if (this.state.selectedTeam !== '') {
      const originalList = [...this.state.questionList];
      const item = this.state.questionList[index];
      this.setState({ selectedCategory: item.category_type })
      for (category of originalList) {
        if (category.category_type === item.category_type) {
          category.selected = true;
          this.setState({ questionObj: originalList[index] })
        }
        else {
          category.selected = false;
        }
      }
      this.setState({ isCategorySelected: true });
      this.setState({player_position: ''})
      this.setState({player_position_id: ''})
      this.getAllPlayerForCategory();
      this.setState({ questionList: originalList });
    }
  }

  resetCategorySelected() {
    if (this.state.isCategorySelected) {
      const originalList = [...this.state.questionList];
      for (category of originalList) {
        category.selected = false;
      }
      this.setState({ questionObj: '' })
      this.setState({ questionList: originalList })
      this.setState({ isCategorySelected: false });
    }
  }



  // QuesTypeButton(){
  //    return (this.state.questionType==='team')?
  //    <View style={CreateBragStyle.Button_Container}>
  //        <Ripple onPress={()=>  this.setState({questionType: 'team'})}>
  //        <LinearGradient colors={['#1B75BC', '#9AD8DD']} style={CreateBragStyle.enabled_button} >
  //              <Text style={CreateBragStyle.disable_button_text}>{String.ques_type_team}</Text>
  //        </LinearGradient>
  //        </Ripple>
  //        <Ripple onPress={()=>  this.setState({questionType: 'player'})} style={CreateBragStyle.disabled_button} >
  //              <Text style={CreateBragStyle.disable_button_text}>{String.ques_type_player}</Text>
  //        </Ripple>
  //    </View>
  //    :
  //    <View style={CreateBragStyle.Button_Container}>
  //        <Ripple onPress={()=>  this.setState({questionType: 'team'})} style={CreateBragStyle.disabled_button} >
  //              <Text style={CreateBragStyle.disable_button_text}>{String.ques_type_team}</Text>
  //        </Ripple>
  //        <Ripple onPress={()=>  this.setState({questionType: 'player'})}>
  //        <LinearGradient colors={['#1B75BC', '#9AD8DD']} style={CreateBragStyle.enabled_button} >
  //              <Text style={CreateBragStyle.disable_button_text}>{String.ques_type_player}</Text>
  //        </LinearGradient>
  //        </Ripple>
  //    </View>
  //  }

  LeagueTypeButton() {
    return (this.state.leagueType === '0') ?
      <View style={CreateBragStyle.Button_Container}>
        <TouchableOpacity onPress={() => this.setState({ leagueType: '0' })}>
          <LinearGradient start={{ x: 0.6, y: 0 }} end={{ x: 2.5, y: 1.5 }}
    locations={[0.0, 0.4]} colors={['#1B75BC', '#9AD8DD']} style={CreateBragStyle.enabled_button} >
            <Text style={CreateBragStyle.disable_button_text}>{String.public_contest}</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.setState({ leagueType: '1' })} style={CreateBragStyle.disabled_button} >
          <Text style={CreateBragStyle.disable_button_text}>{String.private_contest}</Text>
        </TouchableOpacity>
      </View>
      :
      <View style={CreateBragStyle.Button_Container}>
        <TouchableOpacity onPress={() => this.setState({ leagueType: '0' })} style={CreateBragStyle.disabled_button} >
          <Text style={CreateBragStyle.disable_button_text}>{String.public_contest}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.setState({ leagueType: '1' })}>
          <LinearGradient colors={['#1B75BC', '#9AD8DD']} style={CreateBragStyle.enabled_button} >
            <Text style={CreateBragStyle.disable_button_text}>{String.private_contest}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
  }

  getAllPlayerForCategory() {
    this.setState({ isLoading: true })
    const params = {
      sports_id: ConstantLib.SPORTS_ID,
      league_id: ConstantLib.LEAGUE_ID,
      team_league_id: this.state.selectedTeam,
      category_type: this.state.selectedCategory,
      player_name: '',
    };

    WSManager.postData(URLConstants.CREATE_BRAG_GET_PLAYER_URL, params)
      .then(response => {
        this.setState({ isLoading: false })
        var data = response.data.data.player_list;
        console.log("getAllPlayerForCategory ==" + JSON.stringify(data));
        if (data.length >0)
        {
          this.setState({ playerPositions: data });
          this.setState({ player_position_id: data[0].player_team_id })
          // if(data.length>0){
          //     this.setState({playerPositions:data});
          // }
          // else{
          //     this.setState({playerPositions:[]});
          // }
        }
        else
        {
          Toaster.showLongToast('No Player for the category');
        }
        // this.setState({ playerPositions: data });
        // //this.setState({ player_position_id: data[0].player_team_id })
        // // if(data.length>0){
        // //     this.setState({playerPositions:data});
        // // } 
        // // else{
        // //     this.setState({playerPositions:[]});
        // // }
      })
      .catch(error => {
        this.setState({ isLoading: false })
        Toaster.showLongToast('Category error:' + error.message);
        this.setState({ isLoading: false })
        return error;
      });
  }


  getAllTeams(conferenceID) {
    this.setState({ isLoading: true })
    const params = {
      sports_id: ConstantLib.SPORTS_ID,
      league_id: ConstantLib.LEAGUE_ID,
      conference_id: conferenceID,
    };

    WSManager.postData(URLConstants.ALL_TEAMS_URL, params)
      .then(response => {
        this.setState({ isLoading: false })
        var data = response.data.data.result;
        console.log("getAllTeams items==" + JSON.stringify(data));
        var items = [];
        items.push({
          "team_name": "",
        });



        if (data.length > 0) {
          this.setState({ teamList: [...items, ...data] });
          //   this.setState({teamList:data});
          //           this.setState({selectedTeam:data[0].team_league_id})
          //     this.getAllMatchesByTeam(data[0].team_league_id);
        }
        else {
          this.setState({ teamList: [] });
        
           
          
        }
        this.setState({ isLoading: false })
      })
      .catch(error => {
        this.setState({ isLoading: false })
       // Toaster.showLongToast('Get all team error :' + error.message);
       Toaster.showLongToast('Team not found');
        this.setState({ isLoading: false })
        return error;
      });
  }

  getAllMatchesByTeam(teamLeagueId) {
    this.setState({ isLoading: true })
    const params = {
      team_league_id: teamLeagueId
    };

    WSManager.postData(URLConstants.CREATE_BRAG_GET_TEAM_MATCHES, params)
      .then(response => {
        this.setState({ isLoading: false })

        var data = response.data.data.match_list;
        console.log("selectedMatch==" + data.length);
        var seasonGameUID = data[0].season_game_uid;
        this.setState({ selectedMatch: seasonGameUID })
        this.setState({ matchList: data });
        this.setState({ isLoading: false })
      })
      .catch(error => {
        this.setState({ isLoading: false })
       // Toaster.showLongToast('selectedMatch:' + error.message);
       Toaster.showLongToast('Match not found');
        this.setState({ isLoading: false })
        return error;
      });
  }


  getCreateBragMasterData() {
    this.setState({ isLoading: true })
    const params = {
      sports_id: '2',
    };

    WSManager.postData(URLConstants.CREATE_BRAG_MASTER_URL, params)
      .then(response => {
        this.setState({ isLoading: false })

        var conferencesList = response.data.data.conferences;
        var items = [];
        items.push({
          "conference_name": "",
        });


        this.setState({ conferenceList: [...items, ...conferencesList] });
        //   this.setState({conferenceList:conferencesList});

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
        this.setState({ questionList: question_dataList })
        this.setState({ isLoading: false })

      })
      .catch(error => {
        this.setState({ isLoading: false })

       // Toaster.showLongToast('Error:' + error.message);

        this.setState({ isLoading: false })
        return error;
      });
  }

  validate() {
    if (this.state.selectedConference == '') {
      Toaster.showLongToast('Please select Conference');
      return false
    }

    else if (this.state.selectedTeam == '') {
      Toaster.showLongToast('Please select Team');
      return false
    }
    else if (this.state.isCategorySelected == false) {
      Toaster.showLongToast('Please select Question Category');
      return false
    }
    else if (this.state.player_position_id == '') {
      Toaster.showLongToast('Please select Player');
      return false
    }
    else {
      return true;
    }
  }

  createBragFromApp() {
    if (this.validate()) {
      this.setState({ isLoading: true })
      var positionOpt = this.state.questionObj;
      const params = {
        league_id: ConstantLib.LEAGUE_ID,
        conference_id: this.state.selectedConference,
        team_league_id: this.state.selectedTeam,
        contest_access_type: this.state.leagueType,
        entry_fee: this.state.SliderMaxValue,
        master_question_id: this.state.questionObj.master_question_id,
        player_team_id: this.state.player_position_id,
        contest_name: '',
        season_game_uid: this.state.selectedMatch,
      };
      //{"league_id":"113","conference_id":"2","team_league_id":"256","contest_access_type":"0","entry_fee":10,"master_question_id":"8","player_position":"","contest_name":"","season_game_uid":"2455"}

      WSManager.postData(URLConstants.CREATE_BRAG_API, params)
        .then(response => {
          this.setState({ isLoading: false })
          var result = response.data.data;
          var contest_detail = response.data.data.contest_detail;
          ConstantLib.ID = contest_detail.join_code;
          //ConstantLib.BragTitle = contest_detail.question
        console.log('createBragFromApp Success = ' + JSON.stringify(result));
          if (this.state.leagueType === '1') {
            this.props.navigation.navigate('Invite');
          } else {
            const resetAction = StackActions.reset({
              index: 0,
              key: null,
              actions: [
                NavigationActions.navigate({ routeName: 'WellDoneAfterCreatingBrag' }),
              ]
            });
            this.setState({ isLoading: false })
            this.props.navigation.dispatch(resetAction);

          }
        })
        .catch(error => {
          this.setState({ isLoading: false })
          this.setState({ isLoading: false })
          Toaster.showLongToast('getAllTeams:' + error.message);

          return error;
        });

    }
  }

  
}

var customStyles9 = StyleSheet.create({
  thumb: {
    width: 30,
    height: 30,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 1,
  }
});



const CustomHeader = ({ navigation }) => (
  <LinearGradient
    start={{ x: 0.6, y: 0 }} end={{ x: 2.5, y: 1.5 }}
    locations={[0.0, 0.4]}
    colors={['#1B75BC', '#9AD8DD']}
    style={{ paddingTop: Platform.OS === "ios" ? 30 : 20 }}>

    <View style={{ flexDirection: 'row', padding: 15, paddingTop: Platform.OS === "ios" ? 10 : 20 }}>
      <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={{ flex: 1, justifyContent: 'center' }} transparent>
        <Image source={IMAGES.ic_drawer_menu} />
      </TouchableOpacity>
      <View style={{ flex: 1, alignItems: 'flex-end', paddingRight: 15 }}>
        <Text style={AppStyles.header_title}>CREATE BRAG</Text>
      </View>
      <TouchableOpacity style={{ flex: 1, alignItems: "flex-end" }} transparent>
        <Text style={{ color: '#fff', fontSize: 16, textAlign: 'center' }}></Text>
      </TouchableOpacity>
    </View>
  </LinearGradient>

);
