import React, { Component } from 'react';
import {Linking} from 'react-native'
import {  Card, CardItem, Body, Button, Right, Left, Separator, H3, Container, Header, Content, Tab, Tabs, TabHeading, Item, Label, Input, Title } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {
  TouchableOpacity, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, ScrollView, ImageBackground,
  FlatList, SectionList, SectionListScrollParams, Dimensions, Platform, ActivityIndicator,RefreshControl
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { AppStyles, Images } from '../../Themes'
// import LinearGradient from 'react-native-linear-gradient';
import WSManager from '../../Networking/WSManager';
import { getItem, saveItem } from '../../lib/Session';
import PreferenceConstant from '../../Preferences/PreferenceConstant'
import { convertToStringCapitalizedForm, replaceAll } from '../../Constants/Methods';
import Category from '../../Constants/Methods';
import { styles } from 'react-native-material-ripple/styles';
import Toaster from '../../Utils/Toaster';
import images from '../../Themes/Images';
import Comments from '../../screens/Lobby/Comments';
import * as URLConstants from '../../Networking/URLConstants/';
import Utility from '../../Utils/Utility/';
import Loader from '../../Utils/Loader/';
import IMAGES from '../../Constants/Images';
let screenWidth = Dimensions.get('screen').width
import ConstantLib from '../../Constants/ConstantLib/';
import HTML from 'react-native-render-html'
import * as String from '../../Constants/Strings/';

let mContext = null;
let mPrContext = null;

export default class OtherUserProfileScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
     loading: false,
      feedList: [],
      refreshing:'',
      imagePath:'',
      currentPage:-1,
      canLoadMoreContent:false,
      userID:'',
    }
  }
   componentDidMount(){
    setTimeout (() => {
      this.getFeedApi();
   }, 500);
  }
  static navigationOptions = ({ navigation }) => {
    return {
      header: null
    };
  };
  shouldComponentUpdate(){
    return true;
  }
  static updateFeedData(){
        setTimeout (() => {
          var mUID = ConstantLib.OTHER_USER_ID;
          mPrContext.getFeedApi(mUID);
       }, 500);
    }

    _onRefresh() {
      this.setState({ refreshing: true });
      this.setState({ currentPage: -1 });
      this.getFeedApi();
      }


  render() {
    mPrContext=this;
    return (
      <View style={{ backgroundColor: 'white', flex: 1, }}>
      <Loader loading={this.state.loading} />
      {(this.state.feedList.length > 0) ?

          <FlatList
            data={this.state.feedList}
            canLoadMore={this.state.canLoadMoreContent}
            onEndThreshold={this.state.feedList.length>=20?this.state.feedList.length-2:0}
            onEndReached={this.state.canLoadMoreContent==true?this.getFeedApi:this.blankData}
            renderItem={({item}) => (item.type == 'profile') ? <PersonalDetailListView/> : <UserFeedsListView item={item} image={this.state.imagePath}/>}
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
    );
  }
  blankData=async () => {
  }
  getFeedApi=async () => {
    var cPage = this.state.currentPage + 1;
    var mUID = ConstantLib.OTHER_USER_ID;

    const params = {
      user_id:mUID,
      offset: cPage,
      limit: '20'
    };

    WSManager.postData(URLConstants.USER_ACTIVITY, params)
    .then(response => {
      var data = response.data.data.list;
     this.setState({loading: false});
     this.setState({refreshing: false});
     this.setState({imagePath: response.data.data.image_path});

     console.log("getFeedApi============================"+JSON.stringify(data)+'=====================================');

     var headerItem = [];
     headerItem.push({
       "type": "profile"
     });
    //   this.setState({ feedList: [...headerItem, ...data] });
     this.setState({ feedList: data }, function()
     {

     });

     })
    .catch(error => {
      this.setState({loading: false});
        this.setState({refreshing: false});
      Toaster.showLongToast('getAllTeams:'+error.message);
      return error;
    });
  }

  static updateData(){
    PersonalDetailListView.refreshEditData()
  }

}


class PersonalDetailListView extends Component
{

  constructor(props) {
    super(props);
    mContext=this;
    this.state = {
      userProfileData: '',
      Email: '',
      Gender: '',
      Dob: '',
      Ranking: '',
    }
    this.initProfileData()
  }



