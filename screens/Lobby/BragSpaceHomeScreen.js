import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Linking, Text, View, Dimensions, TouchableOpacity, Image, SafeAreaView, StatusBar, Animated, Platform, FlatList, ScrollView } from 'react-native';
import { Button, List, Toast } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import * as String from '../../Constants/Strings/';
import * as Colors from '../../Constants/Colors/';
import IMAGES from '../../Constants/Images/';
import AppStyles from '../../Themes/AppStyles';
import Style from './Style';
import Ripple from 'react-native-material-ripple';
import Loader from '../../Utils/Loader/';
import WSManager from '../../Networking/WSManager';
import * as URLConstants from '../../Networking/URLConstants';
import { NavigationActions } from 'react-navigation';
import {DrawerActions} from 'react-navigation-drawer'
import Carousel from 'react-native-snap-carousel';
import ConstantLib from '../../Constants/ConstantLib';
import { Images } from '../../Themes';
import { getItem, saveItem } from '../../lib/Session';
import Utility from '../../Utils/Utility/';
import PTRView from 'react-native-pull-to-refresh';
import PreferencesConstant, { UserCurrentBalancePreferenceConstant } from '../../Preferences/PreferenceConstant'
import FCM, { FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType, NotificationActionType, NotificationActionOption, NotificationCategoryOption } from "react-native-fcm";
//import ImagePicker from 'react-native-customized-image-picker';
// import * as firebase from 'firebase';
// import FirebaseService from '../../firebase/FirebaseService';
import { ActionSheetCustom as ActionSheet } from 'react-native-actionsheet'
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;


const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[AppStyles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

let mContext = null;

const CustomHeader = ({ navigation }) => (
  <View forceInset={{ bottom: 'never', top: 'never' }}>

    {/* <StatusBar
      translucent
      backgroundColor={'transparent'} /> */}
    <LinearGradient
      start={{ x: 0.6, y: 0 }} end={{ x: 2.5, y: 1.5 }}
      locations={[0.0, 0.4]}
      colors={['#1B75BC', '#9AD8DD']}
      style={{ paddingTop: Platform.OS === "ios" ? 10 : 20 }}>

      <View style={{ flexDirection: 'row', padding: 15, marginLeft: 10, }}>
        <View style={{ flex: 2, alignItems: 'flex-end', paddingRight: 15 }}>
          <Text style={AppStyles.header_title}>Brag Space</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.goBack} style={{ flex: 1, alignItems: "flex-end" }} transparent>
          <Text style={{ color: '#fff', fontSize: 16, textAlign: 'center', }}>Done</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  </View>



);


var currentUser = "";

export default class BragSpaceHomeScreen extends Component {

  moveToOthersProfile(user_id) {

    console.log('user Ki id', PreferencesConstant.USER_ID, ' ', user_id)
    const navigateAction = NavigationActions.navigate({
      routeName: 'OtherProfileScreen',
      params: { 'user_id': user_id },
      action: NavigationActions.navigate({ routeName: 'OtherProfileScreen' })
    })
    const nav = WSManager.getTopLevelNavigator()
    nav.dispatch(navigateAction)

  }

  moveToUserOwnProfile(user_id) {
    const navigateAction = NavigationActions.navigate({
      routeName: 'ProfileScreen',
      params: { 'isFromBottomTab': false },
    })
    const nav = WSManager.getTopLevelNavigator()
    nav.dispatch(navigateAction)
  }

  constructor(props) {
    super(props)
    this.state = {
      activeBragsData: '',
      bragsArrayList: [],
      topBraggersData: [],
      globalArrayList: [],
      hotBragsQuestionsData: [],
      conferenceTitle: 'Upcoming Matches',
      is_login: false,
      userName: '',
      session_key: '',
      userImage: '',
      userBrackBucks: '',
      balance: '',
      loading: false,

      selectedWeek: '',
      currentWeek: '',
      allWeek: [],
      allSeasonWeekArray: [],
      listViewKey: 1,

      carouselStartFromSelectedIndex: 0
    }
  }


  static navigationOptions = ({ navigation }) => {

    return {
      header: null

    };
  };
  _refresh() {
    // you must return Promise everytime
    return new Promise((resolve) => {
      setTimeout(() => {
        mContext.callGetFixtureApi()
        mContext.callTopBraggersApi()
        mContext.callHotBragsQuestionsApi()
        resolve();
      }, 500)
    })
  }
  // _renderConferenceTeamRow = (rowData, sectionID, rowID) => {
  //   return (
  //     <View style={Style.active_brag_parent}>
  //       <TouchableOpacity onPress={() => this.onClickRowItem(rowData)}>
  //         <View style={Style.header_inner_view}>
  //           {
  //             (rowData.type === '0') ?
  //               <Image style={Style.active_brag_img} resizeMode={'contain'} source={IMAGES.img_create_brag} />
  //               : (rowData.type === '1') ?
  //                 <Image style={Style.active_brag_img} resizeMode={'contain'} source={(rowData.conference_image != null && rowData.conference_image != '') ? { uri: rowData.conference_image } : IMAGES.ic_plus_white} />
  //                 : <Image style={Style.active_brag_img} resizeMode={'contain'} source={(rowData. != null && rowData.flag != 'null' && rowData.flag != '') ? { uri: rowData.flag } : IMAGES.default_user} />
  //           }
  //         </View>
  //       </TouchableOpacity>
  //       <View style={{ width: 100, justifyContent: 'center', alignItems: 'center', }}>
  //         {
  //           (rowData.type === '0') ?
  //             <Text numberOfLines={1} ellipsizeMode={'tail'} style={Style.brag_text}>{rowData.name}</Text>
  //             : (rowData.type === '1') ?
  //               <Text numberOfLines={1} ellipsizeMode={'tail'} style={Style.brag_text}>{rowData.conference_name}</Text>
  //               :
  //               <Text numberOfLines={1} ellipsizeMode={'tail'} style={Style.brag_text}>{rowData.team_name}</Text>
  //         }
  //
  //       </View>
  //     </View>
  //   )
  // }
  //




