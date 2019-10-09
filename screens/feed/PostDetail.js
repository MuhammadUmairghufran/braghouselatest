import React, { Component } from 'react';
import {Linking} from 'react-native'
import { Card, CardItem, Body, Button, Right, Left, Separator, H3, Container, Content, Tab, Tabs, TabHeading, Header, StyleProvider, Icon, Title, Subtitle, List ,Label} from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { TouchableOpacity, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, ScrollView, ImageBackground, FlatList, Dimensions, Platform, ActivityIndicator, Animated, StatusBar } from 'react-native';
import { AppStyles, Images } from '../../Themes'
import * as Colors from '../../Constants/Colors/';
import LinearGradient from 'react-native-linear-gradient';
import IMAGES from '../../Constants/Images';
import Loader from '../../Utils/Loader/';
import ConstantLib  from '../../Constants/ConstantLib/';
import {getItem,saveItem} from '../../lib/Session';
import PreferenceConstant from '../../Preferences/PreferenceConstant';
import * as URLConstants from '../../Networking/URLConstants/';
import WSManager from '../../Networking/WSManager/';
import {StackActions,  NavigationActions } from 'react-navigation';
import Utility from '../../Utils/Utility/';
import HTML from 'react-native-render-html'
import { replaceAll } from '../../Constants/Methods';
import * as String from '../../Constants/Strings/';

let screenWidth = Dimensions.get('screen').width

let  mContext = null;
const HH = Dimensions.get('window').height;
const WW = Dimensions.get('window').width;
const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[AppStyles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

export default class PostDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
    currentPage:-1,
    canLoadMoreContent:false,
    feedList:[],
    imagePath:'',
    loading:false,
    data:'',
    }
  }
  static navigationOptions = ({navigation}) => {
  return {
  header: <CustomHeader this navigation={navigation} />
  };
  };

