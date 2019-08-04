sap.ui.define([
    "./ManagerBase"
], function (ManagerBase) {
    "use strict";

    var Manager = ManagerBase.extend("com.contacts.model.RestClient", {}),
        ManagerProto = Manager.prototype;


    /**
     * Adds a contact to the db
     * @params {object} mParams
     */
    ManagerProto.addContact = function(oParams) {
        if (oParams.contact) {

            oParams.contact.createdAt = new Date();
            oParams.contact.lastModifiedAt = new Date();

            firebase.firestore().collection("contacts").doc().set(oParams.contact)
                .then(oParams.success)
                .catch(this.generateErrorHandler(oParams.error))
                .finally(oParams.complete);
        }
    };


    return Manager;
});