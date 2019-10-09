import React, { Component } from 'react';
import {Card, CardItem, Body, Button, Right, Left, Separator, H3, Container, Header, Content, Tab, Tabs, TabHeading,  Item,Label,Input } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {TouchableOpacity, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, ScrollView, ImageBackground,
FlatList, Dimensions, Platform, ActivityIndicator,SafeAreaView} from 'react-native';
import { AppStyles, Images } from '../../Themes'
import LinearGradient from 'react-native-linear-gradient';
import JoinBragStyle from './JoinBragStyle';
import * as URLConstants from '../../Networking/URLConstants/';
import WSManager from '../../Networking/WSManager/';
import ConstantLib from '../../Constants/ConstantLib';
import * as IMAGES from '../../Constants/Images';
import Loader from '../../Utils/Loader/';
import Ripple from 'react-native-material-ripple';
import AutoComplete from 'react-native-autocomplete-input';
import Toaster from '../../Utils/Toaster/';
import {  NavigationActions,StackActions } from 'react-navigation';
import Utility from '../../Utils/Utility/';

let mContext = null;
export default class BragQA extends Component {

    static navigationOptions = ({ navigation }) => {
      return {
        header: <CustomHeader this navigation={navigation} />
      };
    };


	constructor(props) {
			super(props);
			this.state = {
				loading:false,
				responseData:'',
				selectedOptionId:'',
				bidAmount: '',
        contest_id:'',
        contest_unique_id:'',
        searchText:'',
        searchItem:'',
        SearchResults: [],
        winner_team_league_id:[],
        joined_lineup:[],
        hideResult:false,
        matchData: '',
        isComplete:'0',

			}
	}

  render() {
    mContext = this;
    return (
      <View style={AppStyles.Wrapper}>
	    	{ Platform.OS === 'ios' &&
				    <View style={{shadowColor: '#000',
	    			    elevation: 10,
	    			    shadowOpacity: 0.4,
	    			    shadowOffset: { width: 0, height: 10},
	    			    shadowRadius: 10,
	    			    backgroundColor: '#f4f4f4',
	    			    height: 8,
	    			    marginTop: -16,
	    			    zIndex: 9
	    				}}>
	    	   	</View>
		    }
	    	{ Platform.OS === 'android' &&
				     <View style={{shadowColor: '#000',
	    			    elevation: 10,
	    			    shadowOpacity: 0.2,
	    			    shadowOffset: { width: 0, height: 2},
	    			    shadowRadius: 10,
	    			    backgroundColor: '#76BCD4',
	    			    height: 15,
	    			    marginTop: -14
	    			    }}>
	    		   </View>
				  }
    <Loader loading={this.state.loading} />
					<View style={JoinBragStyle.MainContainerStyle}>
          <ScrollView  keyboardShouldPersistTaps={'handled'} >
          <KeyboardAvoidingView  behavior="padding">

			    		{this.displayQues()}

							{this.placeBragPoints()}
              </KeyboardAvoidingView>

            </ScrollView>
					</View>

          <View style={{justifyContent: 'flex-end'}}>
            <LinearGradient
                colors={['#1B75BC', '#9AD8DD']}
                start={{x: 0.3, y: 0}} end={{x: 3.0, y: 1.17}}
                    locations={[0.0, 0.4]}
                style={{
                  padding: 0,
                  paddingVertical: 0
                }}
                >
                { this.state.isComplete!=='1'?  <Button onPress={()=>this.joinContestAPI()}
                 block transparent style={{height: 60}}><Text style={{fontSize: 18, color:'#fff', fontFamily:'SourceSansPro-Bold'}}>
                 BET & PLAY</Text></Button>:null}
               </LinearGradient>
            </View>

      </View>
    );
  }

	displayQues(){
		var quesObj = this.state.responseData;
		return  <View style={JoinBragStyle.box_container}>
							{this.populateQuestion()}
              {  this.addTeamTypeOptions()}
	          </View>
	}

  updateSelectedPlayer(item){
      this.setState({hideResult:true});
      this.setState({ searchText: item.full_name });
      this.setState({ searchItem: item });
  }

	populateQuestion=()=>{
				if(this.state.responseData!==null && this.state.responseData!==''){
					 var quesObj = this.state.responseData;
					 var ques = quesObj.question;
					 var NewText = ques.replace("{{player_position}}", quesObj.player_position);
					 return <View style={{justifyContent:'center',
           alignItems:'center',marginBottom:10,marginTop:10}}>
                      <Label style={JoinBragStyle.hot_ques_text}>{NewText}</Label>
                  </View>
				}
	}

