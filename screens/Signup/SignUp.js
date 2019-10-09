import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, ScrollView, ActivityIndicator, Dimensions, Platform, StatusBar } from 'react-native';
import { getItem, saveItem } from '../../lib/Session';
import { Item, Input, Label, Button } from 'native-base';
import DatePicker from 'react-native-datepicker';
import md5 from 'react-native-md5';
import { showMessage } from "react-native-flash-message";
import LinearGradient from 'react-native-linear-gradient';
import Moment from 'moment';
import { AppStyles, Images } from '../../Themes/';

import * as URLConstants from '../../Networking/URLConstants/';
import Toaster from '../../Utils/Toaster';
import WSManager from '../../Networking/WSManager/';
import * as AppPreferences from '../../Preferences/AppPreferences/';
import PreferenceConstant from '../../Preferences/PreferenceConstant';
import { StackActions, NavigationActions, Header, SafeAreaView } from 'react-navigation';
import ConstantLib from '../../Constants/ConstantLib/';
import Conference from '../Conference/Conference';
import Utility from '../../Utils/Utility/';
import Loader from '../../Utils/Loader/';
import IMAGES from '../../Constants/Images/';
import {convertStringToLowerCase} from '../../Constants/Methods';
import axios from 'axios';
import Ripple from 'react-native-material-ripple';

//var ImagePicker = require('react-native-image-picker');
import ImagePicker from 'react-native-image-picker';
const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;



const CustomHeader = ({ navigation }) => (
  <SafeAreaView forceInset={{ bottom: 'never', top: 'never' }}>
  <LinearGradient
    start={{ x: 0.6, y: 0 }} end={{ x: 2.5, y: 1.5 }}
    locations={[0.0, 0.4]}
    colors={['#1B75BC', '#9AD8DD']}
    style={{ paddingTop: Platform.OS === "ios" ? 30 : 20 }}
  >

    <View style={{ flexDirection: 'row', padding: 15, justifyContent: 'center' }}>
      <Text style={{
        fontSize: 14,
        color: '#fff',
        textAlign: 'center', alignItems: 'center',
        fontFamily:'SourceSansPro-Regular'
      }}>Set Your Profile</Text>

    </View>
  </LinearGradient>
  </SafeAreaView>
);
var mContext = null;
const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[AppStyles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);




