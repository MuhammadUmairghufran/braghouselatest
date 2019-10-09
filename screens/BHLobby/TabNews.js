import React, { Component } from 'react';
import { StyleProvider, Icon, Title, Subtitle, List } from 'native-base';
import { StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, ScrollView, ImageBackground, FlatList, Dimensions, Platform, ActivityIndicator, Animated, StatusBar, TouchableOpacity } from 'react-native';
import { AppStyles} from '../../Themes'
import IMAGES from '../../Constants/Images';
import  * as Colors from '../../Constants/Colors';
import Utility from '../../Utils/Utility/';
import Loader from '../../Utils/Loader/';
import WSManager from '../../Networking/WSManager/';
import * as URLConstants from '../../Networking/URLConstants';
import ConstantLib from '../../Constants/ConstantLib';
import {NavigationActions} from 'react-navigation'

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[AppStyles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);


export default class TabNews extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newsList: [],
      loading:false,
    }
  }
  static navigationOptions = {
    header: null
  };
componentDidMount()
{
  this.getNews();
}
goToDetail(item) {

ConstantLib.DATA=item;
  const navigateAction = NavigationActions.navigate({
    routeName: 'NewsDetail',
  })
  const nav = WSManager.getTopLevelNavigator()
  nav.dispatch(navigateAction)
}

    getNews(){
          this.setState({loading: false})
          const params = {
          };
           WSManager.postData(URLConstants.GET_NEWS, params)
          .then(response => {
            this.setState({loading: false})
            var data = response.data.data.channel.item;
            if(data.length>0){
               this.setState({newsList:data});
            }
            else{
              this.setState({newsList:[]});
            }
          })
          .catch(error => {
            this.setState({loading: false})
            console.log(JSON.stringify(error));
            Toaster.showLongToast(error.message);
            return error;
          });
        }

  render() {
    return (
      <View style={[AppStyles.darkContainer, { overflow: 'visible' }]}>
        <MyStatusBar backgroundColor="rgba(0,0,0,0)" barStyle="light-content" />
        <Loader loading={this.state.loading} />
        <FlatList
          data={this.state.newsList}
          renderItem={({ item }) =>
          <TouchableOpacity onPress={() => { this.goToDetail(item) }}>
          <View style={NewsStyle.list_item_container}>
          <View style={NewsStyle.image_parent_view}>
            <Image style={NewsStyle.row_image_style} source={item.FLMInfo.thumb.length>5?{uri:item.FLMInfo.thumb}:IMAGES.app_icon} />
          </View>
            <View style={NewsStyle.news_text_parent}>
              <Text style={NewsStyle.heading_text}>{item.title}</Text>
              <Text numberOfLines = {2} lineBreakMode style={NewsStyle.description_text}>{item.description}</Text>
              <Text style={NewsStyle.date_text}>{Utility.getFormatedDate(item.pubDate, 'ddd, MMM Do - hh:mm A')}</Text>
            </View>
          </View>
          </TouchableOpacity>
          }
        />


      </View>


    );
  }
}

const NewsStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eaeaea',
  },
  list_item_container: {
    backgroundColor: '#fff',
    minHeight: 90,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
    borderRadius: 3,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    flexDirection: 'row',
    overflow:'hidden'
  },
  row_image_style: {
    height: 60,
    width: 60,
  },
  image_parent_view: {
    borderRadius: 3,
    alignSelf: 'center',
    overflow: 'hidden',
    marginLeft: 10,
    borderWidth: 0,
    borderColor:Colors.LableTextColor

  },
  news_text_parent: {
    backgroundColor: '#fff',
    marginLeft: 8,
    paddingRight: 6,
    flex: 1
  },
  heading_text: {
    fontSize: 16,
    color: '#333333',
    fontFamily:'SourceSansPro-Bold',
    marginTop: 10,
    flexWrap: 'wrap',
  },
  description_text: {
    fontSize: 12,
    color: '#666666',
    marginTop: 7,
    flexWrap: 'wrap',
    fontFamily:'SourceSansPro-Regular'
  },
  date_text: {
    fontSize: 10,
    color: '#666666',
    marginTop: 4,
    paddingBottom:4,
    fontFamily:'SourceSansPro-Regular'
  },

})
