import React, { Component } from 'react';
import { WebView, Linking, View, Keyboard, TextInput, Alert,Button, StyleSheet, Text, Image, ImageBackground, TouchableOpacity, Platform, FlatList, RefreshControl, StatusBar, LayoutAnimation, KeyboardAvoidingView, InputAccessoryView, } from 'react-native';
import { List } from 'native-base';
import Ripple from 'react-native-material-ripple';
import { NavigationActions, SafeAreaView } from 'react-navigation';

import IMAGES from '../../Constants/Images/';
import * as String from '../../Constants/Strings/';
import * as Color from '../../Themes/Colors/';
import AppStyles from '../../Themes/AppStyles';
import { Container, Header, Content, Label, Input, ActionSheet } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import CommentsStyle from './CommentsStyle';

import { Images } from '../../Themes';

import WSManager from '../../Networking/WSManager/';
import * as URLConstants from '../../Networking/URLConstants';
import Toaster from '../../Utils/Toaster';
import Loader from '../../Utils/Loader/';
import Utility from '../../Utils/Utility/';
import ConstantLib from '../../Constants/ConstantLib/';
import { convertToStringCapitalizedForm, convertStringToLowerCase } from '../../Constants/Methods';
import PreferenceConstant, { CommentPreferenceConstant } from '../../Preferences/PreferenceConstant';
import { styles } from 'react-native-material-ripple/styles';
//var ImagePicker = require('react-native-image-picker');
import ImagePicker from 'react-native-image-picker';
import { getItem, saveItem } from '../../lib/Session';

import { KeyboardAccessoryView, KeyboardAccessoryNavigation } from 'react-native-keyboard-accessory'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'
import KeyboardManager from 'react-native-keyboard-manager';
import MentionsTextInput from 'react-native-mentions';
import HTML from 'react-native-render-html'



var take








export default class Comments extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      refreshing: false,
      isKeyBoardVisible: true,
      commentText: '',
      imagesPath: '',
