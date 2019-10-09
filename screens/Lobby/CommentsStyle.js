import {Platform,StatusBar,Dimensions,StyleSheet} from 'react-native';
import * as Color from '../../Themes/Colors/';

const HH = Dimensions.get('window').height;
const WW = Dimensions.get('window').width;

const CommentsStyle=StyleSheet.create({
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
        backgroundColor: 'transparent'
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
        flex: 1,
        flexDirection:'row',
        backgroundColor:'transparent',
        marginTop:5,

      },
      notification_container:{
        flexDirection:'row',
        paddingLeft:20,
        paddingRight:25,

        marginTop:1,
        marginBottom: 5,
        elevation: 3,
        backgroundColor: '#F4F4F4',


        shadowOffset: { width: 5, height: 5 },
      shadowColor: "#333333",
      shadowOpacity: 0.5,
      shadowRadius: 40,
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
        flex:1,
        paddingRight:20,
        marginLeft: 10,
        marginRight:20,
        marginTop:5,
        marginBottom:5,
      },
      NotificationLogo:{
        flex:0,
        marginTop:0,
        marginLeft:5,
        width:40,
        height:40,
        borderRadius: 22
      },
      commentTextStyle:{
        justifyContent:'center',
        color:'#333333',
        fontSize:14,
        fontFamily:'SourceSansPro-Regular',
        margin: 5
      },
      commentTextStyleIfBlank:{
        justifyContent:'center',
        color:'#333333',
        fontSize:0,
        fontFamily:'SourceSansPro-Regular',
        margin: 0,
        height: 0
      },
      dateTextStyle:{
        justifyContent:'center',
        color:'#666666',
        fontSize:14,
        fontFamily:'SourceSansPro-Regular',
        margin: 5
      },
      nameTextStyle:{
        justifyContent:'center',
        color:'#000000',
        fontSize:14,
        fontFamily:'SourceSansPro-Bold',
        margin: 5
      },
      NoRecordContainer:{
        height:300,
        width:WW,
        alignItems:'center',
        backgroundColor:'transparent',
        justifyContent:'center',
      },
})

  export default CommentsStyle
