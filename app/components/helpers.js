export function commafy(num) {
    var str = num.toString().split('.');
    if (str[0].length >= 4) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 4) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
}

export function convertDigit(value,conversion){
    // Arabic chars : ٠١٢٣٤٥٦٧٨٩
    // Persian chars: ۰۱۲۳۴۵۶۷۸۹
    if(conversion=='p2e') {
        return value.replace(/[٠-٩]/g, function (a) {
            return {'٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4', '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9' }[a];
        }).replace(/[۰-۹]/g, function (a) {
            return {'۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4', '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9' }[a];
        });;
    }else if(conversion=='e2p')
        return value.replace(/\d/g,function(a){
            return ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'][a];
        });
}