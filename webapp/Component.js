sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"bp/zbpselfservice/model/models",
	"sap/ui/model/json/JSONModel"
], function (UIComponent, Device, models, JSONModel) {
	"use strict";

	return UIComponent.extend("bp.zbpselfservice.Component", {

		metadata: {
			manifest: "json"
		},
		appModel: {
			isBusy: false
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function () {

			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// var bpnumber = this.getModel("userAttributes").getProperty("/bpnumber");

			// var oAttributesModel = this.getModel("userAttributes");
			// var that = this;

			// oAttributesModel.attachRequestCompleted(function (oEvent) {
			// 	that. = oAttributesModel.getProperty("/bpnumber");
			// });

			var that = this;
			// 读取完成用户属性后再初始化路由
			this.getModel("userAttributes").attachRequestCompleted(function (oEvent) {
				that._bpnumber = this.getData().bpnumber;

				// enable routing
				that.getRouter().initialize();
			});

			var oModel = new JSONModel({
				// bpnumber: "226051",
				// bpnumber: bp,
				Zflage: true,
				Zflagd: false,
				editable: false,
				personal: false
			});
			oModel.setDefaultBindingMode("TwoWay");
			this.setModel(oModel, "localModel");

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			this.setModel(new JSONModel(this.appModel), "appModel");

			// this.getModel().read("/")

		}
	});
});