import {Platform,StatusBar,Dimensions,StyleSheet} from 'react-native';
import * as Color from '../../Themes/Colors/';

const HH = Dimensions.get('window').height;
const WW = Dimensions.get('window').width;

const Style=StyleSheet.create({
      mainView:{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
      },
      BGImage:{
        flex:1,
        position: 'absolute',
        left: 0,
        top: 0,
      },
      main_image_container: {
        flex:1,
      },
      header: {
        flex:0,
        height: Platform.OS === 'android' ? 80 : 64,
        borderBottomWidth: 0,
        elevation: 10,
        paddingTop: StatusBar.currentHeight,
        paddingHorizontal: 15,
        borderBottomColor:Color.HeaderBottomColor,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 20 },
        shadowOpacity: 0.2,
        shadowRadius: 8
      },
      header_container: {
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        alignItems: "stretch",
      },
      heder_title: {
        position:'absolute',
        color: 'white',
        fontFamily:'SourceSansPro-Bold',

        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        textAlign: 'center',
      },
      heder_back: {
        position:'absolute',
        left:0,
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
      },
      heder_login_text_container: {
        position:'absolute',
        right:0,
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
      },
      heder_login_text: {
        position:'absolute',
        color:Color.Black,
        right:0,
        alignSelf:'center',
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center',
        fontFamily:'SourceSansPro-Bold',
        marginRight:'20%'
      },
      ListViewContainer:{
        flexDirection:'row',
        backgroundColor:'transparent',
        marginTop:5,
      },
      notification_container:{
        alignItems:'center',
        backgroundColor:'white',
        flexDirection:'row',
        padding:10,
        shadowColor:'#80000000',
        marginTop:5,
      },
      black_text:{
        textAlign:'center',
        justifyContent:'center',
        alignSelf:'center',
        color:'black',
        fontSize:10,
      },

      NOtificationRowContainer:{
        flexDirection:'row',
        alignItems:'center',
        flex:0,
        width:WW-20,
      },
     NotificationMessageContainer:{
        flex:0,
        paddingLeft:20,
        paddingRight:20,
        marginRight:30,
        marginTop:5,
        marginBottom:5,
      },
      NotificationLogo:{
        flex:0,
        justifyContent: 'center',
        margin:5,
        width:48,
        height:48,
        borderRadius: 24
      },
      team_name_text_left_align:{
        justifyContent:'center',
        color:'#818181',
        fontSize:10,
        fontFamily:'SourceSansPro-Regular'
      },
      gray_text_left_align:{
        justifyContent:'center',
        color:'#2B4251',
        fontSize:14,
        fontFamily:'SourceSansPro-Regular',
        marginRight: 10,
      },
      NoRecordContainer:{
        height:300,
        width:WW,
        alignItems:'center',
        backgroundColor:'transparent',
        justifyContent:'center',
      },
})

  export default Style
