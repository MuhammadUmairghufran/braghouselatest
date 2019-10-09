import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, Platform, FlatList, RefreshControl, SafeAreaView } from 'react-native';
import { List } from 'native-base';
import Ripple from 'react-native-material-ripple';
import { NavigationActions,StackActions } from 'react-navigation';
import {DrawerActions} from 'react-navigation-drawer'
import IMAGES from '../../Constants/Images/';
import * as String from '../../Constants/Strings/';
import * as Color from '../../Themes/Colors/';
import Style from './Style';
import AppStyles from '../../Themes/AppStyles';
import Utility from '../../Utils/Utility/';
import Toaster from '../../Utils/Toaster/';
import WSManager from '../../Networking/WSManager/';
import { Container, Header, Content, Label, Input, ActionSheet } from 'native-base';
import * as URLConstants from '../../Networking/URLConstants';
import ConstantLib from '../../Constants/ConstantLib';
import Loader from '../../Utils/Loader/';
import LinearGradient from 'react-native-linear-gradient';
import { getItem, saveItem } from '../../lib/Session';
import PreferencesConstant from '../../Preferences/PreferenceConstant'
import { Images } from '../../Themes';
import Dashboard, {Dashboard as DashboardClass}from '../Dashboard'

export default class NotificationsScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      refreshing: false,
      notificationList: [],
      canLoadMoreContent: false,
      currentPage: 1,
      joinedBragNoti: []
    }
  }
  dictForStatus = []
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };
  render() {
    mContext = this;
    return (
      <View style={Style.main_image_container}>
      <ImageBackground source={IMAGES.mainBg} style={Style.main_image_container}>
        {/* <StatusBar
          translucent
          backgroundColor={'transparent'} /> */}
        <LinearGradient
          start={{ x: 0.6, y: 0 }} end={{ x: 2.5, y: 1.5 }}
          locations={[0.0, 0.4]}
          colors={['#1B75BC', '#9AD8DD']}
          style={{ paddingTop: Platform.OS === "ios" ? 30 : 20 }}>

          <View style={{ flexDirection: 'row', paddingBottom: 15, marginLeft: 0, paddingTop: Platform.OS === "ios" ? 20 : 20 }}>
          <View style={{ flex: 1, paddingRight: 0, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent'}}>
          <Text style={AppStyles.header_title}>NOTIFICATIONS</Text>
            </View>
            <TouchableOpacity style={{ position: "absolute", flex: 0, padding: 10, justifyContent: 'center',alignSelf: 'center', backgroundColor: 'transparent' }}  onPress={() => WSManager.getTopLevelNavigator().dispatch(DrawerActions.openDrawer())} >
              <Image source={IMAGES.ic_drawer_menu} />
            </TouchableOpacity>

          </View>
        </LinearGradient>

        <View style={Style.ListViewContainer}>
          <Loader
            loading={this.state.loading} />
          {(this.state.notificationList.length > 0) ?
            <FlatList
              showsVerticalScrollIndicator={false}
              keyExtractor={this._keyExtractor}
              data={this.state.notificationList}
              renderItem={this.renderItem.bind(this)}
              canLoadMore={this.state.canLoadMoreContent}
              onEndReached={this._loadMoreContentAsync}
              onEndThreshold={this.state.notificationList.length - 5}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh.bind(this)}
                />
              }
            />
            :
            <View style={Style.NoRecordContainer}>
              <Label style={Style.white_text_14}>No record to display</Label>
            </View>
          }
        </View>
      </ImageBackground >
      </View>
    );
  }

  renderItem(data) {
    let { item, index } = data;
    
    return (
      <Ripple onPress={()=>this.onNotificationClickEvent(item, index)} style={Style.notification_container}>

        {
          (item.user_detail!=null && item.user_detail!=undefined && item.user_detail!='')?
            <Image style={Style.NotificationLogo} resizeMode = 'center'
            source={item.user_detail.image === null || item.user_detail.image === '' ||
            item.user_detail.image === 'null' ? Images.ic_BH_Nav_Logo_Blue : { uri: item.user_detail.image }}/>
          :

          <Image style={Style.NotificationLogo} resizeMode = 'center' source={Images.ic_BH_Nav_Logo_Blue}/>
        }

        <View style={Style.NotificationMessageContainer}>
          <Text style={[Style.gray_text_left_align, {marginRight: 2}]}>{(item.notification_type == '1' || item.notification_type == '3' || item.notification_type == '8')?this.joinedNotiFunction(item, index):this.getMessageContaint(item)}</Text>
          <Text style={Style.team_name_text_left_align}>{Utility.getFormatedDate(item.added_date, 'ddd, MMM Do - hh:mm A')}</Text>
        </View>
      </Ripple>
    )
  }

  onNotificationClickEvent(item){
    
      var userDetails = JSON.parse(item.content);
      //alert('Noti_Type: '+item.notification_type+'CI:'+userDetails.contest_id+'CUI:'+userDetails.contest_unique_id+'CN:'+JSON.stringify(item))
      if(item.notification_type==='4' || item.notification_type==='6' || item.notification_type==='7' ||
             item.notification_type==='25' || item.notification_type==='26' || item.notification_type==='27' || item.notification_type==='28'){
        /**Received referral bonus=4, Amount crdited=6/debited to your account=7
           withdraw req approved=25, withdraw req rejected=26, point credited=27, point debited=28
        **/
        const navigateAction = NavigationActions.navigate({
          routeName: 'TransactionsScreenContainer',
          index:0,
          params: {},
          action: NavigationActions.navigate({ routeName: 'TransactionsScreenContainer' })
        })
        const nav = WSManager.getTopLevelNavigator()
        nav.dispatch(navigateAction)
      }
      else if(item.notification_type==='35'){
         /**Someone Foolow Me=35, Someone use your referal code=9**/
         const navigateAction = NavigationActions.navigate({
           routeName: 'OtherProfileScreen',
           index:0,
           params: {'user_id':userDetails.user_id},
           action: NavigationActions.navigate({ routeName: 'OtherProfileScreen' })
         })
         const nav = WSManager.getTopLevelNavigator()
         nav.dispatch(navigateAction)
       }

       else if(item.notification_type==='20'){
            /**match is over=20**/
         const navigateAction = NavigationActions.navigate({
           routeName: 'BragBordParent',
           index:0,
           params: {},
           action: NavigationActions.navigate({ routeName: 'BragBordParent' })
         })
         const nav = WSManager.getTopLevelNavigator()
         nav.dispatch(navigateAction)
       }
       else if(item.notification_type==='1' || item.notification_type==='8' || item.notification_type==='3'){
          /**Someone invite to join=1,you joined successfully=8**/
          if (item.notification_type == '1')
          {
            // alert(JSON.stringify(this.dictForStatus))
            //alert(JSON.stringify(this.dictForStatus))
            for (let _indexx = 0; _indexx<this.dictForStatus.length;_indexx++)
            {
              var dict = this.dictForStatus[_indexx]
            
             for (var key in dict)
              {
                if (key == JSON.parse(item.content).contest_unique_id)
                {
                  if (dict[key] != '1')
                  {
                  const navigateAction = NavigationActions.navigate({
                    routeName: 'BHEntries',
                    index:0,
                    params: dict[key] == '3'?{'contest_id':userDetails.contest_id,'contest_unique_id':userDetails.contest_unique_id,'conference_name':userDetails.conference_name,'isFromConference':'false', 'isComplete':'1'}:{'contest_id':userDetails.contest_id,'contest_unique_id':userDetails.contest_unique_id,'conference_name':userDetails.conference_name,'isFromConference':'false', 'isComplete':'0'},
                    action: NavigationActions.navigate({ routeName: 'BHEntries' })
                   })
                   const nav = WSManager.getTopLevelNavigator()
                   nav.dispatch(navigateAction)
                  }
                  else
                  {
                    alert('Brag has been canceled due to insuffcient participation');
                    break;
                    
                  }
                }
              }
            }
            
          }
          else
          {
          const navigateAction = NavigationActions.navigate({
           routeName: 'BHEntries',
           index:0,
           params: item.notification_type==='3'?{'contest_id':userDetails.contest_id,'contest_unique_id':userDetails.contest_unique_id,'conference_name':userDetails.conference_name,'isFromConference':'false', 'isComplete':'1'}:{'contest_id':userDetails.contest_id,'contest_unique_id':userDetails.contest_unique_id,'conference_name':userDetails.conference_name,'isFromConference':'false', 'isComplete':'0'},
           action: NavigationActions.navigate({ routeName: 'BHEntries' })
          })
          const nav = WSManager.getTopLevelNavigator()
          nav.dispatch(navigateAction)
        }
       }
       else if(item.notification_type==='31'){
          /**contest abount to start=31**/
          const navigateAction = NavigationActions.navigate({
           routeName: 'BragSpace',
           index:0,
           params: {},
           action: NavigationActions.navigate({ routeName: 'BragSpace' })
          })
          const nav = WSManager.getTopLevelNavigator()
          nav.dispatch(navigateAction)
       }
       else if(item.notification_type==='36' || item.notification_type==='37' ){
            /**match is over=20**/ /**item.notification_type==='38' liked */
            if(userDetails.entity_type=='2'){
              alert('Item Data', JSON.stringify(item))
              const navigateAction = NavigationActions.navigate({
                routeName: 'OtherProfileScreen',
                index:0,
                params: {'user_id':userDetails.user_id,'is_not':true},
                action: NavigationActions.navigate({ routeName: 'OtherProfileScreen' })
              })
              const nav = WSManager.getTopLevelNavigator()
              nav.dispatch(navigateAction)
            }
            else{
              const navigateAction = NavigationActions.navigate({
                routeName: 'PostDetail',
                index:0,
                params: {'activity_id':(userDetails.activity_id),'is_not':true},
                action: NavigationActions.navigate({ routeName: 'PostDetail' })
              })
              const nav = WSManager.getTopLevelNavigator()
              nav.dispatch(navigateAction)
            }

            // const navigateAction = NavigationActions.navigate({
            //   routeName: 'Comments',
            //   params: { items: item, is_brag: true },
            // })
            // const nav = WSManager.getTopLevelNavigator()
            // nav.dispatch(navigateAction)

       }
  }









  updateNotificationCount() {
      const params = {
     };

    WSManager.getData(URLConstants.UPDATE_READ_ALL)
      .then(response => {
         console.log(response);
       })
      .catch(error => {
        console.log(error);
        //alert(JSON.stringify(error));

         return error;
      });
  }



  _loadMoreContentAsync = async (selectedPositionType, mSliderValue, searchTerm) => {
    console.log("Load More Called getAllNotifications ==" + data);
    var cPage = this.state.currentPage + 1;
    this.setState({ currentPage: cPage });
    const params = {
      limit: ConstantLib.PAGE_SIZE,
      offset: cPage,
    };

    WSManager.postData(URLConstants.MY_NOTIFICATION_LIST, params)
      .then(response => {
        var data = response.data.data.notification_list;
        console.log("getAllNotifications==" + data);
        this.setState({ notificationList: data });

        this.setState({ loading: false })
        if (data.length < ConstantLib.PAGE_SIZE) {
          this.setState({ canLoadMoreContent: false });
        }
        else {
          this.setState({ canLoadMoreContent: true });
        }
        this.setState({ refreshing: false });
        var resultData = response.data.data.notification_list;
        this.setState({ notificationList: [...this.state.notificationList, ...data] }, () => {
         
        });
        console.log("Notification Pagination current load ==" + data.length);
        console.log("Notification Pagination total load ==" + this.state.notification_list.length);
        
      })
      .catch(error => {
        this.setState({ refreshing: false });
        this.setState({ loading: false });

        return error;
      });
  }

  _onRefresh() {
    this.setState({ refreshing: true });
    this.setState({ currentPage: 1 });
    this.getAllNotifications();
  }

  joinedNotiFunction = (notificationData, _index) => {
    

    for (var index = 0; index < this.state.joinedBragNoti.length; index++) 
    {
       
      if (this.state.joinedBragNoti[index].notification_id == notificationData.notification_id)
      {

        
        var msg = this.state.joinedBragNoti[index].home+' vs '+this.state.joinedBragNoti[index].away+', '+Utility.getFormatedDate(this.state.joinedBragNoti[index].season_scheduled_date, 'ddd, MMM Do - hh:mm A')+' \n'+notificationData.message
          var arrySplit = msg.split(/ /)
          for (var i = 0; i < arrySplit.length; i++) 
          {

            
            // if (arrySplit[i] == '\n')
            // {
              
            // }
            if (i<9)
            {
              arrySplit[i] = <Text style={{ fontFamily:'SourceSansPro-Regular', color: '#000000', fontWeight: '600', marginRight: 30  }} key={obj} >{arrySplit[i] + ' '}</Text>
            }
            else
            {
              arrySplit[i] = arrySplit[i] + ' '
            }


            
            for (var obj in JSON.parse(notificationData.content)) 
            {
              if (arrySplit[i] == "{{" + obj + "}} ") {
                arrySplit[i] = <Text style={{ fontFamily:'SourceSansPro-Regular', color: '#000000', fontWeight: '600'  }} key={obj} >{JSON.parse(notificationData.content)[obj]} </Text>
              }
              if (arrySplit[i] == "{{contest_name}}, ") {
                arrySplit[i] = <Text style={{ fontFamily:'SourceSansPro-Regular', color: '#000000', fontWeight: '600'  }} key={obj} >{JSON.parse(notificationData.content)[obj]}, </Text>
              }
              if (arrySplit[i] == "{{" + obj + "}}. ") {
                arrySplit[i] = <Text style={{ fontFamily:'SourceSansPro-Regular', color: '#000000', fontWeight: '600'  }} key={obj} >{JSON.parse(notificationData.content)[obj]} </Text>
              }
            }
          }
          
         return arrySplit;
        
      }
    }
    
     
    // const filterArray = this.state.joinedBragNoti.map(async (item, index) => {
      
    //   if (item.notification_id == notificationData.notification_id)
    //   {

        
    //     var msg = item.home+' vs '+item.away+' '+item.season_scheduled_date+' '+notificationData.message
    //       var arrySplit = msg.split(/ /)
    //       for (var i = 0; i < arrySplit.length; i++) 
    //       {
    //         arrySplit[i] = arrySplit[i] + ' '
    //         for (var obj in JSON.parse(notificationData.content)) 
    //         {
    //           if (arrySplit[i] == "{{" + obj + "}} ") {
    //             arrySplit[i] = <Text style={{ fontFamily:'SourceSansPro-Regular' }} key={obj} >{JSON.parse(notificationData.content)[obj]} </Text>
    //           }
    //           if (arrySplit[i] == "{{contest_name}}, ") {
    //             arrySplit[i] = <Text style={{ fontFamily:'SourceSansPro-Regular' }} key={obj} >{JSON.parse(notificationData.content)[obj]}, </Text>
    //           }
    //           if (arrySplit[i] == "{{" + obj + "}}. ") {
    //             arrySplit[i] = <Text style={{ fontFamily:'SourceSansPro-Regular' }} key={obj} >{JSON.parse(notificationData.content)[obj]} </Text>
    //           }
    //         }
    //       }
          
    //      return arrySplit;
        
    //   }
    // })

    

    

  }
  getMessageContaint = (notificationData) => {
    var msg = notificationData.message


    var userNameCount = []
       if(notificationData.notification_type==='35' || notificationData.notification_type==='36' || notificationData.notification_type==='37' ||
          notificationData.notification_type==='38')
       {
         msg=msg.replace('{{user_name}}',notificationData.user_detail.user_name);
         userNameCount = notificationData.user_detail.user_name.split(/ /).length
       }
       
       var arrySplit = msg.split(/ /)
       //notificationData.notification_type = 1 Joined successfully
       
     for (var i = 0; i < arrySplit.length; i++) 
     {
        if (i < userNameCount )
        {
          arrySplit[i] = <Text style={{ fontFamily:'SourceSansPro-Regular', color: '#000000', fontWeight: '600'  }} key={obj} >{arrySplit[i] + ' '}</Text>
        }
        else
        {
          arrySplit[i] = arrySplit[i] + ' '
        }
     
      for (var obj in JSON.parse(notificationData.content)) {

         if (arrySplit[i] == "{{" + obj + "}} ") {
          arrySplit[i] = <Text style={{ fontFamily:'SourceSansPro-Regular', color: '#000000', fontWeight: '600' }} key={obj} >{JSON.parse(notificationData.content)[obj]} </Text>
        }
        if (arrySplit[i] == "{{contest_name}}, ") {
          arrySplit[i] = <Text style={{ fontFamily:'SourceSansPro-Regular', color: '#000000', fontWeight: '600' }} key={obj} >{JSON.parse(notificationData.content)[obj]}, </Text>
        }
        if (arrySplit[i] == "{{" + obj + "}}. ") {
          arrySplit[i] = <Text style={{ fontFamily:'SourceSansPro-Regular', color: '#000000', fontWeight: '600' }} key={obj} >{JSON.parse(notificationData.content)[obj]} </Text>
        }
      }
   }
    return arrySplit;
  }

  getAllNotifications() {
    const params = {
      limit: ConstantLib.PAGE_SIZE,
      offset: 0,
      sort_field: 'notification_id',
      sort_order: 'DESC'
    };

    WSManager.postData(URLConstants.MY_NOTIFICATION_LIST, params)
      .then(response => {
        var data = response.data.data.notification_list;

        this.setState({ loading: false });
        this.setState({ refreshing: false });

        this.updateNotificationCount();
        if (data.length < ConstantLib.PAGE_SIZE) {
          this.setState({ canLoadMoreContent: false });
        }
        else {
          this.setState({ canLoadMoreContent: true });
        }
        console.log("getAllNotifications==" + JSON.stringify(data));
        if (data.length > 0) {
          this.setState({ notificationList: data }, () => {
            var notiArray = []
            const filteredArray = data.map((item, index) => {
              if (item.notification_type == '1' || item.notification_type == '3' || item.notification_type == '8')
              {
                const content = JSON.parse(item.content)
                
                this.getContestDetail(content.contest_id, content.contest_unique_id, item.notification_id)
                
                
              }
            })
            

            
          });
        }
      })
      .catch(error => {
        this.setState({ loading: false });
        this.setState({ refreshing: false });
        Toaster.showLongToast('getAllTeams:' + error.message);
        return error;
      });
  }

  getContestDetail(contestID, contestUniqueID, notificationID){
    this.setState({loading: false})
      const params = {
        contest_id: contestID,
        contest_unique_id:contestUniqueID,
      };

      WSManager.postData(URLConstants.JOIN_BRAG_MASTER_API, params)
      .then(response => {
          console.log("getContestMasterData=="+JSON.stringify(response.data));
        //alert(JSON.stringify(response.data.data.match_list))

        //match_list array hai bhiya wahi discuss karna hai 
        this.setState({loading: false})
        var dict = {notification_id:notificationID, home:response.data.data.match_list[0].home, away:response.data.data.match_list[0].away, season_scheduled_date:response.data.data.match_list[0].season_scheduled_date}
        if (this.dictForStatus.length != 0)
        {
          flag = true
          for (let i = 0; i< this.dictForStatus.length; i++)
        {
          dicts = this.dictForStatus[i]
          
          for (var key in dicts)
          {
            if (key == contestUniqueID)
            {
              flag = false
              break;
            }
          }
        }
        if (flag)
        {
          this.dictForStatus.push({[contestUniqueID]:response.data.data.status})
        }


        }
        else
        {
          this.dictForStatus.push({[contestUniqueID]:response.data.data.status})
        }
   // this.dictForStatus.push({[contestUniqueID]:response.data.data.status})
        this.setState({ joinedBragNoti: [...this.state.joinedBragNoti, dict] }, () => {
          
        })
       
        
        
      })
      .catch(error => {
        this.setState({loading: false})
        console.log('Error= '+JSON.stringify(error));
        Toaster.showLongToast('Error:'+error.message);
        this.getContestDetail(contestID, contestUniqueID, notificationID)
        return error;
      });
    }

  componentDidMount() {
    mContext = this;
    this.subs = [
      this.props.navigation.addListener('willFocus', () => {
        mContext = this
        DashboardClass.updateCount();

      }),
    ];
    getItem(PreferencesConstant.USER_IMAGE).then((value) => {
      this.setState({userImage: value})
    })
    this.getAllNotifications();
  }

  componentWillUnmount() {
    this.subs.forEach((sub) => {
      sub.remove(); DrawerActions
    });
  }
}

// Header
const CustomHeader = ({ navigation }) => (
  <LinearGradient
    start={{ x: 0.6, y: 0 }} end={{ x: 2.5, y: 1.5 }}
    locations={[0.0, 0.4]}
    colors={['#1B75BC', '#9AD8DD']}
    style={{ paddingTop: Platform.OS === "ios" ? 30 : 20 }}>
     <View style={{ flexDirection: 'row', paddingBottom: 15, marginLeft: 0, paddingTop: Platform.OS === "ios" ? 20 : 20 }}>
          <View style={{ flex: 1, paddingRight: 0, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent'}}>
          <Text style={AppStyles.header_title}>NOTIFICATIONS</Text>
            </View>
            <TouchableOpacity style={{ position: "absolute", flex: 0, padding: 10, justifyContent: 'center',alignSelf: 'center', backgroundColor: 'transparent' }}  onPress={() => WSManager.getTopLevelNavigator().dispatch(DrawerActions.openDrawer())} >
              <Image source={IMAGES.ic_drawer_menu} />
            </TouchableOpacity>

          </View>
  </LinearGradient>
);
