import React, { Component } from 'react';
import {Clipboard,StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, Image, Platform, TouchableOpacity,SafeAreaView,StatusBar,Slider,ImageBackground,FlatList, Dimensions} from 'react-native';
import {Label,Radio,Picker,Icon,Item, Right} from 'native-base';
import {AppStyles, Images} from '../../Themes/';
import LinearGradient from 'react-native-linear-gradient';
import CreateBragStyle from './CreateBragStyle';

import * as String from '../../Constants/Strings/';
import IMAGES  from '../../Constants/Images/';
import Ripple from 'react-native-material-ripple';
import RadioGroup from 'react-native-radio-buttons-group';
import * as URLConstants from '../../Networking/URLConstants/';
import WSManager from '../../Networking/WSManager/';
import ConstantLib from '../../Constants/ConstantLib';
import Loader from '../../Utils/Loader/';
import Utility from '../../Utils/Utility/';
import Toaster from '../../Utils/Toaster/';
import {StackActions, NavigationActions, Header} from 'react-navigation';
import WellDoneAfterCreatingBrag from '../WellDoneAfterCreatingBrag'
import { replaceAll } from '../../Constants/Methods';
import { getItem, saveItem } from '../../lib/Session';
import PreferenceConstant from '../../Preferences/PreferenceConstant';

var mContext = null;
const WW = Dimensions.get('window').width;
export default class Invite extends Component{
  constructor(props) {
      super(props);
      this.state = {
        isLoading:false,
        refreshing: false,
        code:'3Pqf0c6szJ'
      }
  }
componentDidMount()
{
  this.setState({code:ConstantLib.ID})
}
  static navigationOptions = ({navigation}) => {
      return {
        header: <CustomHeader this navigation={navigation} />
        };
      };

      
      navigateToJoinBragScreen(contestId,contest_unique_id){
        const navigateAction = NavigationActions.navigate({
          routeName: 'BHEntries',
          index:0,
          params: {'contest_id':contestId,'contest_unique_id':contest_unique_id},
         action: NavigationActions.navigate({ routeName: 'BHEntries' })
          })
         const nav = WSManager.getTopLevelNavigator()
          nav.dispatch(navigateAction)
        
        }

      joinBragsByCode = () => {

        
          this.setState({ isLoading: true })
          const params = {
            join_code: this.state.code,
          };
          WSManager.postData(URLConstants.CHECK_ELIGIBILITY_FOR_CONTEST, params)
            .then(response => {
              console.log(response);
              this.setState({ isLoading: false })
              console.log("main data", response.data)
              console.log("sub data", response.data.data)
            this.navigateToJoinBragScreen(response.data.data.contest_id,response.data.data.contest_unique_id);
            })
            .catch(error => {
    
              console.log("error verify", JSON.stringify(error.response.data.error.join_code))
    
    
              this.setState({ isLoading: false })
              Platform.OS === "ios" ? setTimeout(() => {
                alert(JSON.stringify(error.response.data.error.join_code))
              }, 500) :Toaster.showLongToast(JSON.stringify(error.response.data.error.join_code));
              return error;
            });
        
      }

      render(){
        mContext = this;

        return (
          <View style={AppStyles.Wrapper}>
          
          <StatusBar
                  translucent
                  backgroundColor={'transparent'}  />

                  <View style={{backgroundColor:'#ECECEC', height:30}}/>
                 <View style={{backgroundColor:'#FFFFFF',height:'100%'}}>
                   <View style={{justifyContent: 'center', alignItems: 'center',marginTop:30}}>
                    <Image source={IMAGES.ic_doodles}  />
                    <Text style={{justifyContent: 'center', alignItems: 'center',marginTop:30,
                  fontFamily:'SourceSansPro-Bold',textAlign:'center',color:'#363636',fontSize:18}}>Your Private Brag Code</Text>

                 <Text style={{justifyContent: 'center', alignItems: 'center',marginTop:30,
                textAlign:'center',textDecorationLine: 'underline',color: '#1B75BC',fontSize:16}} onPress = {() => this.joinBragsByCode()}>{this.state.code}</Text>
                <TouchableOpacity onPress={() =>this.writeToClipboard() }   transparent>

              <Text style={{ color: '#00B732', fontSize: 16, textAlign: 'center',marginTop:30,  fontFamily:'SourceSansPro-Bold' ,
            borderWidth: 2, borderColor: '#00B732', borderRadius: 17 ,padding:5}}>COPY CODE</Text>
              </TouchableOpacity>


           <TouchableOpacity  style={{marginTop:30,  }} onPress={() => {
             getItem(PreferenceConstant.REF_CODE).then((value)=>{
              ConstantLib.REF_CODE=value;
              var map = {
                '"CODE"' : ''+this.state.code,
              };
             
               Utility.shareTextMessage(replaceAll(String.Join_Private_Brag_Message,map))
          })
             
             }}   transparent>
               <Text  style={{ textDecorationLine: 'underline',color: '#1B75BC', fontSize: 16, textAlign: 'center',marginTop:30,  }}>View More Sharing Options</Text>
          </TouchableOpacity>
                  </View>
                </View>

          {/* </SafeAreaView> */}
          </View>
          );
       }



       writeToClipboard = () => {
           Clipboard.setString(ConstantLib.ID);
           Toaster.showLongToast('Copied to Clipboard!');
       };
       goBackP()
       {
       WSManager.goBack();

       }

 }

 var customStyles9 = StyleSheet.create({
  thumb: {
    width: 30,
    height: 30,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 1,
  }
});



const CustomHeader = ({navigation}) => (


  <LinearGradient
    start={{ x: 0.6, y: 0 }} end={{ x: 2.5, y: 1.5 }}
    locations={[0.0, 0.4]}
    colors={['#1B75BC', '#9AD8DD']}
    style={{ paddingTop: Platform.OS === "ios" ? 30 : 20 }}>

    <View style={{ flexDirection: 'row', padding: 15,  }}>
      <TouchableOpacity onPress={() => mContext.goBackP()} style={{  justifyContent:'center' }} transparent>
        <Image source={IMAGES.goBack}/>
      </TouchableOpacity>
      <View style={{ flex:1, alignSelf:'center', alignItems: 'center', paddingRight: 15 }}>
        <Text style={AppStyles.header_title}>Invite a Friend</Text>
      </View>

    </View>
  </LinearGradient>


  );
