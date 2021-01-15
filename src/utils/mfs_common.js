import Fw from './mfs_ios_compatible'
import { os } from './mfs_ios_compatible'
var MFS = {};

//设置标题栏
MFS.initNav = function (cfg) {
    if (os.iphone) {
        //格式化标题栏
        Fw.device.Device.addEvent('02', JSON.stringify(cfg));
    } else {
        //格式化标题栏
        SysClientJs.initPageTitle(JSON.stringify(cfg));
    }
}

MFS.hideNav = function () {
    var params = {};
    switch (arguments.length) {
        case 0:
            break;
        case 1:
            params = arguments[0];
            break;
        default:
            break;
    }
    params["type"] = "hide";
    var args = params;
    if (os.iphone) {
        //格式化标题栏
        Fw.device.Device.addEvent('901', JSON.stringify(args));
    } else {
        //格式化标题栏
        SysClientJs.isShowPageTitle(JSON.stringify(args));
    }
}

MFS.showNav = function () {
    var args = { "type": "show" };
    if (os.iphone) {
        //格式化标题栏
        Fw.device.Device.addEvent('901', JSON.stringify(args));
    } else {
        //格式化标题栏
        SysClientJs.isShowPageTitle(JSON.stringify(args));
    }
}

MFS.goBack = function () {
    if (os.iphone) {
        Fw.device.Device.addEvent('31', '{}');
    } else {
        SysClientJs.gotoIndex();
    }
}

MFS.goToHomePage = function () {
    if (os.iphone) {
        Fw.device.Device.addEvent('32', '{}');
    } else {
        SysClientJs.gotoHomePage();
    }
}

MFS.webViewGoBack = function () {
    if (os.iphone) {
        Fw.device.Device.addEvent('667', '{}');
    } else {
        SysClientJs.goBackWebView();
    }
}

MFS.login = function (params) {
    if (os.iphone) {
        Fw.device.Device.addEvent('900', JSON.stringify(params));
    } else {
        SysClientJs.commonLogin(JSON.stringify(params));
    }
}

MFS.share = function (params) {
    if (os.iphone) {
        Fw.device.Device.addEvent('67', JSON.stringify(params));
    } else {
        SysClientJs.pupShareDialog(JSON.stringify(params));
    }
}

MFS.openWebView = function (params) {
    if (os.iphone) {
        Fw.device.Device.addEvent('116', JSON.stringify(params));
    } else {
        SysClientJs.gotoOtherPage(JSON.stringify(params));
    }
}

MFS.getLocation = function (params) {
    if (os.iphone) {
        Fw.device.Device.addEvent('905', JSON.stringify(params));
    } else {
        SysClientJs.getLocationOfGCJ(JSON.stringify(params));
    }
}

MFS.getAppInfo = function (params) {
    if (os.iphone) {
        Fw.device.Device.addEvent('666', JSON.stringify(params));
    } else {
        SysClientJs.getClientInformation(JSON.stringify(params));
    }
}

MFS.livenessDetection = function (params) {
    if (os.iphone) {
        Fw.device.Device.addEvent('108', JSON.stringify(params));
    } else {
        SysClientJs.gotoLivenessActivity(JSON.stringify(params));
    }
}

MFS.openPaymentCode = function (params) {
    params["needLogin"] = true;
    if (os.iphone) {
        Fw.device.Device.addEvent('126', JSON.stringify(params));
    } else {
        SysClientJs.gotoPaymentCodePage(JSON.stringify(params));
    }
}

MFS.openScan = function (params) {
    var callback = params["callback"];
    if (os.iphone) {
        Fw.device.Device.addEvent('111', callback);
    } else {
        SysClientJs.startCaptureActivityForResult(callback);
    }
}

// window.MFS = MFS;
export default MFS

