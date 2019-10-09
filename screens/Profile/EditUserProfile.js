import React, { Component } from 'react';
import {StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, Image, Platform, TouchableOpacity,TextInput, Dimensions} from 'react-native';
import {Label,Input, Item,Picker,Icon} from 'native-base';
import DatePicker from 'react-native-datepicker';

import SimplePicker from 'react-native-simple-picker';

import {Images} from '../../Themes';
import AppStyles from '../../Themes/AppStyles';
import IMAGES  from '../../Constants/Images';

import Moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import {getItem,saveItem} from '../../lib/Session';
import PreferenceConstant from '../../Preferences/PreferenceConstant';

import WSManager  from '../../Networking/WSManager/';
import * as URLConstants from '../../Networking/URLConstants/';
import Toaster  from '../../Utils/Toaster';
import Loader from '../../Utils/Loader/';
import Utility from '../../Utils/Utility/';
import ConstantLib  from '../../Constants/ConstantLib/';
import { convertToStringCapitalizedForm, convertStringToLowerCase}  from '../../Constants/Methods';
import DrawerContent from '../Drawer/DrawerContent';
import BragSpaceHomeScreen from '../Lobby/BragSpaceHomeScreen';
import ProfileScreen from '../Profile/ProfileScreen';
import UserProfileBasicInfo from '../Profile/UserProfileBasicInfo';
import {TextInputLayout} from 'rn-textinputlayout';



//Local Files

const optionsForGenderPicker = ['Male', 'Female'];


const WW = Dimensions.get('window').width;

const CustomHeader = ({navigation}) => (
    <LinearGradient
          start={{x: 0.6, y: 0}} end={{x: 2.5, y: 1.5}}
          locations={[0.0, 0.4]}
          colors={['#1B75BC', '#9AD8DD']}
          style={{paddingTop: Platform.OS === "ios" ? 30 : 20}}
          >

  <View style={{ flexDirection:'row',padding:15,  alignItems:'center'}}>
  <TouchableOpacity onPress={()=> take.goBackP()} style={{flex:1,justifyContent:"flex-start"}} transparent>
  <Image source={IMAGES.closeBack} />
  </TouchableOpacity>
  <View style={{flex:8,justifyContent:'flex-start'}}>
            <Text   style={AppStyles.header_title}>Edit Profile</Text>
  </View>
  <TouchableOpacity onPress={()=> take.setProfile()} style={{flex:1,alignItems:"flex-end"}} transparent>
  <Text style={{color: '#fff', fontSize: 13 ,fontFamily:'SourceSansPro-Bold',textAlign:'center'}}>Done</Text>
  </TouchableOpacity>
  </View>
    </LinearGradient>
  );

var take


export default class EditUserProfile extends Component
{

    constructor(props) {
        super(props);
        this.state = {
          userFirstName:'',
          userLastName:'',
          userEmail:'',
          userGender:'',
          userDateOfBirth:'',
          location:'',
          selectedOption:'',
          isLoading:false
        }
    }

    // componentDidMount()
    // {
    //     getItem(PreferenceConstant.FIRST_NAME).then((value)=>{
    //         this.setState({userFirstName: value })
    //     }),
    //     getItem(PreferenceConstant.LAST_NAME).then((value)=>{
    //         this.setState({userLastName: value })
    //     }),
    //     getItem(PreferenceConstant.EMAIL).then((value)=>{
    //         this.setState({userEmail: value })
    //     }),
    //     getItem(PreferenceConstant.GENDER).then((value)=>{
    //         this.setState({userGender: value })
    //     }),
    //     getItem(PreferenceConstant.DOB).then((value)=>{
    //         this.setState({userDateOfBirth: value })
    //     })


    // }


