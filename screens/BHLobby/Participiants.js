import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Dimensions, TouchableOpacity, Image,StatusBar,Animated,Platform ,FlatList,ImageBackground,Thumbnail,RefreshControl} from 'react-native';
import { Button, Form, Item, Input, Container, Content, StyleProvider, Icon, H3 ,Header,Left, Right,Body}
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
import JoinBragStyle from './JoinBragStyle';
import Utility from '../../Utils/Utility/';
import PreferenceConstant,{UserCurrentBalancePreferenceConstant} from '../../Preferences/PreferenceConstant'
import { getItem } from '../../lib/Session';



export default class Participiants extends Component {


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

        currentUserID:''
      }
  }

moveToOthersProfile(user_id){

  const navigateAction = NavigationActions.navigate({
    routeName: 'OtherProfileScreen',
    params: {'user_id':user_id},
    action: NavigationActions.navigate({ routeName: 'OtherProfileScreen' })
  })
  const nav = WSManager.getTopLevelNavigator()
  nav.dispatch(navigateAction)
}


moveToUserOwnProfile(user_id){

  const navigateAction = NavigationActions.navigate({
   routeName: 'ProfileScreen',
   params: {'isFromBottomTab':false},

 })
 const nav = WSManager.getTopLevelNavigator()
 nav.dispatch(navigateAction)

}
bragOnWhichQuestionView(item)
{
var views = []
for (var i = 0;i<item.joined_lineup.length;i++)
{
  if (this.state.responseData.contest_type == '0' )
  {
    for (var j = 0;j<this.state.responseData.player_list.length;j++)
    {
        if (this.state.responseData.player_list[j].player_team_id == item.joined_lineup[i].player_team_id)
        { 
          for (var k = 0;k<this.state.responseData.winner_player_team_id.length;k++)
          {
            if(ConstantLib.IS_COMPLETE == '1')
            {
                      if (item.joined_lineup[i].player_team_id == this.state.responseData.winner_player_team_id[k])
                  {
                    views.push(
                      <View style={{flexDirection:'row', flex:1,paddingLeft:10,justifyContent: 'flex-start', margin:0}}  >
                        <Text style={[{ fontFamily:'SourceSansPro-Regular',fontSize:12, color: '#34A853'},]}>Selected Player {this.state.responseData.player_list[j].team_name}  |  {item.joined_lineup[i].bet_amount} Brag Points</Text>
                        <Text style={{ fontFamily:'SourceSansPro-Regular',fontSize:12,color:'#34A853',paddingLeft:10}}>{(item.joined_lineup[i].is_winner=='1' && item.joined_lineup[i].is_winner!='0' )?'W':''}</Text>
                      </View>)
                  }
                  else
                  {
                    views.push(
                      <View style={{flexDirection:'row', flex:1,paddingLeft:10,justifyContent: 'flex-start', margin:0}}  >
                        <Text style={[{ fontFamily:'SourceSansPro-Regular',fontSize:12, color: '#989898'},]}>Selected Player {this.state.responseData.player_list[j].team_name}  |  {item.joined_lineup[i].bet_amount} Brag Points</Text>
                        {/* <Text style={{ fontFamily:'SourceSansPro-Regular',fontSize:12,color:'#34A853',paddingLeft:10}}>{(joinedLineUp[i].is_winner=='1' && joinedLineUp[i].is_winner!='0' )?'WINNER':''}</Text> */}
                      </View>)

                  }

            }
            else
            {
             
                    views.push(
                      <View style={{flexDirection:'row', flex:1,paddingLeft:10,justifyContent: 'flex-start', margin:0}}  >
                        <Text style={[{ fontFamily:'SourceSansPro-Regular',fontSize:12, color: '#989898'},]}>Selected Player {this.state.responseData.player_list[j].team_name}  |  {item.joined_lineup[i].bet_amount} Brag Points</Text>
                        {/* <Text style={{ fontFamily:'SourceSansPro-Regular',fontSize:12,color:'#34A853',paddingLeft:10}}>{(joinedLineUp[i].is_winner=='1' && joinedLineUp[i].is_winner!='0' )?'WINNER':''}</Text> */}
                      </View>)
            }
            
          }
        }
  } 
  }

  if (this.state.responseData.contest_type == '1' )
  {
    for (var j = 0;j<this.state.responseData.question_option.length;j++)
    {
        if (this.state.responseData.question_option[j].option_id == item.joined_lineup[i].option_id)
        { 
          if(ConstantLib.IS_COMPLETE == '1')
            {
                if (item.joined_lineup[i].option_id == this.state.responseData.winner_option_id)
                {
                  views.push(
                    <View style={{flexDirection:'row', flex:1,paddingLeft:10,justifyContent: 'flex-start', margin:0}}  >
                      <Text style={[{ fontFamily:'SourceSansPro-Regular',fontSize:12, color: '#34A853'},]}>Selected Option {this.state.responseData.question_option[j].min_value+' - '+this.state.responseData.question_option[j].max_value}  |  {item.joined_lineup[i].bet_amount} Brag Points</Text>
                      <Text style={{ fontFamily:'SourceSansPro-Regular',fontSize:12,color:'#34A853',paddingLeft:10}}>{(item.joined_lineup[i].is_winner=='1' && item.joined_lineup[i].is_winner!='0' )?'W':''}</Text>
                    </View>)
                }
                else
                {
                  views.push(
                    <View style={{flexDirection:'row', flex:1,paddingLeft:10,justifyContent: 'flex-start', margin:0}}  >
                      <Text style={[{ fontFamily:'SourceSansPro-Regular',fontSize:12, color: '#989898'},]}>Selected Option {this.state.responseData.question_option[j].min_value+' - '+this.state.responseData.question_option[j].max_value}  |  {item.joined_lineup[i].bet_amount} Brag Points</Text>
                      {/* <Text style={{ fontFamily:'SourceSansPro-Regular',fontSize:12,color:'#34A853',paddingLeft:10}}>{(joinedLineUp[i].is_winner=='1' && joinedLineUp[i].is_winner!='0' )?'WINNER':''}</Text> */}
                    </View>)

                }
        }
        else{
          views.push(
            <View style={{flexDirection:'row', flex:1,paddingLeft:10,justifyContent: 'flex-start', margin:0}}  >
              <Text style={[{ fontFamily:'SourceSansPro-Regular',fontSize:12, color: '#989898'},]}>Selected Option {this.state.responseData.question_option[j].min_value+' - '+this.state.responseData.question_option[j].max_value}  |  {item.joined_lineup[i].bet_amount} Brag Points</Text>
              {/* <Text style={{ fontFamily:'SourceSansPro-Regular',fontSize:12,color:'#34A853',paddingLeft:10}}>{(joinedLineUp[i].is_winner=='1' && joinedLineUp[i].is_winner!='0' )?'WINNER':''}</Text> */}
            </View>)
        }
        }
  } 
  }

  if (this.state.responseData.contest_type == '2' )
  {
    for (var j = 0;j<this.state.responseData.team_list.length;j++)
    {
        if (this.state.responseData.team_list[j].team_league_id == item.joined_lineup[i].team_league_id)
        { 
          for (var k = 0;k<this.state.responseData.winner_team_league_id.length;k++)
          {
            if(ConstantLib.IS_COMPLETE == '1')
            {
              if (item.joined_lineup[i].team_league_id == this.state.responseData.winner_team_league_id[k])
          {
            views.push(
              <View style={{flexDirection:'row', flex:1,paddingLeft:10,justifyContent: 'flex-start', margin:0}}  >
                <Text style={[{ fontFamily:'SourceSansPro-Regular',fontSize:12, color: '#34A853'},]}>Selected Team {this.state.responseData.team_list[j].team_name}  |  {item.joined_lineup[i].bet_amount} Brag Points</Text>
                <Text style={{ fontFamily:'SourceSansPro-Regular',fontSize:12,color:'#34A853',paddingLeft:10}}>{(item.joined_lineup[i].is_winner=='1' && item.joined_lineup[i].is_winner!='0' )?'W':''}</Text>
              </View>)
          }
          else
          {
            views.push(
              <View style={{flexDirection:'row', flex:1,paddingLeft:10,justifyContent: 'flex-start', margin:0}}  >
                <Text style={[{ fontFamily:'SourceSansPro-Regular',fontSize:12, color: '#989898'},]}>Selected Team {this.state.responseData.team_list[j].team_name}  |  {item.joined_lineup[i].bet_amount} Brag Points</Text>
                {/* <Text style={{ fontFamily:'SourceSansPro-Regular',fontSize:12,color:'#34A853',paddingLeft:10}}>{(joinedLineUp[i].is_winner=='1' && joinedLineUp[i].is_winner!='0' )?'WINNER':''}</Text> */}
              </View>)

          }
            }
            else
            {
              views.push(
                <View style={{flexDirection:'row', flex:1,paddingLeft:10,justifyContent: 'flex-start', margin:0}}  >
                  <Text style={[{ fontFamily:'SourceSansPro-Regular',fontSize:12, color: '#989898'},]}>Selected Team {this.state.responseData.team_list[j].team_name}  |  {item.joined_lineup[i].bet_amount} Brag Points</Text>
                  {/* <Text style={{ fontFamily:'SourceSansPro-Regular',fontSize:12,color:'#34A853',paddingLeft:10}}>{(joinedLineUp[i].is_winner=='1' && joinedLineUp[i].is_winner!='0' )?'WINNER':''}</Text> */}
                </View>)
            }
            
          }
          
          
        }
  } 
  }
  
      
      
     
      

}
return views;
  
    
  
}

  render() {

    return (
      <View  style={{backgroundColor:'white',width: '100%', height: '100%'}}>

      <Loader loading={this.state.loading} />
      {(this.state.users.length==0)?

        <View style={JoinBragStyle.NoRecordContainer}>
            <Text style={{ fontFamily:'SourceSansPro-Regular' }}>Be the first to join</Text>
        </View>
      :

       <FlatList
            extraData={this.state}
            style={{backgroundColor:'white'}}
            data={this.state.users}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh.bind(this)}
              />
            }
            renderItem={({item,index}) =>

            <Ripple onPress={()=>( getItem(PreferenceConstant.USER_ID).then((value) => {

              (value != item.user_id)? this.moveToOthersProfile(item.user_id) : this.moveToUserOwnProfile(item.user_id);

            }))}  style={AppStyles.Conference}>
                <View>
                   <Image style={AppStyles.Conference_item_image}
                     source={item.image === null || item.image === '' || item.image === 'null' ? Images.default_user : { uri: item.image }} />
                </View>
                <View >
                     <View><Text style={[{flex:1,fontSize:12,color:'#000000',fontFamily:'SourceSansPro-Regular',paddingLeft:10}]}>{item.first_name+' '+item.last_name}</Text></View>
                       {
                           ConstantLib.IS_COMPLETE == '1'? this.bragOnWhichQuestionView(item)  : this.state.currentUserID == item.user_id ? this.bragOnWhichQuestionView(item) : null 
                       }
                       

                </View>

               <View style={{ justifyContent:'flex-end', flex:1, flexDirection:'row',  alignItems:'center'}}>
               

                {(item.user_id!==ConstantLib.USER_ID) &&
                  (
                    (item.is_follow==='0')?
                      <Button onPress={()=>this.followUsers(index)} transparent style={{borderWidth: 1, borderColor: '#E2E2E2', borderRadius: 13, height: 26,}}>
                        <Text style={{fontSize: 10,  color:'#666666',paddingLeft:7, paddingRight: 7, fontFamily:'SourceSansPro-Regular'}}>FOLLOW</Text>
                      </Button>
                      :
                      <Button onPress={()=>this.followUsers(index)} transparent style={{borderWidth: 1, borderColor: '#E2E2E2', borderRadius: 13, height: 26}}>
                        <Text style={{fontSize: 10,  color:'#1CBB04',paddingLeft:7, paddingRight: 7, fontFamily:'SourceSansPro-Regular'}}>FOLLOWING</Text>
                      </Button>
                    )
                }
               </View>
             </Ripple>
            }
          />}
          </View>
    );
  }

  _onRefresh() {
    this.setState({refreshing: true});
    this.setState({currentPage:1});
     this.getContestMasterData(false);
  }

  componentDidMount() {
         mContext = this;
         this.subs = [
           this.props.navigation.addListener('willFocus', () => mContext = this),
         ];
         getItem(PreferenceConstant.USER_ID).then((value) => {
          
          this.setState({currentUserID: value}, () => {
            setTimeout (() => {
              //     var contestId = this.props.navigation.getParam('contest_id','');
              //     var contestUniqueId = this.props.navigation.getParam('contest_unique_id','');
                   this.setState({contest_id:ConstantLib.CURRENT_CONTEST_ID})
                   this.setState({contest_unique_id:ConstantLib.CURRENT_CONTEST_UNIQUE_ID}, () => {
                    this.getContestMasterData(false);
                   })
                   
            }, 1000);

          })

          
        })
        
         

   }

  getContestMasterData(showLoader){
    if(showLoader){
      this.setState({loading: true})
    }
    else{
      this.setState({loading: false})
    }
      const params = {
        contest_id: this.state.contest_id,
        contest_unique_id:this.state.contest_unique_id,
      };

      WSManager.postData(URLConstants.JOIN_BRAG_MASTER_API, params)
      .then(response => {
          console.log("Participants =="+JSON.stringify(response.data.data.users));
          this.setState({responseData:response.data.data})
          console.log('Complete data============',response.data,'========================================')
          this.setState({users:response.data.data.users})
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

  followUsers(index){
    if(Utility.isLoggedIn(this.props.navigation))
    {

        this.setState({loading: true})
        const params = {
          follower_id: this.state.users[index].user_id,
          type: 'user',
        };


    WSManager.postData(URLConstants.TOGGLE_FOLLOW_ENTITY, params)
    .then(response => {
        let { posts } = this.state;
          this.setState({loading: false})
          var updatedArr = [...this.state.users];
          updatedArr[index].follow_status = updatedArr[index].follow_status === '0' ? '1' : '0';
          this.setState({users: updatedArr});
          this.setState({notifyDataChange:true});
          this.getContestMasterData(true);
        })
    .catch(error => {
      this.setState({loading: false})
      Toaster.showLongToast('followUsers:'+error.message);
      return error;
    });

}
}
		static callBackMethod(data1,contestId1,contestUniqueId1){
          data = contestId1;
          Toaster.showLongToast('data:'+data);
          // mContext.setState({contestId:contestId})
          // mContext.setState({contest_unique_id:contestUniqueId})
				  // mContext.setState({responseData:data})
      //     this.getContestMasterData(false);
		}



}
