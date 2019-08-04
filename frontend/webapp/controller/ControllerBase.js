sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "../model/Formatter"
], function (Controller, Formatter) {
    "use strict";

    var Controller = Controller.extend("com.contacts.controller.ControllerBase", {
        formatter: Formatter
    });
    var ControllerProto = Controller.prototype;

    ControllerProto.onInit = function () {
        this._oRouter.attachRouteMatched(this.handleRouteMatched, this);
    };
    ControllerProto.handleRouteMatched = function (event) {
        //Check whether this page is matched.
        if (event.getParameter("name") !== this.name) {
            return;
        }

        if (typeof this.onPageEnter === "function") {
            this.onPageEnter(event);
        }
    };

    ControllerProto.onPageEnter = function (oEvent) {

    };

    return Controller;
});