  _rendeFixtureRow = (rowData, sectionID, rowID) => {


    return (
      <TouchableOpacity onPress={() => this.state.currentWeek == this.state.selectedWeek ? this.navigateToFixtureBrags(rowData) : alert('Week ' + this.state.selectedWeek + ' is yet to be start.')} style={{

        backgroundColor: '#fff',
        alignItems: 'center',
        marginLeft: 11,
        marginRight: 2,
        marginBottom: 2,

        marginTop: 2,
        justifyContent: 'center',
        height: 70,
        minWidth: 150,
        paddingLeft: 10,
        paddingRight: 10,
        alignSelf: 'center',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        elevation: 5,

        shadowOffset: { width: 2, height: 2 },
        shadowColor: '#999999',
        shadowOpacity: 0.5,
        shadowRadius: 7,

      }}>

        <View style={{ flexDirection: 'row' }}>
          <Image style={{ flex: 1, width: 30, height: 30, margin: 5 }} source={{ uri: rowData.flag_home }} resizeMode={'contain'} />
          {/* <Text>{rowData.home}</Text> */}
          <Text style={{ padding: 15, textAlign: 'center', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', color: '#00000040', fontFamily: 'SourceSansPro-Bold' }}>VS</Text>
          <Image style={{ flex: 1, width: 30, height: 30, margin: 5 }} source={{ uri: rowData.flag_away }} resizeMode={'contain'} />
          {/* <Text>{rowData.away}</Text> */}
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text style={{
            fontSize: 12,
            color: Colors.LableTextColor,
            fontFamily: 'SourceSansPro-Regular'
          }}>{Utility.getFormatedDate(rowData.season_scheduled_date, 'ddd, MMM Do - hh:mm A')}</Text>
        </View>


      </TouchableOpacity>
    )



  }








  onClickHotBrags(item) {

    const navigateAction = NavigationActions.navigate({
      routeName: 'HotBragQA',
      params: { 'contest_id': item.contest_id, 'contest_unique_id': item.contest_unique_id },
      action: NavigationActions.navigate({ routeName: 'HotBragQA' })
    })
    const nav = WSManager.getTopLevelNavigator()
    nav.dispatch(navigateAction)

  }
  onClickUserProfile(user_id) {
    //TransactionsScreenContainer
    if (Utility.isLoggedIn()) {
      const navigateAction = NavigationActions.navigate({
        routeName: 'ProfileScreen',
        params: { 'user_id': user_id },
        action: NavigationActions.navigate({ routeName: 'ProfileScreen' })
      })
      const nav = WSManager.getTopLevelNavigator()
      nav.dispatch(navigateAction)
    }
  }
  onClickBrackBucks(user_id) {
    if (Utility.isLoggedIn()) {
      const navigateAction = NavigationActions.navigate({
        routeName: 'TransactionsScreenContainer',
        params: { 'user_id': user_id },
        action: NavigationActions.navigate({ routeName: 'TransactionsScreenContainer' })
      })
      const nav = WSManager.getTopLevelNavigator()
      nav.dispatch(navigateAction)
    }

  }

  onClickRowItem(passdata) {
    if (passdata.type == '0') {
      const navigateAction = NavigationActions.navigate({
        routeName: 'MyBrags',
        params: {},
        action: NavigationActions.navigate({ routeName: 'MyBrags' })
      })
      const nav = WSManager.getTopLevelNavigator()
      nav.dispatch(navigateAction)

    } else if (passdata.type == '1') {
      ConstantLib.DATA = passdata;
      const navigateAction = NavigationActions.navigate({
        routeName: 'BHLobbyScreen',
        params: {},
        action: NavigationActions.navigate({ routeName: 'BHLobbyScreen' })
      })
      const nav = WSManager.getTopLevelNavigator()
      nav.dispatch(navigateAction)

    } else if (passdata.type == '2') {
      ConstantLib.DATA2 = passdata;
      const navigateAction = NavigationActions.navigate({
        routeName: 'TeamDetail',
        params: {},
        action: NavigationActions.navigate({ routeName: 'TeamDetail' })
      })
      const nav = WSManager.getTopLevelNavigator()
      nav.dispatch(navigateAction)

    } else if (passdata === 'CreateBragScreen') {
      if (Utility.isLoggedIn()) {
        const navigateAction = NavigationActions.navigate({
          routeName: 'CreateBragScreen',
          params: { isFromUpComing: true },
          action: NavigationActions.navigate({ routeName: 'CreateBragScreen' })
        })
        const nav = WSManager.getTopLevelNavigator()
        nav.dispatch(navigateAction)
      }
    }
    else if (passdata === 'CreatePost') {
      if (Utility.isLoggedIn()) {
        const navigateAction = NavigationActions.navigate({
          routeName: 'CreatePost',
          params: {},
          action: NavigationActions.navigate({ routeName: 'CreatePost' })
        })
        const nav = WSManager.getTopLevelNavigator()
        nav.dispatch(navigateAction)
      }
    }
  }


  navigateToFixtureBrags(rowData) {
    ConstantLib.DATA = rowData;

    const navigateAction = NavigationActions.navigate({
      routeName: 'MatchFixtures',
      params: { item: rowData },
      action: NavigationActions.navigate({ routeName: 'MatchFixtures' })
    })
    const nav = WSManager.getTopLevelNavigator()
    nav.dispatch(navigateAction)
  }
  _renderMidBragsRow = ({ item, index }) => {
    if ((item.contest_id != undefined && item.contest_id != null && item.contest_id != 'null' && item.contest_id !== '') && (item.hot_brag_type == 0)) {
      return (
        <View style={{ marginLeft: 0, }}>
          <View
            style={{
              minHeight: 180, width: deviceWidth * 0.75, flex: 1, justifyContent: 'center',
              alignItems: 'center', borderWidth: 0, shadowColor: '#999999', shadowRadius: 4, shadowOffset: { width: 2, height: 2 },
              shadowOpacity: 0.4, borderColor: 'transparent', elevation: 5, shadowColor: '#000', backgroundColor: 'transparent'
            }}>
         
              <View style={{ alignSelf: 'flex-end', margin: 10 }}><Text style={{ fontSize: 14, fontWeight: '900', fontFamily: 'SourceSansPro-Regular', color: '#999999', }}>Total Pot: <Text style={{ fontSize: 14, fontWeight: '900', fontFamily: 'SourceSansPro-Regular', color: '#000000', }}>{item.total_bet_amount}</Text></Text></View>
              <Ripple onPress={() => this.onClickHotBrags(item)} style={{ flex: 1, marginTop: 10, marginBottom: 10, justifyContent: 'center', alignItems: 'center', marginLeft: 20, marginRight: 20 }} >

                <View style={{ flexDirection: 'row' }}>
                  <Image style={{ flex: 1, width: 80, height: 80, margin: 5 }} source={{ uri: item.match_data.flag_home }} resizeMode={'contain'} />
                  <Text style={{ padding: 15, textAlign: 'center', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', color: '#101010', fontFamily: 'SourceSansPro-Bold' }}>VS</Text>
                  <Image style={{ flex: 1, width: 80, height: 80, margin: 5 }} source={{ uri: item.match_data.flag_away }} resizeMode={'contain'} />
                </View>

              </Ripple>
              <View style={{ alignSelf: 'flex-start', margin: 15 }}><Text style={{ fontSize: 14, fontWeight: '900', fontFamily: 'SourceSansPro-Regular', color: '#999999', }}>Min Point: <Text style={{ fontSize: 14, fontWeight: '900', fontFamily: 'SourceSansPro-Regular', color: '#000000', }}>{item.entry_fee}</Text></Text></View>
            </View>
        </View>
      )
    }
    else if ((item.contest_id != undefined && item.contest_id != null && item.contest_id != 'null' && item.contest_id !== '') && (item.hot_brag_type == 1)) {
      return (
        <View style={{ marginLeft: 0, }}>
          <View
            style={{
              minHeight: 180, width: deviceWidth * 0.75, flex: 1, justifyContent: 'center',
              alignItems: 'center', shadowColor: '#999999', shadowRadius: 4, shadowOffset: { width: 2, height: 2 },
              shadowOpacity: 0.4, elevation: 5, shadowColor: '#000', backgroundColor: 'transparent'
            }}>

            <Ripple onPress={() => this.onClickHotBrags(item)} style={{ flex: 1, margin: 0, width: 300 }} >
              <View style={{ position: 'absolute', width: '100%', height: '100%' }}>
                <Image style={{ flex: 1, }} source={{ uri: item.feature_image }} resizeMode={'contain'} />
              </View>
              <View style={{ flex: 1, justifyContent: 'space-between', width: 300, paddingLeft: 15, paddingRight: 15, backgroundColor: 'transparent' }}>
                <View style={{ alignSelf: 'flex-end', margin: 0, backgroundColor: '#E8E8E8' }}>
                  <Text style={{ fontSize: 14, fontWeight: '900', fontFamily: 'SourceSansPro-Regular', color: '#999999', padding: 5 }}>Total Pot: <Text style={{ fontSize: 14, fontWeight: '900', fontFamily: 'SourceSansPro-Regular', color: '#000000', }}>{item.total_bet_amount}</Text>
                  </Text>
                </View>
                <View style={{ alignSelf: 'flex-start', margin: 0, backgroundColor: '#E8E8E8' }}>
                  <Text style={{ fontSize: 14, fontWeight: '900', fontFamily: 'SourceSansPro-Regular', color: '#999999', padding: 5 }}>Min Point: <Text style={{ fontSize: 14, fontWeight: '900', fontFamily: 'SourceSansPro-Regular', color: '#000000', }}>{item.entry_fee}</Text
                  ></Text>
              </View>
              </View>
            </Ripple>

          </View>
        </View>

      );
    }
    else if ((item.ads_unique_id != undefined && item.ads_unique_id != null && item.ads_unique_id != 'null' && item.ads_unique_id !== '')) {
      return (
        <View style={{ marginLeft: 0, }}>
          <View
            style={{
              minHeight: 180, width: deviceWidth * 0.75, flex: 1, justifyContent: 'center',
              alignItems: 'center', shadowColor: '#999999', shadowRadius: 4, shadowOffset: { width: 2, height: 2 },
              shadowOpacity: 0.4, elevation: 5, shadowColor: '#000', backgroundColor: 'transparent'
            }}>

            <Ripple onPress={() => this.onClickGoToAdvertisementPage(item.target_url)} style={{ flex: 1, width: 300, justifyContent: 'center', alignItems: 'center', }} >

              <View style={{ flexDirection: 'row', width: '100%', height: '100%' }}>

                <Image style={{ flex: 1, }} source={{ uri: item.image_adsense }} resizeMode={'contain'} />

              </View>

            </Ripple>

          </View>
        </View>

      );
    }
    // else {
    // return (
    //   <View style={{ marginLeft: 0, }}>
    //     <View
    //       style={{
    //         minHeight: 180, width: deviceWidth * 0.70, flex: 1, justifyContent: 'center',
    //         alignItems: 'center', borderWidth: 5, shadowColor: '#999999', shadowRadius: 4, shadowOffset: { width: 2, height: 2 },
    //         shadowOpacity: 0.4, borderColor: '#FFFFFF', elevation: 5, shadowColor: '#000', backgroundColor: '#E8E8E8'
    //       }}>
    //       <View style={{ alignSelf: 'flex-end', margin: 5 }}><Text style={{ fontSize: 14, fontWeight: '900', fontFamily: 'SourceSansPro-Regular', color: '#999999', }}>Total Pot: <Text style={{ fontSize: 14, fontWeight: '900', fontFamily: 'SourceSansPro-Regular', color: '#000000', }}>{item.total_bet_amount}</Text></Text></View>
    //       <Ripple onPress={() => this.onClickHotBrags(item)} style={{ flex: 1, marginTop: 30, marginBottom: 30, justifyContent: 'center', alignItems: 'center', marginLeft: 40, marginRight: 40 }} >
    //         <Text numberOfLines={3} style={{ color: '#1B75BC', fontFamily: 'SourceSansPro-Bold', fontWeight: 'bold', fontSize: 22, alignSelf: 'center', alignItems: 'center', textAlign: 'center' }}>{item.slide}</Text>
    //       </Ripple>
    //       <View style={{ alignSelf: 'flex-start', margin: 5 }}><Text style={{ fontSize: 14, fontWeight: '900', fontFamily: 'SourceSansPro-Regular', color: '#999999', }}>Min Point: <Text style={{ fontSize: 14, fontWeight: '900', fontFamily: 'SourceSansPro-Regular', color: '#000000', }}>{item.entry_fee}</Text></Text></View>
    //     </View>
    //   </View>
    // )
    // }
  }


  onClickGoToAdvertisementPage = (href) => {
    Linking.openURL(href)
  }

  _renderBragsInfoRow = (rowData, sectionID, rowID) => {
    return (
      <View style={Style.brag_item}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 20, marginRight: 20, marginTop: 20, }}>
          <View >
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 16, }}>A new brag created in</Text>
              <Text style={{ fontSize: 16, marginLeft: 3, color: Colors.ColorPrimary }}>CHE</Text>
            </View>
            <Text>Mar 2, Sat - 7:30 pm</Text>
          </View>
          <Image source={IMAGES.ic_navigation_cross} />
        </View>

        <View style={Style.question_card_item}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={Style.team_name_text}>Chelsea</Text>
            <Text> VS </Text>
            <Text style={Style.team_name_text}>Everton</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text>Week 2</Text>
            <View style={{ height: 5, width: 5, borderRadius: 2.5, backgroundColor: '#9B9B9B', marginLeft: 3 }}>

            </View>
            <Text style={{ marginLeft: 3 }}>Mar 2, Sat - 7:30 pm</Text>
          </View>
          <Text style={Style.question_text}>Which QB in the SEC will score the most yards this week?</Text>
          <View style={Style.seperator_style}></View>

          <View style={Style.cards_bottom_view}>
            <View>
              <Text style={Style.question_card_lable_text}>MIN POINTS</Text>
              <Text style={Style.question_card_value_text}>10</Text>
            </View>
            <View>
              <Text style={Style.question_card_lable_text}>MAX POINTS</Text>
              <Text style={Style.question_card_value_text}>500</Text>
            </View>
            <View>
              <Text style={Style.question_card_lable_text}>PARTICIPANTS</Text>
              <Text style={Style.question_card_value_text}>10</Text>
            </View>
            <View style={{ justifyContent: 'center' }}>
              <LinearGradient
                start={{ x: 0.6, y: 0 }} end={{ x: 2.5, y: 1.5 }}
                locations={[0.0, 0.4]}
                colors={['#1B75BC', '#9AD8DD']}
                style={Style.play_button_gradient}>
                <Ripple>
                  <Text style={Style.play_button_text}>PLAY</Text>
                </Ripple>
              </LinearGradient>
            </View>

          </View>
        </View>
        <View style={Style.question_footer_share_view}>
          <Ripple>
            <View style={Style.share_and_image}>
              <Image source={IMAGES.ic_share_grey} />
              <Text style={Style.share_text}>SHARE</Text>
            </View>
          </Ripple>
        </View>
      </View>
    )
  }