export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      dateOfBirth: '',
      referralCode:'',
      loading: false,
      isLoading: false,
      imagePath: '',
      serverImagePath: '',
      imageMimeType:'',
      imageName: '',
      showPassword:true,

    }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      header: <CustomHeader this navigation={navigation} />
    };
  };


  componentDidMount() {
    mContext = this;
    getItem(PreferenceConstant.SESSION_KEY).then((value) => {
      ConstantLib.SESSION_KEY = value;
      console.log('SS ' + ConstantLib.SESSION_KEY)

    });
  }



  _onPress = (event) => {

    console.log(this.state.email)
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    console.log(re.test(this.state.email))
    if (!this.state.email || !re.test(this.state.email)) {
      showMessage({
        message: 'Please enter a valid email address',
        type: 'danger',
        autoHide: true,
        duration: 5000,
        backgroundColor: 'rgba(217,83,79,0.8)'
      });
      return false;
    }

    if (!this.state.password) {
      showMessage({
        message: 'Please enter password',
        type: 'danger',
        autoHide: true,
        duration: 5000,
        backgroundColor: 'rgba(217,83,79,0.8)'
      });
      return false;
    }

    if (!this.state.phone_no) {
      showMessage({
        message: 'Please enter phone number',
        type: 'danger',
        autoHide: true,
        duration: 5000,
        backgroundColor: 'rgba(217,83,79,0.8)'
      });
      return false;
    }

    this.setState({
      isLoading: true
    });

    fetch('http://vfantasy.vinfotech.org/user/auth/signup', {
      body: JSON.stringify({ email: this.state.email, password: md5.hex_md5(this.state.password), device_id: '', device_type: 3, phone_no: this.state.phone_no, referral_code: this.state.referral_code }),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    })
      .then(function (response) {
        var contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return response.json();
        }
        // throw new TypeError('Oops, we haven't got JSON!');
      })
      .then((responseJson) => {
        console.log(responseJson);
        if (responseJson.response_code == 200) {
          this.setState({
            email: '',
            password: '',
            referral_code: '',
            phone_no: ''
          });
          showMessage({
            message: responseJson.message,
            type: 'success',
            autoHide: true,
            duration: 5000
          });
          saveItem('session_key', responseJson.data.session_key);
          // saveItem('user_profile', responseJson.data.user_profile);
          this.props.navigation.navigate('Lobby');
        }
        if (responseJson.response_code == 500) {
          if (responseJson.error && responseJson.error.email) {
            showMessage({
              message: responseJson.error.email,
              type: 'danger',
              autoHide: true,
              duration: 5000,
              backgroundColor: 'rgba(217,83,79,0.8)'
            });
          }
          else if (responseJson.error && responseJson.error.phone_no) {
            showMessage({
              message: responseJson.error.phone_no,
              type: 'danger',
              autoHide: true,
              duration: 5000,
              backgroundColor: 'rgba(217,83,79,0.8)'
            });
          }
          else if (responseJson.error && responseJson.error.password) {
            showMessage({
              message: responseJson.error.password,
              type: 'danger',
              autoHide: true,
              duration: 5000,
              backgroundColor: 'rgba(217,83,79,0.8)'
            });
          }
          else if (responseJson.error && responseJson.error.referral_code) {
            showMessage({
              message: responseJson.error.referral_code,
              type: 'danger',
              autoHide: true,
              duration: 5000,
              backgroundColor: 'rgba(217,83,79,0.8)'
            });
          }
        }
        this.setState({
          isLoading: false,
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({
          isLoading: false
        });
      });
  }






  // pickImage = () => {
  //   const options = {
  //     maxImagesCount: 1,      // Max number of images user can select; if maxImagesCount == 1, Single mode (i.e. Tap to Select & Finish) will be activated.
  //     selectedPaths: [
  //     ]                       // Currently selected paths, must be from result of previous calls. Empty array allowed.
  //   };
  //   ImagePicker.launchImageGallery(options).then((newSelectedPaths) => {
  //     console.log(newSelectedPaths[0]);

  //     this.setState({ imagePath: newSelectedPaths[0] });
  //     this.uploadImage();
  //   });

  // }
  pickImage = () => {
    const options = {
      maxImagesCount: 1,      // Max number of images user can select; if maxImagesCount == 1, Single mode (i.e. Tap to Select & Finish) will be activated.
      allowsEditing: true,
        quality:0.5,
      selectedPaths: [
      ]                       // Currently selected paths, must be from result of previous calls. Empty array allowed.
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log(response);

      if(response.fileName!==undefined)
      {
       fileType = convertStringToLowerCase(response.fileName.split('.').pop())
       this.setState({imageName: 'abc.'+fileType})
       console.log('Image ka type: ',fileType, response.fileName, response.uri)

       if (fileType == 'jpg' || fileType == 'jpeg')
       {
         this.setState({imageMimeType: 'image/jpg'})

       }
       else if (fileType == 'png')
       {
         this.setState({imageMimeType: 'image/png'})

       }
       else if (fileType == 'gif')
       {
         this.setState({imageMimeType: 'image/gif'})

       }

       else if (fileType == 'bmp')
       {
         this.setState({imageMimeType: 'image/bmp'})

       }
       else
       {
         this.setState({imageMimeType: 'image/jpg'})
       }
       this.setState({ imagePath: response.uri });
       this.uploadImage();
     }
     });

  }

  toggleSwitch() {
     this.setState({ showPassword: !this.state.showPassword });
   }


  render() {
    mContext = this;
    var d = new Date();
    var pastYear = d.getFullYear() - 18;
    d.setFullYear(pastYear);
    var dt = d.toString();
    let finalDate = Moment(dt).format('MMM DD, YYYY')

    return (
      <SafeAreaView style={[{ flex: 1,
        backgroundColor:'#FAFAFA',}]}>
          <View style={{ backgroundColor: '#FFFFFF', }} >
            <MyStatusBar backgroundColor="rgba(0,0,0,0)" barStyle="light-content" />


            <Loader loading={this.state.loading} />

            <ScrollView keyboardShouldPersistTaps={'handled'} >

            {/* <KeyboardAvoidingView style={styles.container} behavior='padding' enabled > */}

              <View>


                <View style={styles.grid}>
                <TouchableOpacity onPress={this.pickImage}>
                  <Image style={styles.profileImageIcon} source={this.state.imagePath === '' ? Images.ic_default_camera : { uri: this.state.imagePath }} />
                  </TouchableOpacity>
                </View>

                <View style={styles.formfield}>

                  {/* First Name*/}
                  <View style={styles.sectionStyle}>
                    <Image style={styles.inputFieldIcon} source={(this.state.firstName != '')?(IMAGES.ic_user_enable):(IMAGES.ic_user_disable)} />
                    <View style={{ flex: 1 }}>
                      <Item floatingLabel style={styles.formElements}>
                        <Label style={styles.lbltxt}>First Name</Label>
                        <Input style={styles.inpttext} onSubmitEditing={this._onPress} keyboardType='name-phone-pad' autoCorrect={false} value={this.state.firstName} onChangeText={(firstName) => this.setState({ firstName })} />
                      </Item>
                    </View>
                  </View>


                  {/* Last Name*/}
                  <View style={styles.sectionStyle}>
                    <Image style={styles.inputFieldIcon} source={(this.state.lastName != '')?(IMAGES.ic_user_enable):(IMAGES.ic_user_disable)} />
                    <View style={{ flex: 1 }}>
                      <Item floatingLabel style={styles.formElements}>
                        <Label style={styles.lbltxt}>Last Name</Label>
                        <Input style={styles.inpttext} onSubmitEditing={this._onPress} keyboardType='name-phone-pad' autoCorrect={false} value={this.state.lastName} onChangeText={(lastName) => this.setState({ lastName })} />
                      </Item>
                    </View>
                  </View>

                {/* Email Address*/}
                <View style={styles.sectionStyle}>
                    <Image style={styles.inputFieldIcon} source={(this.state.email != '')?(IMAGES.ic_mail_enable):(IMAGES.ic_mail_disable)} />
                    <View style={{ flex: 1 }}>
                      <Item floatingLabel style={styles.formElements}>
                        <Label style={styles.lbltxt}>Email Address</Label>
                        <Input style={styles.inpttext} onEndEditing={this._onPress} keyboardType='email-address' autoCorrect={false} value={this.state.email} onChangeText={(email) => this.setState({ email })} />
                      </Item>
                    </View>
                  </View>


                  {/* Password*/}
                  <View style={styles.sectionStyle}>
                    <Image style={styles.inputFieldIcon} source={(this.state.password != '')?(IMAGES.ic_password_enable):(IMAGES.ic_password_disable)} />
                    <View style={{ flex: 1 }}>
                      <Item floatingLabel style={styles.formElements}>
                        <Label style={styles.lbltxt}>Password</Label>
                        <Input secureTextEntry={this.state.showPassword} style={styles.inpttext} onSubmitEditing={this._onPress} keyboardType='default' autoCorrect={false} value={this.state.password} onChangeText={(password) => this.setState({ password })} />

                      </Item>
                    </View>
                    <Ripple onPress={() => this.toggleSwitch()} style={{ width: 24, height: 14 ,marginRight:5 }}>
                      <Image source={this.state.showPassword===true?IMAGES.eye_d:IMAGES.eye} style={{ width: 24, height: 14 }}  />
                    </Ripple>
                  </View>






                  {/* Date of Birth*/}
                  <View style={styles.sectionStyle}>
                    <Image style={styles.inputFieldIcon} source={(this.state.dateOfBirth != '')?(IMAGES.ic_dob_enable):(IMAGES.ic_dob_disable)} />
                    <View style={{ flex: 1 }}>
                      <Item floatingLabel style={styles.formElements}>
                        <Label style={styles.lbltxt}>Date of Birth</Label>
                        <Input style={styles.inpttext} disabled autoCorrect={false} value={this.state.dateOfBirth} />
                      </Item>
                    </View>

                    <View style={[styles.sectionStyle, { position: 'absolute', width: '100%', top: 6, left: 0, borderBottomWidth: 0, backgroundColor: 'transparent' }]}>
                      <View style={[styles.formElements, { width: ('100%') }]}>
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
                          customStyles={{
                            width: '100%', backgroundColor: 'transparent',
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
                            dateText: {
                              color: 'transparent',
                              fontSize: 17,
                            },
                            placeholderText: {
                              fontSize: 17,
                              color: '#999999'
                            }

                          }}



                          showIcon={false}

                          onDateChange={(date) => { this.setState({ dateOfBirth: '' }), this.setState({ dateOfBirth: date }) }}
                        />
                      </View>
                    </View>

                  </View>

                {/* Referrral code*/}
                  <View style={styles.sectionStyle}>
                    <Image style={styles.inputFieldIcon} source={IMAGES.ic_referral} />
                    <View style={{ flex: 1 }}>
                      <Item floatingLabel style={styles.formElements}>
                        <Label style={styles.lbltxt}>Referral Code(If you have any)</Label>
                        <Input secureTextEntry={false} style={styles.inpttext} onSubmitEditing={this._onPress} keyboardType='default' autoCorrect={false} value={this.state.referralCode} onChangeText={(referralCode) => this.setState({ referralCode })} />
                      </Item>
                    </View>
                  </View>


                  <LinearGradient
                    start={{ x: 0, y: 0 }} end={{ x: 3.5, y: 0.2 }}
                    locations={[0.0, 0.4]}
                    colors={['#1B75BC', '#9AD8DD']}
                    style={{
                      margin: 10,
                      borderRadius: 4,
                      marginBottom: 20
                    }}
                  >
                    <Button block transparent onPress={() => this.setProfile()}><Text style={styles.buttonDefaultTxt}> NEXT </Text></Button>
                  </LinearGradient>

                </View>
              </View>
              {/* </KeyboardAvoidingView> */}
             </ScrollView>
          </View>
      </SafeAreaView>
    );
  }


  setProfile = () => {

    if (this.validate()) {
      this.setState({ loading: true })
      const params = {
        first_name: this.state.firstName,
        last_name: this.state.lastName,
        email: this.state.email,
        dob: this.state.dateOfBirth,
        image: this.state.serverImagePath,
        password: Utility.getMD5(this.state.password),
        referral_code: this.state.referralCode,
      };

      console.log('setProfile params: ',params)
      WSManager.postData(URLConstants.UPDATE_PROFILE, params)
        .then(response => {

          this.setState({ loading: false })

          var responseData = response.data.data.user_profile;
          console.log('Set Profile response: ',JSON.stringify(responseData))

          saveItem(PreferenceConstant.USER_ID, '' + responseData.user_id);
          saveItem(PreferenceConstant.USER_UNIQUE_ID, '' + responseData.user_unique_id);
          saveItem(PreferenceConstant.USER_NAME, '' + responseData.user_name);
          saveItem(PreferenceConstant.USER_IMAGE, '' + responseData.image);
          saveItem(PreferenceConstant.EMAIL, '' + responseData.email);
          saveItem(PreferenceConstant.DOB, '' + responseData.dob);
          saveItem(PreferenceConstant.EMAIL, '' + responseData.email);
          saveItem(PreferenceConstant.FIRST_NAME, '' + responseData.first_name);
          saveItem(PreferenceConstant.LAST_NAME, '' + responseData.last_name);
          saveItem(PreferenceConstant.GENDER, '' + responseData.gender);
          saveItem(PreferenceConstant.PHONE_NO, '' + responseData.phone_no);


          ConstantLib.PROFILE_STATUS = '1';
          ConstantLib.FOLLOW_STATUS = '0';
          saveItem(PreferenceConstant.PROFILE_STATUS, '' + ConstantLib.PROFILE_STATUS);
          saveItem(PreferenceConstant.FOLLOW_STATUS, '' + ConstantLib.FOLLOW_STATUS);
          const resetAction = StackActions.reset({
            index: 0,
            key: null,
            actions: [
              NavigationActions.navigate({ routeName: 'Conference' }),
            ]
          });
          this.props.navigation.dispatch(resetAction);
        })
        .catch(error => {
          this.setState({ loading: false })
          Platform.OS === "ios" ? setTimeout(() => {
            alert(JSON.stringify(error.response.data.error))
          }, 500) : Toaster.showLongToast(JSON.stringify(error.response.data.error));
          return error;
        });
    }

  }

  uploadImage = async () => {
    this.setState({ loading: true })

    var url = URLConstants.UPLOAD_PROFILE_PIC;
    var photo = {
      uri: this.state.imagePath,
      type: 'image/jpg',
      name: 'IMG_20180820125057.jpg',
    };


    var data = new FormData();
    data.append("userfile", photo);
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;



    console.log('url : '+url, 'Photo Deatail: '+photo)

    xhr.open("POST", url);


    xhr.setRequestHeader("session_key", ConstantLib.SESSION_KEY);
    xhr.send(data);


    xhr.addEventListener("readystatechange", function () {
      mContext.setState({ loading: false })



      if (this.readyState === 4) {
        jsonResponse = JSON.parse(xhr.response);
        mContext.setState({ serverImagePath: jsonResponse.data.image_path })
        console.log('Image uploading response: ',jsonResponse)
        saveItem(PreferenceConstant.USER_IMAGE, jsonResponse.data.image_path);
      }
    });


  }


  fileUpload() {


    const url = URLConstants.UPLOAD_PROFILE_PIC;
    var data = new FormData();
    var photo = {
      uri: this.state.imagePath,
      type: 'image/jpg',
      name: 'IMG_20180820125057.jpg',
    };

    data.append("userfile", photo);

    axios.post(url, {
      method: "POST",
      headers: {
        'session_key': ConstantLib.SESSION_KEY
      },
      body: data,
    }).then((resp) => {
      alert(resp);
    }).catch(err => {
      alert(resp);
    });


  }





  validate = () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (this.state.firstName.trim() == "") {
      Platform.OS === "ios" ? alert('Please enter first name.') :Toaster.showLongToast('Please enter first name.')
      return false;
    }
    else if (!this.state.firstName.match(/^[a-zA-Z]+$/))
    {
      Platform.OS == "ios" ? alert ('Please enter only letters for first name.') : Toaster.showLongToast('Please enter only letters for first name.')
      return false
    }
    else if (this.state.lastName.trim() == "") {
      Platform.OS === "ios" ? alert('Please enter last name.') :Toaster.showLongToast('Please enter last name.')
      return false;
    }
    else if (!this.state.lastName.match(/^[a-zA-Z]+$/))
    {
      Platform.OS == "ios" ? alert ('Please enter only letters for last name.') : Toaster.showLongToast('Please enter only letters for last name.')
      return false
    }
    else if (this.state.password.trim() == "") {
      Platform.OS === "ios" ? alert('Please enter password.') :Toaster.showLongToast('Please enter password.')
      return false;
    }
    else if (this.state.email.trim() == "") {
      Platform.OS === "ios" ? alert('Please enter your emailId.') :Toaster.showLongToast('Please enter your emailId.')
      return false;
    }
    else if (!reg.test(this.state.email.trim())) {
      Platform.OS === "ios" ? alert('Invalid email.') :Toaster.showLongToast('Invalid email.')
        return false;
    }
    else if (this.state.dateOfBirth.trim() == "") {
      Platform.OS === "ios" ? alert('Please enter your date of birth.') :Toaster.showLongToast('Please enter your date of birth.')
      return false;
    }
    else{

    return true;
  }
  }



}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 0,
  },

  deviceWidth:
  {
    width: '100%'
  },

  profileImageIcon:
  {
    height: ScreenWidth * 0.3,
    width: ScreenWidth * 0.3,
    justifyContent: 'center',
    borderRadius: (ScreenWidth * 0.3) / 2,
    shadowColor: "#000000",
    shadowOpacity: 1.0,
    shadowOffset: { width: 20, height: 20 },
    shadowRadius: 27,
  },

  grid: {
    flexDirection: 'row',
    marginTop: 35,
    marginBottom: 28,
    justifyContent: 'center',

  },

  formfield: {
    marginHorizontal: 20,
  },
  formElements: {
    //marginBottom: 15
  },
  linktext: {
    textAlign: 'center',
    marginRight: 10,
    color: '#808080'
  },
  buttonDefault: {
    backgroundColor: '#EC8A0F',
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 4
  },
  buttonDefaultTxt: {
    color: 'white',
    fontSize: 18,
    //color:'#fff',
    fontFamily:'SourceSansPro-Bold',
  },
  dateInput: {
    borderBottomWidth: 0.5,
    width: '100%',
    marginBottom: 20,
    borderBottomColor: '#D9D5DC',
    color: '#808080',

    fontSize: 12,
    fontFamily:'SourceSansPro-Bold'
  },
  teamLogo: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    backgroundColor: '#ffffff',
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5
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
    resizeMode: 'center',
    alignItems: 'center',


  },
  lbltxt: {
    color: '#999999',
    fontSize: 16,
    fontFamily: 'SourceSansPro-Regular',
    marginLeft: 5
  },
  inpttext: {
    color: '#333333',
    fontSize: 16,
    fontFamily: 'SourceSansPro-Regular',
    marginBottom: 20,
  },
  linktxt: {
    color: '#EC8A0F',
    fontFamily:'SourceSansPro-Bold'
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
