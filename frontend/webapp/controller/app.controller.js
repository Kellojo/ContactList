sap.ui.define([
    "./ControllerBase",
    "sap/ui/model/json/JSONModel",
], function (Controller, JSONModel) {
    "use strict";

    var Controller = Controller.extend("com.contacts.controller.app", {}),
        ControllerProto = Controller.prototype;

    
    ControllerProto.onInit = function() {
        this.m_oErrorMessageContainer = this.getView().byId("idErrorMessageContainer");

        var oComponent = this.getOwnerComponent();
        oComponent.m_oErrorMessageContainer = this.m_oErrorMessageContainer;

        //register app header controls ;-)
        oComponent.registerControl(this.getView().byId("idBackButton"), "BackButton");
        oComponent.registerControl(this.getView().byId("idEditButton"), "EditButton");
        oComponent.registerControl(this.getView().byId("idSaveButton"), "SaveButton");
        oComponent.registerControl(this.getView().byId("idAddButton"), "AddButton");

    };

    return Controller;
});