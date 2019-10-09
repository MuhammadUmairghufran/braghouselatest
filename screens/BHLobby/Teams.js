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
import { SafeAreaView, NavigationActions } from 'react-navigation';

let mContext = null;
const MyStatusBar = ({backgroundColor, ...props}) => (
<View style={[AppStyles.statusBar, { backgroundColor }]}>
  <StatusBar translucent backgroundColor={backgroundColor} {...props} />
</View>
);



export default class Teams extends Component {

  constructor(props) {
      super(props);
      this.state = {
        loading:false,
        refreshing: false,
        teamList:[],
        selectedTeam:'',
        conferenceItem:'',
        headerTitle:'',
       }
  }

  goBack(){
     this.navigation.navigate('Conference' ,{'is_reload':true })
  }



  componentDidMount()
  {

    mContext = this;
    if(ConstantLib.DATA===null)
    {
      this.getAllTeams('2');
    }
  else {
      this.getAllTeams(ConstantLib.DATA.conference_id);
  }
  }

  static navigationOptions = ({navigation}) => {
  return {
  header: <CustomHeader this navigation={navigation} />
  };
  };

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

  render() {
    mContext = this;
    return (
      <View  style={[AppStyles.Wrapper, {backgroundColor:'#fff'}]}>
          <MyStatusBar backgroundColor="rgba(0,0,0,0)" barStyle="light-content" />
          <Loader loading={this.state.loading} />
          <Animated.View style={{opacity: this.headerBg, zIndex: 1}}>
            <FlatList
                data={this.state.teamList}
                renderItem={({item, index}) =>
    <TouchableOpacity onPress={() => this.actionOnRow(item)}>
            <View style={AppStyles.Conference}>
                                                    <View>
                                                        <Image style={AppStyles.Conference_item_image} source={{uri:item.flag}} resizeMode = 'contain' />
                                                    </View>
                                                   <Text style={AppStyles.Conference_item_text}>{item.team_name}</Text>
                                                   <View style={{ justifyContent:'flex-end', flex:1, flexDirection:'row',  alignItems:'center'}}>

                                                   </View>

                                                      </View>
                                                      </TouchableOpacity>

            }

          />
          </Animated.View>

          </View>

    );
  }

  getAllTeams(conferenceID){
      this.setState({loading: false})
      const params = {
        sports_id: ConstantLib.SPORTS_ID,
        league_id: ConstantLib.LEAGUE_ID,
        conference_id:conferenceID,
      };
       WSManager.postData(URLConstants.ALL_TEAMS_URL, params)
      .then(response => {
        this.setState({loading: false})
        var data = response.data.data.result;
         console.log("getAllTeams >>>>>>>>>>>>>>>>>=="+JSON.stringify(response.data.data));
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

const CustomHeader = ({navigation}) => (
  <LinearGradient
        start={{x: 0.6, y: 0}} end={{x: 2.5, y: 1.5}}
        locations={[0.0, 0.4]}
        colors={['#1B75BC', '#9AD8DD']}
        style={{paddingTop: Platform.OS === "ios" ? 10 : 20}}
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
<Text style={{color: '#fff', fontSize: 16, fontFamily:'SourceSansPro-Bold', textAlign:'center'}}>Done</Text>
</TouchableOpacity>
</View>
  </LinearGradient>
);
