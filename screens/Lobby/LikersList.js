import React, {Component} from 'react';
import { View, Text,Image,ImageBackground,TouchableOpacity, Platform, FlatList,RefreshControl,StatusBar} from 'react-native';
import {List} from 'native-base';
import Ripple from 'react-native-material-ripple';

import {DrawerActions} from 'react-navigation-drawer'
import IMAGES  from '../../Constants/Images/';
import * as String  from '../../Constants/Strings/';
import * as Color  from '../../Themes/Colors/';
import AppStyles from '../../Themes/AppStyles';
import Utility from '../../Utils/Utility/';
import Toaster from '../../Utils/Toaster/';
import WSManager from '../../Networking/WSManager/';
import { Container, Header, Content, Label,Input,ActionSheet} from 'native-base';
import * as URLConstants from '../../Networking/URLConstants/';
import ConstantLib from '../../Constants/ConstantLib';
import Loader from '../../Utils/Loader/';
import LinearGradient from 'react-native-linear-gradient';
import CommentsStyle from './CommentsStyle';

export default class LikersList extends Component{

  constructor(props){
    super(props)
    this.state={
      loading:false,
      refreshing: false,
      LikersList:[{'name':'Rahul','added_date':'2017-08-25 14:30:00'},
    {'name':'Vijay','added_date':'2017-08-25 14:30:00'},
  {'name':'Amit','added_date':'2017-08-25 14:30:00'},
{'name':'Kapil','added_date':'2017-08-25 14:30:00'}],
    }
  }

  static navigationOptions = ({navigation}) => {
    return {
      header: <CustomHeader this navigation={navigation} />
    };
  };

  render () {
    mContext = this;
    return (
      <ImageBackground source={IMAGES.mainBg} style={CommentsStyle.main_image_container}>
          <StatusBar
            translucent
            backgroundColor={'transparent'}  />
            <View style={CommentsStyle.ListViewContainer}>
                <Loader loading={this.state.loading} />

                {(this.state.LikersList.length>0)?
                      <FlatList
                        keyExtractor={this._keyExtractor}
                        data={this.state.LikersList}
                        renderItem={this.renderItem.bind(this)}
                      />
                :
                    <View style={CommentsStyle.NoRecordContainer}>
                         <Label style={CommentsStyle.white_text_14}>No record to display</Label>
                    </View>
                }
            </View>
        </ImageBackground>
    );
  }

  renderItem(data) {
    let { item, index } = data;
    return (
      <View style = {CommentsStyle.notification_container}>
           <Image style={CommentsStyle.NotificationLogo} source={IMAGES.avatar1}/>
           <View style={CommentsStyle.NotificationMessageContainer}>
              <Text style={CommentsStyle.gray_text_left_align}>{item.name}</Text>
              <Text style={CommentsStyle.team_name_text_left_align}>{item.comment}</Text>
              <Text style={CommentsStyle.team_name_text_left_align}>{Utility.getFormatedDate(item.added_date,'ddd, MMM Do - hh:mm A')}</Text>
           </View>
      </View>
    )
  }
}

// Header
const CustomHeader = ({ navigation }) => (
  <LinearGradient
    start={{ x: 0.6, y: 0 }} end={{ x: 2.5, y: 1.5 }}
    locations={[0.0, 0.4]}
    colors={['#1B75BC', '#9AD8DD']}
    style={{ paddingTop: Platform.OS === "ios" ? 10 : 20 }}>

    <View style={{ flexDirection: 'row', padding: 15,  }}>
      <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={{  justifyContent:'center' }} transparent>
        <Image source={IMAGES.ic_drawer_menu}/>
      </TouchableOpacity>
      <View style={{ flex:1, alignSelf:'center', alignItems: 'center', paddingRight: 15 }}>
        <Text style={AppStyles.header_title}>Likes</Text>
      </View>

    </View>
  </LinearGradient>
);
