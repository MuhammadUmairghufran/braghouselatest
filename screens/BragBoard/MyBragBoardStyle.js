import {Platform,StatusBar,Dimensions,StyleSheet} from 'react-native';
import * as Color from '../../Themes/Colors/';

const HH = Dimensions.get('window').height;
const WW = Dimensions.get('window').width;

const MyBragBoardStyle=StyleSheet.create({
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
        width:WW-20,
        paddingBottom:20,
      },
      notification_container:{
        alignItems:'center',
        backgroundColor:'white',
        flexDirection:'row',
        paddingLeft:10,
        paddingRight:10,
        paddingTop:10,
        paddingBottom:10,
        marginLeft:20,
        marginRight:20,
        marginTop:5,
        width:WW-30,
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
        paddingRight:20,
        marginRight:20,
        marginTop:5,
        marginBottom:5,
      },
      ProfileLogo:{
        flex:0,
        justifyContent: 'center',
        marginLeft:10,
        marginRight:10,
        width:48,
        height:48,
        borderRadius: 24
      },
      score_container:{
        position:'absolute',
        right:10,
        height: 26,
        width: 72,
      	borderRadius: 25,
        backgroundColor: '#1B75BC',
      },
      team_name_text_left_align:{
        justifyContent:'center',
        alignSelf:'center',
        alignItems:'center',
        color:'white',
        fontFamily:'SourceSansPro-Bold',
        paddingTop:5,
        fontSize:10,
        
      },
      rank_text:{
        justifyContent:'center',
        color:'#818181',
        fontSize:14,
        fontFamily:'SourceSansPro-Regular'
      },
      gray_text_left_align:{
        justifyContent:'center',
        color:'#2B4251',
        fontSize:16,
        marginRight:140,
        fontFamily:'SourceSansPro-Regular'
      },
      rank_text_color:{
        justifyContent:'center',
        color:'#CCCCCC',
        fontSize:14,
        fontFamily:'SourceSansPro-Regular'
      },
      NoRecordContainer:{
        height:300,
        width:WW,
        alignItems:'center',
        backgroundColor:'transparent',
        justifyContent:'center',
      },
})

  export default MyBragBoardStyle
