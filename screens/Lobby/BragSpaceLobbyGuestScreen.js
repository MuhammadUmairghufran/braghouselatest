import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Dimensions, TouchableOpacity, Image, StatusBar, Animated, Platform, FlatList, SafeAreaView, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Button, List } from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import * as String from '../../Constants/Strings/';
import * as Color from '../../Themes/Colors/';
import IMAGES from '../../Constants/Images/';
import AppStyles from '../../Themes/AppStyles';
import Style from './Style';
import Ripple from 'react-native-material-ripple';
import WSManager from '../../Networking/WSManager';
import * as URLConstants from '../../Networking/URLConstants';
import Carousel from 'react-native-snap-carousel';
import { NavigationActions } from 'react-navigation';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[AppStyles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

const items = [
  { name: 'TURQUOISE', code: '#1abc9c' }, { name: 'EMERALD', code: '#2ecc71' },
  { name: 'PETER RIVER', code: '#3498db' }, { name: 'AMETHYST', code: '#9b59b6' },
  { name: 'WET ASPHALT', code: '#34495e' }, { name: 'GREEN SEA', code: '#16a085' },
  { name: 'NEPHRITIS', code: '#27ae60' }, { name: 'BELIZE HOLE', code: '#2980b9' },
  { name: 'WISTERIA', code: '#8e44ad' }, { name: 'MIDNIGHT BLUE', code: '#2c3e50' },
  { name: 'SUN FLOWER', code: '#f1c40f' }, { name: 'CARROT', code: '#e67e22' },
  { name: 'ALIZARIN', code: '#e74c3c' }, { name: 'CLOUDS', code: '#ecf0f1' },
  { name: 'CONCRETE', code: '#95a5a6' }, { name: 'ORANGE', code: '#f39c12' },
  { name: 'PUMPKIN', code: '#d35400' }, { name: 'POMEGRANATE', code: '#c0392b' },
  { name: 'SILVER', code: '#bdc3c7' }, { name: 'ASBESTOS', code: '#7f8c8d' },
];

const CustomHeader = ({ navigation }) => (
  <LinearGradient
    start={{ x: 0.6, y: 0 }} end={{ x: 2.5, y: 1.5 }}
    locations={[0.0, 0.4]}
    colors={['#1B75BC', '#9AD8DD']}
    style={{ paddingTop: Platform.OS === "ios" ? 30 : 20 }}>

    <View style={{ flexDirection: 'row', padding: 15 }}>
      <View style={{ flex: 2, alignItems: 'flex-end', paddingRight: 15 }}>
        <Text style={AppStyles.header_title}>Brag Space</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.goBack} style={{ flex: 1, alignItems: "flex-end" }} transparent>
        <Text style={{ color: '#fff', fontSize: 16, fontFamily:'SourceSansPro-Bold', textAlign: 'center' }}>Done</Text>
      </TouchableOpacity>
    </View>
  </LinearGradient>
);
export default class BragSpaceLobbyGuestScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      activeBragsData: '',
      bragsArrayList: [],
      hotBragsData:'',
      hotBragsArrayList:[],
      optionArray: [
        { name: 'TURQUOISE', code: '#1abc9c' }, { name: 'EMERALD', code: '#2ecc71' },
        { name: 'PETER RIVER', code: '#3498db' }, { name: 'AMETHYST', code: '#9b59b6' },
        { name: 'WET ASPHALT', code: '#34495e' }, { name: 'GREEN SEA', code: '#16a085' },
        { name: 'NEPHRITIS', code: '#27ae60' }, { name: 'BELIZE HOLE', code: '#2980b9' },
        { name: 'WISTERIA', code: '#8e44ad' }, { name: 'MIDNIGHT BLUE', code: '#2c3e50' },
        { name: 'SUN FLOWER', code: '#f1c40f' }, { name: 'CARROT', code: '#e67e22' },
        { name: 'ALIZARIN', code: '#e74c3c' }, { name: 'CLOUDS', code: '#ecf0f1' },
        { name: 'CONCRETE', code: '#95a5a6' }, { name: 'ORANGE', code: '#f39c12' },
        { name: 'PUMPKIN', code: '#d35400' }, { name: 'POMEGRANATE', code: '#c0392b' },
        { name: 'SILVER', code: '#bdc3c7' }, { name: 'ASBESTOS', code: '#7f8c8d' },
      ]
    }
    this._carousel = {};
  }


  static navigationOptions = ({ navigation }) => {
    return {
      header: <CustomHeader this navigation={navigation} />
    };
  };

  componentDidMount() {
    this.callActiveBragsApi()
    this.callHotBragsApi()
  }

  callActiveBragsApi() {
    this.setState({ loading: true })
    const params = {
      offset: 0,
      limit: 10
    };

    WSManager.postData(URLConstants.GET_ACTIVE_BRAGS, params)
      .then(response => {
        this.setState({ loading: false })
        var data = response.data.data;
        this.setState({ activeBragsData: data })
        this.setState({ bragsArrayList: data.brags })
        console.log(data)

        console.log('ActiveBragsApi Success = ' + JSON.stringify(data));
      })
      .catch(error => {
        this.setState({ loading: false })

        console.log('Error = ' + JSON.stringify(error.response.data));
        return error;
      });
  }

  callHotBragsApi() {
    this.setState({ loading: true })
    const params = {
      offset: 0,
      limit: 10
    };

    WSManager.postData(URLConstants.GET_HOT_BRAGS, params)
      .then(response => {
        this.setState({ loading: false })
        var data = response.data.data;
        this.setState({ hotBragsData: data })
        this.setState({ hotBragsArrayList: data.brags })
        console.log(data)

        console.log('HotBragsApi Success = ' + JSON.stringify(data));
      })
      .catch(error => {
        this.setState({ loading: false })

        console.log('Error = ' + JSON.stringify(error.response.data));
        return error;
      });
  }


  goToLoginScreen() {
    const navigateAction = NavigationActions.navigate({
      routeName: 'SignUpLogin',
      params: {},
      action: NavigationActions.navigate({ routeName: 'SignUpLogin', params: {} })
    })
    const nav = WSManager.getTopLevelNavigator()
    nav.dispatch(navigateAction)
  }


  _renderActiveBragsRow = (rowData, sectionID, rowID) => {
    return (

      <View style={Style.active_brag_parent}>
        <TouchableOpacity onPress={() => this.goToLoginScreen()}>
          <View style={Style.header_inner_view}>
            <Image style={Style.active_brag_img} source={rowData.team_detail.flag} />
          </View>
        </TouchableOpacity>
        <View style={{ width: 100, justifyContent: 'center', alignItems: 'center', }}>
          <Text style={Style.brag_text}>{rowData.team_detail.team_name}</Text>
        </View>
      </View>

    )
  }

  _renderHotBragsRow = (rowData, sectionID, rowID) => {
    return (
      <View style={Style.active_brag_parent}>
        <TouchableOpacity onPress={() => this.goToLoginScreen()}>
          <View style={Style.header_inner_view_hot_brags}>
            <Image style={Style.hot_brag_img} source={IMAGES.active_brag_exmp} />
          </View>
        </TouchableOpacity >
        <Text style={Style.brag_text}>Kansas State</Text>
      </View>
    )
  }

  _renderMidBragsRow = ({ item, index }) => {
    return (
      <View style={{ marginLeft: 10 }}>
        <View >
          <Image style={{ height: 200, width: 330 }} source={IMAGES.braggers_exmp_img} />
        </View>
      </View>
    )
  }



  actionOnRow() {
    this.props.navigation.navigate('ConferenceTeam');
  }
  render() {

    return (
      <View style={[AppStyles.Wrapper, { backgroundColor: '#F1EFF1' }]}>
      
        <ScrollView style={AppStyles.Wrapper} showsVerticalScrollIndicator={false}>
          <MyStatusBar backgroundColor="rgba(0,0,0,0)" barStyle="light-content" />
          <View style={{ height: 205 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 15 }}>
              <Text style={{ fontSize: 16, color: '#1B75BC', fontFamily:'SourceSansPro-Bold'}} >Active Brags ({this.state.activeBragsData.count})</Text>
            </View>

            <List
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              dataArray={this.state.bragsArrayList}
              renderRow={(item, sectionID, rowID) => this._renderActiveBragsRow(item, sectionID, rowID)}>
            </List>

          </View>

          <View style={{ height: 200 }}>
            <Carousel
              ref={(c) => { this._carousel = c; }}
              data={this.state.optionArray}
              renderItem={this._renderMidBragsRow}
              sliderWidth={deviceWidth}
              itemWidth={330}
            />
          </View>



          <View style={{ height: 200 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 15 }}>
              <Text style={{ fontSize: 16, color: '#1B75BC', fontFamily:'SourceSansPro-Bold' }} >Hot Brags (48)
              </Text>
            </View>

            <List
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              dataArray={this.state.optionArray}
              renderRow={(item, sectionID, rowID) => this._renderHotBragsRow(item, sectionID, rowID)}>
            </List>
          </View>
        </ScrollView>
      {/* </SafeAreaView> */}
      </View>
    );
  }
}
