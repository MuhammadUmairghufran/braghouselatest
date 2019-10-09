import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Dimensions, TouchableOpacity, Image,StatusBar,Animated,Platform ,FlatList,ImageBackground}
 from 'react-native';
import { Button, Form, Item, Input, Container, Content, StyleProvider, Icon, H3 ,Header,Left, Right}
from 'native-base';
import {AppStyles, Images} from '../../Themes/';
import Loader from '../../Utils/Loader/';
import * as URLConstants from '../../Networking/URLConstants/';
import WSManager from '../../Networking/WSManager/';
import LinearGradient from 'react-native-linear-gradient';
import Modal from "react-native-modal";
import ConstantLib  from '../../Constants/ConstantLib/';
import {getItem,saveItem} from '../../lib/Session';
import PreferenceConstant from '../../Preferences/PreferenceConstant';
import Utility from '../../Utils/Utility/';

let mContext = null;
const MyStatusBar = ({backgroundColor, ...props}) => (
<View style={[AppStyles.statusBar, { backgroundColor }]}>
  <StatusBar translucent backgroundColor={backgroundColor} {...props} />
</View>
);



export default class ConferenceTeam extends Component {

  constructor(props) {
      super(props);
      this.state = {
        loading:false,
        refreshing: false,
        teamList:[],
        selectedTeam:'',
        conferenceItem:'',
        headerTitle:'',
        is_onboarding:0,
       }
  }

  goBack(){
     this.navigation.navigate('Conference' ,{'is_reload':true, is_onboarding: this.state.is_onboarding })
  }

  doneClick() {
    let isFollowed=false;
    for (let i = 0; i < this.state.teamList.length; i++)
     {
      if(this.state.teamList[i].is_follow_team==1)
      {
        isFollowed=true;
        break;
      }
     }

     if(isFollowed)
     {
     this.props.navigation.navigate('FollowBraggers')
     }
     else {
        alert('Please follow at least one team.');
     }
}


  componentDidMount()
  {

    mContext = this;
    const { navigation } = this.props;
    this.subs = [
    this.props.navigation.addListener('willFocus', () => mContext = this),
    ];
    var conference = navigation.getParam('item');
    this.setState({ is_onboarding: navigation.getParam('is_onboarding',0)});
     this.setState({conferenceItem:conference})
     this.getAllTeams(conference.conference_id);
  }

  static navigationOptions = ({navigation}) => {
  return {
  header: <CustomHeader this navigation={navigation} />
  };
  };

  render() {
    mContext = this;
    return (
      <View  >
          <MyStatusBar backgroundColor="rgba(0,0,0,0)" barStyle="light-content" />
          <Loader loading={this.state.loading} />
          <Animated.View style={{opacity: this.headerBg, zIndex: 1}}>
            <FlatList
                data={this.state.teamList}
                renderItem={({item, index}) =>

            <View style={AppStyles.Conference}>
                                                    <View>
                                                        <Image style={AppStyles.Conference_item_image} source={{uri:item.flag}} />
                                                    </View>
                                                   <Text style={AppStyles.Conference_item_text}>{item.common_name}</Text>
                                                   <View style={{ justifyContent:'flex-end', flex:1, flexDirection:'row',  alignItems:'center'}}>
                                                   <View style={{  backgroundColor:'#e6e6e6',borderRadius:10,  alignItems:'center'}}>
                                                        <TouchableOpacity onPress={()=> this.followTeams(index)}>
                                                        <Image  source={(item.is_follow_team==1)?Images.follow:Images.add} />
                                                        </TouchableOpacity>
                                                     </View>
                                                   </View>
                                                      </View>
            }

          />
          </Animated.View>

          </View>


    );
  }



  getAllTeams(conferenceID){
      this.setState({loading: true})
      const params = {
        sports_id: ConstantLib.SPORTS_ID,
        league_id: ConstantLib.LEAGUE_ID,
        conference_id:conferenceID,
        is_onboarding:this.state.is_onboarding
      };
       WSManager.postData(URLConstants.ALL_TEAMS_URL, params)
      .then(response => {
        this.setState({loading: false})
        var data = response.data.data.result;
        console.log("getAllTeams items=="+JSON.stringify(data));
        if(data.length>0){
           this.setState({teamList:data});
        }
        else{
          this.setState({teamList:[]});
        }
     //   alert(this.state.teamList.length);
      })
      .catch(error => {
        this.setState({loading: false})
        Toaster.showLongToast('getAllTeams:'+error.message);
        return error;
      });
    }


    followTeams(index){
      if(Utility.isLoggedIn())
{
        this.setState({loading: true})
        const params = {
          follower_id: this.state.teamList[index].team_league_id,
          type: 'team',
        };
    WSManager.postData(URLConstants.TOGGLE_FOLLOW_ENTITY, params)
    .then(response => {
      this.setState({loading: false})
        var updatedArr = [...this.state.teamList];
        updatedArr[index].is_follow_team = updatedArr[index].is_follow_team === 0 ? 1 : 0;
        this.setState({teamList: updatedArr});
       })
    .catch(error => {
      this.setState({loading: false})
      Toaster.showLongToast('getAllTeams:'+error.message);
      return error;
    });
}
 }

}

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
          <Text   style={AppStyles.header_title}>{navigation.getParam('item').conference_name}</Text>
          <Text   style={AppStyles.header_sub_title}>Stay Updated</Text>
</View>
<TouchableOpacity onPress={()=>mContext.doneClick()} style={{flex:2,alignItems:"flex-end"}} transparent>
<Text style={{color: '#fff', fontSize: 14,textAlign:'center', fontFamily:'SourceSansPro-Bold'}}>Done</Text>
</TouchableOpacity>
</View>
  </LinearGradient>
);