  static updatedBalance(bal) {
    getItem(UserCurrentBalancePreferenceConstant.POINT_BALANCE).then((value) => {

      console.log('Brag Home wala balance from parent refersh', value)
      mContext.setState({ balance: value })

    })
  }

  static updateUserProfile() {
    var fname
    getItem(PreferencesConstant.FIRST_NAME).then((value) => {

      fname = value

    })

    getItem(PreferencesConstant.LAST_NAME).then((value) => {


      fullName = fname + ' ' + value

      mContext.setState({ userName: fullName })

    })

    getItem(PreferencesConstant.USER_IMAGE).then((value) => {

      mContext.setState({ userImage: value })

    })
  }


  // getCommentList() {
  //   this.setState({ loading: true })
  //   const params = {"EntityGUID":"7675241f-891c-2288-57fc-3628d0d99035"};

  //   WSManager.postData('http://142.93.180.16/api/activity/getAllComments', params)
  //     .then(response => {
  //         console.log('test api: ',JSON.stringify(response.data))
  //     })
  //     .catch(error => {

  //     });
  // }
  componentDidMount() {
    mContext = this;
    // this.getCommentList();

    FCM.on(FCMEvent.Notification, notif => {
      if (notif.opened_from_tray) {

        this.onNotificationClickEvent(notif);
      }
    });
    BragSpaceHomeScreen.updateUserProfile()
    getItem(PreferencesConstant.SESSION_KEY).then((value) => {

      this.setState({ session_key: value })
      this.setState({ conferenceTitle: "Upcoming Matches" })
     
      // this.setState({ conferenceTitle: "Week" })


      this.callWebServiceToGetAllWeek()
      // if (value !== null && value !== '') {
      //   this.setState({ conferenceTitle: "Active Brags" })
      // }
      // else {
      //   this.setState({ conferenceTitle: "Conference" })
      //
      // }

      // firebase.auth().onAuthStateChanged(function (user) {
      //   if (user) {
      //     currentUser = user;
      //   }

      //   mContext.doFirebaseLogin();
      // });

    })





    this.subs = [
      this.props.navigation.addListener('willFocus', () => {
        mContext = this;
        this.callHotBragsQuestionsApi();
        getItem(UserCurrentBalancePreferenceConstant.POINT_BALANCE).then((value) => {

          console.log('Brag Home wala balance', value)
          this.setState({ balance: value })

        })
      }),
    ];
    this.callGetFixtureApi()
    this.callTopBraggersApi()
    // this.doFirebaseLogin();
  }



