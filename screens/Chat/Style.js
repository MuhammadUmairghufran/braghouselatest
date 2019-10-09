import { Dimensions } from 'react-native';
import * as Colors from '../../Constants/Colors/';
const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const Style = {

    main_container: {
        backgroundColor: 'green',

    },

    chat_root: {
        backgroundColor: '#E9E9EF',
        backgroundColor: 'yellow',
    },

    chat_container: {
        flex: 1,
        width: '100%',
        // paddingBottom: 70,

    },

    left_bubble: {
        maxWidth: '70%',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        marginLeft: 10,
        padding: 10,
        alignSelf: 'flex-start',
        marginTop: 5,
        marginBottom: 5,
    },

    right_bubble: {
        maxWidth: '70%',
        backgroundColor: '#3981F7',
        borderRadius: 20,
        marginRight: 10,
        padding: 10,
        alignSelf: 'flex-end',
        marginTop: 5,
        marginBottom: 5,
    },

    left_bubble_text: {
        color: '#000000',
        fontSize: 16,
       // fontFamiliy: 'Muli',
        textAlign: 'left',

    },
    right_bubble_text: {
        color: '#FFFFFF',
        fontSize: 16,
       // fontFamiliy: 'Muli',
        textAlign: 'right',
    },

    bottom_view_container: {
        flexDirection: 'row',
        width: '100%',
        marginLeft: 10,
        backgroundColor: 'transparent',
        marginBottom: 5,
        marginTop: 5,
        paddingTop: 2,
        paddingBottom: 2,
    },

    input_text: {
        textAlignVertical: 'center',
        width: '88%',
        backgroundColor: 'white',
        maxHeight: 100,
        borderRadius: 20,
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: 'transparent',
        borderWidth: 0,
    },

    send_button_container: {
        position: 'absolute',
        bottom: 0,
        right: 5,
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },

    send_button: {
        height: 40,
        width: 40,
        borderRadius: 20,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        tintColor: '#1B75BC'
    },

    user_image: {
        height: 40,
        width: 40,
        borderRadius: 20,
        borderColor: 'gray',
        borderWidth: 1,
        alignSelf: 'center',
    },
    textleftstyle: {
        padding: 15, fontSize: 16,
        backgroundColor: 'grey',
        alignSelf: 'flex-end',
        borderRadius: 25
    },
    textrightstyle: {
        padding: 15, fontSize: 16,
        backgroundColor: '#8C9093',
        alignSelf: 'flex-start', width: '60%',
        borderRadius: 25

    },
    textleft1style: {
        fontSize: 16,
        color: 'white',


    },
    textright1style: {
        fontSize: 16,
        color: 'white',

    },
    audioleftstyle: {
        fontSize: 16,
        color: 'white',
        backgroundColor: '#0077B9',
        width: '60%',
        alignSelf: "flex-end",
        marginRight: 20,
        borderRadius: 25
    },
    audioightstyle: {
        fontSize: 16,
        color: '#8C9093',
        width: '60%',
        alignSelf: "flex-start",
        backgroundColor: '#0077B9',
        borderRadius: 25,
        marginLeft: 20,

    },
    imageleftstyle: {
        padding: 15, fontSize: 16,
        color: 'white',
        // backgroundColor:'#0077B9',
        width: '60%',
        alignSelf: "flex-end",
        marginRight: 42,
        borderRadius: 25
    },
    imagerightstyle: {
        padding: 15, fontSize: 16,
        color: '#8C9093',
        width: '60%',
        // backgroundColor:'#0077B9',
        borderRadius: 25,
        marginLeft: 40,

    },
    videoleftstyle: {
        backgroundColor: '#0077B9',

        alignSelf: 'flex-end',
        //  borderTopRightRadius:0,
        // marginBottom:5,
        borderRadius: 25,
        marginRight: 18,
        width: '60%',
        color: '#FFFFFF'

    },
    videorightstyle: {
        backgroundColor: '#0077B9',

        // borderTopLeftRadius:0,
        borderRadius: 25,
        marginLeft: 20,
        //backgroundColor:'#8C9093',
        width: '60%',
        //marginBottom:0,
        alignSelf: 'flex-start',
        //  color:'#8C9093'
    },
    pdfleftstyle: {
        fontSize: 16,

        backgroundColor: '#0077B9',
        width: '60%',
        alignSelf: "flex-end",
        marginRight: 20,
        borderRadius: 25
    },
    pdfightstyle: {
        fontSize: 16,
        alignSelf: "flex-start",
        width: '60%',
        backgroundColor: '#8C9093',
        borderRadius: 25,
        marginLeft: 20,

    },
    textleft1: {
        alignSelf: 'flex-end',
        borderTopRightRadius: 0,
        // marginBottom:5,
        borderRadius: 25,
        // marginLeft:80,
        //paddingLeft:90,

        marginRight: 22,
        // width: '60%', 
        color: '#8C9093'
    },


    righttext1: {

        borderTopLeftRadius: 0,
        borderRadius: 25,
        marginLeft: 20,

        //marginBottom:0,
        alignSelf: 'flex-start', width: '60%',
        color: '#8C9093'
    },
    textBox: {
        // borderRadius: 5,
        // borderWidth: 1,
        // borderColor: 'gray',
        //height:'100%',
        fontSize: 14,
        //margin:20,
        paddingHorizontal: 10,
        // flex: 1,
        paddingVertical: 5,

    },

    other_user_name: {
        color: '#FFFFFF',
       // fontFamily: 'Muli',
        fontSize: 18,
        fontWeight: 'bold',
        lineHeight: 25,
        alignSelf: 'center',
        textAlign: 'center',
        marginLeft: 10,
    },

    Wrapper: {
        flex: 1,
        backgroundColor: '#FFF',
        paddingTop: Platform.OS === 'ios' ? 0 : 0,

    },
    main_container: {
        flex: 1,
        height: deviceHeight,
        width: deviceWidth,
    },
    active_brag_parent: {
        backgroundColor: 'white',
        alignItems: 'center',
        marginLeft: 11,
        marginRight: 2,
        justifyContent: 'center',

    },
    header_inner_view: {
        height: 100,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4
    },
    brag_text: {
        fontSize: 12,
        flexWrap: 'wrap',
        color: '#222222',
        fontFamily: 'SourceSansPro-Bold',
        marginTop: 5

    },
    hot_brag_img: {
        height: 100,
        width: 100,
        borderRadius: 50
    },
    active_brag_img: {
        height: 100,
        width: 100,
    },

    question_card_item: {
        //minHeight: 200,
        marginLeft: 10,
        marginRight: 10,
        backgroundColor: 'white',
        marginTop: 10,
        borderRadius: 4,
        elevation: 2,
        paddingLeft: 20,
        paddingTop: 13,
        paddingRight: 15,
        paddingBottom: 18,
        borderWidth: 1,
        borderColor: '#D9D9D9',

        shadowOffset: { width: 1, height: 5 },
        shadowColor: "#333333",
        shadowOpacity: 0.5,
        shadowRadius: 7,

    },
    share_text: {
        fontSize: 10,
        color: Colors.LableTextColor,
        alignSelf: 'center',
        fontFamily: 'SourceSansPro-Bold'
    },
    question_footer_share_view: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    share_and_image: {
        padding: 3,
        flexDirection: 'row'
    },
    team_name_text: {
        fontSize: 18,
        color: '#000000',
        fontFamily: 'SourceSansPro-Regular',
        fontWeight: 'bold'
    },
    question_text: {
        fontSize: 18,
        color: Colors.ColorPrimary,
        fontFamily: 'SourceSansPro-Regular',
        fontWeight: '600',
        marginTop: 10,
    },
    seperator_style: {
        height: 1,
        backgroundColor: '#EFEEEE',
        marginLeft: -20,
        marginTop: 15,
        marginRight: -15
    },
    cards_bottom_view: {
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'space-between'
    },
    play_button_text: {
        fontSize: 14,
        color: '#fff',
        paddingLeft: 18,
        paddingRight: 18,
        paddingTop: 7,
        paddingBottom: 7,
        fontFamily: 'SourceSansPro-Regular',
        fontWeight: 'bold'
    },
    play_button_gradient: {
        borderRadius: 18
    },
    question_card_lable_text: {
        fontSize: 10,
        color: Colors.LableTextColor,
        fontFamily: 'SourceSansPro-Regular'
    },
    question_card_value_text: {
        fontSize: 16,
        color: '#000',
        fontFamily: 'SourceSansPro-Regular',
        fontWeight: 'bold'
    },
    brag_item: {
        backgroundColor: '#FFF',
        marginTop: 10,
        width:'80%',
    }

}

export default Style