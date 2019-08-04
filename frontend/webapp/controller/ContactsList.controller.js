sap.ui.define([
    "./ControllerBase",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    var Controller = Controller.extend("com.contacts.controller.ContactsList", {}),
        ControllerProto = Controller.prototype;

    ControllerProto.name = "table";


    ControllerProto.onInit = function () {
        this.m_oListModel = new JSONModel({
            contacts: []
        });
        this.getView().setModel(this.m_oListModel);
    };

    ControllerProto.onPageEnter = function(oEvent) {

    };

    // --------------------------------
    // Utility
    // --------------------------------

    // --------------------------------
    // Events
    // --------------------------------

    ControllerProto.onAddContactButtonPress = function() {
        this.getOwnerComponent().ContactsManager.addContact({
            contact: {
                firstname: "Peter",
                lastname: "reteP",
                email: "peter.retep@retep.com",

                phone: "12312342345",
                mobile: "12312342345",

                company: "reteP GmbH",
                position: "CEO",
                department: ""

            }
        });
    };

    return Controller;
});