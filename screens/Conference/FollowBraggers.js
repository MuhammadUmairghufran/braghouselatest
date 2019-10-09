import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Dimensions, TouchableOpacity, Image,StatusBar,Animated,Platform ,FlatList,ImageBackground}
 from 'react-native';
import { Button, Form, Item, Input, Container, Content, StyleProvider, Icon, H3 ,Header,Left, Right}
from 'native-base';
import {AppStyles, Images} from '../../Themes/';

import LinearGradient from 'react-native-linear-gradient';
import Modal from "react-native-modal";
import ConstantLib  from '../../Constants/ConstantLib/';
import {getItem,saveItem} from '../../lib/Session';
import PreferenceConstant from '../../Preferences/PreferenceConstant';
import * as URLConstants from '../../Networking/URLConstants/';
import WSManager from '../../Networking/WSManager/';
import Loader from '../../Utils/Loader/';
import Dashboard from '../Dashboard/';
import {StackActions, NavigationActions} from 'react-navigation';
let mContext=null;

const MyStatusBar = ({backgroundColor, ...props}) => (
<View style={[AppStyles.statusBar, { backgroundColor }]}>
  <StatusBar translucent backgroundColor={backgroundColor} {...props} />
</View>
);

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
<View style={{flex:10,justifyContent:'center'}}>
          <Text   style={  {fontSize:14, color:'#fff',textAlign:'center', fontFamily:'SourceSansPro-Bold'}}>Braggers you can follow </Text>
</View>
<TouchableOpacity onPress={()=> mContext.goToDashboard()} style={{flex:2,alignItems:"flex-end"}} transparent>
<Text style={{color: '#fff', fontSize: 14,textAlign:'center', fontFamily:'SourceSansPro-Bold'}}>Done</Text>
</TouchableOpacity>
</View>
  </LinearGradient>
);
export default class FollowBraggers extends Component {

  static navigationOptions = ({navigation}) => {
  return {
  header: <CustomHeader this navigation={navigation} />
  };
  };
  constructor(props) {
      super(props);
      this.state = {
        loading:false,
        refreshing: false,
        userList:[],
        selectedUsers:'',
        teamItem:'',
        offset:0,
       }
  }

    componentDidMount()
    {
      this.getUserList();
      mContext = this;
     }
  goToDashboard()
  {

    saveItem(PreferenceConstant.FOLLOW_STATUS, '1');
    getItem(PreferenceConstant.FOLLOW_STATUS).then((value)=>{
        ConstantLib.FOLLOW_STATUS=value;
        console.log('get value from pref.?>>>>>>>>>>>>>>>>>>>='+value);
    })
    const resetAction = StackActions.reset({
                   index: 0,
                   key:null,
                   actions: [
                   NavigationActions.navigate({ routeName: 'Drawer'}),
                   ]
                   });
                   this.props.navigation.dispatch(resetAction);
  }

  render() {

    return (
      <View  >
          <MyStatusBar backgroundColor="rgba(0,0,0,0)" barStyle="light-content" />
          <Loader loading={this.state.loading} />

          <Animated.View style={{opacity: this.headerBg, zIndex: 1}}>


            <FlatList
            canLoadMore={this.state.canLoadMoreContent}
            onEndReached={this._loadMoreContentAsync}
            onEndThreshold={this.state.userList.length-5}
            data={this.state.userList}
            renderItem={({item,index}) => <View style={AppStyles.Conference}>
                                    <View>
                                    <Image style={AppStyles.Conference_item_image}
                                     source={item.image==='' || item.image===null?Images.default_user:{uri:item.image}} />
                                    </View>
                                    <Text style={AppStyles.Conference_item_text}>{item.first_name+" "+item.last_name}</Text>
                                    <View style={{ justifyContent:'flex-end', flex:1, flexDirection:'row',  alignItems:'center'}}>
                                    <View style={{  backgroundColor:'#e6e6e6',borderRadius:10,  alignItems:'center'}}>
  </View>
  <TouchableOpacity onPress={()=> this.followUsers(index)}>
  <Image  source={(item.follow_status==='1')?Images.follow:Images.add} />
  </TouchableOpacity>

                                                     </View>
                                                   </View>}
          />
          </Animated.View>
           </View>

    );
  }


  getUserList(){
    let mOffset=this.state.offset+1;
      this.setState({loading: true})
      const params = {
        offset:mOffset,
        limit:20,
            };

       WSManager.postData(URLConstants.GET_TOP_USERS, params)
      .then(response => {

        var data = response.data.data.user_list;


        this.setState({loading: false})
         var playerAL = data;


        this.setState({userList:[...this.state.userList, ...playerAL]});

         if(data.length>0){
           this.setState({userList:data});
        }
        else{
          this.setState({userList:[]});
        }
     //   alert(this.state.userList.length);
      })
      .catch(error => {
        this.setState({loading: false})
        Toaster.showLongToast('getAllTeams:'+error.message);
        return error;
      });
    }


    followUsers(index){
        this.setState({loading: true})
        const params = {
          follower_id: this.state.userList[index].user_id,
          type: 'user',
        };


    WSManager.postData(URLConstants.TOGGLE_FOLLOW_ENTITY, params)
    .then(response => {
      this.setState({loading: false})

        var updatedArr = [...this.state.userList];
        updatedArr[index].follow_status = updatedArr[index].follow_status === '0' ? '1' : '0';
        this.setState({userList: updatedArr});
        })
    .catch(error => {
      this.setState({loading: false})
      Toaster.showLongToast('getAllTeams:'+error.message);
      return error;
    });
}



}
