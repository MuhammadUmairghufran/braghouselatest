import React, { Component } from 'react';
import {StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, Image, Platform, TouchableOpacity} from 'react-native';
import {Label,Input, Item} from 'native-base';
import DatePicker from 'react-native-datepicker';

import SimplePicker from 'react-native-simple-picker'

import {Images} from '../Themes/';
import AppStyles from '../Themes/AppStyles';
import IMAGES  from '../Constants/Images/';

import Moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';


//Local Files

const optionsForGenderPicker = ['Male', 'Female'];


const CustomHeader = ({navigation}) => (
    <LinearGradient
          start={{x: 0.6, y: 0}} end={{x: 2.5, y: 1.5}}
          locations={[0.0, 0.4]}
          colors={['#1B75BC', '#9AD8DD']}
          style={{paddingTop: Platform.OS === "ios" ? 30 : 20}}
          >

  <View style={{ flexDirection:'row',padding:15,  alignItems:'center'}}>
  <TouchableOpacity onPress={()=> navigation.goBack(null)} style={{flex:1,justifyContent:"flex-start"}} transparent>
  <Image source={IMAGES.closeBack} />
  </TouchableOpacity>
  <View style={{flex:8,justifyContent:'flex-start'}}>
            <Text   style={AppStyles.header_title}>Braggers you can follow </Text>
  </View>
  <TouchableOpacity onPress={()=> navigation.goBack} style={{flex:1,alignItems:"flex-end"}} transparent>
  <Text style={{color: '#fff', fontSize: 16 ,fontFamily:'SourceSansPro-Bold',textAlign:'center'}}>Done</Text>
  </TouchableOpacity>
  </View>
    </LinearGradient>
  );

export default class EditUserProfile extends Component
{

    constructor(props) {
        super(props);
        this.state = {
          fisrtName:'',
          lastName:'',
          email:'alankar.saini@gmail.com',
          gender:'',
          dateOfBirth:'',
          location:'',
          selectedOption:'',
          isLoading:false
        }
    }

    static navigationOptions = ({navigation}) => {
        return {
        header: <CustomHeader this navigation={navigation} />
        };
        };

