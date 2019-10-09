import React, { Component } from 'react';
import {Card, CardItem, Body, Button, Right, Left, Separator, H3, Container, Content, Header, StyleProvider, Footer, FooterTab, Icon, ScrollableTab, Title, Subtitle} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {TouchableOpacity, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, ScrollView, ImageBackground, FlatList, Dimensions, Platform, ActivityIndicator, Animated, StatusBar} from 'react-native';
import { AppStyles, Images } from './../Themes'
import LinearGradient from 'react-native-linear-gradient';
import TabBrags from './TabBrags';
import TabRules from './TabRules';
import TabParticipants from './TabParticipants';

import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

const {width: SCREEN_WIDTH} = Dimensions.get("window");
const Head_HEIGHT = Platform.OS === "ios" ? 116 : 84;

const HEADER_HEIGHT = Platform.OS === "ios" ? 20 : 21;
const SCROLL_HEIGHT = Head_HEIGHT - HEADER_HEIGHT;
const THEME_COLOR = "rgba(85,186,255, 1)";
const FADED_THEME_COLOR = "rgba(85,186,255, 0.8)";
const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[AppStyles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);
export default class TabFix1 extends Component {
  nScroll = new Animated.Value(0);
  scroll = new Animated.Value(0);

  textColor = this.scroll.interpolate({
    inputRange: [1, SCROLL_HEIGHT / 5, SCROLL_HEIGHT],
    outputRange: [THEME_COLOR, FADED_THEME_COLOR, THEME_COLOR],
    extrapolate: "clamp"
  });
  tabBg = this.scroll.interpolate({
    inputRange: [1, SCROLL_HEIGHT],
    outputRange: ["#FFF", "#FFF"],
    extrapolate: "clamp"
  });
  tabY = this.nScroll.interpolate({
    inputRange: [0, SCROLL_HEIGHT, SCROLL_HEIGHT + 1],
    outputRange: [0, 0, 1]
  });
  tabFoo = this.nScroll.interpolate({
    inputRange: [30, 40, 45],
    outputRange: [0, 0, 1]
  });
  heights = [500, 500];
  state = {
    activeTab: 0,
    height: 500,
    index: 0,
    routes: [
      { key: 'first', title: 'Brags' },
      { key: 'third', title: 'Participants' }
    ],
  };

  constructor(props) {
    super(props);
    this.nScroll.addListener(Animated.event([{value: this.scroll}], {useNativeDriver: false}));
  }
  static navigationOptions = {
    header: null
  };
    _handleIndexChange = index => this.setState({ index });
    _renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={AppStyles.indicator}
      style={AppStyles.tabbar}
      tabStyle={AppStyles.tab}
      labelStyle={AppStyles.tabLabel}
    />
  );
   _renderScene = SceneMap({
    first: TabBrags,
    third: TabParticipants,
  });
render() {
    return (

      <KeyboardAvoidingView style={AppStyles.Wrapper} behavior='padding'>


        <View style={{flex:1}}>
        <MyStatusBar backgroundColor="rgba(0,0,0,0)" barStyle="light-content" />

            <LinearGradient
              colors={['#1B75BC', '#9AD8DD']}
              start={{x: 0.1, y: 0}} end={{x: 1.08, y: 1.17}}
              locations={[0.0, 1.0]}
              style={{
                paddingTop: Platform.OS === "ios" ? 20 : 40
              }}
              >
              <Header noShadow style={{paddingBottom: Platform.OS === "ios" ? 30 : 20}}>
                <Left>
                  <Button transparent onPress={() => this.props.navigation.navigate('Lobbydetail')}>
                    <Image source={Images.back}/>
                  </Button>
                </Left>
                <Body style={{flex:1}}>
                  <Title style={{alignItems: 'center', marginTop: Platform.OS === 'ios'? -15 :0}}><Text style={{fontSize:18, fontFamily:'SourceSansPro-Bold'}}>Chelsea </Text> <Text style={{color: '#F4F4F4', opacity: 0.6, fontSize:11, fontFamily:'SourceSansPro-Bold', marginLeft: 0, marginRight: 0 }}> VS </Text> <Text style={{fontSize:18, fontFamily:'SourceSansPro-Bold'}}> Everton</Text></Title>
                  <Title  style={{alignItems: 'center', marginTop: Platform.OS === 'android' ? -15 : 0, justifyContent: 'center', }}>
                    <Text style={{fontSize: 12, fontFamily:'SourceSansPro-Regular'}}>Week 2 </Text>
                    { Platform.OS === 'android' && <Text style={{color: 'rgba(255,255,255,0.6)', fontSize: 30, fontFamily:'SourceSansPro-Bold', paddingHorizontal: 8, marginTop: 0, position: 'relative' }}>.</Text>}
                    { Platform.OS === 'ios' && <View style={{width: 6}}></View>}
                    { Platform.OS === 'ios' && <View style={{width: 4, height: 4, backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: 50}}> </View>}
                    <Text style={{fontSize: 12,paddingBottom: 15, fontFamily:'SourceSansPro-Regular'}}> Apr 24, Sat - 12:00 AM</Text>
                  </Title>
                </Body>
              </Header>
            </LinearGradient>
            <TabView
              navigationState={this.state}
              renderScene={this._renderScene}
              renderTabBar={this._renderTabBar}
              onIndexChange={this._handleIndexChange}
              initialLayout={{
                width: Dimensions.get('window').width,
              }}
            />

        </View>

      </KeyboardAvoidingView>

    );
  }
}