  // doFirebaseLogin() {

  //   if (currentUser != null && currentUser != "") {
  //     this.proceedAfterFirebaseLogin(currentUser);
  //   } else {
  //     firebase.auth().createUserWithEmailAndPassword(ConstantLib.EMAIL, ConstantLib.EMAIL)
  //       .then((user) => {
  //         this.proceedAfterFirebaseLogin(user.user);
  //       })
  //       .catch((error) => {
  //         const { code, message } = error;
  //         if (code == "auth/email-already-in-use") {

  //           firebase.auth().signInWithEmailAndPassword(ConstantLib.EMAIL, ConstantLib.EMAIL)
  //             .then((user) => {
  //               this.proceedAfterFirebaseLogin(user.user);
  //             })
  //             .catch((error) => {
  //               const { code, message } = error;
  //               console.log("code2==" + code + ", error==" + message)
  //             });
  //         }
  //         else {
  //           console.log("code3==" + code + ", error==" + message)
  //         }
  //       });
  //   }
  // }

  // proceedAfterFirebaseLogin(user) {
  //   currentUser = user;

  //   this.addUserToFirebase();
  // }


  // addUserToFirebase() {

  //   let user = {
  //     id: ConstantLib.USER_ID,
  //     email: ConstantLib.EMAIL,
  //     name: ConstantLib.FIRST_NAME + " " + ConstantLib.LAST_NAME,
  //     rooms: [],
  //   }

