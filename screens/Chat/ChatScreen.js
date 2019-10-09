import React, { Component } from 'react';
import { Text, Slider, View, TextInput, AsyncStorage, TouchableHighlight, ActivityIndicator, Modal, StatusBar, TouchableOpacity, PermissionsAndroid, Image, Platform, SafeAreaView, FlatList, Clipboard, Keyboard, Dimensions, KeyboardAvoidingView, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AppStyles, Images } from '../../Themes'
import Style from './Style'
import Toaster from "../../Utils/Toaster";
import { KeyboardAccessoryView, KeyboardAccessoryNavigation } from 'react-native-keyboard-accessory';
import * as firebase from 'firebase';
import Ripple from 'react-native-material-ripple';
import { NavigationActions } from 'react-navigation';
import WSManager from '../../Networking/WSManager/';
import FirebaseService from '../../firebase/FirebaseService';
import ConstantLib from '../../Constants/ConstantLib';
import KeyboardManager from 'react-native-keyboard-manager';
import Utility from '../../Utils/Utility/';
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import ImagePicker from 'react-native-image-picker';
import Sound from "react-native-sound";
import DocumentPicker from 'react-native-document-picker';
import VideoPlayer from 'react-native-video-controls';
//import TrackPlayer from 'react-native-track-player';
import ImageViewer from 'react-native-image-zoom-viewer';

//import FileViewer from 'react-native-file-viewer';
// import RNFetchBlob from 'react-native-fetch-blob';
// const Blob = RNFetchBlob.polyfill.Blob
// const fs = RNFetchBlob.fs

// window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
// window.Blob = Blob

// const iconPlay = require('../filled-sent.png')
// const iconPause = require('../pause-symbol.png')


const img_speaker = require('../ui_speaker.png');
const img_pause = require('../ui_pause.png');
const img_play = require('../ui_play.png');
const img_playjumpleft = require('../ui_playjumpleft.png');
const img_playjumpright = require('../ui_playjumpright.png');
const img_audiothmb = require('../audioimage.png');
const path = 'content://com.android.provider.downloads.documents/document/4788'
const WH = Dimensions.get('window').height - 80;

var roomId = "";
var currentUser = "";
var mContext = null;

var gValue = 0;
var isNewConversation = false;
var bottomStateBusy = false;
var maxOffset = 0;

