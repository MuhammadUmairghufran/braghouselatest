import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, StatusBar, Animated, Platform, FlatList, SafeAreaView, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Button, List } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import * as String from '../../Constants/Strings/';
import * as Colors from '../../Constants/Colors/';
import IMAGES from '../../Constants/Images/';
import AppStyles from '../../Themes/AppStyles';
import Style from './Style';
import Ripple from 'react-native-material-ripple';

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[AppStyles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);


const CustomHeader = ({ navigation }) => (
  <LinearGradient
    start={{ x: 0.6, y: 0 }} end={{ x: 2.5, y: 1.5 }}
    locations={[0.0, 0.4]}
    colors={['#1B75BC', '#9AD8DD']}
    style={{ paddingTop: Platform.OS === "ios" ? 30 : 20 }}>

    <View style={{ flexDirection: 'row', padding: 15 }}>
      <View style={{ flex: 2, alignItems: 'flex-end', paddingRight: 15 }}>
        <Text style={AppStyles.header_title}>Share Brag</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.goBack} style={{ flex: 1, alignItems: "flex-end" }} transparent>
        <Text style={{ color: '#fff', fontSize: 16, fontFamily:'SourceSansPro-Bold', textAlign: 'center' }}>Done</Text>
      </TouchableOpacity>
    </View>
  </LinearGradient>
);
export default class ShareBragScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {

    }
  }


  static navigationOptions = ({ navigation }) => {
    return {
      header: <CustomHeader this navigation={navigation} />
    };
  };

  render() {

    return (
      <View style={[Style.Wrapper]}>
        <ScrollView style={Style.Wrapper}
          showsVerticalScrollIndicator={false}>
          <MyStatusBar backgroundColor="rgba(0,0,0,0)" barStyle="light-content" />
          <View style={Style.top_view}>
            <View>
              <View style={{ flexDirection: 'row', flex: 1 }}>
                <Image style={{ height: 100, paddingLeft: 15, paddingRight: 10, }} source={IMAGES.ic_doodles} />
                <View style={{ flex: 1, marginLeft: 20, marginRight: 30, alignSelf: 'center' }}>
                  {/* <Text style={Style.refer_friend_text}>For every friend that plays you get <Text style={Style.brag_count_text}>20Brags</Text> </Text> */}
                  <Text style={Style.refer_friend_text}>Refer a Friend for a Chance to Win Special Prizes</Text>
                  
                </View>
              </View>
              <View style={Style.seperator_style}></View>
            </View>

            <View style={Style.mid_container}>
              <View style={Style.left_container}>
                <Image style={Style.team_flag} source={IMAGES.ic_share_grey} />
                <View style={Style.team_text}>
                  <Text style={Style.brag_description_text}>Weekend Special</Text>
                  <Text style={Style.brag_team_name_text}>ARS v AFC</Text>
                  <Text style={Style.brag_more_match_text}>+5 More Matches</Text>
                </View>
                <Image style={Style.team_flag} source={IMAGES.ic_share_grey} />
              </View>
              <View style={Style.right_container}>
                <Image source={IMAGES.img_blue_ribbon} />
                <Text style={{ marginTop: 10 }}>Nov 24, Sat -07:30 pm</Text>
              </View>
            </View>
          </View>

          <View style={Style.invite_view}>
            <Text style={Style.invite_text}>Invite Your Friends Using </Text>
            <View style={Style.invite_inner_items}>
              <View>
                <Ripple style={Style.share_icons_view}>
                  <Image style={Style.icons_style} source={IMAGES.ic_link_blue} />
                </Ripple>
                <Text style={Style.link_lable_text}>Facebook</Text>
              </View>

              <View>
                <Ripple style={Style.share_icons_view}>
                  <Image style={Style.icons_style} source={IMAGES.ic_facebook} />
                </Ripple>
                <Text style={Style.link_lable_text}>Facebook</Text>
              </View>

              <View>
                <Ripple style={Style.share_icons_view}>
                  <Image style={Style.icons_style} source={IMAGES.ic_whatsapp} />
                </Ripple>
                <Text style={Style.link_lable_text}>Facebook</Text>
              </View>

              <View>
                <Ripple style={Style.share_icons_view}>
                  <Image style={Style.icons_style} source={IMAGES.ic_email_blue} />
                </Ripple>
                <Text style={Style.link_lable_text}>Facebook</Text>
              </View>

            </View>
          </View>


        </ScrollView>
      </View>
    );
  }
}