  //   FirebaseService.database()
  //     .ref('users/' + currentUser.uid)
  //     .once('value', (snapshot) => {
  //       if (JSON.stringify(snapshot) == null || JSON.stringify(snapshot) == "null") {
  //         FirebaseService.database()
  //           .ref('users/' + currentUser.uid)
  //           .push()
  //           .set(user, (error) => {
  //             if (error) {
  //               console.log("Error", error);
  //             } else {
  //               console.log("Success", user);
  //             }
  //           })
  //       }
  //       else {
  //         snapshot.forEach(function (data) {
  //           snapshot.ref.child(data.key).set(data.val());
  //         });
  //       }

  //     }, (errorObject) => {
  //       console.log("Error", errorObject);
  //     })

  // }

  componentWillUnmount() {
    this.subs.forEach((sub) => {
      sub.remove();
    });
  }


  callGetHomeConferenceTeamApi() {
    this.setState({ loading: true })
    const params = {
      offset: 0,
      limit: 10
    };

    WSManager.postData(URLConstants.GET_HOME_CONFERENCE_TEAM, params)
      .then(response => {
        this.setState({ loading: false }, function () {
          setTimeout(() => {
            var data = response.data.data;
            var conferenceListArray = data.conference_list;
            var teamList = data.team_list;
            for (let i = 0; i < conferenceListArray.length; i++) {
              conferenceListArray[i].type = '1';
            }
            for (let i = 0; i < teamList.length; i++) {
              teamList[i].type = '2';
            }





            var allItems = [];

            if (ConstantLib.SESSION_KEY !== null && ConstantLib.SESSION_KEY !== '') {
              allItems.push({
                "name": "My Brags",
                "type": "0"
              });
            }

            this.setState({ globalArrayList: [...allItems, ...conferenceListArray] });
            var updatedArray = [...this.state.globalArrayList];
            this.setState({ globalArrayList: [...updatedArray, ...teamList] });
          }, 200);

        })



        //console.log('ConferenceAndTeamsApi Success = ' + JSON.stringify(data));
      })
      .catch(error => {
        this.setState({ loading: false }, function () {
          setTimeout(() => {
            //Toaster.showLongToast('Error = ' + JSON.stringify(error.response.data));
            return error;
          }, 200);
        })
      });
  }
  showWeekOptions = () => {
    this.actionSheetWeeks.show()
  }
  callWebServiceToGetAllWeek() {

    this.setState({ loading: true })
    const params = {
      sports_id: '2',
      league_id: '113',


    };

    WSManager.postData(URLConstants.GET_ALL_WEEK, params)
      .then(response => {
        this.setState({ loading: false }, function () {
          setTimeout(() => {
            var data = response.data.data;

            this.setState({ currentWeek: data.current_week }, () => {
             // alert(JSON.stringify(data))
              if (this.state.selectedWeek == '') {
                this.state.selectedWeek = data.current_week
              }
            });
            this.setState({ allWeek: data.all_week })

            const filteredArray = data.all_week.map((data) => {
              return (<Text style={{ color: '#000000' }}>{data.season_week}</Text>);
            })

            this.setState({ allSeasonWeekArray: filteredArray })

          }, 200);

        })

      })
      .catch(error => {
        this.setState({ loading: false }, function () {
          setTimeout(() => {
            //console.log('Error = ' + JSON.stringify(error.response.data));
            return error;
          }, 200);
        })
      });
  }
  searchFixtuesForSelectedWeek(index) {
    //console.log(JSON.stringify(index, this.state.allWeek[index]))
    if(typeof(this.state.allWeek[index])!='undefined'){
      this.setState({ currentWeek: this.state.allWeek[index].season_week })
      this.setState({ selectedWeek: this.state.allWeek[index].season_week }, () => {
        setTimeout(() => {
          this.callGetFixtureApi()
  
        }, 200);
      })
    }
  
  }
  callGetFixtureApi() {
    this.setState({ loading: true })
    const params = {
      sports_id: '2',
      league_id: '113',
      status: '0',
      week: this.state.selectedWeek

    };

    WSManager.postData(URLConstants.GET_FIXTURE_LIST, params)
      .then(response => {
        this.setState({ loading: false }, function () {
          setTimeout(() => {
            var data = response.data.data;

            this.setState({ globalArrayList: data.match_list }, () => {
              setTimeout(() => {
                //this.upcomingMatchesList

                this.forceMount

              }, 200);
            });
            console.log('callGetFixtureApi = ' + JSON.stringify(data.match_list));
          }, 200);

        })

      })
      .catch(error => {
        this.setState({ loading: false }, function () {
          setTimeout(() => {
            //console.log('Error = ' + JSON.stringify(error.response.data));
            return error;
          }, 200);
        })
      });
  }



  forceMount = () => {
    this.setState(({ listViewKey }) => ({
      listViewKey: listViewKey + 1
    }));
  }



  callHotBragsQuestionsApi() {
    this.setState({ loading: true })
    const params = {
      offset: 0,
      limit: 10
    };

    WSManager.postData(URLConstants.GET_HOT_BRAGS_QUESTION_API, params)
      .then(response => {
        this.setState({ loading: false }, function () {
          setTimeout(() => {

            var data = response.data.data;
            let i = 0;
            for (i = 0; i < data.contest_list.length; i++) {
              if ((data.contest_list[i].ads_unique_id != undefined && data.contest_list[i].ads_unique_id != null && data.contest_list[i].ads_unique_id != 'null' && data.contest_list[i].ads_unique_id !== '')) {
                this.setState({ carouselStartFromSelectedIndex: i }, () => {
                  this.setState({ hotBragsQuestionsData: data.contest_list })
                })
                break;
              }
            }

            if (i == data.contest_list.length) {
              this.setState({ carouselStartFromSelectedIndex: 0 }, () => {
                this.setState({ hotBragsQuestionsData: data.contest_list })
              })

            }


            // (( item.ads_unique_id != undefined && item.ads_unique_id != null && item.ads_unique_id != 'null' && item.ads_unique_id !== ''))
            console.log('callHotBragsQuestionsApi Success = ' + JSON.stringify(data));
          }, 200);
        })
      })
      .catch(error => {
        //alert(JSON.stringify(error.response.data));

        this.setState({ loading: false })
        //console.log('Error = ' + JSON.stringify(error.response.data));
        return error;
      });
  }