export default class ChatScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            header: <CustomHeader this navigation={navigation} />
        };
    };

    constructor(props) {
        super(props)

        this.state = {
            conversation: [],
            refreshList: false,
            keyboardHeight: 0,
            // otherUser: this.props.navigation.state.params.user,
            toSendMessage: '',
            atBottomOfList: true,
            //Chat code//
            selecteddata: '',
            avatarSource: null,
            person: {
                name: props.navigation.getParam('name'),
                phone: props.navigation.getParam('phone')
            },
            textMessage: '',
            messageList: [],
            messages: [],
            temp: '',
            image_uri: '',
            tag: '',
            save: '',
            paused: true,
            totalLength: 1,
            currentPosition: 0,
            audioPath: `${
                AudioUtils.DocumentDirectoryPath
                }/${this.messageIdGenerator()}test.mp3`,
            audioSettings: {
                SampleRate: 22050,
                Channels: 1,
                AudioQuality: "Low",
                AudioEncoding: "aac",
                MeteringEnabled: true,
                IncludeBase64: true,
                AudioEncodingBitRate: 32000
            },
            startAudio: false,
            hasPermission: false,
            playAudio: false,
            uploading: false,
            playbtn: false,
            // images: [{
            //     url: '',
            // }],
            // images2: [{
            //     url: '',
            // }],
            mapvisible: false,
            modalVisibledouble: false,
            modalVisible: false,
            modalVisible2: false,
            modalVisible3: false,
            playState: 'paused', //playing, paused
            playSeconds: 0,
            duration: 0,
            animated: true,
            showThumbnail: true,
            currentuser: '',
            brag: ''
        }
    }


    // onTyping(value) {
    //     this.setState({ toSendMessage: value });
    // }


    // scrollToEnd(delay, animate) {
    //     setTimeout(() => {
    //         if (this != null && this.flatListRef != null && this.state.conversation.length != 0)
    //             // this.flatListRef.scrollToEnd({ animated: true });
    //             this.flatListRef.scrollToIndex({ animated: animate, index: this.state.conversation.length - 1, viewOffset: 0, viewPosition: 1 });

    //     }, delay)
    // }

    // copyToClipboard(message) {
    //     Clipboard.setString(message);
    //     Toaster.showLongToast("Copied to clipboard");
    // }

    // componentDidMount() {
    //     mContext = this;
    //     this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    //     this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);

    //     // firebase.auth().onAuthStateChanged(function (user) {
    //     //     if (user) {
    //     //         currentUser = user;
    //     //     }

    //     //     mContext.doFirebaseLogin();
    //     // });

    //     // if (Platform.OS == "ios") {
    //     //     KeyboardManager.setEnable(false)
    //     //     KeyboardManager.setEnableAutoToolbar(false);
    //     // }

    //   //  AsyncStorage.getItem('user', (err, result) => {
    //        // this.setState({ currentuser: result })


    //         firebase.database().ref('messages/').child('9926763389').child(this.state.person.phone).on('child_added', (value, i) => {
    //             this.setState((prevState) => {

    //                 //  var storageRef = firebase.storage().ref('Images/image1.jpg');

    //                 //1. Try:
    //                 // storageRef.getDownloadURL().then(function(url) {
    //                 //   console.log(url);
    //                 // )}
    //                 //alert(JSON.Stringify(prevState));
    //                 //  value.messageList['msg']='ccc'

    //                 return {
    //                     messageList: [...prevState.messageList, value.val()]

    //                 }

    //             })
    //             this.setState({ animated: false })
    //         })
    //   //  })

    // }

    // getRoomId() {

    //     if (currentUser.uid < this.state.otherUser.uid) {
    //         roomId = currentUser.uid + "_" + this.state.otherUser.uid;
    //     }
    //     else {
    //         roomId = this.state.otherUser.uid + "_" + currentUser.uid;
    //     }
    // }


    // addUserToRoom() {

    //     let user = {
    //         id: ConstantLib.USER_ID,
    //         email: ConstantLib.EMAIL,
    //         name: ConstantLib.FIRST_NAME + " " + ConstantLib.LAST_NAME,
    //     }

    //     FirebaseService.database()
    //         .ref('users/' + currentUser.uid)
    //         .once('value', (snapshot) => {
    //             if (JSON.stringify(snapshot) == null || JSON.stringify(snapshot) == "null") {

    //                 user['rooms'] = [roomId];

    //                 FirebaseService.database()
    //                     .ref('users/' + currentUser.uid)
    //                     .push()
    //                     .set(user, (error) => {


    //                     })
    //             }
    //             else {
    //                 this.updateUser(snapshot, user)
    //             }

    //         }, (errorObject) => {
    //             console.log("Error", errorObject);
    //         })
    // }
    // updateUser(snapshot, user) {

    //     snapshot.forEach(function (data) {
    //         let userData = data.val();
    //         if (userData.rooms == undefined) {
    //             user['rooms'] = [roomId];
    //             snapshot.ref.child(data.key).set(user);
    //         }
    //         else {
    //             let isNew = true;
    //             userData.rooms.forEach(function (item) {
    //                 if (item == roomId) {
    //                     isNew = false;
    //                     return;
    //                 }
    //             })

    //             if (isNew) {
    //                 userData.rooms.push(roomId);
    //                 snapshot.ref.child(data.key).set(userData);
    //             }
    //         }
    //     });
    // }

    // sendMessage() {

    //     if (this.state.toSendMessage.trim() == "") {
    //         return;
    //     }

    //     let chatMessage = {
    //         sender: ConstantLib.EMAIL,
    //         message: this.state.toSendMessage.trim(),
    //         name: ConstantLib.FIRST_NAME + " " + ConstantLib.LAST_NAME,
    //         local_timestamp: Date.now(),
    //         server_timestamp: firebase.database.ServerValue.TIMESTAMP,
    //         type: "text",
    //         userimage: "https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png",
    //         room_id: roomId,
    //         sender_id: ConstantLib.USER_ID,
    //         sender_uid: currentUser.uid,
    //         title: "Group Title",
    //         downloadurl: "",
    //         filename: "",
    //         deliveredBy: [
    //             currentUser.uid,
    //         ]
    //     }
    //     this.setState({ toSendMessage: "" });

    //     FirebaseService.database()
    //         .ref('room-messages/' + roomId)
    //         .push().set(chatMessage, (error) => {
    //             if (!error) {
    //                 this.scrollToEnd(100, true);
    //             } else {
    //             }
    //         })

    //     this.addUserToRoom();
    // }

    // getMessageHistoryList() {
    //     let { conversation } = this.state;

    //     FirebaseService.database()
    //         .ref('room-messages/' + roomId)
    //         .orderByChild('server_timestamp')
    //         .startAt(this.getLastServerTimeStamp())
    //         .once('value', (snapshot) => {

    //             this.createAndUpdateMessage(snapshot, conversation);

    //             this.setState({ conversation: conversation }, () => {
    //                 this.scrollToEnd(500, true);
    //                 this.getNewMessage();
    //             });

    //         }, (errorObject) => {
    //             alert("3==" + JSON.stringify(errorObject))
    //         })
    // }

    // getNewMessage() {
    //     let { conversation } = this.state;
    //     let count = 0;

    //     FirebaseService.database()
    //         .ref('room-messages/' + roomId)
    //         .orderByChild('server_timestamp')
    //         .startAt(this.getLastServerTimeStamp())
    //         .on('value', (snapshot) => {

    //             this.parseNewMessage(snapshot, conversation);

    //             this.setState({ conversation: conversation });
    //             count++;
    //         }, (errorObject) => {
    //             alert("3==" + JSON.stringify(errorObject))
    //         })
    // }

    // parseNewMessage(snapshot, conversation) {

    //     snapshot.forEach(function (data) {

    //         if (!mContext.isDuplicateNewMessage(data)) {
    //             let item = data.val();
    //             item["messageId"] = data.key;
    //             conversation.push(item);
    //         }
    //     });
    // }

    // isDuplicateNewMessage(data) {
    //     let { conversation } = this.state;

    //     for (let i = conversation.length - 1; i >= 0; i--) {
    //         if (conversation[i].messageId == data.key) {
    //             return true;
    //         }
    //     }

    //     return false;
    // }

    // getLastServerTimeStamp() {

    //     let { conversation } = this.state;

    //     if (conversation.length > 0) {
    //         for (let i = conversation.length - 1; i >= 0; i--) {
    //             // if (messageList.get(i).getSent() == 1)
    //             return conversation[i].server_timestamp + 1;
    //         }
    //     }

    //     return 0;
    // }

    // createAndUpdateMessage(snapshot, conversation) {

    //     snapshot.forEach(function (data) {
    //         let item = data.val();

    //         if (!mContext.isDuplicateHistoryMessage(data)) {
    //             item["messageId"] = item.key;
    //             conversation.push(item);
    //         }

    //     });
    // }


    // isDuplicateHistoryMessage(data) {
    //     let { conversation } = this.state;

    //     for (let i = conversation.length - 1; i >= 0; i--) {
    //         if (conversation[i].messageId == data.key) {
    //             return true;
    //         }
    //     }

    //     return false;
    // }


    // doFirebaseLogin() {

    //     if (currentUser != null && currentUser != "") {
    //         this.proceedAfterFirebaseLogin(currentUser);
    //     } else {
    //         firebase.auth().createUserWithEmailAndPassword(ConstantLib.EMAIL, ConstantLib.EMAIL)
    //             .then((user) => {
    //                 this.proceedAfterFirebaseLogin(user.user);
    //             })
    //             .catch((error) => {
    //                 const { code, message } = error;
    //                 if (code == "auth/email-already-in-use") {

    //                     firebase.auth().signInWithEmailAndPassword(ConstantLib.EMAIL, ConstantLib.EMAIL)
    //                         .then((user) => {
    //                             this.proceedAfterFirebaseLogin(user.user);
    //                         })
    //                         .catch((error) => {
    //                             const { code, message } = error;
    //                         });
    //                 }
    //             });
    //     }
    // }

    // proceedAfterFirebaseLogin(user) {
    //     currentUser = user;

    //     this.getRoomId();
    //     this.getMessageHistoryList();
    // }

    // componentWillUnmount() {
    //     this.keyboardDidShowListener.remove();
    //     this.keyboardDidHideListener.remove();
    // }

    // _keyboardDidShow = (event) => {
    //     if (Platform.OS == "ios")
    //         this.setState({ keyboardHeight: 80 })
    //     else
    //         this.setState({ keyboardHeight: 0 })

    //         // alert("this.state.atBottomOfList=="+this.state.atBottomOfList)
    //     if (!this.state.atBottomOfList) {
    //         this.scrollToEnd(100, false);
    //     }
    // }

    // _keyboardDidHide = (event) => {
    //     this.setState({ keyboardHeight: 0 })
    // }

    // renderUI() {
    //     return (
    //         <View style={{ flex: 1 }}>
    //             {
    //                 Platform.OS == "ios" ?
    //                     this.renderUiForIos()
    //                     :
    //                     this.renderUiForAndroid()
    //             }
    //         </View>
    //     );
    // }

    // renderUiForIos() {
    //     return (
    //         <KeyboardAvoidingView behavior={"padding"}>

    //             <View style={{ marginBottom: this.state.keyboardHeight + 50 }}>
    //                 {
    //                     this.renderChatListUi()
    //                 }
    //             </View>

    //             <View style={{ position: 'absolute', bottom: 0, width: '100%', backgroundColor: 'transparent' }}>
    //                 {
    //                     <KeyboardAccessoryView alwaysVisible={true} inSafeAreaView={true}>
    //                         {
    //                             this.renderInputUi()
    //                         }
    //                     </KeyboardAccessoryView>
    //                 }
    //             </View>

    //         </KeyboardAvoidingView>
    //     )
    // }

    // renderUiForAndroid() {
    //     return (
    //         <View style={{ flex: 1 }}>

    //             <View style={{ marginBottom: this.state.keyboardHeight + 50 }}>
    //                 {
    //                     this.renderChatListUi()
    //                 }
    //             </View>

    //             <View style={{ position: 'absolute', bottom: 0, width: '100%', height: 50, backgroundColor: 'transparent' }}>
    //                 {
    //                     this.renderInputUi()
    //                 }
    //             </View>

    //         </View>
    //     )
    // }

    // handleScroll = (event) => {
    //     let yOffset = event.nativeEvent.contentOffset.y
    //     let contentHeight = event.nativeEvent.contentSize.height
    //     let value = yOffset / contentHeight;
    //     if (yOffset > maxOffset) {
    //         maxOffset = yOffset;
    //     }

    //     if (!bottomStateBusy) {
    //         bottomStateBusy = true;

    //         let atBottomOfList = yOffset >= maxOffset - 400;

    //         this.setState({ atBottomOfList: !atBottomOfList }, () => {
    //             bottomStateBusy = false;
    //         })
    //     }
    // }

    // onLongPress(item) {
    //     // this.copyToClipboard(item.item.message)

    //     alert('gValue==' + gValue)
    // }

    // renderChatListUi() {
    //     return (
    //         <View style={{ width: '100%', height: '100%' }}>
    //             <FlatList
    //                 data={this.state.conversation}
    //                 refreshList={this.state.refreshList}
    //                 keyExtractor={(item) => item.index}
    //                 ref={(ref) => this.flatListRef = ref}
    //                 onScroll={this.handleScroll}
    //                 onScrollToIndexFailed={() => { }}
    //                 renderItem={(item) =>

    //                     <View >
    //                         <View style={(item.item.sender_id == ConstantLib.USER_ID) ? Style.right_bubble : Style.left_bubble}>
    //                             <TouchableOpacity onLongPress={() => this.onLongPress(item)} activeOpacity={0.6}>
    //                                 <Text style={(item.item.sender_id == ConstantLib.USER_ID) ? Style.right_bubble_text : Style.left_bubble_text}>{item.item.message}</Text>
    //                             </TouchableOpacity>

    //                         </View>
    //                     </View>
    //                 }
    //             />
    //         </View>
    //     )
    // }

    // renderInputUi() {

    //     return (
    //         <View style={Style.bottom_view_container}>
    //             {
    //                 this.state.atBottomOfList ?
    //                     <TouchableOpacity style={{ position: 'absolute', right: 40, top: -70, height: 40, width: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 20, }} onPress={() => this.scrollToEnd(0, true)}>
    //                         <Image source={Images.ic_pull_down} style={{ height: 40, width: 40, borderRadius: 20 }} />
    //                     </TouchableOpacity>
    //                     :
    //                     <View />
    //             }


    //             <TextInput
    //                 style={[Style.input_text]}
    //                 multiline={true}
    //                 maxLength={1000}
    //                 onChangeText={(value) => this.onTyping(value)}
    //                 placeholder='Type a message..'
    //                 textContentType='none'
    //                 underlineColorAndroid={'white'}
    //                 value={this.state.toSendMessage}
    //             />
    //             <TouchableOpacity style={Style.send_button_container} onPress={() => this.sendMessage()}>
    //                 <Image source={Images.send_bt} style={Style.send_button} />
    //             </TouchableOpacity>
    //         </View>
    //     )

    // }

    //chad code//


    setModalVisibledouble(visible2, imagePath) {

        this.state.images2 = [{
            url: imagePath,
        }]
        if (visible2) {

            StatusBar.setHidden(true);
        }
        if (!visible2) {

            StatusBar.setHidden(false);
        }
        this.setState({ modalVisibledouble: visible2 });
    }
    setModalVisible(visible, imagePath) {

        this.state.images = [{
            url: imagePath,
        }]
        if (visible) {

            StatusBar.setHidden(true);
        }
        if (!visible) {

            StatusBar.setHidden(false);
        }
        this.setState({ modalVisible: visible });
    }

    setModalVisible2(visible, imagePath) {

        // this.state.videopath = [{
        //   uri: imagePath,
        // }]
        this.state.videopath = imagePath
        if (visible) {

            StatusBar.setHidden(true);
        }
        if (!visible) {

            StatusBar.setHidden(false);
        }
        this.setState({ modalVisible2: visible });
    }

    setModalVisible3(visible, imagePath) {


        setTimeout(() => {
            //  alert('555')
            this.play();
        }, 2000);

        //   alert(this.state.audio)
        this.timeout = setInterval(() => {
            if (this.sound && this.sound.isLoaded() && this.state.playState == 'playing' && !this.sliderEditing) {
                this.sound.getCurrentTime((seconds, isPlaying) => {
                    this.setState({ playSeconds: seconds });
                })
            }
        }, 100);

        // this.state.videopath = [{
        //   uri: imagePath,
        // }]
        this.state.audiourl = imagePath
        if (visible) {

            StatusBar.setHidden(true);
        }
        if (!visible) {

            StatusBar.setHidden(false);
        }
        this.setState({ modalVisible3: visible });
    }

    onSliderEditStart = () => {
        this.sliderEditing = true;
    }
    onSliderEditEnd = () => {
        this.sliderEditing = false;
    }
    onSliderEditing = value => {
        if (this.sound) {
            this.sound.setCurrentTime(value);
            this.setState({ playSeconds: value });
        }
    }


    play = async () => {
        if (this.sound) {
            this.sound.play(this.playComplete);
            this.setState({ playState: 'playing' });
        } else {
            const filepath = this.state.audiourl;
            console.log('[Play]', filepath);
            this.setState({ animating: true });
            this.sound = new Sound(filepath, '', (error) => {
                if (error) {
                    // alert('start1122');
                    //  alert('failed to load the sound', error);
                    //   Alert.alert('Notice', 'audio file error. (Error code : 1)');
                    this.setState({ playState: 'paused' });
                } else {
                    this.setState({ animating: false });
                    // alert('start11');
                    this.setState({ playState: 'playing', duration: this.sound.getDuration() });
                    this.sound.play(this.playComplete);
                }
            });
        }
    }
    playComplete = (success) => {
        if (this.sound) {
            if (success) {
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');
                // Alert.alert('Notice', 'audio file error. (Error code : 2)');
            }
            this.setState({ playState: 'paused', playSeconds: 0 });
            this.sound.setCurrentTime(0);
        }
    }

    pause = () => {
        if (this.sound) {
            this.sound.pause();
        }

        this.setState({ playState: 'paused' });
    }

    jumpPrev15Seconds = () => { this.jumpSeconds(-15); }
    jumpNext15Seconds = () => { this.jumpSeconds(15); }
    jumpSeconds = (secsDelta) => {
        if (this.sound) {
            this.sound.getCurrentTime((secs, isPlaying) => {
                let nextSecs = secs + secsDelta;
                if (nextSecs < 0) nextSecs = 0;
                else if (nextSecs > this.state.duration) nextSecs = this.state.duration;
                this.sound.setCurrentTime(nextSecs);
                this.setState({ playSeconds: nextSecs });
            })
        }
    }

    getAudioTimeString(seconds) {
        const h = parseInt(seconds / (60 * 60));
        const m = parseInt(seconds % (60 * 60) / 60);
        const s = parseInt(seconds % 60);

        return ((h < 10 ? '0' + h : h) + ':' + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s));
    }

    handleMap() {
        this.props.navigation.navigate('MapScreen')

        // alert(this.state.mapvisible)
        // this.SendMessage('location', {lat:0,long:0})
        //if(!this.state.mapvisible){
        // this.setState({mapvisible:true})}

    }

    handleShareBrag() {

        this.props.navigation.navigate('ProfileScreen')

    }

    handleAudio = async (mime = 'mp3') => {
        //alert('start'+this.state.startAudio)

        if (!this.state.startAudio) {
            await this.setState({
                startAudio: true
            });

            await AudioRecorder.startRecording();
        }
        else {

            await this.setState({ startAudio: false });
            //alert('stop'+this.state.startAudio)
            await AudioRecorder.stopRecording();


            const { audioPath } = this.state;
            const fileName = `${this.messageIdGenerator()}.mp3`;
            const file = {
                uri: Platform.OS === "ios" ? audioPath : `file://${audioPath}`,
                name: fileName,
                type: "audio/mpeg"

            };

            const audioRef = firebase.storage().ref('audio').child("audio_" + fileName)

            fs.readFile(file.uri, 'base64')

                .then((data) => {

                    return Blob.build(data, { type: `${file.type};BASE64` })
                })
                .then((blob) => {
                    uploadBlob = blob
                    console.log('oooo', blob)
                    console.log('ooool', audioRef)
                    return audioRef.put(blob, { contentType: file.type })

                })
                .then(() => {
                    uploadBlob.close()
                    return audioRef.getDownloadURL();

                })

                .then((url) => {
                    //setTimeout(()=>{
                    alert('check' + url)
                    //resolve(url)
                    this.SendMessage('audio', url)

                }).catch((error) => {
                    alert(error)
                    reject(error)
                    //console.log(error)
                })

        }
    }
    handleChange = key => val => {
        this.setState({ [key]: val })

    }
    componentDidMount() {

        mContext = this;
        //  const { navigation } = this.props;

        //   var phonedata = this.props.getParam('phone');
        // alert(JSON.stringify(this.props.navigation.getParam('phone')))



        this.checkPermission().then(async hasPermission => {
            this.setState({ hasPermission });
            if (!hasPermission) return;
            AudioRecorder.prepareRecordingAtPath(

                this.state.audioPath,
                this.state.audioSettings
            );
            AudioRecorder.onProgress = data => {
                //alert( "onProgress data");

            };
            AudioRecorder.onFinished = data => {
                //  alert( "on finish");
            };
        });
    }
    messageIdGenerator() {
        // generates uuid.
        return new Date().getTime()
    }
    async checkPermission() {
        if (Platform.OS !== "android") {
            return Promise.resolve(true);
        }
        const rationale = {
            title: "MICROPHONE",
            message: "App needs access to memory to download the file "
        };
        return PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            // PermissionsAndroid.PERMISSIONS.STORAGE,

            rationale
        ).then(result => {
            console.log("Permission result:", result);
            return result === true || result === PermissionsAndroid.RESULTS.GRANTED;
        });
        return PermissionsAndroid.request(

            PermissionsAndroid.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.WRITE_EXTERNAL_STORAGE,
            rationale
        ).then(result => {
            console.log("Permission result:", result);
            return result === true || result === PermissionsAndroid.RESULTS.GRANTED;
        });

        //try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: "Storage Permission",
                message: "App needs access to memory to download the file "
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //  Alert.alert("Permission granted","Now you can download anything!");
        } else {
            Alert.alert(
                "Permission Denied!",
                "You need to give storage permission to download the file"
            );
        }
        //   } catch (err) {
        //     console.warn(err);
        //   }
    }


    async componentWillMount() {

        var i = 0
        this.subs = [
            this.props.navigation.addListener('willFocus', async (payload) => {
                // console.debug('willFocusbrag----------', payload.action.params);
                if (typeof payload.action.params != 'undefined') {

                    this.setState({
                        brag: payload.action.params.brag
                    })
                    if (i == 0) {
                        if (payload.action.params.brag != "") {
                            console.debug('willFocus----------', payload.action.params.brag);
                            this.SendMessage('brag', payload.action.params.brag);
                            i ++;
                        }
                    }
                }
            }),

        ];

        AsyncStorage.getItem('user', (err, result) => {

            //  alert(result)
            this.setState({ currentuser: result })
            // alert(this.state.currentuser)
            AsyncStorage.getItem('userchat', (err, result2) => {
                //  alert(result2);
                // alert('result'+result)
                firebase.database().ref('messages/').child(result).child(result2).on('child_added', (value, i) => {

                    this.setState((prevState) => {

                        //  var storageRef = firebase.storage().ref('Images/image1.jpg');

                        //1. Try:
                        // storageRef.getDownloadURL().then(function(url) {
                        //   console.log(url);
                        // )}

                        //  value.messageList['msg']='ccc'

                        return {
                            messageList: [...prevState.messageList, value.val()]

                        }

                    })
                    console.log('state', this.state.messageList)
                    // this.setState({ animated: false })

                })
            })

            this.setState({ animated: false })

        })

        // alert(JSON.stringify(this.props.navigation.getParam('phone')))
        // alert(JSON.stringify(this.props.navigation.getParam('phone','0') ) 

    }
    SendMessage = async (type = '', value = '') => {
        //  alert(type)
        // if (type == 'image') {

        //    alert(this.state.person.name);
        //    alert(this.state.person.phone);
        AsyncStorage.getItem('user', (err, result) => {
            // alert('dddaaa')

            AsyncStorage.getItem('userchat', (err, result2) => {

                let msgId1 = firebase.database().ref('messages').child(result).child(result2).push().key

                let up = {};
                let message = {
                    message: value,
                    time: firebase.database.ServerValue.TIMESTAMP,
                    from: result,
                    type: type,
                }
                // alert(result+ 'result')
                // alert(this.state.image_uri+ 'uri')
                // alert(value+ 'value')
                // alert(msgId1+'msgid')
                up['messages/' + result2 + '/' + result + '/' + msgId1] = message;
                up['messages/' + result + '/' + result2 + '/' + msgId1] = message;

                firebase.database().ref().update(up);
                this.setState({ image_uri: '' });
                this.setState({ animatingupload: false })
                this.setState({ textMessage: '' })
            })
        })
    }

    uploadImage(uri, mime) {
        return new Promise((resolve, reject) => {
            // alert('pp')
            const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
            let uploadBlob = null

            // alert('2'+mime)
            imageRef = firebase.storage().ref('images').child("images_" + Date.now())
            if (mime == 'image/png' || mime == 'image/jpg' || mime == 'image/jpeg' || mime == 'image/GIF') {
                //alert('2' + mime)
                // fs.readFile(uploadUri, 'base64')

                //     .then((data) => {
                //         return Blob.build(data, { type: `${mime};BASE64` })
                //     })
                //     .then((blob) => {
                //         uploadBlob = blob
                //         console.log('oooo', blob)
                //         console.log('ooool', imageRef)
                //         return imageRef.put(blob, { contentType: mime })

                //     })
                //     .then(() => {
                //         uploadBlob.close()
                //         return imageRef.getDownloadURL();

                //     })

                //     .then((url) => {
                //         //setTimeout(()=>{
                //         alert(url + 'uploaded')
                //         alert(url)
                //         this.SendMessage('captureimage', url)
                //         resolve(url)

                //     })
                //     .catch((error) => {
                //         reject(error)
                //     })
            }
            else {
                alert('invalid filetype');
            }
        })
    }

    convertTime = (time) => {
        let d = new Date(time);
        let c = new Date();
        let result = (d.getHours() < 10 ? '0' : '') + d.getHours() + ':'
        result += (d.getMinutes() < 10 ? '0' : '') + d.getMinutes()
        if (c.getDay() !== d.getDay()) {
            result = result;

        }
        return result;
    }
    fileName = (value) => {
        let d = value.split("?")
        let k = d[0].split('/')
        let p = k[7].split('%2F')
        // alert(p[1])
        return p[1];
    }
    handleAddPicture = () => {
        // const { user } = data; // wherever you user data is stored;


        const options = {
            title: "Select Profile Pics",
            mediaType: "photo",
            takePhotoButtonTitle: "Take a Photo",
            maxWidth: 256,
            maxHeight: 256,
            allowsEditing: true,
            noData: true
        };
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('Image Picker Error: ', response.error);
            }

            else {
                //   let source = { uri: response.uri };

                //   // You can also display the image using data:
                //   // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                //   this.setState({
                //     avatarSource: source,temp:response.fileName,
                // //     pic:response.data
                //   });
                //alert(response.type)
                this.uploadImage(response.uri, response.type)
                    // alert(response.uri)
                    .then(url => {
                        // alert('uploaded');
                        // alert(response.uri);

                        this.setState({ image_uri: url, temp: response.fileName, tag: response.type, save: response.uri })
                    })


                    .catch(error => console.log(error),
                        this.setState({ temp: response.fileName }))
            }



        });

    }


    handeldocument = async () => {
        { this.checkPermission.bind(this) }

        // try {
        const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.allFiles],
        });
        // alert(res.uri)
        console.log(
            res.uri,
            res.type, // mime type
            res.name,
            res.size
        );
        this.setState({ animatingupload: true })
        //alert('handel')
       // alert('uri' + (res.size) / 1024)
        this.uploadallfiles(res);
        //  } catch (err) {
        if (DocumentPicker.isCancel(err)) {
            // User cancelled the picker, exit any dialogs or menus and move on
        } else {
            throw err;
        }

    }

    pauseaudio(item) {
        //alert(7)
        const sound = new Sound(item.message, "", error => {
            this.setState({
                selecteddata: ''
            });

            if (error) {
                // alert('ppppp')
                this.setState({
                    selecteddata: ''
                });
                console.log("failed to load the sound", error);
            }


            sound.pause();
            AsyncStorage.getItem('user', (err, result) => {
                this.setState({ currentuser: result })

                this.setState({ 'messageList': [] })
                firebase.database().ref('messages/').child(result).child(this.state.person.phone).on('child_added', (value) => {
                    this.setState((prevState) => {
                      //  alert(value.val())
                        return {
                            messageList: [...prevState.messageList, value.val()]

                        }
                        // return {... value.val()};
                    })
                })
            })

            console.log('state' + this.state.messageList)
        });
    }

    showfile() {
       // alert(path)
        FileViewer.open(path, { showOpenWithDialog: true })
            .then(() => {

            })
            .catch(error => {

            })
    }
    ProgressBar() {
        const progress = useTrackPlayerProgress();

        return (
            <View style={styles.progress}>
                <View style={{ flex: progress.position, backgroundColor: "red" }} />
                <View
                    style={{
                        flex: progress.duration - progress.position,
                        backgroundColor: "grey"
                    }}
                />
            </View>
        );
    }
    seek(time) {
        time = Math.round(time);
        this.refs.audioElement && this.refs.audioElement.seek(time);
        this.setState({
            currentPosition: time,
            paused: false,
        });
    };

    uploadallfiles(res) {

        this.setState({ animatingupload: true })

        //  alert(this.state.animatingupload)

        // console.log(res.uri, res.type, res.name,res.size);
        //alert( Platform.OS === 'ios' ? res.uri.replace('file://', '') : res.uri)
        let url = res.uri;
        const split = url.split('/');
        const name = split.pop();
        const inbox = split.pop();
        //////const realPath = `${RNFS.TemporaryDirectoryPath}${inbox}/${name}`;
        //alert(realPath)
        // const uploadBegin = (response) => {
        //   const jobId = response.jobId;
        // alert('UPLOAD HAS BEGUN! JobId: ' + jobId);

        // };

        // const uploadProgress = (response) => {
        //   const percentage = Math.floor((response.totalBytesSent/response.totalBytesExpectedToSend) * 100);
        //   console.log('UPLOAD IS ' + percentage + '% DONE!');
        // };

        return new Promise((resolve, reject) => {
            // alert('pp')
            const uploadUri = Platform.OS === 'ios' ? res.uri.replace('file://', '') : res.uri
            let uploadBlob = null



            //alert(res.type)


            if (res.type == 'audio/mpeg') {
                imageRef = firebase.storage().ref().child("audio/" + Date.now() + ".mp3")
                // alert(res.type)
            }
            else if (res.type == 'video/mp4') {
                imageRef = firebase.storage().ref('video').child("video_" + Date.now() + ".mp4")
            }
            else if (res.type == 'application/pdf') {
                imageRef = firebase.storage().ref('files').child("files_" + Date.now() + ".pdf")
            }
            else {
                var typeimg = res.type.split('/');
                //alert(typeimg[1])
                imageRef = firebase.storage().ref('images').child("images_" + Date.now() + "." + typeimg[1])
            }

            if (res.type == 'audio/mpeg' || res.type == 'audio/mp3' || res.type == 'video/mp4' || res.type == 'video/avi' || res.type == 'image/jpeg' || res.type == 'image/jpg' || res.type == 'image/png' || res.type == 'image/gif' || res.type == 'application/pdf' || res.type == 'application/doc' || res.type == 'application/dox') {
                fs.readFile(uploadUri, 'base64')

                    .then((data) => {

                        return Blob.build(data, { type: `${res.type};BASE64` })
                    })
                    .then((blob) => {
                        uploadBlob = blob
                        //     alert('blob upload')
                        return imageRef.put(blob, { contentType: res.type })

                    })
                    .then(() => {
                        // alert('blob close')
                        uploadBlob.close()
                        return imageRef.getDownloadURL();

                    })

                    .then((url) => {
                        //setTimeout(()=>{
                        //alert(url+'uploaded')
                        if (res.type == 'audio/mpeg') {
                            this.SendMessage('audio', url)
                        }
                        else if (res.type == 'video/mp4') {
                            this.SendMessage('video', url)
                        }
                        else if (res.type == 'application/pdf') {
                            this.SendMessage('pdf', url)
                        }
                        else {
                            this.SendMessage('image', url)
                        }
                        resolve(url)

                    })
                    .catch((error) => {
                        //  alert(error)
                        reject(error)
                    })
            } else {
                alert('imvalid')

            }

        })


    }



    showListOrSpinner() {


        return (

            <FlatList

                data={this.state.messageList}
                // initialScrollIndex={10}
                renderItem={({ item }) => {
                    return (
                        <View>
                            <View>
                                {(item.type == 'text') ?
                                    <View style={item.from === this.state.currentuser ? Style.textleftstyle : Style.textrightstyle}>
                                        <Text style={item.from === this.state.currentuser ? Style.textleft1style : Style.textright1style}>
                                            {item.message}
                                        </Text >
                                    </View>
                                    : (item.type == 'location') ?

                                        <View style={item.from === this.state.currentuser ? Style.textleftstyle : Style.textrightstyle}>
                                            <Text style={item.from === this.state.currentuser ? Style.textleft1style : Style.textright1style}>
                                                {item.message}
                                            </Text >
                                            {/* <View style={{height:100,width:200}}>
                                   <MapView
                                    provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                                    style={styles.map}
                                    region={{
                                        latitude: 22.719568,
                                        longitude: 75.857727,
                                      latitudeDelta: 0.0922,
                                     longitudeDelta: 0.0121,
                                    }}
                                     showsCompass={true}
                                    showsUserLocation={true}
                                    followUserLocation={true}
                                  ></MapView>
                                </View> */}
                                        </View>
                                        : (item.type == 'audio') ?
                                            <View style={item.from === this.state.currentuser ? Style.audioleftstyle : Style.audiorightstyle}>
                                                {item.time == this.state.selecteddata ?
                                                    <TouchableOpacity
                                                        // style={{marginTop:10}}
                                                        onPress={() => {
                                                            this.pauseaudio(item);
                                                        }}
                                                    >

                                                        <Image
                                                            source={img_audiothmb}
                                                            // source={audioimgfile}

                                                            //tintcolor={this.state.playAudio ? "blue" : "yellow"}
                                                            tintcolor='white'

                                                            style={{ width: 25, height: 25, marginLeft: 10, margin: 5, tintColor: 'white' }}

                                                        />

                                                    </TouchableOpacity>
                                                    :
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                        <TouchableOpacity
                                                            //style={{marginLeft:20}}
                                                            //     onPress={() => {
                                                            //        this.startaudio(item);

                                                            //    }}

                                                            onPress={() => {
                                                                this.setModalVisible3(!this.state.modalVisible3, item.message);
                                                            }}
                                                        //  onPress={() => this.props.navigation.navigate('Audio',{itemurl:item.message})}
                                                        >


                                                            <Image

                                                                //  source={require('../play-button-inside-a-circle.png')} 
                                                                source={img_audiothmb}
                                                                tintcolor='blue'
                                                                style={{ width: 30, height: 30, marginLeft: 10, margin: 5, marginTop: 10, tintColor: 'white' }}

                                                            />
                                                        </TouchableOpacity>
                                                        {/* <Text style={{color:'#8C9093',paddingLeft:10}}>{this.fileName(item.message)}</Text> */}
                                                    </View>
                                                }
                                                <Text>{this.state.selecteddata}</Text>


                                            </View>


                                            : (item.type == 'video') ?
                                                <View style={item.from === this.state.currentuser ? Style.videoleftstyle : Style.videorightstyle}>

                                                    <TouchableOpacity
                                                        //style={{marginLeft:'50%'}}
                                                        //     onPress={() => {
                                                        //        this.startaudio(item);

                                                        //    }}
                                                        onPress={() => {
                                                            this.setModalVisible2(!this.state.modalVisible2, item.message);
                                                        }}
                                                    // onPress={() => this.props.navigation.navigate('video',{itemurl:item.message})}
                                                    >

                                                        <Image

                                                            source={require('../play-video-button.png')}


                                                            style={{ width: 25, height: 25, marginLeft: 10, margin: 5 }}

                                                        />

                                                    </TouchableOpacity>
                                                </View>
                                                : (item.type == 'pdf') ?
                                                    <View style={item.from === this.state.currentuser ? Style.pdfleftstyle : Style.pdfrightstyle}>
                                                        <TouchableOpacity onPress={() => Linking.openURL(item.message)}>

                                                            <View style={{ padding: 8, flexDirection: 'row' }}>
                                                                <Image source={require(

                                                                    '../../Images/pdficon.jpeg',

                                                                )} style={{ }} />

                                                                <Text style={{ color: 'white', paddingLeft: 0, }}>{this.fileName(item.message)}</Text>
                                                            </View>


                                                        </TouchableOpacity>
                                                    </View>
                                                    : (item.type == 'captureimage') ?

                                                        <TouchableOpacity onPress={() => {
                                                            this.setModalVisibledouble(!this.state.modalVisibledouble, item.message);
                                                        }}>

                                                            <View style={item.from === this.state.currentuser ? Style.imageleftstyle : Style.imagerightstyle}>
                                                                <Image source={{ uri: item.message }} style={{
                                                                    height: 110, width: 230
                                                                }} />
                                                            </View>

                                                        </TouchableOpacity>
                                                        : (item.type == 'brag') ?

                                                            <View style={Style.brag_item}>

                                                                <View style={Style.question_card_item}>
                                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                        <TouchableOpacity onPress={() => this.goToTeamDetails(item.message.match_data.team_league_id_home)}><Text style={Style.team_name_text}>{item.message.match_data.home_team_name}</Text></TouchableOpacity>
                                                                        <Text style={{ fontFamily: 'SourceSansPro-Regular', fontWeight: 'bold', color: '#00000040' }}> VS </Text>
                                                                        <TouchableOpacity onPress={() => this.goToTeamDetails(item.message.match_data.team_league_id_away)}><Text style={Style.team_name_text}>{item.message.match_data.away_team_name}</Text></TouchableOpacity>

                                                                    </View>

                                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                        <Text style={{ fontFamily: 'SourceSansPro-Regular', color: '#00000040' }}>Week {item.message.match_data.week}</Text>
                                                                        <View style={{ height: 5, width: 5, borderRadius: 2.5, backgroundColor: '#9B9B9B', marginLeft: 3 }}>
                                                                        </View>
                                                                        <Text style={{ marginLeft: 3, fontFamily: 'SourceSansPro-Regular', color: '#00000040' }}>{Utility.getFormatedDate(item.message.season_scheduled_date, 'ddd, MMM Do - hh:mm A')}</Text>

                                                                        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-end', color: '#00000040', textAlign: 'center' }}>
                                                                            <Text style={{
                                                                                fontSize: 12, color: 'rgba(0,0,0,0.4)', fontFamily: 'SourceSansPro-Bold',
                                                                                alignItems: 'center', textAlign: 'right'
                                                                            }}> TOTAL POT: </Text>
                                                                            <Text style={{
                                                                                paddingLeft: 5, fontSize: 12, color: '#000', fontFamily: 'SourceSansPro-Bold',
                                                                                alignItems: 'center', textAlign: 'right', fontWeight: '600'
                                                                            }}>{parseFloat(item.message.total_bet_amount) > 1000 ? parseFloat(item.message.total_bet_amount) / 1000 + ' K' : item.message.total_bet_amount} </Text>
                                                                        </View>
                                                                    </View>

                                                                    <Text style={Style.question_text}>{item.message.question.replace("{{player_position}}", item.message.player_name)}</Text>
                                                                    <View style={Style.seperator_style}></View>

                                                                    <View style={Style.cards_bottom_view}>
                                                                        <View>
                                                                            <Text style={Style.question_card_lable_text}>MIN POINTS</Text>
                                                                            <Text style={Style.question_card_item_text}>{item.message.entry_fee}</Text>
                                                                        </View>
                                                                        <TouchableOpacity onPress={() => this.goToParticipantsList(item.message.contest_id, item.message.contest_unique_id)} style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                                                            <Text style={{ fontSize: 10, color: 'rgba(0,0,0,0.4)', fontFamily: 'SourceSansPro-Regular', fontWeight: '600' }}>PARTICIPANTS</Text>
                                                                            {
                                                                                (item.message.total_user_joined == '') ?
                                                                                    <Text style={{ fontSize: 16, color: '#000000', fontFamily: 'SourceSansPro-Regular', fontWeight: '600' }}>0</Text>
                                                                                    :
                                                                                    <Text style={{ fontSize: 16, color: '#000000', fontFamily: 'SourceSansPro-Regular', fontWeight: '600' }}>{item.message.total_user_joined}</Text>
                                                                            }
                                                                        </TouchableOpacity>
                                                                        <View style={{ justifyContent: 'center' }}>
                                                                            <LinearGradient
                                                                                start={{ x: 0.6, y: 0 }} end={{ x: 2.5, y: 1.5 }}
                                                                                locations={[0.0, 0.4]}
                                                                                colors={['#1B75BC', '#9AD8DD']}
                                                                                style={Style.play_button_gradient}>
                                                                                <Ripple onPress={() => this.joinBrag(item.message.contest_id, item.message.contest_unique_id)}>
                                                                                    <Text style={Style.play_button_text}>BRAG</Text>
                                                                                </Ripple>
                                                                            </LinearGradient>

                                                                        </View>

                                                                    </View>
                                                                </View>

                                                            </View> :
                                                            <TouchableOpacity onPress={() => {
                                                                this.setModalVisible(!this.state.modalVisible, item.message);
                                                            }}>

                                                                <View style={item.from === this.state.currentuser ? Style.imageleftstyle : Style.imagerightstyle}>
                                                                    <Image source={{ uri: item.message }} style={{
                                                                        height: 110, width: 230,
                                                                    }} />
                                                                </View>

                                                            </TouchableOpacity>

                                }
                            </View>
                            <View style={{}}>
                                <Text style={

                                    item.from === this.state.currentuser ? Style.textleft1 : Style.righttext1
                                }
                                >
                                    {this.convertTime(item.time)}
                                </Text>
                            </View>
                        </View>


                    )
                }}
                keyExtractor={(item, index) => index.toString()}
            >

            </FlatList>
        );

    }
    joinBrag(contestId, contest_unique_id, conference_name) {
        const navigateAction = NavigationActions.navigate({
            routeName: 'BHEntries',
            params: { 'contest_id': contestId, 'contest_unique_id': contest_unique_id, 'isFromConference': false },
            action: NavigationActions.navigate({ routeName: 'BHEntries' })
        })
        const nav = WSManager.getTopLevelNavigator()
        nav.dispatch(navigateAction)
    }

    goToTeamDetails(team_league_id) {

        const navigateAction = NavigationActions.navigate({
            routeName: 'TeamDetail',
            params: { 'team_league_id': team_league_id },
            action: NavigationActions.navigate({ routeName: 'TeamDetail' })
        })
        const nav = WSManager.getTopLevelNavigator()
        console.log('teamleague:', '' + team_league_id)
        nav.dispatch(navigateAction)

    }

    // playaudio() {
    //     TrackPlayer.setupPlayer().then(async () => {

    //         // Adds a track to the queue
    //         await TrackPlayer.add({
    //             id: 'trackId',
    //             url: require('../audio.mp3'),
    //             title: 'Track Title',
    //             artist: 'Track Artist',
    //             //   artwork: require('../track.png')
    //         });

    //         // Starts playing it
    //         TrackPlayer.play();

    //     });
    // }

    _openNowPlaying() {
        this.props.dispatch(navigateTo('now-playing'));
    }

    // _togglePlayPause() {
    //     // alert(this.props.state)
    //     // alert(TrackPlayer.STATE_PAUSED)
    //     if (this.props.state == TrackPlayer.STATE_PAUSED) {
    //         TrackPlayer.setupPlayer().then(async () => {

    //             // Adds a track to the queue
    //             await TrackPlayer.add({
    //                 id: 'trackId',
    //                 url: require('../audio.mp3'),
    //                 title: 'Track Title',
    //                 artist: 'Track Artist',
    //                 //   artwork: require('../track.png')
    //             });

    //             // Starts playing it
    //             TrackPlayer.play();

    //         });
    //     } else {
    //         // TrackPlayer.setupPlayer().then(async () => {

    //         //     // Adds a track to the queue
    //         //     await TrackPlayer.add({
    //         //         id: 'trackId',
    //         //         url: require('../audio.mp3'),
    //         //         title: 'Track Title',
    //         //         artist: 'Track Artist',
    //         //     //   artwork: require('../track.png')
    //         //     });

    //         //     // Starts playing it
    //         //    // TrackPlayer.play();

    //         // });
    //         TrackPlayer.pause();
    //     }
    // }
    componentWillReceiveProps(next) {
        // alert(next)
        const { navigation } = this.props;

        const itemId = navigation.getParam('long', 'NO-ID');

        //alert('hello'+ itemId.lon)
        this.SendMessage('location', JSON.stringify(itemId));


    }

    render() {
        mContext = this;
        const currentTimeString = this.getAudioTimeString(this.state.playSeconds);
        const durationString = this.getAudioTimeString(this.state.duration);

        return (

            <View style={Style.chat_container}>
            
                <ScrollView ref="scrollView"
                    onContentSizeChange={(width, height) => this.refs.scrollView.scrollTo({ y: height })}>


                    {/* <Video url='http://techslides.com/demos/sample-videos/small.mp4' /> */}


                    {/* <Pdf
              source={source}
              style={styles.pdf}
            /> */}
                    {/* <Header
            centerComponent={{ text: 'Wanasa', style: { color: '#fff', fontSize: 20 } }}
        /> */}
                    {this.state.animatingupload &&
                        <ActivityIndicator
                            overlayColor="rgba(255,255,255,0.75)"
                            animating={this.state.animatingupload}
                            color='#1c77be'
                            size="large"
                            style={{
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                top: 0,
                                //  bottom: 10,
                                // alignItems: 'center',
                                // justifyContent: 'center',
                                // backgroundColor:'white',

                                zIndex: 22222
                            }}

                        />
                    }

                    {/* <Toast ref="toast"/> */}
                    {this.state.animated &&
                        <ActivityIndicator
                            animating={this.state.animated}
                            color='#bc2b78'
                            size="large"
                            style={{
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                top: 0,
                            }}
                        />
                    }
                    <View style={{ marginBottom: 100 }}>
                        {this.showListOrSpinner()}
                    </View>
                </ScrollView>

                <View style={{ flexDirection: 'column', position: 'absolute', bottom: 0, backgroundColor: '#F0F3F4' }}>
                    <View style={{ margin: 5, backgroundColor: 'white', borderRadius: 25 }}>


                        {/* <KeyboardAvoidingView behavior={behavior}> */}

                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ width: '90%', alignSelf: "flex-start" }}>
                                <TextInput
                                    //style={{height:'20%'}}
                                    style={Style.textBox}
                                    multiline
                                    onChangeText={this.handleChange('textMessage')}
                                    // ref={input => { this.textInput = input; } }
                                    value={this.state.textMessage}
                                    placeholder='type a message'
                                />
                            </View>

                            <View style={{ alignSelf: "flex-end" }}>
                                <TouchableOpacity
                                    // style={[styles.sendBtn, extraBtnStyle]}
                                    // disabled={this.state.disabled}
                                    onPress={() => this.SendMessage('text', this.state.textMessage)}
                                >
                                    <Image
                                        rounded
                                        style={{ height: 30, width: 30, marginBottom: 3 }}
                                        source={require(

                                            '../../Images/Group2.png',

                                        )}
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    // style={[styles.sendBtn, extraBtnStyle]}
                                    // disabled={this.state.disabled}
                                    onPress={() => this.handeldocument()}
                                >
                                    {/* <Text>hello</Text> */}
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* </KeyboardAvoidingView> */}
                    </View>

                    <View style={{
                        flexDirection: "row", paddingLeft: 7, paddingRight: 8, justifyContent: 'space-between'

                    }}>
                        <TouchableOpacity onPress={() => this.handleAddPicture()}>
                            <View>

                                <Image
                                    style={{ height: 35, width: 35, backgroundColor: ' #F0F3F4' }}
                                    source={require('../../Images/photo.png')} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.handleAudio()}>
                            <View>
                                {!this.state.startAudio ?
                                    <Image
                                        style={{ height: 35, width: 35, backgroundColor: '#F0F3F4' }}
                                        source={require('../../Images/mic.png')} /> :
                                    <Image
                                        style={{ height: 35, width: 35, backgroundColor: '#F0F3F4' }}
                                        source={require('../../Images/pause3.png')} />
                                }
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.handleMap()}>
                            <View>
                                <Image
                                    style={{ height: 35, width: 35, backgroundColor: '#F0F3F4' }}
                                    source={require('../../Images/placeholder.png')} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.handeldocument()}>
                            <View >
                                <Image
                                    style={{ height: 35, width: 35, backgroundColor: '#F0F3F4' }}
                                    source={require('../../Images/file.png')} />
                            </View>
                        </TouchableOpacity >
                        <TouchableOpacity onPress={() => this.handleShareBrag()}>
                            <View >
                                <Image
                                    style={{ height: 35, width: 35, backgroundColor: '#F0F3F4', marginBottom: 5 }}
                                    source={require('../../Images/lettersymbol.png')} />
                            </View>
                        </TouchableOpacity>
                        {/* <View >
                            <Image
                                style={{ height: 40, width: 40, backgroundColor: '#F0F3F4' }}
                                source={require('../../Images/mail.png')} />
                        </View> */}
                    </View>
                </View>
                <Modal style={Style.modalImage}
                    //   animationType="slide"
                    //   transparent={false}
                    visible={this.state.modalVisibledouble}>
                    <TouchableHighlight style={{ backgroundColor: 'black' }}

                        onPress={() => {
                            this.setModalVisibledouble(!this.state.modalVisibledouble);
                        }}>
                        <Image


                            source={require('../../Images/cross-out.png')}
                            style={{ tintColor: 'white', textAlign: 'right', marginLeft: 40, marginTop: 10, padding: 10 }}

                        />

                    </TouchableHighlight>
                    <ImageViewer imageUrls={this.state.images2} />
                </Modal>
                <Modal style={Style.modalImage}
                    //   animationType="slide"
                    //   transparent={false}
                    visible={this.state.modalVisible}>
                    <TouchableHighlight style={{ backgroundColor: 'black' }}

                        onPress={() => {
                            this.setModalVisible(!this.state.modalVisible);
                        }}>
                        <Image


                            source={require('../../Images/cross-out.png')}
                            style={{ tintColor: 'white', textAlign: 'right', marginLeft: 40, marginTop: 10, padding: 10 }}

                        />

                    </TouchableHighlight>
                    <ImageViewer imageUrls={this.state.images} />
                </Modal>
                <Modal

                    transparent={false}
                    visible={this.state.modalVisible2}>
                    <TouchableHighlight style={{ backgroundColor: 'black' }}

                        onPress={() => {
                            this.setModalVisible2(!this.state.modalVisible2);
                        }}>
                        <Image


                            source={require('../../Images/cross-out.png')}
                            style={{ tintColor: 'white', textAlign: 'right', marginLeft: 40, marginTop: 10, padding: 10 }}

                        />

                    </TouchableHighlight>
                    <VideoPlayer
                        source={{ uri: this.state.videopath }}
                        navigator='null'
                        endWithThumbnail={true}
                        thumbnail={require('../../Images/cross-out.png')}
                        fullScreenOnLongPress={false}


                        paused={true}
                    // videoWidth={300}
                    // videoHeight={300}
                    //style={{width:300,height:300}}
                    />
                    {/* <Text>{this.state.videopath}</Text>  */}

                </Modal>
                <Modal

                    transparent={false}
                    visible={this.state.modalVisible3}>
                    <TouchableHighlight style={{ backgroundColor: 'black' }}

                        onPress={() => {
                            this.setModalVisible3(!this.state.modalVisible3);
                        }}>
                        <Image


                            source={require('../../Images/cross-out.png')}
                            style={{ tintColor: 'white', textAlign: 'right', marginLeft: 40, marginTop: 10, padding: 10 }}

                        />

                    </TouchableHighlight>

                    {/* <Text>{this.state.audiourl}</Text>  */}


                    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'black' }}>
                        <Image source={img_speaker} style={{ width: 150, height: 150, marginBottom: 15, alignSelf: 'center' }} />

                        <ActivityIndicator
                            animating={this.state.animating}
                            color='#fff'
                            size="large"


                        />

                        <View style={{ flexDirection: 'row', justifyContent: 'center', marginVertical: 15 }}>
                            <TouchableOpacity onPress={this.jumpPrev15Seconds} style={{ justifyContent: 'center' }}>
                                <Image source={img_playjumpleft} style={{ width: 30, height: 30 }} />
                                <Text style={{ position: 'absolute', alignSelf: 'center', marginTop: 1, color: 'white', fontSize: 12 }}>15</Text>
                            </TouchableOpacity>
                            {this.state.playState == 'playing' &&
                                <TouchableOpacity onPress={this.pause} style={{ marginHorizontal: 20 }}>
                                    <Image source={img_pause} style={{ width: 30, height: 30 }} />
                                </TouchableOpacity>}
                            {this.state.playState == 'paused' &&
                                <TouchableOpacity onPress={this.play} style={{ marginHorizontal: 20 }}>
                                    <Image source={img_play} style={{ width: 30, height: 30 }} />
                                </TouchableOpacity>}
                            <TouchableOpacity onPress={this.jumpNext15Seconds} style={{ justifyContent: 'center' }}>
                                <Image source={img_playjumpright} style={{ width: 30, height: 30 }} />
                                <Text style={{ position: 'absolute', alignSelf: 'center', marginTop: 1, color: 'white', fontSize: 12 }}>15</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginVertical: 15, marginHorizontal: 15, flexDirection: 'row' }}>
                            <Text style={{ color: 'white', alignSelf: 'center' }}>{currentTimeString}</Text>
                            <Slider
                                onTouchStart={this.onSliderEditStart}
                                // onTouchMove={() => console.log('onTouchMove')}
                                onTouchEnd={this.onSliderEditEnd}
                                // onTouchEndCapture={() => console.log('onTouchEndCapture')}
                                // onTouchCancel={() => console.log('onTouchCancel')}
                                onValueChange={this.onSliderEditing}
                                value={this.state.playSeconds} maximumValue={this.state.duration} maximumTrackTintColor='gray' minimumTrackTintColor='white' thumbTintColor='white'
                                style={{ flex: 1, alignSelf: 'center', marginHorizontal: Platform.select({ ios: 5 }) }} />
                            <Text style={{ color: 'white', alignSelf: 'center' }}>{durationString}</Text>
                        </View>
                    </View>

                </Modal>

            {/* </SafeAreaView> */}
            </View>
        );
    }
}



const CustomHeader = ({ navigation }) => (
    <LinearGradient
        start={{ x: 0.6, y: 0 }} end={{ x: 2.5, y: 1.5 }}
        locations={[0.0, 0.4]}
        colors={['#1B75BC', '#9AD8DD']}
        style={{ paddingTop: Platform.OS === "ios" ? 30 : 20 }}
    >
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', padding: 5, }}>
            <TouchableOpacity onPress={() => navigation.goBack(null)} style={{ marginLeft: 10, alignSelf: 'center', backgroundColor: 'transparent' }} transparent>
                <Image source={Images.back} defaultSource={Images.back} />
            </TouchableOpacity>
            <View style={{ marginLeft: 10, backgroundColor: 'transparent' }} transparent>
                <Image style={Style.user_image} source={Images.ic_user_enable} />
            </View>
            <Text style={Style.other_user_name}>
                {mContext.state.currentuser}
                
            </Text>
        </View>
    </LinearGradient>
);