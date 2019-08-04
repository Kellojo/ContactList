sap.ui.define([
    "./ManagerBase"
], function (ManagerBase) {
    "use strict";

    var Manager = ManagerBase.extend("com.contacts.model.FirebaseUserManager", {}),
        ManagerProto = Manager.prototype;


    ManagerProto.formatWelcomeMessage = function (sUsername) {
        var oUserModel = this.getOwnerComponent().getModel("userModel"),
            sUsername = oUserModel.getProperty("/user/email");
        return sUsername;
    };

    ManagerProto.formatFirebaseTimestamp = function (otimestamp) {
        if (!otimestamp) {
            return "";
        }

        var oDate = null;
        if (otimestamp instanceof Date) {
            oDate = otimestamp;
        } else {
            oDate = new Date(otimestamp.seconds * 1000);
        }
        var iMonth = oDate.getMonth() + 1,
            sMonth = iMonth < 10 ? "0" + iMonth : iMonth;
        return oDate.getDate() + "." + sMonth + "." + oDate.getFullYear()
    };

    ManagerProto.formatFirebaseTimestampLong = function (otimestamp) {
        if (!otimestamp) {
            return "";
        }

        var oDate = null;
        if (otimestamp instanceof Date) {
            oDate = otimestamp;
        } else {
            oDate = new Date(otimestamp.seconds * 1000);
        }
        return "Last modified " + oDate.toLocaleString();
    };

    ManagerProto.formatString = function (sSource) {
        if (!sSource) {
            return "-";
        }
        return sSource;
    };

    ManagerProto.formatEmailVerified = function (oUser) {
        if (oUser.emailVerified) {
            return " (verified)";
        } else {
            return " (not verified)";
        }
    };

    ManagerProto.formatCreationTimeStamp = function (sDate) {
        return "Created on " + new Date(sDate).toLocaleString();
    };

    ManagerProto.formatLastSignInTimeStamp = function (sDate) {
        return "Last sign in " + new Date(sDate).toLocaleString();
    };



    return Manager;
});