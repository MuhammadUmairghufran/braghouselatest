import {Platform,StatusBar,Dimensions,StyleSheet} from 'react-native';
import * as Color from '../../Themes/Colors/';

const HH = Dimensions.get('window').height;
const WW = Dimensions.get('window').width;

const CreateBragStyle=StyleSheet.create({
      scrollView:{
        flex: 1,
        backgroundColor:'#EEEEEE'
      },
      mainView:{
        paddingLeft:15,
        paddingRight:15,
        paddingTop:10,
        elevation:10,
        backgroundColor: 'white',
      },

      label_text:{
        color:'#222222',
        fontSize:17,
        fontFamily:'SourceSansPro-Bold',
      },
      DropDownContainerStyle:{
        marginTop:20,
      },
      DropDownStyle:{
        flexDirection:'row',
        position: 'relative',
        backgroundColor: 'transparent',
        alignItems:'center',
        marginTop:5,
        width:WW-30,
        height:40
      },
      DropDownLogo:{
          flex:0,
          justifyContent: 'center',
          marginLeft:10,
          marginTop:5,
          marginRight:10,
          width:32,
          height:32,
          borderRadius: 16
      },

      DropDownRightLogo:{
          position:'absolute',
          right:60,
          justifyContent: 'center',
          borderRadius: 100
      },
      drop_down_text:{
        flex: 1,
        color:Color.Black,
        marginLeft: 0,
        marginRight:10,
        fontSize:16,

      },
      min_label_text:{
        color:'#9B9B9B',
        fontSize:16,
        fontFamily:'SourceSansPro-Regular'
      },
       bottom_border:{
        marginTop:5,
        backgroundColor:'#DDDDDD',
        height:1,
        width:WW - 30,
      },
      Button_Container:{
        flexDirection:'row',
        backgroundColor: 'transparent',
        alignItems:'center',
        marginTop:5,
        width:WW,
        height:40
      },
      Category_Container:{
        flexDirection:'row',
        backgroundColor: 'transparent',
        marginRight:10,
        alignItems:'center',
        height:40
      },
      enabled_button:{
        	height: 36,
          marginTop:5,
          borderRadius: 24,
          marginRight:10,
          paddingLeft:10,
          paddingRight:10,
          alignItems:'center',
          justifyContent:'center',
      },
      disabled_button:{
        	height: 36,
          marginTop:5,
          marginRight:10,
          paddingLeft:10,
          paddingRight:10,
          backgroundColor:'#CCCCCC',
          borderRadius: 24,
          alignItems:'center',
          justifyContent:'center',
      },
      disable_button_text:{
        color:'white',
        fontSize:16,
        fontFamily:'SourceSansPro-Regular'
      },
      ques_text:{
        marginTop:10,
        color:'#666666',
        fontSize:16,
      },
      Option_Container:{
        marginTop:5,
        flexDirection:'row',
        backgroundColor: 'transparent',
        width:WW,
        height:50,
      },
      Option_Item_Container:{
        marginTop:5,
        flexDirection:'row',
        backgroundColor: 'transparent',
        width:WW/2,
        height:50,
      },
      brag_button_container:{
          height: 100,
          width:WW+20,
          marginLeft:-20,
          backgroundColor: '#EEEEEE',
          alignItems:'center',
          justifyContent:'center',
      },
      brag_button:{
          height: 40,
          width:WW-40,
          borderRadius: 5,
          alignItems:'center',
          justifyContent:'center',
      },

})

  export default CreateBragStyle
