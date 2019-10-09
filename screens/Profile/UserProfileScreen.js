import React, { Component } from 'react';
import {Linking} from 'react-native'
import {
  TouchableOpacity, StyleSheet, Text, View, Image, FlatList, Dimensions, RefreshControl,Alert
} from 'react-native';
import { NavigationActions } from 'react-navigation';
import { AppStyles, Images } from '../../Themes'
// import LinearGradient from 'react-native-linear-gradient';
import WSManager from '../../Networking/WSManager';
import { getItem } from '../../lib/Session';
import PreferenceConstant from '../../Preferences/PreferenceConstant'
import { convertToStringCapitalizedForm, replaceAll } from '../../Constants/Methods';
import Toaster from '../../Utils/Toaster';
import * as URLConstants from '../../Networking/URLConstants/';
import Utility from '../../Utils/Utility/';
import Loader from '../../Utils/Loader/';
import IMAGES from '../../Constants/Images';
import * as String from '../../Constants/Strings/';
import HTML from 'react-native-render-html'
let screenWidth = Dimensions.get('screen').width

let mContext = null;
let mPrContext = null;

export default class UserProfileScreen extends Component {
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

    onClickRowItem(passdata)
{
  if (passdata === 'CreatePost') {
    if (Utility.isLoggedIn()) 
    {
      const navigateAction = NavigationActions.navigate({
        routeName: 'CreatePost_',
        params: {isFromUserProfile:true},
        action: NavigationActions.navigate({ routeName: 'CreatePost_' })
      })
      const nav = WSManager.getTopLevelNavigator()
      nav.dispatch(navigateAction)
    }
  }
}

  render() {
    mPrContext=this;
    return (
      <View style={{ backgroundColor: 'white', flex: 1, }}>

      <Loader loading={this.state.loading} />

 <View style={[ _styles.shadowContainer,{ flexDirection: 'row',zIndex: 999, height: 60, width: '100%',   }]} >
          <TouchableOpacity style={{ flexDirection: 'row',  flex: 1, borderWidth: 0.2, borderRadius: 0,borderColor:'#66666633',paddingHorizontal: 10, paddingVertical: 0, }} onPress={() => this.onClickRowItem('CreatePost')}>
            <View style = {{alignSelf: "center",}}>
              <Image style = {{width: 44, height: 44, borderRadius:22, }} source = {this.props.screenProps.userImage!= null && this.props.screenProps.userImage != 'null' && this.props.screenProps.userImage != ''?{uri: this.props.screenProps.userImage}:Images.default_user}></Image>
            </View>
            <View style={{ backgroundColor: 'transparent', width: '100%',  alignItems: 'flex-start' , justifyContent: "center", paddingHorizontal: 12, paddingVertical: 7 }}>
            <Text style = {{fontFamily: 'SourceSansPro-Regular', fontSize: 16, color: '#666666'}}>Click here to write something ...</Text>
            </View>
            
          </TouchableOpacity>

         
        </View>

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
        renderItem={({item,index}) => (item.type == 'profile') ? null: <UserFeedsListView index={index} item={item} image={this.state.imagePath} />}
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
 .then(() => {
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

const _styles = StyleSheet.create({
  shadowContainer:{
    backgroundColor:'white',
    shadowOffset: { width: 5, height: 5 },
      shadowColor: "#333333",
      shadowOpacity: 0.5,  
      shadowRadius: 10,
      marginBottom: 0,
  }
})


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
              <Text style={{ fontSize: 14, fontFamily:'SourceSansPro-Bold', color: '#444444' }}>{this.state.Gender != null && this.state.Gender != 'null' && this.state.Gender != '' ? convertToStringCapitalizedForm(this.state.Gender) : ''}</Text>
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
  this.setState({loading: true});

  const params = {
    activity_unique_id:item.activity_unique_id
  };

  WSManager.postData(URLConstants.ACTIVITY_TOGGLE_LIKE, params)
  .then(response => {
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

goToProfile(href)
  {
  
    
    
    if (href.toString().indexOf(URLConstants.BASE_URL) != -(1) )
    {
      
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
                const navigateAction = NavigationActions.navigate({
                  routeName: 'OtherProfileScreen',
                  params: {'user_id':ID},
                  action: NavigationActions.navigate({ routeName: 'OtherProfileScreen' })
                })
                const nav = WSManager.getTopLevelNavigator()
                nav.dispatch(navigateAction)
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
      <TouchableOpacity onPress={() => this.gotToPostDetail(this.props.item,this.props.image)} style = {{ marginTop:10, elevation: 4, backgroundColor: '#F4F4F4', shadowOffset: { width: 5, height: 5 },
      shadowColor: "#333333",
      shadowOpacity: 0.5,  
      shadowRadius: 5, }}>
    
      <View style = { { marginTop:0, paddingHorizontal: 10, paddingTop: 15, paddingBottom: 10}}>
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
            <TouchableOpacity onPress={() => mPrContext.deletePost(this.props.item.activity_unique_id,this.props.index)} style = {{zIndex:999, width: 40, height: 40, justifyContent: "center", alignItems: 'center'}}>
                          <Image style = {{width:18,height:20.25}} source = {IMAGES.trashIcon}></Image>
             </TouchableOpacity>
        </View>

        <View style = {{marginTop: 10}}>
          <View><Text style = {{fontSize:18, fontFamily:'SourceSansPro-Bold', color: '#000000'}}>{this.props.item.title}</Text></View>
        </View>

        <View style = {{marginTop: 6}}>
           <View><HTML onLinkPress={(evt, href) =>this.goToProfile(href)} html={this.props.item.content} style = {{fontSize:15, color: '#444444',paddingLeft:5 }}/></View>
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
     var map = {
      '"USER_FIRSTNAME"' : firstName,
      '"TITLE"' : title,
      '"CODE"' : referralCode,
  };
    Utility.shareTextMessage(replaceAll(String.Share_Post_Message, map))
      //  Utility.shareTextMessage(''+firstName+' Shared a post with you. '+"'"+title+"'"+' view more exciting post, place brags & win $. . Join Brag house Use '+firstName+'\'s'+' code '+referralCode+' and earn bonus points')

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
             <Image style={{width:screenWidth,height:adjustedImageheight,alignSelf: 'center'}  } resizeMode='cover' source = {{uri: imageUrl}}/>
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
