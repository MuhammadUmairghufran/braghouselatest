import React, { Component } from 'react';
import {Card, CardItem, Body, Button, Right, Left, Separator } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import Moment from 'react-moment';
import {TouchableOpacity, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, ScrollView, ImageBackground, FlatList, Dimensions, Platform, ActivityIndicator} from 'react-native';
import {Colors, Fonts, Metrics, ApplicationStyles, Images} from '../Themes/';
import listData from '../listdata.json';
import Carousel from 'react-native-snap-carousel';
import Modal from "react-native-modal";
import {clearItem} from '../lib/Session';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    }
    this._carousel = {};
    this.init(); 
    this.onLayout = this.onLayout.bind(this)
  }

  init(){
    this.state = {
      featuredContestList :[],
      collection_list :[],
      league_list :[],
      videos: [
        {
          id: "WpIAc9by5iU",
          title: "First"
        }, {
          id: "sNPnbI1arSE",
          title: "Second"
        }, {
          id: "VOgFZfRVaww",
          title: "Third"
        }
      ],
      isModalVisible: false,
      showhideFilter: false,
      isLoading:false,
      HeaderTemp:{}
    };
  }

  ins1000Sep = (val) => {
  val = val.split(".");
  val[0] = val[0].split("").reverse().join("");
  val[0] = val[0].replace(/(\d{3})/g,"$1,");
  val[0] = val[0].split("").reverse().join("");
  val[0] = val[0].indexOf(",")==0?val[0].substring(1):val[0];
  return val.join(".");
}

