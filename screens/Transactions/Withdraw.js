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

import TransactionScreenContainer from '../Transactions/TransactionsScreenContainer';



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
        <Text style={AppStyles.header_title}>Bank Account Details</Text>
  </View>
  {/* <TouchableOpacity onPress={()=> take.setProfile()} style={{flex:1,alignItems:"flex-end"}} transparent>
  <Text style={{color: '#fff', fontSize: 14 ,fontFamily:'SourceSansPro-Bold',textAlign:'center'}}>Done</Text>
  </TouchableOpacity> */}
  </View>
    </LinearGradient>
  );



var take

var tsc

export default class Withdraw extends Component
{

    constructor(props) {
        super(props);
        this.state = {
            amount:'',
            phone:'',
            nameAsAccount:'',
          nameAsAccount:'',
          zip:'',
          state:'',
          addressOnAccount:'',
          bankName:'',
          bankCity:'',
          bankStateID:'',
          routingNumber:'',
          accountNumber:'',
          selectedOption:'',

          stateList:[],
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
        take = this;
     
        return (
                    <ScrollView>
                    <Loader loading={this.state.isLoading} />

                    {/* <KeyboardAvoidingView style = {styles.keyBoardAvoidingViewContainer} behavior = 'padding' enabled > */}


               <View backgroundColor = "#FFFFFF">


                    

                             <View style={styles.sectionStyle}>
                                 <View style = {{flex: 1}}>                                   
                                <TextInputLayout style={styles.inputLayout}  focusColor='black'>

                          <TextInput
                        style={styles.textInput}
                        placeholder={'Name on Account'}
                        onSubmitEditing={this._onPress} keyboardType='name-phone-pad' autoCorrect = {false} value={this.state.nameAsAccount} onChangeText={(nameAsAccount) => this.setState({nameAsAccount})}

                    />
                   </TextInputLayout>
                   </View>          
                  </View>
 


       <View  style={{marginLeft:40,marginRight:40 }}>
              <Label style={styles.label_text}>{'Select State'}</Label>
              <View style={styles.DropDownStyle}>
                <Picker
                  iosIcon={<View style={{ position: 'absolute', left: 30, width: WW - 110, height: 40, justifyContent: 'center', alignItems: 'flex-end', marginRight: 0, }}><Image source={IMAGES.ic_down_aero}></Image></View>}
                  style={styles.drop_down_text}
                  note
                  mode="dropdown"
                  textStyle = {{color:'#000000', marginLeft: -10}}
                  selectedValue={this.state.selectedState}
                  onValueChange={this.onValueChangeForCity.bind(this)}>
                  {this.state.stateList.map((item, index) => {
                    return (<Item label={item.state_name} value={item.master_state_id} key={index} />)
                  })}
                </Picker>
              </View>
              <View style={styles.bottom_border} />
              
            </View>



                            <View style={[styles.sectionStyle, {marginBottom: -1}]}>
                             
                                <View style = {{flex: 1}}>
                                <TextInputLayout
                               focusColor='black'
                                      style={styles.inputLayout} >
                                          <TextInput  
                                          
                                          
                                          placeholder={'ZIP'} style={styles.textInput} onSubmitEditing={this._onPress} keyboardType='phone-pad' autoCorrect = {false} value={this.state.zip} onChangeText={(zip) => this.setState({zip})}/>
                                    </TextInputLayout>
                                </View>
                            </View>


                          <View style={[styles.sectionStyle, {marginBottom: -1}]}>
                             
                             <View style = {{flex: 1}}>
                             <TextInputLayout
                             focusColor='black'
                                  style={styles.inputLayout} >
                                       <TextInput    placeholder={'Address on Account'} style={styles.textInput} onSubmitEditing={this._onPress} keyboardType='name-phone-pad' autoCorrect = {false} value={this.state.addressOnAccount} onChangeText={(addressOnAccount) => this.setState({addressOnAccount})}/>
                                 </TextInputLayout>
                             </View>
                         </View>


                         <View style={[styles.sectionStyle, {marginBottom: -1}]}>
                             
                             <View style = {{flex: 1}}>
                             <TextInputLayout
                             focusColor='black'
                                  style={styles.inputLayout} >
                                       <TextInput    placeholder={'Bank City Name'} style={styles.textInput} onSubmitEditing={this._onPress} keyboardType='name-phone-pad' autoCorrect = {false} value={this.state.bankCity} onChangeText={(bankCity) => this.setState({bankCity})}/>
                                 </TextInputLayout>
                             </View>
                         </View>

                         <View style={[styles.sectionStyle, {marginBottom: -1}]}>
                             
                             <View style = {{flex: 1}}>
                             <TextInputLayout
                             focusColor='black'
                                  style={styles.inputLayout} >
                                       <TextInput    placeholder={'Routing Number'} style={styles.textInput} 
                                       onSubmitEditing={this._onPress} keyboardType='name-phone-pad' autoCorrect = {false} value={this.state.routingNumber} onChangeText={(routingNumber) => this.setState({routingNumber})}/>
                                 </TextInputLayout>
                             </View>
                         </View>


                            <View style={[styles.sectionStyle, {marginBottom: -1}]}>
                             
                             <View style = {{flex: 1}}>
                             <TextInputLayout
                             focusColor='black'
                                  style={styles.inputLayout} >
                                       <TextInput    placeholder={'Account Number'} style={styles.textInput} onSubmitEditing={this._onPress} keyboardType='phone-pad' autoCorrect = {false} value={this.state.accountNumber} onChangeText={(accountNumber) => this.setState({accountNumber})}/>
                                 </TextInputLayout>
                             </View>
                         </View>

                       <View style={[styles.sectionStyle, {marginBottom: -1}]}>
                             
                             <View style = {{flex: 1}}>
                             <TextInputLayout
                              focusColor='black'
                                  style={styles.inputLayout} >
                                       <TextInput    placeholder={'Bank Name'} style={styles.textInput} onSubmitEditing={this._onPress} keyboardType='name-phone-pad' autoCorrect = {false} value={this.state.bankName} onChangeText={(bankName) => this.setState({bankName})}/>
                                 </TextInputLayout>
                             </View>
                         </View>


                          <View style={[styles.sectionStyle, {marginBottom: -1}]}>
                             
                             <View style = {{flex: 1}}>
                             <TextInputLayout
                              focusColor='black'
                                  style={styles.inputLayout} >
                                       <TextInput    placeholder={'Phone'} style={styles.textInput} onSubmitEditing={this._onPress} keyboardType='phone-pad' autoCorrect = {false} value={this.state.phone} onChangeText={(phone) => this.setState({phone})}/>
                                 </TextInputLayout>
                             </View>
                         </View>



                    <View style={styles.button_container}>
                        <TouchableOpacity onPress={() => this.callApiWithdraw()}>
                         <LinearGradient start={{ x: 0.6, y: 0 }} end={{ x: 2.5, y: 1.5 }}
                           locations={[0.0, 0.4]} colors={['#1B75BC', '#9AD8DD']}style={styles.submit_button} >
                           <Text style={styles.disable_button_text}>{'Save Bank Details'}</Text>
                         </LinearGradient>
                       </TouchableOpacity>
                    </View>

                        </View>
 
                            
                        {/* </KeyboardAvoidingView> */}

                    </ScrollView>

        );
    }
 
    componentDidMount()
    {
        
        var userBankDetail = this.props.navigation.getParam('userBankDetail', '');
        tsc = this.props.navigation.getParam('tsc', '');

        
        
        if (userBankDetail != '')
        {
            this.setState({userBankDetail: userBankDetail}, () => {
                setTimeout(() => {
                    this.getStateList()
                }, 200);
            })
        } 
    }

    initailizeStates()
    {
        this.setState({nameAsAccount: this.state.userBankDetail.name_on_account}, () => {})
        this.setState({bankName: this.state.userBankDetail.bank_name}, () => {})
        this.setState({accountNumber: this.state.userBankDetail.ac_number}, () => {})
        this.setState({selectedState: this.state.userBankDetail.bank_state_id}, () => {})
        this.setState({bankCity: this.state.userBankDetail.bank_city}, () => {})
        this.setState({addressOnAccount: this.state.userBankDetail.bank_address}, () => {})
        this.setState({zip: this.state.userBankDetail.bank_zip_code}, () => {})
        this.setState({phone: this.state.userBankDetail.bank_phone_no}, () => {})
        this.setState({routingNumber: this.state.userBankDetail.routing_number}, () => {})  
    }

    getStateList()
    {
        const params = {
            master_country_id: '231'
        }

        WSManager.postData(URLConstants.GET_STATE_LIST, params)
        .then(response => {

            console.log(JSON.stringify(response.data.data))
            if (response.data.response_code == '200')
            {
                this.setState({stateList:response.data.data.state_list});
                this.initailizeStates()
            }

        })
        .catch (error => {

        })
    }



goBackP()
{
WSManager.goBack();

}

onValueChangeForCity(value) {
    this.setState({ selectedState: value})
    
  }
  callApiWithdraw()
  {
    if(this.validate())
    {
        
        const params = {
            "first_name": this.state.nameAsAccount,
            "bank_name": this.state.bankName,
            "ac_number": this.state.accountNumber,
            "bank_state_id": this.state.selectedState,
            "bank_city": this.state.bankCity,
            "bank_address": this.state.addressOnAccount,
            "bank_zip_code": this.state.zip,
            "bank_phone_no": this.state.phone,
            "routing_number": this.state.routingNumber,
        };
        
        WSManager.postData(URLConstants.UPDATE_BANK_ACCOUNT_DETAIL, params)
        .then(response => {
            console.log(JSON.stringify(response.data));
            if (response.data.response_code == '200')
            {
                Toaster.showLongToast('Bank detail added successfully');
                saveItem(PreferenceConstant.BANK_ACCOUNT_SET, '1');
                
                take.goBackP()
                tsc.getBankAccountStatus()
            }
            
        })
        .catch(error => {
            console.log(JSON.stringify(error.response.error))
        });
    
    }
  }

    validate =() =>{

         console.log(this.state.amount);
         if (this.state.nameAsAccount==null || this.state.nameAsAccount.trim() == "") {
            Toaster.showLongToast('Please enter account name.')
            return false;
        }
        else if (this.state.selectedState==null || this.state.selectedState.trim() == "") {
            Toaster.showLongToast('Please select state.')
            return false;
        }
        else if (this.state.zip==null || this.state.zip.trim() == "") {
            Toaster.showLongToast('Please enter zipCode.')
            return false;
        }
        else if (this.state.addressOnAccount==null || this.state.addressOnAccount.trim() == "") {
            Toaster.showLongToast('Please enter address.')
            return false;
        }
      else  if ( (this.state.bankCity != null) ? this.state.bankCity.trim() == "" : true) {
            Toaster.showLongToast('Please enter bank city.')
            return false;
        }
        else  if (this.state.routingNumber==null || this.state.routingNumber.trim() == "") {
              Toaster.showLongToast('Please enter routing number.')
              return false;
          }
          else  if (this.state.accountNumber==null || this.state.accountNumber.trim() == "") {
            Toaster.showLongToast('Please enter account number.')
            return false;
        }
        else  if (this.state.bankName==null || this.state.bankName.trim() == "") {
            Toaster.showLongToast('Please enter account name.')
            return false;
        }
        else  if (this.state.phone==null || this.state.phone.trim() == "") {
            Toaster.showLongToast('Please enter phone number.')
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
    },
    label_text:{
        color:'#222222',
        fontSize:17,
        marginLeft:5,
        fontFamily:'SourceSansPro-Regular',
      },
      DropDownContainerStyle:{
        marginTop:20,
      },
      DropDownStyle:{
        flexDirection:'row',
        position: 'relative',
        backgroundColor: 'transparent',
        alignItems:'center',
        marginTop:5,
      
         height:40
      },
      drop_down_text:{
        flex: 1,
        color:'#000000',
        marginLeft: 0,
        marginRight:10,
        fontSize:16,

      },
      bottom_border:{
       marginTop:5,
       backgroundColor:'#DDDDDD',
       height:1,
     },
     button_container:{
        height: 100,
        width:WW+20,
        marginLeft:-20,
        backgroundColor: '#EEEEEE',
        alignItems:'center',
        justifyContent:'center',
    },
    disable_button_text:{
        color:'white',
        fontSize:16,
        fontFamily:'SourceSansPro-Regular'
      },
      submit_button:{
        height: 40,
        width:WW-40,
        borderRadius: 5,
        alignItems:'center',
        justifyContent:'center',
    },
});
