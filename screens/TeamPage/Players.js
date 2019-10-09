import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Dimensions, TouchableOpacity, Image,StatusBar,Animated,Platform ,FlatList,ImageBackground,Thumbnail,RefreshControl} from 'react-native';
import { Button, Form, Item, Input, Container, Content, StyleProvider, Icon, H3 ,Header,Left, Right,Body,Card}
from 'native-base';
import {AppStyles, Images} from '../../Themes/';
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
import CommentsStyle from '../Lobby/CommentsStyle';
import { convertToStringCapitalizedForm, convertStringToLowerCase } from '../../Constants/Methods';
import PreferenceConstant,{UserCurrentBalancePreferenceConstant} from '../../Preferences/PreferenceConstant'
import { getItem } from '../../lib/Session';
import PlayerCard from './PlayerCard';


export default class Players extends Component {


  constructor(props) {
      super(props);
      this.state = {
        loading:false,
        refreshing: false,
        users:[],
        notifyDataChange:false,
        contest_id: '',
        contest_unique_id: '',
        responseData: '',
        currentPage:0,

        isModalVisible: false,
        teamLeagueId:'',
      }
  }




 
  render() {

    return (
      <View  style={{backgroundColor:'white',width: '100%', height: '100%'}}>

      <Loader loading={this.state.loading} />

      <Modal isVisible = {this.state.isModalVisible}> 
        <View>
            <PlayerCard></PlayerCard>
        </View>
      </Modal> 

       <FlatList
            extraData={this.state}
            style={{backgroundColor:'rgba(240,240,240, 1.0)'}}
            data={this.state.users}

            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
              />
            }
              renderItem={this.renderItem.bind(this)}
          />
          </View>
    );
  }

  _showModal = () => this.setState({isModalVisible: true})
  _hideModal = () => this.setState({isModalVisible: false})


  _actionOnRow(playerDetails) {
    
     ConstantLib.playerDetails = playerDetails;
     console.log(playerDetails)
    const navigateAction = NavigationActions.navigate({
      routeName: 'PlayerCard',
      params: {'playerDetails':playerDetails},
      action: NavigationActions.navigate({ routeName: 'PlayerCard' })
    })
    const nav = WSManager.getTopLevelNavigator()
    nav.dispatch(navigateAction)

  }
  renderItem(data) {
    let { item, index } = data;
    return (
      
      <TouchableOpacity onPress={() => this._actionOnRow(item)} style={{ marginTop: 10, marginLeft:10, marginRight:10, marginBottom: 0 }}>
        <View style={{ position: 'relative' }}>
      <Card style={{ flexDirection:'row', paddingLeft:10,paddingRight:10 ,alignItems:'center',paddingVertical: 2, borderRadius: 5, borderWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, marginBottom: 3 }}>

        <Image style={CommentsStyle.NotificationLogo}
               source={item.jersey === null || item.jersey === '' ||
                   item.jersey === 'null' ? IMAGES.default_user : { uri: item.jersey }}
          />
        <View style={CommentsStyle.NotificationMessageContainer}>
          <Text style={CommentsStyle.nameTextStyle}>{convertToStringCapitalizedForm((item.first_name)) + ' ' + convertToStringCapitalizedForm(item.last_name)}</Text>
          <Text style={CommentsStyle.commentTextStyle}>{item.team_abbreviation}</Text>
          
        </View>

        <View>


        <LinearGradient
          start={{ x: 0.6, y: 0 }} end={{ x: 2.5, y: 1.5 }}
          locations={[0.0, 0.4]}
          colors={['#1B75BC', '#9AD8DD']}
          style={{borderRadius: 18}}>
             <Text style={{fontSize: 14,
             color: '#fff',
             paddingLeft: 12,
             paddingRight: 12,
             paddingTop: 5,
             paddingBottom: 5,
             fontFamily:'SourceSansPro-Regular',
             fontWeight: 'bold'}}>{item.position}</Text>
         </LinearGradient>
         </View>


           </Card>
      </View>
  
  </TouchableOpacity>

    )
  }


  _onRefresh() {
    this.setState({refreshing: true});
    this.setState({currentPage:0});
     this.getPlayers();
  }

  componentDidMount() {
         mContext = this;
         this.subs = [
           this.props.navigation.addListener('willFocus', () => mContext = this),
         ];
      
         setTimeout(() => {
          console.log('Team League ID: ', this.props.screenProps.teamDetails.team_league_id)
          this.getPlayers(this.props.screenProps.teamDetails.team_league_id);
         }, 1000);
              
   


   }
   blankData=async () => {
   }
  getPlayers=async(teamLeagueId) => {

    var cPage = this.state.currentPage + 1;

      this.setState({loading: true})
      const params = {
        items_perpage:100,
        current_page:1,
        sort_order:'ASC',
        sort_field:'full_name',
        team_league_id:teamLeagueId,
        league_id:'113',
        sports_id:'2',
        position:'',
      };
      WSManager.postData(URLConstants.GET_ALL_ROSTER, params)
      .then(response => {
           if(cPage>0)
          {
            this.setState({users: [...this.state.users, ...response.data.data.result]});
          }else {
            this.setState({users:data});
          }
          if(response.data.data.result.length<20){
           this.setState({canLoadMoreContent:false});
         }
         else{
             this.setState({canLoadMoreContent:true});
         }
          this.setState({loading: false})
          this.setState({refreshing: false});
      })
      .catch(error => {
          this.setState({loading: false})
          this.setState({refreshing: false});
      //    console.log('Error= '+JSON.stringify(error));
          Toaster.showLongToast('Error:'+error.message);
        return error;
      });
    }




}