formatNum = (val) => {
  val = Math.round(val*100)/100;
  val = (""+val).indexOf(".")>-1 ? val + "00" : val + ".00";
  var dec = val.indexOf(".");
  var a = dec == val.length-3 || dec == 0 ? val : val.substring(0,dec+3);
  if(a.split(".")[1]=='00') a = a.split(".")[0];
  return a;
}

  randomColor = (key) => {
    let colorHeader = [
      '#204A8B',
      '#8C2536',
      '#037488'
    ];

    if(this.state.HeaderTemp[key]){ 
      return this.state.HeaderTemp[key];
    };
    let color = colorHeader[Math.floor(Math.random() * colorHeader.length)];
    this.state.HeaderTemp[key] = color;
    return color;
  }

  async componentDidMount(){
    this.setState({
      isLoading:true
    });
    fetch('http://vfantasy.vinfotech.org/fantasy/lobby/get_lobby_master_data',{
      body: JSON.stringify({sports_id:7}),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    })
    .then(function(response){
      var contentType = response.headers.get('content-type');
      if(contentType && contentType.includes('application/json')) {
       return response.json();
      }
      // throw new TypeError('Oops, we haven't got JSON!');
    })
    .then((responseJson) => {
      this.setState({
        collection_list:responseJson.data.collection_list,
        featuredContestList:responseJson.data.featured_contest_list,
        league_list:responseJson.data.league_list
      })
      this.setState({
        isLoading:false
      });
    })
    .catch((error) =>{
      this.setState({
        isLoading:false
      });
    });
  }

  handleSnapToItem(index){
  }

  _renderItem = ( {item, index} ) => {
    // console.log("rendering,", index, item)
    return (
        <View style={{
            width: '100%', 
            backgroundColor: '#ffffff', 
            flexDirection: 'row',
            borderRadius: 10,
            height:90, 
            flexWrap: 'wrap',
            shadowColor:"#000000", 
            shadowOffset:{width:0, height:0},
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 3,
            overflow: 'hidden',
          }}>

          <TouchableOpacity
             style={[styles.vmiddile, {paddingLeft: 4}]} 
             onPress={ () => { 
                console.log("clicked to index", index)
                this._carousel.snapToItem(index);
              }}
          >
            <Image source={ Images.character }/>
          </TouchableOpacity>

          <View style={{paddingRight: 0, paddingLeft: 5, width:136, alignItems: 'flex-start' , justifyContent:'center'}}>
            <View>
              <Text style={{fontSize: 12, color: '#333333', fontFamily:'SourceSansPro-Regular'}}>{item.collection_name}</Text>
            </View>
            <View>
              {(item.prize_type==0 || item.prize_type==1)&&<Text style={{color:'#00DEA2', fontSize: 20, fontFamily:'SourceSansPro-Regular'}}>{item.prize_pool != 0 ?'₹'+this.ins1000Sep(this.formatNum(item.prize_pool)):'WIN PRIZES prize'}</Text>}
              {(item.prize_type==2 || item.prize_type==3)&&<Text style={{color:'#00DEA2',  fontSize: 20, fontFamily:'SourceSansPro-Regular'}}>prize {item.prize_pool==0?'WIN PRIZES':item.prize_pool+' Coins'}</Text>}
            </View>
            <Text style={{fontSize: 12, color: '#333', fontFamily:'SourceSansPro-Regular'}}>
              {item.contest_name}
            </Text>
          </View>
          <View style={{position:'relative', alignItems: 'flex-end', justifyContent: 'center', width: 94, borderRadius: 10, paddingLeft: 10, paddingRight: 5}}>
              <View style={{position: 'absolute', top:0, left: 0,  width: '100%', height: '100%', borderRadius: 10, overflow: 'hidden' }}>
                <Image source={Images.rectangle} style={{flex: 1, justifyContent: 'center', height: 90, borderRadius: 10  }}/>
              </View>
              <View>
                <Text style={{fontSize: 12, color: '#333', textAlign:'right', fontFamily:'SourceSansPro-Regular'}}>
                  <Moment element={Text} format="MMM DD">
                    {item.season_scheduled_date}
                  </Moment>,
                </Text>
              </View>
              <View style={{flexDirection:'row'}}>
                <Text style={{fontSize: 12, color: '#333', flex: 1, flexWrap: 'wrap', textAlign:'right', fontFamily:'SourceSansPro-Regular'}}>
                  <Moment element={Text} format="ddd hh:mm a">
                    {item.season_scheduled_date}
                  </Moment>
                </Text>
              </View>
              <View>
                {item.entry_fee>0 && <Text style={{fontSize: 14,  color: '#EC8A0F', textAlign:'right', marginTop: 5, fontFamily:'SourceSansPro-Regular'}}>₹{item.entry_fee} JOIN</Text>}
                {item.entry_fee==0 && <Text style={{fontSize: 14,  color: '#EC8A0F', textAlign:'right', marginTop: 5, fontFamily:'SourceSansPro-Regular'}}>JOIN FREE</Text>}
              </View>              
          </View>
        </View>
    );
  }

  static navigationOptions = {
    header: null
  };

  scrollBegin = () => {
    this.setState({
      showhideFilter: true
    })
  }

  isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    paddingToBottom = 20;
    return layoutMeasurement.height - contentOffset.y >=
      contentSize.height + paddingToBottom;
  };

  componentWillMount(){
    let {width} = Dimensions.get('window');
    this.setState({
      dimensions: {width}
    })
  }

  onLayout = event => {
    let {width} = event.nativeEvent.layout
    this.setState({dimensions: {width}})
  }

  logout = () => {
    clearItem();
    this.props.navigation.navigate('Login');
  }

  _toggleModal = () =>
    this.setState({ isModalVisible: !this.state.isModalVisible })
    render() {  
      const toUpperCaseFilter = (d) => {
            return d.toUpperCase();
        };
    let {width} = this.state.dimensions;     
    let slidewidth = width;
    let FinalWidth= slidewidth - 40;
    return (
      <View style={styles.containerbg} onLayout={this.onLayout}> 
          <ImageBackground source={Images.bglobby} style={styles.bglobby}> 
          {this.state.isLoading && <ActivityIndicator size="large" color="#EC8A0F" style={{justifyContent: 'center', alignItems: 'center', height: '100%'}} />}
          <ScrollView
            contentContainerStyle={{flexGrow : 1, justifyContent : 'flex-end'}}
              onScrollBeginDrag={this.scrollBegin}
              onScroll={({nativeEvent}) => {
                if (this.isCloseToBottom(nativeEvent)) {
                }
              }}
              scrollEventThrottle={400}
            >
          <View style={{paddingTop: 50, width: '100%'}}>
            <Carousel
              layout={'default'}
              ref={ (c) => { this._carousel = c; } }
              data={this.state.featuredContestList}
              renderItem={this._renderItem.bind(this)}
              onSnapToItem={this.handleSnapToItem.bind(this)}
              sliderWidth={slidewidth}
              itemWidth={FinalWidth}
              firstItem={0}
            />
          </View>  
            
              <View style={[styles.cardContainer]}>
              {this.state.collection_list.map((prop, key) => {
         return (
                  <Card style={{
                    borderTopWidth:0, 
                    borderLeftWidth:0, 
                    borderBottomWidth:0, 
                    borderRightWidth:0,
                    borderRadius:8,
                    position:'relative',
                    marginBottom: 10
                    }}>
                    { Platform.OS === 'android' && <Col style={{height: 64, width: 64, position:'absolute', top:50, left: 15}}>
                       <View style={styles.teamLogo}>
                         <Image source={Images.hyderabad}/>
                       </View>
                    </Col> }
                    { Platform.OS === 'android' && <Col style={{height: 64, width: 64, position:'absolute', top:50, right: 15}}>
                      <View style={styles.teamLogo}>
                        <Image source={Images.kolkata}/>
                      </View>
                    </Col>}
                    <CardItem header style={{
                      backgroundColor:this.randomColor(key), 
                      borderRadius:0,
                      borderTopLeftRadius:8, 
                      borderTopRightRadius:8,
                      height:60,
                      overflow: 'hidden' ,
                      position: 'relative' 
                      }}>
                      <View style={{position: 'absolute', top:0, left: 0, width: 500, height: 60, alignSelf: 'stretch', justifyContent: 'center'}}>
                        <Image source={Images.overlay} style={{borderRadius:0,borderTopLeftRadius:8, borderTopRightRadius:8, width: '100%', height: '100%',}}/>
                      </View>
                      <Body>
                      <Grid>
                        <Col style={{width: '80%', alignItems: 'flex-start', justifyContent: 'center'}}>
                          { prop.match_list.length>1 &&  <Text style={{ color: "#ffffff", fontSize:14, fontFamily:'SourceSansPro-Regular' }}>
                                                      {prop.collection_name.toUpperCase()}
                                                    </Text>}
                          <Text style={{ color: "#ffffff", fontSize:10,  justifyContent: 'center', fontFamily:'SourceSansPro-Regular' }}>{prop.league_name}</Text>
                        </Col>  
                          <Right>
                            <TouchableOpacity style={{padding: 15}}>
                                <Image source={Images.share}/>
                            </TouchableOpacity>
                          </Right>
                          </Grid>
                      </Body>
                    </CardItem>

                    <CardItem>
                      <Body>
                        <Grid>
                          { Platform.OS === 'ios' && <Col style={{ height: 64, width: 64, marginTop: -20}}>
                                                      <View style={styles.teamLogo}>
                                                        <Image source={Images.hyderabad}/>
                                                      </View>
                                                    </Col>}
                          <Col style={{alignItems:'center'}}>
                            <Text style={{fontSize: 16, color: '#333333'}}>
                              {prop.match_list[0].home} <Text style={{
                                color: 'red', 
                                fontSize: 12,
                                fontFamily:'SourceSansPro-Regular'
                                }}>
                                 v 
                                </Text> {prop.match_list[0].away} </Text>
                              {prop.match_list.length>1 && <View style={{marginBottom:5}}>
                                                              <Text style={{color: '#9B9B9B', fontSize: 10, fontFamily:'SourceSansPro-Bold'}}>
                                                                +{prop.match_list.length} MORE MATCHES
                                                              </Text>
                                                            </View>}
                              <Text style={{fontSize: 24, color:'#CDCDCD', fontFamily:'SourceSansPro-Regular'}}>
                              {'Win'.toUpperCase()} <Text style={{fontSize: 24, color: '#00DEA2', fontFamily:'SourceSansPro-Regular'}}>₹10,000</Text> 
                              </Text>
                          </Col> 
                          {Platform.OS === 'ios' && <Col style={{ height: 64, width: 64, marginTop: -20}}>
                                                      <View style={styles.teamLogo}>
                                                        <Image source={Images.kolkata}/>
                                                      </View>
                                                    </Col>}
                        </Grid>
                      </Body>
                    </CardItem> 
                    <CardItem footer style={{
                        borderTopWidth: 1, 
                        borderTopColor: "#f0f0f0",
                        borderRadius:0,
                        borderBottomLeftRadius:8, 
                        borderBottomRightRadius:8
                      }}>
                      <Grid>
                        <Col>
                          <Text style={{color: '#9B9B9B', fontSize:10, fontFamily:'SourceSansPro-Regular' }}>
                            <Moment filter={toUpperCaseFilter} element={Text} format="dddd, MMM DD">
                              {prop.season_scheduled_date}
                            </Moment>
                          </Text>
                          <View style={{flexDirection: 'row'}}>
                            <Image source={Images.clock} style={{marginRight: 2}}/>
                            <Text style={{color: '#333333', fontSize:12, fontFamily:'SourceSansPro-Regular'}}>  
                              <Moment element={Text} format="h:mm A">
                                {prop.season_scheduled_date}
                              </Moment>
                              <Text style={{color: '#9B9B9B', fontSize:10, fontFamily:'SourceSansPro-Bold'}}>{' ist'.toUpperCase()}</Text>
                            </Text>
                          </View>
                        </Col>
                        <Right>
                          <Button transparent warning small>
                            <Text style={{color: '#EC8A0F',  fontSize:12, fontFamily:'SourceSansPro-Regular'}}>{'Start Playing!'.toUpperCase()}</Text>
                          </Button>
                        </Right>
                      </Grid>
                    </CardItem>
                  </Card>
                  );
              })}
              </View>

            {!this.state.isLoading && <View style={{backgroundColor: '#151728'}}>
                          <View style={{borderBottomWidth: 0.5, borderBottomColor: '#4a4a4a', paddingVertical: 8}}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                              <Button transparent style={{paddingHorizontal: 17}}><Text style={{color: '#999999',  fontFamily:'SourceSansPro-Bold', fontSize: 12,}}>HOME</Text></Button>
                              <Button transparent style={{paddingHorizontal: 17}}><Text style={{color: '#999999',  fontFamily:'SourceSansPro-Bold', fontSize: 12,}}>ABOUT</Text></Button>
                              <Button transparent style={{paddingHorizontal: 17}}><Text style={{color: '#999999',  fontFamily:'SourceSansPro-Bold', fontSize: 12,}}>HOW TO PLAY</Text></Button>
                              <Button transparent style={{paddingHorizontal: 17}}><Text style={{color: '#999999',  fontFamily:'SourceSansPro-Bold', fontSize: 12,}}>RULES</Text></Button>
                              <Button transparent style={{paddingHorizontal: 17}}><Text style={{color: '#999999',  fontFamily:'SourceSansPro-Bold', fontSize: 12,}}>TERM</Text></Button>
                              <Button transparent onPress={this.logout} style={{paddingHorizontal: 17}}><Text style={{color: '#999999',  fontFamily:'SourceSansPro-Bold', fontSize: 12,}}>LOGOUT</Text></Button>
                            </ScrollView>
                          </View>  
                          <View style={{marginTop: 26, marginBottom: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                              <TouchableOpacity>
                                <Image source={Images.ic_fb}/>
                              </TouchableOpacity>
                              <TouchableOpacity style={{marginHorizontal: 13 }}>
                                <Image source={Images.ic_tw}/>
                              </TouchableOpacity>
                              <TouchableOpacity>
                                <Image source={Images.ic_ins}/>
                              </TouchableOpacity>
                          </View>
                          <View style={{paddingBottom: 15, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <Image source={Images.logofoot} style={{marginRight: 10}}/>
                            <Text style={{color:'#999999', fontSize: 12, fontFamily:'SourceSansPro-Bold'}}>© Copyrights 2018 Vinfotech Fantasy</Text>
                          </View>
                        </View>}
            </ScrollView>
            {this.state.showhideFilter && <View style={{justifyContent: 'flex-end'}} >
                          
                              <Button block transparent onPress={this._toggleModal} style={{backgroundColor: '#ffffff', padding: 15, alignItems: 'center', justifyContent: 'center', shadowColor: '#000000', elevation: 2 , 
                                shadowOffset: { width: 0, height: 5 }, 
                                shadowOpacity: 0.5, 
                                shadowRadius: 10, borderRadius: 0}}>
                                <Image source={Images.filter}/>
                                <Text style={{marginLeft: 10, fontFamily:'SourceSansPro-Regular'}}>FILTER BY LEAGUES</Text>
                              </Button>
                          
                        </View>}
            <Modal isVisible={this.state.isModalVisible} style={{ width: '100%', justifyContent: 'flex-end',
                 margin: 0}}>
                <View style={{ 
                    backgroundColor: '#ffffff', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                  }}>
                  <Button block transparent  onPress={this._toggleModal} style={{backgroundColor: '#ffffff', padding: 15, alignItems: 'center', justifyContent: 'center', shadowColor: '#000000', elevation: 2 , 
                    shadowOffset: { width: 0, height: 5 }, 
                    shadowOpacity: 0.2, 
                    shadowRadius: 10, borderRadius: 0,  borderBottomWidth: 0.5, 
                    borderBottomColor: '#eeeeee',}}>
                    <Image source={Images.filter}/>
                    <Text style={{marginLeft: 10, fontFamily:'SourceSansPro-Regular'}}>FILTER BY LEAGUES</Text>
                  </Button>
                </View>
                <View style={{backgroundColor: '#fff', width: '100%'}}>
                  <ScrollView>
                    <Grid>
                      <Col>
                        <Row style={{ 
                          backgroundColor: '#F8F8F8', 
                          borderBottomWidth: 1, borderBottomColor: '#eee', paddingVertical:15, paddingHorizontal:15}}> 
                              <Text style={{ fontFamily:'SourceSansPro-Regular' }}>
                                All Leagues
                              </Text>
                              <Right>
                                <Image source={Images.check}/>
                              </Right>
                        </Row>
                        {this.state.league_list.map((prop, key) => {
                          return (
                            <Row style={{ 
                              backgroundColor: '#fff', 
                              borderBottomWidth: 1, borderBottomColor: '#eee',  paddingHorizontal:15}}> 
                              <Button transparent block onPress={this._toggleModal}>
                                <Text style={{ fontFamily:'SourceSansPro-Regular' }}>
                                  {prop.league_abbr}
                                </Text>
                              </Button>
                            </Row>
                          );
                        })}
                      </Col>
                    </Grid>
                    {/* <Text onPress={this._toggleModal} style={{flexDirection: 'row', justifyContent:'space-between', backgroundColor: '#FFFEFF', borderBottomWidth: 1, borderBottomColor: '#eee', padding: 18}}>
                      <Text>Indian T20</Text>
                      <Image source={Images.check}/>  
                    </Text>
                    <Text onPress={this._toggleModal} style={{flexDirection: 'row', justifyContent:'space-between', backgroundColor: '#FFFEFF', borderBottomWidth: 1, borderBottomColor: '#eee', padding: 18}}>
                      <Text>IND v AUS Series</Text>
                      <Image source={Images.check}/>  
                    </Text>
                    <Text onPress={this._toggleModal} style={{flexDirection: 'row', justifyContent:'space-between', backgroundColor: '#FFFEFF', borderBottomWidth: 1, borderBottomColor: '#eee', padding: 18}}>
                      <Text>Tri Series 2018</Text>
                      <Image source={Images.check}/>  
                    </Text> */}
                  </ScrollView>
                </View>
              </Modal>
          </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 15
  },
  vmiddile: {
    alignSelf: 'center'
},
  slideCard: {
    backgroundColor: '#FFF',
    padding: 10,
    flexDirection: 'column',
  },
  cardView: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    marginBottom: 10,
    marginHorizontal: 10,
    padding: 10,
    justifyContent: 'space-between',

  },
  containerbg: {
    flex: 1,
  },
  containerimg: {
     flex: 1,
      backgroundColor:'transparent',
  },
  txthead: {
    textAlign: 'center',
    fontSize: 24
  },
  txtsubhead: {
    textAlign: 'center',
    fontSize: 16,
    marginTop: 5,
    color: '#808080' 
  },
  grid: {
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'center',
    
  },
  socialicn: {
    margin: 20,
  },
  formfield: {
    marginHorizontal: 20,
  },
  formElements: {
    marginBottom: 20,
    height: 40,
    paddingBottom: 15,
    paddingHorizontal: 10,
    borderWidth: 0,
    borderBottomWidth: 1
  },
  linktext: {
    textAlign: 'center',
    marginTop: 25
  },
  buttonDefault : {
    backgroundColor: '#EC8A0F',
     alignItems: 'center',
  },
  buttonDefaultTxt: {
    color: 'white'
  },
  slidetxt : {
    color: '#000',
    fontSize: 25,
    zIndex: 2
  },
  bgimage : {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    flex: 1,
    resizeMode: 'cover',
  },
  bglobby : {
    width: '100%', 
    height: '100%'
  },
  teamLogo:{
    width:64, 
    height: 64,
    alignItems:'center',
    justifyContent: 'center',
    borderRadius: 100, 
    backgroundColor: '#ffffff', 
    shadowColor:"#000000", 
    shadowOffset:{width:0, height:0},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,

  }
});
