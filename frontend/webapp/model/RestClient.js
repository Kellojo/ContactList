sap.ui.define([
    "./ManagerBase"
], function (ManagerBase) {
    "use strict";

    var Manager = ManagerBase.extend("com.contacts.model.RestClient", {}),
        ManagerProto = Manager.prototype;

    ManagerProto.onInit = function (oComponent) {
        ManagerBase.prototype.onInit.apply(this, arguments);

        //init firestore
        this.firestore = firebase.firestore();
        var settings = {
            timestampsInSnapshots: true
        };
        this.firestore.settings(settings);

        return this;
    };





    


    /**
     *  Get all tables of a given user
     */
    ManagerProto.getTables = function (success, complete) {
        if (!this.m_oCurrentUser) {
            setTimeout(this.getTables.bind(this, success, complete), 500);
            return;
        }


        var userId = this.m_oCurrentUser.uid,
            collection = firebase.firestore().collection("tables");

        //where clause to filter only by this owner
        collection.where("owner", "==", userId).get().then(
            function (doc) {
                //if doc exists, update our current user
                if (doc) {
                    console.log("Found " + doc.docs.length + " table(s)");

                    if (typeof success == "function") {
                        success(doc.docs);
                    }
                }
            })
            .catch(this.generateErrorHandler())
            .finally(complete);
    };

    /**
     * Queries all words including the sources for a given table
     */
    ManagerProto.getWordsForTable = function (params) {
        var collection = firebase.firestore().collection("words");

        //where clause to filter only by the given table id
        collection.where("table", "==", params.tableId).get().then(
            function (doc) {
                //if doc exists, run the success function
                if (doc) {

                    console.log("Found " + doc.docs.length + " words for table '" + params.tableId + "'");

                    if (typeof params.success == "function") {
                        params.success(doc.docs);
                    }
                }
            }).catch(this.generateErrorHandler())
            .finally(params.complete);
    };

    /**
     * Queries all sources for a given user
     */
    ManagerProto.getAllSources = function (params) {
        var collection = firebase.firestore().collection("words");

        //where clause to filter only by this owner
        collection.where("table", "==", params.tableId).get().then(
            function (doc) {
                //if doc exists, update our current user
                if (doc) {
                    console.log("Found " + doc.docs.length + " source(s)");

                    var aSources = [],
                        aWords = doc.docs;

                    aWords.forEach(function (word) {
                        word = word.data();
                        if (aSources.indexOf(word.source) < 0) {
                            aSources.push(word.source);
                        }
                    });


                    if (typeof params.success == "function") {
                        params.success(aSources);
                    }
                }
            })
            .catch(this.generateErrorHandler(params.error))
            .finally(params.complete);
    };

    /**
     * Gets a specific word
     */
    ManagerProto.getWord = function (params) {
        firebase.firestore().collection("words").doc(params.id).get()
            .then(function (doc) {
                var oWord = doc.data();
                oWord.id = doc.id;
                params.success(oWord);
            })
            .catch(this.generateErrorHandler(params.error))
            .finally(params.complete);
    };

    /**
     * Creates a word in the given table
     */
    ManagerProto.addWord = function (params) {
        var userId = this.m_oCurrentUser.uid;
        if (userId && params.word && params.word.table) {

            params.word.createdAt = params.word.createdAt || new Date();
            params.word.lastModifiedAt = new Date();

            if (params.word.id) {
                firebase.firestore().collection("words").doc(params.word.id).set(params.word)
                    .then(params.success)
                    .catch(this.generateErrorHandler(params.error))
                    .finally(params.complete);
            } else {
                firebase.firestore().collection("words").doc().set(params.word)
                    .then(params.success)
                    .catch(this.generateErrorHandler(params.error))
                    .finally(params.complete);
            }
        }
    };

    /**
     * Deletes the given word
     */
    ManagerProto.deleteWord = function (oWord, success) {
        firebase.firestore().collection("words").doc(oWord.id).delete()
            .then(success)
            .catch(this.generateErrorHandler());
    };

    /**
     * Adds a table to the users tables
     */
    ManagerProto.addTable = function (oTable, success) {
        var userId = this.m_oCurrentUser.uid;
        if (userId && oTable && oTable.name) {

            oTable.owner = oTable.owner || userId;
            oTable.createdAt = oTable.createdAt || new Date();
            if (oTable.id) {
                firebase.firestore().collection("tables").doc(oTable.id).set(oTable)
                    .then(success)
                    .catch(this.generateErrorHandler());
            } else {
                firebase.firestore().collection("tables").doc().set(oTable)
                    .then(success)
                    .catch(this.generateErrorHandler());
            }
        }
    };

    /**
     * Deletes the given table
     */
    ManagerProto.deleteTable = function (oTable, success) {
        firebase.firestore().collection("tables").doc(oTable.id).delete()
            .then(success)
            .catch(this.generateErrorHandler());
    };


    return Manager;
});