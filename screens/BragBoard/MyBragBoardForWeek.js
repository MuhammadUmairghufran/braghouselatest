import React, { Component } from 'react';
import {StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, Image, Platform, TouchableOpacity,SafeAreaView,FlatList,RefreshControl,StatusBar} from 'react-native';
import {Label, Separator} from 'native-base';
import AppStyles from '../../Themes/AppStyles';
import LinearGradient from 'react-native-linear-gradient';
import IMAGES  from '../../Constants/Images/';
import Loader from '../../Utils/Loader/';
import MyBragBoardStyle from './MyBragBoardStyle';
import Utility from '../../Utils/Utility/';
import * as URLConstants from '../../Networking/URLConstants/';
import WSManager from '../../Networking/WSManager/';
import { NavigationActions } from 'react-navigation';
import {DrawerActions} from 'react-navigation-drawer'

//var bragBoardList = ['a','b','c','a','b','c','a','b','c','a','b','c','a','b','c','a','b','c','a','b','c','a','b','c','a','b','c'];

  export default class MyBragBoardForWeek extends Component{
    constructor(props) {
        super(props);
        this.state = {
          isLoading:false,
          bragBoardList: [],
          refreshing: false,
        }
    }

    static navigationOptions = ({navigation}) => {
        return {
        header: null
        };
        };


    render()
    {
      return (
  <View style={{flex:1,backgroundColor:'#fff'}}>
          <StatusBar
                    translucent
                    backgroundColor={'transparent'}  />
           <Loader loading={this.state.isLoading} />
           {(this.state.bragBoardList.length>0)?
               <FlatList
                 keyExtractor={this._keyExtractor}
                 data={this.state.bragBoardList}
                 renderItem={this.renderItem.bind(this)}
                refreshControl={
                   <RefreshControl
                     refreshing={this.state.refreshing}
                     onRefresh={this._onRefresh.bind(this)}
                   />
                 }


               />

         :
             <View style={MyBragBoardStyle.NoRecordContainer}>
                  <Label style={MyBragBoardStyle.white_text_14}>No record to display</Label>
             </View>
         }
        </View>
      );
    }

    renderItem(data) {
    let { item, index } = data;

    return (
      <View>
      <TouchableOpacity onPress={() => this.moveToOthersProfile(item.user_id)} style = {MyBragBoardStyle.notification_container}>
           <Text style={MyBragBoardStyle.rank_text_color}>{item.position}</Text>
           <Image style={MyBragBoardStyle.ProfileLogo}
           source={(item.user_image !=='') ? { uri: item.user_image }:IMAGES.default_user }/>
           <Text numberOfLines={2} ellipsizeMode ={'tail'} style={MyBragBoardStyle.gray_text_left_align}>{item.first_name+' '+item.last_name}</Text>
           <View style={MyBragBoardStyle.score_container}>
           <Text style={MyBragBoardStyle.team_name_text_left_align}>BB {item.total_wins}</Text>
           </View>

      </TouchableOpacity>
      <Separator style = {{height:1, marginLeft:50}}></Separator>
      </View>

    )
  }

componentDidMount()
{
  this.callBraggersApi();
}
      callBraggersApi() {
        this.setState({ isLoading: true })
        const params = {

        };

        WSManager.postData(URLConstants.GET_WEEKLY_LEADERBOARD, params)
          .then(response => {
            this.setState({ isLoading: false })
            var data = response.data.data;
            this.setState({ bragBoardList: data.leaderboard })
            console.log(data)
             //console.log('TopBraggersApi Success = ' + JSON.stringify(data));
          })
          .catch(error => {
            this.setState({ isLoading: false })
            console.log('Error = ' + JSON.stringify(error.response.data));
            return error;
          });
      }


  _onRefresh() {
         this.callBraggersApi();
      }

        moveToOthersProfile(user_id) {
           const navigateAction = NavigationActions.navigate({
            routeName: 'OtherProfileScreen',
            params: { 'user_id': user_id },
            action: NavigationActions.navigate({ routeName: 'OtherProfileScreen' })
          })
          const nav = WSManager.getTopLevelNavigator()
          nav.dispatch(navigateAction)

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

    <View style={{flex:8,justifyContent:'flex-start'}}>
              <Text   style={AppStyles.header_title}>Bragboard</Text>
    </View>

    </View>
      </LinearGradient>
    );
