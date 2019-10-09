

import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Dimensions, TouchableOpacity, Image,StatusBar,Animated,Platform ,FlatList,ImageBackground,Thumbnail,SectionList}
 from 'react-native';
import { Button, Form, Item, Input, Container, Content, StyleProvider, Icon, H3 ,Header,Left, Right,Body}
from 'native-base';
import {AppStyles, Images} from '../../Themes/';

import * as URLConstants from '../../Networking/URLConstants/';
import WSManager from '../../Networking/WSManager/';
import ConstantLib from '../../Constants/ConstantLib';
import Loader from '../../Utils/Loader/';
import Utility from '../../Utils/Utility/';
import Toaster from '../../Utils/Toaster/';
import LinearGradient from 'react-native-linear-gradient';
import Modal from "react-native-modal";

export default class BHRules extends Component
{

  constructor(props) {
      super(props);
      this.state = {
        loading:false,
        responseData:'',
        rules:[],
      }
  }


  render() {

    return (
      <View  style={{backgroundColor:'white',width: '100%', height: '100%',paddingBottom:5}}>


        <SectionList
              stickySectionHeadersEnabled = {false}
             renderItem={({item, index, section}) => <Text style={{fontSize:12,paddingLeft:10,paddingRight:10,paddingTop:10, fontFamily:'SourceSansPro-Regular'}}  key={index}>{item}</Text>}
             renderSectionHeader={({section: {head}}) => (
               <Text style={{fontFamily:'SourceSansPro-Bold',paddingLeft:10,paddingRight:10,paddingTop:10}}>{head}</Text>
             )}
             sections={[
{
"head":"Enter Brags",
"data":[
"Start by choosing a Brag. Create your own Brag or choose from the public Brags in the conference lobbies. Below is our variety of public contests."
]
},
{
"head":"Brag Types",
"data":[
"Hot Brags - These are the featured games of the week -- head to head match-ups. You definitely do not want to miss out on these!",
"Conference Brags - These are Brags based only on that specific lobby conference. You get to show skill level and compete against others to try and predict how your favorite player, team, or their defense will do.",
"Head to head match ups - In addition to the Hot Brags, Braggers will be able to bet on any match-up for that week."
]
},
{
"head":"Brag Bucks",
"data":[
"Brag Bucks are the currency used to play each Brag. 1 Brag Buck is equivalent to 1 USD."
]
},
{
"head":"Brag Min",
"data":[
"Each Brag has a Min. Brag Bucks entry. If you choose to create your own Brag you will be allowed to create the min."
]
},
{
"head":"Watch Live",
"data":[
"Game scores are updated live so you can watch the action unfold on your phone."
]
},
{
"head":"Check Results",
"data":[
"If you won or placed into a paying position in a Brag, the amount you've won, as determined by the prize structure of that Brag will be credited to your Brag House account as soon as the contest ends.",
"You can use your winnings to play even more Brags or withdraw it. (All withdrawals will be in U.S. Currency)."
]
},
{
"head":"Profile",
"data":[
"Share your Brags or just talk smack to your friends."
]
}
]}
             keyExtractor={(item, index) => item + index}
            />
          </View>

    );
  }

  componentDidMount() {
         mContext = this;
         this.subs = [
           this.props.navigation.addListener('willFocus', () => mContext = this),
         ];
        // this.getContestMasterData();
   }

  getContestMasterData(showLoader){
    this.setState({loading: false})
      const params = {
        contest_id: '30',
        contest_unique_id:'dUIeyrVCG',
      };

      WSManager.postData(URLConstants.JOIN_BRAG_MASTER_API, params)
      .then(response => {
          console.log("getContestMasterData=="+JSON.stringify(response.data));
        this.setState({rules:response.data.data.users})
        this.setState({loading: false})
      })
      .catch(error => {
        this.setState({loading: false})
        console.log('Error= '+JSON.stringify(error));
        Toaster.showLongToast('Error:'+error.message);
        return error;
      });
    }
}






//BHRules

class BHRulesItems extends Component
{
    render()
    {
        return (

            <View style = {{margin: 10}}>
            <View style = {{flexDirection: 'row', alignItems: 'center'}}>

 <LinearGradient
              start={{x: 0, y: 0}} end={{x: 3.5, y: 0.2}}
              locations={[0.0, 0.4]}
              colors={['#1B75BC', '#9AD8DD']}
              style={{height: 5, borderRadius:5/2, width: 5, marginLeft: 6, backgroundColor: '#9B9B9B', alignSelf: 'center'}}
              >

                </LinearGradient>
                <View style = {{flex: 1, marginLeft: 20}}>
                    <Text style = {{fontSize: 16, fontFamily:'SourceSansPro-Regular'}}>Lorem ipsum dolor sit amet, consectetur adipiscing  sed do eiusmod tempor incididunt</Text>
                    <View style = {{backgroundColor: '#F3F3F3', height: 1, marginRight: 0, marginBottom: 0, marginTop: 10}}></View>
                </View>
            </View>

            </View>
        );
    }
}
