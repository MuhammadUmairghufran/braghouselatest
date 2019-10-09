import React, { Component } from 'react';
import {Card, CardItem, Body, Button, Right, Left, Separator, H3, Container, Header, Content, Tab, Tabs, TabHeading, Form, Item, Label, Input } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {TouchableOpacity, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, ScrollView, ImageBackground, FlatList, Dimensions, Platform, ActivityIndicator} from 'react-native';
import { AppStyles, Images } from '../../Themes'
import LinearGradient from 'react-native-linear-gradient';
import Loader from '../../Utils/Loader/';
import ConstantLib  from '../../Constants/ConstantLib/';
import * as URLConstants from '../../Networking/URLConstants/';
import WSManager from '../../Networking/WSManager/';
import {getItem,saveItem} from '../../lib/Session';
import PreferenceConstant from '../../Preferences/PreferenceConstant';

export default class TabBrags extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
				teamList:[],
				sectionID: null,
				rowID: null,
				loading:false,
				userID:'',
	    }
	  }


		componentDidMount()
		{
		  getItem(PreferenceConstant.USER_ID).then((value) => {
 		    this.getUserCreatedBrags(value);

		  })
		}

  static navigationOptions = {
    header: null
  };
  render() {
    return (


    			<View style={{backgroundColor: '#EDEDED', flex:1}}>
	    			<ScrollView showsVerticalScrollIndicator={false}>
		    			<View style={{padding: 15, paddingBottom: 0}}>
					        <View>
					        	<Card style={{paddingVertical: 15, borderRadius: 5, marginBottom: 15, borderWidth: 0, shadowColor: '#000', elevation: 2, shadowOpacity: 0.2, shadowOffset: { width: 0, height: 2 }, shadowRadius: 10,
					          		borderTopWidth: 0, borderBottomWidth: 0, borderLeftWidth: 0, borderRightWidth: 0}}>
						            <CardItem>
						              <Body>
						  				<Text style={{fontSize: 22, color:'#333', fontFamily:'SourceSansPro-Regular'}}>Which QB in the SEC will score the most yards this week?</Text>
						              </Body>
						            </CardItem>
						            <CardItem>
										<Body>
								            <Item floatingLabel>
								              <Label style={AppStyles.lbltxt}>Player Name</Label>
								              <Input />
								            </Item>
								        </Body>
						            </CardItem>
								</Card>
				        	</View>
				        	<View>
					        	<Card style={{paddingVertical: 15, borderRadius: 5, marginBottom: 15, borderWidth: 0, shadowColor: '#000', elevation: 2, shadowOpacity: 0.2, shadowOffset: { width: 0, height: 2 }, shadowRadius: 10,
					          		borderWidth: 1, borderColor: '#96D8E3', backgroundColor: '#EAFBFF'}}>
						            <CardItem style={{backgroundColor: '#EAFBFF'}}>
						              <Body>
						  				<Text style={{fontSize: 16, color:'#000', fontFamily:'SourceSansPro-Bold'}}>Enter the brag point you want to enter the contest with :</Text>
						              </Body>
						            </CardItem>
						            <CardItem  style={{backgroundColor: '#EAFBFF'}}>
										<Body>
								            <Item floatingLabel>
								              <Label style={AppStyles.lbltxt}>Enter Points</Label>
								              <Input />
								            </Item>
											<View style={{marginTop: 6, flexDirection: 'row'}}>
								            	<Text style={{color:'rgba(0,0,0,0.4)', fontSize: 10,fontFamily:'SourceSansPro-Bold', marginRight: 12}}> MIN : 10,</Text>
								            	<Text style={{color:'rgba(0,0,0,0.4)', fontSize: 10, fontFamily:'SourceSansPro-Bold'}}> MAX : 500 </Text>
											</View>
								        </Body>
						            </CardItem>
								</Card>
				        	</View>
		    			</View>
		        	</ScrollView>

		        </View>


    );
  }





}