    componentDidMount()
    {

        if (PreferenceConstant.FIRST_NAME != null)
        {
            getItem(PreferenceConstant.FIRST_NAME).then((value)=>{
                this.setState({userFirstName: (value != null && value != 'null' && value != '' ? value : '') })
            })
        }
        if (PreferenceConstant.LAST_NAME != null)
        {
            getItem(PreferenceConstant.LAST_NAME).then((value)=>{
                this.setState({userLastName: (value != null && value != 'null' && value != '' ? value : '') })
            })
        }
        if (PreferenceConstant.EMAIL != null)
        {
            getItem(PreferenceConstant.EMAIL).then((value)=>{
                this.setState({userEmail: (value != null && value != 'null' && value != '' ? value : '') })
            })
        }
        if (PreferenceConstant.GENDER != null)
        {
            getItem(PreferenceConstant.GENDER).then((value)=>{
                this.setState({userGender: (value != null && value != 'null' && value != '' ? convertToStringCapitalizedForm(value) : 'Male') })
            })
        }
        if (PreferenceConstant.DOB != null)
        {
            getItem(PreferenceConstant.DOB).then((value)=>{
                this.setState({userDateOfBirth: (value != null && value != 'null' && value != '' ? value : '') })
            })
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
        take = this;

        return (
                    <ScrollView>
                    <Loader loading={this.state.isLoading} />

                    <KeyboardAvoidingView style = {styles.keyBoardAvoidingViewContainer} behavior = 'padding' enabled >

                        <View style = {styles.inputFieldsContainerView} >

                            {/*First Name*/}
                            <View style={styles.sectionStyle}>
                                <Image style={styles.inputFieldIcon} source={Images.signUpIcUserDisable}/>
                                <View style = {{flex: 1}}>
                                   
                                <TextInputLayout
                    style={styles.inputLayout}
                 >
                    <TextInput
                        style={styles.textInput}
                        placeholder={'First Name'}
                        onSubmitEditing={this._onPress} keyboardType='name-phone-pad' autoCorrect = {false} value={this.state.userFirstName} onChangeText={(userFirstName) => this.setState({userFirstName})}

                    />
                </TextInputLayout>
                                    {/* <Item floatingLabel style={styles.formElements}>
                                        <Label style={styles.inputLabelText}>First Name</Label>
                                         <Input style={styles.inputText} onSubmitEditing={this._onPress} keyboardType='name-phone-pad' autoCorrect = {false} value={this.state.userFirstName} onChangeText={(userFirstName) => this.setState({userFirstName})}/>
                                    </Item> */}
                                </View>
                            </View>

                            {/*Last Name*/}

                            <View style={[styles.sectionStyle, {marginBottom: -1}]}>
                                <Image style={styles.inputFieldIcon} source={Images.signUpIcUserDisable}/>
                                <View style = {{flex: 1}}>
                                <TextInputLayout
                    style={styles.inputLayout}
                 >
                                          <TextInput    placeholder={'Last Name'} style={styles.textInput} onSubmitEditing={this._onPress} keyboardType='name-phone-pad' autoCorrect = {false} value={this.state.userLastName} onChangeText={(userLastName) => this.setState({userLastName})}/>
                                    </TextInputLayout>
                                </View>
                            </View>
                        </View>

                            {/*Email not editable*/}
                            <View style={[styles.sectionStyle, {backgroundColor: '#F2F2F2', height: 65,margin: 0}]}>
                                <Image style={[styles.inputFieldIcon, {marginLeft: 30}]} source={Images.signUpIcUserEmailAddressDisable}/>
                                <View style = {{flex: 1}}>
                                    <Label style={[styles.inputLabelText, {color: "#333333", marginRight:30, fontSize: 20  }]} value={this.state.userEmail}>{this.state.userEmail}</Label>
                                   {/* <Item floatingLabel style={styles.formElements} >
                                        <Label style={styles.inputLabelText}>Email</Label>
                                         <Input style={styles.inputText} onSubmitEditing={this._onPress} keyboardType='name-phone-pad' autoCorrect = {false} value={this.state.lastName} onChangeText={(lastName) => this.setState({lastName})}/>
        </Item> */}
                                </View>
                            </View>

                            <View style = {styles.inputFieldsContainerView} >
                            {/*Gender*/}
                            <View style={[styles.sectionStyle]}>
                                <Image style={styles.inputFieldIcon} source={Images.signUpIcUserGenderDisable}/>
                                <View style = {{flex: 1}}>
                                <Picker
                                note
                                iosIcon={<View style={{ position: 'absolute', left: 0, width: WW - 65, height: 40, justifyContent: 'center', alignItems: 'flex-end', marginRight: 0, }}><Icon  name="ios-arrow-down-outline" /></View>}
                                mode="dropdown"
                                textStyle = {{color:'#000000'}}
                                selectedValue={this.state.userGender}
                                onValueChange={this.onValueChangeForGender.bind(this)}>
                                <Picker.Item label="Male" value="Male" />
                                <Picker.Item label="Female" value="Female" />
                                </Picker>
                                <View style={{
        marginTop:5,
        marginRight:10,
        backgroundColor:'#DDDDDD',
        height:1,
        width:WW - 80,
      }} />
              
                                </View>


                            </View>

                            {/*Date of Birth*/}
                            <View style={styles.sectionStyle}>
                                <Image style={styles.inputFieldIcon} source={Images.signUpIcUserDateOfBirthDisable}/>
                                <View style = {{flex: 1}}>
                                    <View floatingLabel style={styles.formElements}>
                                        <Label style={styles.inputLabelText}>Date of Birth</Label>
                                         <Input style={styles.inpttext} disabled autoCorrect = {false} value={this.state.userDateOfBirth}/>
                                    </View>
                                </View>
                                <View style = {[styles.sectionStyle, {position: 'absolute', width: '100%', top: 0, left: 0, borderBottomWidth: 0, backgroundColor: 'transparent'}]}>
              <View style={[styles.formElements,{width: ('100%')} ]}>
              <DatePicker
                    style={{ width: '100%' }}
                    date={this.state.userDateOfBirth}
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
                    onDateChange={(date) => {this.setState({userDateOfBirth: ''}), this.setState({userDateOfBirth: date})}}
                />
                </View>
               </View>


                            </View>




                        </View>
                        </KeyboardAvoidingView>

                    </ScrollView>

        );
    }

    onValueChangeForGender(value){
    this.setState({userGender:value})
    }




goBackP()
{
WSManager.goBack();

}


    setProfile = () => {
        if(this.validate())
       {
         this.setState({isLoading: true})

         console.log('Pehle: ',this.state.userGender)
         const params = {
              first_name:this.state.userFirstName,
              last_name:this.state.userLastName,
              email:this.state.userEmail,
              dob:this.state.userDateOfBirth,
              gender: convertStringToLowerCase(this.state.userGender),
              //password:"",
              is_edit_profile: 1
              };
       WSManager.postData(URLConstants.UPDATE_PROFILE, params)
          .then(response => {

           
            console.log('Success')

            var responseData = response.data.data.user_profile;
            console.log(JSON.stringify(responseData))
            saveItem(PreferenceConstant.USER_ID, ''+responseData.user_id);
            saveItem(PreferenceConstant.USER_UNIQUE_ID, ''+responseData.user_unique_id);
            // saveItem(PreferenceConstant.USER_NAME, ''+responseData.user_name);
            // saveItem(PreferenceConstant.USER_IMAGE, ''+responseData.image);
            saveItem(PreferenceConstant.EMAIL, ''+responseData.email);
            saveItem(PreferenceConstant.DOB, ''+responseData.dob);
            saveItem(PreferenceConstant.EMAIL, ''+responseData.email);
            saveItem(PreferenceConstant.FIRST_NAME, ''+responseData.first_name);
            saveItem(PreferenceConstant.LAST_NAME, ''+responseData.last_name);
            saveItem(PreferenceConstant.GENDER, ''+responseData.gender);
            saveItem(PreferenceConstant.PHONE_NO, ''+responseData.phone_no);
            ConstantLib.PROFILE_STATUS = '1';
             saveItem(PreferenceConstant.PROFILE_STATUS, ''+ConstantLib.PROFILE_STATUS);
             saveItem(PreferenceConstant.BANK_ACCOUNT_SET, '0');
             
             //saveItem(PreferenceConstant.GENDER, 'male');
            // const resetAction = StackActions.reset({
            // index: 0,
            // key:null,
            // actions: [
            // NavigationActions.navigate({ routeName: 'Conference'}),
            // ]
            // });
            
            this.setState({isLoading: false}, function()
        {
            setTimeout(() => {
                    DrawerContent.updateUserProfile()
                    BragSpaceHomeScreen.updateUserProfile()    
                    ProfileScreen.update()
                    UserProfileBasicInfo.updateData()
                this.props.navigation.goBack();//dispatch(resetAction);
            }, 200);
        })
            




          })
         .catch(error => {
           this.setState({isLoading: false}, function()
        {
            setTimeout(() => {
                //Toaster.showLongToast(JSON.stringify(error.response) );
            }, 200);
        })
           console.log("error ka msg: ",error.response)
           
           return error;
         });
       }

       }

    validate =() =>{

         console.log(this.state.userLastName);
        if (this.state.userFirstName==null || this.state.userFirstName.trim() == "") {
            Toaster.showLongToast('Please enter first name.')
            return false;
        }
        else if (this.state.userFirstName.trim().length < 2)
        {
            Platform.OS == "ios" ? alert ('Please enter atleast two letters for first name.') : Toaster.showLongToast('Please enter atleast two letters for first name.')
            return false
        }
        else if (!this.state.userFirstName.match(/^[a-zA-Z]+$/))
        {
            Platform.OS == "ios" ? alert ('Please enter only letters for first name.') : Toaster.showLongToast('Please enter only letters for first name.')
            return false
        }
        else if (this.state.userLastName==null || this.state.userLastName.trim() == "") {
            Toaster.showLongToast('Please enter last name.')
            return false;
        }
        else if (!this.state.userLastName.match(/^[a-zA-Z]+$/))
        {
            Platform.OS == "ios" ? alert ('Please enter only letters for last name.') : Toaster.showLongToast('Please enter only letters for last name.')
            return false
        }
        else if (this.state.userEmail==null || this.state.userEmail.trim() == "") {
            Toaster.showLongToast('Please enter email.')
            return false;
        }
      else  if ( (this.state.userGender != null) ? this.state.userGender.trim() == "" : true) {
            Toaster.showLongToast('Please select gender.')
            return false;
        }
        else  if (this.state.userDateOfBirth==null || this.state.userDateOfBirth.trim() == "") {
              Toaster.showLongToast('Please enter your date of birth.')
              return false;
          }

        return true;
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
        backgroundColor: '#FFFFFF'
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
        borderWidth: 0.0,
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
    container: {
        flex: 1,
        paddingTop: 100
    },
    textInput: {
        fontSize: 16,
        height: 40
    },
    inputLayout: {
        marginTop: 4,
        marginHorizontal: 36
    }


});
