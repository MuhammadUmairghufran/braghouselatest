import {Platform, Dimensions} from 'react-native';
import * as Color from '../../Themes/Colors';

  const deviceHeight = Dimensions.get('window').height;
  const deviceWidth = Dimensions.get('window').width;
  const actionBarHeight = Platform.OS === 'android' ? 80 : 64;
  const varHeight = Platform.OS === 'android' ? 70 : 54;

const Style = {

    Wrapper: {
        flex:1,
      },
    main_container: {
      flex:1,
      height: deviceHeight,
      width: deviceWidth,
    },
    header_container:{
      height:100,
      marginTop:actionBarHeight
    },
    header_image:{
      width: 54,
      height: 54,
      borderRadius: 32,
      marginLeft:20,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'yellow',
      marginTop:4
    },
    header_text:{

      color:'white',
      fontFamily:'SourceSansPro-Bold',
      marginLeft:20,
      fontSize:24,
      marginTop:2,

    },
    header_sub_text:{

      color:'white',
      marginLeft:20,
      fontSize:14,
      marginTop:2,
    },
    item_row:{
      height: 50,
      flex: 1,
    },
    item_bottom_line:{
      height: 1,
      width: deviceWidth,
      backgroundColor: '#F3F3F3',
      opacity: 0.2, position: 'absolute',
      bottom: 0
    },
    logout_button:{
      color: '#fff',
      fontSize: 12,
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 5,
      paddingBottom: 5,
      borderRadius: 15,
      borderColor: '#F3F3F3',
      borderWidth: 1,
      alignSelf: 'center',
      fontFamily:'SourceSansPro-Bold',
    },
     item_right_image:{
      width: 44,
      height: 30,
      alignSelf: 'center',
      resizeMode: 'center'
    },
    item_row_text:{
      fontSize: 16,
      color: '#fff',
      alignSelf: 'center',
      fontFamily:'SourceSansPro-Regular',
      flex: 1,
      
    },
    nav_icons:{
      marginLeft: 10,
      marginRight: 20,
      resizeMode:'center',

    },
    header_logout_icon:{
      width:20,
      height:20,
      alignSelf:'center',
    },
    header_logout_text:{
      fontSize:14,
      alignSelf:'center',

      fontFamily:'SourceSansPro-Bold',
      justifyContent:'center',
      textAlign:'center',
      marginLeft:5,
    },
    header_cross:{

      resizeMode: 'center',


    },
    header_cross_touchableOpacity:{ height: 24,
      width: 24,
      position: 'absolute',
      right: 20
    },
    footer_container:{
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 12,
    marginBottom: 25
  },
    horizontal_line:{
      height:1,
      width:deviceWidth,
      backgroundColor:'#F3F3F3',
      opacity:0.2
    },
    list_item_style:{
      backgroundColor:'blue',
        height: 50,
        width:deviceWidth,
        justifyContent:'center'
    },
}

export default Style
