import React, { Component } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Callout,Overlay } from 'react-native-maps';
import  {PermissionsAndroid, Dimensions,View,StyleSheet,Button,} from 'react-native'


export default class MapScreen extends Component {


    constructor(props) {


        super(props)
        this.state = {

                latitude: 22.719568,
                longitude: 75.857727,
                error:null,
               // latitudeDelta: LATITUDE_DELTA,
               // longitudeDelta: LONGITUDE_DELTA,
            

        }
    }
componentWillMount(){
   // function call



}
    
    _getCurrentLocation = () => {
       
              navigator.geolocation.getCurrentPosition(
            position => {
             //   alert('hello')
              //console.log('position------',position)
              this.setState({
               
                  latitude: position.coords.latitude,
                  longitude: position.coords.longitude,
                  //latitudeDelta: LATITUDE_DELTA,
                  //longitudeDelta: LONGITUDE_DELTA
                  error:null
                
              });
            },
            error=> this.setState({error:error.message}),
            { enableHighAccuracy: false, timeout: 20000, maximumAge:2000 ,distanceFilter: 10 },
          );
      
          // this.watchID = navigator.geolocation.watchPosition(
          //   position => {
          //     //console.log('position>>>>--',position)
          //     this.setState({
          //       region: {
          //         latitude: position.coords.latitude,
          //         longitude: position.coords.longitude,
          //         latitudeDelta: LATITUDE_DELTA,
          //         longitudeDelta: LONGITUDE_DELTA
          //       }
          //     });
            
          //   },
          //   (error) => console.log(error),
          //   { enableHighAccuracy: true, timeout: 20000, maximumAge:2000 },
          // );
     }
    componentWillUnmount() {
       
         // navigator.geolocation.clearWatch();
            //snavigator.geolocation.stopObserving();
               }
      componentDidMount(){

        
            if (Platform.OS === "android") {
              PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
              ).then(granted => {
                if (granted) this._getCurrentLocation.bind(this);
              });
            } else {
              this._getCurrentLocation.bind(this);
            }
           
          
     
          }
      send=()=>{
      //  alert()
        
      }
    render() {
      alert(this.state.latitude)
     // const {navigate} = this.props.navigation;

        return (
          <View>
          <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={{
              latitude:this.state.latitude,
             longitude: this.state.longitude,
              latitudeDelta: 0.0922,
             longitudeDelta: 0.0121,
            }}
             showsCompass={true}
            showsUserLocation={true}
            followUserLocation={true}
          >
         
          <Marker coordinate={this.state}>
         </Marker>
          </MapView>
         
        </View>
        <View style={{marginTop:400,margin:10}}>
          <Button title='send'  onPress={()=>this.props.navigation.navigate('Chat',{long:[{lon:0,lat:0}]})}>

          </Button>
        </View>  
        </View>
           
        )
    }

}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 330,
    width: 330,
    margin:10,
   // justifyContent: 'flex-end',
    alignItems: 'center',
    
  },
  map: {
    ...StyleSheet.absoluteFillObject,
   // backgroundColor:"pink"
  },
 });