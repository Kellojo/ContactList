sap.ui.define([
    "sap/ui/core/Control"
], function (Control) {
    return Control.extend("kellojo.m.Page", {
        metadata: {
            aggregations: {
                headerContent: { 
                    type: "sap.ui.core.Control",
                    multiple: true
                },
                content: { 
                    type: "sap.ui.core.Control",
                    multiple: true
                }
            },
        },

        init: function () {

        },

        renderer: function (oRm, oControl) {

            oRm.write("<div");
            oRm.writeControlData(oControl);
            oRm.addClass("kellojoMPage");
            oRm.writeClasses(oControl);
            oRm.write(">");

            oRm.write("<div class='kellojoMPage-Header'>");
                var aContent = oControl.getContent();
                aContent.forEach(function(contentControl) {
                    oRm.renderControl(contentControl);
                });
            oRm.write("</div>");

            oRm.write("<div class='kellojoMPage-Content'>");
                var aContent = oControl.getHeaderContent();
                aContent.forEach(function (contentControl) {
                    oRm.renderControl(contentControl);
                });
            oRm.write("</div>");




            oRm.write("</div>");
        }
    });
}
);
