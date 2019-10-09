import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, StatusBar, Animated, Platform, FlatList, ImageBackground, Thumbnail, RefreshControl, SafeAreaView } from 'react-native';
import { Button, Form, Item, Input, Container, Content, StyleProvider, Icon, H3, Header, Left, Right, Body, Separator }
  from 'native-base';
import { AppStyles, Images } from '../../Themes/';
import { NavigationActions } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import Modal from "react-native-modal";
import * as URLConstants from '../../Networking/URLConstants/';
import WSManager from '../../Networking/WSManager/';
import ConstantLib from '../../Constants/ConstantLib';
import Loader from '../../Utils/Loader/';
import Ripple from 'react-native-material-ripple';
import Toaster from '../../Utils/Toaster/';
import Utility from '../../Utils/Utility/';
import PreferenceConstant, { UserCurrentBalancePreferenceConstant } from '../../Preferences/PreferenceConstant'
import { getItem } from '../../lib/Session';
import { TabBarTop } from 'react-navigation';


export default class GameLogs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      refreshing: false,
      users: [],
      notifyDataChange: false,
      contest_id: '',
      players_unique_id: ConstantLib.playerDetails.player_uid,
      players_game_log: '',
      responseData: '',
    }
  }


  render() {

    return (
      
      <View style={[AppStyles.Wrapper, { backgroundColor: '#fff' }]}>
      {this.state.players_game_log.length != 0 ?
        <View>
        
          <View style = {{paddingLeft: 20, paddingTop: 20}}>
            <Text style = {{ fontFamily:'SourceSansPro-Regular', fontWeight: 'bold', fontSize: 14, color:'#333333' }}>{'Last '+this.state.players_game_log.length+' Matches'} </Text>
          </View>
          <FlatList
            data={this.state.players_game_log}
            renderItem={({ item, index }) => (this.setDataOnPlayerCards(item))}
          >
          
          </FlatList>
          
          
        </View>
        :

        <View>
        
        <View style = {{alignItems: 'center', width: '100%', height: '100%', backgroundColor: 'transparent', justifyContent: 'center'}}>
          <Text style = {{ fontFamily:'SourceSansPro-Regular', fontWeight: 'bold', fontSize: 14, color:'#333333' }}>{'No Matches Played Till'}</Text>
        </View>
       
      </View>
      }

      </View>
    );
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    this.setState({ currentPage: 1 });
    this.getContestMasterData(false);
  }

  componentDidMount() {
    mContext = this;
    console.log('Game Log : ', ConstantLib.playerDetails)
    this.getPlayerCardDetails(ConstantLib.playerDetails.player_uid);

  }

  setDataOnPlayerCards(playerDetails) {
    return (
      <PlayerCards playerDetails={playerDetails}>
      </PlayerCards>
    );


  }


  getPlayerCardDetails(player_uid) {
    this.setState({ loading: false })
    const params = {
      player_unique_id: player_uid,
    };

    WSManager.postData(URLConstants.PLAYER_CARD_DETAILS, params)
      .then(response => {
        console.log("getPlayerCardDetails==" + JSON.stringify(response.data));
        this.setState({ players_game_log: response.data.data.game_log }, function () {
          console.log("getPlayerCardDetailsGameLog==" + JSON.stringify(response.data.data.game_log));
          this.setState({ loading: false })
        })

      })
      .catch(error => {
        this.setState({ loading: false })
        console.log('Error= ' + JSON.stringify(error));
        Toaster.showLongToast('Error:' + error.message);
        return error;
      });
  }






}



class PlayerCards extends Component {

  constructor(props) {
    super(props);
    this.state = {

      passingYards: this.props.playerDetails.passing_yards,
      passingTouchDown: this.props.playerDetails.passing_touchdowns,
      interceptions: this.props.playerDetails.interceptions,
      rushingYards: this.props.playerDetails.rushing_yards,
      rushingTouchDown: this.props.playerDetails.rushing_touchdowns,
      fieldGoalsMade: this.props.playerDetails.field_goals_made,
      reception: this.props.playerDetails.receptions,
      receivingYards: this.props.playerDetails.receiving_yards,
      receivingTouchDown: this.props.playerDetails.receiving_touchdowns,
      seasonScheduledDate: this.props.playerDetails.season_scheduled_date,
      oppTeam: this.props.playerDetails.OPP,
      
      
      sacks: this.props.playerDetails.sacks,
      tackles: this.props.playerDetails.tackles,
      extraPointsMade: this.props.playerDetails.extra_points_made




    }
  }