componentDidMount(){
  const is_not = this.props.navigation.getParam('is_not')
   if(is_not==true){
     const activity_id = this.props.navigation.getParam('activity_id');
     const user_id = this.props.navigation.getParam('user_id');
     
     this.getFeedApi(activity_id,user_id);
    }
    else {
      const items = this.props.navigation.getParam('items');
      const path = this.props.navigation.getParam('path');
       var feedList = [];
      feedList.push(items);
       this.setState({feedList:feedList});
       this.setState({imagePath:path});

    }
}


  blankData=async () => {
  }


  getFeedApi=async (activity_id,user_id) => {
    const params = {
      user_id:user_id,
        activity_id:activity_id,
    };

    

    WSManager.postData(URLConstants.USER_ACTIVITY, params)
    .then(response => {
      var data = response.data.data.list;
      this.setState({loading: false});
     this.setState({refreshing: false});
     this.setState({imagePath: response.data.data.image_path});
     this.setState({ feedList:data});


     })
    .catch(error => {
      this.setState({loading: false});
        this.setState({refreshing: false});
      Toaster.showLongToast('getAllTeams:'+error.message);
      return error;
    });
  }



  render() {
    mContext = this;
    return (
      <View style={[AppStyles.Wrapper, {backgroundColor:'#fff'}]}>
        <MyStatusBar backgroundColor="rgba(0,0,0,0)" barStyle="light-content" />
         <Loader loading={this.state.loading} />
         <FlatList
           data={this.state.feedList}
           renderItem={({item}) => <UserFeedsListView item={item} image={this.state.imagePath}/>}
         />
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


    render()
    {



      return (
        <View style = {{marginBottom: 10, elevation: 4, backgroundColor: '#F4F4F4', shadowOffset: { width: 5, height: 5 },
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
                    {Utility.getFormatedDate(this.props.item.created_date,'Do, MMM')}
                  </Text>
                </View>
              </View>

          </View>

          <View style = {{marginTop: 10}}>
            <View><Text style = {{fontSize:18, fontFamily:'SourceSansPro-Bold', color: '#000000'}}> {this.props.item.title}</Text></View>
          </View>

          <View style = {{marginTop: 6}}>
          <View><HTML onLinkPress={(evt, href) =>this.goToProfile(href)} html={this.props.item.content}
          style = {{fontSize:15, color: '#444444'}}/></View>
          </View>

          <View style = {{marginTop: 6}}>
                 {this.showMedia(this.props.item,this.props.image)}
          </View>




        </View>





          <View style = { {marginHorizontal: 15,paddingHorizontal: 10, paddingTop: 8, paddingBottom: 15}}>
               <View style = {{flexDirection: 'row', marginTop: 14, justifyContent: 'center'}}>
                      <TouchableOpacity onPress={() => this.toggleLike(this.props.item)}>

                        <View style = {{flexDirection: 'row', justifyContent: 'center'}}>
                           <View><Image source = {this.props.item.is_like==1?Images.ic_liked_heart:Images.ic_like_heart} style={{width:23, height: 21, marginRight:8}}></Image></View>

                        <View><Text>{this.props.item.no_of_likes}</Text></View>
                        </View>
                      </TouchableOpacity>

                    <TouchableOpacity  style={{ flex: 1, alignItems: 'center',marginLeft: 50 }} onPress={() => this.goToCommentsList(this.props.item)}>
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



        </View>
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

console.log(imageUrl);
             return(
               
            // (this.state.selectedPaths.length==1)?
            <TouchableOpacity  onPress={()=>this.actionOnImage(imagePath+"/750x500/"+item.media[0].image_name)}>
            <Image style={{width:screenWidth,height:adjustedImageheight,alignSelf: 'center', backgroundColor:'#CCCCCC'}  } resizeMode='stretch' source = {{uri: imageUrl}}/>
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
                  // const navigateAction = NavigationActions.navigate({
                  //   routeName: 'OtherProfileScreen',
                  //   params: {'user_id':ID},
                  //   action: NavigationActions.navigate({ routeName: 'OtherProfileScreen' })
                  // })
                  // const nav = WSManager.getTopLevelNavigator()
                  // nav.dispatch(navigateAction)
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
    
}






const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaeaea',
  },
  list_item_parent: {
    backgroundColor: '#fff',
    alignItems: 'center',
    marginLeft: 11,
    marginRight: 2,
    justifyContent: 'center',
    height: 50,
    minWidth: 150,
    paddingLeft: 10,
    paddingRight: 10,
    alignSelf: 'center',
    borderRadius: 2,
    borderColor: Colors.LableTextColor, // on selection #A2C1CE
    borderWidth:1

  },
  team_text: {
    fontSize: 14,
    color: '#000',
    fontFamily:'SourceSansPro-Regular'
  },
  date_text: {
    fontSize: 14,
    color: Colors.LableTextColor,
    fontFamily:'SourceSansPro-Regular'
  },
  week_lable_text: {
    fontSize: 14,
    color: Colors.ColorPrimary,
    fontFamily:'SourceSansPro-Regular'
  },
  week_number_text: {
    fontSize: 22,
    marginBottom: -3,
    marginTop: -3,
    color: Colors.ColorPrimary,
    fontFamily:'SourceSansPro-Regular'
  },  NoRecordContainer:{
      height:300,
      width:WW,
      alignItems:'center',
      backgroundColor:'transparent',
      justifyContent:'center',
    },

});

const CustomHeader = ({navigation}) => (
  <LinearGradient
        start={{x: 0.6, y: 0}} end={{x: 2.5, y: 1.5}}
        locations={[0.0, 0.4]}
        colors={['#1B75BC', '#9AD8DD']}
        style={{paddingTop: Platform.OS === "ios" ? 30 : 20}}
  >

        <View style={{ flexDirection:'row',padding:15,  alignItems:'center'}}>
                  <TouchableOpacity onPress={()=> navigation.goBack(null)} style={{flex:1,justifyContent:"flex-start"}} transparent>
                  <Image source={Images.back} />
                  </TouchableOpacity>
              <View style={{ flex:12,justifyContent:'flex-start'}}>
                    <View style={{ alignItems:'center'}}>
                          <View style={{ alignItems:'center'}}>
                                        <Text   style={AppStyles.header_title}>Post Detail</Text>
                           </View>
                    </View>
              </View>
          </View>
  </LinearGradient>
);
