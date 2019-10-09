import React, { Component } from 'react';
import {Card, CardItem, Body, Button, Right, Left, Separator, H3, Container, Content, Tab, Tabs, TabHeading, Header, StyleProvider, Footer, FooterTab, Icon} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {TouchableOpacity, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, ScrollView, ImageBackground, FlatList, Dimensions, Platform, ActivityIndicator, Animated, StatusBar} from 'react-native';
import { AppStyles, Images } from './../Themes'
import LinearGradient from 'react-native-linear-gradient';
 import TabPlayers from './TabPlayers';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
   static navigationOptions = {
    header: null
  };
  async componentDidMount() {
    setTimeout(()=>{
      this.setState({activePage:0})
    },0)
  }
render() {
    return (



        <View style={AppStyles.darkContainer}>

          <ScrollView>
            <View>
              <LinearGradient
                start={{x: 0., y: 0}} end={{x: 1, y: 0.8}}
                locations={[0.0, 0.4]}
                colors={['#1B75BC', '#9AD8DD']}
                style={{
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0,
                  shadowRadius: 2,
                  elevation: 10,
                }}
                >
                <View style={{alignItems: 'center', paddingTop: 50, paddingBottom: 20}}>
                  <Image source={Images.logoteam}/>
                  <H3 style={{marginTop: 14, fontSize: 22, color:'#FFFFFF', fontFamily:'SourceSansPro-Bold'}}>Alabama Crimson Tide</H3>
                  <Text style={{color: '#FFFFFF', fontSize: 14, fontFamily:'SourceSansPro-Bold'}}>200 Followers</Text>
                </View>
                <Tabs page={this.state.activePage}>
                  <Tab heading="FIXTURES">
                    <TabFixtures/>
                  </Tab>
                  <Tab heading="PLAYERS">
                    <TabPlayers />
                  </Tab>
                </Tabs>
              </LinearGradient>
            </View>
          </ScrollView>
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
        </View>


    );
  }
}
