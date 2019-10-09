import React, { Component } from 'react';
import {Card, CardItem, Body, Button, Right, Left, Separator, H3, Container, Header, Content, Tab, Tabs, TabHeading, List, ListItem, Thumbnail } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {TouchableOpacity, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, ScrollView, ImageBackground, FlatList, Dimensions, Platform, ActivityIndicator} from 'react-native';
import { AppStyles, Images } from './../Themes'
import LinearGradient from 'react-native-linear-gradient';
export default class TabParticipants extends Component {
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
    	<View style={{padding: 0, backgroundColor: '#FFFFFF'}}>
	    	<ScrollView showsVerticalScrollIndicator={false}>
				<List>
		            <ListItem avatar>
		              <Left>
		                <Thumbnail small source={Images.avatar2} />
		              </Left>
		              <Body>
		                <Text style={{fontSize: 16, color:'#000000', fontFamily:'SourceSansPro-Bold', }}>Jerry Austin</Text>
			            <Text note style={{fontSize: 13, color:'#999999'}}>10 Brag Points</Text>
		              </Body>
		              <Right style={{justifyContent: 'center'}}>
		                <Button transparent style={{borderWidth: 1, borderColor: '#E2E2E2', borderRadius: 13, height: 26}}>
		                	<Text style={{fontSize: 10, fontFamily:'SourceSansPro-Bold', color:'#666666',paddingLeft:7, paddingRight: 7}}>FOLLOW</Text>
		                </Button>
		              </Right>
		            </ListItem>
		            <ListItem avatar>
		              <Left>
		                <Thumbnail small source={Images.avatar1} />
		              </Left>
		              <Body>
		                <Text style={{fontSize: 16, color:'#000000', fontFamily:'SourceSansPro-Bold', }}>Alan Austin</Text>
			            <Text note style={{fontSize: 13, color:'#999999'}}>10 Brag Points</Text>
		              </Body>
		              <Right style={{justifyContent: 'center'}}>
		                <Button transparent style={{borderWidth: 1, borderColor: '#E2E2E2', borderRadius: 13, height: 26}}>
		                	<Text style={{fontSize: 10, fontFamily:'SourceSansPro-Bold', color:'#666666',paddingLeft:7, paddingRight: 7}}>FOLLOW</Text>
		                </Button>
		              </Right>
		            </ListItem>
		            <ListItem avatar>
		              <Left>
		                <Thumbnail small source={Images.avatar2} />
		              </Left>
		              <Body>
		                <Text style={{fontSize: 16, color:'#000000', fontFamily:'SourceSansPro-Bold', }}>Jerry Austin</Text>
			            <Text note style={{fontSize: 13, color:'#999999'}}>10 Brag Points</Text>
		              </Body>
		              <Right style={{justifyContent: 'center'}}>
		                <Button transparent style={{borderWidth: 1, borderColor: '#E2E2E2', borderRadius: 13, height: 26, width: 80, justifyContent: 'center'}}>
		                	<Text style={{fontSize: 10, fontFamily:'SourceSansPro-Bold', color:'#1CBB04'}}>FOLLOWING</Text>
		                </Button>
		              </Right>
		            </ListItem>
		            <ListItem avatar>
		              <Left>
		                <Thumbnail small source={Images.avatar1} />
		              </Left>
		              <Body>
		                <Text style={{fontSize: 16, color:'#000000', fontFamily:'SourceSansPro-Bold', }}>Alan Austin</Text>
			            <Text note style={{fontSize: 13, color:'#999999'}}>10 Brag Points</Text>
		              </Body>
		              <Right style={{justifyContent: 'center'}}>
		                <Button transparent style={{borderWidth: 1, borderColor: '#E2E2E2', borderRadius: 13, height: 26}}>
		                	<Text style={{fontSize: 10, fontFamily:'SourceSansPro-Bold', color:'#666666',paddingLeft:7, paddingRight: 7}}>FOLLOW</Text>
		                </Button>
		              </Right>
		            </ListItem>
	                <ListItem avatar>
		              <Left>
		                <Thumbnail small source={Images.avatar2} />
		              </Left>
		              <Body>
		                <Text style={{fontSize: 16, color:'#000000', fontFamily:'SourceSansPro-Bold', }}>Jerry Austin</Text>
			            <Text note style={{fontSize: 13, color:'#999999'}}>10 Brag Points</Text>
		              </Body>
		              <Right style={{justifyContent: 'center'}}>
		                <Button transparent style={{borderWidth: 1, borderColor: '#E2E2E2', borderRadius: 13, height: 26}}>
		                	<Text style={{fontSize: 10, fontFamily:'SourceSansPro-Bold', color:'#666666',paddingLeft:7, paddingRight: 7}}>FOLLOW</Text>
		                </Button>
		              </Right>
		            </ListItem>
		            <ListItem avatar>
		              <Left>
		                <Thumbnail small source={Images.avatar1} />
		              </Left>
		              <Body>
		                <Text style={{fontSize: 16, color:'#000000', fontFamily:'SourceSansPro-Bold', }}>Alan Austin</Text>
			            <Text note style={{fontSize: 13, color:'#999999'}}>10 Brag Points</Text>
		              </Body>
		              <Right style={{justifyContent: 'center'}}>
		                <Button transparent style={{borderWidth: 1, borderColor: '#E2E2E2', borderRadius: 13, height: 26}}>
		                	<Text style={{fontSize: 10, fontFamily:'SourceSansPro-Bold', color:'#666666',paddingLeft:7, paddingRight: 7}}>FOLLOW</Text>
		                </Button>
		              </Right>
		            </ListItem>
	                <ListItem avatar>
		              <Left>
		                <Thumbnail small source={Images.avatar2} />
		              </Left>
		              <Body>
		                <Text style={{fontSize: 16, color:'#000000', fontFamily:'SourceSansPro-Bold', }}>Jerry Austin</Text>
			            <Text note style={{fontSize: 13, color:'#999999'}}>10 Brag Points</Text>
		              </Body>
		              <Right style={{justifyContent: 'center'}}>
		                <Button transparent style={{borderWidth: 1, borderColor: '#E2E2E2', borderRadius: 13, height: 26}}>
		                	<Text style={{fontSize: 10, fontFamily:'SourceSansPro-Bold', color:'#666666',paddingLeft:7, paddingRight: 7}}>FOLLOW</Text>
		                </Button>
		              </Right>
		            </ListItem>
		            <ListItem avatar>
		              <Left>
		                <Thumbnail small source={Images.avatar1} />
		              </Left>
		              <Body>
		                <Text style={{fontSize: 16, color:'#000000', fontFamily:'SourceSansPro-Bold', }}>Alan Austin</Text>
			            <Text note style={{fontSize: 13, color:'#999999'}}>10 Brag Points</Text>
		              </Body>
		              <Right style={{justifyContent: 'center'}}>
		                <Button transparent style={{borderWidth: 1, borderColor: '#E2E2E2', borderRadius: 13, height: 26}}>
		                	<Text style={{fontSize: 10, fontFamily:'SourceSansPro-Bold', color:'#666666',paddingLeft:7, paddingRight: 7}}>FOLLOW</Text>
		                </Button>
		              </Right>
		            </ListItem>
	                <ListItem avatar>
		              <Left>
		                <Thumbnail small source={Images.avatar2} />
		              </Left>
		              <Body>
		                <Text style={{fontSize: 16, color:'#000000', fontFamily:'SourceSansPro-Bold', }}>Jerry Austin</Text>
			            <Text note style={{fontSize: 13, color:'#999999'}}>10 Brag Points</Text>
		              </Body>
		              <Right style={{justifyContent: 'center'}}>
		                <Button transparent style={{borderWidth: 1, borderColor: '#E2E2E2', borderRadius: 13, height: 26}}>
		                	<Text style={{fontSize: 10, fontFamily:'SourceSansPro-Bold', color:'#666666',paddingLeft:7, paddingRight: 7}}>FOLLOW</Text>
		                </Button>
		              </Right>
		            </ListItem>
		            <ListItem avatar>
		              <Left>
		                <Thumbnail small source={Images.avatar2} />
		              </Left>
		              <Body>
		                <Text style={{fontSize: 16, color:'#000000', fontFamily:'SourceSansPro-Bold', }}>Jerry Austin</Text>
			            <Text note style={{fontSize: 13, color:'#999999'}}>10 Brag Points</Text>
		              </Body>
		              <Right style={{justifyContent: 'center'}}>
		                <Button transparent style={{borderWidth: 1, borderColor: '#E2E2E2', borderRadius: 13, height: 26}}>
		                	<Text style={{fontSize: 10, fontFamily:'SourceSansPro-Bold', color:'#666666',paddingLeft:7, paddingRight: 7}}>FOLLOW</Text>
		                </Button>
		              </Right>
		            </ListItem>
		            <ListItem avatar>
		              <Left>
		                <Thumbnail small source={Images.avatar2} />
		              </Left>
		              <Body>
		                <Text style={{fontSize: 16, color:'#000000', fontFamily:'SourceSansPro-Bold', }}>Jerry Austin</Text>
			            <Text note style={{fontSize: 13, color:'#999999'}}>10 Brag Points</Text>
		              </Body>
		              <Right style={{justifyContent: 'center'}}>
		                <Button transparent style={{borderWidth: 1, borderColor: '#E2E2E2', borderRadius: 13, height: 26}}>
		                	<Text style={{fontSize: 10, fontFamily:'SourceSansPro-Bold', color:'#666666',paddingLeft:7, paddingRight: 7}}>FOLLOW</Text>
		                </Button>
		              </Right>
		            </ListItem>
		            <ListItem avatar>
		              <Left>
		                <Thumbnail small source={Images.avatar2} />
		              </Left>
		              <Body>
		                <Text style={{fontSize: 16, color:'#000000', fontFamily:'SourceSansPro-Bold', }}>Jerry Austin</Text>
			            <Text note style={{fontSize: 13, color:'#999999'}}>10 Brag Points</Text>
		              </Body>
		              <Right style={{justifyContent: 'center'}}>
		                <Button transparent style={{borderWidth: 1, borderColor: '#E2E2E2', borderRadius: 13, height: 26}}>
		                	<Text style={{fontSize: 10, fontFamily:'SourceSansPro-Bold', color:'#666666',paddingLeft:7, paddingRight: 7}}>FOLLOW</Text>
		                </Button>
		              </Right>
		            </ListItem>
		            <ListItem avatar>
		              <Left>
		                <Thumbnail small source={Images.avatar2} />
		              </Left>
		              <Body>
		                <Text style={{fontSize: 16, color:'#000000', fontFamily:'SourceSansPro-Bold', }}>Jerry Austin</Text>
			            <Text note style={{fontSize: 13, color:'#999999'}}>10 Brag Points</Text>
		              </Body>
		              <Right style={{justifyContent: 'center'}}>
		                <Button transparent style={{borderWidth: 1, borderColor: '#E2E2E2', borderRadius: 13, height: 26}}>
		                	<Text style={{fontSize: 10, fontFamily:'SourceSansPro-Bold', color:'#666666',paddingLeft:7, paddingRight: 7}}>FOLLOW</Text>
		                </Button>
		              </Right>
		            </ListItem>
		            <ListItem avatar>
		              <Left>
		                <Thumbnail small source={Images.avatar2} />
		              </Left>
		              <Body>
		                <Text style={{fontSize: 16, color:'#000000', fontFamily:'SourceSansPro-Bold', }}>Jerry Austin</Text>
			            <Text note style={{fontSize: 13, color:'#999999'}}>10 Brag Points</Text>
		              </Body>
		              <Right style={{justifyContent: 'center'}}>
		                <Button transparent style={{borderWidth: 1, borderColor: '#E2E2E2', borderRadius: 13, height: 26}}>
		                	<Text style={{fontSize: 10, fontFamily:'SourceSansPro-Bold', color:'#666666',paddingLeft:7, paddingRight: 7}}>FOLLOW</Text>
		                </Button>
		              </Right>
		            </ListItem>


		        </List>
		    </ScrollView>
    	</View>
    );
  }
}
