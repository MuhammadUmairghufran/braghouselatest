import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, Platform } from 'react-native';
import { Button, Form, Item, Input, Container, Content, StyleProvider, Icon, H3 } from 'native-base';
import AppStyles from '../../Themes/AppStyles';
import IMAGES from '../../Constants/Images/';
import * as String from '../../Constants/Strings/';
import WSManager from '../../Networking/WSManager/';
import Toaster from '../../Utils/Toaster';

import * as URLConstants from '../../Networking/URLConstants/';
import * as AppPreferences from '../../Preferences/AppPreferences/';
import PreferenceConstant, {UserCurrentBalancePreferenceConstant} from '../../Preferences/PreferenceConstant';
import Loader from '../../Utils/Loader/';
import ConstantLib from '../../Constants/ConstantLib/';
import LinearGradient from 'react-native-linear-gradient';
import Conference from '../Conference/Conference';
import SignUp from '../Signup/SignUp';
import Dashboard from '../Dashboard/';
import { StackActions, NavigationActions, Header } from 'react-navigation';
import { getItem, saveItem } from '../../lib/Session';
import Ripple from 'react-native-material-ripple';

import {DrawerActions} from 'react-navigation-drawer'


export default class JoinBragsByCode extends Component {



  constructor(props) {
    super(props);
    this.state = {

      code: '',
      loading: false,

    }
  }
  componentDidMount() {
      this.subs = [
        this.props.navigation.addListener('willFocus', () => {
          mContext = this;
        }),

      ];


  }


    static navigationOptions = ({ navigation }) => {
      return {
        header: <CustomHeader this navigation={navigation} />
      };
    };



  render() {
    return (

      <View style={AppStyles.Wrapper}>
        <Loader loading={this.state.loading} />

        <View style={[AppStyles.center, { paddingVertical: 50 }]}>
           <Text style={{ fontSize:30,color:'black',fontFamily:'SourceSansPro-Bold'}}>Enter Brag Code</Text>

        </View>
        <View style={{ paddingHorizontal: 28 }}>
          <Form>
            <Item regular>
              <Input   onChangeText={(text) => this.setState({ code: text })} placeholder='' />
            </Item>
            {this.state.code != ''?
            <LinearGradient
              start={{ x: 0, y: 0 }} end={{ x: 3.5, y: 0.2 }}
              locations={[0.0, 0.4]}
              colors={['#1B75BC', '#9AD8DD']}
              style={{
                borderRadius: 4,
                marginTop: 15
              }}
            >
              <Button block transparent large onPress={this.joinBragsByCode.bind(this)}><Text style={{ fontSize: 18, color: '#fff', fontFamily:'SourceSansPro-Regular' }}>Enter</Text></Button>
            </LinearGradient>
            :
            
            <LinearGradient
              start={{ x: 0, y: 0 }} end={{ x: 3.5, y: 0.2 }}
              locations={[0.0, 0.4]}
              colors={['#777777', '#CCCCCC']}
              style={{
                borderRadius: 4,
                marginTop: 15
              }}
            >
              <Button block transparent large disabled><Text style={{ fontSize: 18, color: '#fff', fontFamily:'SourceSansPro-Regular' }}>Enter</Text></Button>
            </LinearGradient>
            }
              <Text style={{textAlign:'center',marginTop:10}}>{String.recieved_text_}</Text>
          </Form>
        </View>
      </View>

    );
  }

  navigateToJoinBragScreen(contestId,contest_unique_id){
  //this.props.navigation.goBack(null);
    const navigateAction = NavigationActions.navigate({
    routeName: 'BHEntries',
    index:0,
    params: {'contest_id':contestId,'contest_unique_id':contest_unique_id},
   action: NavigationActions.navigate({ routeName: 'BHEntries' })
    })
   const nav = WSManager.getTopLevelNavigator()
    nav.dispatch(navigateAction)
  }

  joinBragsByCode = () => {

    if (this.validate()) {
      this.setState({ loading: true })
      const params = {
        join_code: this.state.code,
      };
      WSManager.postData(URLConstants.CHECK_ELIGIBILITY_FOR_CONTEST, params)
        .then(response => {
          console.log(response);
          this.setState({ loading: false })
          console.log("main data", response.data)
          console.log("sub data", response.data.data)
        this.navigateToJoinBragScreen(response.data.data.contest_id,response.data.data.contest_unique_id);
        })
        .catch(error => {

          console.log("error verify", JSON.stringify(error.response.data.error.join_code))


          this.setState({ loading: false })
          Platform.OS === "ios" ? setTimeout(() => {
            alert(JSON.stringify(error.response.data.error.join_code))
          }, 500) :Toaster.showLongToast(JSON.stringify(error.response.data.error.join_code));
          return error;
        });
    }
  }

  validate = () => {
    if (this.state.code.trim() === '') {
      Platform.OS === "ios" ? alert('Enter brag code') :Toaster.showLongToast('Enter brag code')
      return false;
    }

    return true;
  }

}

 var customStyles9 = StyleSheet.create({
  thumb: {
    width: 30,
    height: 30,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 1,
  }
});



const CustomHeader = ({navigation}) => (
  <LinearGradient
          start={{ x: 0.6, y: 0 }} end={{ x: 2.5, y: 1.5 }}
          locations={[0.0, 0.4]}
          colors={['#1B75BC', '#9AD8DD']}
          style={{ paddingTop: Platform.OS === "ios" ? 30 : 20 }}>

          <View style={{ flexDirection: 'row', padding: 15, paddingTop: Platform.OS === "ios" ? 10 : 20 }}>
            <TouchableOpacity onPress={() =>navigation.dispatch(DrawerActions.openDrawer())} style={{ flex: 1, justifyContent: 'center' }} transparent>
              <Image source={IMAGES.ic_drawer_menu} />
            </TouchableOpacity>
            <View style={{ flex: 1, alignItems: 'flex-end', paddingRight: 15 }}>
              <Text style={AppStyles.header_title}>Private Brag</Text>
            </View>
            <TouchableOpacity style={{ flex: 1, alignItems: "flex-end" }} transparent>
              <Text style={{ color: '#fff', fontSize: 16, textAlign: 'center' }}></Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>

  );
