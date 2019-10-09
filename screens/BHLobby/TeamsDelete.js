import React, { Component } from 'react';
import { Card, CardItem, Body, Button, Right, Left, Separator, H3, Container, Content, Tab, Tabs, TabHeading, Header, StyleProvider, Icon, Title, Subtitle } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { TouchableOpacity, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, ScrollView, ImageBackground, FlatList, Dimensions, Platform, ActivityIndicator, Animated, StatusBar } from 'react-native';
import { AppStyles, Images } from '../../Themes'
import LinearGradient from 'react-native-linear-gradient';
import Swipeout from 'react-native-swipeout';
import rows from '../../Themes/data';
import Loader from '../../Utils/Loader/';
import ConstantLib  from '../../Constants/ConstantLib/';
import * as URLConstants from '../../Networking/URLConstants/';
import WSManager from '../../Networking/WSManager/';
import {getItem,saveItem} from '../../lib/Session';
import PreferenceConstant from '../../Preferences/PreferenceConstant';
import PTRView from 'react-native-pull-to-refresh';
import { SafeAreaView, NavigationActions } from 'react-navigation';

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[AppStyles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

var mContext=null;
export default class Teams extends Component {
  constructor(props) {
    super(props);
    //this.ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => true });

    this.state = {
      teamList:[],
      sectionID: null,
      rowID: null,
      loading:false,
      userID:'',

    };
  }
  static navigationOptions = {
    header: null
  };

componentDidMount()
{
  mContext=this;
  getItem(PreferenceConstant.USER_ID).then((value) => {
 this.setState({userID:value});
 this.getAllTeams(value);
  })
}
_refresh () {
     return new Promise((resolve) => {
      setTimeout(()=>{
        mContext.getAllTeams(mContext.state.userID);
        resolve();
      }, 500)
    })
}



actionOnRow(item) {
  ConstantLib.DATA2 = item;
  const navigateAction = NavigationActions.navigate({
    routeName: 'TeamDetail',
    params: {},
    action: NavigationActions.navigate({ routeName: 'TeamDetail' })
  })
  const nav = WSManager.getTopLevelNavigator()
  nav.dispatch(navigateAction)

}



renderItem = (data) =>  {
  console.log('fgfg'+data)
  let swipeBtns = [{
    text: 'Unfollow',
    backgroundColor: 'red',
    underlayColor: 'rgba(0, 0, 0, 1, 0.6)',
     onPress: () => { this.followTeams(data.team_league_id) }
   }];

  return (
    <Swipeout right={swipeBtns}
      autoClose='true'
      backgroundColor='transparent'>
       <View style={AppStyles.Conference}>
      <TouchableOpacity style={[AppStyles.Conference, {borderBottomWidth: 0}]} onPress={() => this.actionOnRow(data)}>
         <View>
          <Image style={AppStyles.Conference_item_image}  source={(data.item.flag != null&&data.item.flag != 'null'&&data.item.flag != '') ? {uri:data.item.flag}: Images.default_user}/>
        </View>
        <Text style={AppStyles.Conference_item_text}>{data.item.team_name}</Text>
        </TouchableOpacity>

        <View style={{ justifyContent: 'flex-end', flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ backgroundColor: '#e6e6e6', borderRadius: 10, alignItems: 'center' }}>
          </View>
          </View>
      </View> 
    </Swipeout>
  )
}

render() {
  return (


    <View style={[AppStyles.darkContainer, { overflow: 'visible' }]}>
      <MyStatusBar backgroundColor="rgba(0,0,0,0)" barStyle="light-content" />
      <Loader loading={this.state.loading} />
    <PTRView  onRefresh={this._refresh}>
      {/* <ListView
        dataSource={this.ds.cloneWithRows(this.state.teamList)}
        renderRow={(data) => this.renderRow(data)}
        style={{ flex: 1 }}
      /> */}

<FlatList
          data={this.state.teamList}
          renderItem={this.renderItem}
          style={{ flex: 1 }}
         />

   </PTRView>
    </View>


  );
}





followTeams(id){
    this.setState({loading: true})
    const params = {
      follower_id: id,
      type: 'team',
    };
WSManager.postData(URLConstants.TOGGLE_FOLLOW_ENTITY, params)
.then(response => {
  this.setState({loading: false});
  this.getAllTeams(this.state.userID);
   })
.catch(error => {
  this.setState({loading: false})
  Toaster.showLongToast('getAllTeams:'+error.message);
  return error;
});
}




  getAllTeams(userId){
      this.setState({loading: true})
      const params = {

        user_id:userId,
      };
       WSManager.postData(URLConstants.GET_USER_FOLLOW_TEAMS, params)
      .then(response => {
        this.setState({loading: false})
        var data = response.data.data;
         console.log("getAllTeams items=="+data.length);
        if(data.length>0){
           this.setState({teamList:data});
        }
        else{
          this.setState({teamList:[]});
        }
      })
      .catch(error => {
        this.setState({loading: false})
        Toaster.showLongToast('getAllTeams:'+error.message);
        return error;
      });
    }

 


}
