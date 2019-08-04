sap.ui.define([
    "./ManagerBase",
    "sap/ui/model/json/JSONModel"
], function (ManagerBase, JSONModel) {
    "use strict";

    var Manager = ManagerBase.extend("com.contacts.model.FirebaseUserManager", {
        metadata: {
            events: {
                authStateChanged: {
                    parameters: {
                        isLoggedIn: { type: "object" },
                        user: { type: "object" }
                    }
                }
            }
        }
    }),
        ManagerProto = Manager.prototype;

    ManagerProto.onInit = function (oComponent) {
        ManagerBase.prototype.onInit.apply(this, arguments);

        //init firestore
        this.firestore = firebase.firestore();
        firebase.auth().onAuthStateChanged(this.onAuthStateChanged.bind(this));

        this.m_oCurrentUser = null;
        this.m_oUserModel = new JSONModel({
            user: null
        });
        this.getOwnerComponent().setModel(this.m_oUserModel, "userModel");

        return this;
    };


    ManagerProto.onAuthStateChanged = function (oUser) {
        this.m_oUserModel.setProperty("/user", oUser);
        this.m_oUserModel.refresh(true);
        this.m_oCurrentUser = oUser;

        this.fireAuthStateChanged({
            isLoggedIn: !!oUser,
            user: oUser
        });
    };

    ManagerProto.login = function login(email, password, fnThen, error, complete) {
        var oRequest = firebase.auth().signInWithEmailAndPassword(email, password);

        oRequest.then(fnThen);
        oRequest.catch(this.generateErrorHandler(error));
        oRequest.finally(complete);
    };

    ManagerProto.registerUser = function (email, password, fnThen, error, complete) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .catch(this.generateErrorHandler(error))
            .then(fnThen)
            .finally(complete);
    };

    ManagerProto.logout = function (error) {
        firebase.auth().signOut().catch(function (error) {
            if (error) {
                error(error);
            }
        });
    };

    ManagerProto.sendPasswordResetEmail = function (mParameters) {
        firebase.auth().sendPasswordResetEmail(mParameters.email).then(function () {
            if (typeof mParameters.success === "function") {
                mParameters.success();
            }
        }).catch(this.generateErrorHandler(mParameters.error));
    };

    ManagerProto.isLoggedIn = function () {
        return !!firebase.auth().currentUser;
    };

    return Manager;
});