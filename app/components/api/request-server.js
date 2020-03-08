import AbortFetch from './abort-fetch';
import {useSelector} from "react-redux";

const DATE_OF_RELEASE_BUILD = '2019-03-10';
const SERVER_URL = "https://www.bacharkh.com/api/";
let userToken = null;

function SetUserToken(type,token) {
    userToken = type+" "+token;
}
let RequestServer = (input, init, url) => {

    if (input instanceof Object) {
        init = input;
        input = init.url;
        delete init['url'];
    }

    if (!init.headers)
        init.headers = {};

    if (userToken) {
        init.headers['Authorization'] = userToken;
        /*console.log("^^^^^^^^^^^^^user token^^^^^^^^^^^^^^^^^^^");
        console.log(input);
        console.log(userToken);*/
    }

    init.headers['updated-date'] = DATE_OF_RELEASE_BUILD;
    init.headers['os'] = Platform.OS;

    if (url) {
        input = url + input;
    }
    else {
        input = SERVER_URL + input;
    }
    if (!!init) {
        if (init.method.toUpperCase() === 'GET') {
            if (!!init.data) {
                input += '?' + arrayToQueryString(init.data);
                delete init.body;
            }
        } else {

            if (init.data instanceof Object) {
                //============= using json body =================
                init.body = JSON.stringify(init.data);
                init.headers['content-type'] = 'application/json';
                //========== using urlencoded body ==============
                // init.body = arrayToQueryString(init.data);
                // init.headers['content-type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
                // TODO encode body depending on specified header
            }
        }
    }
    let request = AbortFetch(input, init);
    request.catch(err => {
        // if (err.target && err.target.status == 0) {
            // this.confirmModal.show({
            //     title: 'خطا در برقراری ارتباط با سرور',
            //     message: 'از اتصال دستگاه خود به اینترنت مطمعن شوید.',
            // });
            // subAlert('از اتصال دستگاه خود به اینترنت مطمئن شوید.', SUB_ALERT_DANGER);
            console.error("INTERNET ERROR");
        // }
    });
    return request;
    // return AsyncStorage.getItem('user')
    //     .then(userObject => {
    //         if (userObject != null) {
    //             if (!init.headers)
    //                 init.headers = {};
    //
    //             var user = JSON.parse(userObject);
    //             init.headers['token'] = user.token;
    //         }
    //         return abortFetch(input, init);
    //     });
};



function arrayToQueryString(array_in) {
    let out = [];

    for (let key in array_in) {
        out.push(key + '=' + encodeURIComponent(array_in[key]));
    }

    return out.join('&');
}

export {
    SetUserToken,
    RequestServer,
    SERVER_URL
};
export default RequestServer;
