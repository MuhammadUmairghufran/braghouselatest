import React, { Component } from 'react';
import { Card, CardItem, Body, Button, Right, Left, Separator, H3, Container, Header, Content, Tab, Tabs, TabHeading, Item, Label, Input, Title } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {
  TouchableOpacity, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, ScrollView, ImageBackground,
  FlatList, SectionList, SectionListScrollParams, Dimensions, Platform, ActivityIndicator,RefreshControl,Alert
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { AppStyles, Images } from '../../Themes'
// import LinearGradient from 'react-native-linear-gradient';
import WSManager from '../../Networking/WSManager';
import { getItem, saveItem } from '../../lib/Session';
import PreferenceConstant from '../../Preferences/PreferenceConstant'
import { convertToStringCapitalizedForm } from '../../Constants/Methods';
import Category from '../../Constants/Methods';
import { styles } from 'react-native-material-ripple/styles';
import Toaster from '../../Utils/Toaster';
import images from '../../Themes/Images';
import Comments from '../../screens/Lobby/Comments';
import * as URLConstants from '../../Networking/URLConstants/';
import Utility from '../../Utils/Utility/';
import Loader from '../../Utils/Loader/';
import IMAGES from '../../Constants/Images';
import * as String from '../../Constants/Strings/';

let screenWidth = Dimensions.get('screen').width

let mContext = null;
let mPrContext = null;

export default class UserProfileBasicInfo extends Component {
  static imagePath = '';

  constructor(props) {
    super(props)
    this.state = {
     loading: false,
     refreshing: false,
      feedList: [],
      imagePath:'',
      currentPage:-1,
      canLoadMoreContent:false,
      userID:'',
     }
  }


   componentDidMount()
  {
    getItem(PreferenceConstant.USER_ID).then((value) => {
      this.setState({userID:value})
      this.getFeedApi();
    })

  }

  shouldComponentUpdate(){
    return true;
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

      <FlatList
        data={this.state.feedList}
        canLoadMore={this.state.canLoadMoreContent}
        onEndThreshold={this.state.feedList.length>=20?this.state.feedList.length-2:0}
        onEndReached={this.state.canLoadMoreContent==true?this.getFeedApi:this.blankData}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
        renderItem={({item,index}) => (item.type == 'profile') ? <PersonalDetailListView/> : null}
      />

      </View>


    );
  }
  blankData=async () => {
  }

deletePost(activity_unique_id,index)
{
  Alert.alert(
    'Brag House',
    String.delete_message,
    [
      {
        text: "Yes", onPress: () => {
          this.deletePost_(activity_unique_id,index)
        }
      },
      { text: "No" },
    ],
    {
      cancelable: true
    })
}
deletePost_(activity_unique_id,index)
{
  const params = {
   activity_unique_id:activity_unique_id,
 };
 this.setState({loading: true});
 WSManager.postData(URLConstants.DELETE_ACTIVITY, params)
 .then(response => {
    this.setState({loading:false});
    var array = [...this.state.feedList]; // make a separate copy of the array
    array.splice(index, 1);
    this.setState({feedList: array});

  //  this.getFeedApi();
  })
 .catch(error => {
   this.setState({loading:false});
   return error;
 });
}
  getFeedApi=async () => {
       var cPage = this.state.currentPage + 1;
     const params = {
      user_id:this.state.userID,
      offset: cPage,
      limit: '20'
    };

    WSManager.postData(URLConstants.USER_ACTIVITY, params)
    .then(response => {
      var data = response.data.data.list;
      this.setState({loading: false});
     this.setState({refreshing: false});
     this.setState({imagePath: response.data.data.image_path});
     console.log("getAllNotifications=="+JSON.stringify(data));
     var headerItem = [];
     headerItem.push({
       "type": "profile"
     });

      if(cPage==0)
      { this.setState({ feedList: [...headerItem, ...data] });
      }else {
       this.setState({ feedList: [...this.state.feedList, ...data] });
       }

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
  static updateFeedData(){
    if(mPrContext){
       getItem(PreferenceConstant.USER_ID).then((value) => {
        mPrContext.getFeedApi(value);
      })
    }
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

  static navigationOptions = {
    header: null
  };


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
                <Image style = {{width: 15, height: 15}} source={Images.ic_edit_white}></Image>
                <Text style={{ marginLeft: 3, textAlign: 'center', fontSize: 15,  color: "#666666", fontFamily:'SourceSansPro-Bold', alignSelf: "flex-end" }} >EDIT</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ height: 1, width: AppStyles.screenWidth, backgroundColor: '#F3F3F3', alignItems: 'baseline', marginBottom: 0 }}></View>
      </View>
      <Separator   style = {{height: 1, backgroundColor: '#99999930'}}  ></Separator>
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
      <Separator   style = {{height: 1, backgroundColor: '#99999930'}}  ></Separator>


      <View>
        <View style={{ height: 50, backgroundColor: 'transparent', justifyContent: 'center' }}>
          <View style={{ flexDirection: 'row', marginHorizontal: 15, justifyContent: 'space-between', alignItems: 'center' }}>
            <View style={{ alignSelf: 'flex-start' }}>
              <Text style={{ fontSize: 14, color: '#666666' }}>Gender</Text>
            </View>
            <View style={{ alignSelf: 'flex-end' }} >
              <Text style={{ fontSize: 14, fontFamily:'SourceSansPro-Bold', color: '#444444' }}>{this.state.Gender != null && this.state.Gender != 'null' && this.state.Gender != '' ? convertToStringCapitalizedForm(this.state.Gender) : ''}</Text>
            </View>
          </View>
        </View>
        <View style={{ height: 1, backgroundColor: '#F3F3F3', alignItems: 'baseline', marginBottom: 0, marginHorizontal: 20 }}></View>
      </View>
      <Separator   style = {{height: 1, backgroundColor: '#99999930'}}  ></Separator>

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
      <Separator   style = {{height: 1, backgroundColor: '#99999930'}}  ></Separator>
      
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


goToCommentsList(item) {

  console.log("act hai bhiya: ",item.activity_id)
  const navigateAction = NavigationActions.navigate({
    routeName: 'Comments',
    params: {items: item, is_brag:false},



  })
  const nav = WSManager.getTopLevelNavigator()
  nav.dispatch(navigateAction)
}


gotToPostDetail(item,path)
{
  const navigateAction = NavigationActions.navigate({
    routeName: 'PostDetail',
    params: {items: item,path:path ,is_not:false},
  })
  const nav = WSManager.getTopLevelNavigator()
  nav.dispatch(navigateAction)
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
                <Text style = {{fontSize:14, fontFamily:'SourceSansPro-Bold', color: '#333333'}}>{this.props.item.first_name+' '+this.props.item.last_name}</Text>
                <Text style = {{fontSize:14, color: '#444444'}}>{' '+this.props.item.message}</Text>
              </View>
              <View>
                <Text style = {{fontSize:13, color: '#999999'}}>
                  {Utility.getFormatedDate(this.props.item.created_date,'ddd, MMM Do - hh:mm A')}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => mPrContext.deletePost(this.props.item.activity_unique_id,this.props.index)} style = {{justifyContent: "center"}}>
                          <Image style = {{width:10,height:10}} source = {IMAGES.close}></Image>
             </TouchableOpacity>
        </View>

        <View style = {{marginTop: 10}}>
          <View><Text style = {{fontSize:18, fontFamily:'SourceSansPro-Bold', color: '#000000'}}> {this.props.item.title}</Text></View>
        </View>

        <View style = {{marginTop: 6}}>
          <View><Text style = {{fontSize:15, color: '#444444',paddingLeft:5}}>{this.props.item.content}</Text></View>
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
              <TouchableOpacity onPress={() =>this.sharePost(this.props.item.title)  }>
              <Image source = {Images.dark_share} style={{width:22, height: 21,marginRight:8}}></Image>
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
       Utility.shareTextMessage(''+firstName+' Shared a post with you. '+"'"+title+"'"+' view more exciting post, place brags & win $. . Join Brag house Use '+firstName+'\'s'+' code '+referralCode+' and earn bonus points')

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

          return(
          // (this.state.selectedPaths.length==1)?
             <TouchableOpacity  onPress={()=>this.actionOnImage(imagePath+"/750x500/"+item.media[0].image_name)}>
             <Image style={{width:'100%',height:screenWidth,alignSelf: 'center'}  } resizeMode='stretch' source = {{uri: imageUrl}}/>
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
