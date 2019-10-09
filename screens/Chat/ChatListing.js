import React, { Component } from 'react';
import { Text, View, TextInput, AsyncStorage, TouchableOpacity, Image, Platform, SafeAreaView, FlatList, Clipboard, Keyboard, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AppStyles, Images } from '../../Themes';
import Style from './ChatListStyle';
import Toaster from "../../Utils/Toaster";
import * as firebase from 'firebase';
//import firebase from 'firebase'
import FirebaseService from '../../firebase/FirebaseService';
import ConstantLib from '../../Constants/ConstantLib';
import { NavigationActions } from 'react-navigation';
import WSManager from '../../Networking/WSManager/';
import ChatScreen from './ChatScreen';
var currentUser = "";
var mContext = null;
export default class ChatListing extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            header: <CustomHeader this navigation={navigation} />
        };
    };

    constructor(props) {
        super(props)

        this.state = {
            refreshList: false,
            roomGUIDList: [],
            // roomList: [
            //     {
            //         'user_name': "Sheetal Bhatiya",
            //         'last_message': "Vineet: Was planning to meet you…",
            //         'time': '09:03 PM',
            //         'unread_message_count': 6,
            //         'uid': 'g3fNQ56KY4R3P0P80lmH6W9WkB02',
            //     },
            //     {
            //         'user_name': "Vishal Airtel",
            //         'last_message': "Vineet: Was planning to meet you…",
            //         'time': '09:00 PM',
            //         'unread_message_count': 2,
            //         'uid': 'BQ8GZCn3zGaqBysdLCHmpxX1gh42',
            //     },
            //     {
            //         'user_name': "Vishal Tata Docomo",
            //         'last_message': "Vineet: Was planning to meet you…",
            //         'time': '07:45 PM',
            //         'unread_message_count': 0,
            //         'uid': 'bF6yIeU34RaGxVasxd0Ouk09k4x1',
            //     },
            // ],
            roomList: [],
            brag: ''
        }
    }
    componentWillMount(){
        AsyncStorage.getItem('user', (err, result) => {

            this.setState({currentuser:result})


              }) 

    }
    componentDidMount() {
        this.subs = [
            this.props.navigation.addListener('willFocus', payload => {
                //console.debug('willFocusbrag', payload.action.params);
                if(typeof payload.action.params != 'undefined'){   
                    //console.debug('willFocus', payload.action.params.brag);
                    this.setState({
                        brag: payload.action.params.brag
                    })
                }
              }),
          
          ];

        mContext = this;
        // firebase.auth().onAuthStateChanged(function (user) {
        //     if (user) {
        //         currentUser = user;
        //     }

        //     mContext.doFirebaseLogin();
        // });

       
        var self = this;
        let arr1 = [];
        var types, msg, times, childKey, k = ''

      //  AsyncStorage.setItem('user', JSON.stringify(parseInt('5702621399')));

        let dbRef = firebase.database().ref('users/');


        dbRef.once('value', function (snapshot) {

            console.log(snapshot.val())
            let data = snapshot.val();
            let items1 = Object.values(data);



            //  alert('temp'+JSON.stringify(newFilewew2))
            // alert('ppp'+self.state.test)



            //    const newFilewew2 =  items1.map((DataPopitoi3, index) => {


            //    firebase.database().ref('messages/').child(result).child(DataPopitoi3.phone).limitToLast(1).on('child_added', (value,i) => {
            //     msg =value.val().message;
            //     times=value.val().time;
            //     types=value.val().type;
            //    // alert(times)
            //     AsyncStorage.setItem('message1_'+DataPopitoi3.phone,msg) 
            //     AsyncStorage.setItem('message2_'+DataPopitoi3.phone,times)
            //     AsyncStorage.setItem('message3_'+DataPopitoi3.phone,types)
            //   })  

            //   setTimeout(function(){ AsyncStorage.getItem('message1_'+DataPopitoi3.phone,(err,result1)=>{
            //          // alert('result1'+result1)
            //     DataPopitoi3['last_message']=result1;

            //   }) }, 200);

            //    AsyncStorage.getItem('message2_'+DataPopitoi3.phone,(err,result2)=>{
            //      //alert('result'+result2)
            //     DataPopitoi3['time']=result2;

            //   })
            //   AsyncStorage.getItem('message3_'+DataPopitoi3.phone,(err,result3)=>{

            //       // alert('type'+result3)
            //      DataPopitoi3['type']=result3;


            //   }) 



            //             //alert('msg'+self.displayValue)

            //          return {...DataPopitoi3};
            //               }); 
            //  alert('hello'+JSON.stringify(newFilewew2))

            self.setState({ roomList: items1 });
            self.arrayholder = items1;

            self.setState({ animating: false })
        })
        //  });  

    }

    componentWillUnmount() {
        // Remove the event listener
       // this.focusListener.remove();
      }
    
    doFirebaseLogin = () => {

        if (currentUser != null && currentUser != "") {
            this.proceedAfterFirebaseLogin(currentUser);
        } else {
            firebase.auth().createUserWithEmailAndPassword(ConstantLib.EMAIL, ConstantLib.EMAIL)
                .then((user) => {
                    this.proceedAfterFirebaseLogin(user.user);
                })
                .catch((error) => {
                    const { code, message } = error;
                    if (code == "auth/email-already-in-use") {

                        firebase.auth().signInWithEmailAndPassword(ConstantLib.EMAIL, ConstantLib.EMAIL)
                            .then((user) => {
                                this.proceedAfterFirebaseLogin(user.user);
                            })
                            .catch((error) => {
                                const { code, message } = error;
                                alert("code1==" + code + ", error==" + message);
                            });
                    }
                    else {
                        alert("code2==" + code + ", error==" + message);
                    }
                });
        }
    }

    proceedAfterFirebaseLogin = (user) => {
        currentUser = user;

        this.addUserToFirebase();
        this.getRoomList();
    }

    addUserToFirebase() {

        let user = {
            id: ConstantLib.USER_ID,
            email: ConstantLib.EMAIL,
            name: ConstantLib.FIRST_NAME + " " + ConstantLib.LAST_NAME,
            rooms: [],
        }

        FirebaseService.database()
            .ref('users/' + currentUser.uid)
            .once('value', (snapshot) => {
                if (JSON.stringify(snapshot) == null || JSON.stringify(snapshot) == "null") {
                    FirebaseService.database()
                        .ref('users/' + currentUser.uid)
                        .push()
                        .set(user, (error) => {
                            if (error) {
                                console.log("Error", error);
                            } else {
                                console.log("Success", user);
                            }
                        })
                }
                else {
                    snapshot.forEach(function (data) {
                        snapshot.ref.child(data.key).set(data.val());
                    });
                }

            }, (errorObject) => {
                console.log("Error", errorObject);
            })

    }

    getRoomList = () => {

        FirebaseService.database()
            .ref('users/' + currentUser.uid)
            .on('value', (snapshot) => {
                snapshot.forEach(function (data) {
                    if (data.val().rooms != undefined) {
                        mContext.setState({ roomGUIDList: data.val().rooms })
                        mContext.updateRoomsData(data.val().rooms);
                    }
                    // else {
                    //     mContext.setState({ roomGUIDList: [], roomList: [] })
                    //     mContext.updateRoomsData([]);
                    // }

                });


            }, (errorObject) => {
                alert("4==" + JSON.stringify(errorObject))
            })
    }

    updateRoomsData(roomGUIDList) {

        for (let i = 0; i < roomGUIDList.length; i++) {

            let room = {
                id: currentUser.uid,
                name: ConstantLib.FIRST_NAME + " " + ConstantLib.LAST_NAME,
                isOnline: false,
                device_token: "123456",
            }

            FirebaseService.database()
                .ref('room-users/' + roomGUIDList[i] + "/" + currentUser.uid)
                .once('value', (snapshot) => {

                    if (JSON.stringify(snapshot) != "null") {
                        snapshot.forEach(function (data) {
                            snapshot.ref.child(data.key).set(room);
                        });
                    }
                    else {
                        FirebaseService.database()
                            .ref('room-users/' + roomGUIDList[i] + "/" + currentUser.uid)
                            .push()
                            .set(room, (error) => {

                            })
                    }

                }, (errorObject) => {
                    console.log("Error", errorObject);
                })

        }
    }

    openChat = (item) => {
        // alert('item'+item)
        //    AsyncStorage.setItem('')
        AsyncStorage.setItem('userchat', item);
        // alert('name'+name)
        //this.setState({phone:item})
  

        const navigateAction = NavigationActions.navigate({
            routeName: 'ChatScreen',
            params: {'brag':this.state.brag, 'userchat': item},
            action: NavigationActions.navigate({ routeName: 'ChatScreen' })
          })
          const nav = WSManager.getTopLevelNavigator()
          nav.dispatch(navigateAction)

        // }

        //  this.props.navigation.navigate('ChatScreen');

        // let { roomList } = this.state;
        //  roomList[item.index].unread_message_count = 0
        // this.setState({ roomList: roomList, refreshList: !this.state.refreshList })


        //  ConstantLib.DATA = rowData;
        // this.props.navigation.navigate('ChatScreen')
        //    const navigateAction = NavigationActions.navigate({
        //      routeName: 'ChatScreen',
        //      params: {phone:item},
        //      action: NavigationActions.navigate({ routeName: 'ChatScreen' })
        //    })
        //    const nav = WSManager.getTopLevelNavigator()
        //    nav.dispatch(navigateAction)


    }

    openUsersScreen(navigate) {
        alert("123")
    }

    render() {
        mContext = this;
console.log('dfdf'+this.state.roomList)

        return (
            <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            {this.state.currentuser &&
                <FlatList
                    data={this.state.roomList}
                    refreshList={this.state.refreshList}
                    keyExtractor={item => item}
                    ref={(ref) => this.flatListRef = ref}
                    renderItem={(item, index) =>
                        item.item.phone!=this.state.currentuser &&
                        <TouchableOpacity onPress={() => this.openChat(item.item.phone)} style={Style.list_item}>
                            <Image style={Style.user_image} source={Images.ic_user_enable} />

                            <View style={Style.user_data}>
                                <View style={Style.left_item}>
                                    <Text style={Style.user_name}>{item.item.name}</Text>
                                    <Text style={Style.user_name}>{item.item.phone}</Text>
                                    <Text numberOfLines={1} style={Style.last_message}>{item.item.last_message}</Text>
                                </View>

                                <View style={Style.right_item}>
                                    <Text style={item.item.unread_message_count > 0 ? Style.date_time_active : Style.date_time}>
                                        {/* {item.item.time} */}
                                        23232
                                    </Text>
                                    {
                                        item.item.unread_message_count > 0 ?
                                            <View style={Style.message_count}>
                                                <Text style={Style.message_count_text}>
                                                    {/* {item.item.unread_message_count} */}
                                                </Text>
                                            </View>
                                            :
                                            <View />
                                    }
                                </View>
                            </View>
                        </TouchableOpacity>
                        }
                />
            }
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
        <View style={{ flexDirection: 'row', padding: 15, alignItems: 'center' }}>
            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'transparent' }}>
                <View style={{ alignItems: 'center', marginLeft: 0 }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={AppStyles.header_title}>Chat List</Text>
                    </View>
                </View>
            </View>
            <TouchableOpacity onPress={() => navigation.goBack(ChatScreen)} style={{ position: "absolute", marginLeft: 15, backgroundColor: 'transparent' }} transparent>
                <Image source={Images.back} defaultSource={Images.back} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => mContext.openUsersScreen(navigation)} style={{ position: "absolute", right: 15, marginLeft: 15, backgroundColor: 'transparent' }} transparent>
                <Image source={Images.back} defaultSource={Images.back} />
            </TouchableOpacity>
        </View>
    </LinearGradient>
);