  callTopBraggersApi() {
    this.setState({ loading: true })
    const params = {
      limit: 3
    };

    WSManager.postData(URLConstants.GET_TOP_BRAGGER, params)
      .then(response => {
        this.setState({ loading: false }, function () {
          setTimeout(() => {
            var data = response.data.data;
            this.setState({ topBraggersData: data.leaderboard })
            console.log(data)
          }, 200);
        })
        //console.log('TopBraggersApi Success = ' + JSON.stringify(data));
      })
      .catch(error => {
        this.setState({ loading: false }, function () {
          //console.log('Error = ' + JSON.stringify(error.response.data));
          return error;
        })
      });
  }

  openChatScreen() {
//alert(22)
    const navigateAction = NavigationActions.navigate({
      routeName: 'ChatListing',
      action: NavigationActions.navigate({
        routeName: 'ChatListing'
      })
    })
    const nav = WSManager.getTopLevelNavigator()
    nav.dispatch(navigateAction)

    // if (Utility.isLoggedIn()) {
    //   const navigateAction = NavigationActions.navigate({
    //     routeName: 'TransactionsScreenContainer',
    //    params: { 'user_id': user_id },
    //     action: NavigationActions.navigate({ routeName: 'TransactionsScreenContainer' })
    //   })
    //   const nav = WSManager.getTopLevelNavigator()
    //   nav.dispatch(navigateAction)
    // }
  }

