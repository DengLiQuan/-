
//弹出框
function dialog(id, time, url) {
    dialogClose();
    $(".mask").width($(document).outerWidth(true));
    $(".mask").height($(document).outerHeight(true));

    $(".mask").show();
    $(id).show();

    var dw2 = $(id + " .dialog_content").outerWidth() / 2;
    var dh2 = $(id + " .dialog_content").outerHeight() / 2;
    $(id + " .dialog_content").css({ "margin-left": -dw2 + "px", "margin-top": -dh2 + "px" });

    //假如有时间参数time，会定时关闭弹出框
    if (time) {
        setTimeout(dialogClose, time);
    }
    if (url) {
        if (getQueryString("top") == null) {
            setTimeout(function () { dialogUrl(url); }, time);
        }
        else {
            if (checkWebview() == "android") {
                setTimeout(function () { androidApp(url); }, time);
            }
            if (checkWebview() == "ios") {
                setTimeout(function () { iosApp(url); }, time);
            }
        }
    }
}
function dialogUrl(url) {
    window.location.href = url;
}
function dialogClose() {
    $(".dialog").hide();
    $(".mask").hide();
}
function noClose() {
    if (event.stopPropagation)
        event.stopPropagation();
    else
        event.cancelBubble = true;
}
$(document).ready()

function resizeRoot() {
    var deviceWidth = document.documentElement.clientWidth,
        num = 750,
        num1 = num / 100;
    if (deviceWidth > num) {
        deviceWidth = num;
    }
    document.documentElement.style.fontSize = deviceWidth / num1 + "px";
}
//根节点HTML的字体大小初始化
resizeRoot();

window.onresize = function () {
    resizeRoot();
};


//通过正则匹配获取当前页面的url中的参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    var strValue = "";
    if (r != null) {
        strValue = unescape(r[2]);
    }
    return strValue;
}

// 时间格式化
function formatDate(time) {
    var date = new Date(time);

    var year = date.getFullYear(),
        month = date.getMonth() + 1,//月份是从0开始的
        day = date.getDate(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();
    var newTime = year + '-' +
        month + '-' +
        day + ' ';
    // var newTime = year + '-' +
    //     month + '-' +
    //     day + ' ' +
    //     hour + ':' +
    //     min + ':' +
    //     sec;
    return newTime;
}


var Base64 = {

    // private property
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode: function(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

        }

        return output;
    },

    // public method for decoding
    decode: function(input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = Base64._utf8_decode(output);

        return output;

    },

    // private method for UTF-8 encoding
    _utf8_encode: function(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode: function(utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }

}


