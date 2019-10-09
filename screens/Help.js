import React, {Component} from 'react';
import {View, SafeAreaView, Text, Platform, TouchableOpacity, Image, StyleSheet, TextInput, ScrollView} from 'react-native'
import { Toast } from 'native-base';

import LinearGradient from 'react-native-linear-gradient';
import { AppStyles, Images } from '../Themes'
import Utility from '../Utils/Utility/';
import Loader from '../Utils/Loader'
import ConstantLib from '../Constants/ConstantLib';
import Toaster from '../Utils/Toaster';

import WSManager from '../Networking/WSManager';
import * as URLConstants from '../Networking/URLConstants'
import PreferenceConstant from '../Preferences/PreferenceConstant';

import { getItem} from '../lib/Session';

var FloatingLabel = require('react-native-floating-labels');


class Help extends Component
{
    constructor (props)
    {
        super(props);
        this.state = {

            firstName:'',
            lastName:'',
            email:'',
            phone: '',
            message:'',
            showLoader: false,
            
        }

    }

    static navigationOptions = ({ navigation }) => {
        return {
          header: <CustomHeader this navigation={navigation} />
        };
      };

    
      


    render()
    {
        
        
        return(
            <View  style = {{backgroundColor: '#FFFFFF'}}  >
            
            <ScrollView style = {{height: '100%'}}>
            <Loader loading = {this.state.showLoader}></Loader>
                <View style = {{height: "100%",}}>
                    <View style = {styles.container}>
                        <FloatingLabel 
                            labelStyle={styles.labelInput}
                            inputStyle={styles.input}
                            style={styles.formInput}
                            

                            value={this.state.firstName+' '+this.state.lastName}
                            editable = {false}
                            
                        >Name</FloatingLabel>
                        <FloatingLabel 
                            labelStyle={styles.labelInput}
                            inputStyle={styles.input}
                            style={styles.formInput}
                            

                            value={this.state.email}
                            editable = {false}
                        >Email</FloatingLabel>
                        <FloatingLabel
                            labelStyle={styles.labelInput}
                            inputStyle={styles.input}
                            style={styles.formInput}

                            value={this.state.phone}
                            editable = {false}
                        >Phone</FloatingLabel>
                        <FloatingLabel
                            labelStyle={styles.labelInputTextInput}
                            inputStyle={styles.inputTextInput}
                            style={styles.formInputTextInput}

                            value={this.state.message}
                            onChangeText = {(text) => this.setState({message: text})}

                            multiline = {true}
                        >Message</FloatingLabel>

                        {/* <View style = {[styles.formInput,{alignContent: 'flex-start', }]}>
                            <TextInput multiline = {true} style = {{ width: '80%', height:100,backgroundColor: '#000000',}}></TextInput>
                        </View> */}

                        <View style = {[styles.formInputTextInput,{justifyContent: 'center'}]}>
                            <TouchableOpacity onPress={() => this.submitMessageQuery()}>
                                <LinearGradient start={{ x: 0.6, y: 0 }} end={{ x: 2.5, y: 1.5 }}
                                    locations={[0.0, 0.4]} colors={['#1B75BC', '#9AD8DD']} style={{width: '100%', height: 50, justifyContent: 'center'}} >
                                    <Text style = {{fontFamily: 'SourceSansPro-Regular', fontSize: 18, letterSpacing: 1, fontWeight: 'bold' , color: '#FFFFFF', textAlign: 'center',}}>{'SUBMIT'}</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                </ScrollView>
            {/* </SafeAreaView> */}
            </View>
         

        );
    }

    componentDidMount()
    {
        getItem(PreferenceConstant.LAST_NAME).then((value) => {
            this.setState({ lastName: value })
          })
          getItem(PreferenceConstant.FIRST_NAME).then((value) => {
            this.setState({ firstName: value })
          })
          getItem(PreferenceConstant.EMAIL).then((value) => {
            this.setState({ email: value })
          })
          getItem(PreferenceConstant.PHONE_NO).then((value) => {
            this.setState({ phone: value })
          })
          
    }


    submitMessageQuery()
    {

        this.setState({showLoader: true})
        const params = {
            name: this.state.firstName+' '+this.state.lastName,
            email:this.state.email,
            phone:this.state.phone,
            message:this.state.message,
        };

        
        
        WSManager.postData(URLConstants.COMMON_SUPPORT, params)
        .then(response => {

            if (response.data.response_code == '200')
            {
                this.setState({showLoader: false}, () => {
                    setTimeout(() => {
                        alert('Succesfully Submitted Your Query')    
                    }, 500);  
                })
            }
        })
        .catch( error => {
            this.setState({showLoader: false}, () => {
                Toaster.showLongToast(error.response.data.error.message);
            })
        })


    }



}

export default Help;


var styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 30,
      backgroundColor: 'white',
    },
    labelInput: {
      color: '#000000',
      fontFamily: 'SourceSansPro-Regular'
    },
    formInput: {    
      borderBottomWidth: 0.5, 
      margin: 5,
      borderColor: '#66666620',
      backgroundColor: 'white',
      shadowColor: '#666666',
      shadowRadius: 10,
      shadowOffset: {width: 5, height: 5},
      shadowOpacity: 0.4,
      
    },
    input: {
      borderWidth: 0,
      fontFamily: 'SourceSansPro-Regular'
    },

    labelInputTextInput: {
        color: '#000000',
        fontFamily: 'SourceSansPro-Regular'
      },
      formInputTextInput: {    
        borderBottomWidth: 0.5, 
        margin: 5,
        borderColor: '#66666620',
        backgroundColor: 'white',
        shadowColor: '#666666',
        shadowRadius: 10,
        shadowOffset: {width: 5, height: 5},
        shadowOpacity: 0.4,
        
      },
      inputTextInput: {
        borderWidth: 0,
        fontFamily: 'SourceSansPro-Regular',
        height: 200,
        
      }
  });


const CustomHeader = ({ navigation }) => (
    <LinearGradient
      start={{ x: 0.6, y: 0 }} end={{ x: 2.5, y: 1.5 }}
      locations={[0.0, 0.4]}
      colors={['#1B75BC', '#9AD8DD']}
      style={{ paddingTop: Platform.OS === "ios" ? 30 : 20 }}
    >
      <View style={{ flexDirection: 'row', padding: 15, alignItems: 'center' }}>
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'transparent' }}>
          <View style={{ alignItems: 'center', marginLeft: 0 }}>
            <View style={{ alignItems: 'center' }}>
              <Text style={AppStyles.header_title}>Help</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.goBack(null)} style={{ position: "absolute", marginLeft: 15, backgroundColor: 'transparent' }} transparent>
          <Image source={Images.back} defaultSource={Images.back} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
  