  render() {
    mContext = this;
    return (
      <View style={[Style.Wrapper]}>
      
      <Loader loading={this.state.loading} />
      

        <LinearGradient
          start={{ x: 0.6, y: 0 }} end={{ x: 2.5, y: 1.5 }}
          locations={[0.0, 0.4]}
          colors={['#1B75BC', '#9AD8DD']}
          style={{ paddingTop: Platform.OS === "ios" ? 30 : 20 }}>

          <View style={{ flexDirection: 'row', paddingBottom: 15, justifyContent: 'flex-start', alignItems: 'center', marginLeft: 0, paddingTop: Platform.OS === "ios" ? 20 : 20 }}>
            <View style={{ flex: 1, paddingRight: 0, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
              <Image source={Images.ic_BH_Nav_Logo} />
            </View>
            <TouchableOpacity style={{ position: "absolute", flex: 0, padding: 10, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', backgroundColor: 'transparent' }} onPress={() => WSManager.getTopLevelNavigator().dispatch(DrawerActions.openDrawer())} >
              <Image source={IMAGES.ic_drawer_menu} />
            </TouchableOpacity>

             <TouchableOpacity style={{ padding: 20, position: "absolute", flex: 0, right: 0, justifyContent: 'center', alignItems: 'center', alignSelf: 'center', backgroundColor: 'transparent' }} onPress={() => this.openChatScreen()} >
              <Image source={Images.Group9} resizeMode="stretch" />
            </TouchableOpacity> 

          </View>
        </LinearGradient>
        <View style={{ zIndex: 999, flexDirection: 'row', height: 50, width: '100%', backgroundColor: "#FFFFFF", marginBottom: 0, shadowColor: "#666666", shadowRadius: 10, shadowOpacity: 0.5, shadowOffset: { width: 1, height: 2 } }} >
          <TouchableOpacity style={{ flexDirection: 'row', flex: 1, justifyContent: 'center' }} onPress={() => this.onClickUserProfile(PreferencesConstant.USER_ID)}>
            <View style={{ backgroundColor: 'transparent', alignItems: 'center', justifyContent: "center", paddingHorizontal: 12, paddingVertical: 7 }}>
              <Image source={(this.state.userImage != null && this.state.userImage != 'null' && this.state.userImage != '') ? ({ uri: this.state.userImage }) : Images.default_user} style={{ width: 36, height: 36, borderRadius: 18 }}></Image></View>
            <View style={{ flex: 1, backgroundColor: 'transparent', alignItems: 'flex-start', justifyContent: "center" }}>
              <Text style={{ fontFamily: 'SourceSansPro-Regular', fontSize: 16, fontWeight: '900', color: '#666666' }}>{this.state.session_key === null || this.state.session_key === '' ? '' : this.state.userName}</Text></View>
          </TouchableOpacity>

          <TouchableOpacity style={{ backgroundColor: 'transparent', alignItems: 'flex-end', justifyContent: "center", marginRight: 0 }} onPress={() => this.onClickBrackBucks(PreferencesConstant.USER_ID)}>

            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: "center", marginRight: 0, paddingHorizontal: 13, paddingVertical: 2.6, borderRadius: 20 }}>
              <View><Text style={{ fontSize: 14, fontWeight: '900', fontFamily: 'SourceSansPro-Regular', color: '#1B75BC', marginRight: 5 }}>{this.state.balance} BB </Text></View>
              <View ><Image style={{ width: 15, height: 15 }} source={Images.ic_plus_blue}></Image></View>
            </View>

          </TouchableOpacity>
        </View>
        {/* <View style={{ flexDirection: 'row', height: 50, width: '100%' }} >
          <TouchableOpacity style={{ flexDirection: 'row', flex: 1, marginHorizontal: 10 }} onPress={() => this.onClickRowItem('CreatePost')}>
            <View style={{ backgroundColor: 'transparent', borderWidth: 0.2, borderRadius: 0, width: '100%', borderColor:'#66666633', alignItems: 'flex-start' , justifyContent: "center", paddingHorizontal: 12, paddingVertical: 7 }}>
            <Text style = {{fontFamily: 'SourceSansPro-Regular', fontSize: 16, color: '#666666'}}>Click here to write something ...</Text>
            </View>
            
          </TouchableOpacity>

         
        </View> */}
        <PTRView onRefresh={this._refresh}>
          <ScrollView style={[Style.Wrapper, { marginBottom: 60, marginTop: 20 }]}
            showsVerticalScrollIndicator={false}>

            {/* <MyStatusBar backgroundColor="rgba(0,0,0,0)" barStyle="light-content" /> */}




            <View style={{ minHeight: 150, backgroundColor: '#fff', elevation: 5, shadowColor: '#999999', shadowOffset: { width: 5, height: 5 }, shadowOpacity: 0.3, shadowRadius: 5 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                {/* <View style={{ alignSelf: 'flex-start', marginLeft: 10 }}><Text style={{ color: '#1B75BC', fontSize: 18, fontFamily: 'SourceSansPro-Bold' }} >{this.state.conferenceTitle} {this.state.currentWeek}</Text></View> */}
                <View style={{ alignSelf: 'flex-start', marginLeft: 10 }}><Text style={{ color: '#1B75BC', fontSize: 18, fontFamily: 'SourceSansPro-Bold' }} >{this.state.conferenceTitle}</Text></View>
                <TouchableOpacity onPress = {() => this.showWeekOptions()} style = {{justifyContent: "center", marginRight: 10}}>
                  <Text style={{ color: '#1B75BC', fontSize: 18, fontFamily: 'SourceSansPro-Bold' }} >{'Week: '+this.state.currentWeek}</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flexDirection: 'row', paddingTop: 15, marginRight: 12 }} key={this.state.listViewKey}>
                <List
                  ref={uml => this.upcomingMatchesList = uml}
                  showsHorizontalScrollIndicator={false}
                  horizontal={true}
                  dataArray={this.state.globalArrayList}
                  renderRow={(item, sectionID, rowID) => this._rendeFixtureRow(item, sectionID, rowID)}>
                </List>

              </View>
            </View>

            <View style={[{ height: 0, marginTop: 10, alignSelf: 'center' }, this.state.hotBragsQuestionsData.length > 0 && { height: 200, marginTop: 10, }]}>
              <Carousel
                ref={(c) => { this._carousel = c; }}
                data={this.state.hotBragsQuestionsData}
                renderItem={this._renderMidBragsRow}
                activeSlideAlignment='center'
                sliderWidth={deviceWidth}
                itemWidth={deviceWidth * 0.75}
                autoplay={true}
                firstItem={this.state.carouselStartFromSelectedIndex}
                autoplayDelay={1000}
                loop={true}

              />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 15 }}>
              <Text style={{ color: '#1B75BC', fontSize: 18, fontFamily: 'SourceSansPro-Bold' }} >Top Braggers</Text>
            </View>
            {this.state.topBraggersData.length > 0 && <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>

              <View style={{ width: deviceWidth, flexDirection: 'row', minHeight: 205, paddingLeft: 30, paddingRight: 30, flex: 1, top: 15 }}>



                <TouchableOpacity style={[Style.active_brag_parent]} onPress={() => ((PreferencesConstant.USER_ID != this.state.topBraggersData[1].user_id) ? this.moveToOthersProfile(this.state.topBraggersData[1].user_id) : this.moveToUserOwnProfile(this.state.topBraggersData[1].user_id))}>

                  <View style={Style.braggers_small_image_view}>
                    <Image style={{ height: 74, width: 74, borderRadius: 37 }} source={(this.state.topBraggersData[1].user_image != null && this.state.topBraggersData[1].user_image != '') ? ({ uri: this.state.topBraggersData[1].user_image }) : IMAGES.signUpIcUserDisable} />
                  </View>

                  <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <Text numberOfLines={2} style={Style.braggers_name_text}>{((this.state.topBraggersData[1].first_name != null && this.state.topBraggersData[1].last_name != '') ? this.state.topBraggersData[1].first_name + ' ' + this.state.topBraggersData[1].last_name : this.state.topBraggersData[1].user_name)}</Text>
                  </View>
                  {Utility.checkLoggedIn() ?
                    <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#1B75BC', marginTop: 0, borderRadius: 13, paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10 }}>
                      <Text style={{
                        fontSize: 12, flexWrap: 'wrap', color: '#fff',
                      }}>{((this.state.topBraggersData[1].total_wins != null && this.state.topBraggersData[1].total_wins != '') ? 'BB ' + this.state.topBraggersData[1].total_wins : "")}</Text>
                    </View>
                    : null
                  }

                </TouchableOpacity>



                <TouchableOpacity style={[Style.active_brag_parent, { flex: 1, marginBottom: 20, }]} onPress={() => ((PreferencesConstant.USER_ID != this.state.topBraggersData[0].user_id) ? this.moveToOthersProfile(this.state.topBraggersData[0].user_id) : this.moveToUserOwnProfile(this.state.topBraggersData[0].user_id))}>

                  <View style={Style.braggers_Bigger_image_view}>
                    <Image style={{ height: 94, width: 94, borderRadius: 47 }} source={(this.state.topBraggersData[0].user_image != null && this.state.topBraggersData[0].user_image != '') ? ({ uri: this.state.topBraggersData[0].user_image }) : IMAGES.signUpIcUserDisable} />
                  </View>

                  <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <Text numberOfLines={2} style={Style.braggers_name_text}>{((this.state.topBraggersData[0].first_name != null && this.state.topBraggersData[0].last_name != '') ? this.state.topBraggersData[0].first_name + ' ' + this.state.topBraggersData[0].last_name : this.state.topBraggersData[0].user_name)}</Text>
                  </View>

                  {Utility.checkLoggedIn() ?
                    <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#1B75BC', marginTop: 0, borderRadius: 13, paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10 }}>
                      <Text style={{
                        fontSize: 12, flexWrap: 'wrap', color: '#fff',
                      }}>{((this.state.topBraggersData[0].total_wins != null && this.state.topBraggersData[0].total_wins != '') ? 'BB ' + this.state.topBraggersData[0].total_wins : "")}</Text>
                    </View>
                    : null
                  }

                </TouchableOpacity>


                <TouchableOpacity style={Style.active_brag_parent} onPress={() => ((PreferencesConstant.USER_ID != this.state.topBraggersData[2].user_id) ? this.moveToOthersProfile(this.state.topBraggersData[2].user_id) : this.moveToUserOwnProfile(this.state.topBraggersData[2].user_id))}>

                  <View style={Style.braggers_small_image_view}>
                    <Image style={{ height: 74, width: 74, borderRadius: 37 }} source={(this.state.topBraggersData[2].user_image != null && this.state.topBraggersData[2].user_image != '') ? ({ uri: this.state.topBraggersData[2].user_image }) : IMAGES.signUpIcUserDisable} />
                  </View>

                  <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                    <Text numberOfLines={2} style={Style.braggers_name_text}>{((this.state.topBraggersData[2].first_name != null && this.state.topBraggersData[2].last_name != '') ? this.state.topBraggersData[2].first_name + ' ' + this.state.topBraggersData[2].last_name : this.state.topBraggersData[2].user_name)}</Text>
                  </View>

                  {Utility.checkLoggedIn() ?
                    <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#1B75BC', marginTop: 0, borderRadius: 13, paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10 }}>
                      <Text style={{
                        fontSize: 12, flexWrap: 'wrap', color: '#fff',
                      }}>{((this.state.topBraggersData[2].total_wins != null && this.state.topBraggersData[2].total_wins != '') ? 'BB ' + this.state.topBraggersData[2].total_wins : "")}</Text>
                    </View>
                    : null
                  }
                </TouchableOpacity>

              </View>
            </ScrollView>}

          </ScrollView>
        </PTRView>

        <Ripple onPress={() => this.onClickRowItem('CreateBragScreen')} style={{
          height: 60, position: 'absolute', bottom: 0, flexDirection: 'row', width: deviceWidth, alignItems: 'center',
          backgroundColor: '#fff', justifyContent: 'center', elevation: 10, shadowColor: '#000', shadowOffset: { height: 2, width: 2 }, shadowOpacity: 0.4
        }}>
          <View style={{ flexDirection: 'row' }} ><Text style={{ color: '#222222', fontSize: 22, fontFamily: 'SourceSansPro-Regular', fontWeight: '600' }}>Create Your Own Brag</Text><Image style={{ marginLeft: 13 }} source={Images.ic_plus_blue}></Image></View>
          <Image source={IMAGES.ic_plus_white} />
        </Ripple>

        <ActionSheet
          ref={o => this.actionSheetWeeks = o}
          title={<Text style={{ color: '#000', fontSize: 18 }}>Select Week</Text>}
          options={this.state.allSeasonWeekArray}
          cancelButtonIndex={0}
          onPress={(index) => { 
            this.searchFixtuesForSelectedWeek(index) }}

        />
      {/* </SafeAreaView> */}
        </View>
    );
  }