  addTeamTypeOptions(){
		var data = this.state.responseData;


        if(this.state.isComplete!=='1')
        {
				if(data!=='' && data.match_list!=='' && data.match_list.length>0){

				 return   <View>
                       <View  style={JoinBragStyle.hot_Option_Container}>
                            <Ripple onPress={()=>  this.optionSelectionEvent(data.match_list[0].team_league_id_home)}  style={JoinBragStyle.hot_Option_Item_Container}>
                                  {(this.state.selectedOptionId==='' || this.state.selectedOptionId!==data.match_list[0].team_league_id_home)?
                                   <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_unchecked}/>
                                 :
                                   <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_checked}/>}
                                  <Text style={{ fontFamily:'SourceSansPro-Bold',fontSize:18 ,color:'#000000' }}>{data.match_list[0].home_team_name}</Text>
                            </Ripple>
                            <Ripple onPress={()=>  this.optionSelectionEvent(data.match_list[0].team_league_id_away)}  style={JoinBragStyle.Option_Item_Container}>
                                {(this.state.selectedOptionId==='' || this.state.selectedOptionId!==data.match_list[0].team_league_id_away)?
                                 <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_unchecked}/>
                               :
                                 <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_checked}/>}
                                <Text style={{ fontFamily:'SourceSansPro-Bold',fontSize:18,color:'#000000' }}>{data.match_list[0].away_team_name}</Text>
                            </Ripple>
                        </View>
               </View>
				}
      }else {
        	if(data!=='' && data.match_list!=='' && data.match_list.length>0){
        return   <View>
                      <View  style={JoinBragStyle.hot_Option_Container}>
                           <View    style={JoinBragStyle.hot_Option_Item_Container}>
                                 {(this.state.winner_team_league_id.length==0 || this.state.winner_team_league_id[0]==='' || this.state.winner_team_league_id[0]!==data.match_list[0].team_league_id_home)?
                                  <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_unchecked}/>
                                :
                                  <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_checked}/>}
                                 <Text style={{ fontFamily:'SourceSansPro-Bold',fontSize:18 ,color:'#000000' }}>{data.match_list[0].home_team_name}</Text>
                           </View>
                           <View   style={JoinBragStyle.Option_Item_Container}>
                               {(this.state.winner_team_league_id.length==='' || this.state.winner_team_league_id[0]!==data.match_list[0].team_league_id_away)?
                                <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_unchecked}/>
                              :
                                <Image style={JoinBragStyle.LogoStyle} source={Images.ic_radio_checked}/>}
                               <Text style={{ fontFamily:'SourceSansPro-Bold',fontSize:18,color:'#000000' }}>{data.match_list[0].away_team_name}</Text>
                           </View>
                       </View>
              </View>
            }
      }
	}

	componentWillReceiveProps(){
		//	console.log('response ==>>>>>>>>>>>>>>>>>>>>>>>> '+JSON.stringify(this.props));
	}

	optionSelectionEvent(value){
    if(this.state.isComplete!=='1')
    {
     this.setState({selectedOptionId:value})
    }
  }

	placeBragPoints(){
    if(this.state.isComplete==='1')
    {
     return <View/>
     }else {
       return  <View style={JoinBragStyle.blue_box_container}>
              			<Label style={JoinBragStyle.ques_text}>Place your Brag Points to enter this contest</Label>
                   <TextInput maxLength = {5} keyboardType="numeric" placeholder='Enter Brag Points'
                      onChangeText={(text) => this.setState({bidAmount:text})}
                     style={{ marginHorizontal: 10,  fontSize:14, borderRadius: 4, fontFamily:'SourceSansPro-Regular',  height: 40,
                       marginTop:10,marginBottom:10}}/>
                     <Text style={{  marginHorizontal: 13,fontSize: 14, color: '#000', fontFamily:'SourceSansPro-Regular'  }}>Min. Brag {this.state.responseData.entry_fee}</Text>
               </View>
 }


	}

	componentDidMount() {
         mContext = this;
         this.subs = [
           this.props.navigation.addListener('willFocus', () => mContext = this),
         ];


         setTimeout (() => {
               var contestId = this.props.navigation.getParam('contest_id', '');
               var contestUniqueId = this.props.navigation.getParam('contest_unique_id', '');
               var isComplete = this.props.navigation.getParam('isComplete', '0');
                this.setState({contest_id:contestId})
               this.setState({contest_unique_id:contestUniqueId})
               this.setState({isComplete:isComplete})

                this.getContestMasterData();
         }, 100);
   }

   getContestMasterData() {
     this.setState({ loading: true })
     const params = {
       contest_id: this.state.contest_id,
       contest_unique_id: this.state.contest_unique_id,
     };

     WSManager.postData(URLConstants.JOIN_BRAG_MASTER_API, params)
       .then(response => {
         this.setState({ responseData: response.data.data });
         this.setState({ matchData: response.data.data.match_list[0] })
         this.setState({ winner_team_league_id: response.data.data.winner_team_league_id })
         this.setState({ loading: false });
         console.log('getContestMasterData=' + JSON.stringify(response.data.data));
         this.props.navigation.setParams({
           customTitle: 'MyTitle',
         });
       })
       .catch(error => {
         this.setState({ loading: false })
         console.log('Error= ' + JSON.stringify(error));
         return error;
       });
   }

		validate(){
          var quesObj = this.state.responseData;
          if(quesObj.contest_type==='0' && this.state.searchText===''){
                Toaster.showLongToast('Please enter player name');
          }
          else if(quesObj.contest_type==='1' && this.state.selectedOptionId===''){
                Toaster.showLongToast('Please select any option');
          }
          else if(quesObj.contest_type==='2' && this.state.selectedOptionId===''){
                Toaster.showLongToast('Please select any Team');
          }
          else if(this.state.bidAmount===''){
                Toaster.showLongToast('Please enter minimum brag points');
          }
					else{
						return true;
					}
		}

		joinContestAPI(){

      if(Utility.isLoggedIn(this.props.navigation))
   {
       var quesObj = this.state.responseData;
					if(this.validate()){
					      this.setState({loading: true})
                const params='';
                if(quesObj.contest_type==='0'){
                  params = {
  					        player_team_id: this.state.searchItem.player_team_id,
  					        player_unique_id: this.state.searchItem.player_uid,
  					        contest_id: this.state.contest_id,
  					        bid_amount:this.state.bidAmount,
  					      };
                }
                else if(quesObj.contest_type==='1'){
                  params = {
  					        option_id: this.state.selectedOptionId,
  					        league_id: ConstantLib.LEAGUE_ID,
  					        contest_id: this.state.contest_id,
  					        bid_amount:this.state.bidAmount,
  					      };
                }
                else if(quesObj.contest_type==='2'){
                  params = {
                    team_league_id: this.state.selectedOptionId,
                    contest_id: this.state.contest_id,
                    bid_amount:this.state.bidAmount,
                  };
                }

					      WSManager.postData(URLConstants.JOIN_BRAG_API, params)
					      .then(response => {
					        console.log("joinContestAPI=="+JSON.stringify(response.data));
					        this.setState({loading: false})
  								//Toaster.showLongToast('Success:'+response.data.message);

                  const navigateAction = NavigationActions.navigate({
                    routeName: 'WellDoneAfterCreatingBrag',
                    index:0,
                    params: {},
                    action: NavigationActions.navigate({ routeName: 'WellDoneAfterCreatingBrag' })
                  })
                  const nav = WSManager.getTopLevelNavigator()
                  nav.dispatch(navigateAction)
					      })
					      .catch(error => {
					        this.setState({loading: false})
					        console.log('Error= '+JSON.stringify(error));
					        Toaster.showLongToast('Error:'+error.response.data.global_error);
					        return error;
					      });
					}
        }
	    }

			static callBackMethod(data,contestId,contestUniqueId){
            mContext.setState({contest_id:contestId})
            mContext.setState({contest_unique_id:contestUniqueId})
					  mContext.setState({responseData:data})
			}
}

