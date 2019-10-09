import React, { Component } from 'react';
import { Card, CardItem, Body, Button, Right, Left, Separator, H3, Container, Header, Content, Tab, Tabs, TabHeading, Item, Label, Input, Title } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {
  TouchableOpacity, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, ScrollView, ImageBackground,
  FlatList, SectionList, SectionListScrollParams, Dimensions, Platform, ActivityIndicator,RefreshControl,Alert
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { AppStyles, Images } from '../../Themes'
// import LinearGradient from 'react-native-linear-gradient';
import WSManager from '../../Networking/WSManager';
import { getItem, saveItem } from '../../lib/Session';
import PreferenceConstant from '../../Preferences/PreferenceConstant'
import { convertToStringCapitalizedForm } from '../../Constants/Methods';
import Category from '../../Constants/Methods';
import { styles } from 'react-native-material-ripple/styles';
import Toaster from '../../Utils/Toaster';
import images from '../../Themes/Images';
import Comments from '../../screens/Lobby/Comments';
import * as URLConstants from '../../Networking/URLConstants/';
import Utility from '../../Utils/Utility/';
import Loader from '../../Utils/Loader/';
import IMAGES from '../../Constants/Images';
import * as String from '../../Constants/Strings/';
import ConstantLib from '../../Constants/ConstantLib/';

let screenWidth = Dimensions.get('screen').width

let mContext = null;
let mPrContext = null;

export default class OtherUserProfileBasicInfo extends Component {
  static imagePath = '';

  constructor(props) {
    super(props)
    this.state = {
      feedList: [],
      imagePath:'',
      currentPage:-1,
      canLoadMoreContent:false,
      userID:'',
     }
  }


   componentDidMount()
  {
        var mUID = ConstantLib.OTHER_USER_ID;
         this.setState({userID:mUID})

  }

  shouldComponentUpdate(){
    return true;
  }
  render() {
    mPrContext=this;
    return (
      <View style={{ backgroundColor: 'white', flex: 1, }}>

      <PersonalDetailListView/>
      </View>


    );
  }


}

class PersonalDetailListView extends Component
{

  constructor(props) {
    super(props);
    mContext=this;
    this.state = {
      userProfileData: '',
      Email: '',
      Gender: '',
      Dob: '',
      Ranking: '',
    }
    this.initProfileData()
  }

  static navigationOptions = {
    header: null
  };


  initProfileData() {
    this.getProfileApi();
  }

  getProfileApi() {
     var mUID = ConstantLib.OTHER_USER_ID;
     const params = {
      user_id: mUID
    };
     WSManager.postData(URLConstants.GET_USER_PROFILE, params)
      .then(response => {
        var data = response.data.data.user_profile;
        this.setState({ Email: data.email });
        this.setState({ Gender: data.gender });
        this.setState({ Dob: data.dob });
      })
      .catch(error => {
          return error;
      });
  }



  render()
  {
    mContext=this;
    return(



      <View style = {{marginBottom: 10, elevation: 5, backgroundColor: '#F4F4F4', shadowOffset: { width: 5, height: 5 },
      shadowColor: "#333333",
      shadowOpacity: 0.5,
      shadowRadius: 5, }}>
      <View>
        <View style={{ height: 45, backgroundColor: 'transparent', justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 15, marginRight: 15, justifyContent: "space-between", backgroundColor: 'transparent' }}>
            <View><Text style={{ textAlign: 'center', fontSize: 17, fontFamily:'SourceSansPro-Bold', color: "#4A4A4A", alignSelf: "flex-start" }} >Basic Info</Text></View>
            <View><Text style={{ textAlign: 'center', fontSize: 11, fontFamily:'SourceSansPro-Bold', color: "#666666" }} >  </Text></View>
          </View>
        </View>
        <View style={{ height: 1, width: AppStyles.screenWidth, backgroundColor: '#F3F3F3', alignItems: 'baseline', marginBottom: 0 }}></View>
      </View>

      <View>
        <View style={{ height: 50, backgroundColor: 'transparent', justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row', marginHorizontal: 15, justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ alignSelf: 'flex-start' }}>
              <Text style={{ fontSize: 14, color: '#666666' }}>Email</Text>
            </View>
            <View style={{ alignSelf: 'flex-end' }} >
              <Text style={{ fontSize: 14, fontFamily:'SourceSansPro-Bold', color: '#444444' }}>{ (this.state.Email != null && this.state.Email != 'null' && this.state.Email != '') ? this.state.Email : "" }</Text>

            </View>
          </View>
        </View>
        <View style={{ height: 1, backgroundColor: '#F3F3F3', alignItems: 'baseline', marginBottom: 0, marginHorizontal: 20 }}></View>
      </View>


      <View>
        <View style={{ height: 50, backgroundColor: 'transparent', justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row', marginHorizontal: 15, justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ alignSelf: 'flex-start' }}>
              <Text style={{ fontSize: 14, color: '#666666' }}>Gender</Text>
            </View>
            <View style={{ alignSelf: 'flex-end' }} >
              <Text style={{ fontSize: 14, fontFamily:'SourceSansPro-Bold', color: '#444444' }}>{this.state.Gender != null && this.state.Gender != 'null' && this.state.Gender != '' ? convertToStringCapitalizedForm(this.state.Gender) : ''}</Text>
            </View>
          </View>
        </View>
        <View style={{ height: 1, backgroundColor: '#F3F3F3', alignItems: 'baseline', marginBottom: 0, marginHorizontal: 20 }}></View>
      </View>

      <View>
        <View style={{ height: 50, backgroundColor: 'transparent', justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row', marginHorizontal: 15, justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ alignSelf: 'flex-start' }}>
              <Text style={{ fontSize: 14, color: '#666666' }}>Date of Birth</Text>
            </View>
            <View style={{ alignSelf: 'flex-end' }} >
              <Text style={{ fontSize: 14, fontFamily:'SourceSansPro-Bold', color: '#444444' }}>{this.state.Dob != null && this.state.Dob != 'null' && this.state.Dob != '' ? this.state.Dob : ''}</Text>
            </View>
          </View>
        </View>
        <View style={{ height: 1, backgroundColor: '#F3F3F3', alignItems: 'baseline', marginBottom: 0, marginHorizontal: 20 }}></View>
      </View>

      <View>
        <View style={{ height: 50, backgroundColor: 'transparent', justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row', marginHorizontal: 15, justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ alignSelf: 'flex-start' }}>
              <Text style={{ fontSize: 14, color: '#666666' }}>Ranking</Text>
            </View>
            <View style={{ alignSelf: 'flex-end' }} >
              <Text style={{ fontSize: 14, fontFamily:'SourceSansPro-Bold', color: '#444444' }}>#1</Text>
            </View>
          </View>
        </View>
        <View style={{ height: 1, backgroundColor: '#F3F3F3', alignItems: 'baseline', marginBottom: 0, marginHorizontal: 20 }}></View>
      </View>
      </View>



    );
  }
}