    render()
    {

        var d = new Date();
        var pastYear = d.getFullYear() - 18;
         d.setFullYear(pastYear);
        var dt = d.toString();
        let finalDate = Moment(dt).format('MMM DD, YYYY');


        return (
                <KeyboardAvoidingView style = {styles.keyBoardAvoidingViewContainer} behavior = 'padding' enabled >
                    <ScrollView>
                        <View style = {styles.inputFieldsContainerView} >

                            {/*First Name*/}
                            <View style={styles.sectionStyle}>
                                <Image style={styles.inputFieldIcon} source={Images.signUpIcUserDisable}/>
                                <View style = {{flex: 1}}>
                                    <Item floatingLabel style={styles.formElements}>
                                        <Label style={styles.inputLabelText}>First Name</Label>
                                         <Input style={styles.inputText} onSubmitEditing={this._onPress} keyboardType='name-phone-pad' autoCorrect = {false} value={this.state.fisrtName} onChangeText={(fisrtName) => this.setState({fisrtName})}/>
                                    </Item>
                                </View>
                            </View>

                            {/*Last Name*/}

                            <View style={[styles.sectionStyle, {marginBottom: -1}]}>
                                <Image style={styles.inputFieldIcon} source={Images.signUpIcUserDisable}/>
                                <View style = {{flex: 1}}>
                                    <Item floatingLabel style={styles.formElements}>
                                        <Label style={styles.inputLabelText}>Last Name</Label>
                                         <Input style={styles.inputText} onSubmitEditing={this._onPress} keyboardType='name-phone-pad' autoCorrect = {false} value={this.state.lastName} onChangeText={(lastName) => this.setState({lastName})}/>
                                    </Item>
                                </View>
                            </View>
                        </View>

                            {/*Email not editable*/}
                            <View style={[styles.sectionStyle, {backgroundColor: '#F2F2F2', height: 65,margin: 0}]}>
                                <Image style={[styles.inputFieldIcon, {marginLeft: 30}]} source={Images.signUpIcUserEmailAddressDisable}/>
                                <View style = {{flex: 1}}>
                                    <Label style={[styles.inputLabelText, {color: "#333333", marginRight:30, fontSize: 20  }]} value={this.state.email}>{this.state.email}</Label>
                                   {/* <Item floatingLabel style={styles.formElements} >
                                        <Label style={styles.inputLabelText}>Email</Label>
                                         <Input style={styles.inputText} onSubmitEditing={this._onPress} keyboardType='name-phone-pad' autoCorrect = {false} value={this.state.lastName} onChangeText={(lastName) => this.setState({lastName})}/>
        </Item> */}
                                </View>
                            </View>

                            <View style = {styles.inputFieldsContainerView} >
                            {/*Gender*/}
                            <View style={styles.sectionStyle}>
                                <Image style={styles.inputFieldIcon} source={Images.signUpIcUserGenderDisable}/>
                                <View style = {{flex: 1}}>
                                    <Item floatingLabel style={styles.formElements}>
                                        <Label style={styles.inputLabelText}>Gender</Label>
                                         <Input style={styles.inputText} onSubmitEditing={this._onPress}  disabled autoCorrect = {false} value={this.state.gender} onChangeText={(gender) => this.setState({gender})}/>
                                    </Item>
                                </View>
                                <View style = {[styles.sectionStyle, {position: 'absolute', width: '100%', top: 0, left: 0, borderBottomWidth: 0, backgroundColor: 'transparent'}]}>
                                    <View style={[styles.formElements,{width: ('100%')} ]}>
                                        <Text

                                                style={{ color: '#006381'  , width: '100%', height: 50, alignItems: 'center', fontFamily:'SourceSansPro-Regular'  }}
                                                onPress={() => { this.refs.picker.show(); }}>   </Text>
                                    </View>
                                </View>



                                <SimplePicker
                                            ref={'picker'}
                                            options={optionsForGenderPicker}
                                            onSubmit={(option) => {
                                                this.setState({
                                                gender: option,

                                                });
                                            }}
/>

                            </View>

                            {/*Date of Birth*/}
                            <View style={styles.sectionStyle}>
                                <Image style={styles.inputFieldIcon} source={Images.signUpIcUserDateOfBirthDisable}/>
                                <View style = {{flex: 1}}>
                                    <Item floatingLabel style={styles.formElements}>
                                        <Label style={styles.inputLabelText}>Date of Birth</Label>
                                         <Input style={styles.inpttext} disabled autoCorrect = {false} value={this.state.dateOfBirth}/>
                                    </Item>
                                </View>
                                <View style = {[styles.sectionStyle, {position: 'absolute', width: '100%', top: 0, left: 0, borderBottomWidth: 0, backgroundColor: 'transparent'}]}>
              <View style={[styles.formElements,{width: ('100%')} ]}>
              <DatePicker
                    style={{ width: '100%' }}
                    date={this.state.dateOfBirth}
                    mode="date"
                    placeholder=""
                    format="MMM DD, YYYY"
                    //minDate="2016-05-01"
                    maxDate={finalDate}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"


                    customStyles = {{
                      width:'100%', backgroundColor:'transparent',
                                      dateIcon: {
                                        position: 'absolute',
                                        left: -15,
                                        top: 15,
                                        marginLeft: 0,
                                        width: 20,
                                        height: 20
                                      },
                                      dateInput: {
                                        marginLeft: 0,
                                        borderWidth: 0,
                                        paddingTop: 8
                                      },
                                      dateText:{
                                        color: 'transparent',
                                        fontSize: 17,
                                      },
                                      placeholderText: {
                                          fontSize: 17,
                                          color: '#999999'
                                      }

                    }}



                    showIcon={false}
                    onDateChange={(date) => {this.setState({dateOfBirth: ''}), this.setState({dateOfBirth: date})}}
                />
                </View>
               </View>
                            </View>

                            {/*Location*/}
                            <View style={styles.sectionStyle}>
                                <Image style={styles.inputFieldIcon} source={Images.signUpIcUserLocationDisable}/>
                                <View style = {{flex: 1}}>
                                    <Item floatingLabel style={styles.formElements}>
                                        <Label style={styles.inputLabelText}>Location</Label>
                                         <Input style={styles.inputText} onSubmitEditing={this._onPress} keyboardType='name-phone-pad' autoCorrect = {false} value={this.state.location} onChangeText={(location) => this.setState({location})}/>
                                    </Item>
                                </View>
                            </View>


                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>

        );
    }
}





const styles = StyleSheet.create({

    formElements:
    {

    },

    keyBoardAvoidingViewContainer:
    {
        flex: 1,
        backgroundColor: '#FFF',
        paddingTop: 10,
    },

    inputFieldsContainerView:
    {
        marginHorizontal: 20
    },

    sectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: .0,
        //borderColor: '#000',
        //height: 40,
        //borderRadius: 5 ,
        margin: 10
    },

    inputFieldIcon:
    {
        padding: 0,

        height: 25,
        width: 25,
        resizeMode : 'center',
        alignItems: 'center',
    },
  //lbltxt
    inputLabelText:
    {
        color: '#808080',


        fontSize: 12,
        //fontFamily:'SourceSansPro-Bold',
        marginLeft: 5
    },
    //inpttext
    inputText:
    {
        color: '#333333',

        fontSize: 20,
        marginBottom: 5,
    },


});
