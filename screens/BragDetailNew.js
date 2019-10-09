import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, SafeAreaView, Platform, ScrollView, KeyboardAvoidingView, TextInput } from 'react-native';
import { Button, Form, Item, Input, Container, Content, StyleProvider, Icon, Left, Right, Col, Label, Card, CardItem, Body,List, ListItem } from 'native-base';
import {AppStyles, Images} from '../Themes/';
import { Header } from 'react-navigation';
const HH = Dimensions.get('window').height;
const WW = Dimensions.get('window').width;
import LinearGradient from 'react-native-linear-gradient';



export default class BragDetailNew extends Component {
    static navigationOptions = ({navigation}) => {
    return {
      headerTransparent:false,
      headerStyle: {borderBottomWidth: 0, elevation: 10, borderBottomColor:'transparent',shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },shadowOpacity: 0.2, shadowRadius: 8},
      title: 'BragDetailNew',
      headerBackTitle:null,
      headerBackImage:<Image source={Images.backBtn} style={{width:40, height:30, resizeMode:'center'}}/>,
      headerTitleStyle:{fontSize:17,},
    };
  };


  render() {

    return (

        <View style={AppStyles.Wrapper}>
          <View style={[AppStyles.center,{paddingVertical: 50}]}>

            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 55, paddingTop: 20}}>
              <Text style={{textAlign: 'center', fontSize: 15, lineHeight: 20, fontFamily:'SourceSansPro-Regular', }}>Enter the 6-digit code we sent to +19173244776.<Text onPress={()=>{alert(0)}} style={{color:'#1B75BC', fontFamily:'SourceSansPro-Regular', fontWeight: 'bold',}}> Request a new one. </Text></Text>
              <TouchableOpacity></TouchableOpacity>
            </View>
          </View>
          <View style={{paddingHorizontal: 28}}>
            <Form>
              <Item regular>
                <Input placeholder='Confirmation Code'/>
              </Item>
              <LinearGradient
                start={{x: 0, y: 0}} end={{x: 3.5, y: 0.2}}
                locations={[0.0, 0.4]}
                colors={['#1B75BC', '#9AD8DD']}
                style={{
                  borderRadius: 4,
                  marginTop: 15
                }}
                >
                  <Button block  transparent large onPress={() => this.props.navigation.navigate('TabFix')}><Text style={{fontSize: 18, color:'#fff', fontFamily:'SourceSansPro-Bold'}}>NEXT</Text></Button>
              </LinearGradient>
            </Form>
          </View>
        </View>

    );
  }
}