const CustomHeader = ({ navigation }) => (
  <LinearGradient
    start={{ x: 0.6, y: 0 }} end={{ x: 2.5, y: 1.5 }}
    locations={[0.0, 0.4]}
    colors={['#1B75BC', '#9AD8DD']}
    style={{ paddingTop: Platform.OS === "ios" ? 30 : 20, width: '100%', height: 100 }}>
    <View style={{ flexDirection: 'row', padding: 15, alignItems: 'center' }}>
      <TouchableOpacity onPress={() => navigation.goBack(null)} style={{ flex: 0, padding:5, justifyContent: "flex-start" }} transparent>
        <Image source={Images.back} />
      </TouchableOpacity>
      <View style={{ flex: 1, justifyContent: 'flex-start' }}>
        <View style={{ alignItems: 'center' }}>

          <View style={{ flexDirection: 'row', alignItems: 'center',marginLeft:-35 }}>
            <Text style={AppStyles.header_title}>{mContext.state.matchData.home}</Text>
            <Text style={{ fontSize: 12, opacity: 1, color: '#fff', paddingLeft: 5, paddingRight: 5, fontFamily:'SourceSansPro-Regular' }}>vs</Text>
            <Text style={AppStyles.header_title}>{mContext.state.matchData.away}</Text>
          </View>
        </View>
        <Text style={AppStyles.header_sub_title}>{Utility.getFormatedDate(mContext.state.matchData.season_scheduled_date, 'MMM Do, ddd - hh:mm A')} </Text>
      </View>
    </View>
  </LinearGradient>
);
