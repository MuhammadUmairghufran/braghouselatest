import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Dimensions, TouchableOpacity, Image,ActivityIndicator, StatusBar, Animated, Platform, FlatList, ImageBackground, TextInput, KeyboardAvoidingView, ScrollView, List }
  from 'react-native';
import { Button, Form, Item, Input, Container, Content, StyleProvider, Icon, H3, Header, Left, Right, Separator }
  from 'native-base';
import { AppStyles, Images } from '../../Themes/';
import Ripple from 'react-native-material-ripple';
import LinearGradient from 'react-native-linear-gradient';
import Modal from "react-native-modal";
import Textarea from 'react-native-textarea';
import * as URLConstants from '../../Networking/URLConstants/';
import WSManager from '../../Networking/WSManager/';
import ConstantLib from '../../Constants/ConstantLib';
import Loader from '../../Utils/Loader/';
import Toaster from '../../Utils/Toaster/';
import PreferenceConstant from '../../Preferences/PreferenceConstant';
import { getItem, saveItem } from '../../lib/Session';
import IMAGES from '../../Constants/Images';
import { convertStringToLowerCase } from '../../Constants/Methods'
import { KeyboardAccessoryView } from 'react-native-keyboard-accessory';
import MentionsTextInput from 'react-native-mentions';
//var ImagePicker = require('react-native-image-picker');
import ImagePicker from 'react-native-image-picker';



let mContext = null;
const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[AppStyles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);
const CustomHeader = ({ navigation }) => (
  <View style={{ backgroundColor: 'white', paddingTop: Platform.OS === "ios" ? 30 : 20 }}>

    <View style={{ flexDirection: 'row', padding: 15 }}>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>

        <Image style={AppStyles.Conference_item_image} source={mContext.state.userImage === '' || mContext.state.userImage === null || mContext.state.userImage === 'null' ? Images.default_user : { uri: mContext.state.userImage }} />
        <Text style={{ paddingLeft: 10, fontSize: 24, color: 'black', fontFamily: 'SourceSansPro-Bold' }}>Write a Post</Text>
      </View>

      <View style={{ flex: 1, alignItems: 'flex-end', paddingTop: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack(null)}>
          <Image style={{ alignItems: 'center' }} source={Images.close} />
        </TouchableOpacity>

      </View>
    </View>
    <View style={{ height: 1, backgroundColor: '#999999', width: '100%' }}></View>
  </View>
);

export default class CreatePost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedPaths: [],
      text: 0,
      loading: false,
      title: '',
      content: '',
      userImage: '',
      imagesPath: '',
      media_unique_id: '',
      imageMimeType: '',
      imageName: '',
      value: "",
      keyword: "",
      data: [],
      taggedUser: [],

    }
    this.reqTimer = 0;

  }

  componentDidMount() {
    mContext = this;
    getItem(PreferenceConstant.USER_IMAGE).then((value) => {
      let UserImage = value;
      this.setState({ userImage: UserImage })
    })

    this.subs = [
      this.props.navigation.addListener('willFocus', () => {
        //   alert('{ProfileScreen} '+ConstantLib.FIRST_NAME);
      }),
    ];
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
          this.CreatePostAPI()
          console.log('Upload Image Response: ', jsonResponse)
        })



      }
    });


  }


