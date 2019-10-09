import React, { Component } from 'react';
import {Card, CardItem, Body, Button, Right, Left, Separator, H3, Container, Header, Content, Tab, Tabs, TabHeading } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {TouchableOpacity, StyleSheet, Text, View, Image, TextInput, KeyboardAvoidingView, ScrollView, ImageBackground, FlatList, Dimensions, Platform, ActivityIndicator} from 'react-native';
import { AppStyles, Images } from './../Themes'
import LinearGradient from 'react-native-linear-gradient';
export default class TabPlayers extends Component {
  constructor(props) {
      super(props);
      this.state = {
      }
    }
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <View>
        { Platform.OS === 'ios' && <View style={{shadowColor: '#000',
                elevation: 10,
                shadowOpacity: 0.4,
                shadowOffset: { width: 0, height: 10},
                shadowRadius: 10,
                backgroundColor: '#f4f4f4',
                height: 8,
                marginTop: -16,
                zIndex: 9
              }}>
                </View>}
                { Platform.OS === 'android' && <View style={{shadowColor: '#000',
                elevation: 10,
                shadowOpacity: 0.2,
                shadowOffset: { width: 0, height: 2},
                shadowRadius: 10,
                backgroundColor: '#76BCD4',
                height: 15,
                marginTop: -14
                }}>
                </View>}
          <View style={{padding: 15}}>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Lobbydetail')} activeOpacity={0.7}>
                  <Card style={{paddingVertical: 15, borderRadius: 5, marginBottom: 10, borderWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, shadowColor: '#000', elevation: 2, shadowOpacity: 0.2, shadowOffset: { width: 0, height: 2 }, shadowRadius: 10}}>
                      <CardItem>
                        <Body>
                          <Grid style={{justifyContent: 'center'}}>
                            <Col style={{ width: 70, alignItems: 'center', justifyContent: 'center'}}>
                              <View>
                                      <Image source={Images.logoteam} style={{width: 44, height: 44, alignSelf: 'center'}}/>
                                      <Text style={{color: '#000000', fontSize: 14, fontFamily:'SourceSansPro-Bold', marginTop: 8, textAlign: 'center'}}>Alabama</Text>
                                  </View>
                            </Col>
                            <Col style={{alignItems:'center', justifyContent: 'center'}}>
                      <Text style={{color:'#1B75BC', fontSize: 14, fontFamily:'SourceSansPro-Bold', marginBottom: 5}}>Week 2</Text>
                              <Text style={{color:'#ABABAB', fontSize: 14, marginBottom: 8}}>Apr 24, Sat - 12:00 AM</Text>
                              <TouchableOpacity onPress={() => this.props.navigation.navigate('Lobbydetail')}  style={{borderWidth: 1, borderColor: '#E2E2E2', borderRadius: 11, paddingHorizontal: 8, paddingVertical: 4}}>
                                <Text style={{color:'#666666', fontSize: 11}}>28 Brags</Text>
                              </TouchableOpacity>
                            </Col>
                            <Col style={{ width: 70, alignItems: 'center', justifyContent: 'center'}}>
                              <View>
                                      <Image source={Images.vanderbilt} style={{width: 44, height: 44, alignSelf: 'center'}}/>
                                      <Text style={{color: '#000000', fontSize: 14, fontFamily:'SourceSansPro-Bold', marginTop: 8, textAlign: 'center'}}>Vanderbilt</Text>
                                  </View>
                            </Col>
                          </Grid>
                        </Body>
                      </CardItem>
                  </Card>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Lobbydetail')} activeOpacity={0.7}>
                  <Card style={{paddingVertical: 15, borderRadius: 5, marginBottom: 10, borderWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, shadowColor: '#000', elevation: 2, shadowOpacity: 0.2, shadowOffset: { width: 0, height: 2 }, shadowRadius: 10}}>
                      <CardItem>
                        <Body>
                          <Grid style={{justifyContent: 'center'}}>
                            <Col style={{ width: 70, alignItems: 'center', justifyContent: 'center'}}>
                              <View>
                                      <Image source={Images.logoteam} style={{width: 44, height: 44, alignSelf: 'center'}}/>
                                      <Text style={{color: '#000000', fontSize: 14, fontFamily:'SourceSansPro-Bold', marginTop: 8, textAlign: 'center'}}>Alabama</Text>
                                  </View>
                            </Col>
                            <Col style={{alignItems:'center', justifyContent: 'center'}}>
                      <Text style={{color:'#1B75BC', fontSize: 14, fontFamily:'SourceSansPro-Bold', marginBottom: 5}}>Week 2</Text>
                              <Text style={{color:'#ABABAB', fontSize: 14, marginBottom: 8}}>Apr 24, Sat - 12:00 AM</Text>
                              <TouchableOpacity onPress={() => this.props.navigation.navigate('Lobbydetail')}  style={{borderWidth: 1, borderColor: '#E2E2E2', borderRadius: 11, paddingHorizontal: 8, paddingVertical: 4}}>
                                <Text style={{color:'#666666', fontSize: 11}}>28 Brags</Text>
                              </TouchableOpacity>
                            </Col>
                            <Col style={{ width: 70, alignItems: 'center', justifyContent: 'center'}}>
                              <View>
                                      <Image source={Images.vanderbilt} style={{width: 44, height: 44, alignSelf: 'center'}}/>
                                      <Text style={{color: '#000000', fontSize: 14, fontFamily:'SourceSansPro-Bold', marginTop: 8, textAlign: 'center'}}>Vanderbilt</Text>
                                  </View>
                            </Col>
                          </Grid>
                        </Body>
                      </CardItem>
                  </Card>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Lobbydetail')} activeOpacity={0.7}>
                  <Card style={{paddingVertical: 15, borderRadius: 5, marginBottom: 10, borderWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, shadowColor: '#000', elevation: 2, shadowOpacity: 0.2, shadowOffset: { width: 0, height: 2 }, shadowRadius: 10}}>
                      <CardItem>
                        <Body>
                          <Grid style={{justifyContent: 'center'}}>
                            <Col style={{ width: 70, alignItems: 'center', justifyContent: 'center'}}>
                              <View>
                                      <Image source={Images.logoteam} style={{width: 44, height: 44, alignSelf: 'center'}}/>
                                      <Text style={{color: '#000000', fontSize: 14, fontFamily:'SourceSansPro-Bold', marginTop: 8, textAlign: 'center'}}>Alabama</Text>
                                  </View>
                            </Col>
                            <Col style={{alignItems:'center', justifyContent: 'center'}}>
                      <Text style={{color:'#1B75BC', fontSize: 14, fontFamily:'SourceSansPro-Bold', marginBottom: 5}}>Week 2</Text>
                              <Text style={{color:'#ABABAB', fontSize: 14, marginBottom: 8}}>Apr 24, Sat - 12:00 AM</Text>
                              <TouchableOpacity onPress={() => this.props.navigation.navigate('Lobbydetail')}  style={{borderWidth: 1, borderColor: '#E2E2E2', borderRadius: 11, paddingHorizontal: 8, paddingVertical: 4}}>
                                <Text style={{color:'#666666', fontSize: 11}}>28 Brags</Text>
                              </TouchableOpacity>
                            </Col>
                            <Col style={{ width: 70, alignItems: 'center', justifyContent: 'center'}}>
                              <View>
                                      <Image source={Images.vanderbilt} style={{width: 44, height: 44, alignSelf: 'center'}}/>
                                      <Text style={{color: '#000000', fontSize: 14, fontFamily:'SourceSansPro-Bold', marginTop: 8, textAlign: 'center'}}>Vanderbilt</Text>
                                  </View>
                            </Col>
                          </Grid>
                        </Body>
                      </CardItem>
                  </Card>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Lobbydetail')} activeOpacity={0.7}>
                  <Card style={{paddingVertical: 15, borderRadius: 5, marginBottom: 10, borderWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, shadowColor: '#000', elevation: 2, shadowOpacity: 0.2, shadowOffset: { width: 0, height: 2 }, shadowRadius: 10}}>
                      <CardItem>
                        <Body>
                          <Grid style={{justifyContent: 'center'}}>
                            <Col style={{ width: 70, alignItems: 'center', justifyContent: 'center'}}>
                              <View>
                                      <Image source={Images.logoteam} style={{width: 44, height: 44, alignSelf: 'center'}}/>
                                      <Text style={{color: '#000000', fontSize: 14, fontFamily:'SourceSansPro-Bold', marginTop: 8, textAlign: 'center'}}>Alabama</Text>
                                  </View>
                            </Col>
                            <Col style={{alignItems:'center', justifyContent: 'center'}}>
                      <Text style={{color:'#1B75BC', fontSize: 14, fontFamily:'SourceSansPro-Bold', marginBottom: 5}}>Week 2</Text>
                              <Text style={{color:'#ABABAB', fontSize: 14, marginBottom: 8}}>Apr 24, Sat - 12:00 AM</Text>
                              <TouchableOpacity onPress={() => this.props.navigation.navigate('Lobbydetail')}  style={{borderWidth: 1, borderColor: '#E2E2E2', borderRadius: 11, paddingHorizontal: 8, paddingVertical: 4}}>
                                <Text style={{color:'#666666', fontSize: 11}}>28 Brags</Text>
                              </TouchableOpacity>
                            </Col>
                            <Col style={{ width: 70, alignItems: 'center', justifyContent: 'center'}}>
                              <View>
                                      <Image source={Images.vanderbilt} style={{width: 44, height: 44, alignSelf: 'center'}}/>
                                      <Text style={{color: '#000000', fontSize: 14, fontFamily:'SourceSansPro-Bold', marginTop: 8, textAlign: 'center'}}>Vanderbilt</Text>
                                  </View>
                            </Col>
                          </Grid>
                        </Body>
                      </CardItem>
                  </Card>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Lobbydetail')} activeOpacity={0.7}>
                  <Card style={{paddingVertical: 15, borderRadius: 5, marginBottom: 10, borderWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, shadowColor: '#000', elevation: 2, shadowOpacity: 0.2, shadowOffset: { width: 0, height: 2 }, shadowRadius: 10}}>
                      <CardItem>
                        <Body>
                          <Grid style={{justifyContent: 'center'}}>
                            <Col style={{ width: 70, alignItems: 'center', justifyContent: 'center'}}>
                              <View>
                                      <Image source={Images.logoteam} style={{width: 44, height: 44, alignSelf: 'center'}}/>
                                      <Text style={{color: '#000000', fontSize: 14, fontFamily:'SourceSansPro-Bold', marginTop: 8, textAlign: 'center'}}>Alabama</Text>
                                  </View>
                            </Col>
                            <Col style={{alignItems:'center', justifyContent: 'center'}}>
                      <Text style={{color:'#1B75BC', fontSize: 14, fontFamily:'SourceSansPro-Bold', marginBottom: 5}}>Week 2</Text>
                              <Text style={{color:'#ABABAB', fontSize: 14, marginBottom: 8}}>Apr 24, Sat - 12:00 AM</Text>
                              <TouchableOpacity onPress={() => this.props.navigation.navigate('Lobbydetail')}  style={{borderWidth: 1, borderColor: '#E2E2E2', borderRadius: 11, paddingHorizontal: 8, paddingVertical: 4}}>
                                <Text style={{color:'#666666', fontSize: 11}}>28 Brags</Text>
                              </TouchableOpacity>
                            </Col>
                            <Col style={{ width: 70, alignItems: 'center', justifyContent: 'center'}}>
                              <View>
                                      <Image source={Images.vanderbilt} style={{width: 44, height: 44, alignSelf: 'center'}}/>
                                      <Text style={{color: '#000000', fontSize: 14, fontFamily:'SourceSansPro-Bold', marginTop: 8, textAlign: 'center'}}>Vanderbilt</Text>
                                  </View>
                            </Col>
                          </Grid>
                        </Body>
                      </CardItem>
                  </Card>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Lobbydetail')} activeOpacity={0.7}>
                  <Card style={{paddingVertical: 15, borderRadius: 5, marginBottom: 10, borderWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, borderLeftWidth: 0, borderRightWidth: 0, shadowColor: '#000', elevation: 2, shadowOpacity: 0.2, shadowOffset: { width: 0, height: 2 }, shadowRadius: 10}}>
                      <CardItem>
                        <Body>
                          <Grid style={{justifyContent: 'center'}}>
                            <Col style={{ width: 70, alignItems: 'center', justifyContent: 'center'}}>
                              <View>
                                      <Image source={Images.logoteam} style={{width: 44, height: 44, alignSelf: 'center'}}/>
                                      <Text style={{color: '#000000', fontSize: 14, fontFamily:'SourceSansPro-Bold', marginTop: 8, textAlign: 'center'}}>Alabama</Text>
                                  </View>
                            </Col>
                            <Col style={{alignItems:'center', justifyContent: 'center'}}>
                      <Text style={{color:'#1B75BC', fontSize: 14, fontFamily:'SourceSansPro-Bold', marginBottom: 5}}>Week 2</Text>
                              <Text style={{color:'#ABABAB', fontSize: 14, marginBottom: 8}}>Apr 24, Sat - 12:00 AM</Text>
                              <TouchableOpacity onPress={() => this.props.navigation.navigate('Lobbydetail')}  style={{borderWidth: 1, borderColor: '#E2E2E2', borderRadius: 11, paddingHorizontal: 8, paddingVertical: 4}}>
                                <Text style={{color:'#666666', fontSize: 11}}>28 Brags</Text>
                              </TouchableOpacity>
                            </Col>
                            <Col style={{ width: 70, alignItems: 'center', justifyContent: 'center'}}>
                              <View>
                                      <Image source={Images.vanderbilt} style={{width: 44, height: 44, alignSelf: 'center'}}/>
                                      <Text style={{color: '#000000', fontSize: 14, fontFamily:'SourceSansPro-Bold', marginTop: 8, textAlign: 'center'}}>Vanderbilt</Text>
                                  </View>
                            </Col>
                          </Grid>
                        </Body>
                      </CardItem>
                  </Card>
              </TouchableOpacity>
            </View>
      </View>
    );
  }
}
