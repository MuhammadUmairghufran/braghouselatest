import React, { Component } from 'react';
import {Card, CardItem, Body, Button, Right, Left, Separator, H3, Container, Content, Tab, Tabs, TabHeading, Header, StyleProvider, Icon, Title, Subtitle} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {TouchableOpacity, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, ScrollView, ImageBackground, FlatList, Dimensions, Platform, ActivityIndicator, Animated, StatusBar} from 'react-native';
import { AppStyles, Images } from './../Themes'
import LinearGradient from 'react-native-linear-gradient';

const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[AppStyles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);


export default class lobbyDetail extends Component {
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


        <View style={[AppStyles.darkContainer, {overflow: 'visible'}]}>
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
                  <Button transparent onPress={() => this.props.navigation.navigate('TabFix')}>
                    <Image source={Images.back}/>
                  </Button>
                </Left>
                <Body style={{flex:1}}>
                  <Title style={{alignItems: 'center', marginTop: Platform.OS === 'ios'? -15 :0}}>
                    <Text style={{fontSize:18, fontFamily:'SourceSansPro-Regular'}}>Chelsea </Text>
                    <Text style={{color: '#F4F4F4', opacity: 0.6, fontSize:11, marginLeft: 0, marginRight: 0, fontFamily:'SourceSansPro-Regular' }}> VS </Text>
                    <Text style={{fontSize:18,fontFamily:'SourceSansPro-Regular'}}> Everton</Text>
                  </Title>
                  <Title  style={{alignItems: 'center', marginTop: Platform.OS === 'android' ? -15 : 0, justifyContent: 'center', }}>
                    <Text style={{fontSize: 12}}>Week 2 </Text>
                    { Platform.OS === 'android' && <Text style={{color: 'rgba(255,255,255,0.6)', fontSize: 30, fontFamily:'SourceSansPro-Bold', paddingHorizontal: 8, marginTop: 0, position: 'relative' }}>.</Text>}
                    { Platform.OS === 'ios' && <View style={{width: 6}}></View>}
                    { Platform.OS === 'ios' && <View style={{width: 4, height: 4, backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: 50}}> </View>}
                    <Text style={{fontSize: 12,paddingBottom: 15}}> Apr 24, Sat - 12:00 AM</Text>
                  </Title>
                </Body>
              </Header>
            </LinearGradient>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{margin: 15}}>
              <View style={{position:'relative'}}>
                <Image source={Images.ribbon} style={{position: 'absolute', top:5, left: -6, elevation: 50, zIndex: 9}}/>
                <Card style={{paddingVertical: 2, borderRadius: 5, borderWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, marginBottom:10}}>

                  <CardItem>
                    <Body>
                      <Text style={{fontSize: 20, color:'#1E77BD'}}>Which QB in the SEC will score the most yards this week?</Text>
                    </Body>
                  </CardItem>
                  <CardItem style={{paddingBottom: 25}}>
                    <Left style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                        <Text style={{fontSize: 10, color:'rgba(0,0,0,0.4)', fontFamily:'SourceSansPro-Bold'}}>MIN POINTS</Text>
                        <Text style={{fontSize: 16, color:'#000', fontFamily:'SourceSansPro-Bold'}}>10</Text>
                    </Left>
                    <Left style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                        <Text style={{fontSize: 10, color:'rgba(0,0,0,0.4)', fontFamily:'SourceSansPro-Bold'}}>MAX POINTS</Text>
                        <Text style={{fontSize: 16, color:'#000', fontFamily:'SourceSansPro-Bold'}}>500</Text>
                    </Left>
                    <Left style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                        <Text style={{fontSize: 10, color:'rgba(0,0,0,0.4)', fontFamily:'SourceSansPro-Bold'}}>PARTICIPANTS</Text>
                        <Text style={{fontSize: 16, color:'#000', fontFamily:'SourceSansPro-Bold'}}>150</Text>
                    </Left>
                    <Right style={{alignSelf: 'flex-end', marginLeft: 10}}>
                      <Button onPress={() => this.props.navigation.navigate('Bragdetail')} transparent  style={{height: 32,  width:66, borderRadius: 25, borderWidth: 1, borderColor: '#1CBB04', alignItems: 'center', alignSelf: 'flex-end',  justifyContent: 'center'}}><Text style={{textAlign: 'center', fontSize: 14, color:'#1CBB04', fontFamily:'SourceSansPro-Bold'}}>PLAY</Text></Button>
                    </Right>
                  </CardItem>
                </Card>
              </View>
              <View style={{position:'relative'}}>
                <Card style={{paddingVertical: 2, borderRadius: 5, borderWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, marginBottom:10}}>

                  <CardItem>
                    <Body>
                      <Text style={{fontSize: 20, color:'#1E77BD'}}>Which QB in the SEC will score the most yards this week?</Text>
                    </Body>
                  </CardItem>
                  <CardItem style={{paddingBottom: 25}}>
                    <Left style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                        <Text style={{fontSize: 10, color:'rgba(0,0,0,0.4)', fontFamily:'SourceSansPro-Bold'}}>MIN POINTS</Text>
                        <Text style={{fontSize: 16, color:'#000', fontFamily:'SourceSansPro-Bold'}}>10</Text>
                    </Left>
                    <Left style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                        <Text style={{fontSize: 10, color:'rgba(0,0,0,0.4)', fontFamily:'SourceSansPro-Bold'}}>MAX POINTS</Text>
                        <Text style={{fontSize: 16, color:'#000', fontFamily:'SourceSansPro-Bold'}}>500</Text>
                    </Left>
                    <Left style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                        <Text style={{fontSize: 10, color:'rgba(0,0,0,0.4)', fontFamily:'SourceSansPro-Bold'}}>PARTICIPANTS</Text>
                        <Text style={{fontSize: 16, color:'#000', fontFamily:'SourceSansPro-Bold'}}>150</Text>
                    </Left>
                    <Right style={{alignSelf: 'flex-end', marginLeft: 10}}>
                      <Button onPress={() => this.props.navigation.navigate('Bragdetail')} transparent  style={{height: 32,  width:66, borderRadius: 25, borderWidth: 1, borderColor: '#1CBB04', alignItems: 'center', alignSelf: 'flex-end',  justifyContent: 'center'}}><Text style={{textAlign: 'center', fontSize: 14, color:'#1CBB04', fontFamily:'SourceSansPro-Bold'}}>PLAY</Text></Button>
                    </Right>
                  </CardItem>
                </Card>
              </View>
              <View style={{position:'relative'}}>
                <Card style={{paddingVertical: 2, borderRadius: 5, borderWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, marginBottom:10}}>

                  <CardItem>
                    <Body>
                      <Text style={{fontSize: 20, color:'#1E77BD'}}>Which QB in the SEC will score the most yards this week?</Text>
                    </Body>
                  </CardItem>
                  <CardItem style={{paddingBottom: 25}}>
                    <Left style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                        <Text style={{fontSize: 10, color:'rgba(0,0,0,0.4)', fontFamily:'SourceSansPro-Bold'}}>MIN POINTS</Text>
                        <Text style={{fontSize: 16, color:'#000', fontFamily:'SourceSansPro-Bold'}}>10</Text>
                    </Left>
                    <Left style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                        <Text style={{fontSize: 10, color:'rgba(0,0,0,0.4)', fontFamily:'SourceSansPro-Bold'}}>MAX POINTS</Text>
                        <Text style={{fontSize: 16, color:'#000', fontFamily:'SourceSansPro-Bold'}}>500</Text>
                    </Left>
                    <Left style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                        <Text style={{fontSize: 10, color:'rgba(0,0,0,0.4)', fontFamily:'SourceSansPro-Bold'}}>PARTICIPANTS</Text>
                        <Text style={{fontSize: 16, color:'#000', fontFamily:'SourceSansPro-Bold'}}>150</Text>
                    </Left>
                    <Right style={{alignSelf: 'flex-end', marginLeft: 10}}>
                      <Button onPress={() => this.props.navigation.navigate('Bragdetail')} transparent  style={{height: 32,  width:66, borderRadius: 25, borderWidth: 1, borderColor: '#1CBB04', alignItems: 'center', alignSelf: 'flex-end',  justifyContent: 'center'}}><Text style={{textAlign: 'center', fontSize: 14, color:'#1CBB04', fontFamily:'SourceSansPro-Bold'}}>PLAY</Text></Button>
                    </Right>
                  </CardItem>
                </Card>
              </View>
              <View style={{position:'relative'}}>
                <Card style={{paddingVertical: 2, borderRadius: 5, borderWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, marginBottom:10}}>

                  <CardItem>
                    <Body>
                      <Text style={{fontSize: 20, color:'#1E77BD'}}>Which QB in the SEC will score the most yards this week?</Text>
                    </Body>
                  </CardItem>
                  <CardItem style={{paddingBottom: 25}}>
                    <Left style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                        <Text style={{fontSize: 10, color:'rgba(0,0,0,0.4)', fontFamily:'SourceSansPro-Bold'}}>MIN POINTS</Text>
                        <Text style={{fontSize: 16, color:'#000', fontFamily:'SourceSansPro-Bold'}}>10</Text>
                    </Left>
                    <Left style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                        <Text style={{fontSize: 10, color:'rgba(0,0,0,0.4)', fontFamily:'SourceSansPro-Bold'}}>MAX POINTS</Text>
                        <Text style={{fontSize: 16, color:'#000', fontFamily:'SourceSansPro-Bold'}}>500</Text>
                    </Left>
                    <Left style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                        <Text style={{fontSize: 10, color:'rgba(0,0,0,0.4)', fontFamily:'SourceSansPro-Bold'}}>PARTICIPANTS</Text>
                        <Text style={{fontSize: 16, color:'#000', fontFamily:'SourceSansPro-Bold'}}>150</Text>
                    </Left>
                    <Right style={{alignSelf: 'flex-end', marginLeft: 10}}>
                      <Button onPress={() => this.props.navigation.navigate('Bragdetail')} transparent  style={{height: 32,  width:66, borderRadius: 25, borderWidth: 1, borderColor: '#1CBB04', alignItems: 'center', alignSelf: 'flex-end',  justifyContent: 'center'}}><Text style={{textAlign: 'center', fontSize: 14, color:'#1CBB04', fontFamily:'SourceSansPro-Bold'}}>PLAY</Text></Button>
                    </Right>
                  </CardItem>
                </Card>
              </View>
              <View style={{position:'relative'}}>
                <Card style={{paddingVertical: 2, borderRadius: 5, borderWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, marginBottom:10}}>

                  <CardItem>
                    <Body>
                      <Text style={{fontSize: 20, color:'#1E77BD'}}>Which QB in the SEC will score the most yards this week?</Text>
                    </Body>
                  </CardItem>
                  <CardItem style={{paddingBottom: 25}}>
                    <Left style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                        <Text style={{fontSize: 10, color:'rgba(0,0,0,0.4)', fontFamily:'SourceSansPro-Bold'}}>MIN POINTS</Text>
                        <Text style={{fontSize: 16, color:'#000', fontFamily:'SourceSansPro-Bold'}}>10</Text>
                    </Left>
                    <Left style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                        <Text style={{fontSize: 10, color:'rgba(0,0,0,0.4)', fontFamily:'SourceSansPro-Bold'}}>MAX POINTS</Text>
                        <Text style={{fontSize: 16, color:'#000', fontFamily:'SourceSansPro-Bold'}}>500</Text>
                    </Left>
                    <Left style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                        <Text style={{fontSize: 10, color:'rgba(0,0,0,0.4)', fontFamily:'SourceSansPro-Bold'}}>PARTICIPANTS</Text>
                        <Text style={{fontSize: 16, color:'#000', fontFamily:'SourceSansPro-Bold'}}>150</Text>
                    </Left>
                    <Right style={{alignSelf: 'flex-end', marginLeft: 10}}>
                      <Button onPress={() => this.props.navigation.navigate('Bragdetail')} transparent  style={{height: 32,  width:66, borderRadius: 25, borderWidth: 1, borderColor: '#1CBB04', alignItems: 'center', alignSelf: 'flex-end',  justifyContent: 'center'}}><Text style={{textAlign: 'center', fontSize: 14, color:'#1CBB04', fontFamily:'SourceSansPro-Bold'}}>PLAY</Text></Button>
                    </Right>
                  </CardItem>
                </Card>
              </View>
              <View style={{position:'relative'}}>
                <Card style={{paddingVertical: 2, borderRadius: 5, borderWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, marginBottom:10}}>

                  <CardItem>
                    <Body>
                      <Text style={{fontSize: 20, color:'#1E77BD'}}>Which QB in the SEC will score the most yards this week?</Text>
                    </Body>
                  </CardItem>
                  <CardItem style={{paddingBottom: 25}}>
                    <Left style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                        <Text style={{fontSize: 10, color:'rgba(0,0,0,0.4)', fontFamily:'SourceSansPro-Bold'}}>MIN POINTS</Text>
                        <Text style={{fontSize: 16, color:'#000', fontFamily:'SourceSansPro-Bold'}}>10</Text>
                    </Left>
                    <Left style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                        <Text style={{fontSize: 10, color:'rgba(0,0,0,0.4)', fontFamily:'SourceSansPro-Bold'}}>MAX POINTS</Text>
                        <Text style={{fontSize: 16, color:'#000', fontFamily:'SourceSansPro-Bold'}}>500</Text>
                    </Left>
                    <Left style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                        <Text style={{fontSize: 10, color:'rgba(0,0,0,0.4)', fontFamily:'SourceSansPro-Bold'}}>PARTICIPANTS</Text>
                        <Text style={{fontSize: 16, color:'#000', fontFamily:'SourceSansPro-Bold'}}>150</Text>
                    </Left>
                    <Right style={{alignSelf: 'flex-end', marginLeft: 10}}>
                      <Button onPress={() => this.props.navigation.navigate('Bragdetail')} transparent  style={{height: 32,  width:66, borderRadius: 25, borderWidth: 1, borderColor: '#1CBB04', alignItems: 'center', alignSelf: 'flex-end',  justifyContent: 'center'}}><Text style={{textAlign: 'center', fontSize: 14, color:'#1CBB04', fontFamily:'SourceSansPro-Bold'}}>PLAY</Text></Button>
                    </Right>
                  </CardItem>
                </Card>
              </View>
              <View style={{position:'relative'}}>
                <Card style={{paddingVertical: 2, borderRadius: 5, borderWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, marginBottom:10}}>

                  <CardItem>
                    <Body>
                      <Text style={{fontSize: 20, color:'#1E77BD'}}>Which QB in the SEC will score the most yards this week?</Text>
                    </Body>
                  </CardItem>
                  <CardItem style={{paddingBottom: 25}}>
                    <Left style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                        <Text style={{fontSize: 10, color:'rgba(0,0,0,0.4)', fontFamily:'SourceSansPro-Bold'}}>MIN POINTS</Text>
                        <Text style={{fontSize: 16, color:'#000', fontFamily:'SourceSansPro-Bold'}}>10</Text>
                    </Left>
                    <Left style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                        <Text style={{fontSize: 10, color:'rgba(0,0,0,0.4)', fontFamily:'SourceSansPro-Bold'}}>MAX POINTS</Text>
                        <Text style={{fontSize: 16, color:'#000', fontFamily:'SourceSansPro-Bold'}}>500</Text>
                    </Left>
                    <Left style={{flexDirection: 'column', alignItems: 'flex-start'}}>
                        <Text style={{fontSize: 10, color:'rgba(0,0,0,0.4)', fontFamily:'SourceSansPro-Bold'}}>PARTICIPANTS</Text>
                        <Text style={{fontSize: 16, color:'#000', fontFamily:'SourceSansPro-Bold'}}>150</Text>
                    </Left>
                    <Right style={{alignSelf: 'flex-end', marginLeft: 10}}>
                      <Button onPress={() => this.props.navigation.navigate('Bragdetail')} transparent  style={{height: 32,  width:66, borderRadius: 25, borderWidth: 1, borderColor: '#1CBB04', alignItems: 'center', alignSelf: 'flex-end',  justifyContent: 'center'}}><Text style={{textAlign: 'center', fontSize: 14, color:'#1CBB04', fontFamily:'SourceSansPro-Bold'}}>PLAY</Text></Button>
                    </Right>
                  </CardItem>
                </Card>
              </View>
            </View>
          </ScrollView>

        </View>


    );
  }
}
