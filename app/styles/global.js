import {StyleSheet} from 'react-native';
let appTextAlign = 'right';
export default StyleSheet.create({
    textIranSans: {
        fontFamily: "IRANSansMobile",
        color: '#333',
        textAlign: appTextAlign
    },
    input: {
        borderRadius: 3,
        borderWidth: 1,
        borderColor: "#ddd",
        backgroundColor: "#efefef",
        alignSelf: "stretch",
        paddingHorizontal: 5,
        paddingVertical: 10,
        fontFamily: "IRANSansMobile"
    },
    button: {
        padding: 5,
        margin:10,
        borderRadius: 50,
        alignItems: 'center',
    },
    buttonLabel: {
        fontSize: 16,
        textAlign: 'center'
    },
    buttonLabelWhite: {
        color:"#fafafa"
    },
    buttonLabelDanger: {
        color:"#ff3a31"
    },
    buttonSuccess: {
        backgroundColor: "#38ada9",
        color:"#fafafa"
    },
    buttonDefault: {
        backgroundColor: '#f0eff1',
    },
    buttonDanger: {
        backgroundColor: '#ff3a31',
    },
    textCenter:{
        textAlign:'center'
    },
    flexRow:{
        flexDirection:'row-reverse',
        margin:5
    },
    flex1:{
        flex:1
    },
    boxTitle:{
        borderRadius:3,
        backgroundColor:'#eee',
        paddingTop:10,
        paddingBottom:10,
    }
});