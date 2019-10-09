import React, { Component } from 'react';
import {Card, CardItem, Body, Button, Right, Left, Separator, H3, Container, Content, Tab, Tabs, TabHeading, Header, StyleProvider, Footer, FooterTab, Icon, Title, Subtitle, ScrollableTab} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {TouchableOpacity, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, ScrollView, ImageBackground, FlatList, Dimensions, Platform, ActivityIndicator, Animated, StatusBar} from 'react-native';
import { AppStyles, Images } from './../Themes'
import LinearGradient from 'react-native-linear-gradient';
import TabBrags from './TabBrags';
import TabRules from './TabRules';
import TabParticipants from './TabParticipants';




export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
   static navigationOptions = {
    header: null
  };
render() {  
    return (
      <KeyboardAvoidingView style={AppStyles.Wrapper} behavior='padding'>
        
       
       <ScrollView>
        <View style={AppStyles.darkContainer}>
            <LinearGradient
              colors={['#1B75BC', '#9AD8DD']}
              start={{x: 0., y: 0}} end={{x: 1, y: 0.8}}
              locations={[0.0, 1.0]}
              style={{ 
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
                elevation: 10,
                paddingTop: 10,
                paddingVertical: 0
              }}
              >
              <Header noShadow androidStatusBarColor ='red'>
                <Left>
                  <Button transparent onPress={() => this.props.navigation.navigate('Lobbydetail')}>
                    <Icon name='arrow-back' />
                  </Button>
                </Left>
                <Body>
                  <Title style={{alignItems: 'center'}}><Text style={{fontSize:18, fontFamily:'SourceSansPro-Bold',}}>Chelsea </Text> <Text style={{color: '#F4F4F4', opacity: 0.6, fontSize:11, fontFamily:'SourceSansPro-Bold', marginLeft: 5, marginRight: 5 }}> VS </Text> <Text style={{fontSize:18, fontFamily:'SourceSansPro-Bold',}}> Everton</Text></Title>
                  <Subtitle>Apr 24, Sat - 12:00 AM</Subtitle>
                </Body>
              </Header>
                <Tabs tabContainerStyle={{elevation:0}}>
                    <Tab heading="BRAG">
                      <TabBrags />
                    </Tab>
                    <Tab heading="RULES">
                      <TabRules />
                    </Tab>
                    <Tab heading="PARTICIPANTS">
                      <TabParticipants />
                    </Tab>
                </Tabs>
            </LinearGradient>
        </View>
        </ScrollView>
      
      </KeyboardAvoidingView>
      
    );
  }
}