pickMultipleImage = () =>{

  ImagePicker.openPicker({
  multiple: true,
  }).then(image => {
    console.log(image);
  });

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
            this.showSingleMedia()

          }
          );
          this.uploadImage();
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
            this.showSingleMedia()

          });
          this.uploadImage();
        }
        
      }
      //this.uploadImage();
    });


  }



  static navigationOptions = ({ navigation }) => {
    return {
      header: <CustomHeader this navigation={navigation} />
    };
  };

  render() {
    mContext = this;
    return (

      <View style={{ flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center' }} >
        <Loader loading={this.state.loading} />
        <MyStatusBar backgroundColor="rgba(0,0,0,0)" barStyle="light-content" />

        <View style={{ flex: 1, padding: 0, width: '100%', }}>
          {/* <KeyboardAvoidingView style={{flex: 1,  justifyContent: 'space-between'}} behavior = 'padding' enabled> */}
          <ScrollView keyboardShouldPersistTaps={'handled'} >

            <View style={{ flex: 1 }}>
              <Item style={{ padding: 10 }}>
                <Input placeholder='Post Title' onChangeText={(text) => this.setState({ title: text})} />
              </Item>
              <Separator style={{ height: 1 }}></Separator>
              <MentionsTextInput
                      
                       textInputStyle={{ textAlignVertical: 'top', borderColor: '#ebebeb', borderWidth: 0,padding: 5, fontSize: 15 }}
                       suggestionsPanelStyle={{ position:Platform.OS == "ios"?'absolute':'relative',  width: '100%' , backgroundColor: 'white' }}
                       textInputMinHeight={ Platform.OS == "ios"?30:100}
                       textInputMaxHeight={200}
                       trigger={'@'}
                       triggerLocation={'anywhere'} // 'new-word-only', 'anywhere'
                       placeholder = 'Write a comment...'
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
                       keyExtractor={(item, index) =>item.first_name+' '+item.last_name}
                       suggestionRowHeight={45}
                       horizontal={false} // defaut is true, change the orientation of the list
                       MaxVisibleRowCount={25} // this is required if horizontal={false}
                       isCreatePost={true}
              />





              {/* <Separator style={{ height: 1 }}></Separator> */}
            </View>

            {this.showSingleMedia()}

          </ScrollView>


        </View>

        {Platform.OS == 'ios' ? (
          <KeyboardAccessoryView alwaysVisible={true} inSafeAreaView={true}>
            <View style={{ width: '100%', left: 0, height: 50, backgroundColor: '#FFFFFF', justifyContent: 'space-between', }}>
              <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 8, borderTopWidth: 1, borderTopColor: '#DBDBDB' }}>
                <TouchableOpacity onPress={this.pickImage} style={{ flex: 1, flexDirection: 'row', padding: 5, alignItems: 'center' }}>
                  <Image source={Images.camera} />
                </TouchableOpacity>
                <Ripple onPress={() => (this.state.imagesPath != '' ? this.uploadImage() : this.CreatePostAPI())} style={{ width: 70, height: 35 }}>
                  <Image source={Images.gredient_bg} style={{ width: 70, height: 35, borderRadius: 5 }} resizeMode={'stretch'} />
                  <View style={{ width: 70, height: 35, borderRadius: 5, position: 'absolute', top: 0, bottom: 0, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                    <Text style={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center', textAlign: 'center', fontSize: 14, color: 'white', fontFamily: 'SourceSansPro-Regular' }}>  POST </Text>
                  </View>
                </Ripple>
              </View>
            </View>
          </KeyboardAccessoryView>
        ) : (<View style={{ width: '100%', left: 0, height: 50, backgroundColor: '#FFFFFF', justifyContent: 'space-between', }}>
          <View style={{ flexDirection: 'row', paddingHorizontal: 15, paddingTop: 8, borderTopWidth: 1, borderTopColor: '#DBDBDB' }}>
            <TouchableOpacity onPress={this.pickImage} style={{ flex: 1, flexDirection: 'row', padding: 5, alignItems: 'center' }}>
              <Image source={Images.camera} />
            </TouchableOpacity>
            <Ripple onPress={() => (this.state.imagesPath != '' ? this.uploadImage() : this.CreatePostAPI())} style={{ width: 70, height: 35 }}>
              <Image source={Images.gredient_bg} style={{ width: 70, height: 35, borderRadius: 5 }} resizeMode={'stretch'} />
              <View style={{ width: 70, height: 35, borderRadius: 5, position: 'absolute', top: 0, bottom: 0, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' }}>
                <Text style={{ alignSelf: 'center', justifyContent: 'center', alignItems: 'center', textAlign: 'center', fontSize: 14, color: 'white', fontFamily: 'SourceSansPro-Regular' }}>  POST </Text>
              </View>
            </Ripple>
          </View>
        </View>)
        }

      </View>
    );
  }

  showSingleMedia() {
    return ((this.state.imagesPath != '') ?

      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 15, marginRight: 12, width: 200, height: 200, alignSelf: "center" }}>

        <Image style={{ width: 200, height: 200 }} source={mContext.state.imagesPath != '' ? { uri: mContext.state.imagesPath } : <View></View>}></Image>
        <TouchableOpacity onPress={() => this.setState({ imagesPath: '' })} style={{ position: "absolute", right: 0, top: 0, padding: 10, borderBottomLeftRadius: 25, backgroundColor: '#FFFFFF60' }}>
          <Image source={IMAGES.close} />
        </TouchableOpacity>
      </View>


      : null);
  }

  showMultipleMedia() {
    return (
      (this.state.selectedPaths.length == 1) ?
        <View >
          <Image style={{ backgroundColor: 'red', width: '100%', height: '100%', alignSelf: 'center' }} resizeMode='stretch' source={{ uri: this.state.selectedPaths[0] }} />
        </View>
        : (this.state.selectedPaths.length == 2) ?
          <View style={{ width: '100%', height: '100%' }}>
            <Image source={{ uri: this.state.selectedPaths[0] }} style={{ width: '100%', height: '50%' }} resizeMode='stretch' />
            <Image source={{ uri: this.state.selectedPaths[1] }} style={{ width: '100%', height: '50%' }} resizeMode='stretch' />
          </View>
          : (this.state.selectedPaths.length == 3) ?
            <View style={{ width: '100%', height: '100%' }}>
              <Image source={{ uri: this.state.selectedPaths[0] }} style={{ flex: 1, width: '100%', height: '50%' }} resizeMode='stretch' />

              <View style={{ flex: 1, flexDirection: 'row', width: '100%', height: '100%' }}>
                <Image source={{ uri: this.state.selectedPaths[1] }} style={{ width: '50%', height: '100%' }} resizeMode='stretch' />
                <Image source={{ uri: this.state.selectedPaths[2] }} style={{ width: '50%', height: '100%' }} resizeMode='stretch' />
              </View>
            </View>
            : (this.state.selectedPaths.length == 4) ?
              <View style={{ width: '100%', height: '100%' }}>
                <Image source={{ uri: this.state.selectedPaths[0] }} style={{ flex: 1, height: '50%' }} resizeMode='stretch' />
                <View style={{ flexDirection: 'row', flex: 1, height: '100%' }}>
                  <Image source={{ uri: this.state.selectedPaths[1] }} style={{ flex: 1, height: '100%' }} resizeMode='stretch' />
                  <Image source={{ uri: this.state.selectedPaths[2] }} style={{ flex: 1, height: '100%' }} resizeMode='stretch' />
                  <Image source={{ uri: this.state.selectedPaths[3] }} style={{ flex: 1, height: '100%' }} resizeMode='stretch' />
                </View>
              </View>
              : (this.state.selectedPaths.length > 4) ?
                <View style={{ width: '100%', height: '50%' }}>
                  <Image source={{ uri: this.state.selectedPaths[0] }} style={{ width: '100%', height: '100%' }} resizeMode='stretch' />

                  <View style={{ flexDirection: 'row', height: '50%' }}>
                    <Image source={{ uri: this.state.selectedPaths[1] }} style={{ flex: 1, height: '100%' }} resizeMode='stretch' />
                    <Image source={{ uri: this.state.selectedPaths[2] }} style={{ flex: 1, height: '100%' }} resizeMode='stretch' />
                    <ImageBackground style={{ flex: 1, height: '100%' }} source={{ uri: this.state.selectedPaths[3] }} resizeMode='stretch'>
                      <View style={{ alignItems: 'flex-end' }}>
                        <Text style={{ alignItems: 'flex-end', backgroundColor: 'white', fontSize: 14, color: 'black', fontFamily: 'SourceSansPro-Regular' }} > {this.state.text} </Text>
                      </View>
                    </ImageBackground>
                  </View>
                </View>
                : <View />
    )
  }

  validate() {
    if (this.state.title === '') {
      Toaster.showLongToast('Please enter title');
      return false;
    }
    else if (this.state.value === '') {
      Toaster.showLongToast('Please enter description');
      return false;
    }
    else {
      return true;
    }
  }

  CreatePostAPI() {
    if (this.validate()) {
      this.setState({ loading: true })
      var params
      this.state.imagesPath != '' ?
        params = {
          module_id: '2',
          title: this.state.title,
          content: this.state.content,
          media: [
            {
              media_unique_id: this.state.media_unique_id
            }
          ],
        }
        :
        
        
        params = {
          module_id: '2',
          title: this.state.title,
          content: this.getSpanText(this.state.value)  ,
          media: [],
        }

        console.log('Create Post Param: ',JSON.stringify(params))

      WSManager.postData(URLConstants.CREATE_POST, params)
        .then(response => {
          console.log("CreatePostAPI==" + JSON.stringify(response.data));
          this.setState({ loading: false })
          Toaster.showLongToast('Success:' + response.data.message);
          this.props.navigation.goBack(null);
        })
        .catch(error => {
          this.setState({ loading: false })
          console.log('Error= ' + JSON.stringify(error));
          Toaster.showLongToast('Error:' + error.response.data.global_error);
          return error;
        });
    }
  }


  callback(keyword) {
  if(keyword.length>2)
  {
    if (this.reqTimer) {
       clearTimeout(this.reqTimer);
     }

     this.reqTimer = setTimeout(() => {
        this.getUserSuggestions(keyword);
     }, 200);
    }
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
         <View style={styles.suggestionsRowContainer}>
           <View style={styles.userIconBox}>
           <Image style={AppStyles.Conference_item_image}
           source={item.image === null || item.image === '' ||
           item.image === 'null' ? Images.default_user : { uri: item.image }} />

            </View>
           <View style={styles.userDetailsBox}>
             <Text style={styles.displayNameText}>{item.first_name+' '+item.last_name}</Text>
            </View>
         </View>
       </TouchableOpacity>
     )
   }

   getUserSuggestions(keyword){
var sillyString = keyword.slice(1, keyword.length);
      const params = {
       search_keyword: sillyString,
       offset:1,
       limit:150,
     };

     WSManager.postData(URLConstants.SEARCH_PEOPLE_TEAM_API, params)
       .then(response => {
         this.setState({ loading: false });
         var mUserList = response.data.data.user_list;
          console.log('getSearchResult user_list=' + JSON.stringify(response.data.data.user_list));
          this.setState({ keyword: keyword})
          this.setState({data:[]})
          this.setState({data:mUserList})
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
      //  return tempVar;
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


}


export class FullWidthImage extends Component {
  constructor() {
    super();

    this.state = {
      width: 0,
      height: 0
    };
  }

  _onLayout(event) {
    const containerWidth = event.nativeEvent.layout.width;
    if (this.props.ratio) {
      this.setState({
        width: containerWidth,
        height: containerWidth * this.props.ratio
      });
    } else {
      Image.getSize(this.props.source, (width, height) => {
        this.setState({
          width: containerWidth,
          height: containerWidth * height / width
        });
      });
    }
  }

  render() {
    return (
      <View onLayout={this._onLayout.bind(this)}>
        <Image
          source={this.props.source}
          style={{
            width: this.state.width,
            height: this.state.height
          }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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