  initProfileData() {
    getItem(PreferenceConstant.EMAIL).then((value) => {
      this.setState({ Email: value })

    })
    getItem(PreferenceConstant.GENDER).then((value) => {
      varGender = value;
      this.setState({ Gender: varGender })

    })
    getItem(PreferenceConstant.DOB).then((value) => {
      varDOB = value;
      this.setState({ Dob: varDOB })

    })
  }

static refreshEditData(){
  if(mContext){
    mContext.initProfileData()
  }
}


  goToEditUserProfile() {


    const navigateAction = NavigationActions.navigate({
      routeName: 'EditUserProfile',
    })
    const nav = WSManager.getTopLevelNavigator()
    nav.dispatch(navigateAction)
  }


  render()
  {
    mContext=this;
    return(



      <View style = {{marginBottom: 10, elevation: 5, backgroundColor: '#F4F4F4', shadowOffset: { width: 5, height: 5 },
      shadowColor: "#333333",
      shadowOpacity: 0.5,
      shadowRadius: 5, }}>
      <View>
        <View style={{ height: 45, backgroundColor: 'transparent', justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 15, marginRight: 15, justifyContent: "space-between", backgroundColor: 'transparent' }}>
            <View><Text style={{ textAlign: 'center', fontSize: 17, fontFamily:'SourceSansPro-Bold', color: "#4A4A4A", alignSelf: "flex-start" }} >Basic Info</Text></View>
            <View><Text style={{ textAlign: 'center', fontSize: 11, fontFamily:'SourceSansPro-Bold', color: "#666666" }} >  </Text></View>
            <TouchableOpacity onPress={() => { this.goToEditUserProfile() }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={Images.ic_edit_white}></Image>
                <Text style={{ marginLeft: 3, textAlign: 'center', fontSize: 11,  color: "#666666", fontFamily:'SourceSansPro-Bold', alignSelf: "flex-end" }} >EDIT</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: 1, width: AppStyles.screenWidth, backgroundColor: '#F3F3F3', alignItems: 'baseline', marginBottom: 0 }}></View>
      </View>

      <View>
        <View style={{ height: 50, backgroundColor: 'transparent', justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row', marginHorizontal: 15, justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ alignSelf: 'flex-start' }}>
              <Text style={{ fontSize: 14, color: '#666666' }}>Email</Text>
            </View>
            <View style={{ alignSelf: 'flex-end' }} >
              <Text style={{ fontSize: 14, fontFamily:'SourceSansPro-Bold', color: '#444444' }}>{ (this.state.Email != null && this.state.Email != 'null' && this.state.Email != '') ? this.state.Email : "" }</Text>

            </View>
          </View>
        </View>
        <View style={{ height: 1, backgroundColor: '#F3F3F3', alignItems: 'baseline', marginBottom: 0, marginHorizontal: 20 }}></View>
      </View>


      <View>
        <View style={{ height: 50, backgroundColor: 'transparent', justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row', marginHorizontal: 15, justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ alignSelf: 'flex-start' }}>
              <Text style={{ fontSize: 14, color: '#666666' }}>Gender</Text>
            </View>
            <View style={{ alignSelf: 'flex-end' }} >
              <Text style={{ fontSize: 14, fontFamily:'SourceSansPro-Bold', color: '#444444' }}>{this.state.Gender != null && this.state.Gender != 'null' && this.state.Gender != '' ? convertToStringCapitalizedForm(this.state.Gender) : '----'}</Text>
            </View>
          </View>
        </View>
        <View style={{ height: 1, backgroundColor: '#F3F3F3', alignItems: 'baseline', marginBottom: 0, marginHorizontal: 20 }}></View>
      </View>

      <View>
        <View style={{ height: 50, backgroundColor: 'transparent', justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row', marginHorizontal: 15, justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ alignSelf: 'flex-start' }}>
              <Text style={{ fontSize: 14, color: '#666666' }}>Date of Birth</Text>
            </View>
            <View style={{ alignSelf: 'flex-end' }} >
              <Text style={{ fontSize: 14, fontFamily:'SourceSansPro-Bold', color: '#444444' }}>{this.state.Dob != null && this.state.Dob != 'null' && this.state.Dob != '' ? this.state.Dob : ''}</Text>
            </View>
          </View>
        </View>
        <View style={{ height: 1, backgroundColor: '#F3F3F3', alignItems: 'baseline', marginBottom: 0, marginHorizontal: 20 }}></View>
      </View>
      <View>
        <View style={{ height: 50, backgroundColor: 'transparent', justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row', marginHorizontal: 15, justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ alignSelf: 'flex-start' }}>
              <Text style={{ fontSize: 14, color: '#666666' }}>Ranking</Text>
            </View>
            <View style={{ alignSelf: 'flex-end' }} >
              <Text style={{ fontSize: 14, fontFamily:'SourceSansPro-Bold', color: '#444444' }}>#1</Text>
            </View>
          </View>
        </View>
        <View style={{ height: 1, backgroundColor: '#F3F3F3', alignItems: 'baseline', marginBottom: 0, marginHorizontal: 20 }}></View>
      </View>
      </View>



    );
  }
}


class UserFeedsListView extends Component
{

  constructor(props) {
    super(props);
    this.state = {
      loading: false,

    }
  }

toggleLike(item)
{

if(Utility.isLoggedIn())
{
  this.setState({loading: true});

  const params = {
    activity_unique_id:item.activity_unique_id
  };

  WSManager.postData(URLConstants.ACTIVITY_TOGGLE_LIKE, params)
  .then(response => {
    var data = response.data.data;
    var is_like = response.data.data.is_like;
    item.is_like=response.data.data.is_like;
    if(is_like===1){
    item.no_of_likes=item.no_of_likes+1;
    }else {
       item.no_of_likes=item.no_of_likes-1;
    }

   this.setState({loading: false});
   this.setState({refreshing: false});


  })
  .catch(error => {
    this.setState({loading: false});
      this.setState({refreshing: false});
    Toaster.showLongToast('getAllTeams:'+error.message);
    return error;
  });
}
}


goToCommentsList(item) {
if(Utility.isLoggedIn())
{
  
  const navigateAction = NavigationActions.navigate({
    routeName: 'Comments',
    params: {items: item},
    action: NavigationActions.navigate({ routeName: 'Comments' })
  })
  const nav = WSManager.getTopLevelNavigator()
  nav.dispatch(navigateAction)
}
}


gotToPostDetail(item,path)
{
  console.log(JSON.stringify(item))
  const navigateAction = NavigationActions.navigate({
    routeName: 'PostDetail',
    params: {items: item,path:path ,is_not:false},
  })
  const nav = WSManager.getTopLevelNavigator()
  nav.dispatch(navigateAction)
}
 goToProfile(href)
    {

      if (href.toString().indexOf(URLConstants.BASE_URL) != -(1) )
      {
        // http://103.93.136.67/braghouse/user/?ID=74&Type=user
        var SplitUrl=href.split('?');
        if(SplitUrl.length>0)
        {
        var atribute=SplitUrl[1].split('&');
          if(SplitUrl.length>1)
          {
          var UserSplit=atribute[0].split('=');
          var TypeSplit=atribute[1].split('=');
    
             if(UserSplit.length>1 && TypeSplit.length>1)
             {
               var ID=UserSplit[1];
               var Type=TypeSplit[1];

                if(Type==='user')
                {
                  // const navigateAction = NavigationActions.navigate({
                  //   routeName: 'OtherProfileScreen',
                  //   params: { 'user_id': ID },
                  //   action: NavigationActions.navigate({ routeName: 'OtherProfileScreen' }),

                  // })

                  // changed by sandeep dubey because tag redirecting to profile from other profile was not working
                  const pushAction = StackActions.push({
                    routeName: 'OtherProfileScreen',
                    params: {
                      user_id: ID 
                    },
                  });
                  
                  const nav = WSManager.getTopLevelNavigator()
                  nav.dispatch(pushAction)

                }
             }
         }
      }
    }
    else
    {
  
      Linking.openURL(href)
      // return (<WebView
      //     ref={(ref) => { this.webview = ref; }}
      //     source={{ href }}
      //     onNavigationStateChange={(event) => {
      //       if (event.url !== href) {
      //         this.webview.stopLoading();
      //         Linking.openURL(event.url);
      //       }
      //     }}
      //   />)
  
    }
    
    }
    
  render()
  {
    return (
      <TouchableOpacity onPress={() => this.gotToPostDetail(this.props.item,this.props.image)} style = {{marginBottom: 10, elevation: 4, backgroundColor: '#F4F4F4', shadowOffset: { width: 5, height: 5 },
      shadowColor: "#333333",
      shadowOpacity: 0.5,
      shadowRadius: 5, }}>

      <View style = { {paddingHorizontal: 10, paddingTop: 15, paddingBottom: 10}}>
      <Loader loading={this.state.loading} />

        <View style = {{flexDirection: "row",}}>
            <View >
              <Image source={(this.props.item.user_image != null && this.props.item.user_image != '')?{uri:this.props.item.user_image}: Images.default_user} style = {{width: 44, height: 44, borderRadius:22}}></Image>
            </View>
            <View style = {{flex: 1, justifyContent: 'center',  marginHorizontal: 10}}>
              <View style = {{flexDirection: "row"}}>
              {console.log('Check Unde'+JSON.stringify(this.props.item))}
                <Text style = {{fontSize:14, fontFamily:'SourceSansPro-Bold', color: '#333333'}}>{this.props.item.first_name+' '+this.props.item.last_name}</Text>
                <Text style = {{fontSize:14, color: '#444444'}}>{' '+this.props.item.message}</Text>
              </View>
              <View>
                <Text style = {{fontSize:13, color: '#999999'}}>
                  {Utility.getFormatedDate(this.props.item.created_date,'Do, MMM')}
                </Text>
              </View>
            </View>

        </View>

        <View style = {{marginTop: 10}}>
          <View><Text style = {{fontSize:18, fontFamily:'SourceSansPro-Bold', color: '#000000'}}>{this.props.item.title}</Text></View>
        </View>

        <View style = {{marginTop: 6}}>
          <View><HTML onLinkPress={(evt, href) =>this.goToProfile(href)} html={this.props.item.content}
          style = {{fontSize:15, color: '#444444'}}/></View>
        </View>
        <View style = {{marginTop: 6}}>
               {this.showMedia(this.props.item,this.props.image)}
        </View>

      </View>

 


        <View style = { {paddingHorizontal: 10, paddingTop: 8, paddingBottom: 15}}>
             <View style = {{flexDirection: 'row', marginTop: 14, justifyContent: 'center'}}>
              <TouchableOpacity onPress={() => this.toggleLike(this.props.item)}>

              <View style = {{flexDirection: 'row', justifyContent: 'center'}}>
                 <View><Image source = {this.props.item.is_like==1?Images.ic_liked_heart:Images.ic_like_heart} style={{width:21, height: 19, marginRight:8}}></Image></View>

                <View><Text>{this.props.item.no_of_likes}</Text></View>
                </View>
                </TouchableOpacity>

              <TouchableOpacity style={{ flex: 1, alignItems: 'center',marginLeft: 50 }} onPress={() => this.goToCommentsList(this.props.item)}>
              <View style = {{flexDirection: 'row', justifyContent: "center", marginLeft: 40}}>
                <View><Image source = {Images.comment} style={{width:23, height: 21, marginRight:8}}></Image></View>
                <View><Text>{this.props.item.no_of_comments}</Text></View>
              </View>
              </TouchableOpacity>

              <View style = {{flex: 1, alignItems: 'flex-end',}}>
              <TouchableOpacity onPress={() =>  this.sharePost(this.props.item.title)}>
              <Image source = {Images.dark_share} style={{width:22, height: 21, marginRight:8}}></Image>
              </TouchableOpacity>

</View>
            </View>
        </View>

      </TouchableOpacity>
    );
  }


    sharePost(title)
    {
      var firstName;
       var referralCode;

      getItem(PreferenceConstant.FIRST_NAME).then((value) => {
        firstName=value;
        getItem(PreferenceConstant.REF_CODE).then((value) => {
       referralCode=value;

       var map = {
        '"USER_FIRSTNAME"' : firstName,
        '"TITLE"' : title,
        '"CODE"' : referralCode,
    };
      Utility.shareTextMessage(replaceAll(String.Share_Post_Message, map))
         //Utility.shareTextMessage(''+firstName+' Shared a post with you. '+"'"+title+"'"+' view more exciting post, place brags & win $. Join Brag house Use '+firstName+'\'s'+' code '+referralCode+' and earn bonus points')

       })
      })


    }

    
   

    actionOnImage(path) {
       const navigateAction = NavigationActions.navigate({
        routeName: 'CommentMedia',
        params: {imagesPath:path},
        action: NavigationActions.navigate({ routeName: 'CommentMedia' })
      })
      const nav = WSManager.getTopLevelNavigator()
      nav.dispatch(navigateAction)
    }

  showMedia(item,imagePath){

  //  var imagearray[]=item.media;
  if(item.media!==undefined)
  {
    var imageUrl=imagePath+"/750x500/"+item.media[0].image_name;
    resolutionString = ''+this.props.item.media[0].resolution;
    resolutionArray = resolutionString.split('x');
    adjustedImageheight = (resolutionArray[1]/resolutionArray[0]) * (screenWidth-0)

          return(
          // (this.state.selectedPaths.length==1)?
             <TouchableOpacity  onPress={()=>this.actionOnImage(imagePath+"/750x500/"+item.media[0].image_name)}>
             <Image style={{width:screenWidth,height:adjustedImageheight,alignSelf: 'center'}  } resizeMode='stretch' source = {{uri: imageUrl}}/>
             </TouchableOpacity>
              // :(this.state.selectedPaths.length==2)?
              // <View style={{width:'100%',height:'100%'}}>
              //   <Image source={{uri:this.state.selectedPaths[0]}} style={{width:'100%',height:'50%'}} resizeMode='stretch'/>
              //     <Image source={{uri:this.state.selectedPaths[1]}} style={{width:'100%',height:'50%'}}resizeMode='stretch'/>
              // </View>
              // :(this.state.selectedPaths.length==3)?
              // <View style={{width:'100%',height:'100%'}}>
              // <Image source={{uri:this.state.selectedPaths[0]}} style={{flex:1,width:'100%',height:'50%'}}resizeMode='stretch'/>
              //
              //    <View style={{flex:1,flexDirection:'row',width:'100%',height:'100%'}}>
              //      <Image source={{uri:this.state.selectedPaths[1]}} style={{width:'50%',height:'100%'}}resizeMode='stretch'/>
              //      <Image source={{uri:this.state.selectedPaths[2]}} style={{width:'50%',height:'100%'}}resizeMode='stretch'/>
              //    </View>
              // </View>
              // :(this.state.selectedPaths.length==4)?
              // <View style={{width:'100%',height:'100%'}}>
              // <Image source={{uri:this.state.selectedPaths[0]}} style={{flex:1,height:'50%'}}resizeMode='stretch'/>
              // <View style={{flexDirection:'row',flex:1,height:'100%'}}>
              //   <Image source={{uri:this.state.selectedPaths[1]}} style={{flex:1,height:'100%'}}resizeMode='stretch'/>
              //   <Image source={{uri:this.state.selectedPaths[2]}} style={{flex:1,height:'100%'}}resizeMode='stretch'/>
              //   <Image source={{uri:this.state.selectedPaths[3]}} style={{flex:1,height:'100%'}}resizeMode='stretch'/>
              // </View>
              // </View>
              // :(this.state.selectedPaths.length>4)?
              // <View style={{width:'100%',height:'50%'}}>
              // <Image source={{uri:this.state.selectedPaths[0]}} style={{width:'100%',height:'100%'}}resizeMode='stretch'/>
              //
              // <View style={{flexDirection:'row',height:'50%'}}>
              //   <Image source={{uri:this.state.selectedPaths[1]}} style={{flex:1,height:'100%'}}resizeMode='stretch'/>
              //   <Image source={{uri:this.state.selectedPaths[2]}} style={{flex:1,height:'100%'}}resizeMode='stretch'/>
              //        <ImageBackground style={{flex:1,height:'100%' }} source={{uri:this.state.selectedPaths[3]}} resizeMode='stretch'>
              //           <View style={{alignItems:'flex-end'}}>
              //               <Text style={{alignItems:'flex-end', backgroundColor:'white',  fontSize:14, color:'black', fontFamily:'SourceSansPro-Regular'}} > {this.state.text} </Text>
              //            </View>
              //        </ImageBackground>
              // </View>
              // </View>
              // :<View/>
            )
}
  }
}

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const Style = StyleSheet.create({
  NoRecordContainer:{
    height:300,
    width:deviceWidth,
    alignItems:'center',
    backgroundColor:'transparent',
    justifyContent:'center',
  },

});
