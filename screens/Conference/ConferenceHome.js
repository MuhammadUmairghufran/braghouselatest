import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, StatusBar, Animated, Platform, FlatList, TouchableWithoutFeedback }
  from 'react-native';
import { Button, Form, Item, Input, Container, Content, StyleProvider, Icon, H3, Header, Left, Right }
  from 'native-base';
import {AppStyles, Images} from '../../Themes/';
import Loader from '../../Utils/Loader/';
import * as URLConstants from '../../Networking/URLConstants/';
import WSManager from '../../Networking/WSManager/';
import LinearGradient from 'react-native-linear-gradient';
import Modal from "react-native-modal";
import ConstantLib  from '../../Constants/ConstantLib/';
import ConferenceTeamHome from './ConferenceTeamHome';
import {getItem,saveItem} from '../../lib/Session';
import PreferenceConstant from '../../Preferences/PreferenceConstant'
import {DrawerActions} from 'react-navigation-drawer'
import IMAGES  from '../../Constants/Images/';

let mContext=null;
const refresh=false;

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[AppStyles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);
const CustomHeader = ({ navigation }) => (
  <LinearGradient
    start={{ x: 0.6, y: 0 }} end={{ x: 2.5, y: 1.5 }}
    locations={[0.0, 0.4]}
    colors={['#1B75BC', '#9AD8DD']}
    style={{ paddingTop: Platform.OS === "ios" ? 30 : 20 }}
  >

    <View style={{ flexDirection: 'row', padding: 15 ,justifyContent:'center'}}>
    <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={{  justifyContent:'center' }} transparent>
      <Image source={IMAGES.ic_drawer_menu}/>
    </TouchableOpacity>

      <View style={{  justifyContent: 'center', paddingRight: 15, flex:1 }}>
        <Text style={AppStyles.header_title}>Conference</Text>
      </View>

    </View>
  </LinearGradient>
);
export default class ConferenceHome extends Component {

componentDidMount()
{

  getItem(PreferenceConstant.SESSION_KEY).then((value)=>{
    ConstantLib.SESSION_KEY=value;
  });
  this.subs = [
  this.props.navigation.addListener('willFocus', ()=>{
  mContext = this;
  this.getAllConferences();

  }),
  ];

  this.getAllConferences();
}
  static navigationOptions = ({ navigation }) => {
    return {
      header: <CustomHeader this navigation={navigation} />
    };
  };
  constructor(props) {
      super(props);
      this.state = {
        loading:false,
        refreshing: false,
        conferenceList:[],
        selectedTeam:'',
       }
  }

  doneClick() {
    let isFollowed=false;
    for (let i = 0; i < this.state.conferenceList.length; i++)
     {
      if(this.state.conferenceList[i].follow_team_cnt>0)
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


  actionOnRow(item) {

    ConstantLib.DATA=item;
    this.props.navigation.navigate('ConferenceTeamHome',{'item':item })

   }

  render() {

     mContext = this;
     return (
      <View >
        <MyStatusBar backgroundColor="rgba(0,0,0,0)" barStyle="light-content" />
        <Loader loading={this.state.loading} />
        <Animated.View style={{ opacity: this.headerBg, zIndex: 1 }}>

          <FlatList

            data={this.state.conferenceList}
            renderItem={({ item }) =>
              <TouchableOpacity onPress={() => this.actionOnRow(item)}>

                <View style={AppStyles.Conference}>

                  <View>
                    <Image style={AppStyles.Conference_item_image} source={{uri:item.conference_image}} />
                  </View>

                  <Text style={AppStyles.Conference_item_text}>{item.conference_name}</Text>

                  <View style={{ justifyContent: 'flex-end', flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ backgroundColor: '#CCCCCC', borderRadius: 10, alignItems: 'center', marginRight: 5}}>
                      <Text style={AppStyles.Conference_item_text_right}>{item.follow_team_cnt>0?'+'+item.follow_team_cnt:'0'} </Text>
                    </View>

                    <Image source={Images.radio} />
                  </View>



                </View>
              </TouchableOpacity>

            }
          />
        </Animated.View>
      </View>

    );
  }


  getAllConferences(){
      const params = {};
      this.setState({loading: true})
      WSManager.postData(URLConstants.ALL_CONFERENCE_URL, params)
      .then(response => {
        var data = response.data.data;
         this.setState({conferenceList:data});
        this.setState({loading: false})
      })
      .catch(error => {
        this.setState({loading: false})
        Toaster.showLongToast('getAllConferences:'+error.message);
        return error;
      });
    }









}
