import React, {Component} from 'react';
import { View, Text,Image,ImageBackground,TouchableOpacity, Platform, FlatList,RefreshControl,StatusBar} from 'react-native';
import {List} from 'native-base';
import Ripple from 'react-native-material-ripple';

import IMAGES  from '../../Constants/Images/';
import * as String  from '../../Constants/Strings/';
import * as Color  from '../../Themes/Colors/';
import AppStyles from '../../Themes/AppStyles';
import Utility from '../../Utils/Utility/';
import Toaster from '../../Utils/Toaster/';
import WSManager from '../../Networking/WSManager/';
import { Container, Header, Content, Label,Input,ActionSheet} from 'native-base';
import * as URLConstants from '../../Networking/URLConstants/';
import ConstantLib from '../../Constants/ConstantLib';
import Loader from '../../Utils/Loader/';
import LinearGradient from 'react-native-linear-gradient';
import CommentsStyle from './CommentsStyle';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[AppStyles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);
export default class CommentMedia extends Component{

  constructor(props){
    super(props)
    this.state={
     imagesPath:'',
    }
  }

  static navigationOptions = ({navigation}) => {
    return {
      header:null
    };
  };


componentDidMount() {

  setTimeout (() => {
    var imagesPath = this.props.navigation.getParam('imagesPath', '');
    this.setState({ imagesPath: imagesPath })
    }, 200);
    }

  render () {
    mContext = this;
    return (

         <View style={{ width: '100%', height: '100%', backgroundColor:'#000000' }}>
<MyStatusBar backgroundColor='transparent' barStyle="light-content" />
<ReactNativeZoomableView
   maxZoom={1.5}
   minZoom={0.5}
   zoomStep={0.5}
   initialZoom={1}
   bindToBorders={true}
   onZoomAfter={this.logOutZoomState}
   style={{
      padding: 10,
      backgroundColor: 'black',
   }}
>
             <Image style={{ width: '100%', height: '100%' }} resizeMode='contain' source={{ uri: this.state.imagesPath}}></Image>
             </ReactNativeZoomableView>
             <TouchableOpacity onPress={() => this.props.navigation.goBack(null)} style={{ marginTop:30,position: "absolute", right: 0, top: 0, padding: 10, borderBottomLeftRadius: 25, backgroundColor: '#FFFFFF60' }}>
               <Image  source={IMAGES.close} />
             </TouchableOpacity>
             </View>

    );
  }


}
