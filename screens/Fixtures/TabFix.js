import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Dimensions, TouchableOpacity, Image,StatusBar,Animated,Platform ,FlatList,ImageBackground}
 from 'react-native';
import { Button, Form, Item, Input, Container, Content, StyleProvider, Icon, H3 ,Header,Left, Right, Tab, Tabs}
from 'native-base';
import {AppStyles, Images} from '../../Themes/';
import LinearGradient from 'react-native-linear-gradient';
import Modal from "react-native-modal";
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import TabFixtures from '../Fixtures/TabFixtures';
import ConferenceTeam from '../Conference/ConferenceTeam';

import { createMaterialTopTabNavigator as TabNavigator} from 'react-navigation-tabs'
const MyStatusBar = ({backgroundColor, ...props}) => (
<View style={[AppStyles.statusBar, { backgroundColor }]}>
  <StatusBar translucent backgroundColor={backgroundColor} {...props} />
</View>
);
export const CustomTab = TabNavigator({
  Fixtures: {
    screen: TabFixtures,
  },
  NEWS: {
    screen: ConferenceTeam,
  },

},{
tabBarOptions : {
  activeTintColor: '#ffffff',
  style: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#DBDBDB',
  },
  indicatorStyle:{
    backgroundColor: '#ffffff',

  }
}});
const CustomHeader = ({navigation}) => (
  <LinearGradient
        start={{x: 0.6, y: 0}} end={{x: 2.5, y: 1.5}}
        locations={[0.0, 0.4]}
        colors={['#1B75BC', '#9AD8DD']}
        style={{paddingTop: Platform.OS === "ios" ? 30 : 20}}
        >

  </LinearGradient>
);

export default class TabFix extends Component {
  async componentDidMount() {
    setTimeout(()=>{
      this.setState({activePage:0})
    },0)
  }
  static navigationOptions = ({navigation}) => {
  return {
  header: <CustomHeader this navigation={navigation} />
  };
  };
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'First' },
      { key: 'second', title: 'Second' },
    ],
  };

  static router = CustomTab.router
  render() {

    return (

      <View style={{flex:1}} >
      <MyStatusBar backgroundColor="rgba(0,0,0,0)" barStyle="light-content"  />
      <ImageBackground
        source={Images.bglobby}
        style={{width: '100%', height: '100%'}}
      >

       <View >

<View style={{flexDirection:'row',alignItems: 'center',paddingTop: 10}}>
<Image    source={Images.back}/>
 <Text   style={{flex:1,fontSize:16,color:'#fff',fontFamily:'SourceSansPro-Bold',textAlign:'right',padding:10}}>FOLLOW</Text>
</View>
<View style={{alignItems:'center' ,paddingTop: 10, paddingBottom: 10}}>

        <Image  source={Images.logoteam}/>


        <H3 style={{marginTop: 14, fontSize: 22, color:'#FFFFFF', fontFamily:'SourceSansPro-Bold'}}>Alabama Crimson Tide</H3>
        <View style={{flexDirection: 'row', justifyContent: 'center', alignSelf: 'center'}}>
          <Text style={{color: '#FFFFFF', fontSize: 14, fontFamily:'SourceSansPro-Bold'}}>SEC</Text>
          <Text style={{color: '#FFFFFF', fontSize: 30, fontFamily:'SourceSansPro-Bold', opacity: 0.6, paddingHorizontal: 8, marginTop: -18}}>.</Text>
          <Text style={{color: '#FFFFFF', fontSize: 14, fontFamily:'SourceSansPro-Bold'}}>200 Followers</Text>
        </View>
      </View>
      </View>
<CustomTab navigation = {this.props.navigation}/>

</ImageBackground>
      </View>
    );
  }
}
