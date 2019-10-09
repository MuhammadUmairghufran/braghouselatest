import React, { Component } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, Image, Platform, TouchableOpacity, SafeAreaView, FlatList, RefreshControl, StatusBar, ImageBackground } from 'react-native';
import { Label } from 'native-base';
import { AppStyles, Images } from '../../Themes/';
import LinearGradient from 'react-native-linear-gradient';
import { TabBarTop } from 'react-navigation';
import {DrawerActions} from 'react-navigation-drawer'
import IMAGES from '../../Constants/Images';
import WSManager from '../../Networking/WSManager/';
import * as String from '../../Constants/Strings';


export default class BragBoardParent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      //  bragBoardList: [],
      canLoadMoreContent: false,
      currentPage: 1,
      refreshing: false,
    }
  }

  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  render() {
    return (
      <View style={AppStyles.Wrapper}>
        <StatusBar
          translucent
          backgroundColor={'transparent'} />
        <LinearGradient
          start={{ x: 0.6, y: 0 }} end={{ x: 2.5, y: 1.5 }}
          locations={[0.0, 0.4]}
          colors={['#1B75BC', '#9AD8DD']}
          style={{ paddingTop: Platform.OS === "ios" ? 30 : 20 }}>

          <View style={{ flexDirection: 'row', paddingBottom: 15, marginLeft:10, paddingTop: Platform.OS === "ios" ? 20 : 20 }}>
            <TouchableOpacity onPress={() => WSManager.getTopLevelNavigator().dispatch(DrawerActions.openDrawer())} style={{ padding: 5, justifyContent: 'center' }} transparent>
              <Image source={IMAGES.ic_drawer_menu} />
            </TouchableOpacity>
            <View style={{ flex: 1, paddingRight: 15 }}>
              <Text style={AppStyles.header_title}>Bragboard</Text>
            </View>

          </View>


        </LinearGradient>

        <View style={{ flex: 1, paddingRight: 15,justifyContent:'center', }}>
          <Text style={{fontSize:18,color:'black',textAlign:'center'}}>{String.non_login_text_}</Text>
        </View>

      </View>
    );
  }


}


const CustomHeader = ({ navigation }) => (
  <ImageBackground
    source={Images.gredient_bg}
    style={{ paddingTop: Platform.OS === "ios" ? 30 : 40, width: '100%', height: '100%' }}>
    <View style={{ flex: 0, justifyContent: 'flex-start', flexDirection: 'row' }}>
      <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())} style={{ justifyContent: 'center', margin: 5 }} transparent>
        <Image style={{ marginLeft: 20 }} source={IMAGES.ic_drawer_menu} />
      </TouchableOpacity>
      <Text style={[AppStyles.header_title, { flex: 1, alignSelf: 'center', marginLeft: -20 }]}>Bragboard</Text>
    </View>

  </ImageBackground>
);
