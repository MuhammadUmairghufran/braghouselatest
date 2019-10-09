import React, { Component } from 'react';
import {Card, CardItem, Body, Button, Right, Left, Separator, H3, Container, Content, Header, StyleProvider, Footer, FooterTab, Icon, ScrollableTab, Title, Subtitle} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {TouchableOpacity, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, ScrollView, ImageBackground, FlatList, Dimensions, Platform, ActivityIndicator, Animated, StatusBar} from 'react-native';
import { AppStyles, Images } from './../Themes'
import LinearGradient from 'react-native-linear-gradient';
import TabFixtures from './TabFixtures';
import TabPlayers from './TabPlayers';

import { TabView, TabBar, SceneMap } from 'react-native-tab-view';

const {width: SCREEN_WIDTH} = Dimensions.get("window");
const IMAGE_HEIGHT = 260;
const HEADER_HEIGHT = Platform.OS === "ios" ? 20 : 21;
const SCROLL_HEIGHT = IMAGE_HEIGHT - HEADER_HEIGHT;
const THEME_COLOR = "rgba(85,186,255,1)";
const FADED_THEME_COLOR = "rgba(85,186,255,1)";
  const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[AppStyles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);
export default class TabFix extends Component {
  nScroll = new Animated.Value(0);
  scroll = new Animated.Value(0);
  headerBg = this.scroll.interpolate({
    inputRange: [10, SCROLL_HEIGHT - 10 ],
    outputRange: [1, 0]
  })
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
    inputRange: [0, 1, 2],
    outputRange: [0, 0, 1],
  });
  tabAnim = () => {
    alert(0);
  }
  heights = [500, 500];
  state = {
    activeTab: 0,
    height: 500,
    index: 0,
    routes: [
      { key: 'first', title: 'Fixtures' },
      { key: 'second', title: 'Players' }
    ]
  };
   _handleIndexChange = index => this.setState({ index });
    _renderTabBar = props => (
      <Animated.View style={{transform: [{translateY: this.tabY}], zIndex: 1, width: "100%"}}>
    <TabBar
      {...props}
      indicatorStyle={AppStyles.indicator}
      style={AppStyles.tabbar}
      tabStyle={AppStyles.tab}
      labelStyle={AppStyles.tabLabel}
    />
    </Animated.View>
  );

   _renderScene = SceneMap({
    first: TabFixtures,
    second: TabPlayers,
  });
  constructor(props) {
    super(props);
    this.nScroll.addListener(Animated.event([{value: this.scroll}], {useNativeDriver: false}));
  }
  static navigationOptions = {
    header: null
  };

  render() {
    return (

      <View style={{flex:1}}>
          <MyStatusBar backgroundColor="rgba(0,0,0,0)" barStyle="light-content" />

          <Animated.ScrollView
          scrollEventThrottle={5}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event([{nativeEvent: {contentOffset: {y: this.nScroll}}}], {useNativeDriver: true})}
          style={{zIndex: 0, marginBottom: 0}}>
            <Animated.View style={{opacity: this.headerBg, zIndex: 1}}>

              <LinearGradient
                    start={{x: 0.6, y: 0}} end={{x: 2.5, y: 1.5}}
                    locations={[0.0, 0.4]}
                    colors={['#1B75BC', '#9AD8DD']}
                    style={{paddingTop: Platform.OS === "ios" ? 30 : 20}}
                    >
                    <Header noShadow>
                      <Left>
                        <Button transparent onPress={() => this.props.navigation.navigate('TabFix')}>
                          <Image source={Images.back}/>
                        </Button>
                      </Left>
                      <Right>
                        <Button transparent>
                          <Text style={{color: '#fff', fontSize: 14, fontFamily:'SourceSansPro-Bold'}}>FOLLOW</Text>
                        </Button>
                      </Right>
                    </Header>
                    <View style={{alignItems: 'center', paddingTop: 20, paddingBottom: 20}}>
                      <Image source={Images.logoteam}/>
                      <H3 style={{marginTop: 14, fontSize: 22, color:'#FFFFFF', fontFamily:'SourceSansPro-Bold'}}>Alabama Crimson Tide</H3>
                      <View style={{flexDirection: 'row', justifyContent: 'center', alignSelf: 'center'}}>
                        <Text style={{color: '#FFFFFF', fontSize: 14, fontFamily:'SourceSansPro-Bold'}}>SEC</Text>
                        <Text style={{color: '#FFFFFF', fontSize: 30, fontFamily:'SourceSansPro-Bold', opacity: 0.6, paddingHorizontal: 8, marginTop: -18}}>.</Text>
                        <Text style={{color: '#FFFFFF', fontSize: 14, fontFamily:'SourceSansPro-Bold'}}>200 Followers</Text>
                      </View>
                    </View>
              </LinearGradient>
            </Animated.View>
              <TabView
               prerenderingSiblingsNumber={2}
                navigationState={this.state}
                renderScene={this._renderScene}
                renderTabBar={this._renderTabBar}
                onIndexChange={this._handleIndexChange}
                initialLayout={{
                  width: Dimensions.get('window').width,
                }}
              />
          </Animated.ScrollView>


          <Animated.View  style={{transform: [{translateY: this.tabFoo}], position: 'absolute', bottom:0, left: 0, width: '100%'}} >
            <LinearGradient colors={['#1B75BC', '#9AD8DD']} start={{x: 0.1, y: 0}} end={{x: 1.08, y: 1.17}}
              locations={[0.0, 1.0]}>
              <Footer>
                <FooterTab style={{backgroundColor: 'transparent'}}>
                  <Button vertical active>
                    <Icon name="home" />
                    <Text style={{color:'rgba(255,255,255,1)', marginTop: 3, fontSize: 11, fontFamily:'SourceSansPro-Regular'}}>Home</Text>
                  </Button>
                  <Button vertical>
                    <Icon name="apps" />
                    <Text style={{color:'rgba(255,255,255,0.5)', marginTop: 3, fontSize: 11, fontFamily:'SourceSansPro-Regular'}}>Bragboard</Text>
                  </Button>
                  <Button vertical>
                    <Icon active name="notifications" />
                    <Text style={{color:'rgba(255,255,255,0.5)', marginTop: 3, fontSize: 11, fontFamily:'SourceSansPro-Regular'}}>Notifications</Text>
                  </Button>
                  <Button vertical>
                    <Icon name="person" />
                    <Text style={{color:'rgba(255,255,255,0.5)', marginTop: 3, fontSize: 11, fontFamily:'SourceSansPro-Regular'}}>My Profile</Text>
                  </Button>
                </FooterTab>
              </Footer>
            </LinearGradient>
          </Animated.View>

      </View>

    )
  }
}