  onNotificationClickEvent(item) {

    console.log('userDetailss ', item['gcm.notification.notification_type'])

    var notification_type;
    var userDetails;

    if (Platform.OS == 'ios') {
      notification_type = item['gcm.notification.notification_type'];
      userDetails = JSON.parse(item['gcm.notification.content']);

    } else {
      notification_type = item.notification_type;
      userDetails = JSON.parse(item.content);

    }


    if (notification_type === '4' || notification_type === '6' || notification_type === '7' ||
      notification_type === '25' || notification_type === '26' || notification_type === '27' || notification_type === '28') {

      const navigateAction = NavigationActions.navigate({
        routeName: 'TransactionsScreenContainer',
        index: 0,
        params: {},
        action: NavigationActions.navigate({ routeName: 'TransactionsScreenContainer' })
      })
      const nav = WSManager.getTopLevelNavigator()
      nav.dispatch(navigateAction)
    }
    else if (notification_type === '35') {
      const navigateAction = NavigationActions.navigate({
        routeName: 'OtherProfileScreen',
        index: 0,
        params: { 'user_id': userDetails.user_id },
        action: NavigationActions.navigate({ routeName: 'OtherProfileScreen' })
      })
      const nav = WSManager.getTopLevelNavigator()
      nav.dispatch(navigateAction)
    }

    else if (notification_type === '20') {
      const navigateAction = NavigationActions.navigate({
        routeName: 'BragBordParent',
        index: 0,
        params: {},
        action: NavigationActions.navigate({ routeName: 'BragBordParent' })
      })
      const nav = WSManager.getTopLevelNavigator()
      nav.dispatch(navigateAction)
    }
    else if (notification_type === '1' || notification_type === '8') {
      const navigateAction = NavigationActions.navigate({
        routeName: 'BHEntries',
        index: 0,
        params: { 'contest_id': userDetails.contest_id, 'contest_unique_id': userDetails.contest_unique_id, 'conference_name': userDetails.conference_name, 'isFromConference': 'false' },
        action: NavigationActions.navigate({ routeName: 'BHEntries' })
      })
      const nav = WSManager.getTopLevelNavigator()
      nav.dispatch(navigateAction)
    }
    else if (notification_type === '31') {
      const navigateAction = NavigationActions.navigate({
        routeName: 'BragSpace',
        index: 0,
        params: {},
        action: NavigationActions.navigate({ routeName: 'BragSpace' })
      })
      const nav = WSManager.getTopLevelNavigator()
      nav.dispatch(navigateAction)
    }
    else if (notification_type === '36' || notification_type === '37') {
      if (userDetails.entity_type == '2') {
        const navigateAction = NavigationActions.navigate({
          routeName: 'OtherProfileScreen',
          index: 0,
          params: { 'user_id': userDetails.user_id, 'is_not': true },
          action: NavigationActions.navigate({ routeName: 'OtherProfileScreen' })
        })
        const nav = WSManager.getTopLevelNavigator()
        nav.dispatch(navigateAction)
      }
      else {

        const navigateAction = NavigationActions.navigate({
          routeName: 'PostDetail',
          index: 0,
          params: { 'activity_id': userDetails.activity_id, 'is_not': true },
          action: NavigationActions.navigate({ routeName: 'PostDetail' })
        })
        const nav = WSManager.getTopLevelNavigator()
        nav.dispatch(navigateAction)
      }

    }
  }








}