userID:'',

      activity_id: '',
      activity_unique_id: '',

      contest_id: '',
      contest_unique_id: '',

      is_bragList: false,
      media_unique_id: '',

      commentsList: [],
      parentItem:'',
      value: "",
      keyword: "",
      data: [],
      taggedUser: [],
    }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      header: <CustomHeader this navigation={navigation} />
    };
  };

  deleteComment(comment_id,index)
  {
    Alert.alert(
      'Brag House',
      String.delete_comment_message,
      [
        {
          text: "Yes", onPress: () => {
            this.deleteComment_(comment_id,index)
          }
        },
        { text: "No" },
      ],
      {
        cancelable: true
      })
  }

  deleteComment_(comment_id,index)
  {
    const params = {
     comment_id:comment_id,
   };
   this.setState({loading: true});
   WSManager.postData(URLConstants.DELETE_COMMENT, params)
   .then(response => {
        this.setState({loading:false});
      //  this.state.commentsList.splice(0, 1);
        var array = [...this.state.commentsList]; // make a separate copy of the array
        array.splice(index, 1);
        this.setState({commentsList: array});
    })
   .catch(error => {
     this.setState({loading:false});
     return error;
   });
  }
     uploadImage = async () => {
      this.setState({ loading: true })
      var url = URLConstants.UPLOAD_MEDIA;
      var photo = {
        uri: this.state.imagesPath,
        type: this.state.imageMimeType,
        name: this.state.imageName,
      };

      var data = new FormData();
      data.append("wallfile", photo);
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;




      xhr.open("POST", url);


      xhr.setRequestHeader("session_key", ConstantLib.SESSION_KEY);
      xhr.send(data);


      xhr.addEventListener("readystatechange", function () {
        mContext.setState({ loading: false })

        if (this.readyState === 4) {
          jsonResponse = JSON.parse(xhr.response);
          mContext.setState({ serverImagePath: jsonResponse.data.image_path })
          mContext.setState({ media_unique_id: jsonResponse.data.media_unique_id }, function () {
            console.log('Upload Image Response: ', jsonResponse)
          })



        }
      });


    }



  addCommentAction = () => {

    Keyboard.dismiss()

    
    if (this.state.is_bragList) {
       if ((this.state.contest_unique_id != null && this.state.contest_unique_id != "" && (this.state.value != '' || this.state.imagesPath != ''))) {
        this.setState({ isLoading: true })


 
        var params
        this.state.imagesPath != '' ?
          params = {
            contest_unique_id: this.state.contest_unique_id,//'a9800f9aee'
            comment: this.getSpanText(this.state.value)//this.state.comment,

          ,  media: [
              {
                media_unique_id: this.state.media_unique_id
              }
            ],
          }
          :
          params = {
            contest_unique_id: this.state.contest_unique_id,//'a9800f9aee'
            comment: this.getSpanText(this.state.value)//this.state.comment,
            ,media: [],
          }

        this.setState({ commentText: '' })
        WSManager.postData(URLConstants.BRAG_ADD_COMMENT, params)
          .then(response => {


            this.setState({ imagesPath: '' })
            this.setState({ value: '' })
            this.setState({ taggedUser: [] })

            this.setState({ isLoading: false })
            console.log('Success')
            this.listCommentAction(this.state.contest_id)

            var responseData = response.data.data;
            console.log(JSON.stringify(responseData))

            this.state.parentItem.no_of_comments=this.state.parentItem.item.no_of_comments+1;
            saveItem(CommentPreferenceConstant.ENTITY_ID, '' + responseData.entity_id);
            saveItem(CommentPreferenceConstant.USER_ID, '' + responseData.user_id);
            saveItem(CommentPreferenceConstant.TYPE, '' + responseData.type);
            saveItem(CommentPreferenceConstant.POST_COMMENT, '' + responseData.post_comment);
            saveItem(CommentPreferenceConstant.STATUS, '' + responseData.status);
            saveItem(CommentPreferenceConstant.CREATED_DATE, '' + responseData.created_date);
            saveItem(CommentPreferenceConstant.COMMENT_ID, '' + responseData.comment_id);


          })
          .catch(error => {
            this.setState({ isLoading: false })
            console.log(error.response)
        //    Toaster.showLongToast(JSON.stringify(error.response));
            return error;
          });

      }


    } else {
      if ((this.state.activity_unique_id != null && this.state.activity_unique_id != "" && (this.state.value != '' || this.state.imagesPath != ''))) {
        this.setState({ isLoading: true })



        var params
        this.state.imagesPath != '' ?
          params = {
            activity_unique_id: this.state.activity_unique_id,//'a9800f9aee'
            comment: this.getSpanText(this.state.value)//this.state.comment,

          ,  media: [
              {
                media_unique_id: this.state.media_unique_id
              }
            ],
          }
          :
          params = {
            activity_unique_id: this.state.activity_unique_id,//'a9800f9aee'
            comment: this.getSpanText(this.state.value)//this.state.comment,
            ,media: [],
          }






        this.setState({ imagesPath: '' })
        WSManager.postData(URLConstants.ADD_COMMENT, params)
          .then(response => {


            this.setState({ isLoading: false })
            this.setState({ imagesPath: '' })
            this.setState({ value: '' })
            this.setState({ taggedUser: [] })

            console.log('Success')
            this.listCommentAction(this.state.activity_id)
            var responseData = response.data.data;
            console.log(JSON.stringify(responseData))
            saveItem(CommentPreferenceConstant.ENTITY_ID, '' + responseData.entity_id);
            saveItem(CommentPreferenceConstant.USER_ID, '' + responseData.user_id);
            saveItem(CommentPreferenceConstant.TYPE, '' + responseData.type);
            saveItem(CommentPreferenceConstant.POST_COMMENT, '' + responseData.post_comment);
            saveItem(CommentPreferenceConstant.STATUS, '' + responseData.status);
            saveItem(CommentPreferenceConstant.CREATED_DATE, '' + responseData.created_date);
            saveItem(CommentPreferenceConstant.COMMENT_ID, '' + responseData.comment_id);

          })
          .catch(error => {
            this.setState({ isLoading: false })
            this.setState({ value: '' })

            console.log(error.response)
        //    Toaster.showLongToast(JSON.stringify(error.response));
            return error;
          });

      }

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
  

    pickImage = () => {
      const options = {
        maxImagesCount: 10, // Max number of images user can select; if maxImagesCount == 1, Single mode (i.e. Tap to Select & Finish) will be activated.
        allowsEditing: true,
        quality: 0.5,

        selectedPaths: [
        ] // Currently selected paths, must be from result of previous calls. Empty array allowed.
      };
      ImagePicker.showImagePicker(options, (response) => {


        if (Platform.OS == 'ios')
        {
          if (response.uri !== undefined && response.uri != null && response.uri != 'null' && response.uri != '') {
            fileType = convertStringToLowerCase(response.uri.split('.').pop())
            this.setState({ imageName: 'abc.' + fileType })
            console.log('Image ka type: ', fileType, response.fileName, response.uri)

            if (fileType == 'jpg' || fileType == 'jpeg') {
              this.setState({ imageMimeType: 'image/jpg' })
            }
            else if (fileType == 'png') {
              this.setState({ imageMimeType: 'image/png' })
            }
            else if (fileType == 'gif') {
              this.setState({ imageMimeType: 'image/gif' })
            }
            else if (fileType == 'bmp') {
              this.setState({ imageMimeType: 'image/bmp' })
            }
            else {
              this.setState({ imageMimeType: 'image/jpg' })

            }
            this.setState({ imagesPath: response.uri }, function () {
            this.showSingleMedia();
            this.uploadImage();
            }
            );
          }
        }
        else {
           if (response.fileName !== undefined) {
            fileType = convertStringToLowerCase(response.fileName.split('.').pop())
            this.setState({ imageName: 'abc.' + fileType })
            console.log('Image ka type: ', fileType, response.fileName, response.uri)

            if (fileType == 'jpg' || fileType == 'jpeg') {
              this.setState({ imageMimeType: 'image/jpg' })
            }
            else if (fileType == 'png') {
              this.setState({ imageMimeType: 'image/png' })
            }
            else if (fileType == 'gif') {
              this.setState({ imageMimeType: 'image/gif' })
            }
            else if (fileType == 'bmp') {
              this.setState({ imageMimeType: 'image/bmp' })
            }
            else {
              this.setState({ imageMimeType: 'image/jpg' })
            }
            this.setState({ imagesPath: response.uri }, function () {
               this.showSingleMedia();
               this.uploadImage();


            });
          }
        }

      });


    }



  listCommentAction = (id) => {

    this.setState({ isLoading: true })
    console.log('list comment k andar', this.state.is_bragList)
     var params
    if (this.state.is_bragList) {
      params = {
        offset: 0,//1,//this.state.activity_unique_id,
        limit: 50,//this.state.comment,
        contest_id: id,

      };

      WSManager.postData(URLConstants.BRAG_COMMENT_LIST, params)
        .then(response => {
          this.setState({ isLoading: false })
          console.log('Success')

          var responseData = response.data.data;
          this.setState({ commentsList: responseData }, function () {
            setTimeout(() => this.scrollToEndFlatList(), 200)

          })
          console.log(JSON.stringify(responseData))

        })
        .catch(error => {
          this.setState({ isLoading: false })
          console.log(error.response)
          Toaster.showLongToast(JSON.stringify(error.response));
          return error;
        });


    }
    else {

      params = {
        offset: 0,//1,//this.state.activity_unique_id,
        limit: 50,//this.state.comment,
        activity_id: id,

      };
      WSManager.postData(URLConstants.LIST_COMMENT, params)
        .then(response => {

          this.setState({ isLoading: false })
          console.log('User Feed Comment: ',JSON.stringify(response.data.data))

          var responseData = response.data.data;
          this.setState({ commentsList: responseData }, function () {
            setTimeout(() => this.scrollToEndFlatList(), 200)

          })
          console.log(JSON.stringify(responseData))

        })
        .catch(error => {
          this.setState({ isLoading: false })
          console.log(error.response)
          //Toaster.showLongToast(JSON.stringify(error.response));
          return error;
        });


    }


  }

  scrollToEndFlatList() {
    if (this._flatList) {
      this._flatList.scrollToEnd()
    }
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

  componentDidMount() {
   
    //  this.setState({ parentItem:items });
    if (Platform.OS == 'ios') {
      KeyboardManager.setEnable(false)
      KeyboardManager.setEnableAutoToolbar(false);
    }

    // LinkPreview.getPreview('This is a text supposed to be parsed and the first link displayed https://www.youtube.com/watch?v=MejbOFk7H6c')
    // .then(data => alert(JSON.stringify(data.url)));

    mContext=this;
    this.subs = [
    this.props.navigation.addListener('willFocus', ()=>{
      const items = this.props.navigation.getParam('items');
       this.setState({parentItem:items})
      const is_brag = this.props.navigation.getParam('is_brag')
      this.setState({ is_bragList: is_brag }, function () {
        this.setItemsValues(items, is_brag)
      });
    }),
    ];




   




getItem(PreferenceConstant.USER_ID).then((value) => {
  this.setState({userID:value});
  console.log('SS ' + ConstantLib.SESSION_KEY)

});


  }

  setItemsValues(items, is_brag) {

    if (is_brag == true) {
         this.setState({ contest_id: items.contest_id })
         this.setState({ contest_unique_id: items.contest_unique_id })
        this.listCommentAction(items.contest_id);

    }
    else {
        this.setState({ activity_id: items.activity_id })
        this.setState({ activity_unique_id: items.activity_unique_id })
        this.listCommentAction(items.activity_id);

    }


  }

 
  moveToOthersProfile(userDetails){

    const navigateAction = NavigationActions.navigate({
      routeName: 'OtherProfileScreen',
      params: {'user_id':userDetails.user_id},
      action: NavigationActions.navigate({ routeName: 'OtherProfileScreen' })
    })
    const nav = WSManager.getTopLevelNavigator()
    nav.dispatch(navigateAction)
  }
  
  
  moveToUserOwnProfile(userDetails){
  
    const navigateAction = NavigationActions.navigate({
     routeName: 'ProfileScreen',
     params: {'isFromBottomTab':false},
   })
   const nav = WSManager.getTopLevelNavigator()
   nav.dispatch(navigateAction)
  
  }


  render() {
    mContext = this;
    take = this;
    return (
      // <ImageBackground source={IMAGES.mainBg} style={[CommentsStyle.main_image_container, { flex: 1 }]}>
      <View style={{ flex: 1 }} keyboardVerticalOffset={0} enabled>
        <StatusBar
          translucent
          backgroundColor={'transparent'} />
        <View style={[CommentsStyle.ListViewContainer, { flex: 1 }]} >
          <Loader loading={this.state.loading} />

          {(this.state.commentsList.length > 0) ?
            <SafeAreaView style={{ width: '100%', }}>
              <View><FlatList

                ref={(elm) => { this._flatList = elm; }}
                style={{ paddingTop: 0, bottom: 0, right: 0 }}
                keyExtractor={this._keyExtractor}
                data={this.state.commentsList}
                renderItem={this.renderItem.bind(this)}
              />
              </View>
            </SafeAreaView>
            :
            <View style={CommentsStyle.NoRecordContainer}>
              <Label style={CommentsStyle.white_text_14}>Be the first one to comment and brag!</Label>
            </View>
          }
        </View>




        {Platform.OS == 'ios'?(<KeyboardAccessoryView alwaysVisible={true} inSafeAreaView={true}>
          {this.showSingleMedia()}
          <View style={styles_.textInputView}>
          <TouchableOpacity onPress={this.pickImage} >
            <Image source={Images.camera} />
          </TouchableOpacity>
          <View style={styles_.textInput}>
          <MentionsTextInput
                       textInputStyle={{borderColor: 'transparent', borderWidth: 0, padding: 5, fontSize: 15 }}
                       suggestionsPanelStyle={{ position:'absolute', width: '100%', alignSelf: 'center' , backgroundColor: 'white' }}
                       loadingComponent={() => <View style={{width:0,height:0}}/>}
                       textInputMinHeight={50}
                       textInputMaxHeight={100}
                       trigger={'@'}
                       triggerLocation={'anywhere'} // 'new-word-only', 'anywhere'
                       value={this.state.value}
                       onChangeText={(val) => { 
                       
                        // let words = (val.toString()).split(/ /)

                        // let contents = words.map((word, i) => {
                        //   // Space if the word isn't the very last in the set, thus not requiring a space after it
                        //   var separator = i < (words.length - 1) ? ' ' : '';

                        //    // The word is a URL, return the URL wrapped in a custom <Link> component
                        //     if (word.match(/^https?\:\//)) {

                        //     console.log('Converted or Not', <a href={word}>{word}{separator}</a>)
                        //       return JSON.stringify(<a href={word}>{word}{separator}</a>)
                              
                        //       // <a href={word}>{word}{separator}</a>
                        //       //<Link key={i} url={word}>{word}{separator}</Link>;
                        //     // The word is not a URL, return the word as-is
                        //     } else {
                        //       return word + separator;
                        //     }

                        // })
                        
                        // alert('contents: '+contents)
                        

                        // LinkPreview.getPreview(val)
                        // .then((data) => {
                          
                        // }
                        // )
                        this.setState({ value: val }) 
                          for (let i = 0 ; i < this.state.taggedUser.length; i++)
                          {
                            if (!val.includes(this.state.taggedUser[i].first_name+' '+this.state.taggedUser[i].last_name))
                            {
                                this.state.taggedUser.splice(i, 1);
                            }
                          } 
                        }}
                       triggerCallback={this.callback.bind(this)}
                       renderSuggestionsRow={this.renderSuggestionsRow.bind(this)}
                       suggestionsData={this.state.data} // array of objects
                       keyExtractor={(item, index) => item.first_name+' '+item.last_name}
                       suggestionRowHeight={45}
                       horizontal={false} // defaut is true, change the orientation of the list
                       MaxVisibleRowCount={25} // this is required if horizontal={false}
                       
             />
         </View>
            <Ripple  onPress={() => this.addCommentAction()} style={styles_.buttonParent} >
          <Text
            style={styles_.textInputButton}
            >Send</Text>
            </Ripple>
          </View>
        </KeyboardAccessoryView>)
        :(
   <View>
    {this.showSingleMedia()}

        <View style={styles_.textInputView}>
       <TouchableOpacity onPress={this.pickImage} style={{ flex: 1, flexDirection: 'row', padding: 5, alignItems: 'center' }}>
          <Image source={Images.camera} />
        </TouchableOpacity>
          <View style={{width:'70%'}}>
          <MentionsTextInput
                       textInputStyle={{
                       borderWidth: 1,
                       borderRadius: 10,
                       borderColor: '#CCC',
                       padding: 10,
                       fontSize: 16,
                       marginRight: 10,
                       textAlignVertical: 'top'}}
                       suggestionsPanelStyle={{   position: 'absolute',width: '100%', bottom: 50 , backgroundColor: 'white' }}
                        textInputMinHeight={40}
                       textInputMaxHeight={40}
                       trigger={'@'}
                       triggerLocation={'anywhere'} // 'new-word-only', 'anywhere'
                       value={this.state.value}
                       onChangeText={(val) => { 

                        this.setState({ value: val }) 
                          for (let i = 0 ; i < this.state.taggedUser.length; i++)
                          {
                            if (!val.includes(this.state.taggedUser[i].first_name+' '+this.state.taggedUser[i].last_name))
                            {
                                this.state.taggedUser.splice(i, 1);
                            }
                          } 
                         
                        }}
                       triggerCallback={this.callback.bind(this)}
                       renderSuggestionsRow={this.renderSuggestionsRow.bind(this)}
                       suggestionsData={this.state.data} // array of objects
                       keyExtractor={(item, index) => item.first_name+' '+item.last_name}
                       suggestionRowHeight={45}
                       horizontal={false} // defaut is true, change the orientation of the list
                       MaxVisibleRowCount={25} // this is required if horizontal={false}
             />
         </View>


          
          
          
          
          {/* </TextInput> */}
            <Ripple  onPress={() => this.addCommentAction()} style={styles_.buttonParent} >
          <Text
            style={styles_.textInputButton}
            >Send</Text>
            </Ripple>
        </View>
      </View>)
  }

      </View>
      // </ImageBackground>
    );
  }

  renderItem(data) {
    let { item, index } = data;
    return (
      <View style={CommentsStyle.notification_container}>
        <Image style={{flex:0,
        marginTop:15,
        marginLeft:5,
        width:44,
        height:44,
        borderRadius: 22}}
source={item.user_image === null || item.user_image === '' ||
item.user_image === 'null' ? IMAGES.default_user : { uri: item.user_image }}
          />
        <View style={CommentsStyle.NotificationMessageContainer}>
          <Text style={CommentsStyle.nameTextStyle} onPress = {() => ( getItem(PreferenceConstant.USER_ID).then((value) => {

(value != item.user_id)? this.moveToOthersProfile(item) : this.moveToUserOwnProfile(item);

}))} >{convertToStringCapitalizedForm((item.first_name)) + ' ' + convertToStringCapitalizedForm(item.last_name)}</Text>     
 
      
        {/* {item.post_comment != undefined && item.post_comment != null && item.post_comment != '' ?<Text><HTML onLinkPress={(evt, href) =>this.goToProfile(href)} html={item.post_comment} style={[CommentsStyle.commentTextStyle, (item.post_comment == '')&&(CommentsStyle.commentTextStyleIfBlank)]}/></Text>:null} */}
        <HTML onLinkPress={(evt, href) =>this.goToProfile(href)} html={item.post_comment} style={[CommentsStyle.commentTextStyle, (item.post_comment == '')&&(CommentsStyle.commentTextStyleIfBlank)]}/>
          {this.showListMedia(item)}
          <Text style={CommentsStyle.dateTextStyle}>{Utility.getFormatedDate(item.created_date, 'ddd, MMM Do - hh:mm A')}</Text>              
         
        </View>
           {(item.user_id===this.state.userID)?
           <TouchableOpacity onPress={()=>this.deleteComment(item.comment_id,index)} style = {{marginTop:10,marginRight:-5}}>
             <Image style = {{width:10,height:10}} source = {IMAGES.close}></Image>
          </TouchableOpacity>:null}
      </View>
    )
  }

  getStringFromPostComment(val)
  {
    
      let words = (val.toString()).split(/ /)

      let contents = words.map((word, i) => {
        // Space if the word isn't the very last in the set, thus not requiring a space after it
        var separator = i < (words.length - 1) ? ' ' : '';

         // The word is a URL, return the URL wrapped in a custom <Link> component
          //if (word.match(/^https?\:\//) || word.match(/^Https?\:\//) || word.match(/^https?\:\//)) {
        if (this.isUrlValid(word))
          {
            if (word.match(/^https?\:\//) || word.match(/^Https?\:\//) || word.match(/^https?\:\//))
            {
              return ' <a href="'+word+'"> '+word+'</a>'
            }
            else
            {
              return ' <a href="https://'+word+'"> '+word+'</a>'
            }
            
            
            // <a href={word}>{word}{separator}</a>
            //<Link key={i} url={word}>{word}{separator}</Link>;
          // The word is not a URL, return the word as-is
          } else {
            return word;
          }

      })

      return (contents != null && contents != ''?contents: '')
    
  }
  isUrlValid(userInput) {
    var regexQuery = "^(https?://)?(www\\.)?([-a-z0-9]{1,63}\\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\\.[a-z]{2,6}(/[-\\w@\\+\\.~#\\?&/=%]*)?$";
    var url = new RegExp(regexQuery,"i");
    return url.test(userInput);
}
  showSingleMedia() {

    return ((this.state.imagesPath != '') ?
    <View style={{ backgroundColor:'#fffff'
       , width: '100%', height: 80 }}>
       <View style={{ backgroundColor:'#fffff'
          , width: 80, height: 80 }}>
           <Image style={{ width: 80, height: 80 }} source={mContext.state.imagesPath != '' ? { uri: mContext.state.imagesPath } : <View></View>}></Image>
           <TouchableOpacity onPress={() => this.setState({ imagesPath: '' })} style={{ position: "absolute", right: 0, top: 0, padding: 10, borderBottomLeftRadius: 25, backgroundColor: '#FFFFFF60' }}>
             <Image source={IMAGES.close} />
           </TouchableOpacity>
           </View>

       </View>

      : null);
  }


  showListMedia(item) {
   var path='';
  if(item.media!=undefined && item.media.length>0)
  {
    paths=URLConstants.IMAGE_URL+'wall/'+item.media[0].image_name;
     return ((paths != '') ?
    <TouchableOpacity onPress={()=>this.actionOnImage(URLConstants.IMAGE_URL+'wall/'+item.media[0].image_name)} style={{ backgroundColor:'#fffff'
       , width: '100%', height: 80 }}>
       <View style={{ backgroundColor:'#fffff'
          , width: 80, height: 80 }}>
           <Image style={{ width: 80, height: 80 }} source={{uri: paths}}></Image>
           </View>

       </TouchableOpacity>

      : null);
  }

}














callback(keyword) {

  if (this.reqTimer) {
     clearTimeout(this.reqTimer);
   }

   this.reqTimer = setTimeout(() => {
      this.getUserSuggestions(keyword);
   }, 200);
 
}
onSuggestionTap(item, hidePanel) {
  hidePanel();
  var username=item.first_name+' '+item.last_name;
  const comment = this.state.value.slice(0, - this.state.keyword.length)
  item.start_index=comment.length;
  item.end_index=(comment.length)+(username.length);
  item.spanText='<span contenteditable="false" data-tag="user-tag" class="user-'+item.user_id+'">{{'+username+':'+item.user_id+'}}</span>';
  this.state.taggedUser.push(item);


  console.log('start_index '+item.start_index);
  console.log('end_index '+item.end_index);

  this.setState({
    data: [],
    value: comment+username
  })

}

renderSuggestionsRow({ item }, hidePanel) {
   return (
     <TouchableOpacity onPress={() => this.onSuggestionTap(item, hidePanel)}>
       <View style={styles_.suggestionsRowContainer}>
         <View style={styles_.userIconBox}>
         <Image style={AppStyles.Conference_item_image}
         source={item.image === null || item.image === '' ||
         item.image === 'null' ? Images.default_user : { uri: item.image }} />

          </View>
         <View style={styles_.userDetailsBox}>
           <Text style={styles_.displayNameText}>{item.first_name+' '+item.last_name}</Text>
         </View>
       </View>
     </TouchableOpacity>
   )
 }

 getUserSuggestions(keyword){
var sillyString = keyword.slice(1, keyword.length);
    const params = {
     search_keyword: sillyString,
     offset:0,
     limit:150,
   };

   WSManager.postData(URLConstants.SEARCH_PEOPLE_TEAM_API, params)
     .then(response => {
       this.setState({ loading: false });
       var mUserList = response.data.data.user_list;
        console.log('getSearchResult user_list=' + JSON.stringify(response.data.data.user_list));
        this.setState({data:[]})
this.setState({ keyword: keyword, data: [...mUserList]})
     })
     .catch(error => {
        console.log('Error= ' + JSON.stringify(error));
       return error;
     });


}



getSpanText(tempVar) {
         let toAddIndex = 0;

          
         
           for (let i = 0; i < this.state.taggedUser.length; i++) {
             var  item = this.state.taggedUser[i];
             var startText = tempVar.substring(0, item.start_index);
             
             var endText = "";
             if (item.start_index != tempVar.length) {
                 endText = tempVar.substring(item.end_index, tempVar.length);
             }
             
             
             tempVar = startText + item.spanText + endText;
             
             if (this.state.taggedUser.length > i + 1) {
                 toAddIndex = toAddIndex + (item.spanText.length - (item.first_name + ' ' + item.last_name).length);
                 item.end_index=item.end_index + toAddIndex;
                  this.state.taggedUser[i+1].start_index=this.state.taggedUser[i+1].start_index+toAddIndex;
                  this.state.taggedUser[i+1].end_index= this.state.taggedUser[i+1].end_index+toAddIndex;
             }
         }
         console.log("temp text", JSON.stringify(tempVar))
        return this.getStringFromPostComment(tempVar).join(' ')
         
     //return tempVar;
 }



}

// Header
const CustomHeader = ({ navigation }) => (
  <LinearGradient
    start={{ x: 0.6, y: 0 }} end={{ x: 2.5, y: 1.5 }}
    locations={[0.0, 0.4]}
    colors={['#1B75BC', '#9AD8DD']}
    style={{ paddingTop: Platform.OS === "ios" ? 30 : 20 }}>

    <View style={{ flexDirection: 'row', padding: 10, }}>
    <TouchableOpacity onPress={() => {


        if (Platform.OS == 'ios') {
          KeyboardManager.setEnable(true);
          KeyboardManager.setEnableAutoToolbar(true);
        }


        navigation.goBack(null)


    }} style={{ justifyContent: 'center' }} transparent>

        <Image source={IMAGES.goBack} />
      </TouchableOpacity>
      <View style={{ flex: 1, alignSelf: 'center', alignItems: 'center', paddingRight: 15 }}>
        <Text style={AppStyles.header_title}>Comments</Text>
      </View>

    </View>
  </LinearGradient>
);
const styles_ = StyleSheet.create({
  container: {
    flex: 1
  },
  textInputView: {
    padding: 8,
    width:'100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  textInput: {
    width:'70%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#CCC',
    padding: 10,
    fontSize: 16,
    marginRight: 10,
    textAlignVertical: 'top'
  },

  textInputButton: {
    flex:1,
    height:40,
    fontSize:16,
    color:'white',
    paddingLeft:10,
    paddingRight:10,
    paddingTop:8,
    paddingBottom:5,
    textAlign:'center',
    borderRadius:6,
    backgroundColor:'#1B75BC',
    alignSelf:'center',
    alignItems:'center',
    fontFamily:'SourceSansPro-Bold'
  }
  ,
  buttonParent: {

    height:40,
     justifyContent:'center',

  },
  mentioncontainer: {
    height: 300,
    justifyContent: 'flex-end',
    paddingTop: 100
  },
  suggestionsRowContainer: {
    flexDirection: 'row',
  },
  userAvatarBox: {
    width: 35,
    borderRadius:45/2,
    paddingTop: 2
  },
  userIconBox: {
    height: 45,
    width: 45,
    borderRadius:45/2,
    alignItems: 'center',
    justifyContent: 'center',
   },
  usernameInitials: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 14
  },
  userDetailsBox: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 10,
    paddingRight: 15
  },
  displayNameText: {
    fontSize: 13,
    fontWeight: '500'
  },
  usernameText: {
    fontSize: 12,
    color: 'rgba(0,0,0,0.6)'
  }

});