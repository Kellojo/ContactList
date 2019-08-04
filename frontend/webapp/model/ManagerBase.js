sap.ui.define([
    "sap/ui/base/ManagedObject"
], function (ManagedObject) {
    "use strict";

    var Manager = ManagedObject.extend("com.contacts.model.ManagerBase", {}),
        ManagerProto = Manager.prototype;

    ManagerProto.onInit = function (oComponent) {
        this.m_oComponent = oComponent;
        return this;
    };

    ManagerProto.getOwnerComponent = function () {
        return this.m_oComponent;
    };




    ManagerProto.generateErrorHandler = function (fnCustomError) {
        return function (error) {
            this.getOwnerComponent().showErrorMessage(error.message);

            if (fnCustomError) {
                fnCustomError();
            }
        }.bind(this);
    };

    return Manager;
});