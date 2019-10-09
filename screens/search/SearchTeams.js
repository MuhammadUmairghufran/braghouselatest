import React, { Component } from 'react';
import { AppStyles, Images } from '../../Themes/';
import LinearGradient from 'react-native-linear-gradient';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import * as URLConstants from '../../Networking/URLConstants/';
import WSManager from '../../Networking/WSManager/';
import ConstantLib from '../../Constants/ConstantLib';
import Loader from '../../Utils/Loader/';
import { Button, Separator}  from 'native-base';
import { AppRegistry, StyleSheet, Text, View, Dimensions,Label, TouchableOpacity, Image, StatusBar, Animated, Platform, FlatList, ImageBackground, SafeAreaView } from 'react-native';
import Ripple from 'react-native-material-ripple';
import Toaster from '../../Utils/Toaster/';
import Utility from '../../Utils/Utility/';
import { TabBarTop } from 'react-navigation';
import SearchStyle from './SearchStyle';
import { NavigationActions } from 'react-navigation';

let mContext = null;
const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[AppStyles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);


export default class SearchTeams extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };

  static reloadList(teamsList){
    if(mContext){
      mContext.setState({searchResultForTeams:teamsList})
      mContext.setState({isRefereshing:!mContext.state.isRefereshing})
     }
     else{
         mContext.setState({noRecordMessage:'No record to display'})
         mContext.setState({searchResultForTeams:[]})
     }
   }

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      searchResultForTeams:[],
      isRefereshing: false,
      noRecordMessage:'',
    }
  }

  componentDidMount() {
    mContext = this;
    this.subs = [
      this.props.navigation.addListener('willFocus', () => mContext = this),
    ];
  }

  render() {
    mContext = this;
    return (
      <View style={[AppStyles.Wrapper, { backgroundColor: '#fff' }]}>
            <View style={{ flex: 1 }} >
                <Loader loading={this.state.loading} />
                <StatusBar
                  translucent
                  backgroundColor={'transparent'} />


                {(this.state.searchResultForTeams.length > 0) ?
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    keyExtractor={this._keyExtractor}
                    data={this.state.searchResultForTeams}
                    extraData={this.state.isRefereshing}
                    renderItem={this.renderItem.bind(this)}
                  />
                  :
                  <View style={SearchStyle.NoRecordContainer}>
                    <Text style={SearchStyle.search_list_text}>{this.state.noRecordMessage}</Text>
                  </View>
                }
            </View>
      </View>
    );
  }

  moveToTeam(item){
    ConstantLib.DATA2 = item;
    const navigateAction = NavigationActions.navigate({
      routeName: 'TeamDetail',
      params: {},
      action: NavigationActions.navigate({ routeName: 'TeamDetail' })
    })
    const nav = WSManager.getTopLevelNavigator()
    nav.dispatch(navigateAction)
  }

  renderItem(data) {
    let { item, index } = data;
    return (

      <View>
      <View style={[SearchStyle.notification_container, {height: 60}]}>
          <Ripple onPress={()=>this.moveToTeam(item)} style={[SearchStyle.notification_info,  {height: 60}]}  >
                 <View >
                        <Image style={AppStyles.Conference_item_image}
                        source={item.flag === null || item.flag === '' || item.flag === 'null' ? Images.default_user : { uri: item.flag }} />
                 </View>
                 <View>
                     <Text style={AppStyles.Conference_item_text}>{item.team_name}</Text>
                     <Text style={{ fontFamily:'SourceSansPro-Regular', flex:1,fontSize:12,color:'#989898',paddingLeft:10,justifyContent: 'flex-start'}}> {item.follower_count} Followers</Text>
                 </View>
          </Ripple>
          <View style={SearchStyle.follow_box}>

                 {(item.user_id!==ConstantLib.USER_ID) &&
                 (
                   (item.is_follow_team==0)?
                     <Button onPress={()=>this.followTeams(index)} transparent style={{borderWidth: 1, borderColor: '#E2E2E2', borderRadius: 13, height: 26, width: 70, justifyContent: 'center'}}>
                       <Text style={{fontSize: 10,  color:'#666666',paddingLeft:7, paddingRight: 7, fontFamily:'SourceSansPro-Regular'}}>FOLLOW</Text>
                     </Button>
                     :
                     <Button onPress={()=>this.followTeams(index)} transparent style={{borderWidth: 1, borderColor: '#E2E2E2', borderRadius: 13, height: 26, width: 70, justifyContent: 'center'}}>
                       <Text style={{fontSize: 10,  color:'#1CBB04',paddingLeft:7, paddingRight: 7, fontFamily:'SourceSansPro-Regular'}}>FOLLOWING</Text>
                     </Button>
                   )
               }

          </View>
      </View>
      <Separator   style = {{height: 1, backgroundColor: '#99999930'}}  ></Separator>
      </View>

    )
  }

  followTeams(index){
      if(Utility.isLoggedIn(this.props.navigation)){
        var teamList = this.state.searchResultForTeams;
        var team_league_id = teamList[index].team_league_id;
              this.setState({loading: true})
              const params = {
                follower_id: team_league_id,
                type: 'team',
              };


          WSManager.postData(URLConstants.TOGGLE_FOLLOW_ENTITY, params)
          .then(response => {
              let { posts } = this.state;
                this.setState({loading: false})
                console.log('followUsers result=>>'+JSON.stringify(response.data));
                var updatedArr = [...this.state.searchResultForTeams];
                updatedArr[index].is_follow_team = updatedArr[index].is_follow_team === 0 ? 1 : 0;
                this.setState({searchResultForTeams: updatedArr});
                this.setState({notifyDataChange:true});
              })
          .catch(error => {
            this.setState({loading: false})
            Toaster.showLongToast('followUsers:'+error.message);
            return error;
          });
       }
   }
}