  render() {
    return (
      <View style={{ width: '100%', padding: 20, backgroundColor: 'white', alignSelf: 'center', }}>
        <View style={{ flexDirection: 'row' }}>
          <View><Text style={{ fontFamily: 'SourceSansPro-Regular', fontSize: 13, fontWeight: '600', color: '#999999' }}>{Utility.getFormatedDate(this.state.seasonScheduledDate, 'ddd, MMM D')} v </Text></View>
          <View><Text style={{ fontFamily: 'SourceSansPro-Regular', fontSize: 13, fontWeight: '600', color: '#666666' }}>{this.state.oppTeam != null && this.state.oppTeam != 'null' && this.state.oppTeam != '' ? this.state.oppTeam : ''}</Text></View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 20 }}>
          {/* Passing*/}
          <View>
            <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 16, fontWeight: '600', color: '#666666' }}>{this.state.passingYards != null && this.state.passingYards != '' && this.state.passingYards != 'null' ? this.state.passingYards : 0}</Text></View>
            <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 13, fontWeight: '600', color: '#888888' }}>PaYds</Text></View>
            <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 16, fontWeight: '600', color: '#666666', marginTop:10 }}>{this.state.passingTouchDown != null && this.state.passingTouchDown != '' && this.state.passingTouchDown != 'null' ? this.state.passingTouchDown : 0}</Text></View>
            <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 13, fontWeight: '600', color: '#888888' }}>PaTD</Text></View>
          </View>
           {/* Rushing*/}
           <View>
            <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 16, fontWeight: '600', color: '#666666' }}>{this.state.rushingYards != null && this.state.rushingYards != '' && this.state.rushingYards != 'null' ? this.state.rushingYards : 0}</Text></View>
            <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 13, fontWeight: '600', color: '#888888' }}>RuYds</Text></View>

            <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 16, fontWeight: '600', color: '#666666', marginTop:10  }}>{this.state.rushingTouchDown != null && this.state.rushingTouchDown != '' && this.state.rushingTouchDown != 'null' ? this.state.rushingTouchDown : 0}</Text></View>
            <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 13, fontWeight: '600', color: '#888888' }}>RuTD</Text></View>
          </View>

          {/* Receiving*/}
          <View>
          <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 16, fontWeight: '600', color: '#666666' }}>{this.state.receivingYards != null && this.state.receivingYards != '' && this.state.receivingYards != 'null' ? this.state.receivingYards : 0}</Text></View>
            <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 13, fontWeight: '600', color: '#888888' }}>ReYds</Text></View>
            <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 16, fontWeight: '600', color: '#666666', marginTop:10  }}>{this.state.receivingTouchDown != null && this.state.receivingTouchDown != '' && this.state.receivingTouchDown != 'null' ? this.state.receivingTouchDown : 0}</Text></View>
            <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 13, fontWeight: '600', color: '#888888' }}>ReTD</Text></View>
          </View>

          {/* Interceptions & Reception*/}
          <View>
          <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 16, fontWeight: '600', color: '#666666' }}>{this.state.interceptions != null && this.state.interceptions != '' && this.state.interceptions != 'null' ? this.state.interceptions : 0}</Text></View>
            <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 13, fontWeight: '600', color: '#888888' }}>INT</Text></View>
            <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 16, fontWeight: '600', color: '#666666', marginTop:10  }}>{this.state.reception != null && this.state.reception != '' && this.state.reception != 'null' ? this.state.reception : 0}</Text></View>
            <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 13, fontWeight: '600', color: '#888888' }}>Rec</Text></View>
          </View>

          {/* fieldGoalsMade*/}
          <View>
            <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 16, fontWeight: '600', color: '#666666' }}>{this.state.tackles != null && this.state.tackles != '' && this.state.tackles != 'null' ? this.state.tackles : 0}</Text></View>
            <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 13, fontWeight: '600', color: '#888888' }}>Tackles</Text></View>

            <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 16, fontWeight: '600', color: '#666666',  marginTop:10   }}>{this.state.sacks != null && this.state.sacks != '' && this.state.sacks != 'null' ? this.state.sacks : 0}</Text></View>
            <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 13, fontWeight: '600', color: '#888888' }}>Sacks</Text></View>
          </View>

          {/* fieldGoalsMade and extraPointsMade*/}
          <View>
            <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 16, fontWeight: '600', color: '#666666' }}>{this.state.fieldGoalsMade != null && this.state.fieldGoalsMade != '' && this.state.fieldGoalsMade != 'null' ? this.state.fieldGoalsMade : 0}</Text></View>
            <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 13, fontWeight: '600', color: '#888888' }}>FG</Text></View>

            <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 16, fontWeight: '600', color: '#666666',  marginTop:10   }}>{this.state.extraPointsMade != null && this.state.extraPointsMade != '' && this.state.extraPointsMade != 'null' ? this.state.extraPointsMade : 0}</Text></View>
            <View><Text style={{ alignSelf: "center", fontFamily: 'SourceSansPro-Regular', fontSize: 13, fontWeight: '600', color: '#888888' }}>EP</Text></View>
          </View>



        </View>

<Separator style = {{height:1, marginTop: 20}}></Separator>
        


      </View>
    );
  }
}